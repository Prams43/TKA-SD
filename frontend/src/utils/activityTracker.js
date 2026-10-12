import { profileService } from '../services/profileService';
import {
  CHARACTER_AVATARS,
  DEFAULT_AVATAR_ID,
  STARTER_AVATAR_IDS,
  FANTASY_AVATAR_IDS,
} from './characterAvatars';

/**
 * Activity Tracker TKA SD
 * Menyimpan dan mengelola statistik aktivitas belajar murid secara persisten (localStorage + Cloudflare D1)
 * untuk disajikan pada halaman Rapor dan Profil.
 */

const STORAGE_KEY = 'tka_sd_user_activity_v2';

// Bersihkan cache lama jika ada di browser
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('tka_sd_user_activity_v1');
  } catch (_) {}
}

export const getTodayDateStr = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getYesterdayDateStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Daftar Gelar Pembelajaran TKA SD yang bisa didapatkan siswa
 */
/**
 * Konfigurasi posisi dan sudut kemiringan (tilt) yang presisi untuk setiap icon gelar
 * disesuaikan dengan proporsi, bobot visual & bentuk emoji masing-masing.
 */
export const TITLE_BADGE_CONFIG = {
  pemula: {
    // 🌱 Tunas: tumbuh keluar dari sudut kiri atas
    className: '-top-3 -left-2.5 -rotate-[15deg]',
  },
  literasi_fondasi: {
    // 📖 Buku: stiker buku terbuka
    className: '-top-2.5 -left-2.5 -rotate-[10deg]',
  },
  numerasi_dasar: {
    // 🔢 Angka: balok keypad angka rapi
    className: '-top-2 -left-2 -rotate-[8deg]',
  },
  pejuang_latihan: {
    // ⚔️ Pedang: pedang ksatria pejuang latihan
    className: '-top-2.5 -left-2.5 -rotate-[10deg]',
  },
  bintang_tryout: {
    // ⭐ Bintang: bintang emas dinamis
    className: '-top-2.5 -left-2.5 -rotate-[15deg]',
  },
  streak_master: {
    // 🔥 Api: kobaran api semangat
    className: '-top-3 -left-2 -rotate-[8deg]',
  },
  juara_skor: {
    // 👑 Mahkota: mahkota raja bertengger di atas kepala
    className: '-top-3.5 -left-2 -rotate-[15deg]',
  },
  cendekiawan_muda: {
    // 🎓 Toga: topi wisuda cendekiawan
    className: '-top-3 -left-2 -rotate-[12deg]',
  },
  legenda_sd: {
    // 🏆 Piala: piala emas juara nusantara
    className: '-top-3 -left-2 -rotate-[10deg]',
  },
  default: {
    className: '-top-2.5 -left-2 -rotate-[12deg]',
  },
};

/**
 * Mendapatkan class Tailwind posisi & rotasi yang pas untuk icon gelar tertentu
 */
export const getTitleBadgeClass = (titleOrId) => {
  if (!titleOrId) return TITLE_BADGE_CONFIG.default.className;
  const titleId = typeof titleOrId === 'string' ? titleOrId : titleOrId?.id;
  return (TITLE_BADGE_CONFIG[titleId] || TITLE_BADGE_CONFIG.default).className;
};

export const AVAILABLE_TITLES = [
  {
    id: 'pemula',
    name: 'Siswa Penjelajah',
    icon: '🌱',
    color: 'emerald',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    badgeClassName: '-top-3 -left-2.5 -rotate-[15deg]',
    desc: 'Gelar kehormatan untuk murid yang siap menaklukkan Asesmen TKA SD.',
    requirement: 'Terbuka otomatis untuk seluruh siswa',
    isUnlocked: () => true,
  },
  {
    id: 'literasi_fondasi',
    name: 'Penjelajah Literasi',
    icon: '📖',
    color: 'blue',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-300',
    badgeClassName: '-top-2.5 -left-2.5 -rotate-[10deg]',
    desc: 'Menguasai konsep dasar pemahaman teks Bahasa Indonesia.',
    requirement: 'Selesaikan minimal 1 materi atau latihan Bahasa Indonesia',
    isUnlocked: (data) =>
      (data.materiCompleted || []).some((id) => id.startsWith('bi_')) ||
      (data.latihanCompleted || []).some((id) => id.startsWith('bi_')),
  },
  {
    id: 'numerasi_dasar',
    name: 'Pakar Hitung Cepat',
    icon: '🔢',
    color: 'teal',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-300',
    badgeClassName: '-top-2 -left-2 -rotate-[8deg]',
    desc: 'Mahir dalam operasi hitung bilangan dan logika Matematika.',
    requirement: 'Selesaikan minimal 1 materi atau latihan Matematika',
    isUnlocked: (data) =>
      (data.materiCompleted || []).some((id) => id.startsWith('mtk_')) ||
      (data.latihanCompleted || []).some((id) => id.startsWith('mtk_')),
  },
  {
    id: 'pejuang_latihan',
    name: 'Pejuang Latihan Tangguh',
    icon: '⚔️',
    color: 'indigo',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-300',
    badgeClassName: '-top-2.5 -left-2.5 -rotate-[10deg]',
    desc: 'Menuntaskan banyak variasi butir soal latihan Pusmendik.',
    requirement: 'Selesaikan minimal 3 sesi Latihan Soal',
    isUnlocked: (data) =>
      (data.latihanCompleted || []).length >= 3 || (data.latihanHistory || []).length >= 3,
  },
  {
    id: 'bintang_tryout',
    name: 'Bintang Asesmen Pusmendik',
    icon: '⭐',
    color: 'amber',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-300',
    badgeClassName: '-top-2.5 -left-2.5 -rotate-[15deg]',
    desc: 'Menuntaskan simulasi Tryout Asesmen Berstandar Pusmendik.',
    requirement: 'Selesaikan minimal 1 sesi paket Tryout',
    isUnlocked: (data) => (data.tryoutHistory || []).length >= 1,
  },
  {
    id: 'streak_master',
    name: 'Sang Penjaga Api Belajar',
    icon: '🔥',
    color: 'orange',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-300',
    badgeClassName: '-top-3 -left-2 -rotate-[8deg]',
    desc: 'Konsisten belajar setiap hari berturut-turut tanpa putus.',
    requirement: 'Capai streak belajar minimal 3 hari',
    isUnlocked: (data) => (data.streak?.count || 0) >= 3,
  },
  {
    id: 'juara_skor',
    name: 'Maestro Nilai Sempurna',
    icon: '👑',
    color: 'yellow',
    badgeColor: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    badgeClassName: '-top-3.5 -left-2 -rotate-[15deg]',
    desc: 'Meraih skor sempurna 100 pada Latihan Soal atau Tryout.',
    requirement: 'Raih nilai 100 pada Latihan Soal atau Tryout',
    isUnlocked: (data) =>
      (data.latihanHistory || []).some((l) => (l.score || 0) >= 100) ||
      (data.tryoutHistory || []).some((t) => (t.score || 0) >= 95),
  },
  {
    id: 'cendekiawan_muda',
    name: 'Cendekiawan Muda TKA',
    icon: '🎓',
    color: 'purple',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-300',
    badgeClassName: '-top-3 -left-2 -rotate-[12deg]',
    desc: 'Mencapai Level 5 ke atas dari dedikasi belajar konsisten.',
    requirement: 'Capai Level 5 (kumpulkan minimal 1.400 EXP)',
    isUnlocked: (data) => calculateLevelInfo(data.exp || 0).level >= 5,
  },
  {
    id: 'legenda_sd',
    name: 'Legenda Juara Nusantara',
    icon: '🏆',
    color: 'rose',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-300',
    badgeClassName: '-top-3 -left-2 -rotate-[10deg]',
    desc: 'Pencapaian master tertinggi di seluruh penjuru Nusantara.',
    requirement: 'Capai Level 10 (kumpulkan minimal 9.200 EXP)',
    isUnlocked: (data) => calculateLevelInfo(data.exp || 0).level >= 10,
  },
];

