import { query } from '../config/db.js';

async function migrateOtp() {
  try {
    console.log('1. Adding is_verified column...');
    try {
      await query('ALTER TABLE users ADD COLUMN is_verified INTEGER DEFAULT 0');
      console.log('Column is_verified added.');
    } catch (e) {
      console.log('is_verified note:', e.message);
    }

    console.log('2. Adding otp_code column...');
    try {
      await query('ALTER TABLE users ADD COLUMN otp_code TEXT');
      console.log('Column otp_code added.');
    } catch (e) {
      console.log('otp_code note:', e.message);
    }

    console.log('3. Adding otp_expires_at column...');
    try {
      await query('ALTER TABLE users ADD COLUMN otp_expires_at DATETIME');
      console.log('Column otp_expires_at added.');
    } catch (e) {
      console.log('otp_expires_at note:', e.message);
    }

    console.log('4. Setting existing users as verified...');
    await query('UPDATE users SET is_verified = 1 WHERE is_verified IS NULL OR is_verified = 0');

    const check = await query('PRAGMA table_info(users)');
    console.log('Users table columns:');
    console.table(check.results);

    const usersCheck = await query('SELECT id, username, email, is_verified FROM users');
    console.log('Users status:');
    console.table(usersCheck.results);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateOtp();
