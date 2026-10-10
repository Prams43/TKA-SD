import React, { useState } from 'react';
import { X, Award, Flame, Zap, Trophy, Check, Lock, Star, Sparkles } from 'lucide-react';
import { setActiveTitle, triggerRewardCelebration, calculateLevelInfo } from '../utils/activityTracker';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg border border-[#E6DFD5] shadow-lg max-w-lg w-full overflow-hidden relative my-auto flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b border-[#E6DFD5] flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4] flex items-center justify-center text-xl font-bold flex-shrink-0">
              {activeTitle?.icon || '🦁'}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#261C14] tracking-tight">
                {user?.username || user?.email?.split('@')[0] || 'Siswa Berprestasi'}
              </h3>
              <p className="text-xs text-[#6E6258]">
                Gelar Aktif: <span className="font-semibold text-[#261C14]">{activeTitle?.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#F2ECE4] hover:bg-[#E6DFD5] text-[#261C14] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifikasi Toast Pemasangan Gelar */}
        {successToast && (
          <div className="bg-[#286657] text-white px-4 py-2 text-xs font-medium text-center flex items-center justify-center space-x-1.5 flex-shrink-0">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Body Modal (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Card 1: Level & EXP Progress */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded bg-[#C25E38] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  Lv
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#261C14]">
                    Level {level}
                  </h4>
                  <span className="text-[11px] text-[#6E6258] font-medium">
                    Total {totalExp} EXP
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-[#261C14]">
                  {currentLevelExp} / {nextLevelExp} EXP
                </span>
                <span className="text-[10px] text-[#6E6258] block">
                  {nextLevelExp - currentLevelExp} EXP menuju Level {level + 1}
                </span>
              </div>
            </div>

            {/* Bar Progress Level */}
            <div className="w-full bg-[#E6DFD5] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C25E38] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-[#6E6258] leading-relaxed bg-white p-2.5 rounded border border-[#E6DFD5]">
              💡 <strong>Tips Naik Level:</strong> Dapatkan <strong>+60 EXP</strong> dari materi, <strong>+80 EXP</strong> dari latihan soal, dan <strong>+150 EXP</strong> dari Tryout!
            </p>

            {/* Tombol Preview Simulasi Animasi Pop-up Duolingo */}
            <button
              onClick={() => {
                onClose();
                const expBonus = 150;
                const simPrev = calculateLevelInfo(totalExp);
                const simNew = calculateLevelInfo(totalExp + expBonus);
                triggerRewardCelebration({
                  expEarned: expBonus,
                  prevExp: totalExp,
                  newExp: totalExp + expBonus,
                  prevLevelInfo: simPrev,
                  newLevelInfo: simNew,
                  leveledUp: simNew.level > simPrev.level,
                  streak: { count: streak?.count || 1 },
                  actionType: 'latihan',
                  newTitlesUnlocked: [{ name: 'Pakar Hitung Cepat', icon: '🔢' }],
                });
              }}
              className="w-full text-center py-2 px-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-900 text-[11px] font-bold border border-amber-200 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Pratinjau Notifikasi Perolehan EXP / Naik Level 🌟</span>
            </button>
          </div>

          {/* Card 2: Streak Belajar Harian */}
          <div className="p-3.5 sm:p-4 rounded-lg bg-[#FAF7F2] border border-[#E6DFD5] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-base border ${
                    streak.activeToday
                      ? 'bg-[#FAECE6] text-[#C25E38] border-[#F2D2C4]'
                      : 'bg-[#F2ECE4] text-[#8C7E72] border-[#E6DFD5]'
                  }`}
                >
                  🔥
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#261C14]">
                    Streak: {streak.count} Hari
                  </h4>
                  <span className="text-[11px] text-[#6E6258] font-medium">
                    Konsistensi Belajar Harian
                  </span>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  streak.activeToday
                    ? 'bg-[#E8F2EF] text-[#286657] border-[#BCD9D0]'
                    : 'bg-[#FEF7EE] text-[#D97E26] border-[#F6D8B8]'
                }`}
              >
                {streak.activeToday ? '✓ Menyala Hari Ini' : 'Belum Aktif'}
              </span>
            </div>

            <div className="p-2.5 rounded bg-white border border-[#E6DFD5] text-xs text-[#6E6258] leading-relaxed space-y-1">
              <p>
                <strong>Aturan Reset Jam 12 Malam:</strong> Streak akan reset ke 0 jika melewati pukul <strong>24:00 (12 malam)</strong> tanpa aktivitas belajar.
              </p>
              {!streak.activeToday && (
                <div className="mt-1 text-[#D97E26] font-medium bg-[#FEF7EE] p-1.5 rounded text-[11px] border border-[#F6D8B8]">
                  Kerjakan 1 materi, latihan soal, atau tryout hari ini sebelum jam 12 malam untuk menyalakan streak!
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Koleksi Gelar Siswa */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#261C14] flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-[#C25E38]" />
                  <span>Koleksi Gelar Belajar</span>
                </h4>
                <p className="text-[11px] text-[#6E6258]">
                  Gelar yang dipasang akan muncul di Navbar & Leaderboard.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#261C14] px-2 py-0.5 rounded bg-[#F2ECE4] border border-[#E6DFD5]">
                {allTitles.filter((t) => t.unlocked).length} / {allTitles.length} Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {allTitles.map((title) => {
                const isEquipped = title.isActive;
                const isUnlocked = title.unlocked;

                return (
                  <div
                    key={title.id}
                    className={`p-3 rounded-lg border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                      isEquipped
                        ? 'bg-[#FEF7EE] border-[#F2D2C4]'
                        : isUnlocked
                        ? 'bg-white border-[#E6DFD5] hover:border-[#C25E38]/50'
                        : 'bg-[#FAF7F2] border-[#E6DFD5] opacity-75'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5 min-w-0">
                      <span className="text-xl flex-shrink-0 mt-0.5">
                        {title.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <h5 className="text-xs font-bold text-[#261C14]">
                            {title.name}
                          </h5>
                          {isEquipped && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4]">
                              Sedang Dipasang
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6E6258] mt-0.5">
                          {title.desc}
                        </p>
                        {!isUnlocked && (
                          <div className="flex items-center space-x-1 text-[10px] text-[#C93B3B] font-medium mt-1">
                            <Lock className="w-3 h-3 flex-shrink-0" />
                            <span>Syarat: {title.requirement}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tombol Aksi Gelar */}
                    <div className="flex-shrink-0 flex items-center justify-end">
                      {isEquipped ? (
                        <span className="inline-flex items-center space-x-1 text-xs font-medium text-[#286657] bg-[#E8F2EF] px-2.5 py-1 rounded border border-[#BCD9D0]">
                          <Check className="w-3.5 h-3.5" />
                          <span>Aktif</span>
                        </span>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleEquipTitle(title.id, title.name)}
                          className="px-2.5 py-1 rounded-lg bg-[#C25E38] hover:bg-[#A94D2B] text-white font-medium text-xs transition-colors cursor-pointer"
                        >
                          Pasang Gelar
                        </button>
                      ) : (
                        <span className="px-2 py-1 rounded bg-[#F2ECE4] text-[#8C7E72] text-[11px] font-medium flex items-center space-x-1">
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
        <div className="p-3.5 bg-[#FAF7F2] border-t border-[#E6DFD5] flex-shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#261C14] hover:bg-[#3D2E22] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
