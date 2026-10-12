import alienGif from '../assets/character/alien.gif';
import babyBoyGif from '../assets/character/baby-boy.gif';
import babyDragonGif from '../assets/character/baby-dragon.gif';
import babyGirlGif from '../assets/character/baby-girl.gif';
import boyGif from '../assets/character/boy.gif';
import childBoyGif from '../assets/character/child-boy.gif';
import childGirlGif from '../assets/character/child-girl.gif';
import cowGif from '../assets/character/cow.gif';
import cowboyGif from '../assets/character/cowboy.gif';
import dragonGif from '../assets/character/dragon.gif';
import foxGif from '../assets/character/fox.gif';
import frogGif from '../assets/character/frog.gif';
import girlGif from '../assets/character/girl.gif';
import kingGif from '../assets/character/king.gif';
import knightGif from '../assets/character/knight.gif';
import mermaidGif from '../assets/character/mermaid.gif';
import ninjaGif from '../assets/character/ninja.gif';
import pandaGif from '../assets/character/panda.gif';
import queenGif from '../assets/character/queen.gif';
import redWolfGif from '../assets/character/red-wolf.gif';
import sheepGif from '../assets/character/sheep.gif';
import teddyBearHeartGif from '../assets/character/teddy-bear-heart.gif';
import unicornGif from '../assets/character/unicorn.gif';

/**
 * Registri Karakter Avatar TKA SD
 * Dilengkapi informasi paket hadiah materi/latihan dan kategori Fantasi (Gacha Tryout min. 80%)
 */
