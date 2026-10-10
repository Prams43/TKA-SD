import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Route publik: mengarahkan pengguna yang SUDAH login langsung ke dashboard
 * agar tidak membuka halaman login/register berulang kali
 */
const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-3" />
        <p className="text-sm text-blue-100 font-medium">Memuat...</p>
      </div>
    );
  }

  // Jika sudah login, redirect langsung ke Dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
