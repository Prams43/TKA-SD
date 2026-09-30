import axios from 'axios';
import { env } from './env.js';

/**
 * Helper untuk menjalankan query SQL ke Cloudflare D1 via REST API
 * Menggunakan parameterized query (?) untuk keamanan dari SQL Injection
 * 
 * @param {string} sql - Statement SQL (misal: "SELECT * FROM users WHERE email = ?")
 * @param {Array} params - Parameter array untuk placeholder '?' (misal: ['test@gmail.com'])
 * @returns {Promise<{results: Array, meta: Object, success: boolean}>}
 */
export const query = async (sql, params = []) => {
  // Validasi ketersediaan kredensial Cloudflare D1
  if (!env.cfAccountId || !env.cfDatabaseId || !env.cfApiToken) {
    throw new Error(
      'Kredensial Cloudflare D1 belum lengkap di .env (CF_ACCOUNT_ID, CF_DATABASE_ID, atau CF_API_TOKEN).'
    );
  }

  try {
    const endpoint = `https://api.cloudflare.com/client/v4/accounts/${env.cfAccountId}/d1/database/${env.cfDatabaseId}/query`;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (env.cfEmail || env.cfApiToken.startsWith('cfk_')) {
      headers['X-Auth-Key'] = env.cfApiToken;
      headers['X-Auth-Email'] = env.cfEmail || 'Yumenoboken@gmail.com';
    } else {
      headers['Authorization'] = `Bearer ${env.cfApiToken}`;
    }

    const response = await axios.post(
      endpoint,
      {
        sql,
        params,
      },
      {
        headers,
        timeout: 10000, // Timeout 10 detik
      }
    );

    const data = response.data;

    // Periksa status keberhasilan dari Cloudflare API
    if (!data.success) {
      const errorMessage = data.errors?.map((err) => err.message).join(', ') || 'Terjadi kesalahan pada Cloudflare D1';
      throw new Error(`D1 Error: ${errorMessage}`);
    }

    // Cloudflare D1 mengembalikan array hasil di dalam result[0]
    const firstResult = data.result && data.result.length > 0 ? data.result[0] : null;

    if (!firstResult || !firstResult.success) {
      const errorDetail = firstResult?.error || 'Gagal mengeksekusi query database';
      throw new Error(`Query Failed: ${errorDetail}`);
    }

    return {
      results: firstResult.results || [],
      meta: firstResult.meta || {},
      success: true,
    };
  } catch (error) {
    // Tangani error dari Axios atau Cloudflare
    if (error.response?.data?.errors?.length > 0) {
      const messages = error.response.data.errors.map((e) => e.message).join(', ');
      throw new Error(`Cloudflare D1 API Error: ${messages}`);
    }

    // Teruskan pesan error asli
    throw new Error(error.message || 'Gagal terhubung ke Cloudflare D1');
  }
};
