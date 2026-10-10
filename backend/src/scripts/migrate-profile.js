import { query } from '../config/db.js';

async function migrate() {
  try {
    console.log('Menjalankan migrasi tabel user_profiles ke Cloudflare D1...');

    const createTableSql = `
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
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    await query(createTableSql);
    console.log('Tabel user_profiles berhasil dibuat atau sudah ada.');

    const createIndexSql = `
      CREATE INDEX IF NOT EXISTS idx_user_profiles_exp ON user_profiles(exp DESC);
    `;
    await query(createIndexSql);
    console.log('Index idx_user_profiles_exp berhasil dibuat.');

    // Cek apakah tabel bisa di-query
    const testCheck = await query('SELECT count(*) as count FROM user_profiles');
    console.log('Status user_profiles:', testCheck.results);
    console.log('Migrasi Cloudflare D1 SUKSES!');
  } catch (error) {
    console.error('Migrasi gagal:', error.message);
  }
}

migrate();