/**
 * Tabel ambang batas kumulatif EXP untuk setiap level.
 * EXP yang dibutuhkan untuk naik level meningkat secara bertahap
 * agar seimbang dengan total materi (33 bab), drill soal (20 level), dan tryout nasional.
 */
export const LEVEL_EXP_TABLE = [
  { level: 1, requiredExp: 0, nextLevelExp: 150 },      // Level 1: butuh 150 EXP menuju Lv 2
  { level: 2, requiredExp: 150, nextLevelExp: 250 },    // Level 2: butuh 250 EXP menuju Lv 3 (total 400)
  { level: 3, requiredExp: 400, nextLevelExp: 400 },    // Level 3: butuh 400 EXP menuju Lv 4 (total 800)
  { level: 4, requiredExp: 800, nextLevelExp: 600 },    // Level 4: butuh 600 EXP menuju Lv 5 (total 1.400)
  { level: 5, requiredExp: 1400, nextLevelExp: 850 },   // Level 5: butuh 850 EXP menuju Lv 6 (total 2.250)
  { level: 6, requiredExp: 2250, nextLevelExp: 1150 },  // Level 6: butuh 1.150 EXP menuju Lv 7 (total 3.400)
  { level: 7, requiredExp: 3400, nextLevelExp: 1500 },  // Level 7: butuh 1.500 EXP menuju Lv 8 (total 4.900)
  { level: 8, requiredExp: 4900, nextLevelExp: 1900 },  // Level 8: butuh 1.900 EXP menuju Lv 9 (total 6.800)
  { level: 9, requiredExp: 6800, nextLevelExp: 2400 },  // Level 9: butuh 2.400 EXP menuju Lv 10 (total 9.200)
  { level: 10, requiredExp: 9200, nextLevelExp: 3000 }, // Level 10: master tertinggi (butuh 3.000 EXP per level)
];

/**
 * Menghitung detail level dan progres EXP secara dinamis (Scaling Curve)
 */
export const calculateLevelInfo = (exp = 0) => {
  const currentExp = Math.max(0, Number(exp) || 0);

  let currentLevel = 1;
  let levelBaseExp = 0;
  let nextLevelExp = 150;

  for (let i = LEVEL_EXP_TABLE.length - 1; i >= 0; i--) {
    if (currentExp >= LEVEL_EXP_TABLE[i].requiredExp) {
      currentLevel = LEVEL_EXP_TABLE[i].level;
      levelBaseExp = LEVEL_EXP_TABLE[i].requiredExp;
      nextLevelExp = LEVEL_EXP_TABLE[i].nextLevelExp;
      break;
    }
  }

  // Jika melebihi Level 10 (Endgame mastery)
  if (currentExp >= 9200) {
    const extraExp = currentExp - 9200;
    const extraLevels = Math.floor(extraExp / 3000);
    currentLevel = 10 + extraLevels;
    levelBaseExp = 9200 + extraLevels * 3000;
    nextLevelExp = 3000;
  }

  const currentLevelExp = currentExp - levelBaseExp;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((currentLevelExp / nextLevelExp) * 100))
  );

  return {
    level: currentLevel,
    totalExp: currentExp,
    currentLevelExp,
    nextLevelExp,
    expRemaining: Math.max(0, nextLevelExp - currentLevelExp),
    progressPercent,
  };
};

export const notifyProfileUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('tka_profile_updated'));
  }
};

/**
 * Cek dan tambahkan gelar baru yang terbuka ke data pengguna
 */
export const checkAndUnlockTitles = (data) => {
  if (!data.unlockedTitles) data.unlockedTitles = ['pemula'];
  let hasNew = false;

  AVAILABLE_TITLES.forEach((title) => {
    if (!data.unlockedTitles.includes(title.id)) {
      if (title.isUnlocked(data)) {
        data.unlockedTitles.push(title.id);
        hasNew = true;
      }
    }
  });

  return hasNew;
};

export const getActivityData = () => {
  let data = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) data = JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca aktivitas:', e);
  }

  if (!data) {
    data = {
      materiCompleted: [],
      unlockedMateri: ['mtk_1', 'bi_1'],
      materiStars: {},
      latihanCompleted: [],
      unlockedLatihan: ['mtk_lat_1', 'bi_lat_1'],
      latihanStars: {},
      latihanHistory: [],
      tryoutHistory: [],
      streak: {
        count: 0,
        lastActiveDate: null,
        activeToday: false,
      },
      exp: 0,
      unlockedTitles: ['pemula'],
      activeTitle: 'pemula',
      avatar: 'baby-boy',
      unlockedAvatars: ['baby-boy', 'baby-girl'],
    };
  }

  // Pastikan properti dasar selalu tersedia
  if (!data.materiCompleted) data.materiCompleted = [];
  if (!data.unlockedMateri) data.unlockedMateri = ['mtk_1', 'bi_1'];
  if (!data.materiStars) data.materiStars = {};
  if (!data.latihanCompleted) data.latihanCompleted = [];
  if (!data.unlockedLatihan) data.unlockedLatihan = ['mtk_lat_1', 'bi_lat_1'];
  if (!data.latihanStars) data.latihanStars = {};
  if (!data.latihanHistory) data.latihanHistory = [];
  if (!data.tryoutHistory) data.tryoutHistory = [];

  // Filter sample dummy jika pernah tersimpan di cache
  data.latihanHistory = (data.latihanHistory || []).filter(
    (l) => !l.id?.startsWith('lat_sample_')
  );
  data.tryoutHistory = (data.tryoutHistory || []).filter(
    (t) => !t.id?.startsWith('to_sample_')
  );

  // Inisialisasi Fitur Streak (Reset otomatis pada jam 12 malam)
  const today = getTodayDateStr();
  const yesterday = getYesterdayDateStr();

  if (!data.streak) {
    data.streak = {
      count: 0,
      lastActiveDate: null,
      activeToday: false,
    };
  } else {
    if (data.streak.lastActiveDate === today) {
      data.streak.activeToday = true;
    } else if (data.streak.lastActiveDate === yesterday) {
      data.streak.activeToday = false;
    } else {
      // Sudah lewat jam 12 malam -> streak reset ke 0
      data.streak.count = 0;
      data.streak.activeToday = false;
    }
  }

  // Inisialisasi Total EXP
  if (data.exp === undefined || data.exp === null) {
    // Hitung baseline EXP hanya dari riwayat aktivitas yang tuntas
    const materiExp = (data.materiCompleted || []).length * 80;
    const latihanExp = (data.latihanHistory || [])
      .filter((l) => l.isCompletedAll !== false)
      .reduce((sum, l) => sum + (l.expEarned || 80), 0);
    const tryoutExp = (data.tryoutHistory || [])
      .filter((t) => t.isCompletedAll !== false)
      .reduce((sum, t) => sum + (t.expEarned || 150), 0);
    data.exp = materiExp + latihanExp + tryoutExp;
  }

  // Inisialisasi Gelar (Titles)
  if (!data.unlockedTitles || !Array.isArray(data.unlockedTitles)) {
    data.unlockedTitles = ['pemula'];
  }
  if (!data.activeTitle) {
    data.activeTitle = 'pemula';
  }

  if (!data.avatar || data.avatar === 'boy') {
    data.avatar = 'baby-boy';
  }

  if (!data.unlockedAvatars || !Array.isArray(data.unlockedAvatars)) {
    data.unlockedAvatars = ['baby-boy', 'baby-girl'];
  }

  // Cek apakah ada gelar baru yang memenuhi syarat
  checkAndUnlockTitles(data);

  // Cek apakah ada karakter avatar / paket hadiah baru yang memenuhi syarat
  checkAndUnlockAvatars(data);

  // Pastikan avatar aktif selalu valid dan berada di daftar avatar yang sudah terbuka
  if (!data.unlockedAvatars.includes(data.avatar)) {
    data.avatar = 'baby-boy';
  }

  return data;
};

