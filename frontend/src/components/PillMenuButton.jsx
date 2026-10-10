import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Komponen Tombol Kapsul Interaktif (Pill Button)
 * Didesain responsif agar tetap rapi saat berdampingan dengan karakter di mobile
 */
const PillMenuButton = ({ label, icon: Icon, onClick, accentColor = 'blue', badgeText }) => {
  // Mapping warna glow & aksen di atas latar belakang Navy
  const colorStyles = {
    blue: {
      glow: 'hover:shadow-[0_12px_30px_rgba(37,99,235,0.45)] hover:border-blue-400',
      iconBg: 'bg-blue-500/25 text-blue-300 border border-blue-400/30',
      badge: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    },
    emerald: {
      glow: 'hover:shadow-[0_12px_30px_rgba(16,185,129,0.45)] hover:border-emerald-400',
      iconBg: 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/30',
      badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    },
    amber: {
      glow: 'hover:shadow-[0_12px_30px_rgba(245,158,11,0.45)] hover:border-amber-400',
      iconBg: 'bg-amber-500/25 text-amber-300 border border-amber-400/30',
      badge: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    },
    purple: {
      glow: 'hover:shadow-[0_12px_30px_rgba(168,85,247,0.45)] hover:border-purple-400',
      iconBg: 'bg-purple-500/25 text-purple-300 border border-purple-400/30',
      badge: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    },
    yellow: {
      glow: 'hover:shadow-[0_12px_30px_rgba(234,179,8,0.5)] hover:border-yellow-400',
      iconBg: 'bg-yellow-500/25 text-yellow-300 border border-yellow-400/40',
      badge: 'bg-yellow-500/20 text-yellow-200 border-yellow-400/40',
    },
  };

  const currentStyle = colorStyles[accentColor] || colorStyles.blue;

  return (
    <button
      onClick={onClick}
      className={`group relative w-full py-2.5 sm:py-3.5 md:py-4 px-3 sm:px-5 md:px-7 rounded-full bg-gradient-to-r from-[#0a1e4a] via-[#0f285d] to-[#08183c] text-white font-bold text-xs sm:text-base md:text-xl tracking-wide shadow-[0_6px_20px_rgba(10,30,74,0.3)] sm:shadow-[0_10px_25px_rgba(10,30,74,0.35)] border border-blue-400/30 sm:border-2 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 cursor-pointer overflow-hidden flex items-center justify-between select-none ${currentStyle.glow}`}
    >
      {/* Efek Shimmer Kilatan Cahaya saat Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* Konten Kiri: Ikon & Teks Label */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 z-10 min-w-0">
        {Icon && (
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${currentStyle.iconBg}`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
          </div>
        )}
        <span className="truncate transition-colors duration-200 text-white group-hover:text-blue-100 font-poppins">
          {label}
        </span>
      </div>

      {/* Konten Kanan: Badge & Arrow Indicator */}
      <div className="flex items-center space-x-1 sm:space-x-2 z-10 flex-shrink-0">
        {badgeText && (
          <span
            className={`hidden md:inline-block text-[10px] md:text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-sm ${currentStyle.badge}`}
          >
            {badgeText}
          </span>
        )}
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white/10 group-hover:bg-blue-500/30 border border-white/15 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow group-hover:translate-x-0.5">
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-200 group-hover:text-white transition-colors" />
        </div>
      </div>
    </button>
  );
};

export default PillMenuButton;
