import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { GraduationCap, AlertCircle, CheckCircle2, UserPlus, ArrowLeft, Trash2, LogIn } from 'lucide-react';

/**
 * Halaman Login (Route "/")
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Pesan sukses dari halaman registrasi (jika baru selesai mendaftar)
  const successNotice = location.state?.message || '';

  // Mengambil akun yang tersimpan di perangkat lokal
  const [savedUser, setSavedUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tka_saved_user');
      if (saved) return JSON.parse(saved);
      // Kompatibilitas dengan sesi sebelumnya
      const legacyLast = localStorage.getItem('tka_last_identifier');
      if (legacyLast) {
        return {
          identifier: legacyLast,
          username: legacyLast,
          email: legacyLast.includes('@') ? legacyLast : '',
        };
      }
    } catch {
      return null;
    }
    return null;
  });

  // State apakah pengguna memilih untuk login dengan akun lain
  const [useAnotherAccount, setUseAnotherAccount] = useState(false);

  // Status opsi 'Ingat Saya' (default aktif)
  const [rememberMe, setRememberMe] = useState(() => {
    return localStorage.getItem('tka_remember_me') !== 'false';
  });

  // State untuk form login akun tersimpan
  const [savedPassword, setSavedPassword] = useState('');

  // State untuk form login akun baru / akun lain
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  // Submit saat login menggunakan akun yang tersimpan
  const handleSavedAccountSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!savedPassword) {
      setErrors({ password: 'Password wajib diisi.' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(savedUser.identifier, savedPassword);

      if (rememberMe) {
        localStorage.setItem('tka_remember_me', 'true');
        const userToSave = {
          identifier: savedUser.identifier,
          username: res.user?.username || savedUser.username || savedUser.identifier,
          email: res.user?.email || savedUser.email || '',
        };
        localStorage.setItem('tka_saved_user', JSON.stringify(userToSave));
      } else {
        localStorage.setItem('tka_remember_me', 'false');
        localStorage.removeItem('tka_saved_user');
      }

      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message || 'Password salah. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit saat login menggunakan formulir akun lain
  const handleStandardSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(formData.identifier, formData.password);

      if (rememberMe) {
        localStorage.setItem('tka_remember_me', 'true');
        const userToSave = {
          identifier: formData.identifier.trim(),
          username: res.user?.username || formData.identifier.trim(),
          email: res.user?.email || '',
        };
        localStorage.setItem('tka_saved_user', JSON.stringify(userToSave));
      } else {
        localStorage.setItem('tka_remember_me', 'false');
        localStorage.removeItem('tka_saved_user');
      }

      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.message || 'Username/Gmail atau password salah.';
      setServerError(errMsg);
      if (errMsg.toLowerCase().includes('password')) {
        setErrors((prev) => ({ ...prev, password: errMsg }));
      } else {
        setErrors((prev) => ({ ...prev, identifier: errMsg }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Menghapus akun tersimpan dari perangkat
  const handleForgetSavedAccount = () => {
    localStorage.removeItem('tka_saved_user');
    localStorage.removeItem('tka_last_identifier');
    localStorage.removeItem('tka_saved_accounts');
    setSavedUser(null);
    setUseAnotherAccount(true);
    setFormData({ identifier: '', password: '' });
  };

  // Menentukan apakah tampilan sapaan akun tersimpan yang aktif
  const isPromptingSavedUser = savedUser && !useAnotherAccount;

  return (
    <div className="min-h-screen bg-doodle-pattern flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Portal TKA SD
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">
            Masuk untuk mengakses latihan Tes Kemampuan Akademik
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white/95 rounded-2xl shadow-xl shadow-blue-950/10 border border-slate-200/90 p-6 sm:p-8 backdrop-blur-md">
          {/* Notifikasi Registrasi Berhasil */}
          {successNotice && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3 text-emerald-800 text-sm animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Notifikasi Error dari Server */}
          {serverError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* TAMPILAN 1: PERTANYAAN TETAP LOGIN MENGGUNAKAN AKUN TERSIMPAN */}
          {isPromptingSavedUser ? (
            <div className="animate-fade-in">
              {/* Header Kartu Akun Tersimpan */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/25 mb-3.5 transform hover:scale-105 transition-transform">
                  {savedUser.username ? savedUser.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-0.5 rounded-full border border-blue-200 mb-2">
                  Akun Tersimpan
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {savedUser.username || savedUser.identifier}
                </h2>
                {savedUser.email && savedUser.email !== savedUser.username && (
                  <p className="text-xs text-slate-500 mt-0.5">{savedUser.email}</p>
                )}
                <p className="text-sm font-medium text-slate-600 mt-3">
                  Tetap login menggunakan akun ini?
                </p>
              </div>

              <form onSubmit={handleSavedAccountSubmit} noValidate>
                <InputField
                  label="Password"
                  id="saved-account-password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={savedPassword}
                  onChange={(e) => {
                    setSavedPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  error={errors.password}
                  required
                  showPasswordToggle
                  autoComplete="current-password"
                />

                <div className="flex items-center justify-between mt-3 mb-5">
                  <label
                    htmlFor="saved-remember-me"
                    className="flex items-center space-x-2.5 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      id="saved-remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-colors"
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                      Ingat akun ini
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>

                {/* Tombol Utama: Login */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  loadingText="Memproses Masuk..."
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>

                {/* Tombol Kedua: Login Akun Lain */}
                <button
                  type="button"
                  onClick={() => {
                    setUseAnotherAccount(true);
                    setServerError('');
                    setErrors({});
                  }}
                  className="w-full mt-3 py-2.5 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 rounded-xl transition-all border border-slate-200/80 flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4 text-slate-500" />
                  <span>Login Akun Lain</span>
                </button>
              </form>

              {/* Opsi Hapus Akun dari Perangkat */}
              <div className="mt-6 pt-5 border-t border-slate-150 text-center flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleForgetSavedAccount}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors inline-flex items-center space-x-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus akun tersimpan dari perangkat ini</span>
                </button>
              </div>
            </div>
          ) : (
            /* TAMPILAN 2: FORMULIR LOGIN BIASA / LOGIN AKUN LAIN */
            <div className="animate-fade-in">
              {savedUser && (
                <button
                  type="button"
                  onClick={() => {
                    setUseAnotherAccount(false);
                    setServerError('');
                    setErrors({});
                  }}
                  className="mb-4 inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke akun {savedUser.username || savedUser.identifier}</span>
                </button>
              )}

              <form onSubmit={handleStandardSubmit} noValidate>
                <InputField
                  label="Username atau Alamat Email"
                  id="login-identifier"
                  name="identifier"
                  type="text"
                  placeholder="contoh: khalid16 atau siswa@gmail.com"
                  value={formData.identifier}
                  onChange={handleChange}
                  error={errors.identifier}
                  required
                  autoComplete="username"
                />

                <InputField
                  label="Password"
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password Anda"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  showPasswordToggle
                  autoComplete="current-password"
                />

                {/* Checkbox Ingat Saya & Link Lupa Password */}
                <div className="flex items-center justify-between mt-3 mb-1">
                  <label
                    htmlFor="remember-me"
                    className="flex items-center space-x-2.5 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      id="remember-me"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer transition-colors"
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                      Ingat saya
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Lupa password?
                  </Link>
                </div>

                <div className="mt-5">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                    loadingText="Memproses Masuk..."
                  >
                    Masuk ke Akun
                  </Button>
                </div>
              </form>

              {/* Link ke Registrasi */}
              <div className="mt-6 pt-6 border-t border-slate-150 text-center">
                <p className="text-sm text-slate-600">
                  Belum punya akun?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 mt-6">
          &copy; {new Date().getFullYear()} TKA SD. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
};

export default Login;

