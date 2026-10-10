import {
  findProfileByUserId,
  upsertProfile,
  getLeaderboardList,
} from '../models/profile.model.js';

/**
 * Controller untuk mengambil profil dan aktivitas siswa yang sedang login
 * GET /api/profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let profile = await findProfileByUserId(userId);

    if (!profile) {
      // Default profile jika user baru pertama kali mengakses (bersih total: Level 1, 0 EXP, 0 Streak)
      const defaultData = {
        userId,
        exp: 0,
        level: 1,
        activeTitle: 'pemula',
        unlockedTitles: ['pemula'],
        streak: { count: 0, lastActiveDate: null, activeToday: false },
        activityData: {
          materiCompleted: [],
          unlockedMateri: ['mtk_1', 'bi_1'],
          materiStars: {},
          latihanCompleted: [],
          unlockedLatihan: ['mtk_lat_1', 'bi_lat_1'],
          latihanStars: {},
          latihanHistory: [],
          tryoutHistory: [],
        },
      };

      profile = await upsertProfile(userId, defaultData);
      return res.status(200).json({
        success: true,
        data: defaultData,
      });
    }

    let parsedUnlockedTitles = ['pemula'];
    let parsedActivityData = {};

    try {
      if (profile.unlocked_titles) {
        parsedUnlockedTitles = JSON.parse(profile.unlocked_titles);
      }
    } catch (_) {}

    try {
      if (profile.activity_data) {
        parsedActivityData = JSON.parse(profile.activity_data);
      }
    } catch (_) {}

    return res.status(200).json({
      success: true,
      data: {
        userId: profile.user_id,
        exp: profile.exp,
        level: profile.level,
        activeTitle: profile.active_title,
        unlockedTitles: parsedUnlockedTitles,
        streak: {
          count: profile.streak_count,
          lastActiveDate: profile.last_active_date,
        },
        activityData: parsedActivityData,
        updatedAt: profile.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk menyimpan / memperbarui profil & aktivitas siswa ke database
 * POST /api/profile atau PUT /api/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const body = req.body || {};

    const saved = await upsertProfile(userId, body);

    return res.status(200).json({
      success: true,
      message: 'Profil dan aktivitas berhasil disimpan ke Cloudflare D1!',
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller untuk mendapatkan papan peringkat (leaderboard) global
 * GET /api/leaderboard
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 100;
    const rows = await getLeaderboardList(limit);

    return res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};
