import api from './api';

/**
 * Service untuk memanggil API autentikasi
 */
export const authService = {
  /**
   * Melakukan pendaftaran akun baru
   * @param {string} username
   * @param {string} email
   * @param {string} password
   */
  async register(username, email, password) {
    try {
      const response = await api.post('/register', { username, email, password });
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
   * Melakukan login pengguna (dengan Username ATAU Gmail)
   * @param {string} identifier (username atau email)
   * @param {string} password
   */
  async login(identifier, password) {
    try {
      const response = await api.post('/login', { identifier, password });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend. Pastikan server backend sudah dijalankan (npm run dev di folder backend).');
      }
      const message = error.response.data?.message || 'Login gagal. Periksa kembali username/email dan password.';
      throw new Error(message);
    }
  },

  /**
   * Memverifikasi kode OTP 6 digit
   * @param {string} email
   * @param {string} otp
   */
  async verifyOtp(email, otp) {
    try {
      const response = await api.post('/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend.');
      }
      const message = error.response.data?.message || 'Kode OTP tidak valid atau telah kedaluwarsa.';
      throw new Error(message);
    }
  },

  /**
   * Mengirim ulang kode OTP ke email
   * @param {string} email
   */
  async resendOtp(email) {
    try {
      const response = await api.post('/resend-otp', { email });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend.');
      }
      const message = error.response.data?.message || 'Gagal mengirim ulang kode OTP.';
      throw new Error(message);
    }
  },

  /**
   * Meminta kode OTP reset password (dengan username atau email)
   * @param {string} identifier
   */
  async forgotPassword(identifier) {
    try {
      const response = await api.post('/forgot-password', { identifier });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend.');
      }
      const message = error.response.data?.message || 'Gagal memproses permintaan reset password.';
      throw new Error(message);
    }
  },

  /**
   * Memverifikasi kode OTP reset password
   * @param {string} email
   * @param {string} otp
   */
  async verifyResetOtp(email, otp) {
    try {
      const response = await api.post('/verify-reset-otp', { email, otp });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend.');
      }
      const message = error.response.data?.message || 'Kode OTP tidak valid atau kedaluwarsa.';
      throw new Error(message);
    }
  },

  /**
   * Mengatur ulang kata sandi dengan kode OTP
   * @param {string} email
   * @param {string} otp
   * @param {string} newPassword
   */
  async resetPassword(email, otp, newPassword) {
    try {
      const response = await api.post('/reset-password', { email, otp, newPassword });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Tidak dapat terhubung ke server backend.');
      }
      const message = error.response.data?.message || 'Gagal mereset password.';
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