let syncTimeout = null;

/**
 * Menyinkronkan data profil dan statistik belajar ke Cloudflare D1 (debounced)
 */
export const syncProfileToDatabase = (data) => {
  if (typeof window === 'undefined') return;
  const token = localStorage.getItem('token');
  if (!token) return;

  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      const payload = {
        exp: data.exp || 0,
        level: calculateLevelInfo(data.exp || 0).level,
        activeTitle: data.activeTitle || 'pemula',
        unlockedTitles: data.unlockedTitles || ['pemula'],
        streak: data.streak || { count: 0, lastActiveDate: null, activeToday: false },
        activityData: {
          avatar: data.avatar || 'baby-boy',
          unlockedAvatars: data.unlockedAvatars || ['baby-boy', 'baby-girl'],
          materiCompleted: data.materiCompleted || [],
          unlockedMateri: data.unlockedMateri || ['mtk_1', 'bi_1'],
          materiStars: data.materiStars || {},
          latihanCompleted: data.latihanCompleted || [],
          unlockedLatihan: data.unlockedLatihan || ['mtk_lat_1', 'bi_lat_1'],
          latihanStars: data.latihanStars || {},
          latihanHistory: data.latihanHistory || [],
          tryoutHistory: data.tryoutHistory || [],
        },
      };
      await profileService.saveProfile(payload);
    } catch (err) {
      console.warn('Sinkronisasi ke Cloudflare D1 tertunda:', err?.message || err);
    }
  }, 600);
};

/**
 * Mengambil dan menggabungkan data profil dari Cloudflare D1 ke penyimpanan lokal
 */
export const syncProfileFromDatabase = async () => {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const dbProfile = await profileService.getProfile();
    if (!dbProfile) return null;

    const data = getActivityData();

    if (dbProfile.exp !== undefined && dbProfile.exp !== null) {
      data.exp = dbProfile.exp;
    }
    if (dbProfile.activeTitle) {
      data.activeTitle = dbProfile.activeTitle;
    }
    if (Array.isArray(dbProfile.unlockedTitles) && dbProfile.unlockedTitles.length > 0) {
      data.unlockedTitles = dbProfile.unlockedTitles;
    }
    if (dbProfile.streak) {
      data.streak = {
        ...data.streak,
        ...dbProfile.streak,
      };
    }
    if (dbProfile.activityData && typeof dbProfile.activityData === 'object') {
      const act = dbProfile.activityData;
      if (Array.isArray(act.materiCompleted)) data.materiCompleted = act.materiCompleted;
      if (Array.isArray(act.unlockedMateri)) data.unlockedMateri = act.unlockedMateri;
      if (act.materiStars) data.materiStars = act.materiStars;
      if (Array.isArray(act.latihanCompleted)) data.latihanCompleted = act.latihanCompleted;
      if (Array.isArray(act.unlockedLatihan)) data.unlockedLatihan = act.unlockedLatihan;
      if (act.latihanStars) data.latihanStars = act.latihanStars;
      if (act.avatar) data.avatar = act.avatar;
      if (Array.isArray(act.unlockedAvatars)) {
        data.unlockedAvatars = act.unlockedAvatars;
      }
      if (Array.isArray(act.latihanHistory)) data.latihanHistory = act.latihanHistory;
      if (Array.isArray(act.tryoutHistory)) data.tryoutHistory = act.tryoutHistory;
    }

    checkAndUnlockTitles(data);
    saveActivityData(data, false);
    notifyProfileUpdate();
    return data;
  } catch (err) {
    console.warn('Gagal memuat profil dari Cloudflare D1:', err?.message || err);
    return null;
  }
};

/**
 * Menyimpan data aktivitas ke localStorage dan menyinkronkannya ke Cloudflare D1
 */
export const saveActivityData = (data, shouldSync = true) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (shouldSync) {
      syncProfileToDatabase(data);
    }
  } catch (e) {
    console.error('Gagal menyimpan aktivitas:', e);
  }
};

export const unlockMateri = (babId) => {
  const data = getActivityData();
  if (!data.unlockedMateri) data.unlockedMateri = ['mtk_1', 'bi_1'];
  if (!data.unlockedMateri.includes(babId)) {
    data.unlockedMateri.push(babId);
    saveActivityData(data);
  }
};

export const resetMateriProgress = (subject = null) => {
  const data = getActivityData();
  if (!data.materiStars) data.materiStars = {};
  if (!subject) {
    data.materiCompleted = [];
    data.unlockedMateri = ['mtk_1', 'bi_1'];
    data.materiStars = {};
  } else if (subject === 'matematika') {
    data.materiCompleted = (data.materiCompleted || []).filter((id) => !id.startsWith('mtk_'));
    data.unlockedMateri = (data.unlockedMateri || []).filter((id) => !id.startsWith('mtk_'));
    data.unlockedMateri.push('mtk_1');
    Object.keys(data.materiStars).forEach((key) => {
      if (key.startsWith('mtk_')) delete data.materiStars[key];
    });
  } else if (subject === 'bahasa_indonesia') {
    data.materiCompleted = (data.materiCompleted || []).filter((id) => !id.startsWith('bi_'));
    data.unlockedMateri = (data.unlockedMateri || []).filter((id) => !id.startsWith('bi_'));
    data.unlockedMateri.push('bi_1');
    Object.keys(data.materiStars).forEach((key) => {
      if (key.startsWith('bi_')) delete data.materiStars[key];
    });
  }
  saveActivityData(data);
  return data;
};

