import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Trophy, Check, X, Wand2 } from 'lucide-react';
import { setActiveAvatar } from '../utils/activityTracker';

/**
 * Modal Perayaan Gacha Karakter Fantasi Spesial (Tryout >= 80%)
 * Menampilkan animasi hadiah karakter fantasi langka yang berhasil di-gacha siswa.
 */
const FantasyGachaModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wonCharacter, setWonCharacter] = useState(null);
  const [equippedToast, setEquippedToast] = useState(false);

  useEffect(() => {
    const handleGachaReward = (e) => {
      const char = e.detail?.character;
      if (char) {
        setWonCharacter(char);
        setIsOpen(true);
        setEquippedToast(false);
      }
    };

    window.addEventListener('tka_fantasy_gacha_reward', handleGachaReward);
    return () => {
      window.removeEventListener('tka_fantasy_gacha_reward', handleGachaReward);
    };
  }, []);

  if (!isOpen || !wonCharacter) return null;

  const handleEquipNow = () => {
    setActiveAvatar(wonCharacter.id);
    setEquippedToast(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1200);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-gradient-to-b from-[#1A376B] via-[#162E5B] to-[#0F2042] text-white rounded-3xl border-2 border-amber-400/80 shadow-[0_0_50px_rgba(251,191,36,0.35)] max-w-md w-full overflow-hidden relative my-auto p-5 sm:p-7 text-center flex flex-col items-center">
        {/* Tombol Tutup */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0F2042] hover:bg-[#1E3A8A] text-slate-300 hover:text-white border border-blue-500/40 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge Header Spesial */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/60 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Hadiah Gacha Tryout Spesial!</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
          Selamat! Kamu Mendapatkan Karakter Fantasi! 🎉
        </h3>
        <p className="text-xs text-blue-200 mt-1 max-w-xs leading-relaxed">
          Skor Tryout kamu mencapai <strong className="text-amber-300">80%+</strong> dan berhasil membuka karakter langka dari kategori Fantasi!
        </p>

        {/* Display Karakter Animasi dengan Lingkaran Kilau Emas */}
        <div className="relative my-5 flex items-center justify-center">
          {/* Efek Glow Aura Emas */}
          <div className="absolute inset-0 rounded-3xl bg-amber-400/30 blur-xl animate-pulse" />

          {/* Kotak Karakter */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white border-4 border-amber-400 shadow-2xl overflow-hidden flex items-center justify-center p-1 transform hover:scale-105 transition-transform duration-300">
            <img
              src={wonCharacter.image}
              alt={wonCharacter.name}
              className="w-full h-full object-cover filter drop-shadow-md"
            />
          </div>

          <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-md border-2 border-[#162E5B] flex items-center space-x-1">
            <Wand2 className="w-3 h-3" />
            <span>Fantasi</span>
          </span>
        </div>

        {/* Nama Karakter */}
        <div className="space-y-1 mb-5">
          <h4 className="text-lg sm:text-xl font-bold text-amber-300 tracking-tight">
            {wonCharacter.name}
          </h4>
          <span className="inline-block text-[11px] font-semibold text-blue-200 bg-blue-900/60 px-3 py-0.5 rounded-full border border-blue-500/40">
            Karakter Fantasi Langka • Telah Ditambahkan ke Koleksi
          </span>
        </div>

        {/* Tombol Aksi */}
        {equippedToast ? (
          <div className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 animate-fade-in shadow-md">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Foto Profil Berhasil Dipasang!</span>
          </div>
        ) : (
          <div className="w-full space-y-2">
            <button
              onClick={handleEquipNow}
              className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Pasang Sekarang Sebagai Foto Profil</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-4 rounded-xl bg-[#0F2042] hover:bg-[#1E3A8A] text-blue-200 hover:text-white font-semibold text-xs transition-all cursor-pointer border border-blue-500/30"
            >
              Simpan ke Koleksi Foto Profil
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default FantasyGachaModal;
