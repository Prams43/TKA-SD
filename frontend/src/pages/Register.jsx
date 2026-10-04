import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateRegisterForm } from '../utils/validation';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {
  GraduationCap,
  AlertCircle,
  UserPlus,
  Mail,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';

/**
 * Halaman Pendaftaran Akun dengan Verifikasi OTP 6-Digit (Route "/register")
 */
const Register = () => {
  const navigate = useNavigate();
  const { register, verifyOtp, resendOtp } = useAuth();

  // Step: 'form' (isi data) atau 'otp' (verifikasi 6 digit)
  const [step, setStep] = useState('form');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State untuk OTP
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Refs untuk 6 kotak input OTP
  const otpInputRefs = useRef([]);

  // Timer hitung mundur untuk kirim ulang OTP
  useEffect(() => {
    let timer;
    if (step === 'otp' && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCountdown]);

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

  // Submit Step 1: Pendaftaran Akun
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    try {
      await register(formData.username, formData.email, formData.password);

      setRegisteredEmail(formData.email);
      setResendCountdown(60);
      setStep('otp');
      // Otomatis fokus ke kotak pertama setelah beralih ke layar OTP
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err) {
      const errMsg = err.message || 'Maaf, belum bisa melakukan registrasi.';
      setServerError(errMsg);

      // Berikan warna merah dan pesan error pada kolom/field spesifik
      if (err.field === 'username' || errMsg.toLowerCase().includes('username')) {
        setErrors((prev) => ({
          ...prev,
          username: errMsg.includes('sudah digunakan')
            ? 'Username sudah digunakan. Silakan pilih username lain.'
            : errMsg,
        }));
      } else if (err.field === 'email' || errMsg.toLowerCase().includes('email')) {
        setErrors((prev) => ({
          ...prev,
          email: errMsg,
        }));
      } else if (err.field === 'password' || errMsg.toLowerCase().includes('password')) {
        setErrors((prev) => ({
          ...prev,
          password: errMsg,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handler input OTP per-karakter dengan auto-advance
  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Hanya angka

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1); // Ambil karakter terakhir jika diketik ganda
    setOtpDigits(newDigits);
    setOtpError('');

    // Jika mengisi angka dan belum di kotak terakhir, pindah ke kotak berikutnya
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handler navigasi tombol backspace pada OTP
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handler paste kode OTP 6 digit langsung
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpDigits(digits);
      setOtpError('');
      otpInputRefs.current[5]?.focus();
    }
  };

  // Submit Step 2: Verifikasi OTP
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');

    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) {
      setOtpError('Masukkan 6 digit kode OTP secara lengkap.');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await verifyOtp(registeredEmail, fullOtp);

      // Alur penting: setelah verifikasi berhasil, arahkan ke halaman Login dengan pesan sukses
      navigate('/', {
        state: {
          message: response.message || 'Verifikasi berhasil! Silakan login dengan akun baru Anda.',
        },
      });
    } catch (err) {
      setOtpError(err.message || 'Kode OTP tidak valid atau kedaluwarsa.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Handler Kirim Ulang OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    setOtpError('');
    try {
      await resendOtp(registeredEmail);
      setResendCountdown(60);
      setOtpDigits(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      setOtpError(err.message || 'Gagal mengirim ulang kode OTP.');
    } finally {
      setIsResending(false);
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
            {step === 'form' ? 'Daftar Akun TKA SD' : 'Verifikasi Akun'}
          </h1>
          <p className="text-slate-500 text-sm mt-1.5">
            {step === 'form'
              ? 'Buat akun baru untuk mulai latihan Tes Kemampuan Akademik'
              : `Kode verifikasi telah dikirimkan ke email Anda`}
          </p>
        </div>

        {/* Card Form Utama */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8 backdrop-blur-sm">
          {/* STEP 1: FORMULIR PENDAFTARAN */}
          {step === 'form' && (
            <div className="animate-fade-in">
              {serverError && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-rose-900">{serverError}</p>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} noValidate>
                <InputField
                  label="Username / Nama Panggilan"
                  id="register-username"
                  name="username"
                  type="text"
                  placeholder="contoh: khalid16 atau siswa_sd"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  required
                  autoComplete="username"
                />

                <InputField
                  label="Alamat Email"
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="contoh: siswa@sekolah.id atau nama@gmail.com"
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
                    loadingText="Mengirim Kode OTP..."
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
          )}

          {/* STEP 2: VERIFIKASI KODE OTP 6 DIGIT */}
          {step === 'otp' && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Periksa Email Anda</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Kami telah mengirimkan 6 digit kode keamanan ke:
                </p>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-800 font-semibold text-xs mt-2 border border-slate-200">
                  <span>{registeredEmail}</span>
                </div>
              </div>

              {otpError && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtpSubmit} noValidate>
                {/* 6 Kotak Input OTP */}
                <div className="flex justify-between items-center gap-2 mb-6" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl border transition-all outline-none ${
                        digit
                          ? 'border-blue-600 bg-blue-50/30 text-blue-900 shadow-sm shadow-blue-500/10 ring-2 ring-blue-500/20'
                          : 'border-slate-300 bg-white text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isVerifying}
                  loadingText="Memverifikasi OTP..."
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Verifikasi & Aktifkan Akun
                </Button>

                {/* Kirim Ulang Kode OTP */}
                <div className="mt-5 text-center">
                  <p className="text-xs text-slate-500 mb-2">Tidak menerima kode verifikasi?</p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCountdown > 0 || isResending}
                    className={`inline-flex items-center space-x-1.5 text-xs font-semibold ${
                      resendCountdown > 0
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-blue-600 hover:text-blue-700 hover:underline'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                    <span>
                      {resendCountdown > 0
                        ? `Kirim ulang kode dalam (${resendCountdown}s)`
                        : 'Kirim Ulang Kode OTP'}
                    </span>
                  </button>
                </div>
              </form>

              {/* Kembali ke Step 1 (Ubah Email) */}
              <div className="mt-6 pt-5 border-t border-slate-150 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('form');
                    setOtpError('');
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ubah alamat email atau data pendaftaran</span>
                </button>
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

export default Register;