/**
 * Memicu pop-up reward perolehan EXP dan Level Up Duolingo-style
 */
export const triggerRewardCelebration = (detail) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tka_reward_earned', { detail }));
  }
};

export const recordUserActivity = (actionType = 'general', expEarned = 50) => {
  const data = getActivityData();
  const prevExp = data.exp || 0;
  const prevLevelInfo = calculateLevelInfo(prevExp);
  const prevLevel = prevLevelInfo.level;
  const prevUnlocked = [...(data.unlockedTitles || ['pemula'])];

  const today = getTodayDateStr();
  const yesterday = getYesterdayDateStr();

  // 1. Update streak
  if (!data.streak) {
    data.streak = { count: 1, lastActiveDate: today, activeToday: true };
  } else {
    if (data.streak.lastActiveDate === today) {
      data.streak.activeToday = true;
    } else if (data.streak.lastActiveDate === yesterday) {
      data.streak.count = (data.streak.count || 0) + 1;
      data.streak.lastActiveDate = today;
      data.streak.activeToday = true;
    } else {
      data.streak.count = 1;
      data.streak.lastActiveDate = today;
      data.streak.activeToday = true;
    }
  }

  // 2. Tambah EXP
  data.exp = (data.exp || 0) + expEarned;
  const newLevelInfo = calculateLevelInfo(data.exp);
  const leveledUp = newLevelInfo.level > prevLevel;

  // 3. Cek gelar baru
  checkAndUnlockTitles(data);
  const newTitlesUnlocked = (data.unlockedTitles || [])
    .filter((id) => !prevUnlocked.includes(id))
    .map((id) => AVAILABLE_TITLES.find((t) => t.id === id))
    .filter(Boolean);

  saveActivityData(data);
  notifyProfileUpdate();

  // 4. Memicu Event Pop-up Duolingo Reward
  triggerRewardCelebration({
    expEarned,
    prevExp,
    newExp: data.exp,
    prevLevelInfo,
    newLevelInfo,
    leveledUp,
    streak: data.streak,
    actionType,
    newTitlesUnlocked,
  });

  return { data, leveledUp, expEarned, newLevelInfo };
};

export const setActiveTitle = (titleId) => {
  const data = getActivityData();
  const valid = AVAILABLE_TITLES.find((t) => t.id === titleId);
  if (valid && (data.unlockedTitles || []).includes(titleId)) {
    data.activeTitle = titleId;
    saveActivityData(data);
    notifyProfileUpdate();
    return true;
  }
  return false;
};

export const getUserProfileStats = () => {
  const data = getActivityData();
  const levelInfo = calculateLevelInfo(data.exp || 0);
  const activeTitleObj =
    AVAILABLE_TITLES.find((t) => t.id === data.activeTitle) || AVAILABLE_TITLES[0];

  return {
    ...levelInfo,
    streak: data.streak || { count: 0, lastActiveDate: null, activeToday: false },
    activeTitle: activeTitleObj,
    unlockedTitles: data.unlockedTitles || ['pemula'],
    avatar: data.avatar || 'baby-boy',
    unlockedAvatars: data.unlockedAvatars || ['baby-boy', 'baby-girl'],
    allTitles: AVAILABLE_TITLES.map((t) => ({
      ...t,
      unlocked: (data.unlockedTitles || []).includes(t.id),
      isActive: (data.activeTitle || 'pemula') === t.id,
    })),
  };
};

/**
 * Memeriksa dan membuka kunci karakter avatar berdasarkan capaian materi dan latihan soal.
 * Membedakan capaian antara Bahasa Indonesia dan Matematika:
 * - Starter: 'baby-boy' (Adik Pintar) & 'baby-girl' (Adik Manis)
 * - Paket Siswa & Siswi ('boy' & 'girl'): Materi Bahasa Indonesia (min. 1 Bab)
 * - Paket Anak Petualang & Ceria ('child-boy' & 'child-girl'): Materi Matematika (min. 1 Bab)
 * - Paket Raja & Ratu ('king' & 'queen'): Capai Level 5 dari gabungan belajar
 * - Pahlawan ('knight', 'ninja', 'cowboy'): Latihan Soal Matematika (1, 3, 5 sesi)
 * - Hewan ('fox', 'red-wolf', 'cow', 'teddy-bear-heart', 'panda', 'sheep', 'frog'): Materi & Latihan B. Indo / Matematika
 * - Fantasi: Spesial Gacha Tryout (min. 80% benar)
 */
