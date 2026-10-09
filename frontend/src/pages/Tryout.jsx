import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PUSMENDIK_TRYOUT } from '../data/tryoutData';
import { recordTryout, getActivityData } from '../utils/activityTracker';
import { formatMath } from '../utils/mathRenderer';
import {
  BookOpen,
  Calculator,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Check,
  XCircle,
  X,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Trophy,
  RotateCcw,
  Eye,
  LayoutDashboard,
} from 'lucide-react';

/**
 * Halaman Penuh Simulasi Tryout Akbar TKA SD Nasional
 * 
 * Ketentuan:
 * - Mapel: Bahasa Indonesia & Matematika
 * - Total 5 Tryout (Paket 1 - 5)
 * - Standar TKA SD Nasional (30 Soal, 60 Menit)
 * - Tipe kesulitan HOTS, Mudah, Sedang diacak posisinya
 * - Format: Sebagian besar Pilihan Ganda (PG) dan beberapa soal Isian Singkat
 * - Timer hitung mundur, lembar navigasi nomor, skor & pembahasan
 */

// Helper abjad pilihan A, B, C, D, E...
const getOptionLetter = (idx) => {
  if (typeof idx !== 'number' || idx < 0) return '';
  return String.fromCharCode(65 + idx);
};

// Cari indeks opsi dari value (string atau index)
const findOptionIndex = (options, val) => {
  if (!Array.isArray(options) || val === undefined || val === null) return -1;
  if (typeof val === 'number' && val >= 0 && val < options.length) return val;
  const strVal = String(val).trim().toLowerCase();
  return options.findIndex(
    (opt) => String(opt).trim().toLowerCase() === strVal
  );
};

// Evaluasi kebenaran jawaban satu soal secara ketat & akurat
export const evaluateQuestionResult = (q, userVal) => {
  // Jika belum dijawab atau kosong, dipastikan SALAH
  if (userVal === undefined || userVal === null || userVal === '') {
    return { isCorrect: false, isAnswered: false };
  }

  const qType = q.type || q.tipe || 'mcq';

  // 1. Pilihan Ganda Kompleks (mcma)
  if (qType === 'mcma') {
    if (!Array.isArray(userVal) || userVal.length === 0 || !Array.isArray(q.answer)) {
      return { isCorrect: false, isAnswered: Array.isArray(userVal) && userVal.length > 0 };
    }
    const matchAll =
      q.answer.length === userVal.length &&
      q.answer.every((ans) =>
        userVal.some((u) => String(u).trim().toLowerCase() === String(ans).trim().toLowerCase())
      );
    return { isCorrect: matchAll, isAnswered: true };
  }

  // 2. Benar / Salah (category)
  if (qType === 'category') {
    if (
      typeof userVal !== 'object' ||
      userVal === null ||
      Array.isArray(userVal) ||
      !Array.isArray(q.statements)
    ) {
      return { isCorrect: false, isAnswered: false };
    }
    const keys = Object.keys(userVal);
    if (keys.length === 0) {
      return { isCorrect: false, isAnswered: false };
    }
    const allAnswered = q.statements.every((_, sIdx) => userVal[sIdx] !== undefined);
    const isCorrect = allAnswered && q.statements.every((s, sIdx) => userVal[sIdx] === s.answer);
    return { isCorrect, isAnswered: true };
  }

  // 3. Isian Singkat (isian)
  if (qType === 'isian') {
    const rawCorrect = q.answer !== undefined ? q.answer : q.jawabanBenar;
    if (rawCorrect === undefined || rawCorrect === null) {
      return { isCorrect: false, isAnswered: true };
    }
    const isCorrect =
      String(userVal).trim().toLowerCase() === String(rawCorrect).trim().toLowerCase();
    return { isCorrect, isAnswered: true };
  }

  // 4. Pilihan Ganda Tunggal (mcq)
  const options = q.options || q.pilihan || [];
  const rawCorrect = q.answer !== undefined ? q.answer : q.jawabanBenar;
  if (rawCorrect === undefined || rawCorrect === null) {
    return { isCorrect: false, isAnswered: true };
  }

  const strUser = String(userVal).trim().toLowerCase();
  const strCorrect = String(rawCorrect).trim().toLowerCase();

  // Cocok string langsung
  if (strUser === strCorrect) {
    return { isCorrect: true, isAnswered: true };
  }

  // User menjawab dengan index nomor
  if (typeof userVal === 'number' && options[userVal] !== undefined) {
    if (String(options[userVal]).trim().toLowerCase() === strCorrect) {
      return { isCorrect: true, isAnswered: true };
    }
  }

  // Kunci jawaban berupa index nomor
  if (typeof rawCorrect === 'number' && options[rawCorrect] !== undefined) {
    if (strUser === String(options[rawCorrect]).trim().toLowerCase()) {
      return { isCorrect: true, isAnswered: true };
    }
    if (userVal === rawCorrect) {
      return { isCorrect: true, isAnswered: true };
    }
  }

  // User menjawab dengan huruf 'A', 'B', 'C', 'D'
  if (/^[A-E]$/i.test(strUser)) {
    const charIdx = strUser.toUpperCase().charCodeAt(0) - 65;
    if (
      options[charIdx] !== undefined &&
      String(options[charIdx]).trim().toLowerCase() === strCorrect
    ) {
      return { isCorrect: true, isAnswered: true };
    }
  }

  return { isCorrect: false, isAnswered: true };
};

