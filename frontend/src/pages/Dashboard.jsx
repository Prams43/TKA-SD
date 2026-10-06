import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CharacterIllustration from '../components/CharacterIllustration';
import PillMenuButton from '../components/PillMenuButton';
import { BookOpen, FileQuestion, Trophy, BarChart3 } from 'lucide-react';

/**
 * Halaman Dashboard Utama TKA SD
 * 
 * Fitur:
 * 1. Background gradient doodle edukasi terang & bersih
 * 2. 4 Tombol Menu Kapsul Navy Interaktif (Materi, Latihan Soal, Tryout, Rapor)
 * 3. Membuka Halaman Penuh Baru saat tombol ditekan (bukan modal pop-up)
 * 4. Karakter Siswa Cerdas tetap di sebelah kanan tombol
 */
const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-doodle-pattern text-slate-800 selection:bg-blue-200 selection:text-blue-900">
      {/* 1. Navbar Bagian Atas (Navy) */}
      <Navbar />

      {/* 2. Area Utama di Bawah Navbar: Background Putih Doodle Edukasi */}
      <main className="flex-1 relative flex flex-col justify-center items-center overflow-hidden px-3 sm:px-6 lg:px-12 py-5 sm:py-10">
        {/* Dekorasi Cahaya Ambient Lembut di Latar Belakang */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-400/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-indigo-300/10 blur-[120px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-emerald-300/10 blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col justify-center">
          {/* Header Judul */}
          <div className="mb-4 sm:mb-8 text-center lg:text-left animate-fade-in">
            <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-100/90 text-[#0a1e4a] border border-blue-200 shadow-sm backdrop-blur-sm">
                Asesmen Standar Pusmendik Kemendikdasmen
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a1e4a] mt-2 tracking-tight">
              Halo, {user?.username || user?.email?.split('@')[0] || 'Siswa'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
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
                onClick={() => navigate('/materi')}
              />

              {/* Tombol 2: Latihan Soal */}
              <PillMenuButton
                label="Latihan Soal"
                icon={FileQuestion}
                accentColor="emerald"
                onClick={() => navigate('/latihan')}
              />

              {/* Tombol 3: Tryout */}
              <PillMenuButton
                label="Tryout"
                icon={Trophy}
                accentColor="amber"
                onClick={() => navigate('/tryout')}
              />

              {/* Tombol 4: Rapor */}
              <PillMenuButton
                label="Rapor"
                icon={BarChart3}
                accentColor="purple"
                onClick={() => navigate('/rapor')}
              />
            </section>

            {/* Kolom Kanan: Karakter Siswa Tetap di Sebelah Kanan pada Mobile (5/12 di mobile, 6/12 di desktop) */}
            <section className="col-span-5 sm:col-span-5 lg:col-span-6 flex items-center justify-center">
              <CharacterIllustration />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
