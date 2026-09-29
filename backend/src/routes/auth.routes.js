import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoint Registrasi
router.post('/register', register);

// Endpoint Login
router.post('/login', login);

// Endpoint Profil Pengguna (Terlindungi)
router.get('/me', authenticate, getMe);

export default router;
