import React from 'react';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Target,
  Sparkles,
  BookOpen,
  Check,
  Calculator,
  Bookmark,
  Layers,
  ArrowRight,
  FileText,
  Compass,
} from 'lucide-react';

/**
 * Komponen Pemaparan Materi Terstruktur & Visual
 * Menyajikan materi Pembelajaran TKA SD (12 Matematika & 21 Bahasa Indonesia)
 * dengan visual yang rapi, konsep kunci, uraian bertingkat, rumus, contoh, dan bedah soal.
 */
const MaterialReader = ({ bab, onStartQuiz }) => {
  if (!bab) return null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-4 text-slate-800 animate-fade-in">
      {/* 1. Header Judul & Capaian Belajar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-3 relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200 flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5 mr-1 inline" />
            <span>Bab {bab.no || 1}</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Kurikulum Pusmendik
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {bab.judul}
        </h2>

        {bab.ringkasan && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {bab.ringkasan}
          </p>
        )}

        {/* Tujuan Belajar */}
        {bab.tujuan && (
          <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start space-x-3 text-xs sm:text-sm">
            <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-blue-900 block font-semibold mb-0.5">Tujuan Pembelajaran:</strong>
              <span className="text-slate-600 leading-relaxed">{bab.tujuan}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Konsep Kunci (Key Concept Alert) */}
      {bab.konsepKunci && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 flex items-start space-x-3 text-xs sm:text-sm shadow-sm">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-900 block font-bold">Konsep Kunci:</strong>
            <p className="text-slate-700 leading-relaxed font-medium">{bab.konsepKunci}</p>
          </div>
        </div>
      )}

      {/* 3. Uraian Materi Terstruktur (Dinamis untuk seluruh 33 Bab) */}
      {bab.uraianMateri && bab.uraianMateri.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Pembahasan & Rincian Materi
            </h3>
          </div>

          <div className="space-y-4">
            {bab.uraianMateri.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all"
              >
                {/* Subjudul */}
                {item.subjudul && (
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {item.subjudul}
                    </h4>
                  </div>
                )}

                {/* Konten Teks */}
                {item.konten && (
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-1 pl-1">
                    {item.konten.split('\n').map((line, lIdx) => {
                      const trimmed = line.trim();
                      if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                        return (
                          <div key={lIdx} className="flex items-start space-x-2 py-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                            <span>{trimmed.replace(/^[•\-]\s*/, '')}</span>
                          </div>
                        );
                      }
                      return <p key={lIdx}>{line}</p>;
                    })}
                  </div>
                )}

                {/* Rumus / Formula Box */}
                {item.rumus && (
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-start space-x-3 text-xs sm:text-sm">
                    <Calculator className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-0.5">
                        Rumus / Kaidah Pokok:
                      </span>
                      <code className="text-blue-900 font-bold font-mono text-xs sm:text-sm block">
                        {item.rumus}
                      </code>
                    </div>
                  </div>
                )}

                {/* Contoh Kasus / Penerapan */}
                {item.contoh && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-900 text-xs font-bold block mb-0.5">
                        Contoh Penerapan:
                      </strong>
                      <span className="text-slate-700 leading-relaxed block">
                        {item.contoh}
                      </span>
                    </div>
                  </div>
                )}

                {/* Poin-poin Tambahan */}
                {item.poin && Array.isArray(item.poin) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {item.poin.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start space-x-2"
                      >
                        <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Bedah Contoh Soal Asesmen TKA SD */}
      {bab.contohSoal && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 border-2 border-indigo-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5 mr-1 inline" />
              <span>Bedah Contoh Soal TKA</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Model Soal Asesmen</span>
          </div>

          {/* Soal */}
          <div className="p-3.5 rounded-xl bg-white border border-indigo-200 shadow-sm text-xs sm:text-sm font-semibold text-slate-900 flex items-start space-x-2.5">
            <HelpCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="text-indigo-800 font-bold block text-xs mb-0.5">Soal:</span>
              {bab.contohSoal.soal}
            </div>
          </div>

          {/* Pembahasan */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-slate-800 flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="text-emerald-800 font-bold block text-xs mb-0.5">
                Cara Penyelesaian & Pembahasan:
              </span>
              <p className="text-slate-700">{bab.contohSoal.penjelasan}</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Legacy Renderers untuk Kompatibilitas Khusus (Jika Ada) */}
      {bab.daftarBaku && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Daftar Kosakata Baku vs Tidak Baku
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {bab.daftarBaku.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-bold text-emerald-800">{item.baku}</span>
                </div>
                <div className="flex items-center space-x-1 text-rose-500 line-through">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{item.tidakBaku}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Tips Juara TKA SD */}
      {bab.tipsJuara && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs sm:text-sm shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <strong className="text-amber-900 block font-bold">Tips Juara TKA SD:</strong>
            <p className="text-slate-700 leading-relaxed font-medium">{bab.tipsJuara}</p>
          </div>
        </div>
      )}

      {/* 7. CTA Selesai Membaca & Lanjut ke 3 Soal Latihan */}
      <div className="p-5 sm:p-6 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Materi Selesai Dipelajari!</span>
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Selesaikan <strong>3 soal pemahaman</strong> di bawah ini untuk menuntaskan materi ini dan menandai checklist tuntas.
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 flex-shrink-0"
        >
          <span>Mulai 3 Soal Latihan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MaterialReader;