export const checkAndUnlockAvatars = (data) => {
  // Ambil karakter fantasi yang sebelumnya sudah sah di-gacha
  const existingGacha = (data.unlockedAvatars || []).filter((id) =>
    FANTASY_AVATAR_IDS.includes(id)
  );

  // Set avatar yang sah terbuka: starter ('baby-boy', 'baby-girl') + gacha fantasi yang sudah didapat
  const legitUnlocked = new Set(['baby-boy', 'baby-girl', ...existingGacha]);

  const materiCompleted = data.materiCompleted || [];
  const biMateriCount = materiCompleted.filter((id) => id.startsWith('bi_')).length;
  const mtkMateriCount = materiCompleted.filter((id) => id.startsWith('mtk_')).length;

  const latihanCompleted = data.latihanCompleted || [];
  const latihanHistory = data.latihanHistory || [];

  const biLatihanCount = Math.max(
    latihanCompleted.filter((id) => id.startsWith('bi_')).length,
    latihanHistory.filter(
      (l) => l.subject?.toLowerCase().includes('indonesia') || l.subject?.toLowerCase().includes('bi')
    ).length
  );

  const mtkLatihanCount = Math.max(
    latihanCompleted.filter((id) => id.startsWith('mtk_')).length,
    latihanHistory.filter(
      (l) => l.subject?.toLowerCase().includes('mat') || l.subject?.toLowerCase().includes('mtk')
    ).length
  );

  const biPerfectScore = latihanHistory.some(
    (l) =>
      (l.subject?.toLowerCase().includes('indonesia') || l.subject?.toLowerCase().includes('bi')) &&
      (l.score || 0) >= 100
  );

  const mtkPerfectScore = latihanHistory.some(
    (l) =>
      (l.subject?.toLowerCase().includes('mat') || l.subject?.toLowerCase().includes('mtk')) &&
      (l.score || 0) >= 100
  );

  const level = calculateLevelInfo(data.exp || 0).level;

  // 1. Peti Materi 5 Bahasa Indonesia: Paket Siswa dan Siswi ('boy' & 'girl')
  if (biMateriCount >= 5) {
    legitUnlocked.add('boy');
    legitUnlocked.add('girl');
  }

  // 2. Peti Materi 10 Bahasa Indonesia: Rubah Cerdas ('fox')
  if (biMateriCount >= 10) {
    legitUnlocked.add('fox');
  }

  // 3. Peti Materi 15 Bahasa Indonesia: Serigala Berani ('red-wolf')
  if (biMateriCount >= 15) {
    legitUnlocked.add('red-wolf');
  }

  // 4. Piala Puncak Materi 21 Bahasa Indonesia: Paket Raja dan Ratu ('king' & 'queen')
  if (biMateriCount >= 21) {
    legitUnlocked.add('king');
    legitUnlocked.add('queen');
  }

  // 5. Peti Materi 4 Matematika: Paket Anak Petualang dan Anak Ceria ('child-boy' & 'child-girl')
  if (mtkMateriCount >= 4) {
    legitUnlocked.add('child-boy');
    legitUnlocked.add('child-girl');
  }

  // 6. Peti Materi 8 Matematika: Domba Lembut ('sheep')
  if (mtkMateriCount >= 8) {
    legitUnlocked.add('sheep');
  }

  // 7. Piala Puncak Materi 12 Matematika: Katak Lincah ('frog')
  if (mtkMateriCount >= 12) {
    legitUnlocked.add('frog');
  }

  // 8. Peti Latihan 4 Matematika: Ksatria Tangguh ('knight')
  if (mtkLatihanCount >= 4) {
    legitUnlocked.add('knight');
  }

  // 9. Peti Latihan 7 Matematika: Ninja Gesit ('ninja')
  if (mtkLatihanCount >= 7) {
    legitUnlocked.add('ninja');
  }

  // 10. Piala Puncak Latihan 10 Matematika: Koboi Cilik ('cowboy')
  if (mtkLatihanCount >= 10) {
    legitUnlocked.add('cowboy');
  }

  // 11. Peti Latihan 4 Bahasa Indonesia: Sapi Sahabat ('cow')
  if (biLatihanCount >= 4) {
    legitUnlocked.add('cow');
  }

  // 12. Peti Latihan 7 Bahasa Indonesia: Beruang Manis ('teddy-bear-heart')
  if (biLatihanCount >= 7) {
    legitUnlocked.add('teddy-bear-heart');
  }

  // 13. Piala Puncak Latihan 10 Bahasa Indonesia: Panda Lucu ('panda')
  if (biLatihanCount >= 10) {
    legitUnlocked.add('panda');
  }

  const prevList = data.unlockedAvatars || ['baby-boy', 'baby-girl'];
  const nextList = Array.from(legitUnlocked);

  const newlyUnlocked = nextList
    .filter((id) => !prevList.includes(id))
    .map((id) => CHARACTER_AVATARS.find((c) => c.id === id))
    .filter(Boolean);

  data.unlockedAvatars = nextList;

  // Pastikan avatar aktif selalu valid
  if (!data.unlockedAvatars.includes(data.avatar)) {
    data.avatar = 'baby-boy';
  }

  return newlyUnlocked;
};

/**
 * Mengundi (gacha) 1 karakter kategori Fantasi secara acak
 * ketika siswa menyelesaikan Tryout dengan nilai minimal 80% benar.
 */
export const rollFantasyGacha = (data) => {
  const fantasyAvatars = CHARACTER_AVATARS.filter((c) => c.category === 'Fantasi');
  const unlocked = data.unlockedAvatars || ['baby-boy', 'baby-girl'];
  const lockedFantasy = fantasyAvatars.filter((c) => !unlocked.includes(c.id));

  if (lockedFantasy.length === 0) {
    return null; // Seluruh karakter fantasi sudah berhasil dikoleksi
  }

  // Pilih secara acak dari karakter fantasi yang masih terkunci
  const randomIndex = Math.floor(Math.random() * lockedFantasy.length);
  const wonAvatar = lockedFantasy[randomIndex];

  if (!data.unlockedAvatars) data.unlockedAvatars = ['baby-boy', 'baby-girl'];
  data.unlockedAvatars.push(wonAvatar.id);

  saveActivityData(data, true);
  notifyProfileUpdate();

  // Memicu notifikasi modal perayaan gacha fantasi
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('tka_fantasy_gacha_reward', {
          detail: { character: wonAvatar },
        })
      );
    }, 600);
  }

  return wonAvatar;
};

/**
 * Menyimpan karakter avatar aktif yang dipilih oleh pengguna
 * @param {string} avatarId
 */
export const setActiveAvatar = (avatarId) => {
  const data = getActivityData();
  const unlocked = data.unlockedAvatars || ['baby-boy', 'baby-girl'];

  // Pastikan hanya karakter yang sudah terbuka yang bisa dipasang
  if (!unlocked.includes(avatarId)) {
    return false;
  }

  data.avatar = avatarId;
  saveActivityData(data, true);
  notifyProfileUpdate();
  return true;
};

export const markMateriComplete = (babId, stars = 3) => {
  const data = getActivityData();
  if (!data.materiCompleted) data.materiCompleted = [];
  const isFirstTime = !data.materiCompleted.includes(babId);
  if (isFirstTime) {
    data.materiCompleted.push(babId);
  }
  if (!data.unlockedMateri) data.unlockedMateri = ['mtk_1', 'bi_1'];
  if (!data.unlockedMateri.includes(babId)) {
    data.unlockedMateri.push(babId);
  }
  if (!data.materiStars) data.materiStars = {};
  const prevStars = data.materiStars[babId] || 0;
  data.materiStars[babId] = Math.max(prevStars, Math.max(1, Math.min(3, stars)));
  saveActivityData(data);

  // EXP hanya diberikan saat materi pertama kali diselesaikan (mencegah farming EXP saat pelajari ulang materi)
  const materiExp = isFirstTime ? (60 + stars * 10) : 0;
  if (isFirstTime && materiExp > 0) {
    recordUserActivity('materi', materiExp);
  }
  checkAndUnlockAvatars(data);
  return { isFirstTime, expEarned: materiExp };
};

export const unlockLatihan = (latihanId) => {
  const data = getActivityData();
  if (!data.unlockedLatihan) data.unlockedLatihan = ['mtk_lat_1', 'bi_lat_1'];
  if (!data.unlockedLatihan.includes(latihanId)) {
    data.unlockedLatihan.push(latihanId);
    saveActivityData(data);
  }
};

export const markLatihanComplete = (latihanId, stars = 3, awardExp = true) => {
  const data = getActivityData();
  if (!data.latihanCompleted) data.latihanCompleted = [];
  const isFirstTime = !data.latihanCompleted.includes(latihanId);
  if (isFirstTime) {
    data.latihanCompleted.push(latihanId);
  }
  if (!data.unlockedLatihan) data.unlockedLatihan = ['mtk_lat_1', 'bi_lat_1'];
  if (!data.unlockedLatihan.includes(latihanId)) {
    data.unlockedLatihan.push(latihanId);
  }
  if (!data.latihanStars) data.latihanStars = {};
  const prevStars = data.latihanStars[latihanId] || 0;
  data.latihanStars[latihanId] = Math.max(prevStars, Math.max(1, Math.min(3, stars)));
  saveActivityData(data);

  // Berikan EXP hanya jika awardExp bernilai true dan ini pertama kali tuntas (mencegah farming EXP saat kerjakan ulang latihan)
  const expEarned = (awardExp && isFirstTime) ? (80 + stars * 15) : 0;
  if (expEarned > 0) {
    recordUserActivity('latihan', expEarned);
  }
  checkAndUnlockAvatars(data);
  return { isFirstTime, expEarned };
};

