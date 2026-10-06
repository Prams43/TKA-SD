import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PUSMENDIK_LATIHAN } from '../data/latihanData';
import { recordLatihan } from '../utils/activityTracker';
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
  LayoutDashboard,
  Check,
  Layers,
  Sparkles,
  Filter,
} from 'lucide-react';

/**
 * Halaman Penuh Latihan Soal Berjenjang & Per Topik TKA SD
 * Sumber Authentic: sd.onedumind.com (Kemendikdasmen RI)
 */
const LatihanSoal = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null); // 'bahasa_indonesia' | 'matematika' | null
  const [latihanMode, setLatihanMode] = useState('level'); // 'level' | 'topik'
  const [selectedLevel, setSelectedLevel] = useState(null); // Level or Topic Paket object
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: answerValue }
  const [isFinished, setIsFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'
  const [latestScoreResult, setLatestScoreResult] = useState(null);

  // Helper cek jawaban benar
  const isQuestionCorrect = (q, userAns) => {
    if (userAns === undefined || userAns === null) return false;
    const qType = q.type || 'mcq';

    if (qType === 'mcq') {
      if (typeof q.jawabanBenar === 'string') {
        return userAns === q.jawabanBenar;
      }
      if (typeof q.jawabanBenar === 'number') {
        return userAns === q.jawabanBenar || userAns === q.pilihan?.[q.jawabanBenar];
      }
      return false;
    }

    if (qType === 'mcma') {
      if (!Array.isArray(userAns) || !Array.isArray(q.jawabanBenar)) return false;
      if (userAns.length !== q.jawabanBenar.length) return false;
      return q.jawabanBenar.every((ans) => userAns.includes(ans));
    }

    if (qType === 'category') {
      if (typeof userAns !== 'object' || userAns === null) return false;
      if (!q.statements || q.statements.length === 0) return false;
      return q.statements.every((stmt, sIdx) => userAns[sIdx] === stmt.answer);
    }

    return false;
  };

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
  const handleAnswerChange = (val) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: val,
    }));
  };

  // Selesai & hitung nilai di akhir
  const handleFinishQuiz = () => {
    const questions = selectedLevel.soal;
    let correctCount = 0;

    questions.forEach((q, idx) => {
      if (isQuestionCorrect(q, userAnswers[idx])) {
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
      level: selectedLevel.level || selectedLevel.namaLevel,
      score,
      correct: correctCount,
      total: questions.length,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-200 selection:text-emerald-900">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Konten Utama Halaman Latihan Soal */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 flex flex-col animate-fade-in">
        {/* Breadcrumb & Tombol Kembali ke Dashboard */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-emerald-600 font-semibold flex items-center space-x-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span className="font-bold text-[#0a1e4a]">Latihan Soal</span>
            {selectedSubject && (
              <>
                <span>/</span>
                <span className="text-emerald-600 font-medium">
                  {PUSMENDIK_LATIHAN[selectedSubject].nama}
                </span>
              </>
            )}
            {selectedLevel && (
              <>
                <span>/</span>
                <span className="text-slate-800 font-bold truncate max-w-[200px]">
                  {selectedLevel.namaLevel}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-700 hover:text-emerald-700 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Dashboard</span>
            <span className="sm:hidden">Kembali</span>
          </button>
        </div>

        {/* Kartu Utama Latihan Soal */}
        <div className="bg-white border border-slate-200 rounded-3xl w-full flex-1 flex flex-col shadow-xl text-slate-800 overflow-hidden relative">
          {/* Header Bar Modul */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
            <div className="flex items-center space-x-3">
              {selectedLevel ? (
                <button
                  onClick={() => {
                    setSelectedLevel(null);
                    setIsFinished(false);
                    setIsReviewMode(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                  title="Pilih Paket Lain"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : selectedSubject ? (
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
                  <span>📝 Bank Latihan Soal TKA SD</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Resmi Pusmendik
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedLevel
                    ? `${PUSMENDIK_LATIHAN[selectedSubject].nama} • ${selectedLevel.namaLevel}`
                    : selectedSubject
                    ? `Pilih Mode Latihan (${PUSMENDIK_LATIHAN[selectedSubject].nama})`
                    : 'Pilih Mata Pelajaran (Bahasa Indonesia / Matematika)'}
                </p>
              </div>
            </div>

            {/* Mode Switcher bila mapel dipilih & belum mulai kuis */}
            {selectedSubject && !selectedLevel && (
              <div className="hidden sm:flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold shadow-2xs">
                <button
                  onClick={() => setLatihanMode('level')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    latihanMode === 'level'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>10 Level Berjenjang</span>
                </button>
                <button
                  onClick={() => setLatihanMode('topik')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                    latihanMode === 'topik'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Per Topik Kurikulum</span>
                </button>
              </div>
            )}
          </div>

          {/* Body Area */}
          <div className="flex-1 p-4 sm:p-6 bg-white">
            {/* TAHAP 1: Pilih Mata Pelajaran (Hanya BI & MTK) */}
            {!selectedSubject && (
              <div className="max-w-2xl mx-auto py-6 sm:py-10">
                <div className="text-center mb-8">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Standar Asesmen Terpadu
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-3">
                    Pilih Mata Pelajaran Latihan
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Tersedia latihan berjenjang Level 1-10 dan latihan modul per topik kurikulum terverifikasi.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div
                    onClick={() => setSelectedSubject('bahasa_indonesia')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-blue-50/30 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      Bahasa Indonesia
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      10 Level berjenjang & 10 modul topik: teks fiksi, informasi tersurat, kosakata, ungkapan, dan simpulan.
                    </p>
                    <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                      <span>Buka Latihan BI</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedSubject('matematika')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Matematika
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      10 Level berjenjang & 21 modul topik: pecahan, KPK/FPB, bangun datar/ruang, pengukuran, dan statistika.
                    </p>
                    <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                      <span>Buka Latihan Matematika</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAHAP 2: Pilih Level / Topik */}
            {selectedSubject && !selectedLevel && (
              <div className="space-y-6">
                {/* Mobile switcher */}
                <div className="sm:hidden flex items-center space-x-2">
                  <button
                    onClick={() => setLatihanMode('level')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                      latihanMode === 'level'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    10 Level Berjenjang
                  </button>
                  <button
                    onClick={() => setLatihanMode('topik')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                      latihanMode === 'topik'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    Per Topik Kurikulum
                  </button>
                </div>

                {/* Sub-tahap A: Mode Berjenjang (Level 1 - Level 10) */}
                {latihanMode === 'level' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          10 Level Berjenjang: {PUSMENDIK_LATIHAN[selectedSubject].nama}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Tantang kemampuanmu bertahap dari Fondasi Dasar hingga Penalaran HOTS Nasional.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedSubject(null)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Ganti Mapel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {PUSMENDIK_LATIHAN[selectedSubject].levels.map((lvl) => (
                        <div
                          key={lvl.level}
                          onClick={() => handleStartLevel(lvl)}
                          className="p-4 rounded-2xl bg-white hover:bg-emerald-50/20 border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {lvl.namaLevel}
                              </span>
                              <span className="text-[11px] font-semibold text-slate-500">
                                {lvl.targetSoal} Soal
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-800 mb-1">
                              {lvl.subjudul}
                            </h5>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {lvl.deskripsi}
                            </p>
                          </div>

                          <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                            <span>Mulai Level Ini</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-tahap B: Mode Topik Kurikulum (Paket 1, 2, 3 per Topik) */}
                {latihanMode === 'topik' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          Modul Latihan Per Topik: {PUSMENDIK_LATIHAN[selectedSubject].nama}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Fokus memperdalam materi tertentu dengan 3 paket latihan authentic.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedSubject(null)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Ganti Mapel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PUSMENDIK_LATIHAN[selectedSubject].topik.map((topik, tIdx) => (
                        <div
                          key={topik.key}
                          className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center">
                                  {tIdx + 1}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900">
                                  {topik.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {topik.desc}
                              </p>
                            </div>
                          </div>

                          {/* Tombol Paket 1, 2, 3 */}
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                            {topik.pakets.map((pkt) => (
                              <button
                                key={pkt.paket}
                                onClick={() =>
                                  handleStartLevel({
                                    level: `Topik ${tIdx + 1}`,
                                    namaLevel: `${topik.title} (${pkt.nama})`,
                                    targetSoal: pkt.soal.length,
                                    deskripsi: topik.desc,
                                    soal: pkt.soal,
                                    isTopik: true,
                                  })
                                }
                                className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 transition-all text-center"
                              >
                                {pkt.nama} ({pkt.soal.length})
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAHAP 3: Mengerjakan Soal Latihan */}
            {selectedLevel && !isFinished && (
              <div className="max-w-3xl mx-auto py-2 space-y-4">
                {/* Header Progress & Navigasi */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">
                      Soal {currentQuestionIndex + 1} dari {selectedLevel.soal.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                      {selectedLevel.soal[currentQuestionIndex]?.type === 'mcma'
                        ? 'PG Kompleks'
                        : selectedLevel.soal[currentQuestionIndex]?.type === 'category'
                        ? 'Benar / Salah'
                        : 'Pilihan Ganda'}
                    </span>
                  </div>
                  <span>
                    Terjawab: <strong>{Object.keys(userAnswers).length}</strong> / {selectedLevel.soal.length}
                  </span>
                </div>

                {/* Grid Soal Navigation Strip */}
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-thin">
                  {selectedLevel.soal.map((_, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isCurrent = currentQuestionIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                            : isAnswered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Kartu Soal */}
                {(() => {
                  const currentQ = selectedLevel.soal[currentQuestionIndex];
                  const qType = currentQ.type || 'mcq';
                  const currentAns = userAnswers[currentQuestionIndex];

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
                          <div dangerouslySetInnerHTML={{ __html: currentQ.stimulus }} />
                        </div>
                      )}

                      {/* Pertanyaan */}
                      <h4
                        className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: currentQ.pertanyaan }}
                      />

                      {/* Opsi 1: MCQ */}
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
                                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-sm font-semibold'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span dangerouslySetInnerHTML={{ __html: opt }} />
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
                                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-blue-50 border-2 border-blue-500 text-blue-900 shadow-sm font-semibold'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <span dangerouslySetInnerHTML={{ __html: opt }} />
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
                                    dangerouslySetInnerHTML={{ __html: stmt.text }}
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
                                          typeof currentAns === 'object' && currentAns !== null
                                            ? currentAns
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
                          {currentQuestionIndex < selectedLevel.soal.length - 1 ? (
                            <button
                              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                            >
                              Selanjutnya &rarr;
                            </button>
                          ) : null}

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
                            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95"
                          >
                            Kumpulkan Latihan ✨
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAHAP 4: Hasil Nilai di Akhir + Tombol Lihat Review */}
            {selectedLevel && isFinished && !isReviewMode && (
              <div className="max-w-md mx-auto py-8 text-center space-y-5 animate-fade-in">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 font-black text-3xl">
                  <Trophy className="w-10 h-10 text-slate-950" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Latihan Selesai
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    Hasil {selectedLevel.namaLevel}
                  </h3>
                </div>

                {/* Skor Card */}
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-4">
                  <div className="text-4xl font-extrabold text-slate-900">
                    {latestScoreResult?.score}
                    <span className="text-sm text-slate-500 font-normal"> / 100</span>
                  </div>

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

                {/* Tombol Aksi: Lihat Review Penjelasan / Ulangi */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setReviewFilter('all');
                      setIsReviewMode(true);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Review & Penjelasan Soal</span>
                  </button>

                  <button
                    onClick={() => handleStartLevel(selectedLevel)}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Review Latihan & Pembahasan Lengkap
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pelajari penjelasan setiap butir soal untuk menguasai kompetensi TKA SD.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Filter buttons */}
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        onClick={() => setReviewFilter('all')}
                        className={`px-2.5 py-1 rounded-lg ${
                          reviewFilter === 'all'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Semua ({selectedLevel.soal.length})
                      </button>
                      <button
                        onClick={() => setReviewFilter('wrong')}
                        className={`px-2.5 py-1 rounded-lg ${
                          reviewFilter === 'wrong'
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Salah ({latestScoreResult?.wrongCount})
                      </button>
                      <button
                        onClick={() => setReviewFilter('correct')}
                        className={`px-2.5 py-1 rounded-lg ${
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
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Tutup
                    </button>
                  </div>
                </div>

                {/* Daftar Soal & Penjelasannya */}
                <div className="space-y-5">
                  {selectedLevel.soal
                    .filter((q, idx) => {
                      const isCorrect = isQuestionCorrect(q, userAnswers[idx]);
                      if (reviewFilter === 'wrong') return !isCorrect;
                      if (reviewFilter === 'correct') return isCorrect;
                      return true;
                    })
                    .map((q, filteredIdx) => {
                      const origIdx = selectedLevel.soal.indexOf(q);
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
                          {/* Nomor & Status Benar/Salah */}
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

                          {/* Stimulus jika ada */}
                          {q.stimulus && (
                            <div className="p-3 mb-3 rounded-xl bg-amber-50/60 border border-amber-200 text-slate-700 text-xs">
                              <span className="font-bold text-amber-900 block mb-0.5">Stimulus:</span>
                              <div dangerouslySetInnerHTML={{ __html: q.stimulus }} />
                            </div>
                          )}

                          <h4
                            className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: q.pertanyaan }}
                          />

                          {/* Detail Pilihan untuk MCQ */}
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
                                    <span dangerouslySetInnerHTML={{ __html: `${String.fromCharCode(65 + oIdx)}. ${opt}` }} />
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

                          {/* Detail MCMA */}
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
                                    <span dangerouslySetInnerHTML={{ __html: opt }} />
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

                          {/* Detail Category */}
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
                                    <span dangerouslySetInnerHTML={{ __html: stmt.text }} className="flex-1" />
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

                          {/* Kotak Penjelasan / Pembahasan Lengkap */}
                          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                            <strong className="text-blue-900 flex items-center space-x-1.5 mb-1 font-bold">
                              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                              <span>Penjelasan & Pembahasan:</span>
                            </strong>
                            <div
                              className="text-slate-700 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: q.penjelasan }}
                            />
                          </div>
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

export default LatihanSoal;
