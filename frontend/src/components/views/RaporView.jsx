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

  if (!isOpen) return null;

  const stats = getFullStats();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full min-h-[550px] max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden relative">
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* 1. Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <span>📊 Rapor Statistik Aktivitas Belajar</span>
              </h2>
              <p className="text-xs text-slate-400">
                Pantau perkembangan kompetensi TKA SD Bahasa Indonesia & Matematika
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

        {/* 2. Sub-Nav Tabs */}
        <div className="flex border-b border-slate-800 px-4 sm:px-6 bg-slate-950/20">
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'ringkasan'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Ringkasan & Kompetensi
          </button>
          <button
            onClick={() => setActiveTab('tryout')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'tryout'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Riwayat Tryout ({stats.totalTryout})
          </button>
          <button
            onClick={() => setActiveTab('latihan')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'latihan'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Riwayat Latihan ({stats.totalLatihan})
          </button>
        </div>

        {/* 3. Body Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {activeTab === 'ringkasan' && (
            <>
              {/* 4 Kartu Statistik Cepat */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Materi Tuntas</span>
                    <BookOpen className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {stats.materiSelesai}{' '}
                    <span className="text-xs text-slate-400 font-normal">
                      / {stats.totalMateriTersedia} Bab
                    </span>
                  </div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${stats.persenMateri}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Akurasi Latihan</span>
                    <Target className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {stats.akurasiLatihan}%
                  </div>
                  <span className="text-[11px] text-emerald-400 mt-1 block">
                    {stats.totalSoalBenar} dari {stats.totalSoalDijawab} soal benar
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Rata-rata Tryout</span>
                    <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {stats.rataRataTryout}
                  </div>
                  <span className="text-[11px] text-amber-400 mt-1 block">
                    Dari {stats.totalTryout} sesi tryout
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Predikat Nilai</span>
                    <Award className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-purple-300">
                    Sangat Baik (A)
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Standar TKA Nasional
                  </span>
                </div>
              </div>

              {/* Matriks Asesmen Penguasaan Kompetensi Pusmendik */}
              <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" />
                      <span>Pemetaan Kompetensi Berdasarkan Asesmen Pusmendik</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tingkat penguasaan elemen materi Bahasa Indonesia dan Matematika
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {stats.kompetensi.map((k, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/50 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-white block">{k.nama}</strong>
                          <span className="text-[10px] text-slate-400">{k.mapel}</span>
                        </div>
                        <span className="font-bold text-blue-300">{k.nilai}%</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            k.nilai >= 90
                              ? 'bg-emerald-500'
                              : k.nilai >= 80
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${k.nilai}%` }}
                        />
                      </div>

                      <div className="flex justify-end">
                        <span className="text-[10px] text-slate-400 font-medium">
                          Status: <strong className="text-slate-200">{k.status}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catatan / Rekomendasi Personal */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-800/60 border border-purple-500/30 flex items-start space-x-3 text-xs">
                <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white">Rekomendasi Belajar untuk Kamu</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Penguasaanmu pada materi <strong>Bilangan</strong> dan <strong>Pemahaman Tekstual</strong> sudah sangat kuat! Pertahankan prestasimu dan tingkatkan latihan pada bab <strong>Geometri & Pengukuran</strong> untuk memaksimalkan perolehan nilai pada Tryout Akbar berikutnya.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* TAB RIWAYAT TRYOUT */}
          {activeTab === 'tryout' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Riwayat Simulasi Tryout</h3>
                <span className="text-xs text-slate-400">Total {stats.tryoutHistory.length} kali tryout</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-800/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-700/80">
                    <tr>
                      <th className="px-4 py-3">Paket Tryout</th>
                      <th className="px-4 py-3">Mata Pelajaran</th>
                      <th className="px-4 py-3">Tanggal</th>
                      <th className="px-4 py-3 text-center">Jawaban Benar</th>
                      <th className="px-4 py-3 text-center">Nilai Akhir</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {stats.tryoutHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white">
                          Paket {item.packageNum}
                        </td>
                        <td className="px-4 py-3 text-slate-300 capitalize">
                          {item.subject === 'bahasa_indonesia' ? 'Bahasa Indonesia' : 'Matematika'}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{item.date}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-300">
                          {item.correct} / {item.total} Soal
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            {item.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Selesai</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB RIWAYAT LATIHAN SOAL */}
          {activeTab === 'latihan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Riwayat Latihan Soal Berjenjang</h3>
                <span className="text-xs text-slate-400">Total {stats.latihanHistory.length} sesi latihan</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-800/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-700/80">
                    <tr>
                      <th className="px-4 py-3">Tingkatan Level</th>
                      <th className="px-4 py-3">Mata Pelajaran</th>
                      <th className="px-4 py-3">Tanggal</th>
                      <th className="px-4 py-3 text-center">Jawaban Benar</th>
                      <th className="px-4 py-3 text-center">Nilai</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {stats.latihanHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white">
                          Level {item.level}
                        </td>
                        <td className="px-4 py-3 text-slate-300 capitalize">
                          {item.subject === 'bahasa_indonesia' ? 'Bahasa Indonesia' : 'Matematika'}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>{item.date}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-300">
                          {item.correct} / {item.total} Soal
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {item.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center space-x-1 text-emerald-400 font-semibold">
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
