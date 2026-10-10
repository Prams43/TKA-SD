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
    <div className="bg-white rounded-lg border border-[#E6DFD5] p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isMath ? 'bg-[#FEF7EE] text-[#D97E26] border border-[#FCD9BD]' : 'bg-[#E8F2EF] text-[#286657] border border-[#C5DDD6]'
            }`}
          >
            {isMath ? <Calculator className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#F2ECE4] text-[#6E6258] border border-[#E6DFD5]">
            Kelas 6 SD
          </span>
        </div>

        {/* Judul & Deskripsi */}
        <h3 className="text-base font-semibold text-[#261C14] mb-1">
          {title}
        </h3>
        <p className="text-sm text-[#6E6258] mb-5 leading-relaxed">
          {description}
        </p>

        {/* Info Meta Soal */}
        <div className="grid grid-cols-2 gap-3 py-2.5 px-3 bg-[#FAF7F2] rounded-lg mb-6 text-xs text-[#6E6258] border border-[#E6DFD5]">
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
      <Button
        variant="primary"
        fullWidth
        onClick={onStart}
        className="flex items-center justify-center space-x-2"
      >
        <span>Mulai Latihan</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SubjectCard;
