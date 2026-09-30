/**
 * Validasi apakah format email valid (bebas menggunakan domain apapun: Gmail, Yahoo, Outlook, Sekolah, dll.)
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
};

// Alias untuk backward compatibility
export const isValidGmail = isValidEmail;

/**
 * Validasi format kode OTP (6 digit angka)
 * @param {string} otp
 * @returns {boolean}
 */
export const isValidOtp = (otp) => {
  if (!otp || typeof otp !== 'string') return false;
  return /^\d{6}$/.test(otp.trim());
};


/**
 * Validasi apakah username valid (3-20 karakter, huruf, angka, titik, underscore, tanpa spasi)
 * @param {string} username
 * @returns {boolean}
 */
export const isValidUsername = (username) => {
  if (!username || typeof username !== 'string') return false;
  const trimmed = username.trim();
  const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
  return usernameRegex.test(trimmed);
};

/**
 * Validasi apakah password memenuhi batas minimal 8 karakter
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 8;
};

