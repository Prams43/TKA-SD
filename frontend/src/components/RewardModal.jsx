import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Zap, Flame, Award, Sparkles, X, ChevronRight } from 'lucide-react';

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
        gain.gain.setValueAtTime(0.18, now + i * 0.11);
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
        gain.gain.setValueAtTime(0.12, now + i * 0.09);
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
 * Komponen Notifikasi Floating Perayaan EXP & Naik Level.
 * Tidak menutupi seluruh layar (tanpa overlay gelap yang memblokir),
 * melainkan melayang di sudut atas sebagai toast notifikasi interaktif yang elegan.
 */
const RewardModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState(null);
  const [animProgress, setAnimProgress] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [dismissCountdown, setDismissCountdown] = useState(6);

  const timerRef = useRef(null);

  useEffect(() => {
    const handleRewardEarned = (e) => {
      const data = e.detail;
      if (!data || !data.expEarned) return;

      setReward(data);
      setIsOpen(true);
      setDismissCountdown(data.leveledUp ? 7 : 5); // Beri waktu lebih jika naik level

      // Mainkan suara perayaan ala Duolingo
      playCelebrationChime(data.leveledUp);

      // Partikel konfeti halus di sekitar toast notifikasi
      const colors = ['#58CC02', '#FFC800', '#1CB0F6', '#FF4B4B', '#CE82FF', '#FF9600'];
      const pieces = Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.2 + Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 7,
        rotation: Math.random() * 360,
      }));
      setConfettiPieces(pieces);

      // Animasi bar EXP
      setAnimProgress(0);
      setTimeout(() => {
        setAnimProgress(data.newLevelInfo?.progressPercent || 100);
      }, 200);
    };

    window.addEventListener('tka_reward_earned', handleRewardEarned);
    return () => {
      window.removeEventListener('tka_reward_earned', handleRewardEarned);
    };
  }, []);

  // Timer hitung mundur auto-dismiss (berhenti jika cursor pengguna diarahkan ke notifikasi)
  useEffect(() => {
    if (!isOpen || isPaused) return;

    if (dismissCountdown <= 0) {
      setIsOpen(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setDismissCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen, isPaused, dismissCountdown]);

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

  const expNeeded =
    newLevelInfo?.expRemaining ??
    Math.max(0, (newLevelInfo?.nextLevelExp || 150) - (newLevelInfo?.currentLevelExp || 0));

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-[100] max-w-sm sm:max-w-md w-[calc(100%-2rem)] sm:w-full pointer-events-none select-none transition-all">
      {/* Konfeti Halus Meluncur di Sekitar Notifikasi */}
      <div className="absolute -inset-4 pointer-events-none overflow-hidden rounded-3xl">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute rounded-xs opacity-90"
            style={{
              left: `${piece.left}%`,
              top: '-10px',
              width: `${piece.size}px`,
              height: `${piece.size * 0.65}px`,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confettiFloat ${piece.duration}s ease-in ${piece.delay}s forwards`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes confettiFloat {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translateY(220px) rotate(360deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>

      {/* Kartu Notifikasi Mengambang (Floating Toast) */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`pointer-events-auto relative w-full bg-white/95 backdrop-blur-md rounded-2xl border-2 shadow-[0_14px_45px_-8px_rgba(0,0,0,0.24)] overflow-hidden p-4 sm:p-5 animate-slide-in-down transition-all ${
          leveledUp
            ? 'border-amber-400 bg-gradient-to-br from-amber-50/95 via-white/95 to-white/95'
            : 'border-teal-400 bg-gradient-to-br from-teal-50/95 via-white/95 to-white/95'
        }`}
      >
        {/* Tombol Tutup Silang Cepat */}
        <button
          onClick={handleClose}
          aria-label="Tutup notifikasi"
          className="absolute right-3.5 top-3.5 w-7 h-7 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ============================================================== */}
        {/* TAMPILAN JIKA NAIK LEVEL (LEVEL UP)                            */}
        {/* ============================================================== */}
        {leveledUp ? (
          <div className="space-y-3.5">
            {/* Header: Badge & Icon Hero */}
            <div className="flex items-center space-x-3 pr-7">
              <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 text-white shadow-md border-2 border-white animate-bounce-slow">
                <Trophy className="w-6 h-6 text-slate-950 drop-shadow-xs" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>PENCAPAIAN BARU!</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mt-0.5">
                  KAMU NAIK LEVEL! 🎉
                </h3>
              </div>
            </div>

            {/* Level Transition Pill */}
            <div className="flex items-center justify-between bg-amber-100/70 p-2 sm:p-2.5 rounded-xl border border-amber-200/80 text-xs font-bold text-amber-950">
              <span className="text-[11px] text-amber-800 font-medium">
                Pencapaian Level Baru:
              </span>
              <div className="flex items-center space-x-1.5 font-black">
                <span className="px-2 py-0.5 rounded-md bg-white/90 text-slate-500 border border-slate-200 line-through text-[11px]">
                  Lv. {prevLevelInfo?.level || newLevelInfo.level - 1}
                </span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
                <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs shadow-xs">
                  Lv. {newLevelInfo.level}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* TAMPILAN JIKA MENDAPATKAN EXP (EXP EARNED)                      */
          /* ============================================================== */
          <div className="space-y-3">
            {/* Header: Badge & Icon Hero */}
            <div className="flex items-center space-x-3 pr-7">
              <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white shadow-md border-2 border-white">
                <Zap className="w-6 h-6 text-white drop-shadow-xs" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase tracking-wider border border-teal-300">
                  <span>+{expEarned} EXP DITAMBAHKAN</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight mt-0.5">
                  +{expEarned} EXP Diraih! ⚡
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BAR PROGRES EXP DINAMIS SESUAI KURVA LEVEL                     */}
        {/* ============================================================== */}
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              Level {newLevelInfo?.level}
            </span>
            <span className="font-black text-teal-700">
              {newLevelInfo?.currentLevelExp} / {newLevelInfo?.nextLevelExp} EXP
            </span>
          </div>

          {/* Bar Progress Smooth Filling */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-xs ${
                leveledUp
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500'
                  : 'bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500'
              }`}
              style={{ width: `${animProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
            <span>Total {newExp} EXP</span>
            <span className="text-slate-700 font-semibold">
              {expNeeded} EXP menuju Level {(newLevelInfo?.level || 1) + 1}
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CHIP BONUS STREAK ATAU GELAR BARU                              */}
        {/* ============================================================== */}
        <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
          {streak?.count > 0 && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 font-semibold text-[11px]">
              <span>🔥</span>
              <span>Streak {streak.count} Hari Menyala!</span>
            </div>
          )}

          {newTitlesUnlocked.length > 0 && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 font-semibold text-[11px]">
              <span>{newTitlesUnlocked[0]?.icon || '🏆'}</span>
              <span>Gelar Baru: {newTitlesUnlocked[0]?.name}</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* TOMBOL TINDAKAN LANJUTKAN                                      */}
        {/* ============================================================== */}
        <div className="mt-3 flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-400 font-medium">
            {isPaused ? 'Otomatis dijeda saat cursor di atas' : `Menutup dalam ${dismissCountdown}s`}
          </span>

          <button
            onClick={handleClose}
            className={`py-1.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-sm active:scale-95 transition-all cursor-pointer ${
              leveledUp
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400'
                : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500'
            }`}
          >
            {leveledUp ? 'Lanjutkan Perjuangan 🚀' : 'Keren, Lanjutkan! 👍'}
          </button>
        </div>

        {/* Indikator Garis Durasi Auto-Dismiss */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              leveledUp ? 'bg-amber-400' : 'bg-teal-400'
            }`}
            style={{
              width: `${(dismissCountdown / (leveledUp ? 7 : 5)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
