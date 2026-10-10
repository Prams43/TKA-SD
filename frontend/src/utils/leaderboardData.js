import { AVAILABLE_TITLES, getUserProfileStats } from './activityTracker';

const LEADERBOARD_STORAGE_KEY = 'tka_leaderboard_registry_v1';

/**
 * Mengambil daftar seluruh user terdaftar di papan peringkat dari localStorage.
 * Leaderboard awalnya HANYA berisi nama user pengguna ('yuken'),
 * dan akan bertambah seiring bertambahnya user yang register, login, dan melakukan pembelajaran.
 */
export const getLeaderboardRegistry = () => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Bersihkan jika ada entri dummy/mock lama (misal berawalan peer_)
        const cleaned = parsed.filter((u) => !u.id?.startsWith('peer_'));
        return cleaned;
      }
    }
  } catch (e) {
    console.error('Gagal membaca registry leaderboard:', e);
  }
  return [];
};

/**
 * Menyimpan daftar user papan peringkat ke localStorage
 */
export const saveLeaderboardRegistry = (list) => {
  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Gagal menyimpan registry leaderboard:', e);
  }
};

/**
 * Mendaftarkan user baru (hasil register) ke dalam leaderboard jika belum ada
 */
export const registerUserToLeaderboard = (username) => {
  if (!username) return;
  const cleanName = username.trim();
  const registry = getLeaderboardRegistry();

  const existingIndex = registry.findIndex(
    (u) => u.name.toLowerCase() === cleanName.toLowerCase()
  );

  if (existingIndex === -1) {
    registry.push({
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: cleanName,
      level: 1,
      exp: 0,
      titleId: 'pemula',
      streak: 0,
      avatar: '🌱',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    saveLeaderboardRegistry(registry);
  }
};

/**
 * Melakukan sinkronisasi data user aktif (setelah login / selesai belajar materi / latihan / tryout)
 */
export const syncLeaderboardUser = (currentUser, userStats) => {
  const userName =
    currentUser?.username ||
    (currentUser?.email ? currentUser.email.split('@')[0] : 'yuken');

  const stats = userStats || getUserProfileStats();
  const currentTitleId = stats?.activeTitle?.id || 'pemula';
  const level = stats?.level || 1;
  const exp = stats?.totalExp || 0;
  const streak = stats?.streak?.count || 0;

  const registry = getLeaderboardRegistry();
  const existingIndex = registry.findIndex(
    (u) => u.name.toLowerCase() === userName.toLowerCase()
  );

  if (existingIndex >= 0) {
    registry[existingIndex] = {
      ...registry[existingIndex],
      level,
      exp,
      titleId: currentTitleId,
      streak,
      updatedAt: Date.now(),
    };
  } else {
    registry.push({
      id: currentUser?.id || `user_${Date.now()}`,
      name: userName,
      level,
      exp,
      titleId: currentTitleId,
      streak,
      avatar: '🦁',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  saveLeaderboardRegistry(registry);
};

/**
 * Menghasilkan data leaderboard terintegrasi dengan posisi realtime user.
 * Tanpa nama acak/random. Awalnya hanya user saat ini ('yuken'),
 * dan bertambah saat ada user baru yang register/login/belajar.
 */
export const getLeaderboardData = (currentUser, userStats) => {
  const userName =
    currentUser?.username ||
    (currentUser?.email ? currentUser.email.split('@')[0] : 'yuken');

  const stats = userStats || getUserProfileStats();

  // Sinkronkan dulu data user aktif saat ini
  syncLeaderboardUser(currentUser, stats);

  const registry = getLeaderboardRegistry();

  // Pastikan setidaknya ada data user aktif
  if (registry.length === 0) {
    registry.push({
      id: currentUser?.id || 'user_yuken',
      name: userName,
      level: stats?.level || 1,
      exp: stats?.totalExp || 0,
      titleId: stats?.activeTitle?.id || 'pemula',
      streak: stats?.streak?.count || 0,
      avatar: '🦁',
    });
    saveLeaderboardRegistry(registry);
  }

  // Format entri dan gabungkan dengan objek title lengkap
  const formatted = registry.map((entry) => {
    const isCurrentUser = entry.name.toLowerCase() === userName.toLowerCase();
    const titleObj =
      AVAILABLE_TITLES.find((t) => t.id === entry.titleId) || AVAILABLE_TITLES[0];

    return {
      id: entry.id,
      name: entry.name,
      level: entry.level || 1,
      exp: entry.exp || 0,
      title: isCurrentUser ? (stats?.activeTitle || titleObj) : titleObj,
      streak: entry.streak || 0,
      avatar: entry.avatar || (isCurrentUser ? '🦁' : '🧑‍🎓'),
      isCurrentUser,
    };
  });

  // Urutkan berdasarkan Level tertinggi, lalu EXP tertinggi, lalu Streak tertinggi
  const sorted = [...formatted].sort((a, b) => {
    if (b.level !== a.level) {
      return b.level - a.level;
    }
    if (b.exp !== a.exp) {
      return b.exp - a.exp;
    }
    return b.streak - a.streak;
  });

  // Berikan nomor urut peringkat (ranking)
  const ranked = sorted.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  const myEntry = ranked.find((item) => item.isCurrentUser) || ranked[0];
  const myRank = myEntry?.rank || 1;

  return {
    list: ranked,
    myRank,
    myEntry,
  };
};

// Dengarkan event pembaruan aktivitas belajar untuk sinkronisasi otomatis
if (typeof window !== 'undefined') {
  window.addEventListener('tka_profile_updated', () => {
    try {
      const savedUserRaw = localStorage.getItem('user');
      const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;
      syncLeaderboardUser(savedUser, getUserProfileStats());
    } catch (e) {
      console.warn('Gagal autosync profil ke leaderboard:', e);
    }
  });
}
