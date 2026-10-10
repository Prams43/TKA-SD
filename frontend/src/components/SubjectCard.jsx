import React from 'react';
import { BookOpen, Calculator, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import Button from './Button';

/**
 * Komponen Kartu Mata Pelajaran di Dashboard
 */
const SubjectCard = ({
  title,
  description,
  questionCount = 30,
  duration = '45 Menit',
  iconType = 'book',
  colorClass = 'blue',
  onStart,
}) => {
  const isMath = iconType === 'calculator';

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
      className={`group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-2 active:scale-[0.985] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between border-2 select-none ${
        isMath
          ? 'border-[#881337] hover:border-[#881337] hover:ring-4 hover:ring-[#881337]/20 hover:shadow-[#881337]/20'
          : 'border-[#047857] hover:border-[#047857] hover:ring-4 hover:ring-[#047857]/20 hover:shadow-[#047857]/20'
      }`}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isMath
            ? 'radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(136, 19, 55, 0.1), transparent 75%)'
            : 'radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(4, 120, 87, 0.1), transparent 75%)',
        }}
      />

      <div className="relative z-10">
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${
              isMath
                ? 'bg-[#FFF1F2] text-[#881337] border border-[#FECDD3] group-hover:rotate-[4deg]'
                : 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] group-hover:rotate-[-4deg]'
            }`}
          >
            {isMath ? <Calculator className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F2ECE4] text-[#6E6258] border-2 border-slate-300 group-hover:scale-105 transition-transform">
            Kelas 6 SD
          </span>
        </div>

        {/* Judul & Deskripsi */}
        <h3 className={`text-base font-bold text-[#261C14] mb-1 transition-colors ${
          isMath ? 'group-hover:text-[#881337]' : 'group-hover:text-[#047857]'
        }`}>
          {title}
        </h3>
        <p className="text-sm text-[#6E6258] mb-5 leading-relaxed">
          {description}
        </p>

        {/* Info Meta Soal */}
        <div className="grid grid-cols-2 gap-3 py-2.5 px-3 bg-[#FAF7F2] rounded-xl mb-6 text-xs text-[#6E6258] border-2 border-slate-300">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-[#A89F95]" />
            <span>{questionCount} Soal Latihan</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#A89F95]" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="relative z-10">
        <Button
          variant="primary"
          fullWidth
          onClick={onStart}
          className={`flex items-center justify-center space-x-2 transition-all duration-300 font-bold ${
            isMath
              ? '!bg-[#881337] hover:!bg-[#700D2B] !text-white'
              : '!bg-[#047857] hover:!bg-[#065F46] !text-white'
          }`}
        >
          <span>Mulai Latihan</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
