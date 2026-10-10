import { profileService } from '../services/profileService';

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
export const AVAILABLE_TITLES = [
  {
    id: 'pemula',
    name: 'Siswa Penjelajah',
    icon: '🌱',
    color: 'emerald',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300',
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
    desc: 'Mahir dalam operasi hitung bilangan dan logika Matematika.',
    requirement: 'Selesaikan minimal 1 materi atau latihan Matematika',
    isUnlocked: (data) =>
      (data.materiCompleted || []).some((id) => id.startsWith('mtk_')) ||
      (data.latihanCompleted || []).some((id) => id.startsWith('mtk_')),
  },
  {
    id: 'pejuang_latihan',
    name: 'Pejuang Latihan Tangguh',
    icon: '🛡️',
    color: 'indigo',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-300',
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
    desc: 'Mencapai Level 5 ke atas dari dedikasi belajar konsisten.',
    requirement: 'Capai Level 5 (kumpulkan minimal 400 EXP)',
    isUnlocked: (data) => (data.exp || 0) >= 400,
  },
  {
    id: 'legenda_sd',
    name: 'Legenda Juara Nusantara',
    icon: '🏆',
    color: 'rose',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-300',
    desc: 'Pencapaian master tertinggi di seluruh penjuru Nusantara.',
    requirement: 'Capai Level 10 (kumpulkan minimal 900 EXP)',
    isUnlocked: (data) => (data.exp || 0) >= 900,
  },
];

/**
 * Menghitung detail level berdasarkan total EXP
 * Setiap 100 EXP = 1 Level
 */
export const calculateLevelInfo = (exp = 0) => {
  const currentExp = Math.max(0, Number(exp) || 0);
  const level = Math.floor(currentExp / 100) + 1;
  const currentLevelExp = currentExp % 100;
  const nextLevelExp = 100;
  const progressPercent = Math.min(100, Math.round((currentLevelExp / nextLevelExp) * 100));

  return {
    level,
    totalExp: currentExp,
    currentLevelExp,
    nextLevelExp,
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

  // Cek apakah ada gelar baru yang memenuhi syarat
  checkAndUnlockTitles(data);

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

export const recordUserActivity = (actionType = 'general', expEarned = 50) => {
  const data = getActivityData();
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

  // 3. Cek gelar baru
  checkAndUnlockTitles(data);

  saveActivityData(data);
  notifyProfileUpdate();
  return data;
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
    allTitles: AVAILABLE_TITLES.map((t) => ({
      ...t,
      unlocked: (data.unlockedTitles || []).includes(t.id),
      isActive: (data.activeTitle || 'pemula') === t.id,
    })),
  };
};

export const markMateriComplete = (babId, stars = 3) => {
  const data = getActivityData();
  if (!data.materiCompleted) data.materiCompleted = [];
  if (!data.materiCompleted.includes(babId)) {
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

  // EXP hanya diberikan saat materi dan kuis pemahamannya diselesaikan sampai habis
  const materiExp = 60 + stars * 10;
  recordUserActivity('materi', materiExp);
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
  if (!data.latihanCompleted.includes(latihanId)) {
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

  // Berikan EXP hanya jika awardExp bernilai true
  if (awardExp) {
    recordUserActivity('latihan', 80 + stars * 15);
  }
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

  return newRecord;
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

  // 3. Statistik Tryout
  const totalTryout = data.tryoutHistory.length;
  const rataRataTryout =
    totalTryout > 0
      ? (data.tryoutHistory.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalTryout).toFixed(1)
      : '0.0';

  // 4. Penguasaan Kompetensi Pusmendik (%)
  const kompetensi = [
    { nama: 'Pemahaman Tekstual', mapel: 'Bahasa Indonesia', nilai: 92, status: 'Sangat Mahir' },
    { nama: 'Pemahaman Inferensial', mapel: 'Bahasa Indonesia', nilai: 86, status: 'Mahir' },
    { nama: 'Evaluasi & Apresiasi', mapel: 'Bahasa Indonesia', nilai: 88, status: 'Mahir' },
    { nama: 'Bilangan', mapel: 'Matematika', nilai: 94, status: 'Sangat Mahir' },
    { nama: 'Geometri & Pengukuran', mapel: 'Matematika', nilai: 82, status: 'Cukup Mahir' },
    { nama: 'Pengolahan Data', mapel: 'Matematika', nilai: 90, status: 'Sangat Mahir' },
  ];

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
    latihanHistory: data.latihanHistory,
    tryoutHistory: data.tryoutHistory,
    kompetensi,
  };
};
