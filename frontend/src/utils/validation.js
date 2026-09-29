/**
 * Validasi form pendaftaran (Register)
 * @param {Object} data { email, password, confirmPassword }
 * @returns {{ errors: Object, isValid: boolean }}
 */
export const validateRegisterForm = ({ email, password, confirmPassword }) => {
  const errors = {};

  // Validasi Email
  if (!email || !email.trim()) {
    errors.email = 'Gmail wajib diisi.';
  } else {
    const trimmed = email.trim().toLowerCase();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(trimmed)) {
      errors.email = 'Format email harus berakhiran @gmail.com (contoh: siswa@gmail.com).';
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
 * @param {Object} data { email, password }
 * @returns {{ errors: Object, isValid: boolean }}
 */
export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = 'Gmail wajib diisi.';
  } else {
    const trimmed = email.trim().toLowerCase();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(trimmed)) {
      errors.email = 'Gunakan akun Gmail (@gmail.com).';
    }
  }

  if (!password) {
    errors.password = 'Password wajib diisi.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