export const CHARACTER_AVATARS = [
  // 1. STARTER: Terbuka otomatis sejak awal (Hanya 2 karakter ini)
  {
    id: 'baby-boy',
    name: 'Adik Pintar',
    category: 'Siswa',
    image: babyBoyGif,
    isStarter: true,
    rewardSource: 'Starter Siswa',
    requirement: 'Terbuka otomatis untuk seluruh siswa (Default)',
  },
  {
    id: 'baby-girl',
    name: 'Adik Manis',
    category: 'Siswa',
    image: babyGirlGif,
    isStarter: true,
    rewardSource: 'Starter Siswa',
    requirement: 'Terbuka otomatis untuk seluruh siswa',
  },

  // 2. PAKET HADIAH 1: Siswa dan Siswi (Peti Materi 5 Bahasa Indonesia)
  {
    id: 'boy',
    name: 'Siswa Hebat',
    category: 'Siswa',
    image: boyGif,
    bundleId: 'bundle_siswa_siswi',
    bundleName: 'Paket Siswa & Siswi',
    rewardSource: 'Peti Materi 5 B. Indo',
    requirement: 'Buka Peti Materi 5 Bahasa Indonesia (Paket Siswa & Siswi)',
  },
  {
    id: 'girl',
    name: 'Siswi Bintang',
    category: 'Siswa',
    image: girlGif,
    bundleId: 'bundle_siswa_siswi',
    bundleName: 'Paket Siswa & Siswi',
    rewardSource: 'Peti Materi 5 B. Indo',
    requirement: 'Buka Peti Materi 5 Bahasa Indonesia (Paket Siswa & Siswi)',
  },

  // 3. PAKET HADIAH 2: Anak Petualang dan Anak Ceria (Peti Materi 4 Matematika)
  {
    id: 'child-boy',
    name: 'Anak Petualang',
    category: 'Siswa',
    image: childBoyGif,
    bundleId: 'bundle_petualang_ceria',
    bundleName: 'Paket Anak Petualang & Ceria',
    rewardSource: 'Peti Materi 4 Matematika',
    requirement: 'Buka Peti Materi 4 Matematika (Paket Anak Petualang & Ceria)',
  },
  {
    id: 'child-girl',
    name: 'Anak Ceria',
    category: 'Siswa',
    image: childGirlGif,
    bundleId: 'bundle_petualang_ceria',
    bundleName: 'Paket Anak Petualang & Ceria',
    rewardSource: 'Peti Materi 4 Matematika',
    requirement: 'Buka Peti Materi 4 Matematika (Paket Anak Petualang & Ceria)',
  },

  // 4. KATEGORI PAHLAWAN (Peti & Piala Latihan Soal Matematika)
  {
    id: 'knight',
    name: 'Ksatria Tangguh',
    category: 'Pahlawan',
    image: knightGif,
    rewardSource: 'Peti Latihan 4 Matematika',
    requirement: 'Buka Peti Latihan 4 Matematika',
  },
  {
    id: 'ninja',
    name: 'Ninja Gesit',
    category: 'Pahlawan',
    image: ninjaGif,
    rewardSource: 'Peti Latihan 7 Matematika',
    requirement: 'Buka Peti Latihan 7 Matematika',
  },
  {
    id: 'cowboy',
    name: 'Koboi Cilik',
    category: 'Pahlawan',
    image: cowboyGif,
    rewardSource: 'Piala Puncak Latihan 10 MTK',
    requirement: 'Raih Piala Puncak Latihan 10 Matematika',
  },

  // 5. PAKET HADIAH 3: Raja dan Ratu (Piala Puncak Materi 21 Bahasa Indonesia)
  {
    id: 'king',
    name: 'Raja Bijak',
    category: 'Kerajaan',
    image: kingGif,
    bundleId: 'bundle_raja_ratu',
    bundleName: 'Paket Raja & Ratu',
    rewardSource: 'Piala Puncak Materi 21 B. Indo',
    requirement: 'Raih Piala Puncak Materi 21 Bahasa Indonesia (Paket Raja & Ratu)',
  },
  {
    id: 'queen',
    name: 'Ratu Anggun',
    category: 'Kerajaan',
    image: queenGif,
    bundleId: 'bundle_raja_ratu',
    bundleName: 'Paket Raja & Ratu',
    rewardSource: 'Piala Puncak Materi 21 B. Indo',
    requirement: 'Raih Piala Puncak Materi 21 Bahasa Indonesia (Paket Raja & Ratu)',
  },

  // 6. KATEGORI HEWAN (Peti & Piala Materi/Latihan B. Indo & Matematika)
  {
    id: 'fox',
    name: 'Rubah Cerdas',
    category: 'Hewan',
    image: foxGif,
    rewardSource: 'Peti Materi 10 B. Indo',
    requirement: 'Buka Peti Materi 10 Bahasa Indonesia',
  },
  {
    id: 'red-wolf',
    name: 'Serigala Berani',
    category: 'Hewan',
    image: redWolfGif,
    rewardSource: 'Peti Materi 15 B. Indo',
    requirement: 'Buka Peti Materi 15 Bahasa Indonesia',
  },
  {
    id: 'sheep',
    name: 'Domba Lembut',
    category: 'Hewan',
    image: sheepGif,
    rewardSource: 'Peti Materi 8 Matematika',
    requirement: 'Buka Peti Materi 8 Matematika',
  },
  {
    id: 'frog',
    name: 'Katak Lincah',
    category: 'Hewan',
    image: frogGif,
    rewardSource: 'Piala Puncak Materi 12 MTK',
    requirement: 'Raih Piala Puncak Materi 12 Matematika',
  },
  {
    id: 'cow',
    name: 'Sapi Sahabat',
    category: 'Hewan',
    image: cowGif,
    rewardSource: 'Peti Latihan 4 B. Indo',
    requirement: 'Buka Peti Latihan 4 Bahasa Indonesia',
  },
  {
    id: 'teddy-bear-heart',
    name: 'Beruang Manis',
    category: 'Hewan',
    image: teddyBearHeartGif,
    rewardSource: 'Peti Latihan 7 B. Indo',
    requirement: 'Buka Peti Latihan 7 Bahasa Indonesia',
  },
  {
    id: 'panda',
    name: 'Panda Lucu',
    category: 'Hewan',
    image: pandaGif,
    rewardSource: 'Piala Puncak Latihan 10 B. Indo',
    requirement: 'Raih Piala Puncak Latihan 10 Bahasa Indonesia',
  },

  // 7. KATEGORI FANTASI (SPESIAL GACHA TRYOUT MINIMAL 80% BENAR)
  {
    id: 'dragon',
    name: 'Naga Perkasa',
    category: 'Fantasi',
    image: dragonGif,
    isGachaFantasy: true,
    rewardSource: 'Gacha Tryout (>= 80%)',
    requirement: 'Hadiah Gacha acak Tryout Matematika/B. Indo (nilai min. 80%)',
  },
  {
    id: 'baby-dragon',
    name: 'Naga Kecil',
    category: 'Fantasi',
    image: babyDragonGif,
    isGachaFantasy: true,
    rewardSource: 'Gacha Tryout (>= 80%)',
    requirement: 'Hadiah Gacha acak Tryout Matematika/B. Indo (nilai min. 80%)',
  },
  {
    id: 'unicorn',
    name: 'Unicorn Ajaib',
    category: 'Fantasi',
    image: unicornGif,
    isGachaFantasy: true,
    rewardSource: 'Gacha Tryout (>= 80%)',
    requirement: 'Hadiah Gacha acak Tryout Matematika/B. Indo (nilai min. 80%)',
  },
  {
    id: 'mermaid',
    name: 'Putri Duyung',
    category: 'Fantasi',
    image: mermaidGif,
    isGachaFantasy: true,
    rewardSource: 'Gacha Tryout (>= 80%)',
    requirement: 'Hadiah Gacha acak Tryout Matematika/B. Indo (nilai min. 80%)',
  },
  {
    id: 'alien',
    name: 'Alien Ceria',
    category: 'Fantasi',
    image: alienGif,
    isGachaFantasy: true,
    rewardSource: 'Gacha Tryout (>= 80%)',
    requirement: 'Hadiah Gacha acak Tryout Matematika/B. Indo (nilai min. 80%)',
  },
];

export const DEFAULT_AVATAR_ID = 'baby-boy';
export const STARTER_AVATAR_IDS = ['baby-boy', 'baby-girl'];
export const FANTASY_AVATAR_IDS = ['dragon', 'baby-dragon', 'unicorn', 'mermaid', 'alien'];

/**
 * Mengambil data objek karakter avatar berdasarkan id
 * @param {string} id
 */
export const getCharacterAvatar = (id) => {
  if (!id) return CHARACTER_AVATARS[0];
  const found = CHARACTER_AVATARS.find((c) => c.id === id);
  return found || CHARACTER_AVATARS[0];
};
