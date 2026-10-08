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
  if (!subject) {
    data.materiCompleted = [];
    data.unlockedMateri = ['mtk_1', 'bi_1'];
  } else if (subject === 'matematika') {
    data.materiCompleted = (data.materiCompleted || []).filter((id) => !id.startsWith('mtk_'));
    data.unlockedMateri = (data.unlockedMateri || []).filter((id) => !id.startsWith('mtk_'));
    data.unlockedMateri.push('mtk_1');
  } else if (subject === 'bahasa_indonesia') {
    data.materiCompleted = (data.materiCompleted || []).filter((id) => !id.startsWith('bi_'));
    data.unlockedMateri = (data.unlockedMateri || []).filter((id) => !id.startsWith('bi_'));
    data.unlockedMateri.push('bi_1');
  }
  saveActivityData(data);
  return data;
};

export const markMateriComplete = (babId) => {
  const data = getActivityData();
  if (!data.materiCompleted) data.materiCompleted = [];
  if (!data.materiCompleted.includes(babId)) {
    data.materiCompleted.push(babId);
  }
  if (!data.unlockedMateri) data.unlockedMateri = ['mtk_1', 'bi_1'];
  if (!data.unlockedMateri.includes(babId)) {
    data.unlockedMateri.push(babId);
  }
  saveActivityData(data);
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

export const recordTryout = ({ subject, packageNum, score, correct, total }) => {
  const data = getActivityData();
  const newRecord = {
    id: `to_${Date.now()}`,
    subject,
    packageNum,
    score,
    correct,
    total,
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

  // 2. Statistik Latihan
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
