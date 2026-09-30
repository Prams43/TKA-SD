import { Router } from 'express';
import { register, verifyOtp, resendOtp, login, getMe } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoint Registrasi (Mengirimkan kode OTP)
router.post('/register', register);

// Endpoint Verifikasi OTP
router.post('/verify-otp', verifyOtp);

// Endpoint Kirim Ulang OTP
router.post('/resend-otp', resendOtp);

// Endpoint Login
router.post('/login', login);

// Endpoint Profil Pengguna (Terlindungi)
router.get('/me', authenticate, getMe);

export default router;

