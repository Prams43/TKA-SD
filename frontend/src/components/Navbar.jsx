import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User, Flame, Award, ChevronDown } from 'lucide-react';
import { getUserProfileStats } from '../utils/activityTracker';
import { getCharacterAvatar } from '../utils/characterAvatars';
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
      <nav className="bg-slate-200/95 backdrop-blur-md border-b border-slate-300 shadow-xs sticky top-0 z-30 pt-safe">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Logo & Judul Aplikasi */}
            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
            >
              <img
                src="/logo.png"
                alt="Logo EDU TKA"
                className="h-8 sm:h-9 w-auto object-contain rounded-md"
              />
              <span className="font-bold text-sm sm:text-base text-slate-800 tracking-tight">
                TKA SD
              </span>
            </div>

            {/* Bagian Kanan: Indikator Gamifikasi & Profil */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {/* 1. Indikator Streak Belajar (Dominan Navy) */}
              <div
                className={`inline-flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold select-none border transition-all duration-300 shadow-sm bg-[#162E5B] border-[#1E3A8A] flex-shrink-0 ${
                  profileStats.streak.activeToday
                    ? 'text-amber-300'
                    : 'text-slate-300'
                }`}
                title={
                  profileStats.streak.activeToday
                    ? `Streak aktif! ${profileStats.streak.count} hari berturut-turut`
                    : `Streak ${profileStats.streak.count} hari`
                }
              >
                <span
                  className={
                    profileStats.streak.activeToday
                      ? 'text-sm'
                      : 'grayscale opacity-60 text-sm'
                  }
                >
                  🔥
                </span>
                <span className="font-semibold text-white text-[11px] sm:text-xs">
                  {profileStats.streak.count}
                  <span className="hidden xs:inline"> Hari</span>
                </span>
              </div>

              {/* 2. Tombol Profil Pengguna (Dominan Navy) */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-white bg-[#162E5B] hover:bg-[#1B386C] px-2 sm:px-3 py-1.5 rounded-lg border border-[#1E3A8A] transition-all cursor-pointer shadow-sm active:scale-95 group"
                title="Buka detail profil, level, dan gelar"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-blue-400/80 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-xs group-hover:border-blue-300">
                  <img
                    src={getCharacterAvatar(profileStats?.avatar).image}
                    alt={getCharacterAvatar(profileStats?.avatar).name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <span className="font-semibold text-[11px] sm:text-xs text-white truncate max-w-[65px] xs:max-w-[90px] sm:max-w-[130px]">
                  {user?.username || (user?.email ? user.email.split('@')[0] : 'Siswa')}
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1D4ED8] text-white">
                  Lv.{profileStats.level}
                </span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-200 flex-shrink-0" />
              </button>

              {/* 3. Tombol Keluar (Logout - Dominan Navy) */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#162E5B] hover:bg-[#1E3A8A] border border-[#1E3A8A] transition-all cursor-pointer shadow-sm active:scale-95"
                title="Keluar dari akun"
              >
                <LogOut className="w-3.5 h-3.5 text-blue-200" />
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
