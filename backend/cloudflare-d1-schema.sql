-- ==============================================================================
-- SCHEMA CLOUDFLARE D1: TABEL USER & GAMIFIKASI PROFIL LENGKAP
-- ==============================================================================
-- File ini dapat dicopy-paste langsung ke Cloudflare D1 Console (Dashboard Cloudflare)
-- Masuk ke Cloudflare Dashboard -> Storage & Databases -> D1 -> Pilih Database Anda -> Tab "Console"
-- ==============================================================================

-- 1. TABEL PENGGUNA (USERS)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_verified INTEGER DEFAULT 0,
  otp_code TEXT,
  otp_expires_at DATETIME,
  otp_count INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL PROFIL & GAMIFIKASI (EXP, LEVEL, GELAR, STREAK, AKTIVITAS BELAJAR)
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

-- 3. INDEX UNTUK PERFORMA QUERY LEADERBOARD & PENCARIAN
CREATE INDEX IF NOT EXISTS idx_user_profiles_exp ON user_profiles(exp DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_level ON user_profiles(level DESC);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
