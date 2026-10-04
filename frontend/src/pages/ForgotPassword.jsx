import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {
  KeyRound,
  AlertCircle,
  Mail,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  Lock,
} from 'lucide-react';

/**
 * Halaman Lupa Password & Reset Password dengan 3 Tahapan Terpisah:
 * 1. Step 'request': Masukkan Username / Email untuk meminta OTP
 * 2. Step 'otp': Verifikasi 6 digit kode OTP (tampilan terpisah selaras Registrasi)
 * 3. Step 'new-password': Atur password baru setelah OTP terverifikasi
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, verifyResetOtp, resetPassword } = useAuth();

  // Step: 'request' | 'otp' | 'new-password'
  const [step, setStep] = useState('request');

  // State Step 1: Input Identitas
  const [identifier, setIdentifier] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');

  // State Step 2: Input Kode OTP
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [verifiedOtp, setVerifiedOtp] = useState('');

  // State Step 3: Password Baru
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status & Feedback UI
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

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

  // Handler Submit Step 1: Minta Kode OTP Reset
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    if (!identifier.trim()) {
      setErrors({ identifier: 'Username atau alamat email wajib diisi.' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPassword(identifier.trim());
      setTargetEmail(res.email);
      setMaskedEmail(res.maskedEmail || res.email);
      setResendCountdown(60);
      setOtpDigits(['', '', '', '', '', '']);
      setStep('otp');

      // Fokuskan ke kotak OTP pertama
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err) {
      setServerError(err.message || 'Gagal mengirimkan kode pemulihan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler Kirim Ulang Kode OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    setServerError('');
    try {
      await forgotPassword(targetEmail);
      setResendCountdown(60);
      setOtpDigits(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      setServerError(err.message || 'Gagal mengirim ulang kode OTP.');
    } finally {
      setIsResending(false);
    }
  };

  // Handler input OTP per-karakter dengan auto-advance
  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setServerError('');

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handler navigasi backspace pada kotak OTP
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handler paste kode OTP 6 digit
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpDigits(digits);
      setServerError('');
      otpInputRefs.current[5]?.focus();
    }
  };

  // Handler Submit Step 2: Verifikasi Kode OTP
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) {
      setServerError('Masukkan 6 digit kode OTP secara lengkap.');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      await verifyResetOtp(targetEmail, fullOtp);
      setVerifiedOtp(fullOtp);
      setServerError('');
      setStep('new-password');
    } catch (err) {
      setServerError(err.message || 'Kode OTP tidak valid atau kedaluwarsa.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Handler Submit Step 3: Simpan Password Baru
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    const formErrors = {};

    if (!newPassword) {
      formErrors.newPassword = 'Password baru wajib diisi.';
    } else if (newPassword.length < 8) {
      formErrors.newPassword = 'Password baru minimal 8 karakter.';
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = 'Konfirmasi password wajib diisi.';
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = 'Konfirmasi password tidak cocok.';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPassword(targetEmail, verifiedOtp, newPassword);

      // Setelah berhasil, arahkan ke login dengan pesan sukses hijau
      navigate('/', {
        state: {
          message: res.message || 'Password Anda berhasil diperbarui! Silakan masuk dengan kata sandi baru.',
        },
      });
    } catch (err) {
      setServerError(err.message || 'Gagal mereset password. Pastikan kode OTP benar.');
    } finally {
      setIsLoading(false);
    }
  };

  // Teks Header Dinamis Sesuai Step
  const getHeaderInfo = () => {
    switch (step) {
      case 'otp':
        return {
          icon: <Mail className="w-8 h-8" />,
          title: 'Verifikasi Kode OTP',
          subtitle: 'Masukkan 6 digit kode keamanan yang telah dikirim ke email Anda',
        };
      case 'new-password':
        return {
          icon: <Lock className="w-8 h-8" />,
          title: 'Atur Password Baru',
          subtitle: 'Buat kata sandi baru yang aman untuk akun Anda',
        };
      case 'request':
      default:
        return {
          icon: <KeyRound className="w-8 h-8" />,
          title: 'Lupa Password?',
          subtitle: 'Masukkan username atau email akun Anda untuk menerima kode OTP pemulihan',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100/50 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Header Identitas */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
            {headerInfo.icon}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {headerInfo.title}
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 max-w-xs mx-auto">
            {headerInfo.subtitle}
          </p>
        </div>

        {/* Card Form Utama */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8 backdrop-blur-sm">
          {/* Banner Error Server */}
          {serverError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3 text-rose-800 text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <p className="font-semibold text-rose-900">{serverError}</p>
            </div>
          )}

          {/* STEP 1: INPUT IDENTIFIER */}
          {step === 'request' && (
            <div className="animate-fade-in">
              <form onSubmit={handleRequestSubmit} noValidate>
                <InputField
                  label="Username atau Alamat Email"
                  id="reset-identifier"
                  name="identifier"
                  type="text"
                  placeholder="contoh: khalid16 atau nama@gmail.com"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errors.identifier) setErrors({});
                    if (serverError) setServerError('');
                  }}
                  error={errors.identifier}
                  required
                  autoComplete="username"
                />

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading}
                    loadingText="Mengirim Kode OTP..."
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Kirim Kode OTP Pemulihan
                  </Button>
                </div>
              </form>

              {/* Kembali ke Login */}
              <div className="mt-6 pt-5 border-t border-slate-150 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Halaman Masuk</span>
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: VERIFIKASI KODE OTP (TERPISAH) */}
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
                  <span>{maskedEmail}</span>
                </div>
              </div>

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
                      className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl border transition-all outline-none ${
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
                  isLoading={isVerifyingOtp}
                  loadingText="Memverifikasi OTP..."
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Verifikasi Kode OTP
                </Button>

                {/* Kirim Ulang Kode OTP */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500 mb-1.5">Tidak menerima kode OTP?</p>
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

              {/* Kembali ke Step 1 */}
              <div className="mt-6 pt-5 border-t border-slate-150 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('request');
                    setServerError('');
                    setErrors({});
                  }}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ubah data akun / input ulang</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ATUR PASSWORD BARU (TERPISAH SETELAH OTP DIVERIFIKASI) */}
          {step === 'new-password' && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Kata Sandi Baru</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Untuk akun terverifikasi:
                </p>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-800 font-semibold text-xs mt-2 border border-slate-200">
                  <span>{maskedEmail}</span>
                </div>
              </div>

              <form onSubmit={handleResetSubmit} noValidate>
                {/* Input Password Baru */}
                <InputField
                  label="Password Baru (minimal 8 karakter)"
                  id="reset-newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Buat password baru yang kuat"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }));
                    if (serverError) setServerError('');
                  }}
                  error={errors.newPassword}
                  required
                  showPasswordToggle
                  autoComplete="new-password"
                />

                {/* Konfirmasi Password Baru */}
                <InputField
                  label="Konfirmasi Password Baru"
                  id="reset-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Ketik ulang password baru Anda"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    if (serverError) setServerError('');
                  }}
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
                    loadingText="Menyimpan Password Baru..."
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Simpan Password Baru
                  </Button>
                </div>
              </form>

              {/* Kembali ke Login */}
              <div className="mt-6 pt-5 border-t border-slate-150 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Halaman Masuk</span>
                </Link>
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

export default ForgotPassword;