// Ambil teks Kunci Jawaban dengan awalan huruf abjad (misal "A. 12")
const getDisplayKeyAnswer = (q) => {
  const qType = q.type || q.tipe || 'mcq';
  const options = q.options || q.pilihan || [];
  const correctAns = q.answer !== undefined ? q.answer : q.jawabanBenar;

  if (correctAns === undefined || correctAns === null) return '-';

  if (qType === 'category') {
    return 'Lihat rincian pernyataan di atas';
  }

  if (qType === 'mcma') {
    if (Array.isArray(correctAns)) {
      return correctAns
        .map((ans) => {
          const optIdx = findOptionIndex(options, ans);
          return optIdx !== -1 ? `${getOptionLetter(optIdx)}. ${ans}` : ans;
        })
        .join('; ');
    }
    return String(correctAns);
  }

  if (qType === 'isian') {
    return String(correctAns);
  }

  // Pilihan Ganda Tunggal (MCQ)
  const optIdx = findOptionIndex(options, correctAns);
  if (optIdx !== -1) {
    return `${getOptionLetter(optIdx)}. ${options[optIdx]}`;
  }
  return String(correctAns);
};

// Ambil teks Jawaban Siswa dengan awalan huruf abjad (misal "A. 12")
const getDisplayUserAnswer = (q, userVal) => {
  if (userVal === undefined || userVal === null || userVal === '') {
    return '(Tidak dijawab)';
  }

  const qType = q.type || q.tipe || 'mcq';
  const options = q.options || q.pilihan || [];

  if (qType === 'category') {
    return '';
  }

  if (qType === 'mcma') {
    if (Array.isArray(userVal) && userVal.length > 0) {
      return userVal
        .map((ans) => {
          const optIdx = findOptionIndex(options, ans);
          return optIdx !== -1 ? `${getOptionLetter(optIdx)}. ${ans}` : ans;
        })
        .join('; ');
    }
    return '(Tidak dijawab)';
  }

  if (qType === 'isian') {
    return String(userVal);
  }

  // Pilihan Ganda Tunggal (MCQ)
  const optIdx = findOptionIndex(options, userVal);
  if (optIdx !== -1) {
    return `${getOptionLetter(optIdx)}. ${options[optIdx]}`;
  }
  return String(userVal);
};

