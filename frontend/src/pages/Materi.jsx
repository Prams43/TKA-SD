import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PUSMENDIK_MATERI } from '../data/pusmendikData';
import {
  markMateriComplete,
  unlockMateri,
  resetMateriProgress,
  getActivityData,
  recordUserActivity,
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
    tagline: '21 Topik Materi Standar Pusmendik',
    deskripsi: 'Ejaan, huruf kapital, kata depan, tanda baca, kalimat efektif, sastra (puisi & prosa), hingga analisis teks.',
    icon: BookOpen,
    totalLevels: 21,
    levels: PUSMENDIK_MATERI.bahasa_indonesia.elemen.flatMap((e) => e.bab),
    theme: {
      gradient: 'from-slate-900 to-slate-900',
      border: 'border-[#33261D]',
      badgeBg: 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]',
      activeRing: 'ring-[#047857]/20',
      activeBtn: 'from-[#047857] to-[#047857] border-[#065F46]',
      pillCompleted: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]',
      pillActive: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]',
    },
    milestones: {
      5: {
        title: 'Peti Bintang Ejaan & Tata Bahasa',
        requiredLevel: 5,
        desc: 'Pencapaian menuntaskan 5 Materi Pertama: Huruf Kapital, Kata Depan, Tanda Baca, Kata Berimbuhan, dan Frasa.',
        reward: '⭐ Medali Ahli Ejaan & Frasa TKA SD',
      },
      10: {
        title: 'Peti Perak Makna & Kalimat Efektif',
        requiredLevel: 10,
        desc: 'Pencapaian menuntaskan 10 Materi: Makna Kata, Ungkapan, Sinonim/Antonim, Diksi, dan Struktur Kalimat.',
        reward: '🥈 Medali Master Kalimat & Diksi',
      },
      15: {
        title: 'Peti Emas Sastra, Prosa & Puisi',
        requiredLevel: 15,
        desc: 'Pencapaian menuntaskan 15 Materi: Menyimak, Menulis, Puisi, Prosa, dan Kosakata Lanjutan.',
        reward: '💎 Medali Maestro Sastra & Literasi',
      },
      21: {
        title: 'Piala Maestro Bahasa Indonesia TKA SD',
        requiredLevel: 21,
        desc: 'Piala kebanggaan tertinggi setelah menuntaskan seluruh 21 Materi Bahasa Indonesia Pusmendik Kemendikdasmen RI.',
        reward: '👑 Gelar Maestro Bahasa Indonesia TKA SD 100%',
      },
    },
  },
  matematika: {
    key: 'matematika',
    title: 'Matematika',
    tagline: '12 Topik Materi Standar Pusmendik',
    deskripsi: 'Operasi hitung, skala, KPK/FPB, bilangan pangkat, kecepatan, geometri, sudut, dan pengolahan data.',
    icon: Calculator,
    totalLevels: 12,
    levels: PUSMENDIK_MATERI.matematika.elemen.flatMap((e) => e.bab),
    theme: {
      gradient: 'from-slate-900 to-slate-900',
      border: 'border-[#33261D]',
      badgeBg: 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]',
      activeRing: 'ring-[#881337]/20',
      activeBtn: 'from-[#881337] to-[#881337] border-[#700D2B]',
      pillCompleted: 'bg-[#FFF1F2] border-[#FECDD3] text-[#881337]',
      pillActive: 'bg-[#FFF1F2] border-[#FECDD3] text-[#881337]',
    },
    milestones: {
      4: {
        title: 'Peti Bintang Dasar Numerasi',
        requiredLevel: 4,
        desc: 'Peti pencapaian untuk menuntaskan 4 Materi Pertama: Operasi Hitung, Skala, KPK/FPB, dan Pangkat.',
        reward: '⭐ Medali Ahli Bilangan TKA SD',
      },
      8: {
        title: 'Peti Emas Geometri & Pengukuran',
        requiredLevel: 8,
        desc: 'Peti pencapaian untuk menuntaskan 8 Materi: Pengukuran, Jarak/Kecepatan, Bangun Datar, dan Bangun Ruang.',
        reward: '🏆 Medali Master Spasial & Geometri',
      },
      12: {
        title: 'Piala Maestro Matematika TKA SD',
        requiredLevel: 12,
        desc: 'Piala kebanggaan tertinggi setelah menuntaskan seluruh 12 Materi Matematika Pusmendik Kemendikdasmen RI.',
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
  const materiStars = activity?.materiStars || {};

  // Helper dapatkan jumlah bintang yang diraih pada bab tertentu
  const getLevelStars = (babId) => {
    if (materiStars && materiStars[babId] !== undefined) {
      return materiStars[babId];
    }
    if (completedBabIds.includes(babId)) {
      return 3;
    }
    return 0;
  };

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
  const [showQuizHint, setShowQuizHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizMistakes, setQuizMistakes] = useState(0);

  // State Mode Tantangan Lompat Level (Jump Challenge)
  const [jumpChallengeBab, setJumpChallengeBab] = useState(null);
  const [jumpQuizIndex, setJumpQuizIndex] = useState(0);
  const [jumpSelectedAnswer, setJumpSelectedAnswer] = useState(null);
  const [jumpHasSubmitted, setJumpHasSubmitted] = useState(false);
  const [jumpIsCorrect, setJumpIsCorrect] = useState(false);
  const [showJumpHint, setShowJumpHint] = useState(false);
  const [jumpFinished, setJumpFinished] = useState(false);

  // State Transisi Anti-Spam (Mencegah Klik Ganda/Spam Tombol Periksa Jawaban)
  const isQuizTransitioningRef = useRef(false);
  const [isQuizTransitioning, setIsQuizTransitioning] = useState(false);
  const isJumpTransitioningRef = useRef(false);
  const [isJumpTransitioning, setIsJumpTransitioning] = useState(false);

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
    setShowQuizHint(false);
    setQuizFinished(false);
    setQuizMistakes(0);
    isQuizTransitioningRef.current = false;
    setIsQuizTransitioning(false);
  };

  // Submit Kuis Normal (Setelah Membaca Materi)
  const handleCheckQuizAnswer = () => {
    // Kunci langsung: cegah spam klik jika sedang transisi atau jawaban sudah terverifikasi benar
    if (isQuizTransitioningRef.current || (hasSubmittedAnswer && isAnswerCorrect)) return;
    if (selectedAnswer === null) return;

    const currentQ = activeBab.soalLatihan[currentQuizIndex];
    const correct = selectedAnswer === currentQ.jawabanBenar;

    setHasSubmittedAnswer(true);
    setIsAnswerCorrect(correct);

    if (!correct) {
      setQuizMistakes((prev) => prev + 1);
      setShowQuizHint(true);
    } else {
      // Aktifkan kunci transisi agar spam klik tidak melompati soal
      isQuizTransitioningRef.current = true;
      setIsQuizTransitioning(true);
      setShowQuizHint(false);

      if (currentQuizIndex < activeBab.soalLatihan.length - 1) {
        setTimeout(() => {
          setCurrentQuizIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setHasSubmittedAnswer(false);
          setIsAnswerCorrect(false);
          setShowQuizHint(false);
          isQuizTransitioningRef.current = false;
          setIsQuizTransitioning(false);
        }, 1100);
      } else {
        // Tuntas seluruh 3 soal!
        setQuizFinished(true);
        // Hitung bintang: 0 salah -> 3 bintang; 1 salah -> 2 bintang; >=2 salah -> 1 bintang
        const earnedStars = quizMistakes === 0 ? 3 : quizMistakes === 1 ? 2 : 1;
        markMateriComplete(activeBab.id, earnedStars);

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
          isQuizTransitioningRef.current = false;
          setIsQuizTransitioning(false);
        }, 2600);
      }
    }
  };

  // Aksi Coba Lagi Soal Kuis Normal
  const handleRetryQuizQuestion = () => {
    if (isQuizTransitioningRef.current) return;
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setIsAnswerCorrect(false);
    // Petunjuk (hint) tetap terlihat agar murid terbantu memilih jawaban yang tepat
  };

  // Mulai Tantangan Lompat Level
  const handleStartJumpChallenge = (bab) => {
    setSelectedLevelModal(null);
    setJumpChallengeBab(bab);
    setJumpQuizIndex(0);
    setJumpSelectedAnswer(null);
    setJumpHasSubmitted(false);
    setJumpIsCorrect(false);
    setShowJumpHint(false);
    setJumpFinished(false);
    isJumpTransitioningRef.current = false;
    setIsJumpTransitioning(false);
  };

  // Submit Jawaban Tantangan Lompat Level
  const handleCheckJumpAnswer = () => {
    // Kunci langsung: cegah spam klik tantangan lompat level
    if (isJumpTransitioningRef.current || (jumpHasSubmitted && jumpIsCorrect)) return;
    if (jumpSelectedAnswer === null) return;

    const currentQ = jumpChallengeBab.soalLatihan[jumpQuizIndex];
    const correct = jumpSelectedAnswer === currentQ.jawabanBenar;

    setJumpHasSubmitted(true);
    setJumpIsCorrect(correct);

    if (!correct) {
      setShowJumpHint(true);
    } else {
      // Aktifkan kunci transisi agar spam klik tidak melompati soal tantangan
      isJumpTransitioningRef.current = true;
      setIsJumpTransitioning(true);
      setShowJumpHint(false);

      if (jumpQuizIndex < jumpChallengeBab.soalLatihan.length - 1) {
        setTimeout(() => {
          setJumpQuizIndex((prev) => prev + 1);
          setJumpSelectedAnswer(null);
          setJumpHasSubmitted(false);
          setJumpIsCorrect(false);
          setShowJumpHint(false);
          isJumpTransitioningRef.current = false;
          setIsJumpTransitioning(false);
        }, 1100);
      } else {
        // Berhasil menyelesaikan kuis tantangan lompat level!
        setJumpFinished(true);
        unlockMateri(jumpChallengeBab.id);
        refreshActivity();
        isJumpTransitioningRef.current = false;
        setIsJumpTransitioning(false);
      }
    }
  };

  // Aksi Coba Lagi Tantangan Lompat Level
  const handleRetryJumpQuestion = () => {
    if (isJumpTransitioningRef.current) return;
    setJumpSelectedAnswer(null);
    setJumpHasSubmitted(false);
    setJumpIsCorrect(false);
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
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800 pb-12">
      {/* 1. Navbar Utama */}
      <Navbar />

      {/* 2. Konten Utama */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col animate-fade-in">
        {/* Navigasi Breadcrumb */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-blue-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-white font-medium flex items-center space-x-1 transition-colors text-blue-200"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span className="text-blue-300/50">/</span>
            <button
              onClick={() => {
                setActiveBab(null);
                setJumpChallengeBab(null);
                setSelectedSubject(null);
              }}
              className={`font-medium hover:text-white transition-colors ${
                !selectedSubject ? 'text-white font-bold' : 'text-blue-200'
              }`}
            >
              Modul Materi Pembelajaran
            </button>
            {selectedSubject && (
              <>
                <span className="text-blue-300/50">/</span>
                <span className="text-white font-semibold">
                  {currentSubject?.title}
                </span>
              </>
            )}
            {activeBab && (
              <>
                <span className="text-blue-300/50">/</span>
                <span className="text-amber-300 font-medium truncate max-w-[150px] sm:max-w-xs">
                  Materi {activeBab.no}: {activeBab.judul}
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
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 hover:text-blue-700 text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {activeBab || jumpChallengeBab
                ? 'Kembali ke Peta Materi'
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
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Pilih Mata Pelajaran
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-md mx-auto">
                Pilih mata pelajaran untuk melihat peta materi terstruktur dan latihan berjenjang.
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
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                    }}
                    className="group relative overflow-hidden p-6 rounded-2xl bg-white border-2 border-[#047857] hover:border-[#047857] hover:ring-4 hover:ring-[#047857]/20 hover:shadow-2xl hover:shadow-[#047857]/20 hover:-translate-y-2 active:scale-[0.985] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between select-none"
                  >
                    {/* Interactive Cursor Spotlight Glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(4, 120, 87, 0.1), transparent 75%)',
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg] group-hover:shadow-md group-hover:bg-[#D1FAE5]">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] transition-all duration-300 group-hover:scale-105 shadow-2xs">
                          21 Topik Materi
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#261C14] group-hover:text-[#047857] transition-colors duration-200">
                        Bahasa Indonesia
                      </h3>
                      <p className="text-xs text-[#6E6258] mt-2 leading-relaxed">
                        Huruf kapital, kata depan, tanda baca, kalimat efektif, sinonim/antonim, puisi, prosa, hingga analisis inferensial teks.
                      </p>

                      {/* Bar Progres */}
                      <div className="mt-4 pt-3 border-t border-[#E6DFD5]">
                        <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium text-[#6E6258]">
                          <span>Progres: {biDone} dari 21 Materi</span>
                          <span className="text-[#047857] font-semibold">{biPercent}%</span>
                        </div>
                        <div className="w-full bg-[#F2ECE4] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#047857] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(4, biPercent)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-5 pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-bold text-[#047857] transition-all">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Buka Peta 21 Materi Bahasa Indonesia
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center group-hover:translate-x-1.5 group-hover:bg-[#047857] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <ChevronRight className="w-4 h-4" />
                      </div>
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
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
                    }}
                    className="group relative overflow-hidden p-6 rounded-2xl bg-white border-2 border-[#881337] hover:border-[#881337] hover:ring-4 hover:ring-[#881337]/20 hover:shadow-2xl hover:shadow-[#881337]/20 hover:-translate-y-2 active:scale-[0.985] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between select-none"
                  >
                    {/* Interactive Cursor Spotlight Glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(136, 19, 55, 0.1), transparent 75%)',
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FFF1F2] text-[#881337] border border-[#FECDD3] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[4deg] group-hover:shadow-md group-hover:bg-[#FFE4E6]">
                          <Calculator className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF1F2] text-[#881337] border border-[#FECDD3] transition-all duration-300 group-hover:scale-105 shadow-2xs">
                          12 Topik Materi
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#261C14] group-hover:text-[#881337] transition-colors duration-200">
                        Matematika
                      </h3>
                      <p className="text-xs text-[#6E6258] mt-2 leading-relaxed">
                        Operasi hitung campuran, skala & perbandingan, KPK/FPB, bilangan pangkat, kecepatan, geometri, sudut, dan pengelolaan data.
                      </p>

                      {/* Bar Progres */}
                      <div className="mt-4 pt-3 border-t border-[#E6DFD5]">
                        <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium text-[#6E6258]">
                          <span>Progres: {mtkDone} dari 12 Materi</span>
                          <span className="text-[#881337] font-semibold">{mtkPercent}%</span>
                        </div>
                        <div className="w-full bg-[#F2ECE4] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#881337] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(4, mtkPercent)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-5 pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-bold text-[#881337] transition-all">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        Buka Peta 12 Materi Matematika
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center group-hover:translate-x-1.5 group-hover:bg-[#881337] group-hover:text-white transition-all duration-300 shadow-2xs">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* --- TAHAP 2: PEMBELAJARAN MATERI ATAU KUIS PADA LEVEL TERPILIH --- */}
        {selectedSubject && activeBab && (
          <div className="bg-white border border-slate-200 rounded-lg w-full shadow-sm overflow-hidden p-4 sm:p-6 animate-fade-in">
            {/* Header Baca Materi */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveBab(null)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Kembali ke Peta Petualangan"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      MATERI {activeBab.no} DARI {currentLevels.length} • {currentSubject.title.toUpperCase()}
                    </span>
                    {isLevelCompleted(activeBab.id) && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                        <Check className="w-3 h-3 stroke-[2.5]" />
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
                  setQuizMistakes(0);
                  isQuizTransitioningRef.current = false;
                  setIsQuizTransitioning(false);
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
                        className={`w-7 h-1.5 rounded-full transition-all duration-300 ${
                          i < currentQuizIndex
                            ? 'bg-emerald-600'
                            : i === currentQuizIndex
                            ? selectedSubject === 'bahasa_indonesia'
                              ? 'bg-[#047857]'
                              : 'bg-[#881337]'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Kartu Soal */}
                <div className="p-5 sm:p-6 rounded-lg bg-slate-50 border border-slate-200 shadow-sm relative">
                  {quizFinished ? (
                    <div className="text-center py-6 space-y-4 animate-fade-in">
                      <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">
                        Materi {activeBab.no} Tuntas!
                      </h4>

                      {/* Tampilan Bintang yang Didapatkan */}
                      <div className="flex items-center justify-center space-x-2 py-1">
                        {[1, 2, 3].map((starNum) => {
                          const finalStars = quizMistakes === 0 ? 3 : quizMistakes === 1 ? 2 : 1;
                          const isEarned = starNum <= finalStars;
                          return (
                            <div
                              key={starNum}
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isEarned
                                  ? 'bg-amber-50 border border-amber-300'
                                  : 'bg-slate-100 border border-slate-200 opacity-40'
                              }`}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  isEarned
                                    ? 'text-amber-500 fill-amber-400'
                                    : 'text-slate-300 fill-slate-200'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-amber-800">
                        {quizMistakes === 0
                          ? 'Sempurna! Kamu meraih 3 Bintang Emas.'
                          : quizMistakes === 1
                          ? 'Hebat! Kamu meraih 2 Bintang Emas.'
                          : 'Bagus! Kamu berhasil meraih 1 Bintang.'}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Kamu berhasil menjawab semua soal dengan tepat. Materi berikutnya kini telah terbuka di peta materi!
                      </p>

                      <div className="pt-2">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] text-xs font-bold shadow-2xs">
                          <Sparkles className="w-3.5 h-3.5 text-[#047857]" />
                          <span>+{quizMistakes === 0 ? 90 : quizMistakes === 1 ? 80 : 70} EXP Didapatkan (Materi Selesai)!</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed mb-4">
                        {activeBab.soalLatihan[currentQuizIndex].pertanyaan}
                      </h4>

                      {/* Pilihan Jawaban */}
                      <div className="space-y-2">
                        {activeBab.soalLatihan[currentQuizIndex].pilihan.map((opt, idx) => {
                          const isSelected = selectedAnswer === idx;
                          const isWrongSubmitted = hasSubmittedAnswer && !isAnswerCorrect && selectedAnswer === idx;
                          const isLocked = isQuizTransitioning || (hasSubmittedAnswer && isAnswerCorrect);

                          return (
                            <button
                              key={idx}
                              disabled={isLocked}
                              onClick={() => {
                                if (isLocked) return;
                                setSelectedAnswer(idx);
                                setHasSubmittedAnswer(false);
                                setIsAnswerCorrect(false);
                              }}
                              className={`w-full p-3 rounded-lg text-left text-xs sm:text-sm font-medium border transition-all duration-300 flex items-center justify-between ${
                                isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                              } ${
                                isWrongSubmitted
                                  ? 'bg-red-50 border-red-500 text-red-900'
                                  : isSelected
                                  ? selectedSubject === 'bahasa_indonesia'
                                    ? 'bg-[#ECFDF5] border-[#047857] text-[#064E3B]'
                                    : 'bg-[#FFF1F2] border-[#881337] text-[#4C0519]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-semibold transition-colors ${
                                  isWrongSubmitted
                                    ? 'border-red-500 bg-red-600 text-white'
                                    : isSelected
                                    ? selectedSubject === 'bahasa_indonesia'
                                      ? 'border-[#047857] bg-[#047857] text-white'
                                      : 'border-[#881337] bg-[#881337] text-white'
                                    : 'border-slate-300 text-slate-400'
                                }`}
                              >
                                {String.fromCharCode(65 + idx)}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Petunjuk jika salah */}
                      {(showQuizHint || (hasSubmittedAnswer && !isAnswerCorrect)) && (
                        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs animate-fade-in flex items-start space-x-2.5">
                          <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="block font-semibold">Petunjuk Soal:</strong>
                            <span className="text-slate-700 mt-0.5 block leading-relaxed">
                              {activeBab.soalLatihan[currentQuizIndex].hint}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Notifikasi benar */}
                      {hasSubmittedAnswer && isAnswerCorrect && (
                        <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs animate-fade-in flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold">Jawaban Benar! Melanjutkan ke soal berikutnya...</span>
                        </div>
                      )}

                      {/* Tombol Aksi Kuis */}
                      <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                        <button
                          onClick={() => setInQuizMode(false)}
                          className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          <BookMarked
                            className={`w-3.5 h-3.5 ${
                              selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'
                            }`}
                          />
                          <span>Kembali Baca Materi</span>
                        </button>

                        <button
                          onClick={
                            hasSubmittedAnswer && !isAnswerCorrect
                              ? handleRetryQuizQuestion
                              : handleCheckQuizAnswer
                          }
                          disabled={
                            isQuizTransitioning ||
                            (hasSubmittedAnswer && isAnswerCorrect) ||
                            (!hasSubmittedAnswer && selectedAnswer === null)
                          }
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                            isQuizTransitioning || (hasSubmittedAnswer && isAnswerCorrect)
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                              : hasSubmittedAnswer && !isAnswerCorrect
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer'
                              : selectedAnswer !== null
                              ? selectedSubject === 'bahasa_indonesia'
                                ? 'bg-[#047857] hover:bg-[#065F46] text-white cursor-pointer'
                                : 'bg-[#881337] hover:bg-[#700D2B] text-white cursor-pointer'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {isQuizTransitioning || (hasSubmittedAnswer && isAnswerCorrect)
                            ? 'Memproses...'
                            : hasSubmittedAnswer && !isAnswerCorrect
                            ? 'Coba Lagi'
                            : 'Periksa Jawaban'}
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
            <div className={`bg-white rounded-2xl p-5 sm:p-6 text-[#261C14] border-2 shadow-sm relative ${
              selectedSubject === 'bahasa_indonesia' ? 'border-[#047857]' : 'border-[#881337]'
            }`}>
              <div className="relative z-10 space-y-4">
                {/* Baris Atas Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#FAF7F2] text-[11px] font-semibold text-[#6E6258] border border-[#E6DFD5] mb-2">
                      <currentSubject.icon className={`w-3.5 h-3.5 transition-colors ${selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'}`} />
                      <span>{currentSubject.title} • {currentLevels.length} Topik Materi</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#261C14]">
                      Peta Materi {currentSubject.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#6E6258] max-w-xl mt-0.5 leading-relaxed">
                      Pelajari materi secara bertahap atau buka lebih awal dengan{' '}
                      <strong className={`transition-colors ${selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'}`}>Tantangan Lompat Materi</strong>.
                    </p>
                  </div>

                  {/* Tombol Panduan & Mode Tampilan */}
                  <div className="flex flex-col items-stretch sm:items-end space-y-2 flex-shrink-0 self-start sm:self-center">
                    {/* Tombol Buku Panduan - Sesuai Mata Pelajaran */}
                    <button
                      onClick={() => setShowGuideModal(true)}
                      className={`w-full sm:w-auto min-w-[130px] px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 border-2 cursor-pointer shadow-xs ${
                        selectedSubject === 'matematika'
                          ? 'bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#881337] border-[#881337]'
                          : 'bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#047857] border-[#047857]'
                      }`}
                      title={`Buku Panduan ${currentSubject?.title || ''}`}
                    >
                      {selectedSubject === 'matematika' ? (
                        <Calculator className="w-4 h-4 text-[#881337]" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-[#047857]" />
                      )}
                      <span>Buku Panduan</span>
                    </button>

                    {/* Switcher Mode Tampilan (Peta / Daftar) */}
                    <div className="w-full sm:w-auto min-w-[130px] bg-[#FAF7F2] p-1 rounded-lg flex items-center justify-between border-2 border-slate-300">
                      <button
                        onClick={() => setViewMode('roadmap')}
                        className={`flex-1 py-1 px-2.5 rounded-md text-xs font-medium flex items-center justify-center space-x-1.5 transition-all duration-300 cursor-pointer ${
                          viewMode === 'roadmap'
                            ? `bg-white ${selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'} font-semibold shadow-xs`
                            : 'text-[#6E6258] hover:text-[#261C14]'
                        }`}
                        title="Tampilan Peta Jalan"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Peta</span>
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 py-1 px-2.5 rounded-md text-xs font-medium flex items-center justify-center space-x-1.5 transition-all duration-300 cursor-pointer ${
                          viewMode === 'grid'
                            ? `bg-white ${selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'} font-semibold shadow-xs`
                            : 'text-[#6E6258] hover:text-[#261C14]'
                        }`}
                        title="Tampilan Daftar Grid"
                      >
                        <List className="w-3.5 h-3.5" />
                        <span>Daftar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Indikator Status */}
                <div className="pt-3 border-t border-[#E6DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center justify-between mb-1.5 text-[11px] font-medium text-[#6E6258]">
                      <span>Progres {currentSubject.title}</span>
                      <span className="font-semibold text-[#261C14]">
                        {completedCount} dari {currentLevels.length} Selesai ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#F2ECE4] rounded-full h-2 overflow-hidden">
                      <div
                        className={`${selectedSubject === 'bahasa_indonesia' ? 'bg-[#047857]' : 'bg-[#881337]'} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(4, progressPercent)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-[#E6DFD5] font-medium text-[#6E6258] flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-[#D97E26]" />
                      <span>
                        Fokus: Materi{' '}
                        {currentActiveLevelIndex !== -1
                          ? currentLevels[currentActiveLevelIndex].no
                          : currentLevels.length}
                      </span>
                    </span>

                    <span className="px-2.5 py-1 rounded-md bg-[#FEF7EE] border border-[#FCD9BD] font-medium text-[#D97E26] flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-[#E5A875] text-[#D97E26]" />
                      <span>
                        {currentLevels.reduce((acc, bab) => acc + getLevelStars(bab.id), 0)}/{currentLevels.length * 3} Bintang
                      </span>
                    </span>

                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="text-[#8C7E72] hover:text-[#C93B3B] transition-colors text-[10px] underline ml-1 cursor-pointer"
                      title="Reset progres untuk mulai dari awal"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pencarian Materi Instan */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C7E72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik..."
                className={`w-full pl-10 pr-9 py-2.5 rounded-lg bg-white border border-[#E6DFD5] text-xs sm:text-sm text-[#261C14] placeholder-[#8C7E72] focus:outline-hidden ${
                  selectedSubject === 'bahasa_indonesia'
                    ? 'focus:border-[#047857] focus:ring-1 focus:ring-[#047857]'
                    : 'focus:border-[#881337] focus:ring-1 focus:ring-[#881337]'
                } shadow-xs transition-all duration-300`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7E72] hover:text-[#261C14] cursor-pointer"
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
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                        isCompleted
                          ? selectedSubject === 'bahasa_indonesia'
                            ? 'bg-white border-[#047857] shadow-xs'
                            : 'bg-white border-[#881337] shadow-xs'
                          : isCurrent
                          ? selectedSubject === 'bahasa_indonesia'
                            ? 'bg-white border-[#047857] ring-2 ring-[#047857]/40 shadow-xs'
                            : 'bg-white border-[#881337] ring-2 ring-[#881337]/40 shadow-xs'
                          : isUnlocked
                          ? 'bg-white border-slate-300 hover:border-slate-500 shadow-2xs'
                          : 'bg-[#FAF7F2] border-slate-300 text-[#8C7E72]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span
                            className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                              isCompleted
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#047857] text-white'
                                  : 'bg-[#881337] text-white'
                                : isCurrent
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#047857] text-white'
                                  : 'bg-[#881337] text-white'
                                : isUnlocked
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]'
                                  : 'bg-[#FFF1F2] text-[#881337] border border-[#FECDD3]'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {bab.no}
                          </span>

                          {isCompleted ? (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center space-x-1 ${
                                selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                                  : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[2.5]" />
                              <span>Tuntas</span>
                            </span>
                          ) : isCurrent ? (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                                selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                                  : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                              }`}
                            >
                              Fokus Belajar
                            </span>
                          ) : isUnlocked ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              Terbuka
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200 flex items-center space-x-1">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Terkunci</span>
                            </span>
                          )}
                        </div>

                        <h4
                          className={`text-sm font-semibold leading-snug ${
                            isCompleted
                              ? 'text-slate-900'
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

                        {/* Capaian Bintang Level di Grid */}
                        <div className="flex items-center space-x-1 mt-2.5">
                          {[1, 2, 3].map((s) => {
                            const stars = getLevelStars(bab.id);
                            return (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= stars
                                    ? 'text-amber-500 fill-amber-400'
                                    : 'text-slate-300 fill-slate-100 stroke-slate-300'
                                }`}
                              />
                            );
                          })}
                          <span className="text-[10px] font-semibold text-slate-500 ml-1">
                            {getLevelStars(bab.id) > 0 ? `${getLevelStars(bab.id)}/3 ⭐` : '0/3'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                        <span className={isUnlocked ? 'text-blue-600' : 'text-slate-400'}>
                          {isUnlocked ? 'Buka Materi' : 'Lompat Materi ⚡'}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* --- Winding Path Petualangan --- */
              <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-8 shadow-sm relative">
                {/* Subtitle Alur */}
                <div className="text-center mb-6">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Peta Belajar {currentLevels.length} Materi • {currentSubject.title}
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Klik materi untuk belajar bertahap, atau raih 3 bintang di setiap kuis pemahaman.
                  </p>
                </div>

                {/* Kontainer Alur Zig-Zag (Roadmap Path) */}
                <div className="relative max-w-md mx-auto py-4 flex flex-col items-center space-y-7">
                  {currentLevels.map((bab, index) => {
                    const isCompleted = isLevelCompleted(bab.id);
                    const isUnlocked = isLevelUnlocked(index, bab, currentLevels);
                    const isCurrent = index === currentActiveLevelIndex;
                    const offsetClass = getPathOffset(index);
                    const starsEarned = getLevelStars(bab.id);

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
                            <div
                              className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full ${
                                selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#047857] border-[#065F46]'
                                  : 'bg-[#881337] border-[#700D2B]'
                              } text-white font-bold text-[11px] shadow-md flex items-center space-x-1.5 z-20 border animate-bounce select-none pointer-events-none`}
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                              <span>Mulai di Sini</span>
                              <div
                                className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] ${
                                  selectedSubject === 'bahasa_indonesia'
                                    ? 'border-t-[#047857]'
                                    : 'border-t-[#881337]'
                                }`}
                              />
                            </div>
                          )}

                          {/* Tombol Lingkaran Interaktif Tactile 3D Node */}
                          <button
                            onClick={() => setSelectedLevelModal(bab)}
                            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center font-bold border-2 transition-all duration-150 cursor-pointer relative z-10 select-none group ${
                              isCompleted
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#047857] border-[#065F46] text-white shadow-[0_6px_0_0_#064E3B] hover:shadow-[0_7px_0_0_#064E3B] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#064E3B]'
                                  : 'bg-[#881337] border-[#700D2B] text-white shadow-[0_6px_0_0_#4C0519] hover:shadow-[0_7px_0_0_#4C0519] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#4C0519]'
                                : isCurrent
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#047857] border-[#065F46] text-white shadow-[0_6px_0_0_#064E3B] hover:shadow-[0_7px_0_0_#064E3B] ring-4 ring-offset-2 ring-[#047857]/30 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#064E3B]'
                                  : 'bg-[#881337] border-[#700D2B] text-white shadow-[0_6px_0_0_#4C0519] hover:shadow-[0_7px_0_0_#4C0519] ring-4 ring-offset-2 ring-[#881337]/30 hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#4C0519]'
                                : isUnlocked
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-white border-[#D8CDC2] text-[#261C14] shadow-[0_6px_0_0_#C5B8AC] hover:border-[#047857] hover:text-[#047857] hover:shadow-[0_7px_0_0_#064E3B] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#C5B8AC]'
                                  : 'bg-white border-[#D8CDC2] text-[#261C14] shadow-[0_6px_0_0_#C5B8AC] hover:border-[#881337] hover:text-[#881337] hover:shadow-[0_7px_0_0_#4C0519] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#C5B8AC]'
                                : 'bg-[#F2ECE4] border-[#E6DFD5] text-[#8C7E72] shadow-[0_5px_0_0_#D8CDC2] hover:bg-[#EAE2D8] hover:text-[#6E6258] hover:shadow-[0_6px_0_0_#C5B8AC] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_0_#D8CDC2]'
                            }`}
                            title={`Materi ${bab.no}: ${bab.judul} (${
                              isCompleted ? 'Tuntas' : isUnlocked ? 'Terbuka' : 'Terkunci - Klik untuk Lompat'
                            })`}
                          >
                            {/* Ikon di dalam node */}
                            {isCompleted ? (
                              <Check className="w-8 h-8 stroke-[3] group-hover:scale-110 transition-transform" />
                            ) : isCurrent ? (
                              <BookOpen className="w-7 h-7 group-hover:scale-110 transition-transform" />
                            ) : isUnlocked ? (
                              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                                <span className="text-xl font-black leading-none">{bab.no}</span>
                                <span className="text-[9px] font-bold uppercase opacity-75 mt-0.5">Materi</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center opacity-75 group-hover:opacity-100 transition-opacity">
                                <Lock className="w-5 h-5 mb-0.5" />
                                <span className="text-[9px] font-bold">{bab.no}</span>
                              </div>
                            )}

                            {/* Badge Bintang jika Tuntas */}
                            {isCompleted && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-950 border-2 border-white flex items-center justify-center text-xs font-black shadow-xs">
                                ★
                              </div>
                            )}
                          </button>

                          {/* Pill Judul Level (Hanya Indikator, Bukan Tombol) */}
                          <div
                            className={`mt-2.5 px-3.5 py-1.5 rounded-lg text-center select-none max-w-[170px] sm:max-w-[200px] border shadow-2xs transition-all duration-300 ${
                              isCompleted
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                                  : 'bg-[#FFF1F2] border-[#FECDD3] text-[#881337]'
                                : isCurrent
                                ? `${
                                    selectedSubject === 'bahasa_indonesia'
                                      ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                                      : 'bg-[#FFF1F2] border-[#FECDD3] text-[#881337]'
                                  } font-bold shadow-xs`
                                : isUnlocked
                                ? 'bg-white border-[#E6DFD5] text-[#261C14]'
                                : 'bg-[#FAF7F2] border-[#E6DFD5] text-[#8C7E72]'
                            }`}
                          >
                            <span className="block text-[10px] font-semibold uppercase tracking-wider opacity-75">
                              Materi {bab.no}
                            </span>
                            <span className="block text-xs font-medium truncate">
                              {bab.judul}
                            </span>
                          </div>

                          {/* 3 Bintang Horizontal Capaian Materi (Indikator Saja) */}
                          <div
                            className="flex items-center justify-center space-x-1.5 mt-2 select-none py-1 px-2.5 rounded-full bg-white border border-[#E6DFD5] shadow-2xs"
                            title={`Materi ${bab.no}: Meraih ${starsEarned} dari 3 Bintang`}
                          >
                            {[1, 2, 3].map((starIdx) => {
                              const isFilled = starIdx <= starsEarned;
                              return (
                                <Star
                                  key={starIdx}
                                  className={`w-3.5 h-3.5 transition-colors ${
                                    isFilled
                                      ? 'text-amber-500 fill-amber-400'
                                      : 'text-[#D4C8BC] fill-[#FAF7F2] stroke-[#D4C8BC]'
                                  }`}
                                />
                              );
                            })}
                          </div>
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
                              className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-150 cursor-pointer ${
                                completedCount >= milestoneItem.requiredLevel
                                  ? 'bg-[#FEF7EE] border-amber-300 text-amber-700 shadow-[0_5px_0_0_#D97E26] hover:shadow-[0_6px_0_0_#D97E26] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none'
                                  : 'bg-[#F2ECE4] border-[#E6DFD5] text-[#8C7E72] shadow-[0_4px_0_0_#D8CDC2] hover:bg-[#EAE2D8] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none'
                              }`}
                            >
                              <Gift className="w-7 h-7 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="mt-2 px-2.5 py-0.5 rounded-full bg-white border border-[#E6DFD5] text-[10px] font-bold text-[#6E6258] shadow-2xs group-hover:border-[#8C7E72]">
                              {completedCount >= milestoneItem.requiredLevel
                                ? '🎁 Peti Terbuka'
                                : `Peti Materi ${milestoneItem.requiredLevel}`}
                            </div>
                          </div>
                        )}

                        {/* --- GRAND TROPHY (Puncak Akhir Mapel) --- */}
                        {isFinalLevel && (
                          <div
                            onClick={() =>
                              setMilestoneModal({
                                title: milestoneItem?.title || `Piala Juara ${currentSubject.title}`,
                                desc: milestoneItem?.desc || `Piala penghargaan setelah menuntaskan seluruh ${currentLevels.length} Materi ${currentSubject.title}.`,
                                requiredLevel: currentLevels.length,
                                unlocked: completedCount === currentLevels.length,
                                reward: milestoneItem?.reward || `Gelar Maestro ${currentSubject.title} TKA SD 100%`,
                              })
                            }
                            className="relative flex flex-col items-center pt-4 pb-2 cursor-pointer group animate-fade-in"
                          >
                            <div
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-150 cursor-pointer ${
                                completedCount === currentLevels.length
                                  ? 'bg-amber-100 border-amber-400 text-amber-800 shadow-[0_6px_0_0_#B8731E] hover:shadow-[0_7px_0_0_#B8731E] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none ring-4 ring-amber-300/40'
                                  : 'bg-[#F2ECE4] border-[#E6DFD5] text-[#8C7E72] shadow-[0_4px_0_0_#D8CDC2] hover:bg-[#EAE2D8] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none'
                              }`}
                            >
                              <Trophy className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="mt-2 text-center">
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs inline-block transition-transform group-hover:scale-105 ${
                                  completedCount === currentLevels.length
                                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                                    : 'bg-[#F2ECE4] text-[#6E6258] border-[#E6DFD5]'
                                }`}
                              >
                                {completedCount === currentLevels.length
                                  ? `👑 MAESTRO ${currentSubject.title.toUpperCase()}`
                                  : `Piala Puncak (Materi ${currentLevels.length} Selesai)`}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-lg border border-[#E6DFD5] shadow-xl max-w-md w-full overflow-hidden relative animate-fade-in">
              {/* Header Modal */}
              <div className="p-5 bg-[#1F1914] text-white relative border-b border-[#33261D]">
                <button
                  onClick={() => setSelectedLevelModal(null)}
                  className="absolute right-4 top-4 w-7 h-7 rounded-lg bg-[#2D241C] hover:bg-[#3D2E22] text-[#D4C8BC] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#2D241C] text-[#D4C8BC] border border-[#3D3126]">
                    MATERI {selectedLevelModal.no} DARI {currentLevels.length} • {currentSubject?.title.toUpperCase()}
                  </span>
                  {isCompleted ? (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center space-x-1 ${
                        selectedSubject === 'bahasa_indonesia'
                          ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                          : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                      }`}
                    >
                      <span>Tuntas</span>
                      <span>•</span>
                      <span>{getLevelStars(selectedLevelModal.id)}/3 ⭐</span>
                    </span>
                  ) : isUnlocked ? (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        selectedSubject === 'bahasa_indonesia'
                          ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                          : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                      }`}
                    >
                      Terbuka
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#2D241C] text-[#8C7E72] border border-[#3D3126]">
                      Terkunci
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{selectedLevelModal.judul}</h3>
              </div>

              {/* Body Modal */}
              <div className="p-5 space-y-4">
                {/* Capaian Bintang Materi */}
                <div className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#6E6258] font-medium block uppercase tracking-wider">
                      Capaian Kuis Pemahaman
                    </span>
                    <span className="text-xs font-semibold text-[#261C14]">
                      {isCompleted
                        ? `${getLevelStars(selectedLevelModal.id)} dari 3 Bintang Terkumpul`
                        : isUnlocked
                        ? 'Belum dikerjakan (0/3 Bintang)'
                        : 'Materi masih terkunci'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3].map((starIdx) => {
                      const isFilled = starIdx <= getLevelStars(selectedLevelModal.id);
                      return (
                        <div
                          key={starIdx}
                          className={`w-7 h-7 rounded-md flex items-center justify-center ${
                            isFilled
                              ? 'bg-amber-50 border border-amber-300'
                              : 'bg-[#F2ECE4] border border-[#E6DFD5]'
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFilled
                                ? 'text-amber-500 fill-amber-400'
                                : 'text-[#8C7E72] fill-[#FAF7F2]'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6258]">
                    Ringkasan Materi
                  </h5>
                  <p className="text-xs sm:text-sm text-[#261C14] mt-1 leading-relaxed">
                    {selectedLevelModal.ringkasan}
                  </p>
                </div>

                {selectedLevelModal.konsepKunci && (
                  <div className="p-3 rounded-lg bg-[#FEF7EE] border border-[#F6D8B8] text-xs text-[#261C14]">
                    <strong className="text-[#D97E26] block font-semibold mb-0.5">Konsep Inti:</strong>
                    <span>{selectedLevelModal.konsepKunci}</span>
                  </div>
                )}

                {/* Status Penjelasan */}
                {!isUnlocked && (
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-xs text-[#6E6258] space-y-2">
                    <div className="flex items-start space-x-2">
                      <Lock className="w-4 h-4 text-[#8C7E72] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold text-[#261C14]">
                          Materi ini masih terkunci!
                        </strong>
                        <p className="mt-0.5 text-[#6E6258] leading-relaxed">
                          Selesaikan Materi {prevBab?.no} ({prevBab?.judul}) terlebih dahulu,{' '}
                          <strong className={selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'}>atau kamu dapat langsung melompat</strong>{' '}
                          ke materi ini dengan menjawab tantangan soal pemahaman materi!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tombol Aksi */}
                <div className="pt-2 space-y-2">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleOpenBab(selectedLevelModal)}
                      className={`w-full py-2.5 rounded-lg text-white font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-xs ${
                        selectedSubject === 'bahasa_indonesia'
                          ? 'bg-[#047857] hover:bg-[#065F46]'
                          : 'bg-[#881337] hover:bg-[#700D2B]'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isCompleted ? 'Pelajari Ulang Materi' : 'Mulai Belajar Materi'}</span>
                    </button>
                  ) : (
                    /* Opsi Lompat Materi */
                    <button
                      onClick={() => handleStartJumpChallenge(selectedLevelModal)}
                      className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Lompat ke Materi Ini (Tantangan Kuis)</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedLevelModal(null)}
                    className="w-full py-2 rounded-lg bg-[#F2ECE4] hover:bg-[#E6DFD5] text-[#261C14] font-medium text-xs transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* --- MODAL 2: TANTANGAN LOMPAT MATERI (JUMP CHALLENGE) --- */}
      {jumpChallengeBab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-lg border border-[#E6DFD5] shadow-xl max-w-lg w-full overflow-hidden relative animate-fade-in my-auto">
            {/* Header Tantangan Lompat */}
            <div className="p-5 bg-[#1F1914] text-white relative border-b border-[#33261D]">
              <button
                onClick={() => setJumpChallengeBab(null)}
                className="absolute right-4 top-4 w-7 h-7 rounded-lg bg-[#2D241C] hover:bg-[#3D2E22] text-[#D4C8BC] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#2D241C] text-[10px] font-semibold text-[#E5A875] border border-[#3D3126] uppercase tracking-wider mb-2">
                <Zap className="w-3 h-3 fill-current text-[#E5A875]" />
                <span>Tantangan Lompat Materi • {currentSubject?.title}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Uji Pemahaman: Materi {jumpChallengeBab.no} ({jumpChallengeBab.judul})
              </h3>
              <p className="text-xs text-[#D4C8BC] mt-0.5">
                Jawab soal materi ini untuk langsung membuka Materi {jumpChallengeBab.no} lebih awal.
              </p>
            </div>

            {/* Body Tantangan */}
            <div className="p-5 sm:p-6">
              {jumpFinished ? (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#E8F2EF] text-[#286657] flex items-center justify-center mx-auto border border-[#BCD9D0]">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#261C14]">
                      Tantangan Berhasil Dituntaskan!
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6E6258] max-w-sm mx-auto mt-1 leading-relaxed">
                      Kamu telah membuktikan kemampuanmu. <strong>Materi {jumpChallengeBab.no} ({jumpChallengeBab.judul})</strong> kini resmi <strong>TERBUKA</strong> untukmu!
                    </p>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        const target = jumpChallengeBab;
                        setJumpChallengeBab(null);
                        handleOpenBab(target);
                      }}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white font-semibold text-xs transition-all duration-300 cursor-pointer shadow-xs ${
                        selectedSubject === 'bahasa_indonesia'
                          ? 'bg-[#047857] hover:bg-[#065F46]'
                          : 'bg-[#881337] hover:bg-[#700D2B]'
                      }`}
                    >
                      Langsung Baca Materi
                    </button>
                    <button
                      onClick={() => setJumpChallengeBab(null)}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#F2ECE4] hover:bg-[#E6DFD5] text-[#261C14] font-medium text-xs transition-colors cursor-pointer"
                    >
                      Kembali ke Peta Materi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Stepper Progress */}
                  <div className="flex items-center justify-between text-xs font-medium text-[#6E6258] border-b border-[#E6DFD5] pb-2">
                    <span>Soal Tantangan {jumpQuizIndex + 1} dari {jumpChallengeBab.soalLatihan.length}</span>
                    <div className="flex space-x-1.5">
                      {jumpChallengeBab.soalLatihan.map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-1.5 rounded-full transition-colors ${
                            i < jumpQuizIndex
                              ? selectedSubject === 'bahasa_indonesia'
                                ? 'bg-[#047857]'
                                : 'bg-[#881337]'
                              : i === jumpQuizIndex
                              ? selectedSubject === 'bahasa_indonesia'
                                ? 'bg-[#047857]'
                                : 'bg-[#881337]'
                              : 'bg-[#E6DFD5]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pertanyaan */}
                  <h4 className="text-xs sm:text-sm font-semibold text-[#261C14] leading-relaxed">
                    {jumpChallengeBab.soalLatihan[jumpQuizIndex].pertanyaan}
                  </h4>

                  {/* Opsi Jawaban */}
                  <div className="space-y-2">
                    {jumpChallengeBab.soalLatihan[jumpQuizIndex].pilihan.map((opt, idx) => {
                      const isSelected = jumpSelectedAnswer === idx;
                      const isWrongSubmitted = jumpHasSubmitted && !jumpIsCorrect && jumpSelectedAnswer === idx;
                      const isLocked = isJumpTransitioning || (jumpHasSubmitted && jumpIsCorrect);

                      return (
                        <button
                          key={idx}
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return;
                            setJumpSelectedAnswer(idx);
                            setJumpHasSubmitted(false);
                            setJumpIsCorrect(false);
                          }}
                          className={`w-full p-3 rounded-lg text-left text-xs sm:text-sm font-medium border transition-all duration-300 flex items-center justify-between ${
                            isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                          } ${
                            isWrongSubmitted
                              ? 'bg-[#FDF1F1] border-[#C93B3B] text-[#A82828]'
                              : isSelected
                              ? selectedSubject === 'bahasa_indonesia'
                                ? 'bg-[#ECFDF5] border-[#047857] text-[#261C14]'
                                : 'bg-[#FFF1F2] border-[#881337] text-[#261C14]'
                              : 'bg-white border-[#E6DFD5] text-[#261C14] hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <span>{opt}</span>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-semibold transition-colors ${
                              isWrongSubmitted
                                ? 'border-[#C93B3B] bg-[#C93B3B] text-white'
                                : isSelected
                                ? selectedSubject === 'bahasa_indonesia'
                                  ? 'border-[#047857] bg-[#047857] text-white'
                                  : 'border-[#881337] bg-[#881337] text-white'
                                : 'border-[#E6DFD5] text-[#8C7E72]'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint jika salah */}
                  {(showJumpHint || (jumpHasSubmitted && !jumpIsCorrect)) && (
                    <div className="p-3 rounded-lg bg-[#FEF7EE] border border-[#F6D8B8] text-[#D97E26] text-xs animate-fade-in flex items-start space-x-2">
                      <HelpCircle className="w-4 h-4 text-[#D97E26] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">Petunjuk:</strong>
                        <span className="text-[#261C14] leading-relaxed">
                          {jumpChallengeBab.soalLatihan[jumpQuizIndex].hint}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Feedback Benar */}
                  {jumpHasSubmitted && jumpIsCorrect && (
                    <div
                      className={`p-3 rounded-lg border text-xs animate-fade-in flex items-center space-x-2 ${
                        selectedSubject === 'bahasa_indonesia'
                          ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]'
                          : 'bg-[#FFF1F2] border-[#FECDD3] text-[#881337]'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          selectedSubject === 'bahasa_indonesia' ? 'text-[#047857]' : 'text-[#881337]'
                        }`}
                      />
                      <span className="font-semibold">Benar! Menuju ke soal berikutnya...</span>
                    </div>
                  )}

                  {/* Tombol Periksa */}
                  <div className="pt-3 border-t border-[#E6DFD5] flex items-center justify-between">
                    <button
                      onClick={() => setJumpChallengeBab(null)}
                      className="text-xs text-[#8C7E72] hover:text-[#261C14] cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      onClick={
                        jumpHasSubmitted && !jumpIsCorrect
                          ? handleRetryJumpQuestion
                          : handleCheckJumpAnswer
                      }
                      disabled={
                        isJumpTransitioning ||
                        (jumpHasSubmitted && jumpIsCorrect) ||
                        (!jumpHasSubmitted && jumpSelectedAnswer === null)
                      }
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        isJumpTransitioning || (jumpHasSubmitted && jumpIsCorrect)
                          ? 'bg-[#F2ECE4] text-[#8C7E72] cursor-not-allowed border border-[#E6DFD5]'
                          : jumpHasSubmitted && !jumpIsCorrect
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer shadow-xs'
                          : jumpSelectedAnswer !== null
                          ? selectedSubject === 'bahasa_indonesia'
                            ? 'bg-[#047857] hover:bg-[#065F46] text-white cursor-pointer shadow-xs'
                            : 'bg-[#881337] hover:bg-[#700D2B] text-white cursor-pointer shadow-xs'
                          : 'bg-[#F2ECE4] text-[#8C7E72] cursor-not-allowed'
                      }`}
                    >
                      {isJumpTransitioning || (jumpHasSubmitted && jumpIsCorrect)
                        ? 'Memproses...'
                        : jumpHasSubmitted && !jumpIsCorrect
                        ? 'Coba Lagi'
                        : 'Periksa Jawaban'}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs animate-fade-in">
          <div className={`bg-white rounded-2xl border-2 shadow-2xl max-w-md w-full overflow-hidden relative animate-fade-in ${
            selectedSubject === 'matematika' ? 'border-[#881337]' : 'border-[#047857]'
          }`}>
            <div className={`p-5 text-white border-b-2 relative ${
              selectedSubject === 'matematika' ? 'bg-[#881337] border-[#700D2B]' : 'bg-[#047857] border-[#065F46]'
            }`}>
              <button
                onClick={() => setShowGuideModal(false)}
                className="absolute right-4 top-4 w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-base sm:text-lg font-bold flex items-center space-x-2 text-white">
                {selectedSubject === 'matematika' ? (
                  <Calculator className="w-5 h-5 text-rose-200" />
                ) : (
                  <BookOpen className="w-5 h-5 text-emerald-200" />
                )}
                <span>Buku Panduan {currentSubject?.title || 'Materi'}</span>
              </h3>
              <p className="text-xs text-white/80 mt-0.5">
                Aturan & Cara Menuntaskan Materi Pembelajaran {currentSubject?.title || 'TKA SD'}
              </p>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-[#261C14] leading-relaxed">
              <div className="flex items-start space-x-3">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold flex-shrink-0 text-xs border ${
                  selectedSubject === 'matematika'
                    ? 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                    : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                }`}>
                  1
                </span>
                <div>
                  <strong className="block text-[#261C14] font-semibold">Posisi Awal Belajar</strong>
                  Hanya <strong>Materi 1</strong> pada masing-masing mata pelajaran yang terbuka di awal. Materi selanjutnya masih terkunci.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold flex-shrink-0 text-xs border ${
                  selectedSubject === 'matematika'
                    ? 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                    : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                }`}>
                  2
                </span>
                <div>
                  <strong className="block text-[#261C14] font-semibold">Membuka Materi Berurutan</strong>
                  Untuk membuka materi berikutnya secara bertahap, pelajari slide materi dan selesaikan 3 soal kuis pemahaman di akhir materi hingga benar.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold flex-shrink-0 text-xs border ${
                  selectedSubject === 'matematika'
                    ? 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                    : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                }`}>
                  3
                </span>
                <div>
                  <strong className="block text-[#261C14] font-semibold">Fitur Tantangan Lompat Materi</strong>
                  Ingin langsung belajar topik di materi tertentu? Kamu bisa membuka materi lebih awal dengan menyelesaikan <strong>Tantangan Kuis</strong> dari materi yang dituju!
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold flex-shrink-0 text-xs border ${
                  selectedSubject === 'matematika'
                    ? 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                    : 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                }`}>
                  4
                </span>
                <div>
                  <strong className="block text-[#261C14] font-semibold">Milestone Peti & Piala Puncak</strong>
                  Kumpulkan 3 bintang di setiap materi dan buka peti bonus di setiap tahapan, hingga Piala Maestro di puncak materi terakhir!
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold text-xs transition-all duration-300 cursor-pointer shadow-xs ${
                    selectedSubject === 'bahasa_indonesia'
                      ? 'bg-[#047857] hover:bg-[#065F46]'
                      : 'bg-[#881337] hover:bg-[#700D2B]'
                  }`}
                >
                  Saya Mengerti, Lanjutkan Petualangan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: MILESTONE PETI & PIALA --- */}
      {milestoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-lg border border-[#E6DFD5] shadow-xl max-w-sm w-full overflow-hidden relative text-center p-6 space-y-4 animate-fade-in">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto border ${
                milestoneModal.unlocked
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-[#F2ECE4] border-[#E6DFD5] text-[#8C7E72]'
              }`}
            >
              {milestoneModal.unlocked ? <Trophy className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6258]">
                Pencapaian Milestone
              </span>
              <h3 className="text-base font-bold text-[#261C14] mt-0.5">{milestoneModal.title}</h3>
              <p className="text-xs text-[#6E6258] mt-1 leading-relaxed">{milestoneModal.desc}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] text-xs font-medium">
              {milestoneModal.unlocked ? (
                <div className="text-[#286657]">
                  <span>Status: <strong>Terbuka!</strong></span>
                  <div className="text-[11px] text-[#6E6258] mt-0.5">{milestoneModal.reward}</div>
                </div>
              ) : (
                <div className="text-[#6E6258]">
                  <span>Perlu menyelesaikan minimal <strong>{milestoneModal.requiredLevel} Materi</strong> untuk membuka!</span>
                  <div className="text-[11px] text-[#8C7E72] mt-0.5">Saat ini: {completedCount} / {milestoneModal.requiredLevel} Materi</div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMilestoneModal(null)}
              className="w-full py-2 rounded-lg bg-[#261C14] hover:bg-[#3D2E22] text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL 5: KONFIRMASI RESET PROGRES --- */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-lg border border-[#E6DFD5] shadow-xl max-w-sm w-full p-5 space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-[#FDF1F1] text-[#C93B3B] border border-[#F5C2C2] flex items-center justify-center mx-auto">
              <RotateCcw className="w-5 h-5" />
            </div>

            <div>
              <h4 className="text-base font-bold text-[#261C14]">
                Reset Progres {currentSubject?.title || 'Belajar'}?
              </h4>
              <p className="text-xs text-[#6E6258] mt-1 leading-relaxed">
                Tindakan ini akan mengunci kembali Materi 2 sampai {currentLevels.length} pada mata pelajaran ini, dan mengembalikan status ke Materi 1 awal.
              </p>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-lg bg-[#F2ECE4] hover:bg-[#E6DFD5] text-[#261C14] font-medium text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleResetProgress}
                className="flex-1 py-2 rounded-lg bg-[#C93B3B] hover:bg-[#A82828] text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
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
