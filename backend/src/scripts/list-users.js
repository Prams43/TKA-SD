import { query } from '../config/db.js';

async function listUsers() {
  try {
    console.log('\n=== DAFTAR AKUN TERDAFTAR (Cloudflare D1) ===\n');
    const response = await query(
      'SELECT id, username, email, is_verified, otp_code, otp_expires_at, created_at FROM users ORDER BY id ASC'
    );

    if (!response.results || response.results.length === 0) {
      console.log('Belum ada akun yang terdaftar.');
      return;
    }

    console.table(
      response.results.map((u) => ({
        ID: u.id,
        Username: u.username,
        Email: u.email,
        Status: u.is_verified === 1 ? 'Aktif (Verified)' : 'Belum Verifikasi',
        'OTP Aktif': u.otp_code || '-',
        'Dibuat Pada': u.created_at,
      }))
    );

    console.log(`Total: ${response.results.length} akun terdaftar.\n`);
  } catch (error) {
    console.error('Gagal mengambil data user:', error.message);
  }
}

listUsers();
