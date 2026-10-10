import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Zap, Sparkles, X, ChevronRight } from 'lucide-react';

/**
 * Audio Synthesizer (Web Audio API) untuk chime perayaan.
 * Berjalan murni di browser tanpa file audio eksternal.
 */
const playCelebrationChime = (isLevelUp) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (isLevelUp) {
      // Fanfare kemenangan: C5, E5, G5, C6
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
      // Chime EXP: E5 -> B5
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
 * Komponen Notifikasi Pop-up Perayaan EXP & Naik Level.
 * Menggunakan warna solid datar (flat solid colors) yang harmonis dengan tema TKA SD,
 * tanpa gradient buatan AI.
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
      setDismissCountdown(data.leveledUp ? 7 : 5);

      playCelebrationChime(data.leveledUp);

      // Partikel konfeti menggunakan palet warna solid tema TKA SD
      const themeColors = ['#C25E38', '#286657', '#D97E26', '#2C6E8F', '#8C7E72'];
      const pieces = Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.4 + Math.random() * 0.9,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        size: 7 + Math.random() * 7,
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

  // Timer hitung mundur auto-dismiss (berhenti jika kursor diarahkan ke pop-up)
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
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#261C14]/40 backdrop-blur-xs select-none transition-all animate-fade-in"
    >
      {/* Konfeti Halus di Latar Belakang */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="absolute rounded-xs opacity-85"
            style={{
              left: `${piece.left}%`,
              top: '-15px',
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
            transform: translateY(105vh) rotate(540deg) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>

      {/* Kartu Pop-up Bersih (Solid Flat Color, Tanpa Gradient) */}
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative max-w-sm sm:max-w-md w-full bg-white rounded-2xl border border-[#E6DFD5] shadow-2xl overflow-hidden p-5 sm:p-6 animate-scale-up transition-all"
      >
        {/* Tombol Tutup Silang */}
        <button
          onClick={handleClose}
          aria-label="Tutup notifikasi"
          className="absolute right-3.5 top-3.5 w-7 h-7 rounded-lg bg-[#FAF7F2] hover:bg-[#E6DFD5] text-[#6E6258] hover:text-[#261C14] flex items-center justify-center transition-colors cursor-pointer z-10"
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
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4] shadow-xs">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FEF7EE] text-[#D97E26] text-[10px] font-bold uppercase tracking-wider border border-[#FCD9BD]">
                  <Sparkles className="w-3 h-3 text-[#D97E26]" />
                  <span>PENCAPAIAN BARU!</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#261C14] tracking-tight leading-tight mt-0.5">
                  Kamu Naik Level! 🎉
                </h3>
              </div>
            </div>

            {/* Level Transition Pill */}
            <div className="flex items-center justify-between bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E6DFD5] text-xs font-semibold text-[#261C14]">
              <span className="text-[11px] text-[#6E6258]">
                Pencapaian Level Baru:
              </span>
              <div className="flex items-center space-x-2 font-bold">
                <span className="px-2 py-0.5 rounded-md bg-white text-[#8C7E72] border border-[#E6DFD5] line-through text-[11px]">
                  Lv. {prevLevelInfo?.level || newLevelInfo.level - 1}
                </span>
                <ChevronRight className="w-4 h-4 text-[#C25E38]" />
                <span className="px-2.5 py-0.5 rounded-md bg-[#C25E38] text-white text-xs shadow-xs">
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
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#E8F2EF] text-[#286657] border border-[#BCD9D0] shadow-xs">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#E8F2EF] text-[#286657] text-[10px] font-bold uppercase tracking-wider border border-[#BCD9D0]">
                  <span>+{expEarned} EXP DITAMBAHKAN</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#261C14] tracking-tight leading-tight mt-0.5">
                  +{expEarned} EXP Diraih! ⚡
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BAR PROGRES EXP DINAMIS SESUAI KURVA LEVEL                     */}
        {/* ============================================================== */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E6DFD5] space-y-2 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#261C14]">
              Level {newLevelInfo?.level}
            </span>
            <span
              className={`font-bold ${
                leveledUp ? 'text-[#C25E38]' : 'text-[#286657]'
              }`}
            >
              {newLevelInfo?.currentLevelExp} / {newLevelInfo?.nextLevelExp} EXP
            </span>
          </div>

          {/* Bar Progress Solid Flat */}
          <div className="w-full bg-[#E6DFD5] h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                leveledUp ? 'bg-[#C25E38]' : 'bg-[#286657]'
              }`}
              style={{ width: `${animProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6E6258] font-medium pt-0.5">
            <span>Total {newExp} EXP</span>
            <span className="text-[#261C14] font-semibold">
              {expNeeded} EXP menuju Level {(newLevelInfo?.level || 1) + 1}
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CHIP BONUS STREAK ATAU GELAR BARU                              */}
        {/* ============================================================== */}
        <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
          {streak?.count > 0 && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#FEF7EE] border border-[#FCD9BD] text-[#D97E26] font-semibold text-[11px]">
              <span>🔥</span>
              <span>Streak {streak.count} Hari Menyala!</span>
            </div>
          )}

          {newTitlesUnlocked.length > 0 && (
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#F3EBF7] border border-[#E1CEE8] text-[#6E3B87] font-semibold text-[11px]">
              <span>{newTitlesUnlocked[0]?.icon || '🏆'}</span>
              <span>Gelar Baru: {newTitlesUnlocked[0]?.name}</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* TOMBOL TINDAKAN LANJUTKAN (SOLID FLAT, DI TENGAH)             */}
        {/* ============================================================== */}
        <div className="mt-4 pt-1 flex justify-center">
          <button
            onClick={handleClose}
            className={`w-full py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white transition-colors cursor-pointer shadow-xs active:scale-98 ${
              leveledUp
                ? 'bg-[#C25E38] hover:bg-[#A94D2B]'
                : 'bg-[#286657] hover:bg-[#1E5044]'
            }`}
          >
            {leveledUp ? 'Lanjutkan Perjuangan 🚀' : 'Keren, Lanjutkan! 👍'}
          </button>
        </div>

        {/* Indikator Garis Durasi Auto-Dismiss (Solid Flat) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FAF7F2] overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              leveledUp ? 'bg-[#C25E38]' : 'bg-[#286657]'
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
