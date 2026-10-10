import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User, Flame, Award, ChevronDown } from 'lucide-react';
import { getUserProfileStats } from '../utils/activityTracker';
import ProfileModal from './ProfileModal';

/**
 * Komponen Navbar dengan Indikator EXP, Level, Gelar Aktif, dan Streak (Reset Jam 12 Malam)
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileStats, setProfileStats] = useState(() => getUserProfileStats());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const refreshStats = () => {
    setProfileStats(getUserProfileStats());
  };

  useEffect(() => {
    refreshStats();

    // Dengar event saat ada perubahan aktivitas belajar (EXP, level, gelar, streak)
    window.addEventListener('tka_profile_updated', refreshStats);
    window.addEventListener('storage', refreshStats);

    return () => {
      window.removeEventListener('tka_profile_updated', refreshStats);
      window.removeEventListener('storage', refreshStats);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-[#0a1e4a] border-b border-blue-900/60 shadow-lg shadow-blue-950/25 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-2">
            {/* Logo & Judul Aplikasi */}
            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group flex-shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30 border border-blue-400/40 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  TKA SD
                </span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-200 rounded-full border border-blue-400/30">
                  Portal Siswa
                </span>
              </div>
            </div>

            {/* Bagian Kanan: Indikator Gamifikasi & Profil */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* 1. Indikator Streak Belajar (HANYA INFORMASI / BUKAN BUTTON / TIDAK BISA DIPENCET) */}
              <div
                className={`inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-black select-none border transition-all ${
                  profileStats.streak.activeToday
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-400/50 shadow-xs'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/80'
                }`}
                title={
                  profileStats.streak.activeToday
                    ? `Streak menyala! ${profileStats.streak.count} hari berturut-turut (reset jam 12 malam)`
                    : `Streak ${profileStats.streak.count} hari (belum aktif hari ini, reset jam 12 malam)`
                }
              >
                <span
                  className={
                    profileStats.streak.activeToday
                      ? 'animate-pulse text-sm'
                      : 'grayscale opacity-60 text-sm'
                  }
                >
                  🔥
                </span>
                <span>{profileStats.streak.count} Hari</span>
                {profileStats.streak.activeToday ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden md:inline-block ml-0.5" />
                ) : (
                  <span className="text-[10px] text-amber-400/80 hidden xl:inline-block font-normal ml-0.5">
                    (Belum aktif)
                  </span>
                )}
              </div>

              {/* 2. Tombol Nama Profil Pengguna dengan Preview EXP & Gelar (SATU-SATUNYA YANG BISA DIPENCET) */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center space-x-2 sm:space-x-2.5 text-xs sm:text-sm text-blue-100 bg-[#071638] hover:bg-[#0e2760] px-3 py-1.5 rounded-xl border border-blue-700/70 hover:border-blue-400 transition-all cursor-pointer shadow-sm active:scale-98 group"
                title="Klik nama profil untuk membuka Rapor Level, EXP, Streak & Koleksi Gelar"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col items-start text-left leading-tight min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-white text-xs sm:text-sm truncate max-w-[90px] sm:max-w-[130px]">
                      {user?.username || (user?.email ? user.email.split('@')[0] : 'yuken')}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-blue-300 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
                  </div>
                  {/* Preview Singkat: Level, EXP & Gelar Aktif */}
                  <div className="flex items-center space-x-1 sm:space-x-1.5 text-[10px] mt-0.5 text-blue-200">
                    <span className="font-black text-amber-300">Lv.{profileStats.level}</span>
                    <span className="text-blue-400/80">•</span>
                    <span className="font-semibold text-blue-200">{profileStats.totalExp} EXP</span>
                    <span className="hidden sm:inline text-blue-400/80">•</span>
                    <span className="hidden sm:inline-flex items-center space-x-0.5 font-bold text-yellow-300 truncate max-w-[110px]">
                      <span>{profileStats.activeTitle.icon}</span>
                      <span className="truncate">{profileStats.activeTitle.name}</span>
                    </span>
                  </div>
                </div>
              </button>

              {/* 3. Tombol Keluar (Logout) */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-200 bg-rose-500/15 hover:bg-rose-500/25 transition-all border border-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-500 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                title="Keluar dari akun"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-300" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal Detail Profil, EXP, Streak & Koleksi Gelar */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        profileStats={profileStats}
        onProfileUpdated={refreshStats}
      />
    </>
  );
};

export default Navbar;
