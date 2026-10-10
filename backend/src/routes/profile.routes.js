import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getLeaderboard,
} from '../controllers/profile.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoint Mengambil Profil Siswa (Terlindungi)
router.get('/profile', authenticate, getProfile);

// Endpoint Menyimpan / Mengupdate Profil Siswa (Terlindungi)
router.post('/profile', authenticate, updateProfile);
router.put('/profile', authenticate, updateProfile);

// Endpoint Papan Peringkat (Leaderboard) Global
router.get('/leaderboard', getLeaderboard);

export default router;
