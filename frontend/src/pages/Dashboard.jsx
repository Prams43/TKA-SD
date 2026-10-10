import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CharacterIllustration from '../components/CharacterIllustration';
import PillMenuButton from '../components/PillMenuButton';
import { BookOpen, FileQuestion, Trophy, BarChart3, Crown } from 'lucide-react';
import { getUserProfileStats } from '../utils/activityTracker';
import LeaderboardModal from '../components/LeaderboardModal';
import ProfileModal from '../components/ProfileModal';

/**
 * Halaman Dashboard Utama TKA SD
 */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileStats, setProfileStats] = useState(() => getUserProfileStats());
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Area Utama di Bawah Navbar */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="max-w-6xl w-full mx-auto flex flex-col justify-center">
          {/* Bagian Profil Siswa di Dashboard - Dominan Navy Solid (Tanpa Gradient) */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl bg-[#0B1A34] border-2 border-blue-500/40 shadow-lg text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5 sm:space-x-4">
              <div
                onClick={() => setIsProfileModalOpen(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1E3A8A] hover:bg-blue-600 text-white border-2 border-blue-400 flex items-center justify-center text-2xl font-bold shadow-md flex-shrink-0 cursor-pointer transition-all active:scale-95"
                title="Buka profil"
              >
                {profileStats?.activeTitle?.icon || (user?.username ? user.username.charAt(0).toUpperCase() : '🦁')}
              </div>
              <div>
                <div className="flex items-center space-x-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Halo, {user?.username || user?.email?.split('@')[0] || 'Siswa'}!
                  </h1>
                  {profileStats?.activeTitle && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-blue-600 text-white border border-blue-400 shadow-2xs">
                      {profileStats.activeTitle.name}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-blue-200 mt-1">
                  Siap belajar hari ini? Kumpulkan EXP dan raih puncak prestasi!
                </p>
              </div>
            </div>

            {/* Quick Stats: Level & EXP (Display Only) */}
            <div className="flex items-center self-stretch md:self-auto justify-end border-t-2 md:border-t-0 border-[#1E3A8A] pt-3 md:pt-0">
              <div
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#071325] border-2 border-blue-500/40 shadow-xs select-none"
              >
                <span className="text-xs font-bold text-blue-400">Lv.{profileStats.level}</span>
                <div className="w-16 sm:w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${profileStats.progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-blue-200 font-semibold">{profileStats.progressPercent}%</span>
              </div>
            </div>
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

      {/* Modal Detail Profil Siswa (Dominan Navy) */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        profileStats={profileStats}
        onProfileUpdated={refreshStats}
      />
    </div>
  );
};

export default Dashboard;