const Tryout = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null); // 'bahasa_indonesia' | 'matematika'
  const [activePackage, setActivePackage] = useState(null); // Object paket tryout
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: optionIndex (PG) | text (Isian) }
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(3600); // 60 menit = 3600 detik
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [completedTryouts, setCompletedTryouts] = useState({});

  // Muat status paket tryout yang sudah pernah dikerjakan secara persisten
  const loadCompletedTryouts = () => {
    try {
      const raw = localStorage.getItem('tka_sd_completed_tryouts');
      const map = raw ? JSON.parse(raw) : {};

      // Sinkronkan juga dari activityTracker jika ada data yang belum tercatat di map
      const act = getActivityData();
      if (Array.isArray(act?.tryoutHistory)) {
        act.tryoutHistory.forEach((h) => {
          if (!h.id?.startsWith('to_sample')) {
            const key = `${h.subject}_${h.packageNum}`;
            if (!map[key]) {
              map[key] = {
                score: h.score,
                correctCount: h.correct,
                totalCount: h.total || 30,
                userAnswers: h.userAnswers || {},
              };
            }
          }
        });
      }
      setCompletedTryouts(map);
    } catch (e) {
      console.error('Gagal membaca data selesai tryout:', e);
    }
  };

  useEffect(() => {
    loadCompletedTryouts();
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    let timer = null;
    if (isExamRunning && timeLeftSeconds > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isExamRunning, timeLeftSeconds, isFinished]);

  // Format detik ke format mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Mulai Tryout
  const handleStartExam = (pkg) => {
    setActivePackage(pkg);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeftSeconds(pkg.durasiMenit * 60);
    setIsExamRunning(true);
    setIsFinished(false);
    setIsReviewMode(false);
    setScoreResult(null);
  };

  // Buka langsung Mode Review & Pembahasan untuk paket yang sudah pernah dikerjakan
  const handleOpenReview = (pkg, completedInfo) => {
    setActivePackage(pkg);
    setCurrentQuestionIndex(0);
    setUserAnswers(completedInfo?.userAnswers || {});
    setScoreResult({
      score: completedInfo?.score || 0,
      correctCount: completedInfo?.correctCount || 0,
      totalCount: pkg.soal.length,
      wrongCount: pkg.soal.length - (completedInfo?.correctCount || 0),
      timeSpentSeconds: 0,
    });
    setIsExamRunning(false);
    setIsFinished(true);
    setIsReviewMode(true);
  };

  // Pilih/Ketik Jawaban
  const handleAnswerChange = (val) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: val,
    }));
  };

  // Kumpulkan & Hitung Nilai
  const handleFinishExam = () => {
    setIsExamRunning(false);
    const questions = activePackage.soal;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      const userVal = userAnswers[idx];
      const { isCorrect } = evaluateQuestionResult(q, userVal);
      if (isCorrect) correctCount++;
    });

    const score = Number(((correctCount / (questions.length || 1)) * 100).toFixed(1));
    const result = {
      score,
      correctCount,
      totalCount: questions.length,
      wrongCount: questions.length - correctCount,
      timeSpentSeconds: activePackage.durasiMenit * 60 - timeLeftSeconds,
    };

    setScoreResult(result);
    setIsFinished(true);

    // Rekam ke tracker aktivitas
    recordTryout({
      subject: selectedSubject,
      packageNum: activePackage.nomorPaket,
      score,
      correct: correctCount,
      total: questions.length,
      userAnswers,
    });

    // Simpan ke status paket selesai
    const completionKey = `${selectedSubject}_${activePackage.nomorPaket}`;
    const newCompletion = {
      score,
      correctCount,
      totalCount: questions.length,
      userAnswers,
      updatedAt: Date.now(),
    };
    try {
      const raw = localStorage.getItem('tka_sd_completed_tryouts');
      const existing = raw ? JSON.parse(raw) : {};
      existing[completionKey] = newCompletion;
      localStorage.setItem('tka_sd_completed_tryouts', JSON.stringify(existing));
      setCompletedTryouts(existing);
    } catch (e) {
      console.error('Gagal menyimpan riwayat pengerjaan:', e);
    }
  };

  const handleBackToDashboard = () => {
    if (isExamRunning && !isFinished) {
      if (window.confirm('Simulasi Tryout sedang berjalan. Jika Anda keluar sekarang, progres saat ini akan hilang. Yakin ingin kembali ke Dashboard?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-doodle-pattern text-slate-800 selection:bg-amber-200 selection:text-amber-900">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Konten Utama Halaman Tryout */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 flex flex-col animate-fade-in">
        {/* Breadcrumb & Tombol Kembali ke Dashboard */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <button
              onClick={handleBackToDashboard}
              className="hover:text-amber-700 font-semibold flex items-center space-x-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span className="font-bold text-[#0a1e4a]">Simulasi Tryout</span>
            {selectedSubject && (
              <>
                <span>/</span>
                <span className="text-amber-700 font-medium">
                  {PUSMENDIK_TRYOUT[selectedSubject].nama}
                </span>
              </>
            )}
            {activePackage && (
              <>
                <span>/</span>
                <span className="text-slate-800 font-bold">
                  {activePackage.namaPaket}
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleBackToDashboard}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-700 hover:text-amber-700 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Dashboard</span>
            <span className="sm:hidden">Kembali</span>
          </button>
        </div>

        {/* Kartu Utama Tryout */}
        <div className="bg-white border border-slate-200/90 rounded-3xl w-full flex-1 flex flex-col shadow-xl text-slate-800 overflow-hidden relative">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-amber-400/10 blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center space-x-3">
              {activePackage && !isExamRunning ? (
                <button
                  onClick={() => {
                    setActivePackage(null);
                    setIsFinished(false);
                    setIsReviewMode(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                  title="Pilih Paket Lain"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : selectedSubject && !isExamRunning ? (
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                  title="Pilih Mapel Lain"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : null}

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span>🏆 Simulasi Tryout TKA SD</span>
                </h2>
                <p className="text-xs text-slate-500">
                  {activePackage
                    ? `${PUSMENDIK_TRYOUT[selectedSubject].nama} - ${activePackage.namaPaket}`
                    : selectedSubject
                    ? `Pilih Paket Tryout (${PUSMENDIK_TRYOUT[selectedSubject].nama})`
                    : 'Pilih Mata Pelajaran (Bahasa Indonesia / Matematika)'}
                </p>
              </div>
            </div>

            {/* Timer Display saat ujian berlangsung */}
            {isExamRunning && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-mono font-bold shadow-sm">
                <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 sm:p-6 bg-white">
            {/* TAHAP 1: Pilih Mata Pelajaran (BI / MTK) */}
            {!selectedSubject && (
              <div className="max-w-2xl mx-auto py-6 sm:py-10">
                <div className="text-center mb-8">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                    Simulasi Ujian Nasional TKA SD
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-3">
                    Pilih Mata Pelajaran Tryout
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Masing-masing mapel memiliki 5 Paket Tryout lengkap berstandar Pusmendik.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div
                    onClick={() => setSelectedSubject('bahasa_indonesia')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 border-2 border-blue-200 hover:border-blue-500 transition-all cursor-pointer group hover:scale-[1.02] shadow-md hover:shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      Tryout Bahasa Indonesia
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      5 Paket Tryout Nasional: 30 Soal (PG & Isian), durasi 60 menit, variasi HOTS & Sedang.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                      <span>Pilih Paket 1 s.d. 5</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedSubject('matematika')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer group hover:scale-[1.02] shadow-md hover:shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      Tryout Matematika
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      5 Paket Tryout Nasional: 30 Soal (PG & Isian), durasi 60 menit, penerapan problem solving nyata.
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-600 font-semibold">
                      <span>Pilih Paket 1 s.d. 5</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAHAP 2: Pilih dari 5 Paket Tryout */}
            {selectedSubject && !activePackage && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Pilihan Paket Tryout {PUSMENDIK_TRYOUT[selectedSubject].nama}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standar TKA SD Nasional: 30 Soal (PG + Isian), 60 Menit.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                  >
                    Ganti Mapel
                  </button>
                </div>

                {/* Grid 5 Paket Tryout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {PUSMENDIK_TRYOUT[selectedSubject].paket.map((pkg) => {
                    const completionKey = `${selectedSubject}_${pkg.nomorPaket}`;
                    const completedInfo = completedTryouts[completionKey];
                    const isCompleted = !!completedInfo;

                    return (
                      <div
                        key={pkg.id || pkg.nomorPaket}
                        className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md ${
                          isCompleted
                            ? 'bg-blue-50/20 hover:bg-blue-50/40 border-blue-200 hover:border-blue-400'
                            : 'bg-white hover:bg-amber-50/20 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                                isCompleted
                                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                                  : 'bg-amber-100 text-amber-800 border-amber-300'
                              }`}
                            >
                              {pkg.namaPaket}
                            </span>
                            {isCompleted ? (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Skor: {completedInfo.score}</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>60 Menit</span>
                              </span>
                            )}
                          </div>

                          <h4
                            className={`text-sm font-bold transition-colors ${
                              isCompleted
                                ? 'text-slate-900 group-hover:text-blue-700'
                                : 'text-slate-900 group-hover:text-amber-700'
                            }`}
                          >
                            Simulasi TKA SD
                          </h4>
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {pkg.totalSoal || pkg.soal.length} Soal campuran tingkat HOTS, Sedang, Mudah (Pilihan Ganda & Isian).
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                          {isCompleted ? (
                            <>
                              <button
                                onClick={() => handleOpenReview(pkg, completedInfo)}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat Review dan Pembahasan</span>
                              </button>
                              <button
                                onClick={() => handleStartExam(pkg)}
                                className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-semibold text-[11px] transition-all flex items-center justify-center space-x-1 cursor-pointer"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Ulangi Tryout</span>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleStartExam(pkg)}
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-1.5 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Mulai Tryout Sekarang</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAHAP 3: Ruang Ujian Tryout (Timer 60 Menit, PG + Isian Singkat) */}
            {activePackage && isExamRunning && !isFinished && (
              <div className="space-y-4">
                {/* Navigator Kotak Nomor Soal (1 - 30) - 1 Baris Scroll Samping */}
                {(() => {
                  const checkAnswered = (q, ans) => {
                    if (ans === undefined || ans === null || ans === '') return false;
                    if (q.type === 'mcma') {
                      return Array.isArray(ans) && ans.length > 0;
                    }
                    if (q.type === 'category') {
                      return (
                        typeof ans === 'object' &&
                        Object.keys(ans).length > 0
                      );
                    }
                    return true;
                  };

                  const answeredCount = activePackage.soal.filter((q, idx) =>
                    checkAnswered(q, userAnswers[idx])
                  ).length;
                  const answeredPercent = Math.round(
                    (answeredCount / activePackage.soal.length) * 100
                  );

                  return (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-semibold">
                          Lembar Navigasi Soal ({activePackage.soal.length} Soal):
                        </span>
                        <span className="text-amber-700 font-bold">
                          Terjawab: <strong>{answeredCount}</strong> / {activePackage.soal.length}{' '}
                          <span className="text-slate-400 font-medium">({answeredPercent}%)</span>
                        </span>
                      </div>

                      {/* Baris Tunggal Navigasi dengan Horizontal Scroll */}
                      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
                        {activePackage.soal.map((q, idx) => {
                          const isAnswered = checkAnswered(q, userAnswers[idx]);
                          const isCurrent = currentQuestionIndex === idx;

                          return (
                            <button
                              key={idx}
                              onClick={() => setCurrentQuestionIndex(idx)}
                              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center justify-center relative ${
                                isCurrent
                                  ? 'ring-2 ring-amber-500 bg-amber-500 text-white font-extrabold shadow-sm scale-105'
                                  : isAnswered
                                  ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                              }`}
                              title={`Soal ${idx + 1} (${isAnswered ? 'Sudah Terjawab' : 'Belum Dijawab'})`}
                            >
                              <span>{idx + 1}</span>
                              {isAnswered && !isCurrent && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-white" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Kartu Soal Sedang Dibuka */}
                {(() => {
                  const currentQ = activePackage.soal[currentQuestionIndex];
                  const currentAnswer = userAnswers[currentQuestionIndex];
                  const qType = currentQ.type || currentQ.tipe || 'mcq';
                  const options = currentQ.options || currentQ.pilihan || [];

                  return (
                    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
                      {/* Header Soal: Nomor, Tipe, & Tingkat Kesulitan */}
                      <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 flex-wrap gap-2">
                        <span className="font-bold text-slate-900">
                          Nomor {currentQuestionIndex + 1} dari {activePackage.soal.length}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                              currentQ.kesulitan === 'HOTS'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : currentQ.kesulitan === 'Sedang'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            Level: {currentQ.level || 3} ({currentQ.kesulitan})
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                            {qType === 'mcma'
                              ? 'PG Kompleks'
                              : qType === 'category'
                              ? 'Benar / Salah'
                              : qType === 'isian'
                              ? 'Isian Singkat'
                              : 'Pilihan Ganda'}
                          </span>
                        </div>
                      </div>

                      {/* Stimulus Bacaan / Konteks (jika ada) */}
                      {currentQ.stimulus && (
                        <div className="p-4 rounded-xl bg-amber-50/50 border-l-4 border-amber-500 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-1.5 shadow-2xs">
                          <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Konteks Bacaan / Stimulus:</span>
                          </div>
                          <div
                            className="text-slate-700 leading-relaxed font-normal"
                            dangerouslySetInnerHTML={{ __html: formatMath(currentQ.stimulus) }}
                          />
                        </div>
                      )}

                      {/* Teks Pertanyaan */}
                      <div
                        className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMath(currentQ.question || currentQ.pertanyaan) }}
                      />

                      {/* OPSI JAWABAN */}
                      {/* 1. MCQ (Pilihan Ganda Tunggal) */}
                      {qType === 'mcq' && (
                        <div className="space-y-2.5 pt-2">
                          {options.map((opt, oIdx) => {
                            const isSelected = currentAnswer === opt || currentAnswer === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswerChange(opt)}
                                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-amber-50 border-2 border-amber-500 text-slate-900 shadow-sm font-semibold'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span dangerouslySetInnerHTML={{ __html: formatMath(opt) }} />
                                <div
                                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ml-2 ${
                                    isSelected
                                      ? 'border-amber-500 bg-amber-500 text-white'
                                      : 'border-slate-300 text-slate-500 bg-white'
                                  }`}
                                >
                                  {String.fromCharCode(65 + oIdx)}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 2. MCMA (Pilihan Ganda Kompleks - Multi select) */}
                      {qType === 'mcma' && (
                        <div className="space-y-2.5 pt-2">
                          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span>Pilihan Ganda Kompleks: Anda dapat memilih lebih dari satu jawaban yang benar.</span>
                          </div>
                          {options.map((opt, oIdx) => {
                            const selectedList = Array.isArray(currentAnswer) ? currentAnswer : [];
                            const isSelected = selectedList.includes(opt);
                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  const nextList = isSelected
                                    ? selectedList.filter((x) => x !== opt)
                                    : [...selectedList, opt];
                                  handleAnswerChange(nextList);
                                }}
                                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-blue-50 border-2 border-blue-500 text-blue-900 shadow-sm font-semibold'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span dangerouslySetInnerHTML={{ __html: formatMath(opt) }} />
                                <div
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold flex-shrink-0 ml-2 ${
                                    isSelected
                                      ? 'border-blue-500 bg-blue-600 text-white'
                                      : 'border-slate-300 text-slate-400 bg-white'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 3. CATEGORY (Benar / Salah per baris pernyataan) */}
                      {qType === 'category' && (
                        <div className="space-y-3 pt-2">
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium flex items-center space-x-2">
                            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>Tentukan apakah setiap pernyataan berikut bernilai <strong>Benar</strong> atau <strong>Salah</strong>.</span>
                          </div>
                          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                            {currentQ.statements?.map((stmt, sIdx) => {
                              const stmtVal =
                                typeof currentAnswer === 'object' && currentAnswer !== null
                                  ? currentAnswer[sIdx]
                                  : undefined;
                              return (
                                <div
                                  key={sIdx}
                                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80"
                                >
                                  <span
                                    className="text-xs sm:text-sm text-slate-800 flex-1 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: formatMath(stmt.text) }}
                                  />
                                  <div className="flex items-center space-x-2 flex-shrink-0">
                                    <button
                                      onClick={() => {
                                        const obj =
                                          typeof currentAnswer === 'object' && currentAnswer !== null
                                            ? currentAnswer
                                            : {};
                                        handleAnswerChange({ ...obj, [sIdx]: true });
                                      }}
                                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        stmtVal === true
                                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                                      }`}
                                    >
                                      Benar
                                    </button>
                                    <button
                                      onClick={() => {
                                        const obj =
                                          typeof currentAnswer === 'object' && currentAnswer !== null
                                            ? currentAnswer
                                            : {};
                                        handleAnswerChange({ ...obj, [sIdx]: false });
                                      }}
                                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        stmtVal === false
                                          ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400'
                                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                                      }`}
                                    >
                                      Salah
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 4. ISIAN SINGKAT (Fallback) */}
                      {qType === 'isian' && (
                        <div className="space-y-2 pt-2">
                          <label className="block text-xs font-medium text-slate-700">
                            Ketik jawaban singkat Anda di bawah ini:
                          </label>
                          <input
                            type="text"
                            value={currentAnswer || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder="Ketik jawabanmu di sini..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-sm focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                          />
                        </div>
                      )}

                      {/* Navigasi Bawah */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          disabled={currentQuestionIndex === 0}
                          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                            currentQuestionIndex === 0
                              ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                              : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                          }`}
                        >
                          &larr; Sebelumnya
                        </button>

                        <div className="flex items-center space-x-2">
                          {currentQuestionIndex < activePackage.soal.length - 1 ? (
                            <button
                              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            >
                              Selanjutnya &rarr;
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Apakah Anda yakin ingin mengumpulkan lembar jawaban Tryout sekarang?'
                                  )
                                ) {
                                  handleFinishExam();
                                }
                              }}
                              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              Kumpulkan Ujian
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAHAP 4: Hasil Skor Tryout di Akhir */}
            {activePackage && isFinished && !isReviewMode && (
              <div className="max-w-md mx-auto py-6 text-center space-y-5 animate-fade-in">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-black text-3xl">
                  <Trophy className="w-10 h-10 text-white" />
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Hasil Tryout Nasional
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Skor {activePackage.namaPaket}
                  </h3>
                </div>

                {/* Skor Card */}
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-4">
                  <div className="text-4xl font-extrabold text-slate-900">
                    {scoreResult?.score}
                    <span className="text-sm text-slate-500 font-normal"> / 100</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <span className="block font-bold text-base text-emerald-700">
                        {scoreResult?.correctCount} / {scoreResult?.totalCount}
                      </span>
                      <span>Soal Terjawab Benar</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800">
                      <span className="block font-bold text-base text-blue-700">
                        {Math.round((scoreResult?.timeSpentSeconds || 0) / 60)} Menit
                      </span>
                      <span>Waktu Pengerjaan</span>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsReviewMode(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Review & Pembahasan</span>
                  </button>

                  <button
                    onClick={() => handleStartExam(activePackage)}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Tryout</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAHAP 5: Review Lengkap 30 Soal dengan Pembahasan */}
            {activePackage && isFinished && isReviewMode && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Pembahasan 30 Soal {activePackage.namaPaket}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Simak solusi langkah demi langkah untuk setiap nomor soal berikut.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsReviewMode(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                  >
                    Kembali ke Skor
                  </button>
                </div>

                <div className="space-y-5">
                  {activePackage.soal.map((q, idx) => {
                    const userVal = userAnswers[idx];
                    const qType = q.type || q.tipe || 'mcq';
                    const { isCorrect } = evaluateQuestionResult(q, userVal);
                    const options = q.options || q.pilihan || [];

                    return (
                      <div
                        key={q.id || idx}
                        className={`p-5 rounded-2xl border-2 ${
                          isCorrect
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-white">
                              Soal #{idx + 1}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                              {q.kesulitan} • {qType === 'mcma' ? 'PG Kompleks' : qType === 'category' ? 'Benar / Salah' : qType === 'isian' ? 'Isian' : 'PG'}
                            </span>
                          </div>

                          {isCorrect ? (
                            <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Benar</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-600">
                              <XCircle className="w-4 h-4" />
                              <span>Salah</span>
                            </span>
                          )}
                        </div>

                        {/* Stimulus jika ada */}
                        {q.stimulus && (
                          <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 mb-3 leading-relaxed shadow-2xs">
                            <strong className="text-amber-800 block text-[11px] mb-1 font-bold">Konteks Bacaan / Stimulus:</strong>
                            <div dangerouslySetInnerHTML={{ __html: formatMath(q.stimulus) }} />
                          </div>
                        )}

                        <h4
                          className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatMath(q.question || q.pertanyaan) }}
                        />

                        {/* List Opsi Jawaban Lengkap dengan badge A, B, C, D (untuk MCQ & MCMA) */}
                        {(qType === 'mcq' || qType === 'mcma') && options.length > 0 && (
                          <div className="space-y-2 mb-3 pt-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                              Pilihan Jawaban:
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {options.map((opt, oIdx) => {
                                const letter = getOptionLetter(oIdx);
                                const isKey =
                                  qType === 'mcq'
                                    ? oIdx === findOptionIndex(options, q.answer !== undefined ? q.answer : q.jawabanBenar)
                                    : Array.isArray(q.answer) &&
                                      q.answer.some((a) => String(a).trim().toLowerCase() === String(opt).trim().toLowerCase());

                                const isUserChoice =
                                  qType === 'mcq'
                                    ? oIdx === findOptionIndex(options, userVal)
                                    : Array.isArray(userVal) &&
                                      userVal.some((u) => String(u).trim().toLowerCase() === String(opt).trim().toLowerCase());

                                let containerClass = 'bg-white border-slate-200 text-slate-700';
                                let badgeClass = 'bg-slate-100 text-slate-600 border-slate-300';
                                let statusTag = null;

                                if (isKey && isUserChoice) {
                                  containerClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium shadow-2xs';
                                  badgeClass = 'bg-emerald-600 text-white border-emerald-600';
                                  statusTag = (
                                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                                      <Check className="w-3 h-3 stroke-[3]" />
                                      <span>Pilihan Anda (Benar)</span>
                                    </span>
                                  );
                                } else if (isKey && !isUserChoice) {
                                  containerClass = 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium';
                                  badgeClass = 'bg-emerald-500 text-white border-emerald-500';
                                  statusTag = (
                                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-md">
                                      <Check className="w-3 h-3 stroke-[3]" />
                                      <span>Kunci Jawaban</span>
                                    </span>
                                  );
                                } else if (!isKey && isUserChoice) {
                                  containerClass = 'bg-rose-50 border-rose-300 text-rose-950';
                                  badgeClass = 'bg-rose-600 text-white border-rose-600';
                                  statusTag = (
                                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-rose-700 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded-md">
                                      <X className="w-3 h-3 stroke-[3]" />
                                      <span>Pilihan Anda (Salah)</span>
                                    </span>
                                  );
                                }

                                return (
                                  <div
                                    key={oIdx}
                                    className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm transition-all ${containerClass}`}
                                  >
                                    <div className="flex items-center space-x-2.5 flex-1 pr-2">
                                      <span
                                        className={`w-6 h-6 rounded-lg border font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs ${badgeClass}`}
                                      >
                                        {letter}
                                      </span>
                                      <span dangerouslySetInnerHTML={{ __html: formatMath(opt) }} />
                                    </div>
                                    {statusTag && <div className="flex-shrink-0 ml-2">{statusTag}</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Info Jawaban Siswa & Kunci */}
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-2 mb-3 shadow-2xs">
                          {qType === 'category' ? (
                            <div className="space-y-1.5">
                              <span className="text-slate-500 font-bold block uppercase tracking-wider text-[11px]">
                                Rincian Pernyataan (Benar / Salah):
                              </span>
                              {q.statements?.map((stmt, sIdx) => {
                                const uPick =
                                  typeof userVal === 'object' && userVal !== null
                                    ? userVal[sIdx]
                                    : undefined;
                                const isStmtCorrect = uPick === stmt.answer;
                                return (
                                  <div
                                    key={sIdx}
                                    className="flex items-center justify-between text-[11px] py-1.5 border-b border-slate-100 last:border-0 flex-wrap gap-2"
                                  >
                                    <span
                                      className="flex-1 pr-2 leading-relaxed text-slate-800"
                                      dangerouslySetInnerHTML={{ __html: formatMath(stmt.text) }}
                                    />
                                    <span className="font-semibold flex-shrink-0">
                                      Anda:{' '}
                                      <strong className={isStmtCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                                        {uPick === true
                                          ? 'Benar'
                                          : uPick === false
                                          ? 'Salah'
                                          : '(Belum dijawab)'}
                                      </strong>{' '}
                                      | Kunci:{' '}
                                      <strong className="text-emerald-700">
                                        {stmt.answer ? 'Benar' : 'Salah'}
                                      </strong>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <div className="flex items-center space-x-1.5 flex-wrap">
                                <span className="text-slate-500 font-medium">Jawaban Anda:</span>
                                <strong
                                  className={`inline-flex items-center space-x-1 ${
                                    isCorrect ? 'text-emerald-700' : 'text-rose-700'
                                  }`}
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: formatMath(getDisplayUserAnswer(q, userVal)),
                                    }}
                                  />
                                </strong>
                              </div>
                              <div className="flex items-center space-x-1.5 flex-wrap">
                                <span className="text-slate-500 font-medium">Kunci Jawaban:</span>
                                <strong className="text-emerald-700 inline-flex items-center space-x-1">
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: formatMath(getDisplayKeyAnswer(q)),
                                    }}
                                  />
                                </strong>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Indikator Pusmendik */}
                        {q.indicator && (
                          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 mb-2">
                            <strong>Indikator Capaian: </strong>
                            <span>{q.indicator}</span>
                          </div>
                        )}

                        {/* Pembahasan */}
                        {(q.explanation || q.pembahasan) && (
                          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs shadow-2xs">
                            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-amber-200/60 flex-wrap gap-2">
                              <strong className="text-amber-900 flex items-center space-x-1.5 font-bold">
                                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                                <span>Pembahasan Langkah-demi-Langkah:</span>
                              </strong>
                              {(qType === 'mcq' || qType === 'mcma') && (
                                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center space-x-1">
                                  <span>Kunci:</span>
                                  <span
                                    className="ml-1"
                                    dangerouslySetInnerHTML={{
                                      __html: formatMath(getDisplayKeyAnswer(q)),
                                    }}
                                  />
                                </span>
                              )}
                            </div>
                            <div
                              className="text-slate-700 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: formatMath(q.explanation || q.pembahasan) }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tryout;
