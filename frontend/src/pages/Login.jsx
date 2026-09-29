import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { GraduationCap, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Halaman Login (Route "/")
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Pesan sukses dari halaman registrasi (jika baru selesai mendaftar)
  const successNotice = location.state?.message || '';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error field saat pengguna mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Validasi form sisi klien
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      // Jika berhasil, arahkan ke dashboard
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message || 'Gmail atau password salah.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100/50 flex flex-col justify-center items-center p-4 sm:p-6">
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
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8 backdrop-blur-sm">
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

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Alamat Gmail"
              id="login-email"
              name="email"
              type="email"
              placeholder="contoh: siswa@gmail.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
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

            <div className="mt-6">
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

        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 mt-6">
          &copy; {new Date().getFullYear()} TKA SD. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
};

export default Login;
