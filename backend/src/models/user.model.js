import { query } from '../config/db.js';

/**
 * Mencari pengguna berdasarkan alamat email
 * @param {string} email
 * @returns {Promise<Object|null>} Data pengguna atau null jika tidak ditemukan
 */
export const findUserByEmail = async (email) => {
  const sql = 'SELECT id, email, password, created_at FROM users WHERE email = ? LIMIT 1';
  const response = await query(sql, [email.toLowerCase().trim()]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Mencari data pengguna berdasarkan ID (tanpa password)
 * @param {number|string} id
 * @returns {Promise<Object|null>} Data profil pengguna atau null jika tidak ditemukan
 */
export const findUserById = async (id) => {
  const sql = 'SELECT id, email, created_at FROM users WHERE id = ? LIMIT 1';
  const response = await query(sql, [id]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Membuat dan menyimpan data pengguna baru ke Cloudflare D1
 * @param {string} email
 * @param {string} hashedPassword
 * @returns {Promise<Object>} Pengguna yang baru dibuat
 */
export const createUser = async (email, hashedPassword) => {
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const response = await query(sql, [email.toLowerCase().trim(), hashedPassword]);
  
  return {
    id: response.meta?.last_row_id || null,
    email: email.toLowerCase().trim(),
  };
};
