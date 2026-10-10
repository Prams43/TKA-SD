import { query } from '../config/db.js';

async function resetAllProgress() {
  try {
    console.log('\n=== MENGHAPUS SELURUH PROGRESS PROFIL DI CLOUDFLARE D1 ===\n');

    // 1. Cek jumlah data progress saat ini
    const countBefore = await query('SELECT count(*) as total FROM user_profiles');
    console.log(`Jumlah data progress sebelum dihapus: ${countBefore.results[0]?.total || 0}`);

    // 2. Hapus seluruh data di tabel user_profiles
    await query('DELETE FROM user_profiles');
    console.log('Query: DELETE FROM user_profiles BERHASIL dijalankan.');

    // 3. Verifikasi ulang bahwa tabel user_profiles benar-benar kosong
    const countAfter = await query('SELECT count(*) as total FROM user_profiles');
    const remaining = countAfter.results[0]?.total || 0;
    console.log(`Jumlah data progress setelah dihapus: ${remaining} (BERSIH TOTAL)`);

    // 4. Tampilkan daftar akun pengguna yang tetap aman di tabel users
    const usersResponse = await query('SELECT id, username, email FROM users ORDER BY id ASC');
    console.log('\n=== STATUS AKUN (TETAP AMAN, PROGRESS SIAP DIMULAI DARI AWAL) ===');
    console.table(usersResponse.results);

    console.log('\nSUKSES! Semua progress EXP, level, gelar, dan riwayat belajar telah di-reset di Cloudflare D1.');
  } catch (error) {
    console.error('Gagal mereset progress:', error.message);
  }
}

resetAllProgress();
