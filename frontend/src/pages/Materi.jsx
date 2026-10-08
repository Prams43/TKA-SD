import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PUSMENDIK_MATERI } from '../data/pusmendikData';
import {
  markMateriComplete,
  unlockMateri,
  resetMateriProgress,
  getActivityData,
} from '../utils/activityTracker';
import MaterialReader from '../components/views/MaterialReader';
import {
  BookOpen,
  Calculator,
  ArrowLeft,
  CheckCircle2,
  Check,
  Lock,
  Unlock,
  HelpCircle,
  ChevronRight,
  Trophy,
  BookMarked,
  LayoutDashboard,
  Search,
  X,
  Sparkles,
  Zap,
  Star,
  Gift,
  RotateCcw,
  Compass,
  Layers,
  Award,
  Flame,
  Info,
  MapPin,
  List,
} from 'lucide-react';

/**
 * Halaman Penuh Modul Materi Pembelajaran TKA SD
 * 
 * Fitur:
 * 1. Pilihan Mata Pelajaran: Bahasa Indonesia (21 Level) & Matematika (12 Level).
 * 2. Kedua mata pelajaran memiliki tampilan & mekanisme yang SAMA PERSIS:
 *    - Sistem Level Berjenjang (Level 1..12 untuk MTK, Level 1..21 untuk BI)
 *    - Posisi awal: Hanya Level 1 yang terbuka, level berikutnya terkunci.
 *    - Syarat membuka level: Menyelesaikan materi & kuis level sebelumnya.
 *    - Fitur Lompat Level: Siswa dapat melompat ke level terkunci dengan menjawab kuis dari materi tujuan.
 *    - Desain Peta Petualangan Berliku (Duolingo-style Winding Path), Milestone Peti Bonus, dan Piala Puncak.
 */

// Konfigurasi Lengkap Dua Mata Pelajaran
const SUBJECTS_CONFIG = {
  bahasa_indonesia: {
    key: 'bahasa_indonesia',
    title: 'Bahasa Indonesia',
    tagline: '21 Level Berjenjang Standar Pusmendik',
    deskripsi: 'Ejaan, huruf kapital, kata depan, tanda baca, kalimat efektif, sastra (puisi & prosa), hingga analisis teks.',
    icon: BookOpen,
    totalLevels: 21,
    levels: PUSMENDIK_MATERI.bahasa_indonesia.elemen.flatMap((e) => e.bab),
    theme: {
      gradient: 'from-blue-600 via-indigo-600 to-blue-700',
      border: 'border-blue-400/30',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
      activeRing: 'ring-blue-300/80',
      activeBtn: 'from-blue-500 to-indigo-600 border-indigo-800',
      pillCompleted: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      pillActive: 'bg-blue-50 border-blue-300 text-blue-900',
    },
    milestones: {
      5: {
        title: 'Peti Bintang Ejaan & Tata Bahasa',
        requiredLevel: 5,
        desc: 'Pencapaian menuntaskan 5 Level Pertama: Huruf Kapital, Kata Depan, Tanda Baca, Kata Berimbuhan, dan Frasa.',
        reward: '⭐ Medali Ahli Ejaan & Frasa TKA SD',
      },
      10: {
        title: 'Peti Perak Makna & Kalimat Efektif',
        requiredLevel: 10,
        desc: 'Pencapaian menuntaskan 10 Level: Makna Kata, Ungkapan, Sinonim/Antonim, Diksi, dan Struktur Kalimat.',
        reward: '🥈 Medali Master Kalimat & Diksi',
      },
      15: {
        title: 'Peti Emas Sastra, Prosa & Puisi',
        requiredLevel: 15,
        desc: 'Pencapaian menuntaskan 15 Level: Menyimak, Menulis, Puisi, Prosa, dan Kosakata Lanjutan.',
        reward: '💎 Medali Maestro Sastra & Literasi',
      },
      21: {
        title: 'Piala Maestro Bahasa Indonesia TKA SD',
        requiredLevel: 21,
        desc: 'Piala kebanggaan tertinggi setelah menuntaskan seluruh 21 Level Bahasa Indonesia Pusmendik Kemendikdasmen RI.',
        reward: '👑 Gelar Maestro Bahasa Indonesia TKA SD 100%',
      },
    },
  },
  matematika: {
    key: 'matematika',
    title: 'Matematika',
    tagline: '12 Level Berjenjang Standar Pusmendik',
    deskripsi: 'Operasi hitung, skala, KPK/FPB, bilangan pangkat, kecepatan, geometri, sudut, dan pengolahan data.',
    icon: Calculator,
    totalLevels: 12,
    levels: PUSMENDIK_MATERI.matematika.elemen.flatMap((e) => e.bab),
    theme: {
      gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
      border: 'border-emerald-400/30',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activeRing: 'ring-emerald-300/80',
      activeBtn: 'from-emerald-500 to-teal-600 border-teal-800',
      pillCompleted: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      pillActive: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    },
    milestones: {
      4: {
        title: 'Peti Bintang Dasar Numerasi',
        requiredLevel: 4,
        desc: 'Peti pencapaian untuk menuntaskan 4 Level Pertama: Operasi Hitung, Skala, KPK/FPB, dan Pangkat.',
        reward: '⭐ Medali Ahli Bilangan TKA SD',
      },
      8: {
        title: 'Peti Emas Geometri & Pengukuran',
        requiredLevel: 8,
        desc: 'Peti pencapaian untuk menuntaskan 8 Level: Pengukuran, Jarak/Kecepatan, Bangun Datar, dan Bangun Ruang.',
        reward: '🏆 Medali Master Spasial & Geometri',
      },
      12: {
        title: 'Piala Maestro Matematika TKA SD',
        requiredLevel: 12,
        desc: 'Piala kebanggaan tertinggi setelah menuntaskan seluruh 12 Level Matematika Pusmendik Kemendikdasmen RI.',
        reward: '👑 Gelar Maestro Matematika TKA SD 100%',
      },
    },
  },
};

