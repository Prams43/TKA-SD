/**
 * Validasi form pendaftaran (Register)
 * @param {Object} data { username, email, password, confirmPassword }
 * @returns {{ errors: Object, isValid: boolean }}
 */
export const validateRegisterForm = ({ username, email, password, confirmPassword }) => {
  const errors = {};

  // Validasi Username
  if (!username || !username.trim()) {
    errors.username = 'Username wajib diisi.';
  } else {
    const trimmedUser = username.trim();
    const userRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    if (!userRegex.test(trimmedUser)) {
      errors.username = 'Username harus 3-20 karakter (huruf, angka, titik, atau underscore tanpa spasi).';
    }
  }

  // Validasi Email (Bebas domain apapun)
  if (!email || !email.trim()) {
    errors.email = 'Alamat email wajib diisi.';
  } else {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
      errors.email = 'Format email tidak valid (contoh: siswa@sekolah.id atau nama@gmail.com).';
    }
  }

  // Validasi Password
  if (!password) {
    errors.password = 'Password wajib diisi.';
  } else if (password.length < 8) {
    errors.password = 'Password minimal harus 8 karakter.';
  }

  // Validasi Konfirmasi Password
  if (!confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password tidak cocok dengan password.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

/**
 * Validasi form login
 * @param {Object} data { identifier, password }
 * @returns {{ errors: Object, isValid: boolean }}
 */
export const validateLoginForm = ({ identifier, password }) => {
  const errors = {};

  if (!identifier || !identifier.trim()) {
    errors.identifier = 'Username atau Email wajib diisi.';
  }

  if (!password) {
    errors.password = 'Password wajib diisi.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

/**
 * Validasi kode OTP (6 digit angka)
 * @param {string} otp
 * @returns {boolean}
 */
export const isValidOtp = (otp) => {
  if (!otp) return false;
  return /^\d{6}$/.test(otp.trim());
};


