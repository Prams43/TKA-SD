import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getFullStats } from '../utils/activityTracker';
import {
  TrendingUp,
  Award,
  BookOpen,
  Trophy,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  Target,
  ArrowLeft,
  LayoutDashboard,
  Star,
} from 'lucide-react';

/**
 * Halaman Penuh Rapor Aktivitas Belajar Siswa TKA SD
 * Menampilkan statistik komprehensif dari seluruh aktivitas:
 * - Pembacaan Materi
 * - Latihan Soal Berjenjang
 * - Simulasi Tryout Nasional
 * - Pemetaan Penguasaan Matriks Asesmen Pusmendik
 */
const Rapor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ringkasan'); // 'ringkasan' | 'tryout' | 'latihan'

  const stats = getFullStats();

  return (
    <div className="min-h-screen flex flex-col bg-doodle-pattern text-slate-800 selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Konten Utama Halaman Rapor */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-8 flex flex-col animate-fade-in">
        {/* Breadcrumb & Tombol Kembali ke Dashboard */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-purple-700 font-semibold flex items-center space-x-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span className="font-bold text-[#0a1e4a]">Rapor Statistik Belajar</span>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-700 hover:text-purple-700 text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kembali ke Dashboard</span>
            <span className="sm:hidden">Kembali</span>
          </button>
        </div>

        {/* Kartu Utama Rapor */}
        <div className="bg-white border border-slate-200/90 rounded-3xl w-full flex-1 flex flex-col shadow-xl text-slate-800 overflow-hidden relative">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-purple-400/10 blur-3xl pointer-events-none" />

          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
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
          </div>

          {/* Sub-Nav Tabs */}
          <div className="flex border-b border-slate-200 px-4 sm:px-6 bg-slate-50/50">
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

          {/* Body Content */}
          <div className="flex-1 p-4 sm:p-6 space-y-6 bg-white">
            {activeTab === 'ringkasan' && (
              <>
                {/* 4 Kartu Statistik Cepat */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Materi Tuntas</span>
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">
                        {stats.materiSelesai}{' '}
                        <span className="text-xs text-slate-500 font-normal">
                          / {stats.totalMateriTersedia} Bab
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-1 text-[11px] font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{stats.totalBintangMateri || 0} / {stats.maxBintangMateri || 99} Bintang</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${stats.persenMateri}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Latihan Soal</span>
                        <Target className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">
                        {stats.latihanSelesai || 0}{' '}
                        <span className="text-xs text-slate-500 font-normal">
                          / {stats.totalLatihanTersedia || 20} Level ({stats.akurasiLatihan}%)
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-1 text-[11px] font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{stats.totalBintangLatihan || 0} / {stats.maxBintangLatihan || 60} Bintang</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${stats.persenLatihan || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Rata-rata Tryout</span>
                      <Trophy className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      {stats.rataRataTryout}
                    </div>
                    <span className="text-[11px] text-amber-700 font-medium mt-1 block">
                      Dari {stats.totalTryout} sesi tryout
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
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
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-4">
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
                    {stats.kompetensi.map((k, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-slate-900 block">{k.nama}</strong>
                            <span className="text-[10px] text-slate-500">{k.mapel}</span>
                          </div>
                          <span className="font-bold text-blue-600">{k.nilai}%</span>
                        </div>

                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
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
                          <span className="text-[10px] text-slate-500 font-medium">
                            Status: <strong className="text-slate-800">{k.status}</strong>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Catatan / Rekomendasi Personal */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 flex items-start space-x-3 text-xs shadow-sm">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-purple-950">Rekomendasi Belajar untuk Kamu</h4>
                    <p className="text-slate-700 leading-relaxed">
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
                  <h3 className="text-sm font-bold text-slate-900">Riwayat Simulasi Tryout</h3>
                  <span className="text-xs text-slate-500">Total {stats.tryoutHistory.length} kali tryout</span>
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
                      {stats.tryoutHistory.map((item) => (
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
      </main>
    </div>
  );
};

export default Rapor;
