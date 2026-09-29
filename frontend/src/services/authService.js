import api from './api';

/**
 * Service untuk memanggil API autentikasi
 */
export const authService = {
  /**
   * Melakukan pendaftaran akun baru
   * @param {string} email
   * @param {string} password
   */
  async register(email, password) {
    try {
      const response = await api.post('/register', { email, password });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend. Pastikan server backend sudah dijalankan (npm run dev di folder backend).');
      }
      const message = error.response.data?.message || 'maaf anda belum bisa register';
      throw new Error(message);
    }
  },

  /**
   * Melakukan login pengguna
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend. Pastikan server backend sudah dijalankan (npm run dev di folder backend).');
      }
      const message = error.response.data?.message || 'Login gagal. Periksa kembali email dan password.';
      throw new Error(message);
    }
  },

  /**
   * Mengambil data profil pengguna yang sedang login
   */
  async getMe() {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Server backend tidak dapat dihubungi.');
      }
      const message = error.response.data?.message || 'Gagal mengambil data profil pengguna.';
      throw new Error(message);
    }
  },
};
