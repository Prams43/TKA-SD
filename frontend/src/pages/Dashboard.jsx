import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CharacterIllustration from '../components/CharacterIllustration';
import PillMenuButton from '../components/PillMenuButton';
import { BookOpen, ClipboardCheck, Trophy, BarChart3, Crown } from 'lucide-react';
import { getUserProfileStats } from '../utils/activityTracker';
import { getCharacterAvatar } from '../utils/characterAvatars';
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
      {/* 2. Area Utama di Bawah Navbar */}
      <main className="flex-1 flex flex-col justify-center items-center px-3 sm:px-6 lg:px-12 py-3 xs:py-4 sm:py-10">
        <div className="max-w-6xl w-full mx-auto flex flex-col justify-center">
          {/* Bagian Profil Siswa di Dashboard - Dominan Navy Solid (Tanpa Gradient) */}
          <div className="mb-4 sm:mb-8 p-3.5 sm:p-5 rounded-2xl bg-[#162E5B] border-2 border-blue-500/40 shadow-lg text-white flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Foto Profil dengan Badge Gelar di Luar Container */}
              <div className="relative flex-shrink-0">
                <div
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white hover:border-blue-300 border-2 border-blue-400 flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-95 group overflow-hidden"
                  title="Buka profil & ganti karakter"
                >
                  <img
                    src={getCharacterAvatar(profileStats?.avatar).image}
                    alt={getCharacterAvatar(profileStats?.avatar).name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* Icon Gelar Aktif di Kiri Atas (tanpa background dan kotak) */}
                {profileStats?.activeTitle?.icon && (
                  <span
                    className="absolute -top-2 -left-2 text-xl sm:text-2xl filter drop-shadow-md select-none pointer-events-none z-20 leading-none"
                    title={`Gelar: ${profileStats.activeTitle.name}`}
                  >
                    {profileStats.activeTitle.icon}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
                  <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                    Halo, {user?.username || user?.email?.split('@')[0] || 'Siswa'}!
                  </h1>
                  {profileStats?.activeTitle && (
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold bg-blue-600 text-white border border-blue-400 shadow-2xs">
                      {profileStats.activeTitle.name}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-sm text-blue-200 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
                  Siap belajar hari ini? Kumpulkan EXP dan raih prestasi!
                </p>
              </div>
            </div>

            {/* Quick Stats: Level & EXP (Display Only) */}
            <div className="flex items-center self-stretch md:self-auto justify-between md:justify-end border-t border-[#1E3A8A] md:border-t-0 pt-2.5 md:pt-0">
              <span className="text-[11px] text-blue-300 md:hidden font-medium">Progres EXP</span>
              <div
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0F2042] border-2 border-blue-500/40 shadow-xs select-none"
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
                icon={ClipboardCheck}
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
