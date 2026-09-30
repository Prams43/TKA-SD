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
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Judul Aplikasi */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">TKA SD</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                Portal Siswa
              </span>
            </div>
          </div>

          {/* Profil Pengguna & Tombol Keluar */}
          <div className="flex items-center space-x-4">
            {(user?.username || user?.email) && (
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-800">{user.username || user.email}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
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
