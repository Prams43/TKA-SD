import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Verifikasi token dan muat profil pengguna saat aplikasi pertama kali dimuat
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const data = await authService.getMe();
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
        } catch (error) {
          console.warn('Sesi login kedaluwarsa atau token tidak valid.');
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Fungsi Login (bisa menggunakan Username atau Gmail)
   */
  const login = async (identifier, password) => {
    const data = await authService.login(identifier, password);
    if (data.token && data.user) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  };

  /**
   * Fungsi Registrasi (dengan Username, Gmail, dan Password)
   */
  const register = async (username, email, password) => {
    return await authService.register(username, email, password);
  };

  /**
   * Fungsi Verifikasi OTP
   */
  const verifyOtp = async (email, otp) => {
    return await authService.verifyOtp(email, otp);
  };

  /**
   * Fungsi Kirim Ulang OTP
   */
  const resendOtp = async (email) => {
    return await authService.resendOtp(email);
  };

  /**
   * Fungsi Logout
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    verifyOtp,
    resendOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook untuk mengakses AuthContext dengan mudah
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};
