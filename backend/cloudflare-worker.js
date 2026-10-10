/**
 * ==============================================================================
 * CLOUDFLARE WORKER: TKA SD - USER PROFILE & GAMIFIKASI DATABASE (CLOUDFLARE D1)
 * ==============================================================================
 * 
 * File ini adalah file khusus ALL-IN-ONE yang siap di copy-paste ke Cloudflare Worker.
 * Berfungsi untuk menyimpan dan menyinkronkan data:
 * - Total EXP
 * - Level Siswa
 * - Gelar Aktif & Daftar Gelar yang Terbuka (Unlocked Titles)
 * - Streak Belajar Harian (Reset Jam 12 Malam)
 * - Riwayat Aktivitas & Bintang Pembelajaran (Materi, Latihan Soal, Tryout)
 * - Papan Peringkat (Global Leaderboard) antar seluruh siswa terdaftar
 * 
 * ------------------------------------------------------------------------------
 * PANDUAN DEPLOY KE CLOUDFLARE WORKERS (HANYA 3 LANGKAH):
 * ------------------------------------------------------------------------------
 * 1. Buka dashboard Cloudflare: https://dash.cloudflare.com/
 * 2. Masuk ke menu "Workers & Pages" -> Klik "Create Application" -> "Create Worker".
 *    Beri nama misal: "tka-sd-profile-api" -> Klik "Deploy".
 * 3. Klik "Quick Edit" (Edit Code):
 *    - Hapus seluruh kode bawaan worker.
 *    - Copy & Paste seluruh isi file ini ke dalam editor tersebut.
 *    - Klik tombol "Save and Deploy".
 * 
 * ------------------------------------------------------------------------------
 * KONFIGURASI BINDING DATABASE D1 (PENTING AGAR TERHUBUNG KE D1):
 * ------------------------------------------------------------------------------
 * 1. Di halaman Worker yang baru dibuat, masuk ke tab "Settings" -> "Variables and Secrets".
 * 2. Pada bagian "D1 Database Bindings", klik "Add binding":
 *    - Variable name: DB  (Wajib huruf kapital "DB")
 *    - D1 database: Pilih database D1 Anda (misal database TKA SD)
 * 3. Pada bagian "Environment Variables", klik "Add variable":
 *    - Variable name: JWT_SECRET
 *    - Value: rahasia_super_aman_tka_sd_2026 (sesuaikan dengan JWT_SECRET backend Anda)
 * 4. Klik "Save and deploy". Selesai!
 * ==============================================================================
 */

// Helper Header CORS agar bisa diakses oleh Frontend (Localhost, Vercel, GitHub Pages)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

// Response JSON helper
const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
};

// Verifikasi dan Dekode Token JWT dengan Web Crypto API (Native Cloudflare V8)
async function verifyJwt(authHeader, jwtSecret) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const [headerB64, payloadB64, signatureB64] = parts;
    const base64Clean = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayloadStr = decodeURIComponent(
      atob(base64Clean)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(decodedPayloadStr);

    // Periksa masa berlaku token
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    // Jika JWT_SECRET dikonfigurasi, validasi tanda tangan HMAC-SHA256
    if (jwtSecret) {
      const encoder = new TextEncoder();
      const data = encoder.encode(`${headerB64}.${payloadB64}`);
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(jwtSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
      );

      const sigB64 = signatureB64.replace(/-/g, '+').replace(/_/g, '/');
      const sigBin = atob(sigB64);
      const sigBytes = new Uint8Array(sigBin.length);
      for (let i = 0; i < sigBin.length; i++) {
        sigBytes[i] = sigBin.charCodeAt(i);
      }

      const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
      if (!isValid) return null;
    }

    return payload;
  } catch (err) {
    console.error('JWT Decode error:', err);
    return null;
  }
}

