import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';
import { Sparkles, Trophy, Calendar, CheckCircle2, Info, Bell } from 'lucide-react';

/**
 * Halaman Dashboard Utama (Route "/dashboard", Terlindungi)
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [notification, setNotification] = useState('');

  // Data dummy riwayat nilai latihan
  const dummyHistory = [
    {
      id: 1,
      subject: 'Matematika Dasar',
      date: '28 Sep 2026',
      score: 92,
      totalQuestions: 30,
      status: 'Selesai',
    },
    {
      id: 2,
      subject: 'Bahasa Indonesia - Pemahaman Bacaan',
      date: '26 Sep 2026',
      score: 88,
      totalQuestions: 30,
      status: 'Selesai',
    },
    {
      id: 3,
      subject: 'Matematika - Pecahan & Geometri',
      date: '23 Sep 2026',
      score: 95,
      totalQuestions: 25,
      status: 'Selesai',
    },
  ];

  const handleStartPractice = (subjectTitle) => {
    setNotification(`Simulasi latihan untuk ${subjectTitle} akan segera hadir dalam rilis berikutnya!`);
    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar Atas */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifikasi Toast Interaktif */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-sm flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="font-medium">{notification}</span>
            </div>
            <button
              onClick={() => setNotification('')}
              className="text-blue-500 hover:text-blue-700 text-xs font-bold px-2 py-1"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Hero Section: Sapaan & Penjelasan Singkat */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-500/10 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selamat Datang di Portal Ujian</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Halo, {user?.username || user?.email?.split('@')[0] || 'Siswa'}! 👋
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              Platform latihan <strong>Tes Kemampuan Akademik (TKA) SD</strong> dirancang khusus untuk mengukur
              dan mengasah kemampuan literasi membaca, pemecahan masalah logika, dan numerasi siswa sekolah dasar.
              Tingkatkan prestasimu dengan latihan rutin!
            </p>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
              <div>
                <span className="text-blue-200 block text-xs">Target Ujian</span>
                <span className="font-bold text-white">TKA SD 2026/2027</span>
              </div>
              <div>
                <span className="text-blue-200 block text-xs">Mata Uji Aktif</span>
                <span className="font-bold text-white">2 Mata Pelajaran</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-blue-200 block text-xs">Status Akun</span>
                <span className="font-bold text-emerald-300">Terverifikasi Aktif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Mata Pelajaran (2 Kartu) */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Pilihan Mata Pelajaran</h2>
              <p className="text-sm text-slate-500">Pilih modul materi latihan yang ingin kamu kerjakan hari ini</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kartu 1: Bahasa Indonesia */}
            <SubjectCard
              title="Bahasa Indonesia"
              description="Menguji pemahaman teks narasi, ide pokok paragraf, kosa kata baku, penalaran informasi tersurat dan tersirat."
              questionCount={30}
              duration="45 Menit"
              iconType="book"
              onStart={() => handleStartPractice('Bahasa Indonesia')}
            />

            {/* Kartu 2: Matematika */}
            <SubjectCard
              title="Matematika"
              description="Menguji kemampuan berhitung aritmatika, operasi pecahan, perbandingan, luas dan keliling bangun datar, serta logika soal cerita."
              questionCount={30}
              duration="60 Menit"
              iconType="calculator"
              onStart={() => handleStartPractice('Matematika')}
            />
          </div>
        </section>

        {/* Bagian Riwayat Nilai Dummy */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-12">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Riwayat Nilai Latihan</h3>
                <p className="text-xs text-slate-500">Rekap hasil try out dan evaluasi nilai terakhir Anda</p>
              </div>
            </div>
          </div>

          {/* Tabel Riwayat */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Mata Pelajaran</th>
                  <th scope="col" className="px-6 py-4">Tanggal Pengerjaan</th>
                  <th scope="col" className="px-6 py-4 text-center">Jumlah Soal</th>
                  <th scope="col" className="px-6 py-4 text-center">Nilai Akhir</th>
                  <th scope="col" className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dummyHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>{item.subject}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-center font-medium">
                      {item.totalQuestions} butir
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {item.score} / 100
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{item.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-slate-400" />
              <span>Data di atas merupakan riwayat evaluasi berkala untuk persiapan TKA SD.</span>
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} TKA SD. Seluruh hak cipta dilindungi.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
