import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PUSMENDIK_LATIHAN } from '../data/latihanData';
import {
  getActivityData,
  markLatihanComplete,
  unlockLatihan,
  resetLatihanProgress,
  recordLatihan,
} from '../utils/activityTracker';
import { formatMath } from '../utils/mathRenderer';
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
  LayoutDashboard,
  Search,
  X,
  Sparkles,
  Zap,
  Star,
  Gift,
  RotateCcw,
  MapPin,
  List,
  Eye,
  XCircle,
  Award,
} from 'lucide-react';

/**
 * Halaman Penuh Modul Latihan Soal Pembelajaran TKA SD
 * 
 * Fitur:
 * 1. Pilihan Mata Pelajaran: Bahasa Indonesia (10 Latihan) & Matematika (10 Latihan).
 * 2. Tampilan dan mekanisme identik dengan Halaman Materi:
 *    - Menggunakan penamaan "Latihan 1", "Latihan 2", dst. (bukan "Materi 1").
 *    - Sistem Latihan Berjenjang (Latihan 1..10 untuk MTK dan BI).
 *    - Posisi awal: Hanya Latihan 1 yang terbuka, latihan berikutnya terkunci.
 *    - Syarat membuka latihan: Menuntaskan latihan sebelumnya.
 *    - Fitur Tantangan Lompat Latihan: Langsung melompat ke latihan terkunci dengan menjawab kuis tantangan.
 *    - Desain Peta Petualangan Berliku (Duolingo-style Winding Path), Milestone Peti Bonus, dan Piala Puncak.
 *    - Tampilan Mode Peta & Mode Daftar Grid.
 */

