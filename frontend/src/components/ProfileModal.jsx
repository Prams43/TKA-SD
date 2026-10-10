import React, { useState } from 'react';
import { X, Award, Flame, Zap, Trophy, Check, Lock, Star, Sparkles } from 'lucide-react';
import { setActiveTitle } from '../utils/activityTracker';

/**
 * Modal Profil Siswa Lengkap:
 * Menampilkan detail EXP, Progress Level, Status Streak Jam 12 Malam,
 * serta Daftar Koleksi Gelar yang bisa dipasang oleh siswa.
 * Desain dominan warna Navy elegan dengan kontras tinggi dan transisi halus.
 */
const ProfileModal = ({ isOpen, onClose, user, profileStats, onProfileUpdated }) => {
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen || !profileStats) return null;

  const {
    level,
    totalExp,
    currentLevelExp,
    nextLevelExp,
    progressPercent,
    streak,
    activeTitle,
    allTitles,
  } = profileStats;

  const handleEquipTitle = (titleId, titleName) => {
    const success = setActiveTitle(titleId);
    if (success) {
      setSuccessToast(`Gelar "${titleName}" berhasil dipasang!`);
      if (onProfileUpdated) onProfileUpdated();
      setTimeout(() => setSuccessToast(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-[#0B1A34] text-white rounded-2xl border-2 border-blue-500 shadow-2xl max-w-lg w-full overflow-hidden relative my-auto flex flex-col max-h-[90vh]">
        {/* Header Modal - Dominan Navy Solid */}
        <div className="p-4 sm:p-5 border-b-2 border-blue-900/60 flex items-center justify-between bg-[#0B1A34] flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-[#1E3A8A] text-white border-2 border-blue-400 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-sm">
              {activeTitle?.icon || '🦁'}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {user?.username || user?.email?.split('@')[0] || 'Siswa Berprestasi'}
              </h3>
              <p className="text-xs text-blue-200">
                Gelar Aktif: <span className="font-semibold text-white">{activeTitle?.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#071325] hover:bg-[#1E3A8A] text-slate-300 hover:text-white border-2 border-blue-500/40 flex items-center justify-center transition-all cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifikasi Toast Pemasangan Gelar */}
        {successToast && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center space-x-1.5 flex-shrink-0 animate-fade-in shadow-sm">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Body Modal (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-[#0B1A34]">
          {/* Card 1: Level & EXP Progress */}
          <div className="p-4 rounded-xl bg-[#071325] border-2 border-blue-500/40 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  Lv
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Level {level}
                  </h4>
                  <span className="text-[11px] text-blue-200 font-medium">
                    Total {totalExp} EXP
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-white">
                  {currentLevelExp} / {nextLevelExp} EXP
                </span>
                <span className="text-[10px] text-blue-300 block">
                  {nextLevelExp - currentLevelExp} EXP menuju Level {level + 1}
                </span>
              </div>
            </div>

            {/* Bar Progress Level */}
            <div className="w-full bg-[#0B1A34] h-2.5 rounded-full overflow-hidden border border-blue-500/40">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-blue-100 leading-relaxed bg-[#0B1A34] p-3 rounded-lg border-2 border-blue-900/60">
              💡 <strong>Tips Naik Level:</strong> Selesaikan materi, latihan soal, dan tryout untuk mengumpulkan EXP dan menaikkan levelmu!
            </p>
          </div>

          {/* Card 2: Streak Belajar Harian */}
          <div className="p-4 rounded-xl bg-[#071325] border-2 border-blue-500/40 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border-2 transition-all ${
                    streak.activeToday
                      ? 'bg-[#0B1A34] text-amber-400 border-amber-500'
                      : 'bg-[#0B1A34] text-slate-400 border-slate-700'
                  }`}
                >
                  🔥
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Streak: {streak.count} Hari
                  </h4>
                  <span className="text-[11px] text-blue-200 font-medium">
                    Konsistensi Belajar Harian
                  </span>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold border-2 transition-all ${
                  streak.activeToday
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                    : 'bg-amber-600 text-white border-amber-400 shadow-xs'
                }`}
              >
                {streak.activeToday ? '✓ Menyala Hari Ini' : 'Belum Aktif'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0B1A34] border-2 border-blue-900/60 text-xs text-blue-100 leading-relaxed space-y-1.5">
              <p>
                <strong>Aturan Reset Jam 12 Malam:</strong> Streak akan reset ke 0 jika melewati pukul <strong>24:00 (12 malam)</strong> tanpa aktivitas belajar.
              </p>
              {!streak.activeToday && (
                <div className="mt-1 text-amber-300 font-medium bg-[#071325] p-2 rounded-md text-[11px] border-2 border-amber-500">
                  Kerjakan 1 materi, latihan soal, atau tryout hari ini sebelum jam 12 malam untuk menyalakan streak!
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Koleksi Gelar Siswa */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Koleksi Gelar Belajar</span>
                </h4>
                <p className="text-[11px] text-blue-200">
                  Gelar yang dipasang akan muncul di Navbar & Leaderboard.
                </p>
              </div>
              <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full bg-[#071325] border-2 border-blue-500/40">
                {allTitles.filter((t) => t.unlocked).length} / {allTitles.length} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {allTitles.map((title) => {
                const isEquipped = title.isActive;
                const isUnlocked = title.unlocked;

                return (
                  <div
                    key={title.id}
                    className={`p-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isEquipped
                        ? 'bg-[#1E3A8A] border-blue-400 text-white shadow-sm'
                        : isUnlocked
                        ? 'bg-[#071325] border-blue-500/40 text-white hover:border-blue-400'
                        : 'bg-[#071325] border-slate-700 text-slate-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3 min-w-0">
                      <span className="text-2xl flex-shrink-0 mt-0.5">
                        {title.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h5 className="text-xs font-bold text-white">
                            {title.name}
                          </h5>
                          {isEquipped && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-600 text-white border border-blue-400 shadow-2xs">
                              Sedang Dipasang
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-blue-200 mt-0.5 leading-relaxed">
                          {title.desc}
                        </p>
                        {!isUnlocked && (
                          <div className="flex items-center space-x-1 text-[10px] text-rose-300 font-medium mt-1">
                            <Lock className="w-3 h-3 flex-shrink-0" />
                            <span>Syarat: {title.requirement}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tombol Aksi Gelar */}
                    <div className="flex-shrink-0 flex items-center justify-end">
                      {isEquipped ? (
                        <span className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-500 shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Aktif</span>
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipTitle(title.id, title.name)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                        >
                          Pasang Gelar
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-[#0B1A34] text-slate-400 text-[11px] font-medium flex items-center space-x-1 border border-slate-700">
                          <Lock className="w-3 h-3" />
                          <span>Terkunci</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-[#0B1A34] border-t-2 border-blue-900/60 flex-shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-600 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
