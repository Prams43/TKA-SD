import api from './api';

/**
 * Service untuk sinkronisasi Profil, Gamifikasi (EXP, Level, Gelar),
 * Streak, dan Aktivitas Belajar dengan Database Cloudflare D1
 */
export const profileService = {
  /**
   * Mengambil data profil dan statistik belajar siswa dari Cloudflare D1
   */
  async getProfile() {
    try {
      const response = await api.get('/profile');
      return response.data?.data || null;
    } catch (error) {
      console.warn('Tidak dapat mengambil profil dari server Cloudflare:', error.message);
      return null;
    }
  },

  /**
   * Menyimpan / memperbarui profil dan statistik belajar ke Cloudflare D1
   * @param {Object} payload { exp, level, activeTitle, unlockedTitles, streak, activityData }
   */
  async saveProfile(payload) {
    try {
      const response = await api.post('/profile', payload);
      return response.data;
    } catch (error) {
      console.warn('Gagal menyimpan profil ke database Cloudflare:', error.message);
      return null;
    }
  },

  /**
   * Mengambil data papan peringkat (leaderboard) global seluruh siswa terdaftar
   */
  async getLeaderboard(limit = 100) {
    try {
      const response = await api.get(`/leaderboard?limit=${limit}`);
      return response.data?.data || [];
    } catch (error) {
      console.warn('Gagal mengambil leaderboard dari database:', error.message);
      return [];
    }
  },
};
