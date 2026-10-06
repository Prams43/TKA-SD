import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PUSMENDIK_MATERI } from '../data/pusmendikData';
import { markMateriComplete, getActivityData } from '../utils/activityTracker';
import MaterialReader from '../components/views/MaterialReader';
import {
  BookOpen,
  Calculator,
  ArrowLeft,
  CheckCircle2,
  Check,
  HelpCircle,
  ChevronRight,
  Trophy,
  BookMarked,
  LayoutDashboard,
  Search,
  X,
} from 'lucide-react';

/**
 * Halaman Penuh Modul Materi Pembelajaran TKA SD
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
const Materi = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null); // 'bahasa_indonesia' | 'matematika' | null
  const [activeBab, setActiveBab] = useState(null); // Object bab yang sedang dibuka
  const [inQuizMode, setInQuizMode] = useState(false); // Mode 3 soal latihan di akhir
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // 0, 1, 2
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="min-h-screen flex flex-col bg-doodle-pattern text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Konten Utama Halaman Materi */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 flex flex-col animate-fade-in">
        {/* Dekorasi Breadcrumb / Info Atas */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-blue-600 font-semibold flex items-center space-x-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span className="font-bold text-[#0a1e4a]">Modul Materi Pembelajaran</span>
            {selectedSubject && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-medium">
                  {PUSMENDIK_MATERI[selectedSubject].title}
                </span>
              </>
            )}
            {activeBab && (
              <>
                <span>/</span>
                <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-xs">
                  {activeBab.judul}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-700 hover:text-blue-700 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Dashboard</span>
            <span className="sm:hidden">Kembali</span>
          </button>
        </div>

        {/* Kartu Utama Materi */}
        <div className="bg-white border border-slate-200/90 rounded-3xl w-full flex-1 flex flex-col shadow-xl text-slate-800 overflow-hidden relative">
          {/* Ambient Top Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />

          {/* Header Bar Modul */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center space-x-3">
              {activeBab ? (
                <button
                  onClick={() => setActiveBab(null)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                  title="Kembali ke Persebaran Materi"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : selectedSubject ? (
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                  title="Pilih Mata Pelajaran Lain"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : null}

              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span>📚 Modul Materi Pembelajaran TKA SD</span>
                </h2>
                <p className="text-xs text-slate-500">
                  {activeBab
                    ? activeBab.judul
                    : selectedSubject
                    ? `Persebaran Materi ${PUSMENDIK_MATERI[selectedSubject].title}`
                    : 'Pilih Mata Pelajaran Resmi Pusmendik'}
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 sm:p-6 bg-white">
            {/* TAHAP 1: Pilih Mata Pelajaran (Hanya BI & MTK) */}
            {!selectedSubject && (
              <div className="max-w-2xl mx-auto py-6 sm:py-10">
                <div className="text-center mb-8">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    Silabus Buku & Asesmen Pusmendik Kemendikdasmen
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-3">
                    Pilih Mata Pelajaran Wajib SD
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Silabus materi lengkap 1-to-1 sesuai buku catatan asesmen kompetensi murid.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Kartu Bahasa Indonesia */}
                  <div
                    onClick={() => setSelectedSubject('bahasa_indonesia')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          21 Materi Lengkap
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        Bahasa Indonesia
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Ejaan, tanda baca, kata berimbuhan, frasa, kalimat, sastra (puisi & prosa), hingga analisis teks.
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                      <span>Buka 21 Daftar Materi</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Kartu Matematika */}
                  <div
                    onClick={() => setSelectedSubject('matematika')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <Calculator className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          12 Materi Lengkap
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Matematika
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Operasi hitung, skala, KPK/FPB, bilangan pangkat, pengukuran, kecepatan, geometri, sudut, dan data.
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                      <span>Buka 12 Daftar Materi</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAHAP 2: Tampilan Persebaran Materi dari Buku Catatan & Pusmendik */}
            {selectedSubject && !activeBab && (() => {
              const allBabs = PUSMENDIK_MATERI[selectedSubject].elemen.flatMap((e) => e.bab);
              const doneCount = allBabs.filter((b) => completedBabIds.includes(b.id)).length;
              const percent = Math.round((doneCount / (allBabs.length || 1)) * 100);

              return (
                <div className="space-y-6">
                  {/* Banner Progres & Info Mata Pelajaran */}
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                            Daftar Silabus Buku Pelajaran
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            {allBabs.length} Materi
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                          {PUSMENDIK_MATERI[selectedSubject].title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {PUSMENDIK_MATERI[selectedSubject].deskripsi}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedSubject(null)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-blue-600 font-semibold transition-colors shadow-sm"
                      >
                        ← Ganti Mapel
                      </button>
                    </div>

                    {/* Progres Belajar Bar */}
                    <div className="pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                        <span className="text-slate-600">
                          Status Pembelajaran: <strong className="text-slate-900">{doneCount}</strong> dari <strong>{allBabs.length}</strong> Materi Selesai
                        </span>
                        <span className="font-bold text-blue-700">{percent}% Tuntas</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative pt-2 border-t border-slate-200">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-[calc(50%+4px)] -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari materi (contoh: KPK, Sudut, Huruf Kapital, Pecahan, Skala)..."
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-2xs"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3.5 top-[calc(50%+4px)] -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Jika mencari materi */}
                  {searchQuery.trim() ? (
                    (() => {
                      const qLower = searchQuery.toLowerCase();
                      const matchedBabs = allBabs.filter(
                        (b) =>
                          b.judul.toLowerCase().includes(qLower) ||
                          b.ringkasan?.toLowerCase().includes(qLower) ||
                          b.konsepKunci?.toLowerCase().includes(qLower)
                      );

                      if (matchedBabs.length === 0) {
                        return (
                          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
                            Tidak ditemukan materi dengan kata kunci "<strong>{searchQuery}</strong>". Silakan coba kata kunci lain.
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          <div className="text-xs font-semibold text-slate-600">
                            Ditemukan <strong>{matchedBabs.length}</strong> materi pembelajaran:
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {matchedBabs.map((bab) => {
                              const isDone = completedBabIds.includes(bab.id);
                              return (
                                <div
                                  key={bab.id}
                                  onClick={() => handleOpenBab(bab)}
                                  className="p-3.5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-400 shadow-sm transition-all cursor-pointer flex items-center justify-between group hover:shadow-md"
                                >
                                  <div className="space-y-1.5 pr-2 flex-1">
                                    <div className="flex items-center space-x-2 flex-wrap">
                                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                                        {bab.no}
                                      </span>
                                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                        {bab.judul}
                                      </h5>
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-1 pl-8">
                                      {bab.ringkasan}
                                    </p>
                                  </div>

                                  <div className="flex-shrink-0 ml-3 flex items-center">
                                    {isDone ? (
                                      <div
                                        className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-xs"
                                        title="Selesai Dipelajari"
                                      >
                                        <Check className="w-4 h-4 stroke-[3]" />
                                      </div>
                                    ) : (
                                      <div
                                        className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 group-hover:border-blue-300 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all"
                                        title="Buka Materi"
                                      >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* Loop Elemen Kurikulum */
                    <div className="space-y-5">
                      {PUSMENDIK_MATERI[selectedSubject].elemen.map((elemen) => (
                        <div
                          key={elemen.id}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200"
                        >
                          <div className="mb-3">
                            <h4 className="text-sm font-bold text-blue-900">{elemen.namaElemen}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{elemen.deskripsi}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            {elemen.bab.map((bab) => {
                              const isDone = completedBabIds.includes(bab.id);
                              return (
                                <div
                                  key={bab.id}
                                  onClick={() => handleOpenBab(bab)}
                                  className="p-3.5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-400 shadow-sm transition-all cursor-pointer flex items-center justify-between group hover:shadow-md"
                                >
                                  <div className="space-y-1.5 pr-2 flex-1">
                                    <div className="flex items-center space-x-2 flex-wrap">
                                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                                        {bab.no}
                                      </span>
                                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                        {bab.judul}
                                      </h5>
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-1 pl-8">
                                      {bab.ringkasan}
                                    </p>
                                  </div>

                                  {/* Status Materi: Centang hijau jika selesai, panah navigasi jika belum */}
                                  <div className="flex-shrink-0 ml-3 flex items-center">
                                    {isDone ? (
                                      <div
                                        className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-xs"
                                        title="Selesai Dipelajari"
                                      >
                                        <Check className="w-4 h-4 stroke-[3]" />
                                      </div>
                                    ) : (
                                      <div
                                        className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 group-hover:border-blue-300 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all"
                                        title="Buka Materi"
                                      >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

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
                      <span className="text-xs font-semibold text-slate-500">
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
                                ? 'bg-blue-600'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Kartu Soal */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-lg relative">
                      {quizFinished ? (
                        <div className="text-center py-8 space-y-3 animate-fade-in">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
                            <Trophy className="w-8 h-8" />
                          </div>
                          <h4 className="text-lg font-bold text-slate-900">Hebat Sekali! 🎉</h4>
                          <p className="text-xs text-slate-600 max-w-sm mx-auto">
                            Kamu berhasil menjawab seluruh 3 soal dengan benar. Mengalihkan kembali ke persebaran materi...
                          </p>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed mb-4">
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
                                    ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span>{opt}</span>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                                    selectedAnswer === idx
                                      ? 'border-blue-500 bg-blue-600 text-white'
                                      : 'border-slate-300 text-slate-400'
                                  }`}
                                >
                                  {String.fromCharCode(65 + idx)}
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Feedback Jawaban Salah & HINT / Petunjuk */}
                          {hasSubmittedAnswer && !isAnswerCorrect && (
                            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs animate-fade-in flex items-start space-x-2.5">
                              <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <strong className="block font-bold">Jawaban belum tepat! Ini petunjuknya:</strong>
                                <span className="text-slate-700 mt-0.5 block leading-relaxed">
                                  {activeBab.soalLatihan[currentQuizIndex].hint}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Feedback Jawaban Benar */}
                          {hasSubmittedAnswer && isAnswerCorrect && (
                            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs animate-fade-in flex items-center space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Jawaban Benar! Melanjutkan...</span>
                            </div>
                          )}

                          {/* Baris Tombol Aksi */}
                          <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                            {/* Tombol Siswa Tidak Bisa Menjawab -> Kembali Membaca Materi */}
                            <button
                              onClick={handleReturnToReading}
                              className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                            >
                              <BookMarked className="w-3.5 h-3.5 text-blue-600" />
                              <span>Kembali Baca Materi</span>
                            </button>

                            <button
                              onClick={handleCheckQuizAnswer}
                              disabled={selectedAnswer === null}
                              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                                selectedAnswer !== null
                                  ? 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95'
                                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
      </main>
    </div>
  );
};

export default Materi;
