import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  FileText,
  Compass,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

/**
 * Komponen pembantu untuk menampilkan daftar sifat, rumus, dan aturan bertingkat:
 * - Menampilkan baris yang diawali '->', '→', '•', '-', atau nomor urut sebagai daftar menurun ke bawah (list kebawah)
 * - Menampilkan badge simbol '->' yang jelas dan kontras sesuai permintaan pengguna
 * - Otomatis mendeteksi teks yang dipisahkan titik koma (;) ganda dan memisahkannya menjadi baris list menurun
 * - Memformat judul sifat (sebelum tanda ':') dan rumusnya agar rapi dan mudah dipahami anak
 */
const FormattedContentList = ({ content, theme = 'blue' }) => {
  if (!content) return null;

  const rawLines = content.split('\n');
  const renderedElements = [];

  rawLines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trim();
    if (!line) return;

    // 1. Cek apakah ada penanda eksplisit List Horizontal: -> [H] atau [H] atau [HORIZONTAL]
    const isHorizontalMatch = line.match(/^(?:->|→)?\s*\[h(?:orizontal)?\]\s*(.*)$/i);
    if (isHorizontalMatch) {
      let title = null;
      let rawItems = isHorizontalMatch[1].trim();
      const colonIndex = rawItems.indexOf(':');
      if (colonIndex !== -1 && colonIndex < 70) {
        title = rawItems.substring(0, colonIndex).trim();
        rawItems = rawItems.substring(colonIndex + 1).trim();
      }

      const delimiter = rawItems.includes('|') ? '|' : ',';
      const items = rawItems
        .split(delimiter)
        .map((s) => s.trim().replace(/\.$/, ''))
        .filter(Boolean);

      if (items.length > 0) {
        renderedElements.push({
          type: 'horizontal-list',
          title,
          items,
          key: `hlist-${lineIndex}`,
        });
        return;
      }
    }

    // 2. Cek auto-detection list horizontal: jika baris memiliki >= 3 persamaan (=), panah (→/➔/->), atau lawan kata (><) yang dipisahkan koma/titik koma
    const eqSymbolCount = (line.match(/[=→➔]|><|(?:\->)/g) || []).length;
    const hasCommaOrSemi = line.includes(',') || line.includes(';');
    if (eqSymbolCount >= 3 && hasCommaOrSemi) {
      let title = null;
      let rawItems = line;
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1 && colonIndex < 70) {
        title = line.substring(0, colonIndex).trim();
        rawItems = line.substring(colonIndex + 1).trim();
      }

      const delimiter = rawItems.includes(';') ? ';' : ',';
      const items = rawItems
        .split(delimiter)
        .map((s) => s.trim().replace(/\.$/, ''))
        .filter(Boolean);

      if (items.length >= 2) {
        renderedElements.push({
          type: 'horizontal-list',
          title,
          items,
          key: `auto-hlist-${lineIndex}`,
        });
        return;
      }
    }

    // 3. Cek apakah ada multiple sifat/rumus yang dipisahkan titik koma (;) ganda untuk list kebawah
    const hasSemicolonList =
      line.includes(';') &&
      ((line.match(/;/g) || []).length >= 2 ||
        /:\s*[^;]+;\s*[^:]+:/i.test(line) ||
        /=\s*[^;]+;\s*[^=]+=/i.test(line));

    if (hasSemicolonList) {
      const parts = line.split(';').map((p) => p.trim()).filter(Boolean);
      parts.forEach((part, partIdx) => {
        const cleanPart = part.replace(/\.$/, '');
        renderedElements.push({
          type: 'list-item',
          text: cleanPart,
          key: `semi-${lineIndex}-${partIdx}`,
        });
      });
      return;
    }

    // 4. Cek list kebawah dengan panah (->), bullet, atau angka urut
    const isArrow = line.startsWith('->') || line.startsWith('→');
    const isBullet = line.startsWith('•') || line.startsWith('-');
    const numberedMatch = line.match(/^(\d+[\.\)]|\([0-9]+\))\s+/);

    if (isArrow || isBullet || numberedMatch) {
      let cleanText = line;
      let customPrefix = null;

      if (isArrow) {
        cleanText = line.replace(/^(\->|→)\s*/, '');
      } else if (isBullet) {
        cleanText = line.replace(/^[•\-]\s*/, '');
      } else if (numberedMatch) {
        customPrefix = numberedMatch[1];
        cleanText = line.replace(/^(\d+[\.\)]|\([0-9]+\))\s*/, '');
      }

      renderedElements.push({
        type: 'list-item',
        text: cleanText,
        prefix: customPrefix,
        key: `line-${lineIndex}`,
      });
    } else {
      renderedElements.push({
        type: 'paragraph',
        text: line,
        key: `line-${lineIndex}`,
      });
    }
  });

  const getThemeClasses = () => {
    switch (theme) {
      case 'amber':
        return {
          card: 'bg-amber-50/80 border-amber-200/90 hover:bg-amber-100/60 hover:border-amber-300',
          badge: 'bg-amber-200 text-amber-950 border-amber-300',
          title: 'text-amber-950',
          formula: 'bg-white text-amber-950 border-amber-200 shadow-2xs',
        };
      case 'emerald':
        return {
          card: 'bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100/50 hover:border-emerald-300',
          badge: 'bg-emerald-200 text-emerald-950 border-emerald-300',
          title: 'text-emerald-950',
          formula: 'bg-white text-emerald-950 border-emerald-200 shadow-2xs',
        };
      case 'blue':
      default:
        return {
          card: 'bg-slate-50/90 border-slate-200/90 hover:bg-blue-50/40 hover:border-blue-200',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          title: 'text-slate-900',
          formula: 'bg-white text-blue-950 border-slate-200 shadow-2xs',
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="space-y-2.5">
      {renderedElements.map((elem) => {
        // Tipe 1: List Horizontal (Lencana / Chip Menyamping)
        if (elem.type === 'horizontal-list') {
          return (
            <div key={elem.key} className="space-y-2 my-2.5 animate-fade-in">
              {elem.title && (
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2 h-2 rounded-full ring-4 ${
                        theme === 'amber' ? 'bg-amber-500 ring-amber-100' : 'bg-blue-600 ring-blue-100'
                      }`}
                    />
                    <h5 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                      {elem.title}
                    </h5>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      theme === 'amber'
                        ? 'text-amber-800 bg-amber-50 border-amber-200'
                        : 'text-blue-700 bg-blue-50 border-blue-200'
                    }`}
                  >
                    {elem.items.length} Data
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {elem.items.map((item, itemIdx) => {
                  const cleanItem = item.trim();
                  if (!cleanItem) return null;

                  const hasEquals = cleanItem.includes('=');
                  const hasArrow =
                    cleanItem.includes('→') || cleanItem.includes('➔') || cleanItem.includes('->');
                  const hasOpposite = cleanItem.includes('><');

                  if (hasEquals) {
                    const [left, ...rest] = cleanItem.split('=');
                    const right = rest.join('=');
                    return (
                      <div
                        key={itemIdx}
                        className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-blue-200/90 shadow-2xs hover:border-blue-400 hover:shadow-xs hover:scale-105 transition-all text-xs sm:text-sm select-none group"
                      >
                        <span className="font-mono font-bold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-lg border border-blue-100 group-hover:bg-blue-100 transition-colors">
                          {left.trim()}
                        </span>
                        <span className="text-slate-400 font-bold mx-1.5 text-xs">=</span>
                        <span className="font-mono font-black text-slate-900 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200 group-hover:bg-blue-50/60 transition-colors">
                          {right.trim()}
                        </span>
                      </div>
                    );
                  }

                  if (hasArrow) {
                    const arrowSymbol = cleanItem.includes('→')
                      ? '→'
                      : cleanItem.includes('➔')
                      ? '➔'
                      : '->';
                    const [left, ...rest] = cleanItem.split(arrowSymbol);
                    const right = rest.join(arrowSymbol);
                    return (
                      <div
                        key={itemIdx}
                        className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-amber-200 shadow-2xs hover:border-amber-400 hover:shadow-xs hover:scale-105 transition-all text-xs sm:text-sm select-none group"
                      >
                        <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 group-hover:bg-amber-100 transition-colors">
                          {left.trim()}
                        </span>
                        <span className="text-amber-500 font-black mx-1.5 text-xs">➔</span>
                        <span className="font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300 group-hover:bg-amber-200 transition-colors">
                          {right.trim()}
                        </span>
                      </div>
                    );
                  }

                  if (hasOpposite) {
                    const [left, ...rest] = cleanItem.split('><');
                    const right = rest.join('><');
                    return (
                      <div
                        key={itemIdx}
                        className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-rose-200 shadow-2xs hover:border-rose-400 hover:shadow-xs hover:scale-105 transition-all text-xs sm:text-sm select-none group"
                      >
                        <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                          {left.trim()}
                        </span>
                        <span className="text-rose-500 font-black mx-1.5 text-[11px]">≠</span>
                        <span className="font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                          {right.trim()}
                        </span>
                      </div>
                    );
                  }

                  const colonSubIdx = cleanItem.indexOf(':');
                  if (colonSubIdx !== -1 && colonSubIdx < 30) {
                    const itemLabel = cleanItem.substring(0, colonSubIdx).trim();
                    const itemValue = cleanItem.substring(colonSubIdx + 1).trim();
                    return (
                      <div
                        key={itemIdx}
                        className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs hover:border-blue-300 hover:bg-blue-50/40 hover:scale-105 transition-all text-xs sm:text-sm font-semibold select-none group"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0 ${
                            theme === 'amber' ? 'bg-amber-500' : 'bg-blue-500'
                          }`}
                        />
                        <span className="font-bold text-slate-900 mr-1.5">{itemLabel}:</span>
                        <span
                          className={
                            theme === 'amber'
                              ? 'text-amber-900 font-medium'
                              : 'text-slate-700 font-medium'
                          }
                        >
                          {itemValue}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={itemIdx}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-2xs hover:border-blue-300 hover:bg-blue-50/40 hover:scale-105 transition-all text-xs sm:text-sm font-semibold select-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 flex-shrink-0" />
                      <span>{cleanItem}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // Tipe 2: List Menurun ke Bawah (List Kebawah dengan Simbol '->')
        if (elem.type === 'list-item') {
          const colonIdx = elem.text.indexOf(':');
          let label = null;
          let formula = elem.text;

          if (colonIdx !== -1 && colonIdx < 45) {
            label = elem.text.substring(0, colonIdx).trim();
            formula = elem.text.substring(colonIdx + 1).trim();
          }

          return (
            <div
              key={elem.key}
              className={`flex items-start space-x-2.5 p-2.5 sm:p-3 rounded-xl transition-all border ${themeClasses.card}`}
            >
              <div className="flex items-center space-x-1.5 flex-shrink-0 mt-0.5">
                <span
                  className={`font-mono font-black text-xs px-2 py-0.5 rounded-md border select-none inline-flex items-center shadow-2xs ${themeClasses.badge}`}
                >
                  <span className="tracking-tighter">{'->'}</span>
                </span>
                {elem.prefix && (
                  <span className="text-xs font-bold text-slate-500">{elem.prefix}</span>
                )}
              </div>

              <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                {label ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <strong className={`font-bold flex-shrink-0 ${themeClasses.title}`}>
                      {label}:
                    </strong>
                    <span
                      className={`font-mono font-bold px-2.5 py-1 rounded-lg border inline-block text-xs sm:text-sm ${themeClasses.formula}`}
                    >
                      {formula}
                    </span>
                  </div>
                ) : formula.includes('=') ? (
                  <span
                    className={`font-mono font-bold px-2.5 py-1 rounded-lg border inline-block text-xs sm:text-sm ${themeClasses.formula}`}
                  >
                    {formula}
                  </span>
                ) : (
                  <span className="text-slate-800 font-medium">{formula}</span>
                )}
              </div>
            </div>
          );
        }

        // Tipe 3: Paragraf Biasa
        return (
          <p key={elem.key} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {elem.text}
          </p>
        );
      })}
    </div>
  );
};

/**
 * Komponen Interaktif Visual Tangga Satuan Panjang (km sampai mm)
 * Didesain khusus untuk mempermudah siswa memahami konversi skala peta (km <-> cm).
 */
const TanggaSatuanVisual = () => {
  const [kmVal, setKmVal] = useState('4');
  const [cmVal, setCmVal] = useState('6000000');
  const [activeTab, setActiveTab] = useState('km-to-cm');

  const STAIRS = [
    { id: 'km', label: 'km', full: 'Kilometer', role: 'Satuan Jarak Sebenarnya (JS)', bg: 'bg-indigo-600', text: 'text-white', isSpecial: 'km' },
    { id: 'hm', label: 'hm', full: 'Hektometer', role: 'Turun 1: ×10', bg: 'bg-blue-600', text: 'text-white' },
    { id: 'dam', label: 'dam', full: 'Dekameter', role: 'Turun 2: ×100', bg: 'bg-sky-600', text: 'text-white' },
    { id: 'm', label: 'm', full: 'Meter', role: 'Satuan Pokok Internasional', bg: 'bg-teal-600', text: 'text-white' },
    { id: 'dm', label: 'dm', full: 'Desimeter', role: 'Turun 4: ×10.000', bg: 'bg-emerald-600', text: 'text-white' },
    { id: 'cm', label: 'cm', full: 'Sentimeter', role: 'Satuan Skala & Peta (JP)', bg: 'bg-amber-400', text: 'text-slate-950 font-black', isSpecial: 'cm' },
    { id: 'mm', label: 'mm', full: 'Milimeter', role: 'Satuan Terkecil (×1.000.000)', bg: 'bg-slate-700', text: 'text-white' },
  ];

  const presetsKm = ['1', '4', '15', '48', '60'];
  const presetsCm = ['500.000', '1.200.000', '2.500.000', '6.000.000'];

  const getKmConverted = () => {
    const clean = String(kmVal).replace(',', '.');
    const n = parseFloat(clean);
    if (isNaN(n)) return '0';
    return (n * 100000).toLocaleString('id-ID');
  };

  const getCmConverted = () => {
    const raw = String(cmVal).replace(/\./g, '').replace(',', '.');
    const n = parseFloat(raw);
    if (isNaN(n)) return '0';
    return (n / 100000).toLocaleString('id-ID');
  };

  return (
    <div className="space-y-4 animate-fade-in my-3">
      {/* 1. Header Banner Aturan Tangga */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 text-xs text-blue-950 flex items-start space-x-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-black shadow-xs">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div>
            <strong className="block font-black text-blue-900 uppercase tracking-wider text-[11px]">
              Setiap Turun 1 Tangga:
            </strong>
            <span className="font-semibold text-slate-800">
              Dikali (×) 10 <span className="text-blue-700 font-bold">• Tambah 1 angka nol (0)</span>
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 text-xs text-amber-950 flex items-start space-x-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-black shadow-xs">
            <ArrowUp className="w-4 h-4" />
          </div>
          <div>
            <strong className="block font-black text-amber-950 uppercase tracking-wider text-[11px]">
              Setiap Naik 1 Tangga:
            </strong>
            <span className="font-semibold text-slate-800">
              Dibagi (÷) 10 <span className="text-amber-800 font-bold">• Coret 1 angka nol (0)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visualisasi Tangga 7 Tingkat */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Peta Tangga Satuan Panjang (km sampai mm)</span>
          </span>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
            7 Anak Tangga
          </span>
        </div>

        {/* Daftar Tangga Berundak */}
        <div className="space-y-1.5 pt-1">
          {STAIRS.map((stair, index) => (
            <div
              key={stair.id}
              className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all ${
                stair.isSpecial === 'cm'
                  ? 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 border-amber-300 shadow-xs ring-2 ring-amber-300/40'
                  : stair.isSpecial === 'km'
                  ? 'bg-blue-50/70 border-blue-200'
                  : 'bg-slate-50/80 border-slate-200/80'
              }`}
              style={{
                marginLeft: `${Math.min(index * 4.5, 30)}%`,
              }}
            >
              <div className="flex items-center space-x-2">
                <span
                  className={`w-11 h-7 rounded-lg flex items-center justify-center text-xs font-black font-mono shadow-2xs ${stair.bg} ${stair.text}`}
                >
                  {stair.label}
                </span>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-900">{stair.full}</span>
                    {stair.isSpecial === 'cm' && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                        ⭐ Kunci Skala (cm)
                      </span>
                    )}
                    {stair.isSpecial === 'km' && (
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                        Jarak Sebenarnya (km)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-semibold text-slate-500 hidden sm:block pr-2">
                {stair.role}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight 5 Tangga Skala */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 text-slate-950 font-medium shadow-sm space-y-1 mt-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-slate-950 flex-shrink-0" />
            <strong className="text-xs sm:text-sm font-black uppercase tracking-wider">
              Trik Kilat Skala: Lompatan 5 Tangga (km ⇄ cm)
            </strong>
          </div>
          <p className="text-xs leading-relaxed text-slate-950/90 font-medium">
            Dari <strong>km</strong> turun 5 kali ke <strong>cm</strong> = <strong>DIKALI 100.000</strong> (Cukup tambahkan <strong>5 angka nol</strong>).
            <br />
            Dari <strong>cm</strong> naik 5 kali ke <strong>km</strong> = <strong>DIBAGI 100.000</strong> (Cukup <strong>coret 5 angka nol</strong>).
          </p>
        </div>
      </div>

      {/* 3. Simulator Interaktif Konversi (Desain Bersih & Konsisten) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 border-2 border-blue-200 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-blue-100 gap-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                Latihan Simulator Cepat Konversi Skala
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Pilih arah konversi dan lihat langkah perhitungannya
              </span>
            </div>
          </div>

          {/* Toggle Tab yang Kontras & Konsisten */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('km-to-cm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'km-to-cm'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              km ke cm (×100.000)
            </button>
            <button
              onClick={() => setActiveTab('cm-to-km')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cm-to-km'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              cm ke km (÷100.000)
            </button>
          </div>
        </div>

        {activeTab === 'km-to-cm' ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-bold text-slate-500 mr-1 uppercase tracking-wider">
                Contoh Cepat:
              </span>
              {presetsKm.map((p) => (
                <button
                  key={p}
                  onClick={() => setKmVal(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    kmVal === p
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p} km
                </button>
              ))}
            </div>

            {/* Kotak Input dan Kotak Hasil yang Konsisten Sempurna */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              {/* Kotak 1: Jarak Sebenarnya (Input) */}
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Jarak Sebenarnya (Input):
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={kmVal}
                    onChange={(e) => setKmVal(e.target.value)}
                    className="w-24 sm:w-28 px-3 py-2 rounded-xl bg-white text-slate-900 font-black font-mono text-center text-sm sm:text-base border-2 border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                  />
                  <span className="font-bold text-xs sm:text-sm text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    km
                  </span>
                </div>
              </div>

              {/* Tanda Panah Operasi */}
              <div className="flex sm:flex-col items-center justify-center text-blue-600 font-black text-xs space-x-1 sm:space-x-0 py-1">
                <span className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shadow-2xs">
                  ➔
                </span>
                <span className="text-[10px] text-blue-700 font-bold mt-0.5">× 100.000</span>
              </div>

              {/* Kotak 2: Hasil diubah ke cm (Output) - Konsisten Warna Putih & Format Serasi */}
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                  Hasil Diubah ke cm (Output):
                </span>
                <div className="flex items-center space-x-2">
                  <div className="min-w-28 sm:min-w-36 px-3 py-2 rounded-xl bg-white text-blue-950 font-black font-mono text-center text-sm sm:text-base border-2 border-blue-400 shadow-2xs">
                    {getKmConverted()}
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-blue-700 bg-white px-2.5 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                    cm
                  </span>
                </div>
              </div>
            </div>

            {/* Catatan Perhitungan Terbaca Jelas */}
            <div className="text-[11px] text-slate-500 font-medium px-1 flex items-center space-x-1.5">
              <span className="text-blue-600 font-bold">⚡ Langkah:</span>
              <span>{kmVal || 0} km dikali 100.000 = <strong>{getKmConverted()} cm</strong> (tambah 5 angka nol)</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-bold text-slate-500 mr-1 uppercase tracking-wider">
                Contoh Cepat:
              </span>
              {presetsCm.map((p) => (
                <button
                  key={p}
                  onClick={() => setCmVal(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    cmVal === p
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p} cm
                </button>
              ))}
            </div>

            {/* Kotak Input dan Kotak Hasil yang Konsisten Sempurna */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              {/* Kotak 1: Nilai dalam cm (Input) */}
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Nilai dalam cm (Input):
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={cmVal}
                    onChange={(e) => setCmVal(e.target.value)}
                    className="w-32 sm:w-36 px-3 py-2 rounded-xl bg-white text-slate-900 font-black font-mono text-center text-sm sm:text-base border-2 border-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs transition-all"
                  />
                  <span className="font-bold text-xs sm:text-sm text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                    cm
                  </span>
                </div>
              </div>

              {/* Tanda Panah Operasi */}
              <div className="flex sm:flex-col items-center justify-center text-blue-600 font-black text-xs space-x-1 sm:space-x-0 py-1">
                <span className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shadow-2xs">
                  ➔
                </span>
                <span className="text-[10px] text-blue-700 font-bold mt-0.5">÷ 100.000</span>
              </div>

              {/* Kotak 2: Hasil diubah ke km (Output) - Konsisten Warna Putih & Format Serasi */}
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                  Hasil Diubah ke km (Output):
                </span>
                <div className="flex items-center space-x-2">
                  <div className="min-w-24 sm:min-w-28 px-3 py-2 rounded-xl bg-white text-blue-950 font-black font-mono text-center text-sm sm:text-base border-2 border-blue-400 shadow-2xs">
                    {getCmConverted()}
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-blue-700 bg-white px-2.5 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
                    km
                  </span>
                </div>
              </div>
            </div>

            {/* Catatan Perhitungan Terbaca Jelas */}
            <div className="text-[11px] text-slate-500 font-medium px-1 flex items-center space-x-1.5">
              <span className="text-blue-600 font-bold">⚡ Langkah:</span>
              <span>{cmVal || 0} cm dibagi 100.000 = <strong>{getCmConverted()} km</strong> (coret 5 angka nol)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MaterialReader = ({ bab, onStartQuiz }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide ke slide 1 setiap kali materi bab berganti
  useEffect(() => {
    setCurrentSlide(0);
  }, [bab?.id]);

  // Navigasi keyboard (Panah Kiri / Panah Kanan)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!bab) return null;

  // --- PEMBENTUKAN STRUKTUR BANYAK SLIDE SECARA DINAMIS ---
  const slides = [];

  // SLIDE 1: PENGENALAN & MISI PEMBELAJARAN
  slides.push({
    id: 'intro',
    badge: `Materi ${bab.no} • Bagian 1`,
    title: bab.judul,
    subtitle: 'Pengenalan & Tujuan Belajar',
    icon: BookOpen,
    render: () => (
      <div className="space-y-4 animate-fade-in">
        {/* Banner Sapaan Ramah Anak */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center space-x-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Materi {bab.no} Standar Pusmendik</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">{bab.judul}</h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
            {bab.ringkasan || 'Mari kita pelajari materi ini bersama langkah demi langkah dengan penjelasan yang mudah dan menyenangkan!'}
          </p>
        </div>

        {/* Kartu Tujuan Pembelajaran */}
        {bab.tujuan && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-blue-200 shadow-xs flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Misi Pembelajaran Hari Ini
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {bab.tujuan}
              </p>
            </div>
          </div>
        )}

        {/* Petunjuk Belajar Santai */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs text-slate-600">
          <span className="text-xl">📖</span>
          <p>
            Gunakan tombol <strong>"Lanjut Slide"</strong> di bawah untuk membaca materi secara perlahan. Pahami setiap contoh sebelum lanjut ya!
          </p>
        </div>
      </div>
    ),
  });

  // SLIDE 2: KONSEP KUNCI / KAIDAH POKOK
  if (bab.konsepKunci) {
    slides.push({
      id: 'konsep_kunci',
      badge: `Materi ${bab.no} • Bagian 2`,
      title: 'Konsep Kunci yang Wajib Dipahami',
      subtitle: 'Pondasi Utama Materi',
      icon: Lightbulb,
      render: () => (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/60 border-2 border-amber-300 shadow-md space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs">
                <Lightbulb className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Kaidah Emas Materi
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  Kunci Utama {bab.judul}
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs">
              <FormattedContentList content={bab.konsepKunci} theme="amber" />
            </div>

            <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Mengapa konsep ini penting?</strong> Konsep kunci ini adalah aturan baku yang akan selalu dipakai saat mengerjakan soal-soal latihan dan ujian!
              </span>
            </div>
          </div>
        </div>
      ),
    });
  }

  // SLIDE 3..N: PEMBAHASAN MENDALAM TIAP SUBMATERI DI URAIAN MATERI
  if (bab.uraianMateri && bab.uraianMateri.length > 0) {
    bab.uraianMateri.forEach((item, idx) => {
      slides.push({
        id: `uraian_${idx}`,
        badge: `Materi ${bab.no} • Bagian ${idx + 3}`,
        title: item.subjudul || `Pembahasan Bagian ${idx + 1}`,
        subtitle: 'Penjelasan & Contoh Detail',
        icon: Layers,
        render: () => (
          <div className="space-y-4 animate-fade-in">
            {/* Header Subtopik */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-2.5">
                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">
                  {idx + 1}
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {item.subjudul}
                </h4>
              </div>

              {/* Uraian Konten Bertahap dengan List -> Turun ke Bawah */}
              {item.konten && (
                <div className="pt-2 border-t border-slate-100">
                  <FormattedContentList content={item.konten} theme="blue" />
                </div>
              )}
            </div>

            {/* Widget Interaktif Tangga Satuan Khusus Skala */}
            {(item.tipe === 'tangga_satuan' || item.subjudul?.toLowerCase().includes('tangga')) && (
              <TanggaSatuanVisual />
            )}

            {/* Rumus / Kaidah Khusus (jika ada) */}
            {item.rumus && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-2 border-blue-200 shadow-xs flex items-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Rumus / Kaidah Pokok:
                  </span>
                  <code className="text-blue-950 font-black font-mono text-xs sm:text-sm block bg-white px-3 py-1.5 rounded-lg border border-blue-200 mt-1 shadow-2xs">
                    {item.rumus}
                  </code>
                </div>
              </div>
            )}

            {/* Contoh Penerapan & Pembahasan Detail */}
            {item.contoh && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 shadow-xs space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <strong className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Contoh Soal & Pembahasan Langkah demi Langkah:
                  </strong>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold shadow-2xs">
                  {item.contoh}
                </div>
              </div>
            )}

            {/* Poin-poin Tambahan */}
            {item.poin && Array.isArray(item.poin) && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Catatan Penting:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              </div>
            )}
          </div>
        ),
      });
    });
  }

  // SLIDE KHUSUS KOSAKATA BAKU VS TIDAK BAKU (JIKA ADA PADA BAHASA INDONESIA)
  if (bab.daftarBaku && bab.daftarBaku.length > 0) {
    slides.push({
      id: 'daftar_baku',
      badge: 'Eksplorasi Kosakata',
      title: 'Kosakata Baku vs Tidak Baku',
      subtitle: 'Standar Kamus Besar Bahasa Indonesia (KBBI)',
      icon: FileText,
      render: () => (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 leading-relaxed">
            Perhatikan kata-kata berikut! Kata di sebelah kiri adalah kata <strong>Baku</strong> (sesuai kaidah EYD/KBBI), sedangkan kata di sebelah kanan adalah kata <strong>Tidak Baku</strong> yang sering keliru digunakan dalam percakapan sehari-hari.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {bab.daftarBaku.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-bold text-emerald-900">{item.baku}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-rose-500 line-through">
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.tidakBaku}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    });
  }

  // SLIDE BEDAH CONTOH SOAL TKA SD DENGAN PEMBAHASAN DETAIL
  if (bab.contohSoal) {
    slides.push({
      id: 'contoh_soal',
      badge: 'Simulasi Soal Nyata',
      title: 'Bedah Contoh Soal Asesmen TKA SD',
      subtitle: 'Analisis & Cara Penyelesaian Rinci',
      icon: HelpCircle,
      render: () => (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/50 border-2 border-indigo-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Model Soal Asesmen TKA SD</span>
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">Tingkat SD Kelas 4 - 6</span>
            </div>

            {/* Kotak Pertanyaan */}
            <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-2xs space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                Pertanyaan Soal:
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                {bab.contohSoal.soal}
              </p>
            </div>

            {/* Kotak Pembahasan Rinci */}
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/90 border-2 border-emerald-300 shadow-2xs space-y-2">
              <div className="flex items-center space-x-2 text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <strong className="text-xs sm:text-sm font-black uppercase tracking-wider">
                  Cara Berpikir & Langkah Penyelesaian:
                </strong>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                <FormattedContentList content={bab.contohSoal.penjelasan} theme="emerald" />
              </div>
            </div>
          </div>
        </div>
      ),
    });
  }

  // SLIDE TERAKHIR: TIPS JUARA, RANGKUMAN & SIAP KUIS
  slides.push({
    id: 'summary',
    badge: 'Langkah Terakhir',
    title: 'Rangkuman & Kuis Pemahaman',
    subtitle: 'Siap Meraih 3 Bintang Emas!',
    icon: Award,
    render: () => (
      <div className="space-y-4 animate-fade-in">
        {/* Tips Juara TKA SD (jika ada) */}
        {bab.tipsJuara && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-100/80 via-yellow-50 to-amber-100/60 border-2 border-amber-300 shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center flex-shrink-0 shadow-xs animate-bounce-subtle">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <strong className="text-amber-950 block font-black text-xs sm:text-sm uppercase tracking-wider">
                ⚡ Tips Juara TKA SD:
              </strong>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {bab.tipsJuara}
              </p>
            </div>
          </div>
        )}

        {/* Checklist Pemahaman */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Checklist Pemahaman Kamu:</span>
          </h4>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Memahami konsep dasar dan kaidah <strong>{bab.judul}</strong>.</span>
            </div>
            <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Mempelajari contoh soal dan pembahasan langkah demi langkah.</span>
            </div>
            <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Mengingat tips dan trik agar tidak terkecoh dalam ujian.</span>
            </div>
          </div>
        </div>

        {/* Banner Aksi Kuis Pemahaman */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white shadow-lg space-y-3 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-yellow-300 inline-block mb-1">
              ⭐⭐⭐ Uji 3 Bintang
            </span>
            <h4 className="text-base sm:text-lg font-black">
              Materi Selesai Dipelajari! Siap Uji Pemahaman?
            </h4>
            <p className="text-xs text-blue-100 mt-0.5 leading-relaxed">
              Jawab 3 soal kuis pemahaman materi ini untuk meraih 3 Bintang Emas dan membuka materi berikutnya!
            </p>
          </div>

          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <span>Mulai 3 Soal Kuis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
  });

  const totalSlides = slides.length;
  const currentSlideData = slides[currentSlide] || slides[0];
  const progressPercent = Math.round(((currentSlide + 1) / totalSlides) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-2 text-slate-800 animate-fade-in">
      {/* 1. Header Bar Navigasi Slide & Progress Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
        {/* Info Slide & Stepper Ringkas */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-black bg-blue-100 text-blue-800 border border-blue-200">
              Slide {currentSlide + 1} dari {totalSlides}
            </span>
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">
              {currentSlideData.subtitle}
            </span>
          </div>

          {/* Stepper Dots yang Bisa Diklik */}
          <div className="flex items-center space-x-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === currentSlide
                    ? 'w-6 h-2.5 bg-blue-600 shadow-xs'
                    : idx < currentSlide
                    ? 'w-2.5 h-2.5 bg-emerald-500'
                    : 'w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Buka Slide ${idx + 1}: ${s.subtitle}`}
              />
            ))}
          </div>
        </div>

        {/* Bar Progres Geser */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Judul Bagian Slide Aktif */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <currentSlideData.icon className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {currentSlideData.badge}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Tekan tombol panah ← / → di keyboard
        </span>
      </div>

      {/* 3. Konten Utama Slide Terpilih */}
      <div className="min-h-[340px]">
        {currentSlideData.render()}
      </div>

      {/* 4. Footer Bar Tombol Navigasi Antar Slide */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
        {/* Tombol Sebelumnya */}
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
            currentSlide === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs hover:shadow-xs cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {/* Indikator Posisi di Tengah */}
        <div className="text-[11px] font-semibold text-slate-500 hidden sm:block">
          {currentSlide + 1} / {totalSlides} Slide
        </div>

        {/* Tombol Selanjutnya (hanya tampil jika belum di slide terakhir) */}
        {currentSlide < totalSlides - 1 ? (
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1))}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Lanjut Slide Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-500 text-xs font-semibold select-none border border-slate-200/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Slide Terakhir</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialReader;
