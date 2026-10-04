-- Schema Tabel Cloudflare D1 untuk Aplikasi TKA SD

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