// Inisialisasi otomatis tabel database jika belum ada
async function ensureTables(db) {
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        user_id INTEGER PRIMARY KEY,
        exp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        active_title TEXT DEFAULT 'pemula',
        unlocked_titles TEXT DEFAULT '["pemula"]',
        streak_count INTEGER DEFAULT 0,
        last_active_date TEXT,
        activity_data TEXT DEFAULT '{}',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();

    await db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_user_profiles_exp ON user_profiles(exp DESC)
    `).run();
  } catch (e) {
    console.warn('Notice tabel user_profiles:', e.message);
  }
}

export default {
  async fetch(request, env, ctx) {
    // 1. Tangani preflight OPTIONS request untuk CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const db = env.DB;
    const jwtSecret = env.JWT_SECRET || 'rahasia_super_aman_tka_sd_2026';

    // 2. Health check endpoint
    if (path === '/' || path === '/health' || path === '/api/health') {
      return jsonResponse({
        status: 'ok',
        service: 'TKA SD Profile & Database Worker',
        databaseConnected: !!db,
        timestamp: new Date().toISOString(),
      });
    }

    // Validasi ketersediaan binding D1
    if (!db) {
      return jsonResponse(
        {
          success: false,
          message:
            'Binding D1 database "DB" belum dikonfigurasi di Settings Worker -> Variables -> D1 Database Bindings.',
        },
        500
      );
    }

    // Pastikan tabel siap
    await ensureTables(db);

    // ============================================================================
    // ROUTE 1: GET /api/leaderboard (Daftar Papan Peringkat Global Terbuka)
    // ============================================================================
    if (path === '/api/leaderboard' && request.method === 'GET') {
      try {
        const query = `
          SELECT 
            u.id, 
            u.username, 
            COALESCE(p.exp, 0) as exp, 
            COALESCE(p.level, 1) as level, 
            COALESCE(p.active_title, 'pemula') as active_title, 
            COALESCE(p.streak_count, 0) as streak_count,
            COALESCE(p.updated_at, u.created_at) as updated_at
          FROM users u
          LEFT JOIN user_profiles p ON u.id = p.user_id
          WHERE u.is_verified = 1
          ORDER BY level DESC, exp DESC, streak_count DESC
          LIMIT 100
        `;
        const result = await db.prepare(query).all();

        return jsonResponse({
          success: true,
          data: result.results || [],
        });
      } catch (err) {
        return jsonResponse(
          {
            success: false,
            message: `Gagal memuat leaderboard: ${err.message}`,
          },
          500
        );
      }
    }

    // ============================================================================
    // ROUTE 2: GET /api/profile (Mengambil Profil & Aktivitas Siswa Login)
    // ============================================================================
    if (path === '/api/profile' && request.method === 'GET') {
      const authUser = await verifyJwt(request.headers.get('Authorization'), jwtSecret);
      if (!authUser || !authUser.id) {
        return jsonResponse(
          { success: false, message: 'Autentikasi gagal. Token tidak valid atau kedaluwarsa.' },
          401
        );
      }

      try {
        const userId = authUser.id;
        const profileRow = await db
          .prepare(
            `SELECT user_id, exp, level, active_title, unlocked_titles, streak_count, last_active_date, activity_data, updated_at 
             FROM user_profiles WHERE user_id = ? LIMIT 1`
          )
          .bind(userId)
          .first();

        if (!profileRow) {
          // Buat entri default baru (bersih total: Level 1, 0 EXP, 0 Streak)
          const defaultData = {
            userId,
            exp: 0,
            level: 1,
            activeTitle: 'pemula',
            unlockedTitles: ['pemula'],
            streak: { count: 0, lastActiveDate: null, activeToday: false },
            activityData: {
              materiCompleted: [],
              unlockedMateri: ['mtk_1', 'bi_1'],
              materiStars: {},
              latihanCompleted: [],
              unlockedLatihan: ['mtk_lat_1', 'bi_lat_1'],
              latihanStars: {},
              latihanHistory: [],
              tryoutHistory: [],
            },
          };

          await db
            .prepare(
              `INSERT INTO user_profiles (user_id, exp, level, active_title, unlocked_titles, streak_count, last_active_date, activity_data)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
              userId,
              defaultData.exp,
              defaultData.level,
              defaultData.activeTitle,
              JSON.stringify(defaultData.unlockedTitles),
              defaultData.streak.count,
              defaultData.streak.lastActiveDate,
              JSON.stringify(defaultData.activityData)
            )
            .run();

          return jsonResponse({
            success: true,
            data: defaultData,
          });
        }

        // Parse JSON fields
        let parsedUnlockedTitles = ['pemula'];
        let parsedActivityData = {};
        try {
          if (profileRow.unlocked_titles) {
            parsedUnlockedTitles = JSON.parse(profileRow.unlocked_titles);
          }
        } catch (_) {}

        try {
          if (profileRow.activity_data) {
            parsedActivityData = JSON.parse(profileRow.activity_data);
          }
        } catch (_) {}

        return jsonResponse({
          success: true,
          data: {
            userId: profileRow.user_id,
            exp: profileRow.exp,
            level: profileRow.level,
            activeTitle: profileRow.active_title,
            unlockedTitles: parsedUnlockedTitles,
            streak: {
              count: profileRow.streak_count,
              lastActiveDate: profileRow.last_active_date,
            },
            activityData: parsedActivityData,
            updatedAt: profileRow.updated_at,
          },
        });
      } catch (err) {
        return jsonResponse(
          { success: false, message: `Gagal membaca profil: ${err.message}` },
          500
        );
      }
    }

    // ============================================================================
    // ROUTE 3: POST atau PUT /api/profile (Menyimpan / Upsert Profil ke Database)
    // ============================================================================
    if (
      (path === '/api/profile' || path === '/api/profile/sync') &&
      (request.method === 'POST' || request.method === 'PUT')
    ) {
      const authUser = await verifyJwt(request.headers.get('Authorization'), jwtSecret);
      if (!authUser || !authUser.id) {
        return jsonResponse(
          { success: false, message: 'Autentikasi gagal. Token tidak valid.' },
          401
        );
      }

      try {
        const body = await request.json();
        const userId = authUser.id;

        const exp = Math.max(0, Number(body.exp ?? body.totalExp ?? 0));
        const level = Math.max(1, Number(body.level ?? Math.floor(exp / 100) + 1));
        const activeTitle = String(body.activeTitle || body.active_title || 'pemula');
        const unlockedTitlesStr = JSON.stringify(
          Array.isArray(body.unlockedTitles) ? body.unlockedTitles : ['pemula']
        );

        const streakCount = Number(
          body.streak?.count ?? body.streakCount ?? body.streak_count ?? 0
        );
        const lastActiveDate = body.streak?.lastActiveDate || body.lastActiveDate || null;
        const activityDataStr = JSON.stringify(body.activityData || body.activity_data || {});

        const upsertSql = `
          INSERT INTO user_profiles (
            user_id, exp, level, active_title, unlocked_titles, streak_count, last_active_date, activity_data, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(user_id) DO UPDATE SET
            exp = excluded.exp,
            level = excluded.level,
            active_title = excluded.active_title,
            unlocked_titles = excluded.unlocked_titles,
            streak_count = excluded.streak_count,
            last_active_date = excluded.last_active_date,
            activity_data = excluded.activity_data,
            updated_at = CURRENT_TIMESTAMP
        `;

        await db
          .prepare(upsertSql)
          .bind(
            userId,
            exp,
            level,
            activeTitle,
            unlockedTitlesStr,
            streakCount,
            lastActiveDate,
            activityDataStr
          )
          .run();

        return jsonResponse({
          success: true,
          message: 'Data EXP, level, gelar, streak & aktivitas berhasil disimpan di database Cloudflare D1!',
          data: {
            userId,
            exp,
            level,
            activeTitle,
            streak: { count: streakCount, lastActiveDate },
            updatedAt: new Date().toISOString(),
          },
        });
      } catch (err) {
        return jsonResponse(
          { success: false, message: `Gagal menyimpan profil: ${err.message}` },
          500
        );
      }
    }

    // 404 Route Not Found
    return jsonResponse(
      {
        success: false,
        message: `Endpoint ${request.method} ${path} tidak ditemukan pada Worker Cloudflare.`,
      },
      404
    );
  },
};
