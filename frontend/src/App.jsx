import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Materi from './pages/Materi';
import LatihanSoal from './pages/LatihanSoal';
import Tryout from './pages/Tryout';
import NavyBackground from './components/NavyBackground';
import RewardModal from './components/RewardModal';

function App() {
  return (
    <AuthProvider>
      <div className="relative min-h-screen text-[#1E293B] antialiased">
        {/* Latar Belakang Navy/Teal Gelembung Lembut Universal */}
        <NavyBackground />

        {/* Konten Rute Aplikasi */}
        <div className="relative z-10">
          <HashRouter>
            {/* Modal Selebrasi EXP & Level Up ala Duolingo Global */}
            <RewardModal />

            <Routes>
          {/* Route Publik (Pengguna yang sudah login akan otomatis dialihkan ke /dashboard) */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Route Terlindungi (Memerlukan token login aktif) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/latihan" element={<LatihanSoal />} />
            <Route path="/tryout" element={<Tryout />} />
            <Route path="/rapor" element={<Rapor />} />
          </Route>

          {/* Fallback ke halaman utama jika path tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          </HashRouter>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
