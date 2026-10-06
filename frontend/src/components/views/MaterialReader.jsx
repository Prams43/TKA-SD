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
  Divide,
  Layers,
  ArrowRight,
} from 'lucide-react';

/**
 * Komponen Pemaparan Materi Terstruktur & Estetis
 * Menyajikan materi Bahasa Indonesia dan Matematika dengan visual yang rapi,
 * kartu perbandingan, tabel rumus, dan contoh step-by-step ramah anak.
 */
const MaterialReader = ({ bab, onStartQuiz }) => {
  if (!bab) return null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-4 text-slate-800">
      {/* 1. Header Judul & Capaian Belajar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
            📖 Materi TKA SD
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700 border border-slate-300">
            Standar Pusmendik
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {bab.judul}
        </h2>

        {/* Tujuan Belajar */}
        {bab.tujuan && (
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start space-x-3 text-xs sm:text-sm">
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
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs sm:text-sm shadow-sm">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-900 block font-bold mb-1">Konsep Kunci:</strong>
            <p className="text-slate-700 leading-relaxed">{bab.konsepKunci}</p>
          </div>
        </div>
      )}

      {/* 3. KONTEN SPESIFIK BERDASARKAN BAB */}

      {/* A. Bab Kosakata Baku (bi_tekstual_1) */}
      {bab.daftarBaku && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <span>Daftar Kata Baku vs Tidak Baku (Sering Muncul di TKA SD)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bab.daftarBaku.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-emerald-700">{item.baku}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      Baku
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-rose-500 line-through">
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.tidakBaku}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 border-t border-slate-200 pt-1.5">
                  Arti: {item.arti}
                </p>
              </div>
            ))}
          </div>

          {/* Istilah Khusus */}
          {bab.istilahKhusus && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Istilah Khusus Bidang Lingkungan & Sains:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {bab.istilahKhusus.map((it, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-blue-700 text-sm">{it.istilah}</strong>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {it.bidang}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{it.makna}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* B. Bab 5W1H (bi_tekstual_2) */}
      {bab.tabel5w1h && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            6 Kata Tanya Panduan (ADiKSiMBa):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bab.tabel5w1h.map((w, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-1.5"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs">
                  {w.tanya}
                </span>
                <p className="text-xs text-slate-700">{w.fungsi}</p>
                <p className="text-[11px] text-slate-500 italic">Contoh: "{w.contoh}"</p>
              </div>
            ))}
          </div>

          {/* Contoh Teks dan Analisis */}
          {bab.contohTeks && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Contoh Analisis Teks Nyata:
              </h4>
              <p className="p-3 rounded-xl bg-white border border-slate-200 text-xs italic text-slate-700 leading-relaxed shadow-sm">
                {bab.contohTeks.teks}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {bab.contohTeks.analisis.map((an, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-blue-700 font-bold">{an.k}: </span>
                    <span className="text-slate-800">{an.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* C. Bab Ide Pokok & Paragraf (bi_inferensial_1) */}
      {bab.jenisParagraf && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            3 Pola Letak Kalimat Utama dalam Paragraf:
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {bab.jenisParagraf.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-blue-900">{p.jenis}</h4>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {p.letak}
                  </span>
                </div>
                <p className="text-xs text-slate-700">{p.pola}</p>
                <p className="text-[11px] text-slate-500 font-medium">Ciri Khas: {p.ciri}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* D. Bab Watak Tokoh & Amanat (bi_inferensial_2) */}
      {bab.kategoriTokoh && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Kategori Karakter & Watak Tokoh Fiksi:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bab.kategoriTokoh.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.kategori}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.sifat}</p>
                </div>
                <p className="text-[11px] text-blue-700 border-t border-slate-200 pt-2 font-medium">
                  Peran: {t.peran}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* E. Bab Fakta vs Opini (bi_evaluasi_1) */}
      {bab.perbandinganFaktaOpini && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Tabel Perbandingan Fakta vs Opini:
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-1/4">Faktor Pembeda</th>
                  <th className="px-4 py-3 w-3/8 text-emerald-700">Kalimat Fakta</th>
                  <th className="px-4 py-3 w-3/8 text-amber-700">Kalimat Opini</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bab.perbandinganFaktaOpini.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-800">{row.faktor}</td>
                    <td className="px-4 py-3 text-emerald-800">{row.fakta}</td>
                    <td className="px-4 py-3 text-amber-800">{row.opini}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* F. Bab Operasi Hitung Campuran (mtk_bilangan_1) */}
      {bab.urutanOperasi && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Hierarki Urutan Pengerjaan (KABATAKU):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bab.urutanOperasi.map((u, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-1.5"
              >
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  {u.tingkat}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{u.nama}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{u.aturan}</p>
              </div>
            ))}
          </div>

          {/* Contoh Langkah Step-by-Step */}
          {bab.contohLangkah && (
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                Contoh Pengerjaan Langkah demi Langkah:
              </h4>
              <div className="p-3 rounded-xl bg-white border border-blue-200 text-sm font-mono text-center font-bold text-blue-900 shadow-sm">
                {bab.contohLangkah.soal}
              </div>

              <div className="space-y-2 pt-1">
                {bab.contohLangkah.langkah.map((l, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-center space-x-3 shadow-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center flex-shrink-0 text-[11px]">
                      {l.no}
                    </span>
                    <span className="text-slate-700">{l.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>Hasil Akhir Perhitungan:</span>
                <span className="text-base font-black text-emerald-900">{bab.contohLangkah.hasil}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* G. Bab Pecahan (mtk_bilangan_2) */}
      {bab.rumusPecahan && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Rumus Utama Operasi Pecahan:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bab.rumusPecahan.map((r, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-1.5"
              >
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  {r.nama}
                </h4>
                <p className="text-xs text-slate-700">{r.rumus}</p>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-emerald-700">
                  {r.contoh}
                </div>
              </div>
            ))}
          </div>

          {/* Tabel Konversi Cepat */}
          {bab.tabelKonversi && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Tabel Cepat: Pecahan, Desimal, dan Persen:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
                {bab.tabelKonversi.map((k, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-sm">
                    <span className="block font-bold text-blue-700 text-sm">{k.pecahan}</span>
                    <span className="block text-slate-600 text-[11px]">{k.desimal}</span>
                    <span className="block font-semibold text-emerald-700 text-xs">{k.persen}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* H. Bab Keliling & Luas Bangun Datar (mtk_geometri_1) */}
      {bab.rumusBangunDatar && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Rumus Keliling dan Luas Bangun Datar:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {bab.rumusBangunDatar.map((bd, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <h4 className="text-sm font-bold text-slate-900">{bd.bangun}</h4>
                  <span className="text-[10px] text-slate-500">{bd.keterangan}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="block text-[10px] text-slate-500 font-medium">Keliling:</span>
                    <strong className="text-blue-700 font-mono text-xs">{bd.keliling}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="block text-[10px] text-slate-500 font-medium">Luas:</span>
                    <strong className="text-emerald-700 font-mono text-xs">{bd.luas}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contoh Kasus Bangun Datar */}
          {bab.contohKasus && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-amber-900 uppercase block">Contoh Kasus Nyata:</span>
              <p className="text-slate-700">{bab.contohKasus.soal}</p>
              <div className="space-y-1 pt-1">
                {bab.contohKasus.langkah.map((l, i) => (
                  <p key={i} className="text-emerald-700 font-mono text-[11px]">
                    ✔ {l}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* I. Bab Volume Bangun Ruang (mtk_geometri_2) */}
      {bab.rumusBangunRuang && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Rumus Volume dan Sifat Bangun Ruang:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bab.rumusBangunRuang.map((br, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="text-sm font-bold text-slate-900">{br.bangun}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono text-xs font-bold border border-blue-200">
                    {br.rumus}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{br.unsur}</p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-emerald-700">
                  {br.contoh}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* J. Bab Data (mtk_data_1) */}
      {bab.tigaPemusatanData && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            3 Konsep Pemusatan Data Statistika:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bab.tigaPemusatanData.map((d, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-blue-900">{d.nama}</h4>
                  <p className="text-xs text-slate-600 mt-1">{d.rumus}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-emerald-700">
                  {d.contoh}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Tips Juara TKA SD */}
      {bab.tipsJuara && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs sm:text-sm">
          <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <strong className="text-amber-900 block font-bold">Tips Juara TKA SD:</strong>
            <p className="text-slate-700 leading-relaxed">{bab.tipsJuara}</p>
          </div>
        </div>
      )}

      {/* 5. CTA Selesai Membaca & Lanjut ke 3 Soal Latihan */}
      <div className="p-5 sm:p-6 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Materi Selesai Dipelajari!</span>
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Selesaikan <strong>3 soal pemahaman</strong> di bawah ini untuk menuntaskan bab ini dan membuka materi selanjutnya.
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
