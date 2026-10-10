import React, { useState, useEffect } from 'react';
import { X, Trophy, Medal, Flame, Star, Sparkles, User, Award, Shield, Search } from 'lucide-react';
import { getLeaderboardData, syncLeaderboardFromDatabase } from '../utils/leaderboardData';

/**
 * Komponen Modal / Tampilan Papan Peringkat (Leaderboard) TKA SD
 * Menampilkan daftar top user berdasarkan Level & EXP serta gelar yang dipasang.
 */
const LeaderboardModal = ({ isOpen, onClose, user, profileStats }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'top3'
  const [, setRefreshTick] = useState(0);

  useEffect(() => {
    if (isOpen) {
      syncLeaderboardFromDatabase().then((res) => {
        if (res) setRefreshTick((t) => t + 1);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const { list, myRank, myEntry } = getLeaderboardData(user, profileStats);

  // Filter pencarian
  const filteredList = list.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.title?.name.toLowerCase().includes(q)
    );
  });

  const top3 = list.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-2xl max-w-2xl w-full overflow-hidden relative my-auto animate-fade-in flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-xs flex items-center justify-center text-2xl shadow-md border border-white/40">
              🏆
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-black/15 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-yellow-200" />
                <span>Papan Peringkat Nasional</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                Leaderboard Siswa TKA SD
              </h3>
              <p className="text-xs text-slate-900/80 font-medium">
                Peringkat murid teratas berdasarkan Level & EXP beserta gelar kehormatan yang dipasang!
              </p>
            </div>
          </div>
        </div>

        {/* Konten Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Card Posisi Pengguna ("Kamu") */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0a1e4a] text-white shadow-md border border-blue-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-xl font-black shadow-md border-2 border-white/30 flex-shrink-0">
                #{myRank}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                    Posisi Kamu
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-slate-950">
                    Peringkat #{myRank}
                  </span>
                </div>
                <h4 className="text-base font-black text-white truncate">
                  {myEntry.name}
                </h4>
                <div className="flex items-center space-x-2 text-xs mt-0.5">
                  <span className="font-bold text-yellow-300 flex items-center space-x-1">
                    <span>{myEntry.title?.icon}</span>
                    <span>{myEntry.title?.name}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-blue-800/80">
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 text-yellow-300 border border-yellow-400/30 text-xs font-black inline-block">
                  Level {myEntry.level}
                </span>
                <span className="text-[11px] text-blue-200 block mt-0.5">
                  {myEntry.exp} Total EXP
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-400/30 text-xs font-bold flex items-center space-x-1">
                <span>🔥</span>
                <span>{myEntry.streak} Hari</span>
              </div>
            </div>
          </div>

          {/* Podium Juara */}
          <div className="pt-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
              {list.length === 1 ? 'Juara Papan Peringkat' : list.length === 2 ? 'Podium 2 Teratas' : 'Podium 3 Besar Teratas'}
            </h5>

            {list.length === 1 && top3[0] ? (
              /* Tampilan 1 User (Awal: Hanya User Pengguna / yuken) */
              <div className="max-w-xs mx-auto">
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-t from-amber-100/90 via-amber-50 to-white border-2 border-amber-300 text-center flex flex-col items-center shadow-md ring-2 ring-amber-300/50">
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center space-x-1 mb-1">
                    <span>👑 Juara #1 Papan Peringkat</span>
                  </span>
                  <div className="relative mb-2">
                    <span className="text-4xl">{top3[0].avatar}</span>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center border-2 border-white shadow-xs">
                      🥇
                    </span>
                  </div>
                  <h6 className="text-sm font-black text-slate-900 truncate w-full">
                    {top3[0].name}
                  </h6>
                  <div className="mt-2 px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs shadow-2xs">
                    Lv. {top3[0].level} ({top3[0].exp} EXP)
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 mt-1 truncate w-full bg-amber-200/60 px-2 py-0.5 rounded-md">
                    {top3[0].title?.icon} {top3[0].title?.name}
                  </span>
                </div>
              </div>
            ) : list.length === 2 && top3[0] && top3[1] ? (
              /* Tampilan 2 User */
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto items-end pt-2">
                {/* Peringkat 2 */}
                <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-t from-slate-100 to-slate-50 border border-slate-200 text-center flex flex-col items-center shadow-xs">
                  <div className="relative mb-2">
                    <span className="text-3xl">{top3[1].avatar}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center border border-white shadow-xs">
                      🥈
                    </span>
                  </div>
                  <h6 className="text-xs font-black text-slate-800 truncate w-full">
                    {top3[1].name}
                  </h6>
                  <div className="mt-2 px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-[11px]">
                    Lv. {top3[1].level}
                  </div>
                  <span className="text-[10px] text-indigo-700 font-semibold mt-1 truncate w-full">
                    {top3[1].title?.icon} {top3[1].title?.name}
                  </span>
                </div>

                {/* Peringkat 1 */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-t from-amber-100/90 via-amber-50 to-white border-2 border-amber-300 text-center flex flex-col items-center shadow-md ring-2 ring-amber-300/50 -mt-3">
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider mb-0.5">
                    👑 Juara 1
                  </span>
                  <div className="relative mb-2">
                    <span className="text-3xl sm:text-4xl">{top3[0].avatar}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center border-2 border-white shadow-xs">
                      🥇
                    </span>
                  </div>
                  <h6 className="text-xs font-black text-slate-900 truncate w-full">
                    {top3[0].name}
                  </h6>
                  <div className="mt-2 px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[11px]">
                    Lv. {top3[0].level}
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 mt-1 truncate w-full">
                    {top3[0].title?.icon} {top3[0].title?.name}
                  </span>
                </div>
              </div>
            ) : (
              /* Tampilan 3+ User (Podium Standar) */
              <div className="grid grid-cols-3 gap-2 sm:gap-3 items-end pt-4">
                {/* Peringkat 2 (Perak) */}
                {top3[1] && (
                  <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-t from-slate-100 to-slate-50 border border-slate-200 text-center flex flex-col items-center shadow-xs order-1">
                    <div className="relative mb-2">
                      <span className="text-3xl">{top3[1].avatar}</span>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center border border-white shadow-xs">
                        🥈
                      </span>
                    </div>
                    <h6 className="text-xs font-black text-slate-800 truncate w-full">
                      {top3[1].name}
                    </h6>
                    <div className="mt-2 px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-[11px]">
                      Lv. {top3[1].level}
                    </div>
                    <span className="text-[10px] text-indigo-700 font-semibold mt-1 truncate w-full">
                      {top3[1].title?.icon} {top3[1].title?.name}
                    </span>
                  </div>
                )}

                {/* Peringkat 1 (Emas - Tertinggi & Menonjol) */}
                {top3[0] && (
                  <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-t from-amber-100/90 via-amber-50 to-white border-2 border-amber-300 text-center flex flex-col items-center shadow-md order-2 -mt-4 ring-2 ring-amber-300/50">
                    <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center space-x-1 mb-1">
                      <span>👑 Juara 1</span>
                    </span>
                    <div className="relative mb-2">
                      <span className="text-4xl">{top3[0].avatar}</span>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center border-2 border-white shadow-xs">
                        🥇
                      </span>
                    </div>
                    <h6 className="text-xs sm:text-sm font-black text-slate-900 truncate w-full">
                      {top3[0].name}
                    </h6>
                    <div className="mt-2 px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs shadow-2xs">
                      Lv. {top3[0].level} ({top3[0].exp} EXP)
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 mt-1 truncate w-full bg-amber-200/60 px-2 py-0.5 rounded-md">
                      {top3[0].title?.icon} {top3[0].title?.name}
                    </span>
                  </div>
                )}

                {/* Peringkat 3 (Perunggu) */}
                {top3[2] && (
                  <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-t from-orange-100/60 to-orange-50/30 border border-orange-200 text-center flex flex-col items-center shadow-xs order-3">
                    <div className="relative mb-2">
                      <span className="text-3xl">{top3[2].avatar}</span>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-300 text-orange-950 font-black text-xs flex items-center justify-center border border-white shadow-xs">
                        🥉
                      </span>
                    </div>
                    <h6 className="text-xs font-black text-slate-800 truncate w-full">
                      {top3[2].name}
                    </h6>
                    <div className="mt-2 px-2 py-0.5 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-[11px]">
                      Lv. {top3[2].level}
                    </div>
                    <span className="text-[10px] text-orange-800 font-semibold mt-1 truncate w-full">
                      {top3[2].title?.icon} {top3[2].title?.name}
                    </span>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Kolom Pencarian Siswa */}
          <div className="relative pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa atau gelar..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Tabel / Daftar Lengkap Leaderboard */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Daftar Seluruh Peringkat ({filteredList.length} Siswa)
            </h5>

            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
              {filteredList.map((item) => {
                const isMe = item.isCurrentUser;
                const isGold = item.rank === 1;
                const isSilver = item.rank === 2;
                const isBronze = item.rank === 3;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                      isMe
                        ? 'bg-amber-50/80 border-l-4 border-l-amber-500 ring-1 ring-amber-300'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Rank & Avatar & Nama */}
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                          isGold
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : isSilver
                            ? 'bg-slate-300 text-slate-800'
                            : isBronze
                            ? 'bg-orange-300 text-orange-950'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.rank}
                      </div>

                      <span className="text-2xl flex-shrink-0">{item.avatar}</span>

                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                            {item.name}
                          </span>
                          {isMe && (
                            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-amber-400 text-slate-950">
                              Kamu
                            </span>
                          )}
                        </div>
                        {/* Gelar yang dipasang oleh user */}
                        <div className="mt-1 flex items-center space-x-1">
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              item.title?.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{item.title?.icon}</span>
                            <span className="truncate max-w-[120px] sm:max-w-none">
                              {item.title?.name}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Level, EXP & Streak */}
                    <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 text-right">
                      <div>
                        <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 text-xs font-black inline-block">
                          Lv. {item.level}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {item.exp} EXP
                        </span>
                      </div>

                      <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                        <span>🔥</span>
                        <span>{item.streak}h</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
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

export default LeaderboardModal;
