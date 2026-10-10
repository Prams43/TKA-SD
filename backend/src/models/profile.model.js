import { query } from '../config/db.js';

/**
 * Mengambil profil gamifikasi pengguna berdasarkan user_id dari Cloudflare D1
 * @param {number|string} userId
 */
export const findProfileByUserId = async (userId) => {
  const sql = `
    SELECT user_id, exp, level, active_title, unlocked_titles, streak_count, last_active_date, activity_data, updated_at
    FROM user_profiles
    WHERE user_id = ?
    LIMIT 1
  `;
  const response = await query(sql, [userId]);
  return response.results.length > 0 ? response.results[0] : null;
};

/**
 * Menyimpan / memperbarui (upsert) data profil pengguna di Cloudflare D1
 * @param {number|string} userId
 * @param {Object} data
 */
export const upsertProfile = async (userId, data) => {
  const exp = Math.max(0, Number(data.exp ?? data.totalExp ?? 0));
  const level = Math.max(1, Number(data.level ?? Math.floor(exp / 100) + 1));
  const activeTitle = String(data.activeTitle || data.active_title || 'pemula');
  const unlockedTitlesStr = JSON.stringify(
    Array.isArray(data.unlockedTitles) ? data.unlockedTitles : ['pemula']
  );
  const streakCount = Number(
    data.streak?.count ?? data.streakCount ?? data.streak_count ?? 0
  );
  const lastActiveDate = data.streak?.lastActiveDate || data.lastActiveDate || null;
  const activityDataStr = JSON.stringify(data.activityData || data.activity_data || {});

  const sql = `
    INSERT INTO user_profiles (
      user_id, exp, level, active_title, unlocked_titles, streak_count, last_active_date, activity_data, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET
      exp = excluded.exp,
      level = excluded.level,
      active_title = excluded.active_title,
      unlocked_titles = excluded.unlocked_titles,
      streak_count = excluded.streak_count,
      last_active_date = excluded.last_active_date,
      activity_data = excluded.activity_data,
      updated_at = CURRENT_TIMESTAMP
  `;

  await query(sql, [
    userId,
    exp,
    level,
    activeTitle,
    unlockedTitlesStr,
    streakCount,
    lastActiveDate,
    activityDataStr,
  ]);

  return {
    userId,
    exp,
    level,
    activeTitle,
    unlockedTitles: JSON.parse(unlockedTitlesStr),
    streak: { count: streakCount, lastActiveDate },
    activityData: JSON.parse(activityDataStr),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Mengambil daftar papan peringkat (leaderboard) global dari seluruh siswa terdaftar di Cloudflare D1
 * @param {number} limit
 */
export const getLeaderboardList = async (limit = 100) => {
  const sql = `
    SELECT 
      u.id, 
      u.username, 
      COALESCE(p.exp, 0) as exp, 
      COALESCE(p.level, 1) as level, 
      COALESCE(p.active_title, 'pemula') as active_title, 
      COALESCE(p.streak_count, 0) as streak_count,
      COALESCE(p.updated_at, u.created_at) as updated_at
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE u.is_verified = 1
    ORDER BY level DESC, exp DESC, streak_count DESC
    LIMIT ?
  `;
  const response = await query(sql, [limit]);
  return response.results || [];
};
