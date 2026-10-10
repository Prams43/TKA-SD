import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Flame, Award, Sparkles, X, ChevronRight, Star } from 'lucide-react';

/**
 * Audio Synthesizer (Web Audio API) untuk fanfare perayaan ala Duolingo.
 * Berjalan murni di browser tanpa memerlukan file audio eksternal.
 */
const playCelebrationChime = (isLevelUp) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (isLevelUp) {
      // Fanfare Arpeggio Menang: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.11);
        gain.gain.setValueAtTime(0.2, now + i * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.11);
        osc.stop(now + i * 0.11 + 0.45);
      });
    } else {
      // Chime Ringan EXP: E5 -> B5
      const notes = [659.25, 987.77];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.14, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.35);
      });
    }
  } catch (_) {
    // Abaikan jika browser memblokir audio otomatis
  }
};

/**
 * Komponen Modal Perayaan EXP & Naik Level Ala Duolingo
 */
const RewardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState(null);
  const [animProgress, setAnimProgress] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    const handleRewardEarned = (e) => {
      const data = e.detail;
      if (!data || !data.expEarned) return;

      setReward(data);
      setIsOpen(true);

      // Mainkan suara perayaan ala Duolingo
      playCelebrationChime(data.leveledUp);

      // Generate partikel konfeti warna-warni
      const colors = ['#58CC02', '#FFC800', '#1CB0F6', '#FF4B4B', '#CE82FF', '#FF9600'];
      const pieces = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 1.8 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
      }));
      setConfettiPieces(pieces);

      // Animasi pengisian XP bar
      setAnimProgress(0);
      setTimeout(() => {
        setAnimProgress(data.newLevelInfo?.progressPercent || 100);
      }, 250);
    };

    window.addEventListener('tka_reward_earned', handleRewardEarned);
    return () => {
      window.removeEventListener('tka_reward_earned', handleRewardEarned);
    };
  }, []);

  if (!isOpen || !reward) return null;

  const {
    expEarned,
    newExp,
    newLevelInfo,
    prevLevelInfo,
    leveledUp,
    streak,
    newTitlesUnlocked = [],
  } = reward;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-hidden">
      {/* Konfeti Berjatuhan (Duolingo Confetti Shower) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute rounded-sm opacity-90"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              width: `${piece.size}px`,
              height: `${piece.size * 0.7}px`,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(115vh) rotate(720deg) scale(1);
            opacity: 0;
          }
        }
      `}</style>

      {/* Kartu Pop-up Utama */}
      <div className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl border-4 border-amber-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden text-center p-6 sm:p-8 animate-scale-up z-10">
        {/* Tombol Tutup Silang di Sudut */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Aura Cahaya Matahari Berputar di Belakang Icon */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-tr from-amber-300/40 via-yellow-200/50 to-orange-300/30 rounded-full blur-2xl animate-spin-slow pointer-events-none" />

        {/* ============================================================== */}
        {/* TAMPILAN JIKA NAIK LEVEL (LEVEL UP)                            */}
        {/* ============================================================== */}
        {leveledUp ? (
          <div className="space-y-5 relative">
            {/* Badge Pill Header */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs animate-bounce-slow">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>PENCAPAIAN LUAR BIASA!</span>
            </div>

            {/* Hero Mascot Icon Level Up */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 rotate-6 shadow-xl animate-pulse" />
              <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-yellow-400 via-amber-400 to-orange-500 flex flex-col items-center justify-center text-slate-950 border-4 border-white shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform">
                <Trophy className="w-12 h-12 text-slate-950 drop-shadow-md mb-0.5" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-900 bg-white/70 px-2 rounded-full">
                  LEVEL UP
                </span>
              </div>
            </div>

            {/* Teks Judul & Ucapan Selamat */}
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                KAMU NAIK LEVEL!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Selamat! Kamu berhasil menembus ke{' '}
                <strong className="text-amber-600 font-black">Level {newLevelInfo.level}</strong>!
              </p>
            </div>

            {/* Transisi Indikator Level (Lv. 1 -> Lv. 2) */}
            <div className="flex items-center justify-center space-x-3 bg-amber-50/80 p-3 rounded-2xl border border-amber-200/80">
              <div className="px-3 py-1.5 rounded-xl bg-white text-slate-500 border border-slate-200 text-xs font-black line-through">
                Lv. {prevLevelInfo?.level || newLevelInfo.level - 1}
              </div>
              <ChevronRight className="w-5 h-5 text-amber-500 animate-pulse" />
              <div className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-black shadow-md border-2 border-white scale-110">
                Lv. {newLevelInfo.level}
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* TAMPILAN JIKA MENDAPATKAN EXP (EXP EARNED)                      */
          /* ============================================================== */
          <div className="space-y-5 relative">
            {/* Badge Pill Header */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider border border-blue-300 shadow-xs">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>SESI BELAJAR TUNTAS!</span>
            </div>

            {/* Hero Icon EXP Gemstone */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-400 to-teal-300 rotate-6 shadow-xl" />
              <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 flex flex-col items-center justify-center text-white border-4 border-white shadow-2xl animate-bounce-slow">
                <span className="text-3xl font-black">⚡</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-100">
                  +{expEarned} EXP
                </span>
              </div>
            </div>

            {/* Teks Judul */}
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                +{expEarned} EXP DIRAIH!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Kerja bagus! Usahamu membuatmu semakin dekat ke target juara TKA SD.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BAR EXP PROGRESS ALA DUOLINGO                                  */}
        {/* ============================================================== */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-left space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-800 flex items-center space-x-1">
              <span>Level {newLevelInfo?.level}</span>
            </span>
            <span className="font-black text-blue-600">
              {newLevelInfo?.currentLevelExp} / {newLevelInfo?.nextLevelExp} EXP
            </span>
          </div>

          {/* Bar Progress Smooth Filling */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${animProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Total {newExp} EXP</span>
            <span>
              {100 - (newLevelInfo?.currentLevelExp || 0)} EXP menuju Level{' '}
              {(newLevelInfo?.level || 1) + 1}
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KARTU STREAK BONUS (JIKA ADA STREAK AKTIF)                     */}
        {/* ============================================================== */}
        {streak?.count > 0 && (
          <div className="mt-3 flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 text-xs">
            <div className="flex items-center space-x-2 text-left">
              <span className="text-xl">🔥</span>
              <div>
                <strong className="text-orange-900 block font-black">
                  Streak {streak.count} Hari Menyala!
                </strong>
                <span className="text-[11px] text-orange-700/90 font-medium">
                  Kebiasaan belajar harianmu terus terjaga
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-orange-500 text-white font-black text-[10px] uppercase shadow-xs">
              AKTIF
            </span>
          </div>
        )}

        {/* ============================================================== */}
        {/* GELAR BARU TERBUKA (JIKA MEMENUHI SYARAT GELAR BARU)           */}
        {/* ============================================================== */}
        {newTitlesUnlocked.length > 0 && (
          <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-xs text-left flex items-center space-x-2.5 animate-bounce-slow">
            <span className="text-2xl">{newTitlesUnlocked[0]?.icon || '🏆'}</span>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-purple-700 block">
                🎉 GELAR BARU TERBUKA!
              </span>
              <strong className="text-purple-950 font-bold text-xs">
                {newTitlesUnlocked[0]?.name}
              </strong>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TOMBOL CHUNKY 3D ALA DUOLINGO (BEROTOT & MENYENANGKAN)         */}
        {/* ============================================================== */}
        <div className="mt-6">
          <button
            onClick={handleClose}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider text-white shadow-lg active:translate-y-1 active:border-b-0 transition-all cursor-pointer ${
              leveledUp
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 border-b-4 border-orange-700 shadow-orange-500/20'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-b-4 border-emerald-700 shadow-emerald-500/20'
            }`}
          >
            {leveledUp ? 'Lanjutkan Perjuangan 🚀' : 'Keren, Lanjutkan! 👍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
