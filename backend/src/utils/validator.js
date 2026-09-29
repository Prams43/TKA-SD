/**
 * Validasi apakah email valid dan berakhiran @gmail.com
 * @param {string} email
 * @returns {boolean}
 */
export const isValidGmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  // Regex untuk memastikan format email valid dan domain gmail.com
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(trimmed);
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
