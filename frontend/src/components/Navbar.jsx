import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';

/**
 * Komponen Navbar untuk halaman Dashboard
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-30 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Judul Aplikasi */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30 border border-blue-400/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">TKA SD</span>
              <span className="hidden sm:inline-block ml-2 px-2.5 py-0.5 text-xs font-semibold bg-blue-500/15 text-blue-300 rounded-full border border-blue-400/30">
                Portal Siswa
              </span>
            </div>
          </div>

          {/* Profil Pengguna & Tombol Keluar */}
          <div className="flex items-center space-x-4">
            {(user?.username || user?.email) && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <User className="w-4 h-4 text-blue-400" />
                <span className="font-medium">{user.username || user.email}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 transition-all border border-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-500 hover:scale-105 active:scale-95"
              title="Keluar dari akun"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
