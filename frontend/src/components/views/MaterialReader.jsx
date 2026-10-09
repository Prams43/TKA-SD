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
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  FileText,
  Compass,
  Layers,
  Award,
  Zap,
  Info,
  Bookmark,
  Search,
} from 'lucide-react';
import { formatMath } from '../../utils/mathRenderer';

/**
 * Komponen Accordion / Tulisan Dropdown Interaktif
 * Memungkinkan siswa membuka/menutup detail penjelasan atau rumus untuk menghindari tampilan bertumpuk.
 */
const InteractiveDropdownList = ({ items, defaultOpenAll = null }) => {
  const [openItems, setOpenItems] = useState(() => {
    const initial = {};
    const shouldOpenAll = defaultOpenAll !== null ? defaultOpenAll : items.length <= 2;
    items.forEach((_, idx) => {
      // Jika item banyak (> 2), buka item pertama saja sebagai contoh isi, sisanya dilipat rapi dalam dropdown
      initial[idx] = shouldOpenAll ? true : idx === 0;
    });
    return initial;
  });

  if (!items || items.length === 0) return null;

  const allOpen =
    Object.values(openItems).every(Boolean) &&
    Object.keys(openItems).length === items.length;

  const toggleItem = (idx) => {
    setOpenItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleAll = () => {
    if (allOpen) {
      setOpenItems({});
    } else {
      const all = {};
      items.forEach((_, idx) => {
        all[idx] = true;
      });
      setOpenItems(all);
    }
  };

  const isMathFormula = (val) => {
    if (!val) return false;
    const lower = val.toLowerCase();
    return (
      (val.includes('=') || val.includes('²') || val.includes('³') || val.includes('π')) &&
      !lower.includes('contoh') &&
      !lower.includes('adalah') &&
      !lower.includes('yaitu') &&
      !lower.includes('kalimat')
    );
  };

  return (
    <div className="space-y-2.5 my-3 animate-fade-in">
      {items.length > 1 && (
        <div className="flex items-center justify-between pb-1 text-xs">
          <span className="text-slate-600 font-semibold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Poin Materi ({items.length} Bagian):</span>
          </span>
          <button
            type="button"
            onClick={toggleAll}
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors cursor-pointer text-[11px] flex items-center space-x-1 bg-blue-50/70 hover:bg-blue-100/70 px-2.5 py-1 rounded-lg border border-blue-200/60"
          >
            <span>{allOpen ? 'Tutup Semua Dropdown' : 'Buka Semua Dropdown'}</span>
          </button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOpen = !!openItems[idx];
          const hasFormula = item.formula || (item.value && isMathFormula(item.value));
          const formulaContent = item.formula || (hasFormula ? item.value : null);
          const descContent = item.description || (!hasFormula ? item.value : null);

          return (
            <div
              key={idx}
              className={`border rounded-xl overflow-hidden bg-white shadow-2xs transition-all ${
                isOpen ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200/90 hover:border-blue-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer gap-2"
              >
                <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span
                    className="font-bold text-slate-800 text-xs sm:text-sm break-words leading-snug flex-1"
                    dangerouslySetInnerHTML={{ __html: formatMath(item.title) }}
                  />
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                    {isOpen ? 'Tutup' : 'Buka Detail'}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1.5 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-2 animate-fade-in bg-slate-50/50">
                  {formulaContent && (
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200/90 font-mono text-xs sm:text-sm font-bold text-blue-950 shadow-2xs">
                      <span dangerouslySetInnerHTML={{ __html: formatMath(formulaContent) }} />
                    </div>
                  )}
                  {descContent && (
                    <p
                      className="leading-relaxed font-normal text-slate-700"
                      dangerouslySetInnerHTML={{ __html: formatMath(descContent) }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Parser Konten Materi Tingkat Lanjut:
 * - Menghilangkan simbol `->` yang kaku
 * - Mendeteksi daftar berurutan / urutan prioritas dan menampilkannya sebagai Alur Langkah (Step Pipeline)
 * - Mengelompokkan sifat/aturan yang banyak menjadi Tulisan Dropdown (Accordion) yang rapi
 * - Memformat rumus matematika dengan KaTeX
 */
const EnhancedContentRenderer = ({ content }) => {
  if (!content) return null;

  const rawLines = content.split('\n');
  const sections = [];
  let pendingDropdownItems = [];
  let pendingBulletItems = [];

  const flushDropdownItems = () => {
    if (pendingDropdownItems.length > 0) {
      sections.push({
        type: 'dropdown-group',
        items: [...pendingDropdownItems],
        key: `dropdown-group-${sections.length}`,
      });
      pendingDropdownItems = [];
    }
  };

  const flushBulletItems = () => {
    if (pendingBulletItems.length > 0) {
      if (pendingBulletItems.length >= 2) {
        sections.push({
          type: 'bullet-group',
          items: [...pendingBulletItems],
          key: `bullet-group-${sections.length}`,
        });
      } else {
        sections.push({
          type: 'callout-rule',
          text: pendingBulletItems[0],
          key: `rule-${sections.length}`,
        });
      }
      pendingBulletItems = [];
    }
  };

  rawLines.forEach((rawLine, lineIndex) => {
    const line = rawLine.trim();
    if (!line) return;

    // 1. Cek apakah baris merupakan Alur Langkah / List Horizontal (-> [H] atau [H])
    const isHorizontalMatch = line.match(/^(?:->|→)?\s*\[h(?:orizontal)?\]\s*(.*)$/i);
    if (isHorizontalMatch) {
      flushDropdownItems();
      flushBulletItems();

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
        sections.push({
          type: 'sequence-flow',
          title,
          items,
          key: `seq-${lineIndex}`,
        });
        return;
      }
    }

    // 2. Cek baris berpola Sifat / Rumus / Aturan dengan tanda titik dua ':' (misal: "-> Komutatif (pertukaran): a + b = b + a")
    const cleanedLine = line.replace(/^(?:->|→|•|-|\d+[\.\)])\s*/, '');
    const colonIdx = cleanedLine.indexOf(':');

    if (colonIdx !== -1 && colonIdx < 65) {
      flushBulletItems();
      const label = cleanedLine.substring(0, colonIdx).trim();
      const value = cleanedLine.substring(colonIdx + 1).trim();

      // Masukkan ke dalam kumpulan dropdown
      pendingDropdownItems.push({
        title: label,
        value: value,
      });
      return;
    }

    // 3. Cek baris bullet point / checklist tanpa tanda titik dua
    const isBulletPoint =
      line.startsWith('•') ||
      line.startsWith('-') ||
      /^\d+[\.\)]\s+/.test(line);

    if (isBulletPoint) {
      flushDropdownItems();
      pendingBulletItems.push(cleanedLine);
      return;
    }

    // 4. Jika baris berupa aturan / catatan / penegasan penting
    flushDropdownItems();
    flushBulletItems();

    const isRuleCallout =
      line.startsWith('->') ||
      line.startsWith('→') ||
      line.toLowerCase().includes('perhatikan') ||
      line.toLowerCase().includes('ingat');

    if (isRuleCallout) {
      sections.push({
        type: 'callout-rule',
        text: cleanedLine,
        key: `rule-${lineIndex}`,
      });
    } else {
      sections.push({
        type: 'paragraph',
        text: line,
        key: `p-${lineIndex}`,
      });
    }
  });

  flushDropdownItems();
  flushBulletItems();

  return (
    <div className="space-y-3">
      {sections.map((sec) => {
        // Tipe 1: Alur Langkah Berurutan / Pipeline (misal KABATAKU: Kurung -> Kali/Bagi -> Tambah/Kurang)
        if (sec.type === 'sequence-flow') {
          return (
            <div
              key={sec.key}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3 my-2 shadow-2xs"
            >
              {sec.title && (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <strong className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                    {sec.title}
                  </strong>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {sec.items.map((it, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center space-x-2 text-xs font-semibold text-slate-800"
                  >
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span
                      className="break-words leading-snug flex-1"
                      dangerouslySetInnerHTML={{
                        __html: formatMath(it.replace(/^\d+[\.\)]\s*/, '')),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Tipe 2: Kelompok Tulisan Dropdown (Accordion)
        if (sec.type === 'dropdown-group') {
          return <InteractiveDropdownList key={sec.key} items={sec.items} />;
        }

        // Tipe 3: Kelompok Poin Berurutan / Checklist Rapi
        if (sec.type === 'bullet-group') {
          return (
            <div
              key={sec.key}
              className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-2xs my-2"
            >
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1.5 pb-1 border-b border-slate-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Poin Penjelasan Penting:</span>
              </div>
              <div className="space-y-1.5 pt-1">
                {sec.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80"
                  >
                    <span className="w-5 h-5 rounded bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200/60">
                      {idx + 1}
                    </span>
                    <span
                      className="leading-relaxed font-medium flex-1"
                      dangerouslySetInnerHTML={{ __html: formatMath(it) }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Tipe 4: Kotak Kaidah / Catatan Penting
        if (sec.type === 'callout-rule') {
          return (
            <div
              key={sec.key}
              className="p-3 sm:p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs sm:text-sm text-slate-800 flex items-start space-x-2.5 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div
                className="leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: formatMath(sec.text) }}
              />
            </div>
          );
        }

        // Tipe 5: Paragraf Biasa
        return (
          <p
            key={sec.key}
            className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: formatMath(sec.text) }}
          />
        );
      })}
    </div>
  );
};

/**
 * Komponen Interaktif Visual Tangga Satuan Panjang (km sampai mm)
 * Didesain konsisten dengan UI standar aplikasi
 */
const TanggaSatuanVisual = () => {
  const [kmVal, setKmVal] = useState('4');
  const [cmVal, setCmVal] = useState('6000000');
  const [activeTab, setActiveTab] = useState('km-to-cm');

  const STAIRS = [
    { id: 'km', label: 'km', full: 'Kilometer', role: 'Satuan Jarak Sebenarnya (JS)', isSpecial: 'km' },
    { id: 'hm', label: 'hm', full: 'Hektometer', role: 'Turun 1: ×10' },
    { id: 'dam', label: 'dam', full: 'Dekameter', role: 'Turun 2: ×100' },
    { id: 'm', label: 'm', full: 'Meter', role: 'Satuan Pokok Internasional' },
    { id: 'dm', label: 'dm', full: 'Desimeter', role: 'Turun 4: ×10.000' },
    { id: 'cm', label: 'cm', full: 'Sentimeter', role: 'Satuan Skala & Peta (JP)', isSpecial: 'cm' },
    { id: 'mm', label: 'mm', full: 'Milimeter', role: 'Satuan Terkecil (×1.000.000)' },
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
    <div className="space-y-3.5 my-3 animate-fade-in">
      {/* 1. Header Banner Aturan Tangga */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start space-x-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0 font-bold">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div>
            <strong className="block font-bold text-slate-900 text-[11px] uppercase tracking-wider">
              Setiap Turun 1 Tangga:
            </strong>
            <span className="text-slate-600">
              Dikali (×) 10 • Tambah 1 angka nol (0)
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start space-x-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0 font-bold">
            <ArrowUp className="w-4 h-4" />
          </div>
          <div>
            <strong className="block font-bold text-slate-900 text-[11px] uppercase tracking-wider">
              Setiap Naik 1 Tangga:
            </strong>
            <span className="text-slate-600">
              Dibagi (÷) 10 • Coret 1 angka nol (0)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visualisasi Tangga */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Peta Tangga Satuan Panjang (km sampai mm)</span>
          </span>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            7 Tingkat
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          {STAIRS.map((stair, index) => (
            <div
              key={stair.id}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                stair.isSpecial === 'cm'
                  ? 'bg-amber-50/70 border-amber-300 font-semibold'
                  : stair.isSpecial === 'km'
                  ? 'bg-blue-50/60 border-blue-200 font-semibold'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
              style={{
                marginLeft: `${Math.min(index * 4.5, 30)}%`,
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="w-10 h-6 rounded bg-white border border-slate-200 text-xs font-mono font-bold flex items-center justify-center text-slate-800">
                  {stair.label}
                </span>
                <span className="text-xs font-bold text-slate-800">{stair.full}</span>
                {stair.isSpecial === 'cm' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                    Kunci Skala (cm)
                  </span>
                )}
                {stair.isSpecial === 'km' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">
                    Jarak Sebenarnya (km)
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block pr-2">
                {stair.role}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs text-blue-900 space-y-1 mt-2">
          <div className="flex items-center space-x-1.5 font-bold">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Trik Kilat Skala: Lompatan 5 Tangga (km ⇄ cm)</span>
          </div>
          <p className="leading-relaxed text-slate-700">
            Dari <strong>km</strong> turun 5 kali ke <strong>cm</strong> = <strong>DIKALI 100.000</strong> (tambah 5 angka nol).<br />
            Dari <strong>cm</strong> naik 5 kali ke <strong>km</strong> = <strong>DIBAGI 100.000</strong> (coret 5 angka nol).
          </p>
        </div>
      </div>

      {/* 3. Simulator Interaktif Konversi */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
          <div className="flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Latihan Simulator Konversi Skala
            </span>
          </div>

          <div className="flex space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('km-to-cm')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'km-to-cm'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              km ke cm (×100.000)
            </button>
            <button
              onClick={() => setActiveTab('cm-to-km')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cm-to-km'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              cm ke km (÷100.000)
            </button>
          </div>
        </div>

        {activeTab === 'km-to-cm' ? (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Contoh Cepat:</span>
              {presetsKm.map((p) => (
                <button
                  key={p}
                  onClick={() => setKmVal(p)}
                  className={`px-2 py-0.5 rounded text-xs font-bold border transition-all cursor-pointer ${
                    kmVal === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p} km
                </button>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Input Jarak (km):</span>
                <input
                  type="text"
                  value={kmVal}
                  onChange={(e) => setKmVal(e.target.value)}
                  className="w-28 px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold font-mono text-center text-sm border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>

              <div className="text-blue-600 font-bold text-xs flex items-center space-x-1">
                <span>➔ × 100.000</span>
              </div>

              <div className="flex-1 space-y-1 sm:text-right">
                <span className="text-[11px] font-bold text-blue-700 uppercase block">Hasil (cm):</span>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-white text-blue-900 font-bold font-mono text-sm border border-blue-300">
                  {getKmConverted()} cm
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Contoh Cepat:</span>
              {presetsCm.map((p) => (
                <button
                  key={p}
                  onClick={() => setCmVal(p)}
                  className={`px-2 py-0.5 rounded text-xs font-bold border transition-all cursor-pointer ${
                    cmVal === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p} cm
                </button>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Input Nilai (cm):</span>
                <input
                  type="text"
                  value={cmVal}
                  onChange={(e) => setCmVal(e.target.value)}
                  className="w-32 px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold font-mono text-center text-sm border border-slate-300 outline-none focus:border-blue-500"
                />
              </div>

              <div className="text-blue-600 font-bold text-xs flex items-center space-x-1">
                <span>➔ ÷ 100.000</span>
              </div>

              <div className="flex-1 space-y-1 sm:text-right">
                <span className="text-[11px] font-bold text-blue-700 uppercase block">Hasil (km):</span>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-white text-blue-900 font-bold font-mono text-sm border border-blue-300">
                  {getCmConverted()} km
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Komponen Utama Pembaca Materi Pembelajaran TKA SD
 */
const MaterialReader = ({ bab, onStartQuiz }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchBaku, setSearchBaku] = useState('');
  const [openContohDropdown, setOpenContohDropdown] = useState({});

  // Reset slide dan search setiap kali materi bab berganti
  useEffect(() => {
    setCurrentSlide(0);
    setSearchBaku('');
    setOpenContohDropdown({});
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

  const toggleContohDropdown = (key) => {
    setOpenContohDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // --- PEMBENTUKAN STRUKTUR SLIDE DENGAN DESAIN KONSISTEN ---
  const slides = [];

  // SLIDE 1: PENGENALAN & TUJUAN BELAJAR
  slides.push({
    id: 'intro',
    badge: `Materi ${bab.no} • Bagian 1`,
    title: bab.judul,
    subtitle: 'Pengenalan & Tujuan Belajar',
    icon: BookOpen,
    render: () => (
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
        {/* Header Bersih & Elegan */}
        <div className="pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Materi {bab.no} Standar Pusmendik</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {bab.judul}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            {bab.ringkasan || 'Mari kita pelajari materi ini bersama langkah demi langkah dengan penjelasan yang mudah dan menyenangkan!'}
          </p>
        </div>

        {/* Misi Pembelajaran */}
        {bab.tujuan && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Misi Pembelajaran Hari Ini:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {bab.tujuan}
              </p>
            </div>
          </div>
        )}

        {/* Petunjuk Belajar */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-600 flex items-center space-x-2.5">
          <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <p className="leading-relaxed">
            Gunakan tombol <strong>"Lanjut Slide Berikutnya"</strong> di bawah untuk membaca materi secara perlahan. Pahami setiap contoh sebelum lanjut ya!
          </p>
        </div>
      </div>
    ),
  });

  // SLIDE 2: KONSEP KUNCI / KAIDAH POKOK (DESAIN KONSISTEN)
  if (bab.konsepKunci) {
    slides.push({
      id: 'konsep_kunci',
      badge: `Materi ${bab.no} • Bagian 2`,
      title: 'Konsep Kunci yang Wajib Dipahami',
      subtitle: 'Pondasi Utama Materi',
      icon: Lightbulb,
      render: () => (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
          {/* Header Konsisten */}
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center flex-shrink-0 font-bold">
              <Lightbulb className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                Kaidah Pokok Materi
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Kunci Utama {bab.judul}
              </h4>
            </div>
          </div>

          {/* Konten dengan Parser Cerdas & Dropdown */}
          <div className="pt-1">
            <EnhancedContentRenderer content={bab.konsepKunci} />
          </div>

          {/* Catatan Mengapa Konsep Penting */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong className="text-slate-900">Mengapa konsep ini penting?</strong> Aturan baku ini adalah pondasi yang akan selalu digunakan saat mengerjakan soal-soal latihan dan ujian!
            </span>
          </div>
        </div>
      ),
    });
  }

  // SLIDE 3..N: PEMBAHASAN MENDALAM TIAP SUBMATERI
  if (bab.uraianMateri && bab.uraianMateri.length > 0) {
    bab.uraianMateri.forEach((item, idx) => {
      const contohKey = `uraian_${idx}_contoh`;
      const isContohOpen = openContohDropdown[contohKey] ?? true; // Default terbuka

      slides.push({
        id: `uraian_${idx}`,
        badge: `Materi ${bab.no} • Bagian ${idx + 3}`,
        title: item.subjudul || `Pembahasan Bagian ${idx + 1}`,
        subtitle: 'Penjelasan & Contoh Detail',
        icon: Layers,
        render: () => (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
            {/* Header Subtopik Konsisten */}
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {idx + 1}
              </span>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Subtopik {idx + 1}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {item.subjudul}
                </h4>
              </div>
            </div>

            {/* Uraian Konten dengan Dropdown & Alur Rapi */}
            {item.konten && (
              <div className="pt-1">
                <EnhancedContentRenderer content={item.konten} />
              </div>
            )}

            {/* Widget Interaktif Tangga Satuan Khusus Skala */}
            {(item.tipe === 'tangga_satuan' || item.subjudul?.toLowerCase().includes('tangga')) && (
              <TanggaSatuanVisual />
            )}

            {/* Rumus / Kaidah Pokok */}
            {item.rumus && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center space-x-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span>Rumus / Kaidah Pokok:</span>
                </span>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/90 text-blue-950 font-mono text-xs sm:text-sm font-bold shadow-2xs">
                  <span dangerouslySetInnerHTML={{ __html: formatMath(item.rumus) }} />
                </div>
              </div>
            )}

            {/* Contoh Soal dengan Tulisan Dropdown (Bisa Buka / Tutup) */}
            {item.contoh && (
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => toggleContohDropdown(contohKey)}
                  className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer gap-2"
                >
                  <div className="flex items-center space-x-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold">
                      Contoh Soal & Pembahasan Langkah demi Langkah
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 flex-shrink-0">
                    <span className="text-[11px] hidden sm:inline">
                      {isContohOpen ? 'Tutup' : 'Buka'}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${
                        isContohOpen ? 'rotate-180 bg-emerald-50 text-emerald-600' : ''
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {isContohOpen && (
                  <div className="p-3.5 pt-1 border-t border-slate-100 bg-slate-50/40 animate-fade-in">
                    <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      <span dangerouslySetInnerHTML={{ __html: formatMath(item.contoh) }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Catatan / Poin Tambahan */}
            {item.poin && Array.isArray(item.poin) && item.poin.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Catatan Penting:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.poin.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start space-x-2"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: formatMath(p) }} />
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

  // SLIDE KOSAKATA BAKU VS TIDAK BAKU (BAHASA INDONESIA)
  if (bab.daftarBaku && bab.daftarBaku.length > 0) {
    const filteredBaku = bab.daftarBaku.filter(
      (item) =>
        item.baku.toLowerCase().includes(searchBaku.toLowerCase()) ||
        item.tidakBaku.toLowerCase().includes(searchBaku.toLowerCase())
    );

    slides.push({
      id: 'daftar_baku',
      badge: 'Eksplorasi Kosakata',
      title: 'Kosakata Baku vs Tidak Baku',
      subtitle: 'Standar Kamus Besar Bahasa Indonesia (KBBI)',
      icon: FileText,
      render: () => (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
          <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Kamus Pembelajaran
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Kosakata Baku (EYD/KBBI) vs Tidak Baku
              </h4>
            </div>

            {/* Input Pencarian Kosakata */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchBaku}
                onChange={(e) => setSearchBaku(e.target.value)}
                placeholder="Cari kata di sini..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all bg-slate-50/60"
              />
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Perhatikan daftar kata berikut! Kata di sebelah kiri adalah kata <strong>Baku</strong> (sesuai kaidah KBBI), sedangkan kata di sebelah kanan adalah kata <strong>Tidak Baku</strong> yang sering keliru digunakan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredBaku.length > 0 ? (
              filteredBaku.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-bold text-emerald-950">{item.baku}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-rose-500 line-through">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{item.tidakBaku}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-6 text-xs text-slate-400">
                Tidak ada kata yang cocok dengan pencarian "{searchBaku}".
              </div>
            )}
          </div>
        </div>
      ),
    });
  }

  // SLIDE BEDAH CONTOH SOAL TKA SD DENGAN PEMBAHASAN DETAIL
  if (bab.contohSoal) {
    const isBedahOpen = openContohDropdown['bedah_soal'] ?? true;

    slides.push({
      id: 'contoh_soal',
      badge: 'Simulasi Soal Nyata',
      title: 'Bedah Contoh Soal Asesmen TKA SD',
      subtitle: 'Analisis & Cara Penyelesaian Rinci',
      icon: HelpCircle,
      render: () => (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center text-xs font-bold">
                <FileText className="w-4 h-4 text-blue-600" />
              </span>
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Model Asesmen TKA SD
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Bedah Contoh Soal & Analisis
                </h4>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              Kelas 4 - 6 SD
            </span>
          </div>

          {/* Kotak Pertanyaan */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Pertanyaan Soal:
            </span>
            <p
              className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMath(bab.contohSoal.soal) }}
            />
          </div>

          {/* Kotak Pembahasan dengan Tulisan Dropdown */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleContohDropdown('bedah_soal')}
              className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer gap-2"
            >
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold">
                  Cara Berpikir & Langkah Penyelesaian Rinci
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 flex-shrink-0">
                <span className="text-[11px] hidden sm:inline">
                  {isBedahOpen ? 'Tutup' : 'Buka'}
                </span>
                <div
                  className={`w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-200 ${
                    isBedahOpen ? 'rotate-180 bg-emerald-50 text-emerald-600' : ''
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>

            {isBedahOpen && (
              <div className="p-3.5 pt-1 border-t border-slate-100 bg-slate-50/40 animate-fade-in">
                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  <EnhancedContentRenderer content={bab.contohSoal.penjelasan} />
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    });
  }

  // SLIDE TERAKHIR: RANGKUMAN & KUIS PEMAHAMAN
  slides.push({
    id: 'summary',
    badge: 'Langkah Terakhir',
    title: 'Rangkuman & Kuis Pemahaman',
    subtitle: 'Siap Meraih 3 Bintang Emas!',
    icon: Award,
    render: () => (
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4 animate-fade-in">
        {/* Tips Juara */}
        {bab.tipsJuara && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div className="space-y-0.5">
              <strong className="text-amber-900 block font-bold text-xs uppercase tracking-wider">
                Tips Juara TKA SD:
              </strong>
              <p
                className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: formatMath(bab.tipsJuara) }}
              />
            </div>
          </div>
        )}

        {/* Checklist Pemahaman */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Checklist Pemahaman Kamu:</span>
          </h4>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200/80">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>Memahami konsep dasar dan aturan <strong>{bab.judul}</strong>.</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200/80">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>Mempelajari contoh soal dan pembahasan langkah demi langkah.</span>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-white border border-slate-200/80">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>Siap menyelesaikan kuis untuk membuka materi selanjutnya.</span>
            </div>
          </div>
        </div>

        {/* Banner CTA Kuis Pemahaman */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-yellow-300 inline-block mb-1">
              Uji 3 Bintang Emas
            </span>
            <h4 className="text-sm sm:text-base font-bold">
              Materi Selesai Dipelajari! Siap Uji Pemahaman?
            </h4>
            <p className="text-xs text-blue-100 mt-0.5 leading-relaxed">
              Jawab 3 soal kuis pemahaman materi ini untuk meraih Bintang Emas!
            </p>
          </div>

          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1.5 cursor-pointer flex-shrink-0"
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
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
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
                    ? 'w-6 h-2 bg-blue-600 shadow-2xs'
                    : idx < currentSlide
                    ? 'w-2 h-2 bg-emerald-500'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                }`}
                title={`Buka Slide ${idx + 1}: ${s.subtitle}`}
              />
            ))}
          </div>
        </div>

        {/* Bar Progres */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
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

        {/* Tombol Selanjutnya */}
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
