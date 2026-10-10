import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CharacterIllustration from '../components/CharacterIllustration';
import PillMenuButton from '../components/PillMenuButton';
import { BookOpen, FileQuestion, Trophy, BarChart3, Crown } from 'lucide-react';
import { getUserProfileStats } from '../utils/activityTracker';
import LeaderboardModal from '../components/LeaderboardModal';

/**
 * Halaman Dashboard Utama TKA SD
 * 
 * Fitur:
 * 1. Background gradient doodle edukasi terang & bersih
 * 2. 5 Tombol Menu Kapsul Navy Interaktif:
 *    - Materi, Latihan Soal, Tryout, Rapor, dan Menu Leaderboard (Papan Peringkat)
 * 3. Menu Leaderboard menampilkan daftar top user berdasarkan Level & EXP serta gelar yang dipasang
 * 4. Karakter Siswa Cerdas tetap di sebelah kanan tombol
 */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileStats, setProfileStats] = useState(() => getUserProfileStats());
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const refreshStats = () => {
    setProfileStats(getUserProfileStats());
  };

  useEffect(() => {
    refreshStats();
    window.addEventListener('tka_profile_updated', refreshStats);
    window.addEventListener('storage', refreshStats);

    return () => {
      window.removeEventListener('tka_profile_updated', refreshStats);
      window.removeEventListener('storage', refreshStats);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#261C14]">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Area Utama di Bawah Navbar */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="max-w-6xl w-full mx-auto flex flex-col justify-center">
          {/* Header Judul */}
          <div className="mb-6 sm:mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#261C14] tracking-tight">
              Halo, {user?.username || user?.email?.split('@')[0] || 'Siswa'}!
            </h1>
            <p className="text-xs sm:text-sm text-[#6E6258] mt-1.5">
              Pilih menu di bawah untuk mulai belajar atau cek evaluasi kemampuanmu.
            </p>
          </div>

          {/* Kontainer 2 Kolom (Side-by-side tetap berdampingan di Mobile & Desktop) */}
          <div className="grid grid-cols-12 gap-2 sm:gap-6 lg:gap-12 items-center">
            {/* Kolom Kiri: 5 Tombol Menu Kapsul (Lebar 7/12 di mobile, 6/12 di desktop) */}
            <section className="col-span-7 sm:col-span-7 lg:col-span-6 flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-3.5">
              {/* Tombol 1: Materi */}
              <PillMenuButton
                label="Materi"
                icon={BookOpen}
                accentColor="blue"
                onClick={() => navigate('/materi')}
              />

              {/* Tombol 2: Latihan Soal */}
              <PillMenuButton
                label="Latihan Soal"
                icon={FileQuestion}
                accentColor="emerald"
                onClick={() => navigate('/latihan')}
              />

              {/* Tombol 3: Tryout */}
              <PillMenuButton
                label="Tryout"
                icon={Trophy}
                accentColor="amber"
                onClick={() => navigate('/tryout')}
              />

              {/* Tombol 4: Rapor */}
              <PillMenuButton
                label="Rapor"
                icon={BarChart3}
                accentColor="purple"
                onClick={() => navigate('/rapor')}
              />

              {/* Tombol 5: Leaderboard (Papan Peringkat) */}
              <PillMenuButton
                label="Leaderboard"
                icon={Crown}
                accentColor="yellow"
                badgeText={`Lv. ${profileStats.level}`}
                onClick={() => setIsLeaderboardOpen(true)}
              />
            </section>

            {/* Kolom Kanan: Karakter Siswa Tetap di Sebelah Kanan pada Mobile */}
            <section className="col-span-5 sm:col-span-5 lg:col-span-6 flex items-center justify-center">
              <CharacterIllustration />
            </section>
          </div>
        </div>
      </main>

      {/* Modal Leaderboard Papan Peringkat */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        user={user}
        profileStats={profileStats}
      />
    </div>
  );
};

export default Dashboard;
