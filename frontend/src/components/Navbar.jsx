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
      <nav className="bg-white/95 backdrop-blur-sm border-b border-[#E6DFD5] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Logo & Judul Aplikasi */}
            <div
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0"
            >
              <img
                src="/logo.png"
                alt="Logo EDU TKA"
                className="h-9 w-auto object-contain rounded-md"
              />
              <span className="font-bold text-base text-[#261C14] tracking-tight">
                TKA SD
              </span>
            </div>

            {/* Bagian Kanan: Indikator Gamifikasi & Profil */}
            <div className="flex items-center space-x-2 sm:space-x-3.5">
              {/* 1. Indikator Streak Belajar */}
              <div
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium select-none border transition-colors ${
                  profileStats.streak.activeToday
                    ? 'bg-[#FEF7EE] text-[#D97E26] border-[#FCD9BD]'
                    : 'bg-[#FAF7F2] text-[#8C7E72] border-[#E6DFD5]'
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
                <span className="font-semibold">{profileStats.streak.count} Hari</span>
              </div>

              {/* 2. Tombol Profil Pengguna (Single Row, Bersih & Rapih) */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center space-x-2 text-xs text-[#261C14] bg-white hover:bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E6DFD5] hover:border-[#D8CDC2] transition-colors cursor-pointer shadow-xs"
                title="Buka detail profil, level, dan gelar"
              >
                <div className="w-6 h-6 rounded-full bg-[#FAECE6] text-[#C25E38] flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="font-medium text-xs text-[#261C14] truncate max-w-[90px] sm:max-w-[130px]">
                  {user?.username || (user?.email ? user.email.split('@')[0] : 'Siswa')}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FAECE6] text-[#C25E38]">
                  Lv.{profileStats.level}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8C7E72] flex-shrink-0" />
              </button>

              {/* 3. Tombol Keluar (Logout) */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#6E6258] hover:text-[#C93B3B] bg-white hover:bg-[#FDF1F1] border border-[#E6DFD5] hover:border-[#F4C7C7] transition-colors cursor-pointer"
                title="Keluar dari akun"
              >
                <LogOut className="w-3.5 h-3.5" />
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
