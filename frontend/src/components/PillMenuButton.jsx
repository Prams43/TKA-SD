import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Komponen Tombol Menu Dashboard yang Bersih dan Terstruktur
 */
const PillMenuButton = ({ label, icon: Icon, onClick, accentColor = 'blue', badgeText }) => {
  const colorStyles = {
    blue: {
      iconBg: 'bg-[#FAECE6] text-[#C25E38] border-[#F2CBBF]',
    },
    emerald: {
      iconBg: 'bg-[#E8F2EF] text-[#286657] border-[#C5DDD6]',
    },
    amber: {
      iconBg: 'bg-[#FEF7EE] text-[#D97E26] border-[#FCD9BD]',
    },
    purple: {
      iconBg: 'bg-[#EFF6F9] text-[#2C6E8F] border-[#CDE1EB]',
    },
    yellow: {
      iconBg: 'bg-[#FAECE6] text-[#C25E38] border-[#F2CBBF]',
    },
  };

  const currentStyle = colorStyles[accentColor] || colorStyles.blue;

  return (
    <button
      onClick={onClick}
      className="group w-full py-2.5 sm:py-3.5 px-3.5 sm:px-5 rounded-xl bg-slate-200 hover:bg-slate-100 text-[#1E293B] border border-slate-300 hover:border-blue-400 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-between shadow-sm hover:shadow-md select-none"
    >
      {/* Konten Kiri: Ikon & Teks Label */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0">
        {Icon && (
          <div
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex-shrink-0 flex items-center justify-center border ${currentStyle.iconBg}`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
        <span className="truncate text-xs sm:text-base font-bold text-[#1E293B] group-hover:text-blue-700 transition-colors">
          {label}
        </span>
      </div>

      {/* Konten Kanan: Badge & Arrow Indicator */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
        {badgeText && (
          <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-300 text-slate-700 border border-slate-400/60">
            {badgeText}
          </span>
        )}
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};

export default PillMenuButton;
