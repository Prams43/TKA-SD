import { upsertProfile, findProfileByUserId, getLeaderboardList } from '../models/profile.model.js';

async function testProfileDb() {
  try {
    console.log('Testing Profile Model dengan Cloudflare D1...');

    // Test upsert untuk user ID 1 (test.siswa)
    const testData = {
      exp: 450,
      level: 5,
      activeTitle: 'cendekiawan_muda',
      unlockedTitles: ['pemula', 'literasi_fondasi', 'cendekiawan_muda'],
      streak: { count: 3, lastActiveDate: '2026-10-10' },
      activityData: {
        materiCompleted: ['mtk_1', 'bi_1'],
        unlockedMateri: ['mtk_1', 'bi_1', 'mtk_2'],
        latihanCompleted: ['mtk_lat_1'],
        latihanHistory: [{ id: 'lat_1', score: 100 }],
      },
    };

    const saved = await upsertProfile(1, testData);
    console.log('Upsert berhasil:', saved);

    const fetched = await findProfileByUserId(1);
    console.log('Fetch berhasil:', fetched);

    const leaderboard = await getLeaderboardList(5);
    console.log('Leaderboard preview:');
    console.table(leaderboard);

    console.log('SEMUA TEST CLOUDFLARE D1 PROFILE BERHASIL!');
  } catch (err) {
    console.error('Test gagal:', err.message);
  }
}

testProfileDb();
