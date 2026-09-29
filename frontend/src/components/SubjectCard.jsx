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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Header Icon & Tag */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${
              isMath ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'
            }`}
          >
            {isMath ? <Calculator className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Kelas 6 SD
          </span>
        </div>

        {/* Judul & Deskripsi */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Info Meta Soal */}
        <div className="grid grid-cols-2 gap-3 py-3 px-4 bg-slate-50 rounded-xl mb-6 text-xs text-slate-600 border border-slate-150">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>{questionCount} Soal Latihan</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <Button
        variant="primary"
        fullWidth
        onClick={onStart}
        className="flex items-center justify-center space-x-2 group-hover:bg-blue-700"
      >
        <span>Mulai Latihan</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
};

export default SubjectCard;
