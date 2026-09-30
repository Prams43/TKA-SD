/**
 * Activity Tracker TKA SD
 * Menyimpan dan mengelola statistik aktivitas belajar murid secara persisten (localStorage)
 * untuk disajikan pada halaman Rapor.
 */

const STORAGE_KEY = 'tka_sd_user_activity_v1';

export const getActivityData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca aktivitas:', e);
  }

  // Default initial data
  return {
    materiCompleted: ['bi_tekstual_1', 'mtk_bilangan_1'], // Sample initial progress
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
};

export const saveActivityData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Gagal menyimpan aktivitas:', e);
  }
};

export const markMateriComplete = (babId) => {
  const data = getActivityData();
  if (!data.materiCompleted.includes(babId)) {
    data.materiCompleted.push(babId);
    saveActivityData(data);
  }
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
  const totalMateriTersedia = 10; // 5 Bab BI + 5 Bab MTK
  const materiSelesai = data.materiCompleted.length;
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
