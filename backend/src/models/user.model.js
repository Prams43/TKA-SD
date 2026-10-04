import { query } from '../config/db.js';

/**
 * Mencari pengguna berdasarkan alamat email
 * @param {string} email
 * @returns {Promise<Object|null>} Data pengguna atau null jika tidak ditemukan
 */
export const findUserByEmail = async (email) => {
  const sql = 'SELECT id, username, email, password, is_verified, otp_code, otp_expires_at, otp_count, created_at FROM users WHERE LOWER(email) = ? LIMIT 1';
  const response = await query(sql, [email.toLowerCase().trim()]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Mencari pengguna berdasarkan username
 * @param {string} username
 * @returns {Promise<Object|null>} Data pengguna atau null jika tidak ditemukan
 */
export const findUserByUsername = async (username) => {
  const sql = 'SELECT id, username, email, password, is_verified, otp_code, otp_expires_at, otp_count, created_at FROM users WHERE LOWER(username) = ? LIMIT 1';
  const response = await query(sql, [username.toLowerCase().trim()]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Mencari pengguna berdasarkan identifier (bisa username ATAU email)
 * @param {string} identifier
 * @returns {Promise<Object|null>} Data pengguna atau null jika tidak ditemukan
 */
export const findUserByIdentifier = async (identifier) => {
  const clean = identifier.toLowerCase().trim();
  const sql = 'SELECT id, username, email, password, is_verified, otp_code, otp_expires_at, otp_count, created_at FROM users WHERE LOWER(email) = ? OR LOWER(username) = ? LIMIT 1';
  const response = await query(sql, [clean, clean]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Mencari data pengguna berdasarkan ID (tanpa password)
 * @param {number|string} id
 * @returns {Promise<Object|null>} Data profil pengguna atau null jika tidak ditemukan
 */
export const findUserById = async (id) => {
  const sql = 'SELECT id, username, email, is_verified, created_at FROM users WHERE id = ? LIMIT 1';
  const response = await query(sql, [id]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Membuat dan menyimpan data pendaftaran baru ke Cloudflare D1 (belum terverifikasi, otp_count = 1)
 * @param {string} username
 * @param {string} email
 * @param {string} hashedPassword
 * @param {string} otpCode
 * @param {string} otpExpiresAt
 * @returns {Promise<Object>} Pengguna yang baru dibuat
 */
export const createUser = async (username, email, hashedPassword, otpCode = null, otpExpiresAt = null) => {
  const cleanUsername = username.trim();
  const cleanEmail = email.toLowerCase().trim();
  const sql = 'INSERT INTO users (username, email, password, is_verified, otp_code, otp_expires_at, otp_count) VALUES (?, ?, ?, 0, ?, ?, 1)';
  const response = await query(sql, [cleanUsername, cleanEmail, hashedPassword, otpCode, otpExpiresAt]);
  
  return {
    id: response.meta?.last_row_id || null,
    username: cleanUsername,
    email: cleanEmail,
  };
};

/**
 * Memperbarui kode OTP, masa berlakunya, dan jumlah pengiriman (otp_count)
 * @param {string} email
 * @param {string} otpCode
 * @param {string} otpExpiresAt
 * @param {number|null} otpCount
 */
export const updateUserOtp = async (email, otpCode, otpExpiresAt, otpCount = null) => {
  if (otpCount !== null) {
    const sql = 'UPDATE users SET otp_code = ?, otp_expires_at = ?, otp_count = ? WHERE LOWER(email) = ?';
    return await query(sql, [otpCode, otpExpiresAt, otpCount, email.toLowerCase().trim()]);
  }
  const sql = 'UPDATE users SET otp_code = ?, otp_expires_at = ? WHERE LOWER(email) = ?';
  return await query(sql, [otpCode, otpExpiresAt, email.toLowerCase().trim()]);
};

/**
 * Mengaktifkan akun pengguna setelah kode OTP terverifikasi dan me-reset counter OTP
 * @param {string} email
 */
export const markUserAsVerified = async (email) => {
  const sql = 'UPDATE users SET is_verified = 1, otp_code = NULL, otp_expires_at = NULL, otp_count = 0 WHERE LOWER(email) = ?';
  return await query(sql, [email.toLowerCase().trim()]);
};

/**
 * Menghapus akun yang belum terverifikasi berdasarkan email jika pengguna ingin mendaftar ulang
 * @param {string} email
 */
export const deleteUnverifiedUserByEmail = async (email) => {
  const sql = 'DELETE FROM users WHERE LOWER(email) = ? AND (is_verified = 0 OR is_verified IS NULL)';
  return await query(sql, [email.toLowerCase().trim()]);
};

/**
 * Menghapus akun yang belum terverifikasi berdasarkan username
 * Digunakan agar username yang belum diaktifkan/diverifikasi tetap bisa dipakai oleh pengguna lain
 * @param {string} username
 */
export const deleteUnverifiedUserByUsername = async (username) => {
  const sql = 'DELETE FROM users WHERE LOWER(username) = ? AND (is_verified = 0 OR is_verified IS NULL)';
  return await query(sql, [username.toLowerCase().trim()]);
};

export const deleteUnverifiedUser = deleteUnverifiedUserByEmail;

/**
 * Memperbarui password pengguna dan mereset status OTP serta counter
 * @param {string} email
 * @param {string} newHashedPassword
 */
export const updateUserPassword = async (email, newHashedPassword) => {
  const sql = 'UPDATE users SET password = ?, otp_code = NULL, otp_expires_at = NULL, otp_count = 0 WHERE LOWER(email) = ?';
  return await query(sql, [newHashedPassword, email.toLowerCase().trim()]);
};


