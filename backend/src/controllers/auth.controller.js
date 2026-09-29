import bcrypt from 'bcryptjs';
import { findUserByEmail, findUserById, createUser } from '../models/user.model.js';
import { generateToken } from '../utils/token.js';
import { isValidGmail, isValidPassword } from '../utils/validator.js';

/**
 * Controller untuk registrasi pengguna baru
 * POST /api/register
 */
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input kelengkapan data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Gmail dan password wajib diisi.',
      });
    }

    // 2. Validasi format Gmail
    if (!isValidGmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format email tidak valid. Email harus berakhiran @gmail.com.',
      });
    }

    // 3. Validasi panjang password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password harus memiliki panjang minimal 8 karakter.',
      });
    }

    // 4. Periksa apakah Gmail sudah terdaftar di Cloudflare D1
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Gmail sudah terdaftar. Silakan gunakan akun lain atau masuk.',
      });
    }

    // 5. Enkripsi password menggunakan bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 6. Simpan pengguna baru ke database D1
    const newUser = await createUser(email, hashedPassword);

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil! Silakan masuk dengan akun Anda.',
      data: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk autentikasi login pengguna
 * POST /api/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input kelengkapan
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Gmail dan password wajib diisi.',
      });
    }

    // 2. Cari pengguna di database D1
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Gmail atau password salah.',
      });
    }

    // 3. Bandingkan password yang dikirim dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Gmail atau password salah.',
      });
    }

    // 4. Buat token JWT (berlaku 1 hari)
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return res.status(200).json({
      success: true,
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
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
        email: user.email,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};
