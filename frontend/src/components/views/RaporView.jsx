import React, { useState } from 'react';
import { getFullStats } from '../../utils/activityTracker';
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
  Download,
  X,
} from 'lucide-react';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Sangat Mahir':
      return 'bg-emerald-50 text-emerald-700 border-emerald-300';
    case 'Mahir':
      return 'bg-blue-50 text-blue-700 border-blue-300';
    case 'Cukup Mahir':
      return 'bg-amber-50 text-amber-700 border-amber-300';
    case 'Perlu Latihan':
      return 'bg-rose-50 text-rose-700 border-rose-300';
    case 'Belum Dimulai':
    default:
      return 'bg-slate-100 text-slate-600 border-slate-300';
  }
};

/**
 * Komponen Rapor Aktivitas Belajar Siswa TKA SD
 * Menampilkan statistik komprehensif dari seluruh aktivitas:
 * - Pembacaan Materi
 * - Latihan Soal Berjenjang
 * - Simulasi Tryout Nasional
 * - Pemetaan Penguasaan Matriks Asesmen Pusmendik
 */
const RaporView = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('ringkasan'); // 'ringkasan' | 'tryout' | 'latihan'
  const [tryoutFilter, setTryoutFilter] = useState('all'); // 'all' | 'bahasa_indonesia' | 'matematika'

  if (!isOpen) return null;

  const stats = getFullStats();
  const filteredTryouts = (stats.tryoutHistory || []).filter((item) => {
    if (tryoutFilter === 'all') return true;
    return item.subject === tryoutFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white border-2 border-slate-400 rounded-2xl sm:rounded-3xl max-w-4xl w-full min-h-0 sm:min-h-[520px] max-h-[92vh] flex flex-col shadow-2xl text-slate-800 overflow-hidden relative">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-purple-400/10 blur-3xl pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="p-4 sm:p-5 border-b-2 border-slate-300 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>📊 Rapor Statistik Aktivitas Belajar</span>
              </h2>
              <p className="text-xs text-slate-500">
                Pantau perkembangan kompetensi TKA SD Bahasa Indonesia & Matematika
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Sub-Nav Tabs */}
        <div className="flex border-b-2 border-slate-300 px-4 sm:px-6 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'ringkasan'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ringkasan & Kompetensi
          </button>
          <button
            onClick={() => setActiveTab('tryout')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'tryout'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Riwayat Tryout ({stats.totalTryout})
          </button>
          <button
            onClick={() => setActiveTab('latihan')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'latihan'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Riwayat Latihan ({stats.totalLatihan})
          </button>
        </div>

        {/* 3. Body Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {activeTab === 'ringkasan' && (
            <>
              {/* 4 Kartu Statistik Cepat dengan Outline Berwarna Kontras */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border-2 border-[#047857] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Materi Tuntas</span>
                    <BookOpen className="w-4 h-4 text-[#047857]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    {stats.materiSelesai}{' '}
                    <span className="text-xs text-slate-500 font-normal">
                      / {stats.totalMateriTersedia} Bab
                    </span>
                  </div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#047857] rounded-full"
                      style={{ width: `${stats.persenMateri}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-[#881337] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Akurasi Latihan</span>
                    <Target className="w-4 h-4 text-[#881337]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    {stats.akurasiLatihan}%
                  </div>
                  <span className="text-[11px] text-[#881337] font-medium mt-1 block">
                    {stats.totalSoalBenar} dari {stats.totalSoalDijawab} soal benar
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-amber-600 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Tryout</span>
                      <Trophy className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <div className="p-2 rounded-xl bg-slate-50 border border-[#047857]/30">
                        <div className="flex items-center space-x-1 text-[10px] font-bold text-[#047857]">
                          <BookOpen className="w-3 h-3 text-[#047857] shrink-0" />
                          <span className="truncate">B. Indo</span>
                        </div>
                        <div className="text-base sm:text-lg font-black text-[#047857] mt-0.5">
                          {stats.paketTryoutSelesaiBI}
                          <span className="text-[10px] font-normal text-slate-500 ml-0.5">/ {stats.totalPaketBITersedia} Paket</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-[#881337]/30">
                        <div className="flex items-center space-x-1 text-[10px] font-bold text-[#881337]">
                          <Calculator className="w-3 h-3 text-[#881337] shrink-0" />
                          <span className="truncate">MTK</span>
                        </div>
                        <div className="text-base sm:text-lg font-black text-[#881337] mt-0.5">
                          {stats.paketTryoutSelesaiMTK}
                          <span className="text-[10px] font-normal text-slate-500 ml-0.5">/ {stats.totalPaketMTKTersedia} Paket</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
                      <span>{stats.persenTryout}% Selesai</span>
                      <span className="text-[10px] text-slate-400">
                        {stats.totalPaketTryoutSelesai} / {stats.totalPaketTryoutTersedia} Paket
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(4, stats.persenTryout)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-purple-600 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Predikat Nilai</span>
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-purple-700">
                    Sangat Baik (A)
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Standar TKA Nasional
                  </span>
                </div>
              </div>

              {/* Matriks Asesmen Penguasaan Kompetensi Pusmendik */}
              <div className="p-5 rounded-2xl bg-slate-50/70 border-2 border-slate-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <span>Pemetaan Kompetensi Berdasarkan Asesmen Pusmendik</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tingkat penguasaan elemen materi Bahasa Indonesia dan Matematika
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Kolom Kiri: Seluruh Kompetensi Bahasa Indonesia */}
                  <div className="space-y-3.5">
                    {stats.kompetensi
                      .filter((k) => k.mapel === 'Bahasa Indonesia')
                      .map((k, idx) => (
                        <div
                          key={`bi-${idx}`}
                          className="p-3.5 rounded-xl bg-white border-2 border-[#047857] shadow-sm space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <strong className="text-slate-900 block">{k.nama}</strong>
                              <span className="text-[10px] text-slate-500">{k.mapel}</span>
                            </div>
                            <span className="font-bold text-[#047857]">{k.nilai}%</span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#047857]"
                              style={{ width: `${k.nilai}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-0.5">
                            <span className="text-[10px] text-slate-500 font-medium truncate mr-2">
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

                  {/* Kolom Kanan: Seluruh Kompetensi Matematika */}
                  <div className="space-y-3.5">
                    {stats.kompetensi
                      .filter((k) => k.mapel === 'Matematika')
                      .map((k, idx) => (
                        <div
                          key={`mtk-${idx}`}
                          className="p-3.5 rounded-xl bg-white border-2 border-[#881337] shadow-sm space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <strong className="text-slate-900 block">{k.nama}</strong>
                              <span className="text-[10px] text-slate-500">{k.mapel}</span>
                            </div>
                            <span className="font-bold text-[#881337]">{k.nilai}%</span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#881337]"
                              style={{ width: `${k.nilai}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-0.5">
                            <span className="text-[10px] text-slate-500 font-medium truncate mr-2">
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

              {/* Catatan / Rekomendasi Personal Dinamis */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 flex items-start space-x-3 text-xs shadow-sm">
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-purple-950">Rekomendasi Belajar untuk Kamu</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {stats.rekomendasi?.kuat && stats.rekomendasi?.kuat !== 'Belum Ada Aktivitas' ? (
                      <>
                        Penguasaanmu pada materi <strong>{stats.rekomendasi.kuat}</strong> sudah sangat kuat!{' '}
                        {stats.rekomendasi.lemah && stats.rekomendasi.lemah !== 'Pertahankan Seluruh Topik' && (
                          <>
                            Tingkatkan latihan pada topik <strong>{stats.rekomendasi.lemah}</strong>.{' '}
                          </>
                        )}
                        {stats.rekomendasi.saranAksi}
                      </>
                    ) : (
                      <span>{stats.rekomendasi?.saranAksi || 'Mulai pelajari materi dan kerjakan latihan soal untuk melacak kompetensimu!'}</span>
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* TAB RIWAYAT TRYOUT */}
          {activeTab === 'tryout' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Riwayat Simulasi Tryout</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Catatan pengerjaan 30 butir soal simulasi Asesmen TKA SD.
                  </p>
                </div>
                <span className="text-xs text-slate-500">Total {stats.tryoutHistory.length} kali tryout</span>
              </div>

              {/* Banner Rata-rata Terpisah per Mata Pelajaran */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border-2 border-[#047857] shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-[#047857]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Bahasa Indonesia</h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {stats.totalTryoutBI} sesi tryout
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-medium">Rata-rata</span>
                    <span className="text-lg font-black text-[#047857]">
                      {stats.totalTryoutBI > 0 ? stats.rataRataTryoutBI : '-'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border-2 border-[#881337] shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center shrink-0">
                      <Calculator className="w-4 h-4 text-[#881337]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Matematika</h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {stats.totalTryoutMTK} sesi tryout
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block font-medium">Rata-rata</span>
                    <span className="text-lg font-black text-[#881337]">
                      {stats.totalTryoutMTK > 0 ? stats.rataRataTryoutMTK : '-'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Filter Tab Mapel */}
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => setTryoutFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    tryoutFilter === 'all'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
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

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Paket Tryout</th>
                      <th className="px-4 py-3">Mata Pelajaran</th>
                      <th className="px-4 py-3">Tanggal</th>
                      <th className="px-4 py-3 text-center">Jawaban Benar</th>
                      <th className="px-4 py-3 text-center">Nilai Akhir</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTryouts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-xs text-slate-500">
                          Belum ada riwayat tryout untuk filter ini.
                        </td>
                      </tr>
                    ) : (
                      filteredTryouts.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          Paket {item.packageNum}
                        </td>
                        <td className="px-4 py-3 text-slate-700 capitalize">
                          {item.subject === 'bahasa_indonesia' ? 'Bahasa Indonesia' : 'Matematika'}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.date}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-700">
                          {item.correct} / {item.total} Soal
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            {item.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
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

          {/* TAB RIWAYAT LATIHAN SOAL */}
          {activeTab === 'latihan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Riwayat Latihan Soal Berjenjang</h3>
                <span className="text-xs text-slate-500">Total {stats.latihanHistory.length} sesi latihan</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Tingkatan Level</th>
                      <th className="px-4 py-3">Mata Pelajaran</th>
                      <th className="px-4 py-3">Tanggal</th>
                      <th className="px-4 py-3 text-center">Jawaban Benar</th>
                      <th className="px-4 py-3 text-center">Nilai</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.latihanHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          Level {item.level}
                        </td>
                        <td className="px-4 py-3 text-slate-700 capitalize">
                          {item.subject === 'bahasa_indonesia' ? 'Bahasa Indonesia' : 'Matematika'}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.date}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-700">
                          {item.correct} / {item.total} Soal
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {item.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center space-x-1 text-emerald-600 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tuntas</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaporView;
