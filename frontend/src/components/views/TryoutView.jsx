import React, { useState, useEffect } from 'react';
import { PUSMENDIK_TRYOUT } from '../../data/tryoutData';
import { recordTryout } from '../../utils/activityTracker';
import {
  BookOpen,
  Calculator,
  ArrowLeft,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Trophy,
  RotateCcw,
  Eye,
  AlertTriangle,
  X,
} from 'lucide-react';

/**
 * Komponen Simulasi Tryout Akbar TKA SD Nasional
 * 
 * Ketentuan:
 * - Mapel: Bahasa Indonesia & Matematika
 * - Total 5 Tryout (Paket 1 - 5)
 * - Standar TKA SD Nasional (30 Soal, 60 Menit)
 * - Tipe kesulitan HOTS, Mudah, Sedang diacak posisinya
 * - Format: Sebagian besar Pilihan Ganda (PG) dan beberapa soal Isian Singkat
 * - Timer hitung mundur, lembar navigasi nomor, skor & pembahasan
 */
const TryoutView = ({ isOpen, onClose }) => {
  const [selectedSubject, setSelectedSubject] = useState(null); // 'bahasa_indonesia' | 'matematika'
  const [activePackage, setActivePackage] = useState(null); // Object paket tryout
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: optionIndex (PG) | text (Isian) }
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(3600); // 60 menit = 3600 detik
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

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

  if (!isOpen) return null;

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
      if (q.tipe === 'isian') {
        // Normalisasi isian (case insensitive & trim)
        if (
          userVal &&
          String(userVal).trim().toLowerCase() === String(q.jawabanBenar).trim().toLowerCase()
        ) {
          correctCount++;
        }
      } else {
        if (userVal === q.jawabanBenar) {
          correctCount++;
        }
      }
    });

    const score = Number(((correctCount / questions.length) * 100).toFixed(1));
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
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full min-h-[560px] max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden relative">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            {activePackage && !isExamRunning ? (
              <button
                onClick={() => {
                  setActivePackage(null);
                  setIsFinished(false);
                  setIsReviewMode(false);
                }}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Pilih Paket Lain"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : selectedSubject && !isExamRunning ? (
              <button
                onClick={() => setSelectedSubject(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Pilih Mapel Lain"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : null}

            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>🏆 Simulasi Tryout Akbar TKA SD</span>
              </h2>
              <p className="text-xs text-slate-400">
                {activePackage
                  ? `${PUSMENDIK_TRYOUT[selectedSubject].nama} - ${activePackage.namaPaket}`
                  : selectedSubject
                  ? `Pilih Paket Tryout (${PUSMENDIK_TRYOUT[selectedSubject].nama})`
                  : 'Pilih Mata Pelajaran (Bahasa Indonesia / Matematika)'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Timer Display saat ujian berlangsung */}
            {isExamRunning && (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}

            {!isExamRunning && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Body Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* TAHAP 1: Pilih Mata Pelajaran (BI / MTK) */}
          {!selectedSubject && (
            <div className="max-w-2xl mx-auto py-6">
              <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Simulasi Ujian Nasional TKA SD
                </span>
                <h3 className="text-2xl font-bold text-white mt-3">
                  Pilih Mata Pelajaran Tryout
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Masing-masing mapel memiliki 5 Paket Tryout lengkap berstandar Pusmendik.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div
                  onClick={() => setSelectedSubject('bahasa_indonesia')}
                  className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 via-slate-800/60 to-slate-900 border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    Tryout Bahasa Indonesia
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    5 Paket Tryout Nasional: 30 Soal (PG & Isian), durasi 60 menit, variasi HOTS & Sedang.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-blue-400 font-semibold">
                    <span>Pilih Paket 1 s.d. 5</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setSelectedSubject('matematika')}
                  className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 via-slate-800/60 to-slate-900 border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    Tryout Matematika
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    5 Paket Tryout Nasional: 30 Soal (PG & Isian), durasi 60 menit, penerapan problem solving nyata.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-amber-400 font-semibold">
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
              <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Pilihan 5 Paket Tryout {PUSMENDIK_TRYOUT[selectedSubject].nama}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Standar TKA SD Nasional: 30 Soal (PG + Isian), 60 Menit.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Ganti Mapel
                </button>
              </div>

              {/* Grid 5 Paket Tryout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PUSMENDIK_TRYOUT[selectedSubject].paket.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          {pkg.namaPaket}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>60 Menit</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        Simulasi TKA SD Akbar
                      </h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {pkg.totalSoal} Soal campuran tingkat HOTS, Sedang, Mudah (Pilihan Ganda & Isian).
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-700/60">
                      <button
                        onClick={() => handleStartExam(pkg)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mulai Tryout Sekarang</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAHAP 3: Ruang Ujian Tryout (Timer 60 Menit, PG + Isian Singkat) */}
          {activePackage && isExamRunning && !isFinished && (
            <div className="space-y-4">
              {/* Navigator Kotak Nomor Soal (1 - 30) */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="text-slate-400 font-medium">Lembar Navigasi Soal (30 Soal):</span>
                  <span className="text-amber-400 font-bold">
                    Terjawab: {Object.keys(userAnswers).length} / {activePackage.soal.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {activePackage.soal.map((_, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined && userAnswers[idx] !== '';
                    const isCurrent = currentQuestionIndex === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                          isCurrent
                            ? 'ring-2 ring-amber-400 bg-amber-500 text-slate-950 font-extrabold shadow'
                            : isAnswered
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Kartu Soal Sedang Dibuka */}
              {(() => {
                const currentQ = activePackage.soal[currentQuestionIndex];
                const currentAnswer = userAnswers[currentQuestionIndex];

                return (
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-xl space-y-4">
                    {/* Header Soal: Nomor, Tipe, & Tingkat Kesulitan Acak */}
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-700">
                      <span className="font-bold text-white">
                        Nomor {currentQuestionIndex + 1} dari {activePackage.soal.length}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                            currentQ.kesulitan === 'HOTS'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : currentQ.kesulitan === 'Sedang'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          Tingkat: {currentQ.kesulitan}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 text-[10px] font-semibold border border-slate-700">
                          {currentQ.tipe === 'isian' ? 'Isian Singkat' : 'Pilihan Ganda'}
                        </span>
                      </div>
                    </div>

                    {/* Teks Pertanyaan */}
                    <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed whitespace-pre-line">
                      {currentQ.pertanyaan}
                    </h4>

                    {/* Input Jawaban Sesuai Format: PG atau Isian Singkat */}
                    {currentQ.tipe === 'isian' ? (
                      <div className="space-y-2 pt-2">
                        <label className="block text-xs font-medium text-slate-300">
                          Ketik jawaban singkat Anda di bawah ini:
                        </label>
                        <input
                          type="text"
                          value={currentAnswer || ''}
                          onChange={(e) => handleAnswerChange(e.target.value)}
                          placeholder="Ketik jawabanmu di sini..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2.5 pt-2">
                        {currentQ.pilihan.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleAnswerChange(oIdx)}
                            className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                              currentAnswer === oIdx
                                ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                                : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                            }`}
                          >
                            <span>{opt}</span>
                            <div
                              className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                                currentAnswer === oIdx
                                  ? 'border-amber-400 bg-amber-500 text-slate-950'
                                  : 'border-slate-600 text-slate-400'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Navigasi Bawah */}
                    <div className="mt-6 pt-4 border-t border-slate-700/70 flex items-center justify-between">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                          currentQuestionIndex === 0
                            ? 'text-slate-600 cursor-not-allowed'
                            : 'text-slate-300 hover:text-white bg-slate-800'
                        }`}
                      >
                        &larr; Sebelumnya
                      </button>

                      <div className="flex items-center space-x-2">
                        {currentQuestionIndex < activePackage.soal.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                          >
                            Selanjutnya &rarr;
                          </button>
                        ) : null}

                        <button
                          onClick={() => {
                            if (window.confirm('Apakah Anda yakin ingin mengumpulkan lembar jawaban Tryout sekarang?')) {
                              handleFinishExam();
                            }
                          }}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95"
                        >
                          Kumpulkan Ujian 🏁
                        </button>
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
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-black text-3xl">
                <Trophy className="w-10 h-10 text-slate-950" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Hasil Tryout Nasional
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Skor {activePackage.namaPaket}
                </h3>
              </div>

              {/* Skor Card */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-xl space-y-4">
                <div className="text-4xl font-extrabold text-white">
                  {scoreResult?.score}
                  <span className="text-sm text-slate-400 font-normal"> / 100</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <span className="block font-bold text-base">
                      {scoreResult?.correctCount} / {scoreResult?.totalCount}
                    </span>
                    <span>Soal Terjawab Benar</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                    <span className="block font-bold text-base">
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
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Review & Pembahasan 30 Soal</span>
                </button>

                <button
                  onClick={() => handleStartExam(activePackage)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
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
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Pembahasan 30 Soal {activePackage.namaPaket}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Simak solusi langkah demi langkah untuk setiap nomor soal berikut.
                  </p>
                </div>
                <button
                  onClick={() => setIsReviewMode(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Kembali ke Skor
                </button>
              </div>

              <div className="space-y-5">
                {activePackage.soal.map((q, idx) => {
                  const userVal = userAnswers[idx];
                  let isCorrect = false;

                  if (q.tipe === 'isian') {
                    isCorrect =
                      userVal &&
                      String(userVal).trim().toLowerCase() === String(q.jawabanBenar).trim().toLowerCase();
                  } else {
                    isCorrect = userVal === q.jawabanBenar;
                  }

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border ${
                        isCorrect
                          ? 'bg-slate-800/40 border-emerald-500/30'
                          : 'bg-slate-800/40 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                            Soal #{idx + 1}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {q.kesulitan} • {q.tipe === 'isian' ? 'Isian' : 'PG'}
                          </span>
                        </div>

                        {isCorrect ? (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Benar</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-400">
                            <XCircle className="w-4 h-4" />
                            <span>Salah</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-white mb-3 leading-relaxed whitespace-pre-line">
                        {q.pertanyaan}
                      </h4>

                      {/* Info Jawaban Siswa & Kunci */}
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-1 mb-3">
                        <div>
                          <span className="text-slate-400">Jawaban Anda: </span>
                          <strong className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                            {q.tipe === 'isian'
                              ? userVal || '(Tidak dijawab)'
                              : userVal !== undefined
                              ? `${String.fromCharCode(65 + userVal)}. ${q.pilihan[userVal]}`
                              : '(Tidak dijawab)'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400">Kunci Jawaban: </span>
                          <strong className="text-emerald-400">
                            {q.tipe === 'isian'
                              ? q.jawabanBenar
                              : `${String.fromCharCode(65 + q.jawabanBenar)}. ${q.pilihan[q.jawabanBenar]}`}
                          </strong>
                        </div>
                      </div>

                      {/* Pembahasan */}
                      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs">
                        <strong className="text-amber-300 flex items-center space-x-1.5 mb-1 font-bold">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Pembahasan Soal:</span>
                        </strong>
                        <p className="text-slate-300 leading-relaxed">{q.pembahasan}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryoutView;