// Konfigurasi Lengkap Dua Mata Pelajaran untuk Latihan Soal
const SUBJECTS_CONFIG = {
  bahasa_indonesia: {
    key: 'bahasa_indonesia',
    title: 'Bahasa Indonesia',
    tagline: '10 Tingkat Latihan Soal Standar Pusmendik',
    deskripsi: 'Fondasi kosakata, kalimat efektif, struktur paragraf, teks fiksi, hingga penalaran HOTS literasi.',
    icon: BookOpen,
    totalLevels: 10,
    levels: PUSMENDIK_LATIHAN.bahasa_indonesia.levels.map((lvl) => ({
      ...lvl,
      id: `bi_lat_${lvl.level}`,
      no: lvl.level,
    })),
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
      4: {
        title: 'Peti Bintang Fondasi Literasi',
        requiredLevel: 4,
        desc: 'Pencapaian menuntaskan 4 Latihan Pertama: Fondasi Kosakata, Kalimat Efektif, dan Pemahaman Eksplisit.',
        reward: '⭐ Medali Ahli Fondasi Literasi TKA SD',
      },
      7: {
        title: 'Peti Perak Analisis & Makna Bahasa',
        requiredLevel: 7,
        desc: 'Pencapaian menuntaskan 7 Latihan: Makna Tersirat, Hubungan Kausalitas, dan Paragraf Terpadu.',
        reward: '🥈 Medali Master Analisis Bahasa',
      },
      10: {
        title: 'Piala Maestro Bahasa Indonesia TKA SD',
        requiredLevel: 10,
        desc: 'Piala kebanggaan tertinggi setelah menuntaskan seluruh 10 Tingkat Latihan Soal Bahasa Indonesia Kemendikdasmen RI.',
        reward: '👑 Gelar Maestro Latihan Bahasa Indonesia 100%',
      },
    },
  },
  matematika: {
    key: 'matematika',
    title: 'Matematika',
    tagline: '10 Tingkat Latihan Soal Standar Pusmendik',
    deskripsi: 'Operasi hitung campuran, pecahan, KPK/FPB, bangun datar/ruang, pengukuran, dan penalaran data.',
    icon: Calculator,
    totalLevels: 10,
    levels: PUSMENDIK_LATIHAN.matematika.levels.map((lvl) => ({
      ...lvl,
      id: `mtk_lat_${lvl.level}`,
      no: lvl.level,
    })),
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
        title: 'Peti Bintang Fondasi Numerasi',
        requiredLevel: 4,
        desc: 'Pencapaian menuntaskan 4 Latihan Pertama: Operasi Hitung Dasar, Pecahan, dan Skala Bilangan.',
        reward: '⭐ Medali Ahli Fondasi Numerasi TKA SD',
      },
      7: {
        title: 'Peti Perak Logika & Geometri',
        requiredLevel: 7,
        desc: 'Pencapaian menuntaskan 7 Latihan: Pengukuran Satuan, Keliling & Luas, dan Bangun Ruang.',
        reward: '🏆 Medali Master Logika Matematika',
      },
      10: {
        title: 'Piala Maestro Matematika TKA SD',
        requiredLevel: 10,
        desc: 'Piala kebanggaan tertinggi setelah menuntaskan seluruh 10 Tingkat Latihan Soal Matematika Kemendikdasmen RI.',
        reward: '👑 Gelar Maestro Latihan Matematika 100%',
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

const LatihanSoal = () => {
  const navigate = useNavigate();

  // Mata Pelajaran Terpilih ('bahasa_indonesia' | 'matematika' | null)
  const [selectedSubject, setSelectedSubject] = useState(null);

  // State Aktivitas Pengguna (Tersimpan di localStorage)
  const [activity, setActivity] = useState(() => getActivityData());
  const completedLatihanIds = activity?.latihanCompleted || [];
  const unlockedLatihanIds = activity?.unlockedLatihan || ['mtk_lat_1', 'bi_lat_1'];
  const latihanStars = activity?.latihanStars || {};

  // Helper dapatkan jumlah bintang yang diraih pada latihan tertentu
  const getLevelStars = (lvlId) => {
    if (latihanStars && latihanStars[lvlId] !== undefined) {
      return latihanStars[lvlId];
    }
    if (completedLatihanIds.includes(lvlId)) {
      return 3;
    }
    return 0;
  };

  // State Navigasi & Modal
  const [activeLatihan, setActiveLatihan] = useState(null); // Sedang mengerjakan latihan soal
  const [selectedLevelModal, setSelectedLevelModal] = useState(null); // Latihan yang dipilih untuk melihat info/aksi
  const [viewMode, setViewMode] = useState('roadmap'); // 'roadmap' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [milestoneModal, setMilestoneModal] = useState(null);

  // State Saat Mengerjakan Soal Latihan Penuh
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: answerValue }
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'
  const [latestScoreResult, setLatestScoreResult] = useState(null);

  // State Mode Tantangan Lompat Latihan (Jump Challenge)
  const [jumpChallengeLevel, setJumpChallengeLevel] = useState(null);
  const [jumpQuizIndex, setJumpQuizIndex] = useState(0);
  const [jumpSelectedAnswer, setJumpSelectedAnswer] = useState(null);
  const [jumpHasSubmitted, setJumpHasSubmitted] = useState(false);
  const [jumpIsCorrect, setJumpIsCorrect] = useState(false);
  const [showJumpHint, setShowJumpHint] = useState(false);
  const [jumpFinished, setJumpFinished] = useState(false);

  // State Transisi Anti-Spam
  const isJumpTransitioningRef = useRef(false);
  const [isJumpTransitioning, setIsJumpTransitioning] = useState(false);

  // Refresh data aktivitas saat ada perubahan
  const refreshActivity = () => {
    setActivity(getActivityData());
  };

  // Helper Cek Status Latihan
  const isLevelCompleted = (lvlId) => completedLatihanIds.includes(lvlId);

  const isLevelUnlocked = (index, lvl, levelsList) => {
    // Latihan 1 selalu terbuka
    if (index === 0) return true;
    // Terbuka jika sudah selesai
    if (completedLatihanIds.includes(lvl.id)) return true;
    // Terbuka jika sudah di-unlock via tantangan
    if (unlockedLatihanIds.includes(lvl.id)) return true;
    // Terbuka jika latihan sebelumnya sudah tuntas dikerjakan
    const prevLvl = levelsList[index - 1];
    if (prevLvl && completedLatihanIds.includes(prevLvl.id)) return true;

    return false;
  };

  // Data mapel aktif
  const currentSubject = selectedSubject ? SUBJECTS_CONFIG[selectedSubject] : null;
  const currentLevels = currentSubject ? currentSubject.levels : [];

  // Menentukan index latihan yang sedang aktif sekarang di mapel aktif
  const currentActiveLevelIndex = currentLevels.findIndex(
    (lvl, idx) => isLevelUnlocked(idx, lvl, currentLevels) && !isLevelCompleted(lvl.id)
  );

  // Helper verifikasi jawaban detail (MCQ, MCMA, Category) dengan skor proporsional
  const evaluateQuestion = (q, userAns) => {
    if (userAns === undefined || userAns === null) {
      return { isCorrect: false, score: 0 };
    }
    const qType = q.type || 'mcq';

    // 1. Pilihan Ganda Tunggal (MCQ)
    if (qType === 'mcq') {
      let isCorrect = false;
      if (typeof q.jawabanBenar === 'string') {
        isCorrect = String(userAns).trim() === String(q.jawabanBenar).trim();
      } else if (typeof q.jawabanBenar === 'number') {
        isCorrect =
          userAns === q.jawabanBenar ||
          String(userAns).trim() === String(q.pilihan?.[q.jawabanBenar]).trim();
      }
      return { isCorrect, score: isCorrect ? 1 : 0 };
    }

    // 2. Pilihan Ganda Kompleks (MCMA)
    if (qType === 'mcma') {
      if (!Array.isArray(userAns) || !Array.isArray(q.jawabanBenar) || q.jawabanBenar.length === 0) {
        return { isCorrect: false, score: 0 };
      }
      const correctKeys = q.jawabanBenar;
      const correctSelected = userAns.filter((ans) => correctKeys.includes(ans)).length;
      const wrongSelected = userAns.filter((ans) => !correctKeys.includes(ans)).length;
      const isCorrect = correctSelected === correctKeys.length && wrongSelected === 0;
      // Skor proporsional jika ada pilihan yang benar
      const earnedRatio = Math.max(0, (correctSelected - wrongSelected * 0.5) / correctKeys.length);
      return { isCorrect, score: Math.min(1, Math.max(0, earnedRatio)) };
    }

    // 3. Pernyataan Benar / Salah (Category)
    if (qType === 'category') {
      if (typeof userAns !== 'object' || userAns === null || !q.statements || q.statements.length === 0) {
        return { isCorrect: false, score: 0 };
      }
      let correctStmts = 0;
      q.statements.forEach((stmt, sIdx) => {
        if (userAns[sIdx] === stmt.answer) {
          correctStmts++;
        }
      });
      const isCorrect = correctStmts === q.statements.length;
      const score = correctStmts / q.statements.length;
      return { isCorrect, score };
    }

    return { isCorrect: false, score: 0 };
  };

  const isQuestionCorrect = (q, userAns) => evaluateQuestion(q, userAns).isCorrect;

  // Cek apakah suatu butir soal sudah dijawab oleh pengguna
  const isQuestionAnswered = (q, ans) => {
    if (ans === undefined || ans === null) return false;
    const qType = q?.type || 'mcq';
    if (qType === 'mcq') return String(ans).trim() !== '';
    if (qType === 'mcma') return Array.isArray(ans) && ans.length > 0;
    if (qType === 'category') return typeof ans === 'object' && Object.keys(ans).length > 0;
    return true;
  };

  // Buka dan Mulai Pengerjaan Latihan Normal
  const handleStartLatihan = (lvl) => {
    setSelectedLevelModal(null);
    setActiveLatihan(lvl);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setIsReviewMode(false);
    setLatestScoreResult(null);
  };

  // Pilih/Ubah jawaban latihan
  const handleAnswerChange = (val) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: val,
    }));
  };

  // Selesai & Hitung Nilai Latihan
  const handleFinishQuiz = () => {
    const questions = activeLatihan.soal;
    let totalScorePoints = 0;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      const evaluation = evaluateQuestion(q, userAnswers[idx]);
      totalScorePoints += evaluation.score;
      if (evaluation.isCorrect || evaluation.score >= 0.7) {
        correctCount++;
      }
    });

    // Hitung persentase skor akhir (0 - 100)
    const score = Math.round((totalScorePoints / questions.length) * 100);

    // Hitung perolehan bintang:
    // >= 80%: 3 bintang (⭐⭐⭐ Sempurna!)
    // >= 50%: 2 bintang (⭐⭐☆ Hebat!)
    // > 0% atau ada jawaban benar: 1 bintang (⭐☆☆ Bagus!)
    let starsEarned = 0;
    if (score >= 80) {
      starsEarned = 3;
    } else if (score >= 50) {
      starsEarned = 2;
    } else if (score > 0 || totalScorePoints > 0) {
      starsEarned = 1;
    }

    const result = {
      score,
      correctCount,
      totalCount: questions.length,
      wrongCount: questions.length - correctCount,
      starsEarned,
    };

    setLatestScoreResult(result);
    setIsFinished(true);

    // Rekam aktivitas ke tracker untuk riwayat latihan
    recordLatihan({
      subject: selectedSubject,
      level: `Latihan ${activeLatihan.level}`,
      score,
      correct: correctCount,
      total: questions.length,
    });

    // Tandai tuntas & berikan bintang jika ada yang benar (minimal 1 bintang)
    if (starsEarned >= 1) {
      markLatihanComplete(activeLatihan.id, starsEarned);

      // Otomatis buka latihan berikutnya jika ada
      const currentIndex = currentLevels.findIndex((l) => l.id === activeLatihan.id);
      if (currentIndex !== -1 && currentIndex < currentLevels.length - 1) {
        unlockLatihan(currentLevels[currentIndex + 1].id);
      }
    }

    refreshActivity();
  };

  // Mulai Tantangan Lompat Latihan
  const handleStartJumpChallenge = (lvl) => {
    setSelectedLevelModal(null);
    setJumpChallengeLevel(lvl);
    setJumpQuizIndex(0);
    setJumpSelectedAnswer(null);
    setJumpHasSubmitted(false);
    setJumpIsCorrect(false);
    setShowJumpHint(false);
    setJumpFinished(false);
    isJumpTransitioningRef.current = false;
    setIsJumpTransitioning(false);
  };

  // Dapatkan soal tantangan dari level (utamakan pilihan ganda sederhana)
  const getJumpQuestions = (lvl) => {
    if (!lvl || !lvl.soal || lvl.soal.length === 0) return [];
    const mcqs = lvl.soal.filter((q) => !q.type || q.type === 'mcq');
    return mcqs.length > 0 ? mcqs.slice(0, 2) : lvl.soal.slice(0, 1);
  };

  // Submit Jawaban Tantangan Lompat Latihan
  const handleCheckJumpAnswer = () => {
    if (isJumpTransitioningRef.current || (jumpHasSubmitted && jumpIsCorrect)) return;
    if (jumpSelectedAnswer === null) return;

    const challengeList = getJumpQuestions(jumpChallengeLevel);
    const currentQ = challengeList[jumpQuizIndex];
    const correct = isQuestionCorrect(currentQ, jumpSelectedAnswer);

    setJumpHasSubmitted(true);
    setJumpIsCorrect(correct);

    if (!correct) {
      setShowJumpHint(true);
    } else {
      isJumpTransitioningRef.current = true;
      setIsJumpTransitioning(true);
      setShowJumpHint(false);

      if (jumpQuizIndex < challengeList.length - 1) {
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
        // Berhasil menyelesaikan tantangan lompat latihan!
        setJumpFinished(true);
        unlockLatihan(jumpChallengeLevel.id);
        refreshActivity();
        isJumpTransitioningRef.current = false;
        setIsJumpTransitioning(false);
      }
    }
  };

  // Coba lagi pada tantangan lompat latihan
  const handleRetryJumpQuestion = () => {
    if (isJumpTransitioningRef.current) return;
    setJumpSelectedAnswer(null);
    setJumpHasSubmitted(false);
    setJumpIsCorrect(false);
  };

  // Reset Progres Latihan
  const handleResetProgress = () => {
    resetLatihanProgress(selectedSubject);
    refreshActivity();
    setShowResetConfirm(false);
    setSelectedLevelModal(null);
  };

  // Hitung jumlah tuntas mapel aktif
  const completedCount = currentLevels.filter((l) => isLevelCompleted(l.id)).length;
  const progressPercent = currentLevels.length
    ? Math.round((completedCount / currentLevels.length) * 100)
    : 0;

  // Filter pencarian
  const filteredLevels = currentLevels.filter((lvl) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      `latihan ${lvl.level}`.includes(q) ||
      lvl.subjudul?.toLowerCase().includes(q) ||
      lvl.deskripsi?.toLowerCase().includes(q) ||
      lvl.namaLevel?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-doodle-pattern text-slate-800 selection:bg-emerald-200 selection:text-emerald-900 pb-12">
      {/* 1. Navbar Utama */}
      <Navbar />

      {/* 2. Konten Utama */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col animate-fade-in">
        {/* Navigasi Breadcrumb */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-emerald-600 font-semibold flex items-center space-x-1 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setActiveLatihan(null);
                setJumpChallengeLevel(null);
                setSelectedSubject(null);
              }}
              className={`font-semibold hover:text-emerald-600 transition-colors ${
                !selectedSubject ? 'text-[#0a1e4a] font-bold' : ''
              }`}
            >
              Bank Latihan Soal
            </button>
            {selectedSubject && (
              <>
                <span>/</span>
                <span className="text-[#0a1e4a] font-bold">
                  {currentSubject?.title}
                </span>
              </>
            )}
            {activeLatihan && (
              <>
                <span>/</span>
                <span className="text-emerald-600 font-semibold truncate max-w-[150px] sm:max-w-xs">
                  Latihan {activeLatihan.level}: {activeLatihan.subjudul}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => {
              if (activeLatihan || jumpChallengeLevel) {
                if (
                  activeLatihan &&
                  !isFinished &&
                  Object.keys(userAnswers).length > 0 &&
                  !window.confirm('Yakin ingin kembali ke peta latihan? Jawaban latihan ini belum disimpan.')
                ) {
                  return;
                }
                setActiveLatihan(null);
                setJumpChallengeLevel(null);
                refreshActivity();
              } else if (selectedSubject) {
                setSelectedSubject(null);
              } else {
                navigate('/dashboard');
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-xs text-slate-700 hover:text-emerald-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {activeLatihan || jumpChallengeLevel
                ? 'Kembali ke Peta Latihan'
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
              <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Petualangan Latihan Soal Resmi Pusmendik Kemendikdasmen</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pilih Mata Pelajaran Latihan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Setiap mata pelajaran memiliki alur latihan berjenjang dengan tantangan soal, buka gembok latihan berikutnya, dan kumpulkan piala penghargaan!
              </p>
            </div>

            {/* 2 Kartu Mata Pelajaran */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Kartu 1: Bahasa Indonesia */}
              {(() => {
                const biLevels = SUBJECTS_CONFIG.bahasa_indonesia.levels;
                const biDone = biLevels.filter((l) => isLevelCompleted(l.id)).length;
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
                          10 Latihan Soal
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                        Bahasa Indonesia
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Latihan berjenjang dari Fondasi Dasar hingga Penalaran HOTS Nasional: makna kata, kalimat efektif, sastra, dan teks inferensial.
                      </p>

                      {/* Bar Progres & Bintang */}
                      <div className="mt-4 pt-3 border-t border-blue-100 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                          <span>Progres: {biDone} dari 10 Latihan</span>
                          <span className="text-blue-700 font-bold">{biPercent}%</span>
                        </div>
                        <div className="w-full bg-blue-100/70 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(4, biPercent)}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{biLevels.reduce((acc, l) => acc + getLevelStars(l.id), 0)} / {biLevels.length * 3} Bintang</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Peta 10 Latihan Bahasa Indonesia</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

              {/* Kartu 2: Matematika */}
              {(() => {
                const mtkLevels = SUBJECTS_CONFIG.matematika.levels;
                const mtkDone = mtkLevels.filter((l) => isLevelCompleted(l.id)).length;
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
                          10 Latihan Soal
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Matematika
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Latihan berjenjang dari Fondasi Dasar hingga Penalaran HOTS: operasi hitung, KPK/FPB, skala, pecahan, geometri, dan statistika.
                      </p>

                      {/* Bar Progres & Bintang */}
                      <div className="mt-4 pt-3 border-t border-emerald-100 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                          <span>Progres: {mtkDone} dari 10 Latihan</span>
                          <span className="text-emerald-700 font-bold">{mtkPercent}%</span>
                        </div>
                        <div className="w-full bg-emerald-100/70 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(4, mtkPercent)}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{mtkLevels.reduce((acc, l) => acc + getLevelStars(l.id), 0)} / {mtkLevels.length * 3} Bintang</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Peta 10 Latihan Matematika</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* --- TAHAP 2: PENGERJAAN SOAL LATIHAN PADA LEVEL TERPILIH --- */}
        {selectedSubject && activeLatihan && (
          <div className="bg-white border border-slate-200 rounded-3xl w-full shadow-xl overflow-hidden p-4 sm:p-6 animate-fade-in">
            {/* Header Pengerjaan Latihan */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    if (
                      !isFinished &&
                      Object.keys(userAnswers).length > 0 &&
                      !window.confirm('Yakin ingin kembali? Lembar jawaban belum dikumpulkan.')
                    ) {
                      return;
                    }
                    setActiveLatihan(null);
                    refreshActivity();
                  }}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Kembali ke Peta Petualangan"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      LATIHAN {activeLatihan.level} DARI {currentLevels.length} • {currentSubject.title.toUpperCase()}
                    </span>
                    {isLevelCompleted(activeLatihan.id) && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Tuntas</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                    {activeLatihan.subjudul}
                  </h2>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs text-slate-500">
                  {activeLatihan.targetSoal} Soal Standar Pusmendik
                </span>
              </div>
            </div>

            {/* KONTEN: PENGERJAAN SOAL AKTIF */}
            {!isFinished ? (
              <div className="max-w-3xl mx-auto py-2 space-y-4">
                {(() => {
                  const answeredCount = activeLatihan.soal.filter((q, idx) =>
                    isQuestionAnswered(q, userAnswers[idx])
                  ).length;
                  const answeredPercent = Math.round(
                    (answeredCount / activeLatihan.soal.length) * 100
                  );

                  return (
                    <>
                      {/* Header Progress & Navigasi */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200 gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-sm">
                            Soal {currentQuestionIndex + 1} dari {activeLatihan.soal.length}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            {activeLatihan.soal[currentQuestionIndex]?.type === 'mcma'
                              ? 'PG Kompleks'
                              : activeLatihan.soal[currentQuestionIndex]?.type === 'category'
                              ? 'Benar / Salah'
                              : 'Pilihan Ganda'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-semibold text-slate-600">
                            Terjawab:{' '}
                            <strong className="text-emerald-700 font-bold">{answeredCount}</strong> /{' '}
                            {activeLatihan.soal.length}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">
                            ({answeredPercent}%)
                          </span>
                        </div>
                      </div>

                      {/* Bar Progres Visual Lembar Soal */}
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200 shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300 shadow-sm"
                          style={{ width: `${Math.max(3, answeredPercent)}%` }}
                        />
                      </div>

                      {/* Grid Soal Navigation Strip */}
                      <div className="flex items-center space-x-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                        {activeLatihan.soal.map((q, idx) => {
                          const answered = isQuestionAnswered(q, userAnswers[idx]);
                          const isCurrent = currentQuestionIndex === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setCurrentQuestionIndex(idx)}
                              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer flex items-center justify-center relative ${
                                isCurrent
                                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400 ring-offset-1 scale-105'
                                  : answered
                                  ? 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                              }`}
                              title={`Soal ${idx + 1} (${answered ? 'Sudah Terjawab' : 'Belum Dijawab'})`}
                            >
                              <span>{idx + 1}</span>
                              {answered && !isCurrent && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-white" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}

                {/* Kartu Soal */}
                {(() => {
                  const currentQ = activeLatihan.soal[currentQuestionIndex];
                  const qType = currentQ?.type || 'mcq';
                  const currentAns = userAnswers[currentQuestionIndex];

                  if (!currentQ) return null;

                  return (
                    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
                      {/* Indikator Kurikulum */}
                      {currentQ.indicator && (
                        <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs font-medium flex items-center space-x-2">
                          <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>
                            <strong>Indikator:</strong> {currentQ.indicator}
                          </span>
                        </div>
                      )}

                      {/* Stimulus Bacaan (jika ada) */}
                      {currentQ.stimulus && (
                        <div className="p-4 rounded-xl bg-amber-50/50 border-l-4 border-amber-500 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-1">
                          <span className="font-bold text-amber-900 block text-xs">Konteks Stimulus:</span>
                          <div dangerouslySetInnerHTML={{ __html: formatMath(currentQ.stimulus) }} />
                        </div>
                      )}

                      {/* Pertanyaan */}
                      <h4
                        className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMath(currentQ.pertanyaan) }}
                      />

                      {/* Opsi 1: MCQ (Single Choice) */}
                      {qType === 'mcq' && (
                        <div className="space-y-2.5 pt-2">
                          {currentQ.pilihan?.map((opt, oIdx) => {
                            const isSelected =
                              currentAns === opt ||
                              currentAns === oIdx ||
                              (typeof currentAns === 'number' && currentAns === oIdx);
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswerChange(opt)}
                                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-sm font-semibold'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span dangerouslySetInnerHTML={{ __html: formatMath(opt) }} />
                                <div
                                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ml-2 ${
                                    isSelected
                                      ? 'border-emerald-500 bg-emerald-600 text-white'
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

                      {/* Opsi 2: MCMA (Multi-select) */}
                      {qType === 'mcma' && (
                        <div className="space-y-2.5 pt-2">
                          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span>Pilihan Ganda Kompleks: Anda dapat memilih lebih dari satu jawaban.</span>
                          </div>
                          {currentQ.pilihan?.map((opt, oIdx) => {
                            const list = Array.isArray(currentAns) ? currentAns : [];
                            const isSelected = list.includes(opt);
                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  const nextList = isSelected
                                    ? list.filter((x) => x !== opt)
                                    : [...list, opt];
                                  handleAnswerChange(nextList);
                                }}
                                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between cursor-pointer ${
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

                      {/* Opsi 3: CATEGORY (Benar / Salah) */}
                      {qType === 'category' && (
                        <div className="space-y-3 pt-2">
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium flex items-center space-x-2">
                            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span>Tentukan apakah setiap pernyataan bernilai Benar atau Salah.</span>
                          </div>
                          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                            {currentQ.statements?.map((stmt, sIdx) => {
                              const stmtVal =
                                typeof currentAns === 'object' && currentAns !== null
                                  ? currentAns[sIdx]
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
                                          typeof currentAns === 'object' && currentAns !== null
                                            ? currentAns
                                            : {};
                                        handleAnswerChange({ ...obj, [sIdx]: true });
                                      }}
                                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                                          typeof currentAns === 'object' && currentAns !== null
                                            ? currentAns
                                            : {};
                                        handleAnswerChange({ ...obj, [sIdx]: false });
                                      }}
                                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

                      {/* Navigasi Bawah */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          disabled={currentQuestionIndex === 0}
                          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                            currentQuestionIndex === 0
                              ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                              : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                          }`}
                        >
                          &larr; Sebelumnya
                        </button>

                        <div className="flex items-center space-x-2">
                          {currentQuestionIndex < activeLatihan.soal.length - 1 ? (
                            <button
                              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            >
                              Selanjutnya &rarr;
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Apakah Anda yakin ingin mengumpulkan lembar jawaban latihan sekarang?'
                                  )
                                ) {
                                  handleFinishQuiz();
                                }
                              }}
                              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              Kumpulkan Latihan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : !isReviewMode ? (
              /* HASIL NILAI DI AKHIR */
              <div className="max-w-md mx-auto py-8 text-center space-y-5 animate-fade-in">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 font-black text-3xl">
                  <Trophy className="w-10 h-10 text-slate-950" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Latihan Selesai
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Hasil Latihan {activeLatihan.level}
                  </h3>
                </div>

                {/* Skor Card */}
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-4">
                  <div className="text-4xl font-extrabold text-slate-900">
                    {latestScoreResult?.score}
                    <span className="text-sm text-slate-500 font-normal"> / 100</span>
                  </div>

                  {/* Perolehan Bintang */}
                  <div className="flex items-center justify-center space-x-2 py-1">
                    {[1, 2, 3].map((starNum) => {
                      const isEarned = starNum <= (latestScoreResult?.starsEarned || 0);
                      return (
                        <div
                          key={starNum}
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                            isEarned
                              ? 'bg-amber-100 border-2 border-amber-400 shadow-md scale-105'
                              : 'bg-slate-100 border border-slate-200 opacity-40'
                          }`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              isEarned
                                ? 'text-amber-500 fill-amber-400 drop-shadow-xs'
                                : 'text-slate-300 fill-slate-200'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-amber-700">
                    {latestScoreResult?.starsEarned === 3
                      ? '⭐⭐⭐ Sempurna! Kamu meraih 3 Bintang Emas!'
                      : latestScoreResult?.starsEarned === 2
                      ? '⭐⭐☆ Hebat! Kamu meraih 2 Bintang Emas!'
                      : latestScoreResult?.starsEarned === 1
                      ? '⭐☆☆ Bagus! Kamu berhasil meraih 1 Bintang!'
                      : 'Belum meraih bintang. Ulangi latihan untuk hasil lebih baik!'}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <span className="block font-bold text-base">
                        {latestScoreResult?.correctCount} / {latestScoreResult?.totalCount}
                      </span>
                      <span>Jawaban Benar</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                      <span className="block font-bold text-base">
                        {latestScoreResult?.wrongCount}
                      </span>
                      <span>Jawaban Salah</span>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setReviewFilter('all');
                      setIsReviewMode(true);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Review Pembahasan</span>
                  </button>

                  <button
                    onClick={() => handleStartLatihan(activeLatihan)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Coba Lagi</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveLatihan(null);
                      refreshActivity();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Peta Latihan
                  </button>
                </div>
              </div>
            ) : (
              /* REVIEW LATIHAN SOAL LENGKAP */
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Review Latihan {activeLatihan.level} & Pembahasan Lengkap
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pelajari penjelasan setiap butir soal untuk menguasai kompetensi TKA SD.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setReviewFilter('all')}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                          reviewFilter === 'all'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Semua ({activeLatihan.soal.length})
                      </button>
                      <button
                        onClick={() => setReviewFilter('wrong')}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                          reviewFilter === 'wrong'
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Salah ({latestScoreResult?.wrongCount})
                      </button>
                      <button
                        onClick={() => setReviewFilter('correct')}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                          reviewFilter === 'correct'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Benar ({latestScoreResult?.correctCount})
                      </button>
                    </div>

                    <button
                      onClick={() => setIsReviewMode(false)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </div>

                {/* Daftar Soal & Penjelasannya */}
                <div className="space-y-5">
                  {activeLatihan.soal
                    .filter((q, idx) => {
                      const isCorrect = isQuestionCorrect(q, userAnswers[idx]);
                      if (reviewFilter === 'wrong') return !isCorrect;
                      if (reviewFilter === 'correct') return isCorrect;
                      return true;
                    })
                    .map((q) => {
                      const origIdx = activeLatihan.soal.indexOf(q);
                      const userAnswer = userAnswers[origIdx];
                      const isCorrect = isQuestionCorrect(q, userAnswer);
                      const qType = q.type || 'mcq';

                      return (
                        <div
                          key={q.id || origIdx}
                          className={`p-5 rounded-2xl border shadow-sm ${
                            isCorrect
                              ? 'bg-emerald-50/30 border-emerald-300'
                              : 'bg-rose-50/30 border-rose-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-white">
                                Soal #{origIdx + 1}
                              </span>
                              {q.indicator && (
                                <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                                  {q.indicator}
                                </span>
                              )}
                            </div>

                            {isCorrect ? (
                              <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Jawabanmu Benar</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 text-xs font-bold text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full">
                                <XCircle className="w-4 h-4 text-rose-600" />
                                <span>Jawabanmu Salah</span>
                              </span>
                            )}
                          </div>

                          {q.stimulus && (
                            <div className="p-3 mb-3 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-700 text-xs">
                              <span className="font-bold text-amber-900 block mb-0.5">Stimulus:</span>
                              <div dangerouslySetInnerHTML={{ __html: formatMath(q.stimulus) }} />
                            </div>
                          )}

                          <h4
                            className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatMath(q.pertanyaan) }}
                          />

                          {/* Pilihan MCQ */}
                          {qType === 'mcq' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {q.pilihan?.map((opt, oIdx) => {
                                const isOptionCorrect =
                                  opt === q.jawabanBenar ||
                                  (typeof q.jawabanBenar === 'number' && oIdx === q.jawabanBenar);
                                const isOptionSelected =
                                  opt === userAnswer ||
                                  (typeof userAnswer === 'number' && oIdx === userAnswer);

                                let badgeStyle = 'bg-white border-slate-200 text-slate-600';
                                if (isOptionCorrect) {
                                  badgeStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-semibold';
                                } else if (isOptionSelected && !isCorrect) {
                                  badgeStyle = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                                }

                                return (
                                  <div
                                    key={oIdx}
                                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${badgeStyle}`}
                                  >
                                    <span dangerouslySetInnerHTML={{ __html: `${String.fromCharCode(65 + oIdx)}. ${formatMath(opt)}` }} />
                                    {isOptionCorrect && (
                                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded ml-2">
                                        Kunci
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Pilihan MCMA */}
                          {qType === 'mcma' && (
                            <div className="space-y-1.5 mb-3">
                              {q.pilihan?.map((opt, oIdx) => {
                                const isKey = Array.isArray(q.jawabanBenar) && q.jawabanBenar.includes(opt);
                                const isUser = Array.isArray(userAnswer) && userAnswer.includes(opt);
                                return (
                                  <div
                                    key={oIdx}
                                    className={`p-2 rounded-xl text-xs flex items-center justify-between border ${
                                      isKey
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                                        : isUser
                                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                                        : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    <span dangerouslySetInnerHTML={{ __html: formatMath(opt) }} />
                                    <div className="flex items-center space-x-1">
                                      {isKey && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                                          Kunci
                                        </span>
                                      )}
                                      {isUser && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                                          Dipilih
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Detail Category (Benar / Salah) */}
                          {qType === 'category' && (
                            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white mb-3 text-xs">
                              {q.statements?.map((stmt, sIdx) => {
                                const userVal =
                                  typeof userAnswer === 'object' && userAnswer !== null
                                    ? userAnswer[sIdx]
                                    : undefined;
                                const isStmtCorrect = userVal === stmt.answer;
                                return (
                                  <div key={sIdx} className="p-2.5 flex items-center justify-between gap-2">
                                    <span
                                      className="flex-1"
                                      dangerouslySetInnerHTML={{ __html: formatMath(stmt.text) }}
                                    />
                                    <div className="flex items-center space-x-2 text-[11px] font-bold">
                                      <span className={stmt.answer ? 'text-emerald-700' : 'text-rose-700'}>
                                        Kunci: {stmt.answer ? 'Benar' : 'Salah'}
                                      </span>
                                      <span className="text-slate-400">|</span>
                                      <span className={isStmtCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                                        Kamu: {userVal === undefined ? 'Belum dijawab' : userVal ? 'Benar' : 'Salah'}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* Penjelasan */}
                          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                            <strong className="text-blue-900 flex items-center space-x-1.5 mb-1 font-bold">
                              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                              <span>Penjelasan & Pembahasan:</span>
                            </strong>
                            <div
                              className="text-slate-700 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: formatMath(q.penjelasan) }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAHAP 3: PETA PETUALANGAN LATIHAN (DUOLINGO-STYLE) & GRID VIEW --- */}
        {selectedSubject && !activeLatihan && (
          <div className="w-full space-y-4 animate-fade-in">
            {/* Header Hero Banner Mapel Aktif */}
            <div
              className={`p-5 sm:p-7 rounded-3xl bg-gradient-to-r ${currentSubject.theme.gradient} text-white shadow-xl relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold border border-white/20">
                      <currentSubject.icon className="w-3.5 h-3.5" />
                      <span>{currentSubject.tagline}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                      {currentSubject.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                      {currentSubject.deskripsi}
                    </p>
                  </div>

                  <div className="flex flex-col items-stretch sm:items-end space-y-2 flex-shrink-0 self-start sm:self-center">
                    {/* Tombol Buku Panduan */}
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
                        {completedCount} dari {currentLevels.length} Latihan Tuntas ({progressPercent}%)
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
                        Fokus: Latihan{' '}
                        {currentActiveLevelIndex !== -1
                          ? currentLevels[currentActiveLevelIndex].level
                          : currentLevels.length}
                      </span>
                    </span>

                    <span className="px-2.5 py-1 rounded-xl bg-amber-400/25 border border-amber-300/40 font-bold text-amber-100 flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                      <span>
                        {currentLevels.reduce((acc, lvl) => acc + getLevelStars(lvl.id), 0)}/{currentLevels.length * 3} Bintang
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

            {/* Pencarian Latihan Instan */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari tingkat latihan ${currentSubject.title} (contoh: Fondasi, Penguatan, HOTS, Latihan 1)...`}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all"
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
                {filteredLevels.map((lvl) => {
                  const originalIndex = currentLevels.findIndex((l) => l.id === lvl.id);
                  const isCompleted = isLevelCompleted(lvl.id);
                  const isUnlocked = isLevelUnlocked(originalIndex, lvl, currentLevels);
                  const isCurrent = originalIndex === currentActiveLevelIndex;

                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setSelectedLevelModal(lvl)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isCompleted
                          ? 'bg-gradient-to-br from-emerald-50/70 to-white border-emerald-300 hover:border-emerald-500 shadow-xs'
                          : isCurrent
                          ? 'bg-gradient-to-br from-blue-50/80 to-white border-blue-400 hover:border-blue-600 shadow-md ring-2 ring-blue-400/30'
                          : isUnlocked
                          ? 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
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
                            {lvl.level}
                          </span>

                          {isCompleted ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Tuntas</span>
                            </span>
                          ) : isCurrent ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 animate-pulse">
                              Fokus Latihan
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
                          Latihan {lvl.level}: {lvl.subjudul}
                        </h4>

                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {lvl.deskripsi}
                        </p>

                        {/* Capaian Bintang Level di Grid */}
                        <div className="flex items-center space-x-1 mt-2.5">
                          {[1, 2, 3].map((s) => {
                            const stars = getLevelStars(lvl.id);
                            return (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= stars
                                    ? 'text-amber-500 fill-amber-400 drop-shadow-xs'
                                    : 'text-slate-300 fill-slate-100 stroke-slate-300'
                                }`}
                              />
                            );
                          })}
                          <span className="text-[10px] font-bold text-slate-500 ml-1">
                            {getLevelStars(lvl.id) > 0 ? `${getLevelStars(lvl.id)}/3 ⭐` : '0/3'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                        <span className={isUnlocked ? 'text-emerald-600' : 'text-slate-400'}>
                          {isUnlocked ? 'Kerjakan Latihan' : 'Lompat Latihan ⚡'}
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
                <div className="absolute inset-0 bg-radial from-emerald-50/30 via-transparent to-transparent pointer-events-none" />

                {/* Subtitle Alur */}
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Peta Latihan {currentLevels.length} Level • {currentSubject.title}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Klik lingkaran latihan untuk mulai mengerjakan soal, raih 3 bintang dan buka latihan berikutnya!
                  </p>
                </div>

                {/* Kontainer Alur Zig-Zag (Roadmap Path) */}
                <div className="relative max-w-md mx-auto py-4 flex flex-col items-center space-y-7">
                  {currentLevels.map((lvl, index) => {
                    const isCompleted = isLevelCompleted(lvl.id);
                    const isUnlocked = isLevelUnlocked(index, lvl, currentLevels);
                    const isCurrent = index === currentActiveLevelIndex;
                    const offsetClass = getPathOffset(index);
                    const starsEarned = getLevelStars(lvl.id);

                    // Cek Milestone Peti
                    const milestoneItem = currentSubject.milestones[lvl.level];
                    const isFinalLevel = lvl.level === currentLevels.length;

                    return (
                      <React.Fragment key={lvl.id}>
                        {/* Item Level Node */}
                        <div
                          className={`relative flex flex-col items-center transition-all duration-300 ${offsetClass}`}
                        >
                          {/* Balon Tag Level Aktif Sekarang */}
                          {isCurrent && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[11px] shadow-lg flex items-center space-x-1.5 z-20 animate-bounce-subtle border-2 border-white">
                              <Sparkles className="w-3 h-3 text-yellow-300" />
                              <span>Mulai di Sini!</span>
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-6 border-t-emerald-600" />
                            </div>
                          )}

                          {/* Tombol Lingkaran 3D Duolingo-Style */}
                          <button
                            onClick={() => setSelectedLevelModal(lvl)}
                            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center font-black transition-all duration-200 transform cursor-pointer relative z-10 ${
                              isCompleted
                                ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 border-b-[6px] border-emerald-700 text-white shadow-emerald-200 shadow-xl hover:scale-105 active:translate-y-1 active:border-b-2'
                                : isCurrent
                                ? `bg-gradient-to-b ${currentSubject.theme.activeBtn} border-b-[6px] text-white shadow-blue-300 shadow-2xl hover:scale-105 ring-4 ${currentSubject.theme.activeRing} ring-offset-2 active:translate-y-1 active:border-b-2`
                                : isUnlocked
                                ? 'bg-gradient-to-b from-sky-400 to-blue-500 border-b-[6px] border-blue-700 text-white shadow-md hover:scale-105 active:translate-y-1 active:border-b-2'
                                : 'bg-slate-200 border-b-[6px] border-slate-300 text-slate-400 hover:bg-slate-300/90 hover:text-slate-600 shadow-2xs hover:scale-105 active:translate-y-1 active:border-b-2'
                            }`}
                            title={`Latihan ${lvl.level}: ${lvl.subjudul} (${
                              isCompleted ? 'Tuntas' : isUnlocked ? 'Terbuka' : 'Terkunci - Klik untuk Lompat'
                            })`}
                          >
                            {/* Ikon di dalam node */}
                            {isCompleted ? (
                              <Check className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3.5] drop-shadow-xs" />
                            ) : isCurrent ? (
                              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-xs" />
                            ) : isUnlocked ? (
                              <div className="flex flex-col items-center">
                                <span className="text-xl sm:text-2xl font-black leading-none">{lvl.level}</span>
                                <span className="text-[9px] font-bold uppercase opacity-85 mt-0.5">Latihan</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Lock className="w-6 h-6 sm:w-7 sm:h-7 mb-0.5" />
                                <span className="text-[9px] font-bold opacity-80">{lvl.level}</span>
                              </div>
                            )}

                            {/* Badge Bintang jika Tuntas */}
                            {isCompleted && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 text-yellow-900 border-2 border-white flex items-center justify-center text-[10px] font-black shadow-xs">
                                ★
                              </div>
                            )}
                          </button>

                          {/* Pill Judul Level (Latihan 1, Latihan 2, dst) */}
                          <div
                            onClick={() => setSelectedLevelModal(lvl)}
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
                              Latihan {lvl.level}
                            </span>
                            <span className="block text-xs font-semibold truncate">
                              {lvl.subjudul || lvl.namaLevel}
                            </span>
                          </div>

                          {/* 3 Bintang Horizontal Capaian Latihan */}
                          <div
                            onClick={() => setSelectedLevelModal(lvl)}
                            className="flex items-center justify-center space-x-1.5 mt-2 cursor-pointer transition-transform hover:scale-110 select-none py-1 px-2.5 rounded-full bg-white/80 backdrop-blur-2xs border border-slate-200/80 shadow-2xs hover:shadow-xs"
                            title={`Latihan ${lvl.level}: Meraih ${starsEarned} dari 3 Bintang`}
                          >
                            {[1, 2, 3].map((starIdx) => {
                              const isFilled = starIdx <= starsEarned;
                              return (
                                <Star
                                  key={starIdx}
                                  className={`w-4 h-4 transition-all duration-300 ${
                                    isFilled
                                      ? 'text-amber-500 fill-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.5)] scale-105'
                                      : 'text-slate-300 fill-slate-200/40 stroke-slate-300'
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
                                : `🔒 Peti Latihan ${milestoneItem.requiredLevel}`}
                            </div>
                          </div>
                        )}

                        {/* --- GRAND TROPHY (Puncak Akhir Mapel) --- */}
                        {isFinalLevel && (
                          <div
                            onClick={() =>
                              setMilestoneModal({
                                title: milestoneItem?.title || `Piala Juara ${currentSubject.title}`,
                                desc: milestoneItem?.desc || `Piala kebanggaan setelah menuntaskan seluruh ${currentLevels.length} Latihan ${currentSubject.title}.`,
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
                                  ? `👑 MAESTRO LATIHAN ${currentSubject.title.toUpperCase()}`
                                  : `Piala Puncak (Latihan ${currentLevels.length} Selesai)`}
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

      {/* --- MODAL 1: DETAIL LATIHAN (INTERACTIVE POPUP DIALOG) --- */}
      {selectedLevelModal && currentLevels.length > 0 && (() => {
        const modalIndex = currentLevels.findIndex((l) => l.id === selectedLevelModal.id);
        const isCompleted = isLevelCompleted(selectedLevelModal.id);
        const isUnlocked = isLevelUnlocked(modalIndex, selectedLevelModal, currentLevels);
        const prevLvl = modalIndex > 0 ? currentLevels[modalIndex - 1] : null;

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
                    LATIHAN {selectedLevelModal.level} DARI {currentLevels.length} • {currentSubject?.title.toUpperCase()}
                  </span>
                  {isCompleted ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-emerald-950 flex items-center space-x-1">
                      <span>✓ Tuntas</span>
                      <span>•</span>
                      <span>{getLevelStars(selectedLevelModal.id)}/3 ⭐</span>
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

                <h3 className="text-xl font-black text-white">{selectedLevelModal.subjudul}</h3>
              </div>

              {/* Body Modal */}
              <div className="p-5 space-y-4">
                {/* Capaian Bintang Latihan */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block uppercase tracking-wider">
                      Capaian Latihan
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {isCompleted
                        ? `${getLevelStars(selectedLevelModal.id)} dari 3 Bintang Terkumpul`
                        : isUnlocked
                        ? 'Belum dikerjakan (0/3 Bintang)'
                        : 'Latihan masih terkunci'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3].map((starIdx) => {
                      const isFilled = starIdx <= getLevelStars(selectedLevelModal.id);
                      return (
                        <div
                          key={starIdx}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                            isFilled
                              ? 'bg-amber-100 border border-amber-300 shadow-2xs'
                              : 'bg-slate-200/60 border border-slate-200'
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              isFilled
                                ? 'text-amber-500 fill-amber-400 drop-shadow-xs'
                                : 'text-slate-300 fill-slate-200/50 stroke-slate-300'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Deskripsi Latihan
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {selectedLevelModal.deskripsi}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  <span>Target: <strong>{selectedLevelModal.targetSoal} Soal</strong> Standar Pusmendik Kemendikdasmen RI</span>
                </div>

                {/* Status Penjelasan jika terkunci */}
                {!isUnlocked && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                    <div className="flex items-start space-x-2">
                      <Lock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-slate-800">
                          Latihan ini masih terkunci!
                        </strong>
                        <p className="mt-0.5 text-slate-600 leading-relaxed">
                          Selesaikan Latihan {prevLvl?.level} ({prevLvl?.subjudul}) terlebih dahulu,{' '}
                          <strong className="text-emerald-700">ATAU kamu dapat langsung melompat</strong>{' '}
                          ke latihan ini dengan menjawab soal tantangan!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tombol Aksi */}
                <div className="pt-2 space-y-2.5">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleStartLatihan(selectedLevelModal)}
                      className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCompleted ? 'Kerjakan Ulang Latihan' : 'Mulai Kerjakan Latihan'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartJumpChallenge(selectedLevelModal)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Lompat ke Latihan Ini (Tantangan Kuis)</span>
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

      {/* --- MODAL 2: TANTANGAN LOMPAT LATIHAN (JUMP CHALLENGE) --- */}
      {jumpChallengeLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl border border-amber-300 shadow-2xl max-w-lg w-full overflow-hidden relative animate-fade-in my-auto">
            {/* Header Tantangan Lompat */}
            <div className="p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white relative">
              <button
                onClick={() => setJumpChallengeLevel(null)}
                className="absolute right-4 top-4 w-7 h-7 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-black uppercase tracking-wider mb-2">
                <Zap className="w-3 h-3 fill-current text-yellow-200" />
                <span>Tantangan Lompat Latihan • {currentSubject?.title}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                Uji Pemahaman: Latihan {jumpChallengeLevel.level} ({jumpChallengeLevel.subjudul})
              </h3>
              <p className="text-xs text-amber-100 mt-1">
                Jawab soal latihan ini dengan tepat untuk langsung membuka Latihan {jumpChallengeLevel.level} lebih awal!
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
                      Hebat! Kamu telah membuktikan kemampuanmu. <strong>Latihan {jumpChallengeLevel.level} ({jumpChallengeLevel.subjudul})</strong> kini resmi <strong>TERBUKA</strong> untukmu!
                    </p>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      onClick={() => {
                        const target = jumpChallengeLevel;
                        setJumpChallengeLevel(null);
                        handleStartLatihan(target);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      📝 Langsung Kerjakan Latihan
                    </button>
                    <button
                      onClick={() => setJumpChallengeLevel(null)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      🗺️ Kembali ke Peta Latihan
                    </button>
                  </div>
                </div>
              ) : (
                (() => {
                  const challengeList = getJumpQuestions(jumpChallengeLevel);
                  const currentQ = challengeList[jumpQuizIndex];
                  if (!currentQ) return null;

                  return (
                    <div className="space-y-4">
                      {/* Stepper Progress */}
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-100 pb-2">
                        <span>Soal Tantangan {jumpQuizIndex + 1} dari {challengeList.length}</span>
                        <div className="flex space-x-1">
                          {challengeList.map((_, i) => (
                            <span
                              key={i}
                              className={`w-5 h-1.5 rounded-full ${
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

                      {/* Stimulus jika ada */}
                      {currentQ.stimulus && (
                        <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800 text-xs leading-relaxed">
                          <strong className="block text-amber-900 mb-0.5">Stimulus:</strong>
                          <div dangerouslySetInnerHTML={{ __html: formatMath(currentQ.stimulus) }} />
                        </div>
                      )}

                      {/* Pertanyaan */}
                      <h4
                        className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMath(currentQ.pertanyaan) }}
                      />

                      {/* Pilihan Jawaban */}
                      <div className="space-y-2">
                        {currentQ.pilihan?.map((opt, idx) => {
                          const isSelected = jumpSelectedAnswer === opt;
                          const isWrongSubmitted = jumpHasSubmitted && !jumpIsCorrect && isSelected;

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                if (isJumpTransitioningRef.current || (jumpHasSubmitted && jumpIsCorrect)) return;
                                setJumpSelectedAnswer(opt);
                                setJumpHasSubmitted(false);
                                setJumpIsCorrect(false);
                                setShowJumpHint(false);
                              }}
                              className={`w-full p-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                                isWrongSubmitted
                                  ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-2xs'
                                  : isSelected
                                  ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-2xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span dangerouslySetInnerHTML={{ __html: formatMath(opt) }} />
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                  isWrongSubmitted
                                    ? 'border-rose-500 bg-rose-600 text-white'
                                    : isSelected
                                    ? 'border-amber-500 bg-amber-500 text-white'
                                    : 'border-slate-300 text-slate-400'
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
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs animate-fade-in flex items-start space-x-2">
                          <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong>Jawaban Kurang Tepat!</strong>
                            <p className="mt-0.5 text-slate-700">
                              Baca pertanyaan dengan cermat dan coba pilih jawaban yang paling sesuai.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Aksi Tombol Bawah */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setJumpChallengeLevel(null)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
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
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                            isJumpTransitioning || (jumpHasSubmitted && jumpIsCorrect)
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                              : jumpHasSubmitted && !jumpIsCorrect
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer hover:scale-105 active:scale-95'
                              : jumpSelectedAnswer !== null
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
                  );
                })()
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
                currentSubject?.theme.gradient || 'from-emerald-600 to-teal-600'
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
                <span>Buku Panduan Petualangan Latihan</span>
              </h3>
              <p className="text-xs text-white/90 mt-1">
                Aturan & Cara Menuntaskan Latihan Pembelajaran TKA SD
              </p>
            </div>

            <div className="p-5 space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Posisi Awal Belajar</strong>
                  Hanya <strong>Latihan 1</strong> pada masing-masing mata pelajaran yang terbuka di awal petualangan. Latihan selanjutnya masih terkunci.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Membuka Latihan Berurutan</strong>
                  Untuk membuka latihan berikutnya secara bertahap, kerjakan seluruh soal latihan saat ini dan raih nilai memuaskan.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Fitur Tantangan Lompat Latihan</strong>
                  Ingin langsung berlatih di tingkat tertentu? Kamu bisa membuka latihan lebih awal dengan menyelesaikan <strong>Tantangan Kuis</strong> dari latihan yang dituju!
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-6 h-6 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </span>
                <div>
                  <strong className="block text-slate-900 font-bold">Milestone Peti & Piala Puncak</strong>
                  Kumpulkan 3 bintang di setiap latihan dan buka peti bonus di setiap tahapan, hingga Piala Maestro di puncak latihan terakhir!
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
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
                  <span>Perlu menyelesaikan minimal <strong>{milestoneModal.requiredLevel} Latihan</strong> untuk membuka!</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">Saat ini: {completedCount} / {milestoneModal.requiredLevel} Latihan</div>
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
                Reset Progres Latihan {currentSubject?.title || ''}?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini akan mengunci kembali Latihan 2 sampai {currentLevels.length} pada mata pelajaran ini, dan mengembalikan status ke Latihan 1 awal.
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

export default LatihanSoal;
