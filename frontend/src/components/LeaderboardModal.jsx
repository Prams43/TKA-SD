import React, { useState } from 'react';
import { X, Trophy, Medal, Flame, Star, Sparkles, User, Award, Shield, Search } from 'lucide-react';
import { getLeaderboardData } from '../utils/leaderboardData';

/**
 * Komponen Modal / Tampilan Papan Peringkat (Leaderboard) TKA SD
 * Menampilkan daftar top user berdasarkan Level & EXP serta gelar yang dipasang.
 */
const LeaderboardModal = ({ isOpen, onClose, user, profileStats }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'top3'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F1914]/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-lg border border-[#E6DFD5] shadow-lg max-w-2xl w-full overflow-hidden relative my-auto flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b border-[#E6DFD5] flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4] flex items-center justify-center text-xl font-bold flex-shrink-0">
              🏆
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#261C14] tracking-tight">
                Leaderboard Siswa TKA SD
              </h3>
              <p className="text-xs text-[#6E6258]">
                Peringkat murid berdasarkan Level, EXP, dan gelar aktif
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

        {/* Konten Scrollable */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Card Posisi Pengguna ("Kamu") */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F2] text-[#261C14] flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-2 border-[#C25E38]/25 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#C25E38] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-xs">
                #{myRank}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#C25E38]">
                    Posisi Kamu
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4]">
                    Peringkat #{myRank}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#261C14] truncate">
                  {myEntry.name}
                </h4>
                <div className="flex items-center space-x-1.5 text-xs mt-0.5">
                  <span className="text-[#D97E26] flex items-center space-x-1 font-medium">
                    <span>{myEntry.title?.icon}</span>
                    <span>{myEntry.title?.name}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6DFD5]">
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-white text-[#261C14] border border-[#E6DFD5] text-xs font-semibold inline-block">
                  Level {myEntry.level}
                </span>
                <span className="text-[11px] text-[#6E6258] block mt-0.5">
                  {myEntry.exp} Total EXP
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-[#FEF7EE] text-[#D97E26] border border-[#FCD9BD] text-xs font-medium flex items-center space-x-1">
                <span>🔥</span>
                <span>{myEntry.streak} Hari</span>
              </div>
            </div>
          </div>

          {/* Podium Juara */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#6E6258] mb-2.5 text-center">
              {list.length === 1 ? 'Juara Papan Peringkat' : list.length === 2 ? 'Podium 2 Teratas' : 'Podium 3 Besar Teratas'}
            </h5>

            {list.length === 1 && top3[0] ? (
              /* Tampilan 1 User */
              <div className="max-w-xs mx-auto">
                <div className="p-4 rounded-lg border border-[#E6DFD5] bg-white text-center flex flex-col items-center shadow-xs">
                  <span className="text-xs font-semibold text-[#C25E38] bg-[#FAECE6] px-2.5 py-0.5 rounded border border-[#F2D2C4] mb-2">
                    Juara #1
                  </span>
                  <div className="relative mb-2">
                    <span className="text-3xl">{top3[0].avatar}</span>
                  </div>
                  <h6 className="text-sm font-bold text-[#261C14] truncate w-full">
                    {top3[0].name}
                  </h6>
                  <div className="mt-2 px-2.5 py-0.5 rounded bg-[#F2ECE4] text-[#261C14] font-semibold text-xs border border-[#E6DFD5]">
                    Lv. {top3[0].level} ({top3[0].exp} EXP)
                  </div>
                  <span className="text-[11px] font-medium text-[#6E6258] mt-1 truncate w-full">
                    {top3[0].title?.icon} {top3[0].title?.name}
                  </span>
                </div>
              </div>
            ) : list.length === 2 && top3[0] && top3[1] ? (
              /* Tampilan 2 User */
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto items-end">
                {/* Peringkat 2 */}
                <div className="p-3 rounded-lg border border-[#E6DFD5] bg-white text-center flex flex-col items-center shadow-xs">
                  <span className="text-[10px] font-semibold text-[#6E6258] bg-[#F2ECE4] px-2 py-0.5 rounded border border-[#E6DFD5] mb-1.5">
                    Juara 2
                  </span>
                  <span className="text-2xl mb-1">{top3[1].avatar}</span>
                  <h6 className="text-xs font-bold text-[#261C14] truncate w-full">
                    {top3[1].name}
                  </h6>
                  <div className="mt-1 px-2 py-0.5 rounded bg-[#F2ECE4] text-[#261C14] font-semibold text-[11px] border border-[#E6DFD5]">
                    Lv. {top3[1].level}
                  </div>
                  <span className="text-[10px] text-[#6E6258] font-medium mt-1 truncate w-full">
                    {top3[1].title?.icon} {top3[1].title?.name}
                  </span>
                </div>

                {/* Peringkat 1 */}
                <div className="p-3.5 rounded-lg border border-[#F2D2C4] bg-[#FEF7EE] text-center flex flex-col items-center shadow-xs">
                  <span className="text-[10px] font-semibold text-[#C25E38] bg-[#FAECE6] px-2 py-0.5 rounded border border-[#F2D2C4] mb-1.5">
                    Juara 1
                  </span>
                  <span className="text-3xl mb-1">{top3[0].avatar}</span>
                  <h6 className="text-xs font-bold text-[#261C14] truncate w-full">
                    {top3[0].name}
                  </h6>
                  <div className="mt-1 px-2 py-0.5 rounded bg-[#FAECE6] text-[#C25E38] font-semibold text-[11px] border border-[#F2D2C4]">
                    Lv. {top3[0].level} ({top3[0].exp} EXP)
                  </div>
                  <span className="text-[10px] text-[#6E6258] font-medium mt-1 truncate w-full">
                    {top3[0].title?.icon} {top3[0].title?.name}
                  </span>
                </div>
              </div>
            ) : (
              /* Tampilan 3+ User */
              <div className="grid grid-cols-3 gap-2.5 items-end">
                {/* Peringkat 2 */}
                {top3[1] && (
                  <div className="p-3 rounded-lg border border-[#E6DFD5] bg-white text-center flex flex-col items-center shadow-xs order-1">
                    <span className="text-[10px] font-semibold text-[#6E6258] bg-[#F2ECE4] px-2 py-0.5 rounded border border-[#E6DFD5] mb-1.5">
                      Juara 2
                    </span>
                    <span className="text-2xl mb-1">{top3[1].avatar}</span>
                    <h6 className="text-xs font-bold text-[#261C14] truncate w-full">
                      {top3[1].name}
                    </h6>
                    <div className="mt-1 px-2 py-0.5 rounded bg-[#F2ECE4] text-[#261C14] font-semibold text-[11px] border border-[#E6DFD5]">
                      Lv. {top3[1].level}
                    </div>
                    <span className="text-[10px] text-[#6E6258] font-medium mt-1 truncate w-full">
                      {top3[1].title?.icon} {top3[1].title?.name}
                    </span>
                  </div>
                )}

                {/* Peringkat 1 */}
                {top3[0] && (
                  <div className="p-3.5 rounded-lg border border-[#F2D2C4] bg-[#FEF7EE] text-center flex flex-col items-center shadow-xs order-2">
                    <span className="text-[10px] font-semibold text-[#C25E38] bg-[#FAECE6] px-2 py-0.5 rounded border border-[#F2D2C4] mb-1.5">
                      Juara 1
                    </span>
                    <span className="text-3xl mb-1">{top3[0].avatar}</span>
                    <h6 className="text-xs sm:text-sm font-bold text-[#261C14] truncate w-full">
                      {top3[0].name}
                    </h6>
                    <div className="mt-1 px-2.5 py-0.5 rounded bg-[#FAECE6] text-[#C25E38] font-semibold text-xs border border-[#F2D2C4]">
                      Lv. {top3[0].level} ({top3[0].exp} EXP)
                    </div>
                    <span className="text-[10px] text-[#6E6258] font-medium mt-1 truncate w-full">
                      {top3[0].title?.icon} {top3[0].title?.name}
                    </span>
                  </div>
                )}

                {/* Peringkat 3 */}
                {top3[2] && (
                  <div className="p-3 rounded-lg border border-[#E6DFD5] bg-white text-center flex flex-col items-center shadow-xs order-3">
                    <span className="text-[10px] font-semibold text-[#D97E26] bg-[#FEF7EE] px-2 py-0.5 rounded border border-[#F6D8B8] mb-1.5">
                      Juara 3
                    </span>
                    <span className="text-2xl mb-1">{top3[2].avatar}</span>
                    <h6 className="text-xs font-bold text-[#261C14] truncate w-full">
                      {top3[2].name}
                    </h6>
                    <div className="mt-1 px-2 py-0.5 rounded bg-[#F2ECE4] text-[#261C14] font-semibold text-[11px] border border-[#E6DFD5]">
                      Lv. {top3[2].level}
                    </div>
                    <span className="text-[10px] text-[#6E6258] font-medium mt-1 truncate w-full">
                      {top3[2].title?.icon} {top3[2].title?.name}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Kolom Pencarian Siswa */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 text-[#8C7E72] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa atau gelar..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E6DFD5] text-xs sm:text-sm text-[#261C14] placeholder-[#8C7E72] focus:outline-none focus:border-[#C25E38] focus:ring-1 focus:ring-[#C25E38] transition-colors"
            />
          </div>

          {/* Tabel / Daftar Lengkap Leaderboard */}
          <div className="space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#6E6258]">
              Daftar Seluruh Peringkat ({filteredList.length} Siswa)
            </h5>

            <div className="divide-y divide-[#E6DFD5] rounded-lg border border-[#E6DFD5] overflow-hidden bg-white shadow-xs">
              {filteredList.map((item) => {
                const isMe = item.isCurrentUser;
                const isGold = item.rank === 1;
                const isSilver = item.rank === 2;
                const isBronze = item.rank === 3;

                return (
                  <div
                    key={item.id}
                    className={`p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-colors ${
                      isMe
                        ? 'bg-[#FAECE6]/60 border-l-4 border-l-[#C25E38]'
                        : 'hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {/* Rank & Avatar & Nama */}
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                          isGold
                            ? 'bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4]'
                            : isSilver
                            ? 'bg-[#F2ECE4] text-[#261C14] border border-[#E6DFD5]'
                            : isBronze
                            ? 'bg-[#FEF7EE] text-[#D97E26] border border-[#F6D8B8]'
                            : 'bg-[#F2ECE4] text-[#6E6258] border border-[#E6DFD5]'
                        }`}
                      >
                        {item.rank}
                      </div>

                      <span className="text-2xl flex-shrink-0">{item.avatar}</span>

                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm font-bold text-[#261C14] truncate">
                            {item.name}
                          </span>
                          {isMe && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-[#FAECE6] text-[#C25E38] border border-[#F2D2C4]">
                              Kamu
                            </span>
                          )}
                        </div>
                        {/* Gelar yang dipasang oleh user */}
                        <div className="mt-0.5 flex items-center space-x-1">
                          <span className="text-[11px] font-medium text-[#6E6258] truncate max-w-[150px] sm:max-w-none">
                            {item.title?.icon} {item.title?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Level, EXP & Streak */}
                    <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 text-right">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-[#F2ECE4] text-[#261C14] border border-[#E6DFD5] text-xs font-semibold inline-block">
                          Lv. {item.level}
                        </span>
                        <span className="text-[10px] text-[#6E6258] block mt-0.5">
                          {item.exp} EXP
                        </span>
                      </div>

                      <div className="hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded bg-[#FEF7EE] text-[#D97E26] border border-[#F6D8B8] text-xs font-medium">
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
        <div className="p-3.5 bg-[#FAF7F2] border-t border-[#E6DFD5] flex justify-end">
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

export default LeaderboardModal;
