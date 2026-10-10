import React, { useState } from 'react';
import { X, Award, Flame, Zap, Trophy, Check, Lock, Star, Sparkles } from 'lucide-react';
import { setActiveTitle } from '../utils/activityTracker';

/**
 * Modal Profil Siswa Lengkap:
 * Menampilkan detail EXP, Progress Level, Status Streak Jam 12 Malam,
 * serta Daftar Koleksi Gelar yang bisa dipasang oleh siswa.
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl border border-blue-200/80 shadow-2xl max-w-lg w-full overflow-hidden relative my-auto animate-fade-in flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0a1e4a] via-blue-900 to-indigo-900 text-white relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-lg shadow-amber-500/20 border-2 border-white/30 flex-shrink-0">
              {activeTitle?.icon || '🦁'}
            </div>

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-bold text-amber-200 border border-white/20 mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Profil Siswa TKA SD</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white truncate">
                {user?.username || user?.email?.split('@')[0] || 'Siswa Berprestasi'}
              </h3>
              <div className="flex items-center space-x-2 mt-0.5 flex-wrap gap-y-1">
                <span className="text-xs font-semibold text-blue-200 flex items-center space-x-1">
                  <span>Gelar Aktif:</span>
                  <strong className="text-yellow-300 font-bold ml-1">
                    {activeTitle?.name}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifikasi Toast Pemasangan Gelar */}
        {successToast && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center space-x-1.5 animate-fade-in flex-shrink-0">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Body Modal (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Card 1: Level & EXP Progress */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                  Lv
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    Level {level}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Total {totalExp} EXP
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-blue-900">
                  {currentLevelExp} / {nextLevelExp} EXP
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {nextLevelExp - currentLevelExp} EXP menuju Level {level + 1}
                </span>
              </div>
            </div>

            {/* Bar Progress Level */}
            <div className="w-full bg-blue-200/60 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-blue-100">
              💡 <strong>Tips Naik Level:</strong> Dapatkan <strong>+60 EXP</strong> dari belajar materi, <strong>+80 EXP</strong> dari latihan soal, dan <strong>+150 EXP</strong> dari Tryout!
            </p>
          </div>

          {/* Card 2: Streak Belajar Harian (Reset Jam 12 Malam) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/50 border border-amber-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm ${
                    streak.activeToday
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white ring-2 ring-amber-300 animate-pulse'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  🔥
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
                    <span>Streak: {streak.count} Hari</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Konsistensi Belajar Harian
                  </span>
                </div>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center space-x-1 ${
                  streak.activeToday
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                <span>{streak.activeToday ? '✓ Menyala Hari Ini' : '⏳ Belum Aktif'}</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 text-xs text-slate-700 leading-relaxed space-y-1">
              <div className="flex items-start space-x-1.5">
                <span className="text-amber-600 font-bold">⏰</span>
                <p>
                  <strong>Aturan Reset Jam 12 Malam:</strong> Streak akan padam dan ter-reset ke 0 jika melewati pukul <strong>24:00 (12 malam)</strong> tanpa ada aktivitas belajar.
                </p>
              </div>
              {!streak.activeToday && (
                <div className="mt-1.5 text-amber-900 font-semibold bg-amber-100/70 p-2 rounded-lg text-[11px]">
                  🔥 Ayo kerjakan 1 materi, latihan soal, atau tryout hari ini sebelum jam 12 malam untuk menyalakan apimu!
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Koleksi Gelar Siswa */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Koleksi Gelar Belajar</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Gelar yang dipasang akan muncul di Navbar & Papan Peringkat (Leaderboard).
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200">
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
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isEquipped
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs ring-1 ring-amber-300'
                        : isUnlocked
                        ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                        : 'bg-slate-50 border-slate-200/80 opacity-75'
                    }`}
                  >
                    <div className="flex items-start space-x-3 min-w-0">
                      <span className="text-2xl flex-shrink-0 mt-0.5">
                        {title.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <h5 className="text-xs font-bold text-slate-900">
                            {title.name}
                          </h5>
                          {isEquipped && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-amber-950">
                              Sedang Dipasang
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {title.desc}
                        </p>
                        {!isUnlocked && (
                          <div className="flex items-center space-x-1 text-[10px] text-rose-600 font-semibold mt-1">
                            <Lock className="w-3 h-3 flex-shrink-0" />
                            <span>Syarat: {title.requirement}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tombol Aksi Gelar */}
                    <div className="flex-shrink-0 flex items-center justify-end">
                      {isEquipped ? (
                        <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                          <Check className="w-3.5 h-3.5" />
                          <span>Aktif</span>
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipTitle(title.id, title.name)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                        >
                          Pasang Gelar
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-slate-200 text-slate-500 text-[11px] font-medium flex items-center space-x-1">
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
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
