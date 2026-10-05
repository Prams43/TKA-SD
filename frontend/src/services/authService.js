import api from './api';

const extractErrorMessage = (error, defaultMessage) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (!error.response || error.response.status >= 500) {
    return 'Tidak dapat terhubung ke server backend. Pastikan server backend sudah dijalankan di port 5000 (cd backend && npm run dev).';
  }
  if (error.response.status === 404) {
    return 'Endpoint API tidak ditemukan (404). Jika diakses dari GitHub Pages, backend Express harus di-deploy online terlebih dahulu.';
  }
  return defaultMessage;
};

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
      const message = extractErrorMessage(error, 'maaf anda belum bisa register');
      const customErr = new Error(message);
      customErr.field = error.response?.data?.field;
      throw customErr;
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
      throw new Error(extractErrorMessage(error, 'Login gagal. Periksa kembali username/email dan password.'));
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
      throw new Error(extractErrorMessage(error, 'Kode OTP tidak valid atau telah kedaluwarsa.'));
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
      throw new Error(extractErrorMessage(error, 'Gagal mengirim ulang kode OTP.'));
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
      throw new Error(extractErrorMessage(error, 'Gagal memproses permintaan reset password.'));
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
      throw new Error(extractErrorMessage(error, 'Kode OTP tidak valid atau kedaluwarsa.'));
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
      throw new Error(extractErrorMessage(error, 'Gagal mereset password.'));
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
      throw new Error(extractErrorMessage(error, 'Gagal mengambil data profil pengguna.'));
    }
  },
};

