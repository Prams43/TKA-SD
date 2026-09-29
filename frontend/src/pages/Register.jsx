import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateRegisterForm } from '../utils/validation';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { GraduationCap, AlertCircle, UserPlus } from 'lucide-react';

/**
 * Halaman Pendaftaran Akun (Route "/register")
 */
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Bersihkan pesan error ketika pengguna mengubah input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
      setErrorDetail('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrorDetail('');

    // 1. Validasi form di sisi klien
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      // 2. Kirim request registrasi ke backend
      const response = await register(formData.email, formData.password);

      // 3. Alur penting: setelah registrasi berhasil, otomatis diarahkan kembali ke halaman Login (route "/")
      navigate('/', {
        state: {
          message: response.message || 'Registrasi berhasil! Silakan login dengan akun Anda.',
        },
      });
    } catch (err) {
      setServerError('maaf anda belum bisa register');
      setErrorDetail(err.message || '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100/50 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Header Identitas */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Daftar Akun TKA SD
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">
            Buat akun baru untuk mulai latihan Tes Kemampuan Akademik
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8 backdrop-blur-sm">
          {/* Pesan Kesalahan dari Server */}
          {serverError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-900">{serverError}</p>
                {errorDetail && (
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                    {errorDetail}
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Alamat Gmail"
              id="register-email"
              name="email"
              type="email"
              placeholder="contoh: nama.siswa@gmail.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />

            <InputField
              label="Password (minimal 8 karakter)"
              id="register-password"
              name="password"
              type="password"
              placeholder="Buat password yang kuat"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              showPasswordToggle
              autoComplete="new-password"
            />

            <InputField
              label="Konfirmasi Password"
              id="register-confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Ketik ulang password Anda"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              showPasswordToggle
              autoComplete="new-password"
            />

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                loadingText="Mendaftarkan Akun..."
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Daftar Sekarang
              </Button>
            </div>
          </form>

          {/* Link ke Login */}
          <div className="mt-6 pt-6 border-t border-slate-150 text-center">
            <p className="text-sm text-slate-600">
              Sudah punya akun?{' '}
              <Link
                to="/"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Masuk di sini
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

export default Register;
