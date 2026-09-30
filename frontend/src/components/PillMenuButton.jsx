import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Komponen Tombol Kapsul Interaktif (Pill Button)
 * Didesain responsif agar tetap rapi saat berdampingan dengan karakter di mobile
 */
const PillMenuButton = ({ label, icon: Icon, onClick, accentColor = 'blue', badgeText }) => {
  // Mapping warna glow & aksen
  const colorStyles = {
    blue: {
      glow: 'hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)] hover:border-blue-400',
      iconBg: 'bg-blue-600/15 text-blue-700',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    emerald: {
      glow: 'hover:shadow-[0_10px_30px_rgba(16,185,129,0.5)] hover:border-emerald-400',
      iconBg: 'bg-emerald-600/15 text-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    amber: {
      glow: 'hover:shadow-[0_10px_30px_rgba(245,158,11,0.5)] hover:border-amber-400',
      iconBg: 'bg-amber-600/15 text-amber-700',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    purple: {
      glow: 'hover:shadow-[0_10px_30px_rgba(168,85,247,0.5)] hover:border-purple-400',
      iconBg: 'bg-purple-600/15 text-purple-700',
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
    },
  };

  const currentStyle = colorStyles[accentColor] || colorStyles.blue;

  return (
    <button
      onClick={onClick}
      className={`group relative w-full py-2.5 sm:py-3.5 md:py-4 px-3 sm:px-5 md:px-7 rounded-full bg-gradient-to-r from-[#d2dce6] via-[#e2ebf3] to-[#cbd7e2] text-slate-800 font-bold text-xs sm:text-base md:text-xl tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.3)] sm:shadow-[0_8px_20px_rgba(0,0,0,0.35)] border border-white/60 sm:border-2 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 cursor-pointer overflow-hidden flex items-center justify-between select-none ${currentStyle.glow}`}
    >
      {/* Efek Shimmer Kilatan Cahaya saat Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Konten Kiri: Ikon & Teks Label */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 z-10 min-w-0">
        {Icon && (
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${currentStyle.iconBg}`}
          >
            <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
          </div>
        )}
        <span className="truncate transition-colors duration-200 group-hover:text-slate-950 font-poppins">
          {label}
        </span>
      </div>

      {/* Konten Kanan: Badge & Arrow Indicator */}
      <div className="flex items-center space-x-1 sm:space-x-2 z-10 flex-shrink-0">
        {badgeText && (
          <span
            className={`hidden md:inline-block text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded-full border shadow-sm ${currentStyle.badge}`}
          >
            {badgeText}
          </span>
        )}
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-white/70 group-hover:bg-white flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow group-hover:translate-x-0.5">
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-slate-600 group-hover:text-slate-900 transition-colors" />
        </div>
      </div>
    </button>
  );
};

export default PillMenuButton;
