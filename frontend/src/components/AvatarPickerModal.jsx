import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, Sparkles, Search, Lock, Gift, Award, Info } from 'lucide-react';
import {
  CHARACTER_AVATARS,
  getCharacterAvatar,
  DEFAULT_AVATAR_ID,
  STARTER_AVATAR_IDS,
} from '../utils/characterAvatars';
import { getUserProfileStats, getTitleBadgeClass } from '../utils/activityTracker';

/**
 * Modal Pemilihan Foto Profil Karakter (.gif)
 * Menampilkan koleksi 23 karakter interaktif dengan kategori filter, pencarian,
 * sistem penguncian berbasis pencapaian belajar & Paket Hadiah,
 * serta kategori Fantasi (Gacha Tryout min. 80%).
 */
const AvatarPickerModal = ({
  isOpen,
  onClose,
  currentAvatarId,
  unlockedAvatars: propUnlockedAvatars,
  activeTitle,
  onSelectAvatar,
}) => {
  const [selectedId, setSelectedId] = useState(currentAvatarId || DEFAULT_AVATAR_ID);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Sinkronkan selectedId saat modal dibuka atau avatar aktif berubah
  useEffect(() => {
    if (isOpen) {
      setSelectedId(currentAvatarId || DEFAULT_AVATAR_ID);
    }
  }, [isOpen, currentAvatarId]);

  if (!isOpen) return null;

  // Dapatkan daftar avatar yang sudah terbuka
  const stats = typeof window !== 'undefined' ? getUserProfileStats() : null;
  const unlockedAvatars =
    propUnlockedAvatars || stats?.unlockedAvatars || STARTER_AVATAR_IDS;

  const categories = ['Semua', 'Siswa', 'Pahlawan', 'Kerajaan', 'Hewan', 'Fantasi'];

  const filteredCharacters = CHARACTER_AVATARS.filter((char) => {
    const matchesCategory =
      selectedCategory === 'Semua' || char.category === selectedCategory;
    const matchesSearch = char.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const activePreview = getCharacterAvatar(selectedId);
  const isSelectedUnlocked = unlockedAvatars.includes(selectedId);
  const unlockedCount = CHARACTER_AVATARS.filter((c) =>
    unlockedAvatars.includes(c.id)
  ).length;

  const handleSave = () => {
    if (!isSelectedUnlocked) return;
    if (onSelectAvatar) {
      onSelectAvatar(selectedId);
    }
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-[#162E5B] text-white rounded-2xl border-2 border-blue-500 shadow-2xl max-w-xl w-full overflow-hidden relative my-auto flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b-2 border-blue-900/60 flex items-center justify-between bg-[#162E5B] flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400 text-blue-300 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                Pilih Foto Profil Karakter
              </h3>
              <p className="text-xs text-blue-200">
                Pilih karakter animasi unik untuk mempercantik profilmu!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#0F2042] hover:bg-[#1E3A8A] text-slate-300 hover:text-white border-2 border-blue-500/40 flex items-center justify-center transition-all cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Pratinjau Karakter Terpilih */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0F2042] border-b border-blue-900/60 flex flex-col gap-2.5 flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3.5 min-w-0">
              {/* Wadah Foto Profil & Badge Gelar di Luar Container */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 flex items-center justify-center overflow-hidden shadow-md relative ${isSelectedUnlocked
                      ? 'border-blue-400'
                      : 'border-amber-400/80 ring-2 ring-amber-400/20'
                    }`}
                >
                  <img
                    src={activePreview.image}
                    alt={activePreview.name}
                    className={`w-full h-full object-cover ${!isSelectedUnlocked ? 'filter contrast-105' : ''
                      }`}
                  />
                  {!isSelectedUnlocked && (
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#162E5B]/90 border border-amber-400 text-amber-300 flex items-center justify-center shadow">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Icon Gelar Aktif di Kiri Atas (posisi & kemiringan disesuaikan per icon) */}
                {activeTitle?.icon && (
                  <span
                    className={`absolute text-xl sm:text-2xl filter drop-shadow-md select-none pointer-events-none z-20 leading-none inline-block transform ${getTitleBadgeClass(activeTitle)}`}
                    title={`Gelar: ${activeTitle.name}`}
                  >
                    {activeTitle.icon}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                    Pratinjau Pilihan
                  </span>
                  {isSelectedUnlocked ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.2 rounded-full">
                      <Check className="w-2.5 h-2.5 stroke-[3]" /> Terbuka
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/50 px-2 py-0.2 rounded-full">
                      <Lock className="w-2.5 h-2.5" /> Terkunci
                    </span>
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white truncate">
                  {activePreview.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-200 border border-blue-500/30">
                    Kategori: {activePreview.category}
                  </span>
                  {activePreview.isGachaFantasy && (
                    <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/50 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>Gacha</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Syarat Pembukaan jika Terkunci */}
          {!isSelectedUnlocked && (
            <div
              className={`p-2.5 rounded-xl border text-xs space-y-1 ${activePreview.isGachaFantasy
                  ? 'bg-gradient-to-r from-purple-950/70 via-indigo-950/60 to-amber-950/70 border-amber-400/50 text-amber-100'
                  : 'bg-[#162E5B] border-blue-900/80 text-blue-200'
                }`}
            >
              <div className="flex items-start gap-1.5">
                {activePreview.isGachaFantasy ? (
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5 animate-pulse" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-[11px] leading-tight space-y-0.5">
                  <p className="font-bold text-white flex items-center gap-1">
                    <span>
                      {activePreview.isGachaFantasy
                        ? 'Hadiah Gacha Tryout (Min. 80% Benar):'
                        : 'Syarat Membuka Karakter:'}
                    </span>
                  </p>
                  <p className="text-slate-200">
                    {activePreview.isGachaFantasy
                      ? 'Kerjakan paket Tryout dengan nilai minimal 80% benar untuk memicu Gacha Fantasi acak dan membuka karakter ini!'
                      : activePreview.requirement}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter & Bar Pencarian */}
        <div className="p-3 sm:px-5 sm:py-3 border-b border-blue-900/40 bg-[#162E5B] flex-shrink-0 space-y-2">
          {/* Kolom Pencarian Cepat */}
          <div className="relative">
            <Search className="w-4 h-4 text-blue-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari karakter"
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0F2042] border border-blue-500/40 text-xs text-white placeholder-blue-300/60 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills Kategori */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              const isFantasy = cat === 'Fantasi';

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${active
                      ? isFantasy
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold shadow-md'
                        : 'bg-blue-600 text-white shadow-xs'
                      : isFantasy
                        ? 'bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 border border-amber-500/40'
                        : 'bg-[#0F2042] text-blue-200 hover:bg-[#1E3A8A] hover:text-white border border-blue-900/60'
                    }`}
                >
                  {isFantasy && <Sparkles className="w-3 h-3 text-amber-300" />}
                  <span>{isFantasy ? 'Fantasi (Gacha)' : cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Karakter (Scrollable) */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 bg-[#162E5B] min-h-[220px]">
          {filteredCharacters.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-3xl">🔍</p>
              <p className="text-sm font-semibold text-white">Tidak ada karakter yang cocok</p>
              <p className="text-xs text-blue-300">Coba kata kunci lain atau pilih kategori Semua.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
              {filteredCharacters.map((char) => {
                const isSelected = selectedId === char.id;
                const isCurrentActive = currentAvatarId === char.id;
                const isUnlocked = unlockedAvatars.includes(char.id);

                return (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => setSelectedId(char.id)}
                    className={`group relative rounded-xl overflow-hidden flex flex-col text-center transition-all duration-200 cursor-pointer border-2 ${isSelected
                        ? isUnlocked
                          ? 'bg-[#1E3A8A] border-blue-400 shadow-md ring-2 ring-blue-400/40 scale-102'
                          : 'bg-[#1A2644] border-amber-400 shadow-md ring-2 ring-amber-400/40 scale-102'
                        : isUnlocked
                          ? 'bg-[#0F2042] border-blue-900/60 hover:border-blue-400 hover:bg-[#152A50] hover:scale-101'
                          : 'bg-[#0F2042]/70 border-slate-800/80 opacity-75 hover:opacity-100 hover:border-amber-500/50'
                      }`}
                  >
                    {/* Wadah Gambar Square yang Menutup Penuh Tanpa Rongga Kosong */}
                    <div className="w-full aspect-square bg-white relative overflow-hidden flex items-center justify-center">
                      <img
                        src={char.image}
                        alt={char.name}
                        className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${!isUnlocked ? 'filter contrast-95 opacity-80' : ''
                          }`}
                        loading="lazy"
                      />

                      {/* Gembok Translucent Overlay jika Terkunci */}
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#162E5B]/90 border border-amber-400/80 text-amber-300 flex items-center justify-center shadow-md">
                            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </div>
                        </div>
                      )}

                      {/* Badge Aktif Saat Ini */}
                      {isCurrentActive && (
                        <span className="absolute top-1.5 left-1.5 bg-amber-500 text-slate-900 text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs z-10">
                          Aktif
                        </span>
                      )}

                      {/* Centang Terpilih (jika sudah terbuka) */}
                      {isSelected && isUnlocked && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs z-10">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}

                      {/* Tag Gacha Spesial di Pojok Kanan Bawah (Hanya untuk kategori Fantasi) */}
                      {char.isGachaFantasy && (
                        <span className="absolute bottom-1 right-1 text-[7px] sm:text-[8px] font-black px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shadow-xs z-10 flex items-center gap-0.5">
                          ✨ Gacha
                        </span>
                      )}
                    </div>

                    {/* Nama & Kategori Karakter */}
                    <div className="p-2 w-full">
                      <span className="text-[11px] font-bold text-white block truncate leading-tight">
                        {char.name}
                      </span>
                      <span
                        className={`text-[9px] block truncate mt-0.5 ${!isUnlocked ? 'text-amber-400 font-medium' : 'text-blue-300'
                          }`}
                      >
                        {!isUnlocked ? '🔒 Terkunci' : char.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="p-3 sm:p-4 bg-[#162E5B] border-t-2 border-blue-900/60 flex items-center justify-between flex-shrink-0 gap-2">
          <div className="text-xs text-blue-200">
            Koleksi:{' '}
            <strong className="text-white">
              {unlockedCount} / {CHARACTER_AVATARS.length}
            </strong>{' '}
            Karakter Terbuka
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-[#0F2042] hover:bg-[#1E3A8A] text-slate-300 hover:text-white text-xs font-semibold border border-blue-500/40 transition-all cursor-pointer"
            >
              Batal
            </button>
            {isSelectedUnlocked ? (
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Simpan Pilihan
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-not-allowed opacity-90"
                title="Karakter ini belum kamu dapatkan"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Karakter Terkunci</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default AvatarPickerModal;