// Fungsi dinamis untuk menghitung offset winding path S-Curve
const getPathOffset = (index) => {
  const cycle = index % 8;
  switch (cycle) {
    case 0:
      return 'translate-x-0';
    case 1:
      return 'translate-x-6 sm:translate-x-14 md:translate-x-20';
    case 2:
      return 'translate-x-12 sm:translate-x-24 md:translate-x-32';
    case 3:
      return 'translate-x-6 sm:translate-x-12 md:translate-x-16';
    case 4:
      return 'translate-x-0';
    case 5:
      return '-translate-x-6 sm:-translate-x-12 md:-translate-x-16';
    case 6:
      return '-translate-x-12 sm:-translate-x-24 md:-translate-x-32';
    case 7:
      return '-translate-x-6 sm:-translate-x-14 md:-translate-x-20';
    default:
      return 'translate-x-0';
  }
};

const Materi = () => {
  const navigate = useNavigate();

  // Mata Pelajaran Terpilih ('bahasa_indonesia' | 'matematika' | null)
  const [selectedSubject, setSelectedSubject] = useState(null);

  // State Aktivitas Pengguna (Tersimpan di localStorage)
  const [activity, setActivity] = useState(() => getActivityData());
  const completedBabIds = activity?.materiCompleted || [];
  const unlockedBabIds = activity?.unlockedMateri || ['mtk_1', 'bi_1'];

  // State Navigasi & Modal
  const [activeBab, setActiveBab] = useState(null); // Sedang membaca materi di MaterialReader
  const [selectedLevelModal, setSelectedLevelModal] = useState(null); // Bab yang dipilih untuk melihat info/aksi
  const [viewMode, setViewMode] = useState('roadmap'); // 'roadmap' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [milestoneModal, setMilestoneModal] = useState(null);

  // State Kuis Pemahaman Pasca Membaca Materi (Normal Mode)
  const [inQuizMode, setInQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // State Mode Tantangan Lompat Level (Jump Challenge)
  const [jumpChallengeBab, setJumpChallengeBab] = useState(null);
  const [jumpQuizIndex, setJumpQuizIndex] = useState(0);
  const [jumpSelectedAnswer, setJumpSelectedAnswer] = useState(null);
  const [jumpHasSubmitted, setJumpHasSubmitted] = useState(false);
  const [jumpIsCorrect, setJumpIsCorrect] = useState(false);
  const [jumpFinished, setJumpFinished] = useState(false);

  // Refresh data aktivitas saat ada perubahan
  const refreshActivity = () => {
    setActivity(getActivityData());
  };

  // Helper Cek Status Level
  const isLevelCompleted = (babId) => completedBabIds.includes(babId);

  const isLevelUnlocked = (index, bab, levelsList) => {
    // Level 1 selalu terbuka
    if (index === 0) return true;
    // Terbuka jika sudah selesai
    if (completedBabIds.includes(bab.id)) return true;
    // Terbuka jika sudah di-unlock via tantangan
    if (unlockedBabIds.includes(bab.id)) return true;
    // Terbuka jika level sebelumnya sudah tuntas dikerjakan
    const prevBab = levelsList[index - 1];
    if (prevBab && completedBabIds.includes(prevBab.id)) return true;

    return false;
  };

  // Data mapel aktif
  const currentSubject = selectedSubject ? SUBJECTS_CONFIG[selectedSubject] : null;
  const currentLevels = currentSubject ? currentSubject.levels : [];

  // Menentukan index level yang sedang aktif sekarang di mapel aktif
  const currentActiveLevelIndex = currentLevels.findIndex(
    (bab, idx) => isLevelUnlocked(idx, bab, currentLevels) && !isLevelCompleted(bab.id)
  );

  // Buka Pembelajaran Materi Normal
  const handleOpenBab = (bab) => {
    setSelectedLevelModal(null);
    setActiveBab(bab);
    setInQuizMode(false);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setIsAnswerCorrect(false);
    setQuizFinished(false);
  };

  // Submit Kuis Normal (Setelah Membaca Materi)
  const handleCheckQuizAnswer = () => {
    if (selectedAnswer === null) return;
    const currentQ = activeBab.soalLatihan[currentQuizIndex];
    const correct = selectedAnswer === currentQ.jawabanBenar;

    setHasSubmittedAnswer(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      if (currentQuizIndex < activeBab.soalLatihan.length - 1) {
        setTimeout(() => {
          setCurrentQuizIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setHasSubmittedAnswer(false);
          setIsAnswerCorrect(false);
        }, 1100);
      } else {
        // Tuntas seluruh 3 soal!
        setQuizFinished(true);
        markMateriComplete(activeBab.id);

        // Buka level berikutnya secara otomatis
        const currentIndex = currentLevels.findIndex((b) => b.id === activeBab.id);
        if (currentIndex !== -1 && currentIndex < currentLevels.length - 1) {
          const nextBab = currentLevels[currentIndex + 1];
          unlockMateri(nextBab.id);
        }

        refreshActivity();

        setTimeout(() => {
          setActiveBab(null);
          setInQuizMode(false);
        }, 2200);
      }
    }
  };

  // Mulai Tantangan Lompat Level
  const handleStartJumpChallenge = (bab) => {
    setSelectedLevelModal(null);
    setJumpChallengeBab(bab);
    setJumpQuizIndex(0);
    setJumpSelectedAnswer(null);
    setJumpHasSubmitted(false);
    setJumpIsCorrect(false);
    setJumpFinished(false);
  };

  // Submit Jawaban Tantangan Lompat Level
  const handleCheckJumpAnswer = () => {
    if (jumpSelectedAnswer === null) return;
    const currentQ = jumpChallengeBab.soalLatihan[jumpQuizIndex];
    const correct = jumpSelectedAnswer === currentQ.jawabanBenar;

    setJumpHasSubmitted(true);
    setJumpIsCorrect(correct);

    if (correct) {
      if (jumpQuizIndex < jumpChallengeBab.soalLatihan.length - 1) {
        setTimeout(() => {
          setJumpQuizIndex((prev) => prev + 1);
          setJumpSelectedAnswer(null);
          setJumpHasSubmitted(false);
          setJumpIsCorrect(false);
        }, 1100);
      } else {
        // Berhasil menyelesaikan kuis tantangan lompat level!
        setJumpFinished(true);
        unlockMateri(jumpChallengeBab.id);
        refreshActivity();
      }
    }
  };

  // Reset Progres
  const handleResetProgress = () => {
    resetMateriProgress(selectedSubject);
    refreshActivity();
    setShowResetConfirm(false);
    setSelectedLevelModal(null);
  };

  // Hitung jumlah tuntas mapel aktif
  const completedCount = currentLevels.filter((b) => isLevelCompleted(b.id)).length;
  const progressPercent = currentLevels.length
    ? Math.round((completedCount / currentLevels.length) * 100)
    : 0;

  // Filter pencarian
  const filteredLevels = currentLevels.filter((bab) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      bab.judul.toLowerCase().includes(q) ||
      bab.ringkasan?.toLowerCase().includes(q) ||
      bab.konsepKunci?.toLowerCase().includes(q) ||
      `level ${bab.no}`.includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-doodle-pattern text-slate-800 selection:bg-blue-200 selection:text-blue-900 pb-12">
      {/* 1. Navbar Utama */}
      <Navbar />

      {/* 2. Konten Utama */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col animate-fade-in">
        {/* Navigasi Breadcrumb */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-blue-600 font-semibold flex items-center space-x-1 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveBab(null);
                setJumpChallengeBab(null);
                setSelectedSubject(null);
              }}
              className={`font-semibold hover:text-blue-600 transition-colors ${
                !selectedSubject ? 'text-[#0a1e4a] font-bold' : ''
              }`}
            >
              Modul Materi Pembelajaran
            </button>
            {selectedSubject && (
              <>
                <span>/</span>
                <span className="text-[#0a1e4a] font-bold">
                  {currentSubject?.title}
                </span>
              </>
            )}
            {activeBab && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-semibold truncate max-w-[150px] sm:max-w-xs">
                  Level {activeBab.no}: {activeBab.judul}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              if (activeBab || jumpChallengeBab) {
                setActiveBab(null);
                setJumpChallengeBab(null);
              } else if (selectedSubject) {
                setSelectedSubject(null);
              } else {
                navigate('/dashboard');
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-xs text-slate-700 hover:text-blue-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {activeBab || jumpChallengeBab
                ? 'Kembali ke Peta Level'
                : selectedSubject
                ? 'Ganti Mata Pelajaran'
                : 'Dashboard'}
            </span>
          </button>
        </div>

        {/* --- TAHAP 1: PILIHAN MATA PELAJARAN (BAHASA INDONESIA & MATEMATIKA) --- */}
        {!selectedSubject && (
          <div className="max-w-3xl mx-auto w-full py-4 sm:py-8 space-y-6 animate-fade-in">
            {/* Header Pilihan */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Petualangan Level Resmi Pusmendik Kemendikdasmen</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pilih Mata Pelajaran
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Setiap mata pelajaran memiliki peta level berjenjang dengan tantangan soal, buka gembok level berikutnya, dan kumpulkan piala penghargaan!
              </p>
            </div>

            {/* 2 Kartu Mata Pelajaran */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Kartu 1: Bahasa Indonesia */}
              {(() => {
                const biLevels = SUBJECTS_CONFIG.bahasa_indonesia.levels;
                const biDone = biLevels.filter((b) => isLevelCompleted(b.id)).length;
                const biPercent = Math.round((biDone / biLevels.length) * 100);

                return (
                  <div
                    onClick={() => {
                      setSelectedSubject('bahasa_indonesia');
                      setSearchQuery('');
                    }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 border-2 border-blue-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all cursor-pointer group hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <BookOpen className="w-7 h-7" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                          21 Level Berjenjang
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                        Bahasa Indonesia
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Huruf kapital, kata depan, tanda baca, kalimat efektif, sinonim/antonim, puisi, prosa, hingga analisis inferensial teks.
                      </p>

                      {/* Bar Progres */}
                      <div className="mt-4 pt-3 border-t border-blue-100">
                        <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-slate-600">
                          <span>Progres: {biDone} dari 21 Level</span>
                          <span className="text-blue-700 font-bold">{biPercent}%</span>
                        </div>
                        <div className="w-full bg-blue-100/70 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(4, biPercent)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Peta 21 Level Bahasa Indonesia</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

              {/* Kartu 2: Matematika */}
              {(() => {
                const mtkLevels = SUBJECTS_CONFIG.matematika.levels;
                const mtkDone = mtkLevels.filter((b) => isLevelCompleted(b.id)).length;
                const mtkPercent = Math.round((mtkDone / mtkLevels.length) * 100);

                return (
                  <div
                    onClick={() => {
                      setSelectedSubject('matematika');
                      setSearchQuery('');
                    }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 border-2 border-emerald-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all cursor-pointer group hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Calculator className="w-7 h-7" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          12 Level Berjenjang
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Matematika
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Operasi hitung campuran, skala & perbandingan, KPK/FPB, bilangan pangkat, kecepatan, geometri, sudut, dan pengelolaan data.
                      </p>

                      {/* Bar Progres */}
                      <div className="mt-4 pt-3 border-t border-emerald-100">
                        <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-slate-600">
                          <span>Progres: {mtkDone} dari 12 Level</span>
                          <span className="text-emerald-700 font-bold">{mtkPercent}%</span>
                        </div>
                        <div className="w-full bg-emerald-100/70 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(4, mtkPercent)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Peta 12 Level Matematika</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* --- TAHAP 2: PEMBELAJARAN MATERI ATAU KUIS PADA LEVEL TERPILIH --- */}
        {selectedSubject && activeBab && (
          <div className="bg-white border border-slate-200 rounded-3xl w-full shadow-xl overflow-hidden p-4 sm:p-6 animate-fade-in">
            {/* Header Baca Materi */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveBab(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Kembali ke Peta Petualangan"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                      LEVEL {activeBab.no} DARI {currentLevels.length} • {currentSubject.title.toUpperCase()}
                    </span>
                    {isLevelCompleted(activeBab.id) && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Tuntas</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    {activeBab.judul}
                  </h2>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-500">Materi Standar Pusmendik</span>
              </div>
            </div>

            {/* Konten: Pembaca Materi ATAU 3 Soal Pemahaman */}
            {!inQuizMode ? (
              <MaterialReader
                bab={activeBab}
                onStartQuiz={() => {
                  setInQuizMode(true);
                  setCurrentQuizIndex(0);
                  setSelectedAnswer(null);
                  setHasSubmittedAnswer(false);
                  setIsAnswerCorrect(false);
                  setQuizFinished(false);
                }}
              />
            ) : (
              <div className="max-w-xl mx-auto py-3 animate-fade-in">
                {/* Stepper Progress 3 Soal */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-semibold text-slate-600">
                    Kuis Pemahaman: Soal {currentQuizIndex + 1} dari {activeBab.soalLatihan.length}
                  </span>
                  <div className="flex space-x-1.5">
                    {activeBab.soalLatihan.map((_, i) => (
                      <div
                        key={i}
                        className={`w-7 h-2 rounded-full transition-colors ${
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
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-md relative">
                  {quizFinished ? (
                    <div className="text-center py-8 space-y-4 animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md animate-bounce-subtle">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900">
                        Level {activeBab.no} Tuntas! 🎉
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Luar biasa! Kamu berhasil menjawab semua soal dengan tepat. Level berikutnya kini telah terbuka di peta petualangan!
                      </p>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed mb-4">
                        {activeBab.soalLatihan[currentQuizIndex].pertanyaan}
                      </h4>

                      {/* Pilihan Jawaban */}
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
                            className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                              selectedAnswer === idx
                                ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{opt}</span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
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

                      {/* Petunjuk jika salah */}
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

                      {/* Notifikasi benar */}
                      {hasSubmittedAnswer && isAnswerCorrect && (
                        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs animate-fade-in flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold">Jawaban Benar! Melanjutkan ke soal berikutnya...</span>
                        </div>
                      )}

                      {/* Tombol Aksi Kuis */}
                      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                        <button
                          onClick={() => setInQuizMode(false)}
                          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          <BookMarked className="w-3.5 h-3.5 text-blue-600" />
                          <span>Kembali Baca Materi</span>
                        </button>

                        <button
                          onClick={handleCheckQuizAnswer}
                          disabled={selectedAnswer === null}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                            selectedAnswer !== null
                              ? 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95 cursor-pointer'
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

        {/* --- TAHAP 3: PETA PETUALANGAN MAPEL TERPILIH (DUOLINGO INSPIRED PATH) --- */}
        {selectedSubject && !activeBab && (
          <div className="space-y-5">
            {/* Header Banner Dinamis Sesuai Mapel */}
            <div
              className={`bg-gradient-to-r ${currentSubject.theme.gradient} rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border ${currentSubject.theme.border}`}
            >
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-lg pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Baris Atas Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-bold tracking-wider uppercase border border-white/20 mb-2">
                      <currentSubject.icon className="w-3.5 h-3.5" />
                      <span>{currentSubject.title} • {currentLevels.length} Level Berjenjang</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-xs">
                      Peta Materi {currentSubject.title} TKA SD
                    </h1>
                    <p className="text-xs sm:text-sm text-white/90 max-w-xl mt-0.5 leading-relaxed">
                      Selesaikan materi berurutan untuk membuka level berikutnya, atau buka lebih awal dengan{' '}
                      <strong className="underline decoration-yellow-300 decoration-2">Tantangan Lompat Soal</strong>!
                    </p>
                  </div>

                  {/* Tombol Panduan & Mode Tampilan */}
                  <div className="flex flex-col items-stretch sm:items-end space-y-2 flex-shrink-0 self-start sm:self-center">
                    {/* Tombol Buku Panduan (Rapi, Lebar Simetris, & Terpusat) */}
                    <button
                      onClick={() => setShowGuideModal(true)}
                      className="w-full sm:w-auto min-w-[148px] px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-bold text-white transition-all flex items-center justify-center space-x-2 border border-white/30 shadow-xs cursor-pointer active:scale-95 hover:shadow-md"
                      title="Buku Panduan Aturan Main"
                    >
                      <BookOpen className="w-4 h-4 drop-shadow-xs" />
                      <span className="tracking-wide">Buku Panduan</span>
                    </button>

                    {/* Switcher Mode Tampilan (Peta / Daftar) */}
                    <div className="w-full sm:w-auto min-w-[148px] bg-black/25 p-1 rounded-2xl flex items-center justify-between border border-white/20 shadow-xs">
                      <button
                        onClick={() => setViewMode('roadmap')}
                        className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                          viewMode === 'roadmap'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-white/80 hover:text-white'
                        }`}
                        title="Tampilan Peta Jalan"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Peta</span>
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                          viewMode === 'grid'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-white/80 hover:text-white'
                        }`}
                        title="Tampilan Daftar Kartu"
                      >
                        <List className="w-3.5 h-3.5" />
                        <span>Daftar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Indikator Status */}
                <div className="pt-2 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-white/90">
                      <span>Progres {currentSubject.title}</span>
                      <span className="font-bold text-white">
                        {completedCount} dari {currentLevels.length} Level Tuntas ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-black/25 rounded-full h-2.5 p-0.5 overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-yellow-300 to-amber-400 h-1.5 rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: `${Math.max(4, progressPercent)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-xl bg-white/15 border border-white/20 font-semibold text-white flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      <span>
                        Fokus: Level{' '}
                        {currentActiveLevelIndex !== -1
                          ? currentLevels[currentActiveLevelIndex].no
                          : currentLevels.length}
                      </span>
                    </span>

                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="text-white/70 hover:text-white transition-colors text-[10px] underline ml-1 cursor-pointer"
                      title="Reset progres untuk mulai dari awal"
                    >
                      Reset Progres
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pencarian Materi Instan */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari topik materi ${currentSubject.title} (contoh: ${
                  selectedSubject === 'matematika'
                    ? 'Operasi Hitung, KPK, Skala, Sudut'
                    : 'Huruf Kapital, Tanda Baca, Kalimat, Puisi'
                })...`}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* --- JIKA MODE GRID TAMPILAN KARTU --- */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                {filteredLevels.map((bab) => {
                  const originalIndex = currentLevels.findIndex((b) => b.id === bab.id);
                  const isCompleted = isLevelCompleted(bab.id);
                  const isUnlocked = isLevelUnlocked(originalIndex, bab, currentLevels);
                  const isCurrent = originalIndex === currentActiveLevelIndex;

                  return (
                    <div
                      key={bab.id}
                      onClick={() => setSelectedLevelModal(bab)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isCompleted
                          ? 'bg-gradient-to-br from-emerald-50/70 to-white border-emerald-300 hover:border-emerald-500 shadow-xs'
                          : isCurrent
                          ? 'bg-gradient-to-br from-blue-50/80 to-white border-blue-400 hover:border-blue-600 shadow-md ring-2 ring-blue-400/30'
                          : isUnlocked
                          ? 'bg-white border-slate-200 hover:border-blue-300 shadow-2xs'
                          : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow-2xs ${
                              isCompleted
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                ? 'bg-blue-600 text-white'
                                : isUnlocked
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {bab.no}
                          </span>

                          {isCompleted ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Tuntas</span>
                            </span>
                          ) : isCurrent ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 animate-pulse">
                              Fokus Belajar
                            </span>
                          ) : isUnlocked ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                              Terbuka
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600 flex items-center space-x-1">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Terkunci</span>
                            </span>
                          )}
                        </div>

                        <h4
                          className={`text-sm font-bold leading-snug ${
                            isCompleted
                              ? 'text-emerald-950'
                              : isUnlocked
                              ? 'text-slate-900'
                              : 'text-slate-500'
                          }`}
                        >
                          {bab.judul}
                        </h4>

                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {bab.ringkasan}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                        <span className={isUnlocked ? 'text-blue-600' : 'text-slate-400'}>
                          {isUnlocked ? 'Buka Materi' : 'Lompat Soal ⚡'}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* --- Winding Path Petualangan (Duolingo Path Style) --- */
              <div className="bg-white/80 backdrop-blur-xs rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-blue-50/30 via-transparent to-transparent pointer-events-none" />

                {/* Subtitle Alur */}
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Peta Berjenjang {currentLevels.length} Level • {currentSubject.title}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Klik lingkaran level untuk belajar, atau ikuti tantangan lompat level
                  </p>
                </div>

                {/* Kontainer Alur Zig-Zag (Roadmap Path) */}
                <div className="relative max-w-md mx-auto py-4 flex flex-col items-center space-y-7">
                  {currentLevels.map((bab, index) => {
                    const isCompleted = isLevelCompleted(bab.id);
                    const isUnlocked = isLevelUnlocked(index, bab, currentLevels);
                    const isCurrent = index === currentActiveLevelIndex;
                    const offsetClass = getPathOffset(index);

                    // Cek Milestone Peti
                    const milestoneItem = currentSubject.milestones[bab.no];
                    const isFinalLevel = bab.no === currentLevels.length;

                    return (
                      <React.Fragment key={bab.id}>
                        {/* Item Level Node */}
                        <div
                          className={`relative flex flex-col items-center transition-all duration-300 ${offsetClass}`}
                        >
                          {/* Balon Tag Level Aktif Sekarang */}
                          {isCurrent && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] shadow-lg flex items-center space-x-1.5 z-20 animate-bounce-subtle border-2 border-white">
                              <Sparkles className="w-3 h-3 text-yellow-300" />
                              <span>Mulai di Sini!</span>
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-blue-600" />
                            </div>
                          )}

                          {/* Tombol Lingkaran 3D Duolingo-Style */}
                          <button
                            onClick={() => setSelectedLevelModal(bab)}
                            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center font-black transition-all duration-200 transform cursor-pointer relative z-10 ${
                              isCompleted
                                ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-b-[6px] border-emerald-700 text-white shadow-emerald-200 shadow-xl hover:scale-105 active:translate-y-1 active:border-b-2'
                                : isCurrent
                                ? `bg-gradient-to-b ${currentSubject.theme.activeBtn} border-b-[6px] text-white shadow-blue-300 shadow-2xl hover:scale-105 ring-4 ${currentSubject.theme.activeRing} ring-offset-2 active:translate-y-1 active:border-b-2`
                                : isUnlocked
                                ? 'bg-gradient-to-b from-sky-400 to-blue-500 border-b-[6px] border-blue-700 text-white shadow-md hover:scale-105 active:translate-y-1 active:border-b-2'
                                : 'bg-slate-200 border-b-[6px] border-slate-300 text-slate-400 hover:bg-slate-300/90 hover:text-slate-600 shadow-2xs hover:scale-105 active:translate-y-1 active:border-b-2'
                            }`}
                            title={`Level ${bab.no}: ${bab.judul} (${
                              isCompleted ? 'Tuntas' : isUnlocked ? 'Terbuka' : 'Terkunci - Klik untuk Lompat'
                            })`}
                          >
                            {/* Ikon di dalam node */}
                            {isCompleted ? (
                              <Check className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3.5] drop-shadow-xs" />
                            ) : isCurrent ? (
                              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-xs" />
                            ) : isUnlocked ? (
                              <div className="flex flex-col items-center">
                                <span className="text-xl sm:text-2xl font-black leading-none">{bab.no}</span>
                                <span className="text-[9px] font-bold uppercase opacity-85 mt-0.5">Level</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Lock className="w-6 h-6 sm:w-7 sm:h-7 mb-0.5" />
                                <span className="text-[9px] font-bold opacity-80">{bab.no}</span>
                              </div>
                            )}

                            {/* Badge Bintang jika Tuntas */}
                            {isCompleted && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 text-yellow-900 border-2 border-white flex items-center justify-center text-[10px] font-black shadow-xs">
                                ★
                              </div>
                            )}
                          </button>

                          {/* Pill Judul Level */}
                          <div
                            onClick={() => setSelectedLevelModal(bab)}
                            className={`mt-2 px-3 py-1 rounded-xl text-center cursor-pointer transition-all max-w-[160px] sm:max-w-[190px] border shadow-2xs ${
                              isCompleted
                                ? currentSubject.theme.pillCompleted
                                : isCurrent
                                ? `${currentSubject.theme.pillActive} font-bold`
                                : isUnlocked
                                ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                                : 'bg-slate-100/80 border-slate-200 text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            <span className="block text-[10px] font-bold uppercase tracking-wider opacity-75">
                              Level {bab.no}
                            </span>
                            <span className="block text-xs font-semibold truncate">
                              {bab.judul}
                            </span>
                          </div>

                          {/* Stepping Connector Dots */}
                          {index < currentLevels.length - 1 && (
                            <div className="flex flex-col items-center space-y-1 my-1.5 opacity-60">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isCompleted ? 'bg-emerald-400' : 'bg-slate-300'
                                }`}
                              />
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isCompleted ? 'bg-emerald-400' : 'bg-slate-300'
                                }`}
                              />
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  isCompleted ? 'bg-emerald-400' : 'bg-slate-300'
                                }`}
                              />
                            </div>
                          )}
                        </div>

                        {/* --- MILESTONE PETI BONUS (Jika ada di level ini) --- */}
                        {milestoneItem && !isFinalLevel && (
                          <div
                            onClick={() =>
                              setMilestoneModal({
                                title: milestoneItem.title,
                                desc: milestoneItem.desc,
                                requiredLevel: milestoneItem.requiredLevel,
                                unlocked: completedCount >= milestoneItem.requiredLevel,
                                reward: milestoneItem.reward,
                              })
                            }
                            className="relative flex flex-col items-center my-3 cursor-pointer group"
                          >
                            <div
                              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center border-b-4 transition-all duration-200 transform group-hover:scale-110 shadow-lg ${
                                completedCount >= milestoneItem.requiredLevel
                                  ? 'bg-gradient-to-b from-amber-300 to-yellow-500 border-yellow-600 text-yellow-950 shadow-yellow-200'
                                  : 'bg-slate-100 border-slate-300 text-slate-400'
                              }`}
                            >
                              <Gift className="w-8 h-8 sm:w-9 sm:h-9" />
                            </div>
                            <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600">
                              {completedCount >= milestoneItem.requiredLevel
                                ? '🎁 Peti Terbuka!'
                                : `🔒 Peti Level ${milestoneItem.requiredLevel}`}
                            </div>
                            <div className="flex flex-col items-center space-y-1 my-1.5 opacity-60">
                              <span className="w-2 h-2 rounded-full bg-slate-300" />
                              <span className="w-2 h-2 rounded-full bg-slate-300" />
                            </div>
                          </div>
                        )}

                        {/* --- GRAND TROPHY (Puncak Akhir Mapel) --- */}
                        {isFinalLevel && (
                          <div
                            onClick={() =>
                              setMilestoneModal({
                                title: milestoneItem?.title || `Piala Juara ${currentSubject.title}`,
                                desc: milestoneItem?.desc || `Piala kebanggaan setelah menuntaskan seluruh ${currentLevels.length} Level ${currentSubject.title}.`,
                                requiredLevel: currentLevels.length,
                                unlocked: completedCount === currentLevels.length,
                                reward: milestoneItem?.reward || `👑 Gelar Maestro ${currentSubject.title} TKA SD 100%`,
                              })
                            }
                            className="relative flex flex-col items-center pt-4 pb-2 cursor-pointer group animate-fade-in"
                          >
                            <div
                              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center border-b-[6px] transition-all duration-200 transform group-hover:scale-110 shadow-xl ${
                                completedCount === currentLevels.length
                                  ? 'bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-600 border-yellow-700 text-amber-950 shadow-yellow-300 animate-wiggle'
                                  : 'bg-slate-100 border-slate-300 text-slate-400'
                              }`}
                            >
                              <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
                            </div>
                            <div className="mt-2 text-center">
                              <span
                                className={`text-xs font-black px-3 py-1 rounded-full border shadow-2xs ${
                                  completedCount === currentLevels.length
                                    ? 'bg-yellow-100 text-yellow-900 border-yellow-300'
                                    : 'bg-slate-100 text-slate-500 border-slate-200'
                                }`}
                              >
                                {completedCount === currentLevels.length
                                  ? `👑 MAESTRO ${currentSubject.title.toUpperCase()}`
                                  : `Piala Puncak (Level ${currentLevels.length} Selesai)`}
                              </span>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- MODAL 1: DETAIL LEVEL (INTERACTIVE POPUP DIALOG) --- */}
      {selectedLevelModal && currentLevels.length > 0 && (() => {
        const modalIndex = currentLevels.findIndex((b) => b.id === selectedLevelModal.id);
        const isCompleted = isLevelCompleted(selectedLevelModal.id);
        const isUnlocked = isLevelUnlocked(modalIndex, selectedLevelModal, currentLevels);
        const prevBab = modalIndex > 0 ? currentLevels[modalIndex - 1] : null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative animate-fade-in">
              {/* Header Modal */}
              <div
                className={`p-5 text-white relative ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                    : isUnlocked
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                    : 'bg-gradient-to-r from-slate-700 to-slate-800'
                }`}
              >
                <button
                  onClick={() => setSelectedLevelModal(null)}
                  className="absolute right-4 top-4 w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20">
                    LEVEL {selectedLevelModal.no} DARI {currentLevels.length} • {currentSubject?.title.toUpperCase()}
                  </span>
                  {isCompleted ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-emerald-950">
                      ✓ Sudah Tuntas
                    </span>
                  ) : isUnlocked ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-200 text-blue-900">
                      Terbuka
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500 text-white">
                      🔒 Terkunci
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-white">{selectedLevelModal.judul}</h3>
              </div>

              {/* Body Modal */}
              <div className="p-5 space-y-4">
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ringkasan Materi
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {selectedLevelModal.ringkasan}
                  </p>
                </div>

                {selectedLevelModal.konsepKunci && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700">
                    <strong className="text-amber-900 block font-bold mb-0.5">Konsep Inti:</strong>
                    <span>{selectedLevelModal.konsepKunci}</span>
                  </div>
                )}

                {/* Status Penjelasan */}
                {!isUnlocked && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                    <div className="flex items-start space-x-2">
                      <Lock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-slate-800">
                          Level ini masih terkunci!
                        </strong>
                        <p className="mt-0.5 text-slate-600 leading-relaxed">
                          Selesaikan Level {prevBab?.no} ({prevBab?.judul}) terlebih dahulu,{' '}
                          <strong className="text-blue-700">ATAU kamu dapat langsung melompat</strong>{' '}
                          ke level ini dengan menjawab soal tantangan pemahaman materi!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tombol Aksi */}
                <div className="pt-2 space-y-2.5">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleOpenBab(selectedLevelModal)}
                      className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isCompleted ? 'Pelajari Ulang Materi' : 'Mulai Belajar Materi'}</span>
                    </button>
                  ) : (
                    /* Opsi Lompat Level */
                    <button
                      onClick={() => handleStartJumpChallenge(selectedLevelModal)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Lompat ke Level Ini (Tantangan Kuis)</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedLevelModal(null)}
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- MODAL 2: TANTANGAN LOMPAT LEVEL (JUMP CHALLENGE) --- */}
      {jumpChallengeBab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl border border-amber-300 shadow-2xl max-w-lg w-full overflow-hidden relative animate-fade-in my-auto">
            {/* Header Tantangan Lompat */}
            <div className="p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white relative">
              <button
                onClick={() => setJumpChallengeBab(null)}
                className="absolute right-4 top-4 w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-black uppercase tracking-wider mb-2">
                <Zap className="w-3 h-3 fill-current text-yellow-200" />
                <span>Tantangan Lompat Level • {currentSubject?.title}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                Uji Pemahaman: Level {jumpChallengeBab.no} ({jumpChallengeBab.judul})
              </h3>
              <p className="text-xs text-amber-100 mt-1">
                Jawab soal materi ini untuk langsung membuka Level {jumpChallengeBab.no} lebih awal!
              </p>
            </div>

            {/* Body Tantangan */}
            <div className="p-5 sm:p-6">
              {jumpFinished ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md animate-bounce-subtle">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">
                      Tantangan Berhasil Dituntaskan! 🎉
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1 leading-relaxed">
                      Hebat! Kamu telah membuktikan kemampuanmu. <strong>Level {jumpChallengeBab.no} ({jumpChallengeBab.judul})</strong> kini resmi <strong>TERBUKA</strong> untukmu!
                    </p>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      onClick={() => {
                        const target = jumpChallengeBab;
                        setJumpChallengeBab(null);
                        handleOpenBab(target);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      📖 Langsung Baca Materi
                    </button>
                    <button
                      onClick={() => setJumpChallengeBab(null)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      🗺️ Kembali ke Peta Level
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Stepper Progress */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-100 pb-2">
                    <span>Soal Tantangan {jumpQuizIndex + 1} dari {jumpChallengeBab.soalLatihan.length}</span>
                    <div className="flex space-x-1.5">
                      {jumpChallengeBab.soalLatihan.map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-2 rounded-full transition-colors ${
                            i < jumpQuizIndex
                              ? 'bg-emerald-500'
                              : i === jumpQuizIndex
                              ? 'bg-amber-500'
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pertanyaan */}
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    {jumpChallengeBab.soalLatihan[jumpQuizIndex].pertanyaan}
                  </h4>

                  {/* Opsi Jawaban */}
                  <div className="space-y-2">
                    {jumpChallengeBab.soalLatihan[jumpQuizIndex].pilihan.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!jumpHasSubmitted || !jumpIsCorrect) {
                            setJumpSelectedAnswer(idx);
                            setJumpHasSubmitted(false);
                          }
                        }}
                        className={`w-full p-3 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between cursor-pointer ${
                          jumpSelectedAnswer === idx
                            ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt}</span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            jumpSelectedAnswer === idx
                              ? 'border-amber-500 bg-amber-500 text-white'
                              : 'border-slate-300 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Hint jika salah */}
                  {jumpHasSubmitted && !jumpIsCorrect && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs animate-fade-in flex items-start space-x-2">
                      <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">Jawaban belum tepat! Petunjuk:</strong>
                        <span className="text-slate-700 leading-relaxed">
                          {jumpChallengeBab.soalLatihan[jumpQuizIndex].hint}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Feedback Benar */}
                  {jumpHasSubmitted && jumpIsCorrect && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs animate-fade-in flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold">Benar! Menuju ke soal berikutnya...</span>
                    </div>
                  )}

                  {/* Tombol Periksa */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setJumpChallengeBab(null)}
                      className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleCheckJumpAnswer}
                      disabled={jumpSelectedAnswer === null}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                        jumpSelectedAnswer !== null
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {jumpHasSubmitted && !jumpIsCorrect ? 'Coba Lagi' : 'Periksa Jawaban'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: BUKU PANDUAN CARA BERMAIN --- */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden relative animate-fade-in">
            <div
              className={`p-5 bg-gradient-to-r ${
                currentSubject?.theme.gradient || 'from-blue-600 to-indigo-600'
              } text-white`}
            >
              <button
                onClick={() => setShowGuideModal(false)}
                className="absolute right-4 top-4 w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-black flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Buku Panduan Petualangan Level</span>
              </h3>
              <p className="text-xs text-white/90 mt-1">
                Aturan & Cara Menaklukkan Level Pembelajaran TKA SD
              </p>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Posisi Awal Belajar</strong>
                  Hanya <strong>Level 1</strong> pada masing-masing mata pelajaran yang terbuka di awal petualangan. Level selanjutnya masih terkunci.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Membuka Level Berurutan</strong>
                  Untuk membuka level berikutnya secara normal, baca materi pelajaran dan jawab 3 soal latihan pemahaman di akhir materi hingga benar.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Fitur Tantangan Lompat Soal</strong>
                  Ingin langsung belajar materi di level tertentu? Kamu bisa melompat materi kapan saja dengan menyelesaikan <strong>Tantangan Kuis</strong> dari materi yang dituju!
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Milestone Peti & Piala Puncak</strong>
                  Kumpulkan bintang dan buka peti bonus di setiap tahapan, hingga Piala Maestro di puncak level terakhir!
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Saya Mengerti, Lanjutkan Petualangan!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: MILESTONE PETI & PIALA --- */}
      {milestoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden relative text-center p-6 space-y-4 animate-fade-in">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md ${
                milestoneModal.unlocked
                  ? 'bg-gradient-to-b from-yellow-300 to-amber-500 text-amber-950 animate-bounce-subtle'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {milestoneModal.unlocked ? <Trophy className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pencapaian Milestone
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">{milestoneModal.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{milestoneModal.desc}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold">
              {milestoneModal.unlocked ? (
                <div className="text-emerald-700">
                  <span>Status: <strong>Terbuka!</strong></span>
                  <div className="text-[11px] text-slate-600 mt-0.5">{milestoneModal.reward}</div>
                </div>
              ) : (
                <div className="text-slate-500">
                  <span>Perlu menyelesaikan minimal <strong>{milestoneModal.requiredLevel} Level</strong> untuk membuka!</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">Saat ini: {completedCount} / {milestoneModal.requiredLevel} Level</div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMilestoneModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL 5: KONFIRMASI RESET PROGRES --- */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-5 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                Reset Progres {currentSubject?.title || 'Belajar'}?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini akan mengunci kembali Level 2 sampai {currentLevels.length} pada mata pelajaran ini, dan mengembalikan status ke Level 1 awal.
              </p>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleResetProgress}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materi;
