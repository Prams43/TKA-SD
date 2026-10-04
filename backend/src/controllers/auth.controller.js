import bcrypt from 'bcryptjs';
import {
  findUserByEmail,
  findUserByUsername,
  findUserByIdentifier,
  findUserById,
  createUser,
  updateUserOtp,
  markUserAsVerified,
  deleteUnverifiedUser,
  updateUserPassword,
} from '../models/user.model.js';
import { generateToken } from '../utils/token.js';
import { isValidEmail, isValidUsername, isValidPassword, isValidOtp } from '../utils/validator.js';
import { sendOtpEmail, sendResetPasswordEmail } from '../services/email.service.js';

/**
 * Controller untuk registrasi pengguna baru dengan pengiriman kode OTP 6 digit
 * POST /api/register
 */
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validasi input kelengkapan data
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, Email, dan password wajib diisi.',
      });
    }

    // 2. Validasi format Username
    if (!isValidUsername(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username harus 3-20 karakter (huruf, angka, titik, atau underscore tanpa spasi).',
      });
    }

    // 3. Validasi format Email (Bebas domain apapun)
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format email tidak valid. Pastikan penulisan alamat email sudah benar.',
      });
    }

    // 4. Validasi panjang password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password harus memiliki panjang minimal 8 karakter.',
      });
    }

    // 5. Periksa apakah Email sudah terdaftar dan terverifikasi
    const existingEmailUser = await findUserByEmail(email);
    if (existingEmailUser) {
      if (existingEmailUser.is_verified === 1) {
        return res.status(409).json({
          success: false,
          message: 'Alamat email ini sudah terdaftar dan aktif. Silakan langsung masuk.',
        });
      }
      // Jika email pernah didaftarkan tetapi belum diverifikasi, hapus data lama agar bisa daftar ulang
      await deleteUnverifiedUser(email);
    }

    // 6. Periksa apakah Username sudah digunakan oleh akun terverifikasi
    const existingUsername = await findUserByUsername(username);
    if (existingUsername && existingUsername.is_verified === 1) {
      return res.status(409).json({
        success: false,
        message: 'Username sudah digunakan. Silakan pilih username lain.',
      });
    }

    // 7. Enkripsi password menggunakan bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 8. Generate kode OTP 6 digit acak dan masa berlaku 10 menit
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // 9. Simpan pengguna baru dengan status belum terverifikasi (is_verified = 0)
    const newUser = await createUser(username, email, hashedPassword, otpCode, otpExpiresAt);

    // 10. Kirim kode OTP ke email pengguna
    await sendOtpEmail(email, otpCode, username);

    return res.status(201).json({
      success: true,
      requiresOtp: true,
      message: `Kode verifikasi 6 digit telah dikirim ke ${email}.`,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk memverifikasi kode OTP 6 digit pendaftaran
 * POST /api/verify-otp
 */
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email dan kode OTP wajib diisi.',
      });
    }

    if (!isValidOtp(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP harus berupa 6 digit angka.',
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Data akun tidak ditemukan.',
      });
    }

    if (user.is_verified === 1) {
      return res.status(200).json({
        success: true,
        message: 'Akun Anda sudah terverifikasi sebelumnya. Silakan langsung masuk.',
      });
    }

    // Periksa kesesuaian kode OTP
    if (user.otp_code !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP yang Anda masukkan salah. Periksa kembali email Anda.',
      });
    }

    // Periksa masa berlaku kode OTP
    if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP telah kedaluwarsa. Silakan klik tombol kirim ulang kode.',
      });
    }

    // Aktifkan akun pengguna
    await markUserAsVerified(email);

    return res.status(200).json({
      success: true,
      message: 'Verifikasi akun berhasil! Selamat datang di Portal TKA SD, silakan masuk.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk mengirim ulang kode OTP baru
 * POST /api/resend-otp
 */
export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email wajib diisi.',
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Data pendaftaran dengan email ini tidak ditemukan.',
      });
    }

    if (user.is_verified === 1) {
      return res.status(400).json({
        success: false,
        message: 'Akun ini sudah terverifikasi aktif.',
      });
    }

    // Buat kode OTP baru
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await updateUserOtp(email, newOtp, newExpiresAt);
    await sendOtpEmail(email, newOtp, user.username);

    return res.status(200).json({
      success: true,
      message: `Kode OTP baru berhasil dikirim ke ${email}.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk autentikasi login pengguna
 * POST /api/login
 * Mendukung login menggunakan Username ATAU Email (dengan pemeriksaan status verifikasi)
 */
export const login = async (req, res, next) => {
  try {
    const { identifier, email, username, password } = req.body;
    const userIdentifier = identifier || username || email;

    // 1. Validasi input kelengkapan
    if (!userIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username/Email dan password wajib diisi.',
      });
    }

    // 2. Cari pengguna di database D1 berdasarkan username ATAU email
    const user = await findUserByIdentifier(userIdentifier);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Username/Email atau password salah.',
      });
    }

    // 3. Bandingkan password yang dikirim dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Username/Email atau password salah.',
      });
    }

    // 4. Periksa apakah akun sudah diverifikasi
    if (user.is_verified === 0) {
      return res.status(403).json({
        success: false,
        requiresOtp: true,
        email: user.email,
        message: 'Akun Anda belum diverifikasi. Silakan masukkan kode OTP yang telah dikirim ke email Anda.',
      });
    }

    // 5. Buat token JWT (berlaku 1 hari)
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk mendapatkan profil pengguna yang sedang login
 * GET /api/me
 */
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Data pengguna tidak ditemukan.',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk meminta kode OTP reset password
 * POST /api/forgot-password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { identifier } = req.body;

    if (!identifier || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Username atau alamat email wajib diisi.',
      });
    }

    const cleanIdentifier = identifier.trim();
    const user = await findUserByIdentifier(cleanIdentifier);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Akun dengan username atau email tersebut tidak ditemukan.',
      });
    }

    if (user.is_verified === 0) {
      return res.status(400).json({
        success: false,
        message: 'Akun ini belum diverifikasi. Silakan selesaikan pendaftaran dan verifikasi terlebih dahulu.',
      });
    }

    // Generate kode OTP 6 digit dan masa berlaku 10 menit
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Simpan ke database
    await updateUserOtp(user.email, otpCode, otpExpiresAt);

    // Kirim email reset password
    await sendResetPasswordEmail(user.email, otpCode, user.username);

    // Masking email untuk privasi (misal: yu***@gmail.com)
    const [localPart, domain] = user.email.split('@');
    const maskedLocal = localPart.length > 2
      ? localPart.substring(0, 2) + '*'.repeat(Math.max(localPart.length - 2, 3))
      : localPart + '***';
    const maskedEmail = `${maskedLocal}@${domain}`;

    return res.status(200).json({
      success: true,
      message: `Kode keamanan reset password telah dikirim ke ${maskedEmail}.`,
      email: user.email,
      maskedEmail,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk memverifikasi kode OTP reset password sebelum memasukkan password baru
 * POST /api/verify-reset-otp
 */
export const verifyResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email dan kode OTP wajib diisi.',
      });
    }

    if (!isValidOtp(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP harus berupa 6 digit angka.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Data akun tidak ditemukan.',
      });
    }

    // Periksa kesesuaian kode OTP
    if (!user.otp_code || user.otp_code !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP yang Anda masukkan salah. Periksa kembali email Anda.',
      });
    }

    // Periksa kedaluwarsa kode OTP
    if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP telah kedaluwarsa. Silakan minta kode baru.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Kode OTP terverifikasi! Silakan buat password baru Anda.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk memverifikasi OTP dan mengatur password baru
 * POST /api/reset-password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, kode OTP, dan password baru wajib diisi.',
      });
    }

    if (!isValidOtp(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP harus berupa 6 digit angka.',
      });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Password baru harus memiliki panjang minimal 8 karakter.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await findUserByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Data akun tidak ditemukan.',
      });
    }

    // Periksa kesesuaian kode OTP
    if (!user.otp_code || user.otp_code !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP yang Anda masukkan salah. Silakan periksa kembali email Anda.',
      });
    }

    // Periksa kedaluwarsa kode OTP
    if (user.otp_expires_at && new Date(user.otp_expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Kode OTP telah kedaluwarsa. Silakan minta kode baru.',
      });
    }

    // Enkripsi password baru
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password dan reset OTP
    await updateUserPassword(cleanEmail, hashedPassword);

    return res.status(200).json({
      success: true,
      message: 'Password berhasil diperbarui! Silakan masuk dengan password baru Anda.',
    });
  } catch (error) {
    next(error);
  }
};



