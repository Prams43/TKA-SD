import React, { useState } from 'react';
import { PUSMENDIK_MATERI } from '../../data/pusmendikData';
import { markMateriComplete, getActivityData } from '../../utils/activityTracker';
import MaterialReader from './MaterialReader';
import {
  BookOpen,
  Calculator,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  Trophy,
  BookMarked,
  X,
} from 'lucide-react';

/**
 * Komponen Alur Pembelajaran Materi TKA SD
 * 
 * Alur:
 * 1. Pilih Mapel (Bahasa Indonesia / Matematika)
 * 2. Tampilan Persebaran Materi berdasarkan Kurikulum Pusmendik
 * 3. Membaca Materi Pelajaran dengan MaterialReader yang rapi & visual
 * 4. Sesi 3 Soal Latihan di akhir:
 *    - Jika Benar: Kembali ke tampilan persebaran materi mapel terkait (Bab ditandai Tuntas)
 *    - Jika Salah: Mendapat HINT/petunjuk agar dipermudah, jika sudah benar baru bisa kembali
 *    - Jika Tidak Bisa Menjawab: Tombol "Kembali Membaca Materi" untuk memahami kembali
 */
const MateriView = ({ isOpen, onClose }) => {
  const [selectedSubject, setSelectedSubject] = useState(null); // 'bahasa_indonesia' | 'matematika' | null
  const [activeBab, setActiveBab] = useState(null); // Object bab yang sedang dibuka
  const [inQuizMode, setInQuizMode] = useState(false); // Mode 3 soal latihan di akhir
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // 0, 1, 2
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const activityData = getActivityData();
  const completedBabIds = activityData?.materiCompleted || [];

  // Reset state saat membuka bab
  const handleOpenBab = (bab) => {
    setActiveBab(bab);
    setInQuizMode(false);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setIsAnswerCorrect(false);
    setQuizFinished(false);
  };

  // Submit jawaban kuis validasi 3 soal
  const handleCheckQuizAnswer = () => {
    if (selectedAnswer === null) return;
    const currentQ = activeBab.soalLatihan[currentQuizIndex];
    const correct = selectedAnswer === currentQ.jawabanBenar;

    setHasSubmittedAnswer(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      if (currentQuizIndex < activeBab.soalLatihan.length - 1) {
        // Lanjut ke soal berikutnya setelah jeda singkat
        setTimeout(() => {
          setCurrentQuizIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setHasSubmittedAnswer(false);
          setIsAnswerCorrect(false);
        }, 1100);
      } else {
        // Berhasil menyelesaikan 3 soal dengan benar!
        setQuizFinished(true);
        markMateriComplete(activeBab.id);

        // Otomatis kembali ke persebaran materi setelah selebrasi
        setTimeout(() => {
          setActiveBab(null);
          setInQuizMode(false);
        }, 2200);
      }
    }
  };

  // Siswa bingung / ingin baca ulang materi
  const handleReturnToReading = () => {
    setInQuizMode(false);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setIsAnswerCorrect(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full min-h-[550px] max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            {activeBab ? (
              <button
                onClick={() => setActiveBab(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Kembali ke Persebaran Materi"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : selectedSubject ? (
              <button
                onClick={() => setSelectedSubject(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Pilih Mata Pelajaran Lain"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : null}

            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>📚 Modul Materi Pembelajaran TKA SD</span>
              </h2>
              <p className="text-xs text-slate-400">
                {activeBab
                  ? activeBab.judul
                  : selectedSubject
                  ? `Persebaran Materi ${PUSMENDIK_MATERI[selectedSubject].title}`
                  : 'Pilih Mata Pelajaran Resmi Pusmendik'}
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

        {/* 2. Body Content (Berdasarkan Status Navigasi) */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* TAHAP 1: Pilih Mata Pelajaran (Hanya BI & MTK) */}
          {!selectedSubject && (
            <div className="max-w-2xl mx-auto py-6">
              <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Kerangka Asesmen Pusmendik Kemendikdasmen
                </span>
                <h3 className="text-2xl font-bold text-white mt-3">
                  Pilih Mata Pelajaran Wajib SD
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Sesuai standar TKA SD, materi difokuskan pada keterampilan literasi membaca dan numerasi matematika.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Kartu Bahasa Indonesia */}
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
                    3 Elemen: Pemahaman Tekstual, Inferensial, serta Evaluasi & Apresiasi pada teks informasi dan fiksi.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-blue-400 font-semibold">
                    <span>Lihat Persebaran Bab</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Kartu Matematika */}
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
                    3 Elemen: Bilangan (KABATAKU & Pecahan), Geometri & Pengukuran, serta Pengolahan Data.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Lihat Persebaran Bab</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAHAP 2: Tampilan Persebaran Materi dari Website Pusmendik */}
          {selectedSubject && !activeBab && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    Persebaran Kompetensi Resmi
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Matriks Asesmen {PUSMENDIK_MATERI[selectedSubject].title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {PUSMENDIK_MATERI[selectedSubject].deskripsi}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Ganti Mapel
                </button>
              </div>

              {/* Loop Elemen Kurikulum */}
              <div className="space-y-5">
                {PUSMENDIK_MATERI[selectedSubject].elemen.map((elemen) => (
                  <div
                    key={elemen.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70"
                  >
                    <div className="mb-3">
                      <h4 className="text-sm font-bold text-blue-300">{elemen.namaElemen}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{elemen.deskripsi}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {elemen.bab.map((bab) => {
                        const isDone = completedBabIds.includes(bab.id);
                        return (
                          <div
                            key={bab.id}
                            onClick={() => handleOpenBab(bab)}
                            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 hover:border-blue-400/60 transition-all cursor-pointer flex items-start justify-between group"
                          >
                            <div className="space-y-1 pr-2">
                              <div className="flex items-center space-x-2">
                                <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                                  {bab.judul}
                                </h5>
                                {isDone && (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Tuntas</span>
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-2">
                                {bab.ringkasan}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAHAP 3 & 4: Pemaparan Materi Rapi ATAU 3 Soal Latihan */}
          {activeBab && (
            <div>
              {!inQuizMode ? (
                /* --- Pemaparan Materi Terstruktur & Sangat Rapi --- */
                <MaterialReader
                  bab={activeBab}
                  onStartQuiz={() => setInQuizMode(true)}
                />
              ) : (
                /* --- Sesi 3 Soal Latihan di Akhir Materi --- */
                <div className="max-w-xl mx-auto py-2">
                  {/* Progress 3 Soal */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-400">
                      Latihan Pemahaman: Soal {currentQuizIndex + 1} dari {activeBab.soalLatihan.length}
                    </span>
                    <div className="flex space-x-1.5">
                      {activeBab.soalLatihan.map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-2 rounded-full transition-colors ${
                            i < currentQuizIndex
                              ? 'bg-emerald-500'
                              : i === currentQuizIndex
                              ? 'bg-blue-500'
                              : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Kartu Soal */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-xl relative">
                    {quizFinished ? (
                      <div className="text-center py-8 space-y-3 animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-lg shadow-emerald-500/30">
                          <Trophy className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Hebat Sekali! 🎉</h4>
                        <p className="text-xs text-slate-300 max-w-sm mx-auto">
                          Kamu berhasil menjawab seluruh 3 soal dengan benar. Mengalihkan kembali ke persebaran materi...
                        </p>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed mb-4">
                          {activeBab.soalLatihan[currentQuizIndex].pertanyaan}
                        </h4>

                        {/* Opsi Pilihan Ganda */}
                        <div className="space-y-2.5">
                          {activeBab.soalLatihan[currentQuizIndex].pilihan.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                if (!hasSubmittedAnswer || !isAnswerCorrect) {
                                  setSelectedAnswer(idx);
                                  setHasSubmittedAnswer(false);
                                }
                              }}
                              className={`w-full p-3 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                                selectedAnswer === idx
                                  ? 'bg-blue-600/30 border-blue-400 text-white'
                                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                                  selectedAnswer === idx
                                    ? 'border-blue-400 bg-blue-500 text-white'
                                    : 'border-slate-600'
                                }`}
                              >
                                {String.fromCharCode(65 + idx)}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Feedback Jawaban Salah & HINT / Petunjuk */}
                        {hasSubmittedAnswer && !isAnswerCorrect && (
                          <div className="mt-4 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs animate-fade-in flex items-start space-x-2.5">
                            <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong className="block font-bold">Jawaban belum tepat! Ini petunjuknya:</strong>
                              <span className="text-slate-200 mt-0.5 block leading-relaxed">
                                {activeBab.soalLatihan[currentQuizIndex].hint}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Feedback Jawaban Benar */}
                        {hasSubmittedAnswer && isAnswerCorrect && (
                          <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs animate-fade-in flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Jawaban Benar! Melanjutkan...</span>
                          </div>
                        )}

                        {/* Baris Tombol Aksi */}
                        <div className="mt-6 pt-4 border-t border-slate-700/70 flex items-center justify-between">
                          {/* Tombol Siswa Tidak Bisa Menjawab -> Kembali Membaca Materi */}
                          <button
                            onClick={handleReturnToReading}
                            className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            <BookMarked className="w-3.5 h-3.5 text-blue-400" />
                            <span>Kembali Baca Materi</span>
                          </button>

                          <button
                            onClick={handleCheckQuizAnswer}
                            disabled={selectedAnswer === null}
                            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                              selectedAnswer !== null
                                ? 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95'
                                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {hasSubmittedAnswer && !isAnswerCorrect ? 'Coba Lagi' : 'Periksa Jawaban'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MateriView;
