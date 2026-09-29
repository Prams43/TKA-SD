import { verifyToken } from '../utils/token.js';

/**
 * Middleware untuk memverifikasi JWT dari header Authorization
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak. Token tidak disediakan atau format salah.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Menyimpan data user (id, email) ke object request
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau telah kedaluwarsa. Silakan login kembali.',
    });
  }
};
