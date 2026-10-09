/**
 * Activity Tracker TKA SD
 * Menyimpan dan mengelola statistik aktivitas belajar murid secara persisten (localStorage)
 * untuk disajikan pada halaman Rapor.
 */

const STORAGE_KEY = 'tka_sd_user_activity_v1';

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
      materiCompleted: [], // Posisi awal belum ada yang selesai, hanya level 1 tiap mapel yang terbuka
      unlockedMateri: ['mtk_1', 'bi_1'], // Level 1 MTK & Level 1 BI terbuka default
      latihanHistory: [
        {
          id: 'lat_sample_1',
          subject: 'bahasa_indonesia',
          level: 1,
          score: 100,
          correct: 5,
          total: 5,
          date: '28 Sep 2026',
        },
        {
          id: 'lat_sample_2',
          subject: 'matematika',
          level: 1,
          score: 80,
          correct: 4,
          total: 5,
          date: '29 Sep 2026',
        },
      ],
      tryoutHistory: [
        {
          id: 'to_sample_1',
          subject: 'bahasa_indonesia',
          packageNum: 1,
          score: 86.7,
          correct: 26,
          total: 30,
          date: '25 Sep 2026',
        },
        {
          id: 'to_sample_2',
          subject: 'matematika',
          packageNum: 1,
          score: 93.3,
          correct: 28,
          total: 30,
          date: '29 Sep 2026',
        },
      ],
    };
  }

  // Bersihkan data mock lama jika hanya berisi ['mtk_1', 'bi_1'] sebagai materi selesai
  if (
    data.materiCompleted &&
    data.materiCompleted.length === 2 &&
    data.materiCompleted.includes('mtk_1') &&
    data.materiCompleted.includes('bi_1')
  ) {
    data.materiCompleted = [];
  }

  if (!data.unlockedMateri) {
    data.unlockedMateri = ['mtk_1', 'bi_1'];
  } else {
    if (!data.unlockedMateri.includes('mtk_1')) data.unlockedMateri.push('mtk_1');
    if (!data.unlockedMateri.includes('bi_1')) data.unlockedMateri.push('bi_1');
  }

  if (!data.materiStars) {
    data.materiStars = {};
  }

  if (!data.unlockedLatihan) {
    data.unlockedLatihan = ['mtk_lat_1', 'bi_lat_1'];
  } else {
    if (!data.unlockedLatihan.includes('mtk_lat_1')) data.unlockedLatihan.push('mtk_lat_1');
    if (!data.unlockedLatihan.includes('bi_lat_1')) data.unlockedLatihan.push('bi_lat_1');
  }

  if (!data.latihanCompleted) {
    data.latihanCompleted = [];
  }

  if (!data.latihanStars) {
    data.latihanStars = {};
  }

  return data;
};

export const saveActivityData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
};

export const unlockLatihan = (latihanId) => {
  const data = getActivityData();
  if (!data.unlockedLatihan) data.unlockedLatihan = ['mtk_lat_1', 'bi_lat_1'];
  if (!data.unlockedLatihan.includes(latihanId)) {
    data.unlockedLatihan.push(latihanId);
    saveActivityData(data);
  }
};

export const markLatihanComplete = (latihanId, stars = 3) => {
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

export const recordLatihan = ({ subject, level, score, correct, total }) => {
  const data = getActivityData();
  const newRecord = {
    id: `lat_${Date.now()}`,
    subject,
    level,
    score,
    correct,
    total,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  data.latihanHistory.unshift(newRecord);
  saveActivityData(data);
  return newRecord;
};

export const recordTryout = ({ subject, packageNum, score, correct, total, userAnswers = {} }) => {
  const data = getActivityData();
  const newRecord = {
    id: `to_${Date.now()}`,
    subject,
    packageNum,
    score,
    correct,
    total,
    userAnswers,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  data.tryoutHistory.unshift(newRecord);
  saveActivityData(data);
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
