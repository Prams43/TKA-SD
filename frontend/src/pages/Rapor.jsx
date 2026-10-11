import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getFullStats } from '../utils/activityTracker';
import {
  TrendingUp,
  Award,
  BookOpen,
  Calculator,
  Trophy,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  Target,
  ArrowLeft,
  LayoutDashboard,
  Star,
  ChevronRight,
} from 'lucide-react';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Sangat Mahir':
      return 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]';
    case 'Mahir':
      return 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]';
    case 'Cukup Mahir':
      return 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]';
    case 'Perlu Latihan':
      return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]';
    case 'Belum Dimulai':
    default:
      return 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]';
  }
};

/**
 * Halaman Rapor Aktivitas Belajar Siswa TKA SD
 * Bersih, terstruktur, bebas dinding teks bertele-tele, dan nyaman dilihat.
 */
const Rapor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ringkasan'); // 'ringkasan' | 'tryout' | 'latihan'
  const [tryoutFilter, setTryoutFilter] = useState('all'); // 'all' | 'bahasa_indonesia' | 'matematika'

  const stats = getFullStats();
  const totalBintangSemua = (stats.totalBintangMateri || 0) + (stats.totalBintangLatihan || 0);
  const maxBintangSemua = (stats.maxBintangMateri || 99) + (stats.maxBintangLatihan || 60);

  const filteredTryouts = (stats.tryoutHistory || []).filter((item) => {
    if (tryoutFilter === 'all') return true;
    return item.subject === tryoutFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-800">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Konten Utama Halaman Rapor */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Breadcrumb & Navigasi */}
        {/* Breadcrumb & Navigasi */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center space-x-2 text-xs text-blue-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-white font-medium flex items-center space-x-1 cursor-pointer transition-colors text-blue-200"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span className="text-blue-300/50">/</span>
            <span className="font-bold text-white">Rapor Belajar</span>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 hover:text-blue-700 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Dashboard</span>
            <span className="sm:hidden">Kembali</span>
          </button>
        </div>

        {/* Kartu Utama Rapor */}
        <div className="bg-white border-2 border-slate-400 rounded-2xl w-full flex-1 flex flex-col shadow-xl overflow-hidden">
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b-2 border-slate-300 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAECE6] border border-[#F4D3C4] text-[#C25E38] flex items-center justify-center flex-shrink-0 shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-[#261C14] tracking-tight">
                  Rapor Belajar Siswa
                </h1>
                <p className="text-xs text-[#6E6258] mt-0.5">
                  Ringkasan progres materi, latihan soal, dan skor simulasi tryout.
                </p>
              </div>
            </div>

            {/* Quick Badge Ringkasan di Desktop */}
            <div className="hidden md:flex items-center space-x-2 text-xs font-medium">
              <span className="px-2.5 py-1 rounded-md bg-[#E8F2EF] text-[#286657] border border-[#C5DDD6]">
                {stats.materiSelesai}/{stats.totalMateriTersedia} Materi
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#FAECE6] text-[#C25E38] border border-[#F4D3C4]">
                {stats.latihanSelesai}/{stats.totalLatihanTersedia} Latihan
              </span>
            </div>
          </div>

          {/* Sub-Nav Tabs (Bisa di-swipe horizontal di mobile) */}
          <div className="flex border-b-2 border-slate-300 px-3 sm:px-6 bg-[#FAF7F2] gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('ringkasan')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === 'ringkasan'
                  ? 'border-[#C25E38] text-[#C25E38]'
                  : 'border-transparent text-[#6E6258] hover:text-[#261C14]'
              }`}
            >
              Ringkasan & Topik
            </button>
            <button
              onClick={() => setActiveTab('tryout')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === 'tryout'
                  ? 'border-[#C25E38] text-[#C25E38]'
                  : 'border-transparent text-[#6E6258] hover:text-[#261C14]'
              }`}
            >
              Riwayat Tryout ({stats.totalTryout})
            </button>
            <button
              onClick={() => setActiveTab('latihan')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === 'latihan'
                  ? 'border-[#C25E38] text-[#C25E38]'
                  : 'border-transparent text-[#6E6258] hover:text-[#261C14]'
              }`}
            >
              Riwayat Latihan ({stats.totalLatihan})
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-6 bg-white">
            {/* ================= TAB 1: RINGKASAN ================= */}
            {activeTab === 'ringkasan' && (
              <div className="space-y-6">
                {/* 1. 4 Kartu Statistik Ringkas dengan Outline Tegas & Kontras */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {/* Card 1: Materi Tuntas (Emerald Outline) */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#047857] flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6E6258] mb-1">
                        <span className="font-medium">Materi Tuntas</span>
                        <BookOpen className="w-4 h-4 text-[#047857]" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-[#261C14]">
                        {stats.materiSelesai}
                        <span className="text-xs text-[#6E6258] font-normal ml-1">
                          / {stats.totalMateriTersedia} Bab
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-[#6E6258] mb-1 font-medium">
                        <span>{stats.persenMateri}% Selesai</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E6DFD5] overflow-hidden">
                        <div
                          className="h-full bg-[#047857] rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(4, stats.persenMateri)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Latihan Soal (Burgundy Outline) */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#881337] flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6E6258] mb-1">
                        <span className="font-medium">Latihan Soal</span>
                        <Target className="w-4 h-4 text-[#881337]" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-[#261C14]">
                        {stats.latihanSelesai}
                        <span className="text-xs text-[#6E6258] font-normal ml-1">
                          / {stats.totalLatihanTersedia} Level
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-[#6E6258] mb-1 font-medium">
                        <span>{stats.persenLatihan}% Selesai</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E6DFD5] overflow-hidden">
                        <div
                          className="h-full bg-[#881337] rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(4, stats.persenLatihan)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Tryout (Amber Outline, Paket BI & MTK Terpisah) */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border-2 border-amber-600 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6E6258] mb-1">
                        <span className="font-medium">Tryout</span>
                        <Trophy className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        <div className="p-2 rounded-lg bg-white border border-[#047857]/30 shadow-2xs">
                          <div className="flex items-center space-x-1 text-[10px] font-semibold text-[#047857]">
                            <BookOpen className="w-3 h-3 text-[#047857] shrink-0" />
                            <span className="truncate">B. Indo</span>
                          </div>
                          <div className="text-base sm:text-lg font-extrabold text-[#047857] mt-0.5">
                            {stats.paketTryoutSelesaiBI}
                            <span className="text-[10px] font-normal text-[#6E6258] ml-0.5">/ {stats.totalPaketBITersedia} Paket</span>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#881337]/30 shadow-2xs">
                          <div className="flex items-center space-x-1 text-[10px] font-semibold text-[#881337]">
                            <Calculator className="w-3 h-3 text-[#881337] shrink-0" />
                            <span className="truncate">MTK</span>
                          </div>
                          <div className="text-base sm:text-lg font-extrabold text-[#881337] mt-0.5">
                            {stats.paketTryoutSelesaiMTK}
                            <span className="text-[10px] font-normal text-[#6E6258] ml-0.5">/ {stats.totalPaketMTKTersedia} Paket</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-[#6E6258] mb-1 font-medium">
                        <span>{stats.persenTryout}% Selesai</span>
                        <span className="text-[10px] text-[#6E6258]">
                          {stats.totalPaketTryoutSelesai} / {stats.totalPaketTryoutTersedia} Paket
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#E6DFD5] overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(4, stats.persenTryout)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Total Bintang (Gold Outline) */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border-2 border-yellow-600 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6E6258] mb-1">
                        <span className="font-medium">Total Bintang</span>
                        <Star className="w-4 h-4 fill-[#E5A875] text-yellow-600" />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-[#D97E26]">
                        {totalBintangSemua}
                        <span className="text-xs text-[#6E6258] font-normal ml-1">
                          / {maxBintangSemua}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-[11px] text-[#6E6258] block font-medium">
                        Akurasi latihan: {stats.akurasiLatihan}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Penguasaan Topik Materi */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-[#261C14] flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-[#C25E38]" />
                        <span>Penguasaan Topik Materi</span>
                      </h2>
                      <p className="text-xs text-[#6E6258] mt-0.5">
                        Tingkat pemahaman materi Bahasa Indonesia dan Matematika.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Kolom Kiri: Seluruh Topik Bahasa Indonesia */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1.5 px-1 text-xs font-semibold text-[#047857]">
                        <BookOpen className="w-3.5 h-3.5 text-[#047857]" />
                        <span>Bahasa Indonesia</span>
                      </div>
                      {stats.kompetensi
                        .filter((k) => k.mapel === 'Bahasa Indonesia')
                        .map((k, idx) => (
                          <div
                            key={`bi-${idx}`}
                            className="p-3.5 rounded-xl bg-white border-2 border-[#047857] hover:border-[#065F46] transition-all duration-300 space-y-2 shadow-xs"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div>
                                <h3 className="text-sm font-bold text-[#261C14]">{k.nama}</h3>
                                <span className="text-[10px] text-[#6E6258] font-medium">{k.mapel}</span>
                              </div>
                              <span className="text-base font-extrabold text-[#047857]">{k.nilai}%</span>
                            </div>

                            <div className="w-full h-2 rounded-full bg-[#F2ECE4] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-300 bg-[#047857]"
                                style={{ width: `${k.nilai}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between pt-0.5">
                              <span className="text-[10px] text-[#6E6258] font-medium truncate mr-2">
                                {k.detail?.summary || 'Belum ada aktivitas'}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 transition-colors duration-300 ${getStatusBadge(
                                  k.status
                                )}`}
                              >
                                {k.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Kolom Kanan: Seluruh Topik Matematika */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1.5 px-1 text-xs font-semibold text-[#881337]">
                        <Calculator className="w-3.5 h-3.5 text-[#881337]" />
                        <span>Matematika</span>
                      </div>
                      {stats.kompetensi
                        .filter((k) => k.mapel === 'Matematika')
                        .map((k, idx) => (
                          <div
                            key={`mtk-${idx}`}
                            className="p-3.5 rounded-xl bg-white border-2 border-[#881337] hover:border-[#700D2B] transition-all duration-300 space-y-2 shadow-xs"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div>
                                <h3 className="text-sm font-bold text-[#261C14]">{k.nama}</h3>
                                <span className="text-[10px] text-[#6E6258] font-medium">{k.mapel}</span>
                              </div>
                              <span className="text-base font-extrabold text-[#881337]">{k.nilai}%</span>
                            </div>

                            <div className="w-full h-2 rounded-full bg-[#F2ECE4] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-300 bg-[#881337]"
                                style={{ width: `${k.nilai}%` }}
                              />
                            </div>

                            <div className="flex items-center justify-between pt-0.5">
                              <span className="text-[10px] text-[#6E6258] font-medium truncate mr-2">
                                {k.detail?.summary || 'Belum ada aktivitas'}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 transition-colors duration-300 ${getStatusBadge(
                                  k.status
                                )}`}
                              >
                                {k.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* 3. Rekomendasi Belajar Dinamis */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAECE6] border-2 border-[#C25E38] space-y-3 shadow-xs">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#C25E38]" />
                    <h3 className="text-xs sm:text-sm font-bold text-[#261C14]">
                      Rekomendasi Belajar
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white border-2 border-slate-300 shadow-2xs">
                      <span className="text-[11px] font-semibold text-[#286657] block mb-0.5">
                        ✓ Topik Sangat Baik:
                      </span>
                      <p className="text-[#261C14] font-medium">
                        {stats.rekomendasi?.kuat || 'Belum Ada Aktivitas'}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-white border-2 border-slate-300 shadow-2xs">
                      <span className="text-[11px] font-semibold text-[#C25E38] block mb-0.5">
                        ⚡ Perlu Ditingkatkan:
                      </span>
                      <p className="text-[#261C14] font-medium">
                        {stats.rekomendasi?.lemah || 'Semua Topik Perlu Dipelajari'}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#6E6258] leading-relaxed pt-1">
                    {stats.rekomendasi?.saranAksi ||
                      'Fokuskan belajar pada materi dasar untuk membuka peta kompetensi!'}
                  </p>
                </div>
              </div>
            )}

            {/* ================= TAB 2: RIWAYAT TRYOUT ================= */}
            {activeTab === 'tryout' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[#261C14]">Riwayat Simulasi Tryout</h2>
                    <p className="text-xs text-[#6E6258] mt-0.5">
                      Catatan pengerjaan 30 soal standar asesmen nasional TKA SD.
                    </p>
                  </div>
                  <span className="text-xs text-[#6E6258] font-medium">
                    Total: {stats.tryoutHistory.length} Sesi
                  </span>
                </div>

                {/* Banner Rata-rata Terpisah per Mata Pelajaran */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border-2 border-[#047857] shadow-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                        <BookOpen className="w-4.5 h-4.5 text-[#047857]" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#261C14]">Tryout Bahasa Indonesia</h3>
                        <span className="text-[11px] text-[#6E6258] font-medium">
                          {stats.totalTryoutBI} paket dikerjakan
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#6E6258] block font-medium">Rata-rata</span>
                      <span className="text-xl font-extrabold text-[#047857]">
                        {stats.totalTryoutBI > 0 ? stats.rataRataTryoutBI : '-'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border-2 border-[#881337] shadow-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center shrink-0">
                        <Calculator className="w-4.5 h-4.5 text-[#881337]" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#261C14]">Tryout Matematika</h3>
                        <span className="text-[11px] text-[#6E6258] font-medium">
                          {stats.totalTryoutMTK} paket dikerjakan
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#6E6258] block font-medium">Rata-rata</span>
                      <span className="text-xl font-extrabold text-[#881337]">
                        {stats.totalTryoutMTK > 0 ? stats.rataRataTryoutMTK : '-'}
                      </span>
                    </div>
                  </div>
                </div>

                {stats.tryoutHistory.length === 0 ? (
                  <div className="py-12 sm:py-16 text-center rounded-xl bg-[#FAF7F2] border-2 border-slate-300 space-y-3 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#E6DFD5] flex items-center justify-center mx-auto text-[#8C7E72]">
                      <Trophy className="w-6 h-6 text-[#8C7E72]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#261C14]">Belum Ada Riwayat Tryout</h3>
                      <p className="text-xs text-[#6E6258] mt-1 max-w-sm mx-auto">
                        Kamu belum menyelesaikan simulasi tryout. Ikuti paket tryout untuk melihat riwayat skor di sini.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/tryout')}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#C25E38] hover:bg-[#A94D2B] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Mulai Tryout Sekarang</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Filter Tab Mapel */}
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => setTryoutFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                          tryoutFilter === 'all'
                            ? 'bg-[#261C14] text-white border-[#261C14]'
                            : 'bg-white text-[#6E6258] border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        Semua ({stats.tryoutHistory.length})
                      </button>
                      <button
                        onClick={() => setTryoutFilter('bahasa_indonesia')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                          tryoutFilter === 'bahasa_indonesia'
                            ? 'bg-[#047857] text-white border-[#047857]'
                            : 'bg-white text-[#047857] border-[#A7F3D0] hover:bg-[#ECFDF5]'
                        }`}
                      >
                        Bahasa Indonesia ({stats.totalTryoutBI})
                      </button>
                      <button
                        onClick={() => setTryoutFilter('matematika')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                          tryoutFilter === 'matematika'
                            ? 'bg-[#881337] text-white border-[#881337]'
                            : 'bg-white text-[#881337] border-[#FECDD3] hover:bg-[#FFF1F2]'
                        }`}
                      >
                        Matematika ({stats.totalTryoutMTK})
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border-2 border-slate-400 bg-white shadow-xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FAF7F2] text-[#6E6258] font-semibold border-b-2 border-slate-300">
                          <tr>
                            <th className="px-4 py-3">Paket</th>
                            <th className="px-4 py-3">Mata Pelajaran</th>
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3 text-center">Akurasi Soal</th>
                            <th className="px-4 py-3 text-center">Nilai</th>
                            <th className="px-4 py-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300">
                          {filteredTryouts.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#6E6258]">
                                Belum ada riwayat tryout untuk filter ini.
                              </td>
                            </tr>
                          ) : (
                            filteredTryouts.map((item) => (
                          <tr key={item.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="px-4 py-3 font-semibold text-[#261C14]">
                              Paket {item.packageNum}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border transition-colors duration-300 ${
                                  item.subject === 'bahasa_indonesia'
                                    ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                                    : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                                }`}
                              >
                                {item.subject === 'bahasa_indonesia' ? 'Bahasa Indonesia' : 'Matematika'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#6E6258]">
                              <div className="flex items-center space-x-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#8C7E72]" />
                                <span>{item.date}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-[#261C14]">
                              {item.correct} / {item.total} Benar
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border transition-colors duration-300 ${
                                item.subject === 'bahasa_indonesia'
                                    ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                                    : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                              }`}>
                                {item.score}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex items-center space-x-1 text-[#286657] font-semibold bg-[#E8F2EF] border border-[#C5DDD6] px-2 py-0.5 rounded-full text-[11px]">
                                <CheckCircle2 className="w-3 h-3 text-[#286657]" />
                                <span>Selesai</span>
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

            {/* ================= TAB 3: RIWAYAT LATIHAN ================= */}
            {activeTab === 'latihan' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[#261C14]">Riwayat Latihan Berjenjang</h2>
                    <p className="text-xs text-[#6E6258] mt-0.5">
                      Catatan pengerjaan latihan level 1 s.d. 10.
                    </p>
                  </div>
                  <span className="text-xs text-[#6E6258] font-medium">
                    Total: {stats.latihanHistory.length} Sesi
                  </span>
                </div>

                {stats.latihanHistory.length === 0 ? (
                  <div className="py-12 sm:py-16 text-center rounded-xl bg-[#FAF7F2] border-2 border-slate-300 space-y-3 shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#E6DFD5] flex items-center justify-center mx-auto text-[#8C7E72]">
                      <Target className="w-6 h-6 text-[#8C7E72]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#261C14]">Belum Ada Riwayat Latihan</h3>
                      <p className="text-xs text-[#6E6258] mt-1 max-w-sm mx-auto">
                        Kamu belum mengerjakan latihan soal berjenjang. Mulai latihan untuk mencatat nilai dan bintang di sini.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/latihan')}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#C25E38] hover:bg-[#A94D2B] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Mulai Latihan Soal</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border-2 border-slate-400 bg-white shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF7F2] text-[#6E6258] font-semibold border-b-2 border-slate-300">
                        <tr>
                          <th className="px-4 py-3">Tingkatan</th>
                          <th className="px-4 py-3">Mata Pelajaran</th>
                          <th className="px-4 py-3">Tanggal</th>
                          <th className="px-4 py-3 text-center">Akurasi Soal</th>
                          <th className="px-4 py-3 text-center">Nilai</th>
                          <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-300">
                        {stats.latihanHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="px-4 py-3 font-semibold text-[#261C14]">
                              Level {item.level}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border transition-colors duration-300 ${
                                  item.subject === 'bahasa_indonesia'
                                    ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                                    : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                                }`}
                              >
                                {item.subject === 'bahasa_indonesia' ? 'Bahasa Indonesia' : 'Matematika'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#6E6258]">
                              <div className="flex items-center space-x-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#8C7E72]" />
                                <span>{item.date}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-[#261C14]">
                              {item.correct} / {item.total} Benar
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border transition-colors duration-300 ${
                                item.subject === 'bahasa_indonesia'
                                  ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]'
                                  : 'bg-[#FFF1F2] text-[#881337] border-[#FECDD3]'
                              }`}>
                                {item.score}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex items-center space-x-1 text-[#286657] font-semibold bg-[#E8F2EF] border border-[#C5DDD6] px-2 py-0.5 rounded-full text-[11px]">
                                <CheckCircle2 className="w-3 h-3 text-[#286657]" />
                                <span>Tuntas</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Rapor;
