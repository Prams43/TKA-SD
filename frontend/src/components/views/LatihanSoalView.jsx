import React, { useState } from 'react';
import { PUSMENDIK_LATIHAN } from '../../data/latihanData';
import { recordLatihan } from '../../utils/activityTracker';
import {
  BookOpen,
  Calculator,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  RotateCcw,
  Eye,
  ChevronRight,
  Sparkles,
  X,
} from 'lucide-react';

/**
 * Komponen Latihan Soal Berjenjang TKA SD
 * 
 * Ketentuan:
 * - Hanya Bahasa Indonesia & Matematika
 * - Level 1 - 3: 5 soal
 * - Level 4 - 7: 10 soal
 * - Level 8 - 10: 20 soal
 * - Tipe: Pilihan Ganda semua sesuai TKA SD
 * - Jawaban benar/salah & nilai diberikan di AKHIR setelah semua soal dijawab
 * - Review Latihan Soal dengan penjelasan/pembahasan untuk seluruh soal (benar & salah)
 */
const LatihanSoalView = ({ isOpen, onClose }) => {
  const [selectedSubject, setSelectedSubject] = useState(null); // 'bahasa_indonesia' | 'matematika' | null
  const [selectedLevel, setSelectedLevel] = useState(null); // Object level
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: chosenOptionIndex }
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [latestScoreResult, setLatestScoreResult] = useState(null);

  if (!isOpen) return null;

  // Mulai latihan pada level tertentu
  const handleStartLevel = (levelObj) => {
    setSelectedLevel(levelObj);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setIsReviewMode(false);
    setLatestScoreResult(null);
  };

  // Pilih jawaban
  const handleSelectOption = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  // Selesai & hitung nilai di akhir
  const handleFinishQuiz = () => {
    const questions = selectedLevel.soal;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.jawabanBenar) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const result = {
      score,
      correctCount,
      totalCount: questions.length,
      wrongCount: questions.length - correctCount,
    };

    setLatestScoreResult(result);
    setIsFinished(true);

    // Rekam aktivitas ke tracker untuk Rapor
    recordLatihan({
      subject: selectedSubject,
      level: selectedLevel.level,
      score,
      correct: correctCount,
      total: questions.length,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full min-h-[550px] max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden relative">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            {selectedLevel ? (
              <button
                onClick={() => {
                  setSelectedLevel(null);
                  setIsFinished(false);
                  setIsReviewMode(false);
                }}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Pilih Level Lain"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : selectedSubject ? (
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
                <span>📝 Latihan Soal Berjenjang TKA SD</span>
              </h2>
              <p className="text-xs text-slate-400">
                {selectedLevel
                  ? `${PUSMENDIK_LATIHAN[selectedSubject].nama} - ${selectedLevel.namaLevel}`
                  : selectedSubject
                  ? `Pilih Level Soal (${PUSMENDIK_LATIHAN[selectedSubject].nama})`
                  : 'Pilih Mata Pelajaran (Bahasa Indonesia / Matematika)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Body Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* TAHAP 1: Pilih Mata Pelajaran (Hanya BI & MTK) */}
          {!selectedSubject && (
            <div className="max-w-2xl mx-auto py-6">
              <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Sistem Leveling Kompetensi
                </span>
                <h3 className="text-2xl font-bold text-white mt-3">
                  Pilih Mata Pelajaran Latihan
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Kerjakan soal bertahap dari Level 1 sampai Level 10 dengan tipe pilihan ganda standar TKA SD.
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
                    Bahasa Indonesia
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    10 Level latihan pemahaman teks informasi, fiksi, kosakata, dan penalaran inferensial.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-blue-400 font-semibold">
                    <span>Mulai Level 1 - 10</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  onClick={() => setSelectedSubject('matematika')}
                  className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-800/60 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group hover:scale-[1.02] shadow-lg"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Matematika
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    10 Level latihan bilangan, pecahan, geometri bangun, dan statistika pengolahan data.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Mulai Level 1 - 10</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAHAP 2: Pilih Level (Level 1-3 = 5 soal, Level 4-7 = 10 soal, Level 8-10 = 20 soal) */}
          {selectedSubject && !selectedLevel && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Daftar Level: {PUSMENDIK_LATIHAN[selectedSubject].nama}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pilih tingkatan level sesuai kesiapan belajarmu:
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Ganti Mapel
                </button>
              </div>

              {/* Grid 10 Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {PUSMENDIK_LATIHAN[selectedSubject].levels.map((lvl) => (
                  <div
                    key={lvl.level}
                    onClick={() => handleStartLevel(lvl)}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-emerald-400 border border-emerald-500/30">
                          {lvl.namaLevel}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-300">
                          {lvl.targetSoal} Soal
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {lvl.deskripsi}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                      <span>Mulai Kerjakan</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAHAP 3: Mengerjakan Soal Latihan (Jawaban diberikan di AKHIR) */}
          {selectedLevel && !isFinished && (
            <div className="max-w-2xl mx-auto py-2 space-y-4">
              {/* Header Progress & Navigasi */}
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>
                  Soal No. <strong>{currentQuestionIndex + 1}</strong> dari{' '}
                  <strong>{selectedLevel.soal.length}</strong>
                </span>
                <span>
                  Terjawab:{' '}
                  <strong>{Object.keys(userAnswers).length}</strong> / {selectedLevel.soal.length}
                </span>
              </div>

              {/* Soal Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-xl">
                <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed mb-5">
                  {selectedLevel.soal[currentQuestionIndex].pertanyaan}
                </h4>

                {/* Pilihan Jawaban */}
                <div className="space-y-3">
                  {selectedLevel.soal[currentQuestionIndex].pilihan.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                        userAnswers[currentQuestionIndex] === oIdx
                          ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                          userAnswers[currentQuestionIndex] === oIdx
                            ? 'border-emerald-400 bg-emerald-500 text-white'
                            : 'border-slate-600 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                    </button>
                  ))}
                </div>

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

                  {currentQuestionIndex < selectedLevel.soal.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      Selanjutnya &rarr;
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95"
                    >
                      Kumpulkan Latihan ✨
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAHAP 4: Hasil Nilai di Akhir + Tombol Lihat Review */}
          {selectedLevel && isFinished && !isReviewMode && (
            <div className="max-w-md mx-auto py-8 text-center space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 font-black text-3xl">
                <Trophy className="w-10 h-10 text-slate-950" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Latihan Selesai
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Hasil {selectedLevel.namaLevel}
                </h3>
              </div>

              {/* Skor Card */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-xl space-y-4">
                <div className="text-4xl font-extrabold text-white">
                  {latestScoreResult?.score}
                  <span className="text-sm text-slate-400 font-normal"> / 100</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <span className="block font-bold text-base">
                      {latestScoreResult?.correctCount}
                    </span>
                    <span>Jawaban Benar</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    <span className="block font-bold text-base">
                      {latestScoreResult?.wrongCount}
                    </span>
                    <span>Jawaban Salah</span>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi: Lihat Review Penjelasan / Ulangi */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsReviewMode(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Review & Penjelasan Soal</span>
                </button>

                <button
                  onClick={() => handleStartLevel(selectedLevel)}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Coba Lagi</span>
                </button>
              </div>
            </div>
          )}

          {/* TAHAP 5: Review Latihan Soal Lengkap dengan Pembahasan (Benar & Salah) */}
          {selectedLevel && isFinished && isReviewMode && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Review Latihan Soal & Penjelasan
                  </h3>
                  <p className="text-xs text-slate-400">
                    Pelajari pembahasan setiap soal untuk memperkuat pemahaman konsep TKA SD.
                  </p>
                </div>
                <button
                  onClick={() => setIsReviewMode(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Kembali ke Skor
                </button>
              </div>

              {/* Daftar Soal & Penjelasannya */}
              <div className="space-y-5">
                {selectedLevel.soal.map((q, idx) => {
                  const userAnswer = userAnswers[idx];
                  const isCorrect = userAnswer === q.jawabanBenar;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border ${
                        isCorrect
                          ? 'bg-slate-800/40 border-emerald-500/30'
                          : 'bg-slate-800/40 border-rose-500/30'
                      }`}
                    >
                      {/* Nomor & Status Benar/Salah */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                          Soal #{idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Jawabanmu Benar</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-400">
                            <XCircle className="w-4 h-4" />
                            <span>Jawabanmu Salah</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-white mb-3 leading-relaxed">
                        {q.pertanyaan}
                      </h4>

                      {/* Detail Pilihan */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.pilihan.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === q.jawabanBenar;
                          const isOptionSelected = oIdx === userAnswer;

                          let badgeStyle = 'bg-slate-900/60 border-slate-700 text-slate-400';
                          if (isOptionCorrect) {
                            badgeStyle = 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-semibold';
                          } else if (isOptionSelected && !isCorrect) {
                            badgeStyle = 'bg-rose-950/60 border-rose-500/50 text-rose-200 line-through';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${badgeStyle}`}
                            >
                              <span>
                                {String.fromCharCode(65 + oIdx)}. {opt}
                              </span>
                              {isOptionCorrect && (
                                <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">
                                  Kunci
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Kotak Penjelasan / Pembahasan Lengkap */}
                      <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs">
                        <strong className="text-blue-300 flex items-center space-x-1.5 mb-1 font-bold">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                          <span>Penjelasan & Pembahasan:</span>
                        </strong>
                        <p className="text-slate-300 leading-relaxed">{q.penjelasan}</p>
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

export default LatihanSoalView;