export const resetLatihanProgress = (subject = null) => {
  const data = getActivityData();
  if (!data.latihanStars) data.latihanStars = {};
  if (!subject) {
    data.latihanCompleted = [];
    data.unlockedLatihan = ['mtk_lat_1', 'bi_lat_1'];
    data.latihanStars = {};
  } else if (subject === 'matematika') {
    data.latihanCompleted = (data.latihanCompleted || []).filter((id) => !id.startsWith('mtk_lat_'));
    data.unlockedLatihan = (data.unlockedLatihan || []).filter((id) => !id.startsWith('mtk_lat_'));
    data.unlockedLatihan.push('mtk_lat_1');
    Object.keys(data.latihanStars).forEach((key) => {
      if (key.startsWith('mtk_lat_')) delete data.latihanStars[key];
    });
  } else if (subject === 'bahasa_indonesia') {
    data.latihanCompleted = (data.latihanCompleted || []).filter((id) => !id.startsWith('bi_lat_'));
    data.unlockedLatihan = (data.unlockedLatihan || []).filter((id) => !id.startsWith('bi_lat_'));
    data.unlockedLatihan.push('bi_lat_1');
    Object.keys(data.latihanStars).forEach((key) => {
      if (key.startsWith('bi_lat_')) delete data.latihanStars[key];
    });
  }
  saveActivityData(data);
  return data;
};

