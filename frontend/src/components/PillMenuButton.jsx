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
      className="group w-full py-2.5 sm:py-3.5 px-3.5 sm:px-5 rounded-lg bg-white hover:bg-[#FAF7F2] text-[#261C14] border border-[#E6DFD5] hover:border-[#D8CDC2] transition-colors cursor-pointer flex items-center justify-between shadow-xs select-none"
    >
      {/* Konten Kiri: Ikon & Teks Label */}
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0">
        {Icon && (
          <div
            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-md flex-shrink-0 flex items-center justify-center border ${currentStyle.iconBg}`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
        <span className="truncate text-xs sm:text-base font-semibold text-[#261C14] group-hover:text-[#C25E38] transition-colors">
          {label}
        </span>
      </div>

      {/* Konten Kanan: Badge & Arrow Indicator */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
        {badgeText && (
          <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-[#F2ECE4] text-[#6E6258] border border-[#E6DFD5]">
            {badgeText}
          </span>
        )}
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-[#A89F95] group-hover:text-[#C25E38] transition-colors">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};

export default PillMenuButton;
