import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CharacterIllustration from '../components/CharacterIllustration';
import PillMenuButton from '../components/PillMenuButton';
import MateriView from '../components/views/MateriView';
import LatihanSoalView from '../components/views/LatihanSoalView';
import TryoutView from '../components/views/TryoutView';
import RaporView from '../components/views/RaporView';
import { BookOpen, FileQuestion, Trophy, BarChart3 } from 'lucide-react';

/**
 * Halaman Dashboard Utama TKA SD
 * 
 * Fitur:
 * 1. Background gradient biru gelap berkelas dengan ambient glow
 * 2. 4 Tombol Menu Kapsul Interaktif (Materi, Latihan Soal, Tryout, Rapor)
 * 3. Karakter Siswa Cerdas tetap di sebelah kanan tombol (bahkan saat di layar mobile)
 * 4. Modul Lengkap Berstandar Pusmendik Kemendikdasmen:
 *    - Materi (Bahasa Indonesia & Matematika, 3 Soal di akhir dengan hint dan baca ulang)
 *    - Latihan Soal (Level 1-3 = 5 soal, Level 4-7 = 10 soal, Level 8-10 = 20 soal + Review Penjelasan)
 *    - Tryout (5 Paket per mapel, 30 Soal HOTS/Sedang/Mudah acak, PG + Isian Singkat)
 *    - Rapor (Statistik lengkap aktivitas belajar murid)
 */
const Dashboard = () => {
  const { user } = useAuth();
  // State untuk kontrol tampilan modul aktif
  const [activeModal, setActiveModal] = useState(null); // 'materi' | 'latihan' | 'tryout' | 'rapor' | null

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* 1. Navbar Bagian Atas */}
      <Navbar />

      {/* 2. Area Utama di Bawah Navbar: Gradient Biru ke Arah Gelap */}
      <main className="flex-1 relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#0a1e4a] via-[#071534] to-[#030914] px-3 sm:px-6 lg:px-12 py-5 sm:py-10">
        {/* Dekorasi Cahaya Ambient (Glow Effect) di Latar Belakang */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-600/15 blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-indigo-500/10 blur-[120px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-emerald-500/10 blur-[80px] sm:blur-[100px] pointer-events-none" />

        {/* Pola Grid Halus Modern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col justify-center">
          {/* Header Judul (Responsive di atas menu) */}
          <div className="mb-4 sm:mb-8 text-center lg:text-left animate-fade-in">
            <span className="inline-block px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md">
              🎯 Asesmen Standar Pusmendik Kemendikdasmen
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight">
              Halo, {user?.username || user?.email?.split('@')[0] || 'Siswa'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Selamat datang di Portal Latihan TKA SD. Pilih menu di bawah untuk mulai belajar!
            </p>
          </div>

          {/* Kontainer 2 Kolom (Side-by-side tetap berdampingan di Mobile & Desktop) */}
          <div className="grid grid-cols-12 gap-2 sm:gap-6 lg:gap-12 items-center">
            {/* Kolom Kiri: 4 Tombol Menu Kapsul (Lebar 7/12 di mobile, 6/12 di desktop) */}
            <section className="col-span-7 sm:col-span-7 lg:col-span-6 flex flex-col justify-center space-y-2.5 sm:space-y-4 md:space-y-5">
              {/* Tombol 1: Materi */}
              <PillMenuButton
                label="Materi"
                icon={BookOpen}
                accentColor="blue"
                badgeText="BI & MTK"
                onClick={() => setActiveModal('materi')}
              />

              {/* Tombol 2: Latihan Soal */}
              <PillMenuButton
                label="Latihan Soal"
                icon={FileQuestion}
                accentColor="emerald"
                badgeText="Level 1-10"
                onClick={() => setActiveModal('latihan')}
              />

              {/* Tombol 3: Tryout */}
              <PillMenuButton
                label="Tryout"
                icon={Trophy}
                accentColor="amber"
                badgeText="5 Paket"
                onClick={() => setActiveModal('tryout')}
              />

              {/* Tombol 4: Rapor */}
              <PillMenuButton
                label="Rapor"
                icon={BarChart3}
                accentColor="purple"
                badgeText="Statistik"
                onClick={() => setActiveModal('rapor')}
              />
            </section>

            {/* Kolom Kanan: Karakter Siswa Tetap di Sebelah Kanan pada Mobile (5/12 di mobile, 6/12 di desktop) */}
            <section className="col-span-5 sm:col-span-5 lg:col-span-6 flex items-center justify-center">
              <CharacterIllustration />
            </section>
          </div>
        </div>
      </main>

      {/* 3. Tampilan Modul Interaktif Sesuai Permintaan */}
      <MateriView
        isOpen={activeModal === 'materi'}
        onClose={() => setActiveModal(null)}
      />

      <LatihanSoalView
        isOpen={activeModal === 'latihan'}
        onClose={() => setActiveModal(null)}
      />

      <TryoutView
        isOpen={activeModal === 'tryout'}
        onClose={() => setActiveModal(null)}
      />

      <RaporView
        isOpen={activeModal === 'rapor'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default Dashboard;