export const recordLatihan = ({
  subject,
  level,
  score,
  correct,
  total,
  isCompletedAll = false,
  expEarned = 0,
}) => {
  const data = getActivityData();
  const finalExp = isCompletedAll ? expEarned : 0;
  const newRecord = {
    id: `lat_${Date.now()}`,
    subject,
    level,
    score,
    correct,
    total,
    isCompletedAll,
    expEarned: finalExp,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  data.latihanHistory.unshift(newRecord);
  saveActivityData(data);

  // EXP HANYA DIBERIKAN JIKA USER MENYELESAIKAN SEMUA SOAL LATIHAN
  if (isCompletedAll && finalExp > 0) {
    recordUserActivity('latihan', finalExp);
  }

  return newRecord;
};

export const recordTryout = ({
  subject,
  packageNum,
  score,
  correct,
  total,
  userAnswers = {},
  isCompletedAll = false,
  expEarned = 0,
}) => {
  const data = getActivityData();
  const finalExp = isCompletedAll ? expEarned : 0;
  const newRecord = {
    id: `to_${Date.now()}`,
    subject,
    packageNum,
    score,
    correct,
    total,
    userAnswers,
    isCompletedAll,
    expEarned: finalExp,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  data.tryoutHistory.unshift(newRecord);
  saveActivityData(data);

  // EXP HANYA DIBERIKAN JIKA USER MENJAWAB SEMUA SOAL DARI TRYOUT
  if (isCompletedAll && finalExp > 0) {
    recordUserActivity('tryout', finalExp);
  }

  // SISTEM GACHA KATEGORI FANTASI: Didapat jika Tryout selesai dan nilai min. 80% benar
  let fantasyReward = null;
  const percentScore = total > 0 ? (correct / total) * 100 : score;
  if (isCompletedAll && (score >= 80 || percentScore >= 80)) {
    fantasyReward = rollFantasyGacha(data);
  }

  checkAndUnlockAvatars(data);

  return { ...newRecord, fantasyReward };
};

/**
 * Menghitung rekapitulasi statistik komprehensif untuk Rapor
 */
export const getFullStats = () => {
  const data = getActivityData();

  // 1. Statistik Materi
  const totalMateriTersedia = 33; // 12 Level MTK + 21 Level BI
  const materiSelesai = Math.min(totalMateriTersedia, (data.materiCompleted || []).length);
  const persenMateri = Math.min(100, Math.round((materiSelesai / totalMateriTersedia) * 100));

  let totalBintangMateri = 0;
  if (data.materiStars) {
    Object.values(data.materiStars).forEach((s) => {
      totalBintangMateri += Number(s) || 0;
    });
  }
  // Tambahkan fallback bintang jika materiCompleted ada tapi materiStars belum tercatat
  (data.materiCompleted || []).forEach((id) => {
    if (!data.materiStars || !data.materiStars[id]) {
      totalBintangMateri += 3;
    }
  });
  const maxBintangMateri = totalMateriTersedia * 3;

  // 2. Statistik Latihan
  const totalLatihanTersedia = 20; // 10 Level MTK + 10 Level BI
  const latihanSelesai = Math.min(totalLatihanTersedia, (data.latihanCompleted || []).length);
  const persenLatihan = Math.min(100, Math.round((latihanSelesai / totalLatihanTersedia) * 100));

  let totalBintangLatihan = 0;
  if (data.latihanStars) {
    Object.values(data.latihanStars).forEach((s) => {
      totalBintangLatihan += Number(s) || 0;
    });
  }
  // Fallback bintang jika latihanCompleted ada tapi latihanStars belum tercatat
  (data.latihanCompleted || []).forEach((id) => {
    if (!data.latihanStars || !data.latihanStars[id]) {
      totalBintangLatihan += 3;
    }
  });
  const maxBintangLatihan = totalLatihanTersedia * 3;

  const totalLatihan = data.latihanHistory.length;
  let totalSoalDijawab = 0;
  let totalSoalBenar = 0;
  data.latihanHistory.forEach((item) => {
    totalSoalDijawab += item.total || 0;
    totalSoalBenar += item.correct || 0;
  });
  const akurasiLatihan =
    totalSoalDijawab > 0 ? Math.round((totalSoalBenar / totalSoalDijawab) * 100) : 0;

  // 3. Statistik Tryout (Keseluruhan & Terpisah per Mata Pelajaran)
  const totalTryout = data.tryoutHistory.length;
  const rataRataTryout =
    totalTryout > 0
      ? (data.tryoutHistory.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalTryout).toFixed(1)
      : '0.0';

  // Rata-rata & Paket Selesai: Bahasa Indonesia (5 Paket Tersedia)
  const tryoutHistoryBI = data.tryoutHistory.filter((t) => t.subject === 'bahasa_indonesia');
  const totalTryoutBI = tryoutHistoryBI.length;
  const uniquePaketBI = new Set(tryoutHistoryBI.map((t) => t.packageNum)).size;
  const paketTryoutSelesaiBI = Math.min(5, uniquePaketBI);
  const totalPaketBITersedia = 5;
  const rataRataTryoutBI =
    totalTryoutBI > 0
      ? (tryoutHistoryBI.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalTryoutBI).toFixed(1)
      : '0.0';

  // Rata-rata & Paket Selesai: Matematika (5 Paket Tersedia)
  const tryoutHistoryMTK = data.tryoutHistory.filter((t) => t.subject === 'matematika');
  const totalTryoutMTK = tryoutHistoryMTK.length;
  const uniquePaketMTK = new Set(tryoutHistoryMTK.map((t) => t.packageNum)).size;
  const paketTryoutSelesaiMTK = Math.min(5, uniquePaketMTK);
  const totalPaketMTKTersedia = 5;
  const rataRataTryoutMTK =
    totalTryoutMTK > 0
      ? (tryoutHistoryMTK.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalTryoutMTK).toFixed(1)
      : '0.0';

  // Total Paket Tryout Selesai Gabungan
  const totalPaketTryoutTersedia = 10; // 5 Paket BI + 5 Paket MTK
  const totalPaketTryoutSelesai = paketTryoutSelesaiBI + paketTryoutSelesaiMTK;
  const persenTryout = Math.min(
    100,
    Math.round((totalPaketTryoutSelesai / totalPaketTryoutTersedia) * 100)
  );

  // 4. Penguasaan Kompetensi Pusmendik (%) Dinamis Tersinkronisasi
  const topicMastery = calculateTopicMastery(data);

  return {
    materiSelesai,
    totalMateriTersedia,
    persenMateri,
    totalBintangMateri,
    maxBintangMateri,
    latihanSelesai,
    totalLatihanTersedia,
    persenLatihan,
    totalBintangLatihan,
    maxBintangLatihan,
    totalLatihan,
    totalSoalDijawab,
    totalSoalBenar,
    akurasiLatihan,
    totalTryout,
    rataRataTryout,
    totalTryoutBI,
    rataRataTryoutBI,
    totalTryoutMTK,
    rataRataTryoutMTK,
    paketTryoutSelesaiBI,
    totalPaketBITersedia,
    paketTryoutSelesaiMTK,
    totalPaketMTKTersedia,
    totalPaketTryoutSelesai,
    totalPaketTryoutTersedia,
    persenTryout,
    tryoutStats: {
      total: totalTryout,
      rataRata: rataRataTryout,
      bi: {
        total: totalTryoutBI,
        paketSelesai: paketTryoutSelesaiBI,
        totalPaket: totalPaketBITersedia,
        rataRata: rataRataTryoutBI,
      },
      mtk: {
        total: totalTryoutMTK,
        paketSelesai: paketTryoutSelesaiMTK,
        totalPaket: totalPaketMTKTersedia,
        rataRata: rataRataTryoutMTK,
      },
    },
    latihanHistory: data.latihanHistory,
    tryoutHistory: data.tryoutHistory,
    kompetensi: topicMastery.kompetensi,
    rekomendasi: topicMastery.rekomendasi,
  };
};

/**
 * Definisi Topik Asesmen Pusmendik TKA SD
 * 3 Topik Bahasa Indonesia & 3 Topik Matematika
 */
export const TOPIC_DEFINITIONS = [
  {
    id: 'bi_tekstual',
    nama: 'Pemahaman Tekstual',
    mapel: 'Bahasa Indonesia',
    subjectKey: 'bahasa_indonesia',
    deskripsi: 'Ejaan, Tanda Baca, Kata Berimbuhan, Frasa, dan Makna Kata',
    materiBabs: ['bi_1', 'bi_2', 'bi_3', 'bi_4', 'bi_5', 'bi_6', 'bi_7', 'bi_8', 'bi_9', 'bi_10'],
    latihanLevels: [1, 2, 3, 4],
    latihanIds: ['bi_lat_1', 'bi_lat_2', 'bi_lat_3', 'bi_lat_4'],
  },
  {
    id: 'bi_inferensial',
    nama: 'Pemahaman Inferensial',
    mapel: 'Bahasa Indonesia',
    subjectKey: 'bahasa_indonesia',
    deskripsi: 'Informasi Tersurat/Tersirat, Ide Pokok, Menarik Kesimpulan, dan Analisis Hubungan Teks',
    materiBabs: ['bi_16', 'bi_17', 'bi_18', 'bi_19', 'bi_20', 'bi_21'],
    latihanLevels: [8, 9, 10],
    latihanIds: ['bi_lat_8', 'bi_lat_9', 'bi_lat_10'],
  },
  {
    id: 'bi_sastra',
    nama: 'Evaluasi & Apresiasi',
    mapel: 'Bahasa Indonesia',
    subjectKey: 'bahasa_indonesia',
    deskripsi: 'Menyimak, Menulis, Puisi, Prosa, Respon Teks Fiksi, dan Nilai Sastra',
    materiBabs: ['bi_11', 'bi_12', 'bi_13', 'bi_14', 'bi_15'],
    latihanLevels: [5, 6, 7],
    latihanIds: ['bi_lat_5', 'bi_lat_6', 'bi_lat_7'],
  },
  {
    id: 'mtk_bilangan',
    nama: 'Bilangan',
    mapel: 'Matematika',
    subjectKey: 'matematika',
    deskripsi: 'Operasi Hitung Bilangan, Perbandingan & Skala, KPK/FPB, dan Bilangan Pangkat',
    materiBabs: ['mtk_1', 'mtk_2', 'mtk_3', 'mtk_4'],
    latihanLevels: [1, 2, 3, 4],
    latihanIds: ['mtk_lat_1', 'mtk_lat_2', 'mtk_lat_3', 'mtk_lat_4'],
  },
  {
    id: 'mtk_geometri',
    nama: 'Geometri & Pengukuran',
    mapel: 'Matematika',
    subjectKey: 'matematika',
    deskripsi: 'Pengukuran, Jarak & Kecepatan, Bangun Datar, Bangun Ruang, Sudut, dan Penaksiran',
    materiBabs: ['mtk_5', 'mtk_6', 'mtk_7', 'mtk_8', 'mtk_11', 'mtk_12'],
    latihanLevels: [5, 6, 7, 8],
    latihanIds: ['mtk_lat_5', 'mtk_lat_6', 'mtk_lat_7', 'mtk_lat_8'],
  },
  {
    id: 'mtk_data',
    nama: 'Pengolahan Data',
    mapel: 'Matematika',
    subjectKey: 'matematika',
    deskripsi: 'Koordinat Kartesius, Pengelolaan Data, Tabel, Diagram, dan Statistika Dasar',
    materiBabs: ['mtk_9', 'mtk_10'],
    latihanLevels: [9, 10],
    latihanIds: ['mtk_lat_9', 'mtk_lat_10'],
  },
];

/**
 * Menghitung tingkat penguasaan 6 topik asesmen Pusmendik secara dinamis
 * berdasarkan sinkronisasi kemajuan Materi, Latihan Soal, dan Tryout
 */
export const calculateTopicMastery = (data = {}) => {
  const materiCompleted = data.materiCompleted || [];
  const materiStars = data.materiStars || {};
  const latihanCompleted = data.latihanCompleted || [];
  const latihanStars = data.latihanStars || {};
  const latihanHistory = data.latihanHistory || [];
  const tryoutHistory = data.tryoutHistory || [];

  const topics = TOPIC_DEFINITIONS.map((topic) => {
    // 1. Pilar Materi (Teori & Konsep)
    const completedBabs = topic.materiBabs.filter((b) => materiCompleted.includes(b));
    const materiCount = completedBabs.length;
    const materiTotal = topic.materiBabs.length;
    let skorMateri = null;

    if (materiCount > 0) {
      let totalStars = 0;
      completedBabs.forEach((b) => {
        totalStars += materiStars[b] ? Number(materiStars[b]) : 3;
      });
      const avgStars = totalStars / materiCount;
      const starQuality = Math.min(1, Math.max(0.65, avgStars / 3));
      skorMateri = Math.min(100, Math.round((materiCount / materiTotal) * starQuality * 100));
    }

    // 2. Pilar Latihan (Drill & Pemecahan Soal)
    const completedLevels = topic.latihanIds.filter((id) => latihanCompleted.includes(id));
    const latihanCount = completedLevels.length;
    const latihanTotal = topic.latihanLevels.length;
    const topicHistory = latihanHistory.filter((h) => {
      if (h.subject !== topic.subjectKey) return false;
      const lvlNum =
        typeof h.level === 'number'
          ? h.level
          : parseInt(String(h.level).replace(/\D/g, ''), 10) || 0;
      return topic.latihanLevels.includes(lvlNum);
    });

    let skorLatihan = null;
    if (latihanCount > 0 || topicHistory.length > 0) {
      let scoreAcc = 0;
      if (topicHistory.length > 0) {
        scoreAcc =
          topicHistory.reduce((acc, h) => acc + (h.score || 0), 0) / topicHistory.length;
      } else {
        let starsTotal = 0;
        completedLevels.forEach((id) => {
          starsTotal += latihanStars[id] ? Number(latihanStars[id]) : 3;
        });
        const avgS = starsTotal / (latihanCount || 1);
        scoreAcc = avgS === 3 ? 100 : avgS === 2 ? 80 : 65;
      }
      const completionRatio = latihanCount / latihanTotal;
      skorLatihan = Math.min(100, Math.round(scoreAcc * 0.6 + completionRatio * 100 * 0.4));
    }

    // 3. Pilar Tryout (Simulasi Ujian Komprehensif)
    const subjectTryouts = tryoutHistory.filter((t) => t.subject === topic.subjectKey);
    let skorTryout = null;
    if (subjectTryouts.length > 0) {
      const avgTo =
        subjectTryouts.reduce((acc, t) => acc + (t.score || 0), 0) / subjectTryouts.length;
      skorTryout = Math.min(100, Math.round(avgTo));
    }

    // 4. Agregasi Terbobot Sinkron
    let nilai = 0;
    if (skorTryout === null) {
      if (skorMateri === null && skorLatihan === null) {
        nilai = 0;
      } else if (skorMateri !== null && skorLatihan === null) {
        nilai = Math.round(skorMateri * 0.8);
      } else if (skorMateri === null && skorLatihan !== null) {
        nilai = Math.round(skorLatihan * 0.85);
      } else {
        nilai = Math.round(skorMateri * 0.45 + skorLatihan * 0.55);
      }
    } else {
      if (skorMateri === null && skorLatihan === null) {
        nilai = Math.round(skorTryout * 0.3); // Tryout saja tanpa materi/drill topik
      } else if (skorMateri !== null && skorLatihan === null) {
        nilai = Math.round(skorMateri * 0.5 + skorTryout * 0.35);
      } else if (skorMateri === null && skorLatihan !== null) {
        nilai = Math.round(skorLatihan * 0.6 + skorTryout * 0.35);
      } else {
        nilai = Math.round(skorMateri * 0.35 + skorLatihan * 0.4 + skorTryout * 0.25);
      }
    }

    nilai = Math.max(0, Math.min(100, nilai));

    let status = 'Belum Dimulai';
    if (nilai >= 85) status = 'Sangat Mahir';
    else if (nilai >= 70) status = 'Mahir';
    else if (nilai >= 50) status = 'Cukup Mahir';
    else if (nilai > 0) status = 'Perlu Latihan';

    let summary = 'Belum ada aktivitas';
    if (nilai > 0) {
      const parts = [];
      if (materiCount > 0) parts.push(`Materi ${materiCount}/${materiTotal}`);
      if (latihanCount > 0) parts.push(`Latihan ${latihanCount}/${latihanTotal}`);
      if (skorTryout !== null) parts.push(`TO ${skorTryout}%`);
      summary = parts.length > 0 ? parts.join(' • ') : `Skor ${nilai}%`;
    }

    return {
      id: topic.id,
      nama: topic.nama,
      mapel: topic.mapel,
      nilai,
      status,
      deskripsi: topic.deskripsi,
      detail: {
        materiSelesai: materiCount,
        totalMateri: materiTotal,
        latihanSelesai: latihanCount,
        totalLatihan: latihanTotal,
        skorMateri,
        skorLatihan,
        skorTryout,
        summary,
      },
    };
  });

  // 5. Rekomendasi Belajar Dinamis
  const activeTopics = topics.filter((t) => t.nilai > 0);
  let kuat = 'Belum Ada Aktivitas';
  let lemah = 'Semua Topik Perlu Dipelajari';
  let saranAksi =
    'Yuk mulai pelajari materi bab pertama atau coba latihan soal untuk membuka rekam penguasaan kompetensimu!';

  if (activeTopics.length > 0) {
    const sortedDesc = [...topics].sort((a, b) => b.nilai - a.nilai);
    const sortedAsc = [...topics].sort((a, b) => a.nilai - b.nilai);

    const bestTopics = sortedDesc.filter((t) => t.nilai >= 70);
    if (bestTopics.length >= 2) {
      kuat = `${bestTopics[0].nama} & ${bestTopics[1].nama}`;
    } else if (bestTopics.length === 1) {
      kuat = `${bestTopics[0].nama} (${bestTopics[0].nilai}%)`;
    } else {
      kuat = `${sortedDesc[0].nama} (${sortedDesc[0].nilai}%)`;
    }

    const weakCandidates = sortedAsc.filter((t) => t.nilai < 70);
    if (weakCandidates.length >= 2) {
      lemah = `${weakCandidates[0].nama} & ${weakCandidates[1].nama}`;
    } else if (weakCandidates.length === 1) {
      lemah = weakCandidates[0].nama;
    } else {
      lemah = 'Pertahankan Seluruh Topik';
    }

    const targetLemah = sortedAsc[0];
    if (targetLemah && targetLemah.nilai === 0) {
      saranAksi = `Fokuskan belajarmu berikutnya pada topik ${targetLemah.nama} (${targetLemah.mapel}) agar nilaimu seimbang dan siap menghadapi Tryout!`;
    } else if (targetLemah && targetLemah.nilai < 70) {
      saranAksi = `Tingkatkan latihan soal dan ulas materi pada topik ${targetLemah.nama} untuk mendongkrak penguasaan kompetensi TKA SD!`;
    } else {
      saranAksi =
        'Luar biasa! Seluruh topik materi telah dikuasai dengan baik. Pertahankan prestasimu dengan rutin mengikuti simulasi Tryout Akbar!';
    }
  }

  return { kompetensi: topics, rekomendasi: { kuat, lemah, saranAksi } };
};
