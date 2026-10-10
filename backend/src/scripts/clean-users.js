import { query } from '../config/db.js';

async function cleanUsers() {
  try {
    console.log('\n=== PEMBERSIHAN AKUN DI CLOUDFLARE D1 ===\n');

    // 1. Ambil data akun sebelum dihapus
    const before = await query('SELECT id, username, email FROM users ORDER BY id ASC');
    console.log('Daftar akun sebelum pembersihan:');
    console.table(before.results);

    // Akun yang disisakan: Yuken (14), zidan (105), najwan (106)
    const keepIds = [14, 105, 106];
    const placeholders = keepIds.map(() => '?').join(', ');

    // 2. Hapus data profil akun lain di user_profiles
    await query(`DELETE FROM user_profiles WHERE user_id NOT IN (${placeholders})`, keepIds);
    console.log('Berhasil menghapus data profil akun selain Yuken, Zidan, Najwan.');

    // 3. Hapus akun lain di tabel users
    await query(`DELETE FROM users WHERE id NOT IN (${placeholders})`, keepIds);
    console.log('Berhasil menghapus akun selain Yuken, Zidan, Najwan dari tabel users.\n');

    // 4. Verifikasi sisa akun di database
    const after = await query(
      `SELECT u.id, u.username, u.email, u.is_verified, up.exp, up.level, up.active_title 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       ORDER BY u.id ASC`
    );

    console.log('=== DAFTAR AKUN YANG TERSISA (SUDAH BERSIH) ===');
    console.table(
      after.results.map((u) => ({
        ID: u.id,
        Username: u.username,
        Email: u.email,
        Verified: u.is_verified === 1 ? 'Ya' : 'Tidak',
        EXP: u.exp ?? 0,
        Level: u.level ?? 1,
        Gelar: u.active_title ?? 'pemula',
      }))
    );

    console.log(`\nSelesai! Tersisa ${after.results.length} akun utama.\n`);
  } catch (error) {
    console.error('Gagal membersihkan akun:', error.message);
  }
}

cleanUsers();
