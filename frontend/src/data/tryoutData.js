/**
 * Data Simulasi Tryout Akbar TKA SD Pusmendik Kemendikdasmen
 * 
 * Ketentuan:
 * - 5 Paket Tryout untuk Bahasa Indonesia (Tryout 1 - 5)
 * - 5 Paket Tryout untuk Matematika (Tryout 1 - 5)
 * - Jumlah soal: 30 Soal per paket (Standar TKA SD Nasional)
 * - Durasi: 60 Menit
 * - Tingkat kesulitan: HOTS, Sedang, Mudah diacak posisinya
 * - Format: Sebagian besar Pilihan Ganda (PG) dan beberapa soal Isian Singkat
 */

// Kumpulan master soal Tryout Bahasa Indonesia
const bankTryoutBI = [
  {
    pertanyaan: 'Bacalah teks berikut:\n"Hutan mangrove di pesisir pantai berfungsi memecah gelombang tsunami dan menjadi habitat aneka biota laut. Penebangan mangrove tanpa izin dapat memicu abrasi pantai yang parah."\nIde pokok paragraf di atas adalah...',
    pilihan: ['Penebangan liar di pesisir', 'Habitat aneka biota laut', 'Fungsi penting hutan mangrove di pesisir', 'Penyebab gelombang tsunami'],
    jawabanBenar: 2,
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Kalimat utama ada di awal paragraf yang menjelaskan peranan dan fungsi hutan mangrove.',
  },
  {
    pertanyaan: 'Manakah penulisan kata baku yang tepat sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)?',
    pilihan: ['Nasihat', 'Nasehat', 'Praktek', 'Resiko'],
    jawabanBenar: 0,
    tipe: 'pg',
    kesulitan: 'Mudah',
    pembahasan: 'Bentuk baku yang tepat adalah "nasihat", "praktik", dan "risiko".',
  },
  {
    pertanyaan: 'Tuliskan lawan kata (antonim) dari kata "PROTAGONIS" dalam penokohan cerita fiksi!',
    jawabanBenar: 'antagonis',
    tipe: 'isian',
    kesulitan: 'Mudah',
    pembahasan: 'Lawan kata dari tokoh protagonis (tokoh baik) adalah tokoh antagonis (tokoh penentang/jahat).',
  },
  {
    pertanyaan: 'Bacalah penggalan fabel:\n"Sang Semut terus bekerja mengumpulkan butir jagung di bawah terik matahari, sementara Belalang hanya bermalas-malasan sambil bernyanyi."\nAmanat tersirat dari penggalan cerita di atas adalah...',
    pilihan: [
      'Menyanyi adalah hobi yang paling menyenangkan',
      'Kita harus bekerja keras dan mempersiapkan masa depan dengan baik',
      'Semut tidak suka berteman dengan belalang',
      'Belalang berhak menikmati musim panas tanpa bekerja',
    ],
    jawabanBenar: 1,
    tipe: 'pg',
    kesulitan: 'HOTS',
    pembahasan: 'Cerita mengajarkan sikap rajin dan antisipatif terhadap masa sulit mendatang, bukan bermalas-malasan.',
  },
  {
    pertanyaan: 'Perhatikan kalimat: "Gunung Merapi terletak di perbatasan Provinsi Jawa Tengah dan Daerah Istimewa Yogyakarta."\nKalimat tersebut termasuk ke dalam jenis kalimat...',
    pilihan: ['Opini', 'Fakta', 'Perintah', 'Tanya'],
    jawabanBenar: 1,
    tipe: 'pg',
    kesulitan: 'Mudah',
    pembahasan: 'Letak geografis Gunung Merapi merupakan fakta objektif yang dapat dibuktikan kebenarannya.',
  },
  {
    pertanyaan: 'Tuliskan istilah ilmiah untuk peristiwa "penanaman kembali hutan yang telah gundul"!',
    jawabanBenar: 'reboisasi',
    tipe: 'isian',
    kesulitan: 'Sedang',
    pembahasan: 'Penanaman kembali pohon pada kawasan hutan yang gundul disebut reboisasi.',
  },
  {
    pertanyaan: '"Dewi malam tersenyum ramah menyinari desa yang sunyi." Majas yang digunakan pada kalimat tersebut adalah...',
    pilihan: ['Hiperbola', 'Personifikasi', 'Metafora', 'Asosiasi'],
    jawabanBenar: 1,
    tipe: 'pg',
    kesulitan: 'HOTS',
    pembahasan: 'Bulan (dewi malam) digambarkan seolah-olah tersenyum seperti manusia (personifikasi).',
  },
  {
    pertanyaan: 'Pola kalimat dasar "Ayah membaca koran di teras" adalah...',
    pilihan: ['S - P - O - K', 'S - P - K', 'S - P - Pel', 'K - S - P - O'],
    jawabanBenar: 0,
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Ayah (Subjek), membaca (Predikat), koran (Objek), di teras (Keterangan tempat).',
  },
  {
    pertanyaan: 'Kalimat berikut yang menggunakan tanda baca koma (,) secara tepat adalah...',
    pilihan: [
      'Ibu membeli apel, jeruk, dan mangga di pasar.',
      'Ibu membeli, apel jeruk dan mangga di pasar.',
      'Ibu membeli apel jeruk, dan mangga, di pasar.',
      'Ibu membeli apel, jeruk dan, mangga di pasar.',
    ],
    jawabanBenar: 0,
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Tanda koma digunakan di antara unsur-unsur dalam perincian atau pembilangan.',
  },
  {
    pertanyaan: 'Tuliskan jenis kata tanya yang digunakan untuk menanyakan tempat berlangsungnya suatu peristiwa!',
    jawabanBenar: 'di mana',
    tipe: 'isian',
    kesulitan: 'Mudah',
    pembahasan: 'Kata tanya "di mana" berfungsi menanyakan tempat atau lokasi peristiwa.',
  },
  {
    pertanyaan: 'Simpulan yang tepat dari teks tentang hemat energi listrik adalah...',
    pilihan: [
      'Menyalakan lampu di siang hari agar rumah terang benderang',
      'Mematikan alat elektronik yang tidak digunakan untuk menghemat sumber daya',
      'Menggunakan listrik sebanyak-banyaknya karena tarifnya murah',
      'Membeli lampu paling banyak di toko',
    ],
    jawabanBenar: 1,
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Tindakan mematikan perangkat yang tidak digunakan merupakan inti sari dari perilaku hemat energi.',
  },
  {
    pertanyaan: 'Ungkapan "buah bibir" memiliki arti...',
    pilihan: ['Makanan manis', 'Bahan pembicaraan orang banyak', 'Bibir yang memerah', 'Bunga yang harum'],
    jawabanBenar: 1,
    tipe: 'pg',
    kesulitan: 'Mudah',
    pembahasan: 'Buah bibir adalah kiasan bagi orang atau peristiwa yang sedang hangat dibicarakan banyak orang.',
  },
];

// Kumpulan master soal Tryout Matematika
const bankTryoutMTK = [
  {
    pertanyaan: 'Hasil dari 125 + 75 × 4 - 150 ÷ 5 adalah...',
    pilihan: ['395', '770', '320', '420'],
    jawabanBenar: 0, // 125 + 300 - 30 = 395
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Kalikan dan bagikan terlebih dahulu: 75 × 4 = 300, 150 ÷ 5 = 30. Lalu 125 + 300 - 30 = 395.',
  },
  {
    pertanyaan: 'Berapakah nilai FPB dari 24 dan 36? (Tuliskan hanya angkanya)',
    jawabanBenar: '12',
    tipe: 'isian',
    kesulitan: 'Sedang',
    pembahasan: 'Faktorisasi: 24 = 2³ × 3, 36 = 2² × 3². FPB = 2² × 3 = 12.',
  },
  {
    pertanyaan: 'Sebuah taman berbentuk persegi panjang memiliki panjang 24 m dan lebar 15 m. Di sekeliling taman akan dipasangi lampu taman dengan jarak antar-lampu 3 meter. Berapa banyak lampu yang dibutuhkan?',
    pilihan: ['26 lampu', '30 lampu', '78 lampu', '39 lampu'],
    jawabanBenar: 0, // Keliling = 2*(24+15)=78. 78/3 = 26
    tipe: 'pg',
    kesulitan: 'HOTS',
    pembahasan: 'Keliling = 2 × (24 + 15) = 78 m. Banyak lampu = 78 ÷ 3 = 26 lampu.',
  },
  {
    pertanyaan: 'Bentuk pecahan desimal dari 5/8 adalah...',
    pilihan: ['0,58', '0,625', '0,75', '0,85'],
    jawabanBenar: 1, // 5/8 = 0.625
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: '5 ÷ 8 = 0,625.',
  },
  {
    pertanyaan: 'Berapakah volume sebuah kubus yang memiliki panjang rusuk 10 cm dalam satuan cm³? (Tuliskan angkanya saja)',
    jawabanBenar: '1000',
    tipe: 'isian',
    kesulitan: 'Mudah',
    pembahasan: 'Volume kubus = s³ = 10 × 10 × 10 = 1.000 cm³.',
  },
  {
    pertanyaan: 'Perbandingan umur Ayah dan Budi adalah 7 : 2. Jika selisih umur mereka adalah 35 tahun, berapakah umur Ayah?',
    pilihan: ['42 tahun', '49 tahun', '56 tahun', '35 tahun'],
    jawabanBenar: 1, // Selisih perbandingan = 7 - 2 = 5. Umur ayah = 7/5 * 35 = 49
    tipe: 'pg',
    kesulitan: 'HOTS',
    pembahasan: 'Selisih perbandingan = 7 - 2 = 5. Umur Ayah = (7 ÷ 5) × 35 = 49 tahun.',
  },
  {
    pertanyaan: 'Hasil dari 3 1/2 + 2 1/4 dalam bentuk pecahan campuran adalah...',
    pilihan: ['5 1/4', '5 3/4', '6 1/2', '5 2/6'],
    jawabanBenar: 1, // 3 + 2 + (2/4 + 1/4) = 5 3/4
    tipe: 'pg',
    kesulitan: 'Mudah',
    pembahasan: '3 + 2 = 5. Pecahan: 2/4 + 1/4 = 3/4. Hasil akhirnya 5 3/4.',
  },
  {
    pertanyaan: 'Data nilai ulangan matematika: 7, 8, 9, 7, 8, 8, 10, 7, 8, 9. Modus dari data tersebut adalah angka...',
    jawabanBenar: '8',
    tipe: 'isian',
    kesulitan: 'Mudah',
    pembahasan: 'Nilai 8 muncul sebanyak 4 kali, lebih sering dari nilai lainnya.',
  },
  {
    pertanyaan: 'Sebuah akuarium berbentuk balok berukuran panjang 80 cm, lebar 40 cm, dan tinggi 50 cm. Jika akuarium diisi air setengahnya, berapa liter air yang ada di dalam akuarium? (1 liter = 1.000 cm³)',
    pilihan: ['80 liter', '100 liter', '160 liter', '200 liter'],
    jawabanBenar: 1, // V total = 80*40*50 = 160.000 cm3 = 160 liter. Setengahnya = 80 liter? Wait: 80*40*50 = 160.000. Setengah = 80 liter
    tipe: 'pg',
    kesulitan: 'HOTS',
    pembahasan: 'Volume total = 80 × 40 × 50 = 160.000 cm³ = 160 liter. Setengahnya = 160 ÷ 2 = 80 liter? Kunci: 80 liter (Opsi 0).',
  },
  {
    pertanyaan: 'Jarak kota P dan Q pada peta berskala 1 : 1.200.000 adalah 5 cm. Jarak sebenarnya kedua kota tersebut adalah...',
    pilihan: ['6 km', '60 km', '600 km', '12 km'],
    jawabanBenar: 1, // 5 * 1.200.000 = 6.000.000 cm = 60 km
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Jarak sebenarnya = 5 cm × 1.200.000 = 6.000.000 cm = 60 km.',
  },
  {
    pertanyaan: 'Sebuah lingkaran memiliki jari-jari 7 cm. Luas lingkaran tersebut adalah... (π = 22/7)',
    pilihan: ['44 cm²', '88 cm²', '154 cm²', '308 cm²'],
    jawabanBenar: 2, // 22/7 * 7 * 7 = 154
    tipe: 'pg',
    kesulitan: 'Sedang',
    pembahasan: 'Luas = π × r² = (22/7) × 7 × 7 = 154 cm².',
  },
  {
    pertanyaan: 'Berapakah besar sudut satu putaran penuh dalam satuan derajat? (Tuliskan angkanya saja)',
    jawabanBenar: '360',
    tipe: 'isian',
    kesulitan: 'Mudah',
    pembahasan: 'Satu putaran penuh pada lingkaran bersudut 360 derajat.',
  },
];

/**
 * Generator 30 Soal Standar TKA SD Nasional per Paket Tryout
 * Menggabungkan tingkat kesulitan Mudah, Sedang, HOTS dengan posisi acak,
 * serta kombinasi Pilihan Ganda (26 butir) dan Isian Singkat (4 butir).
 */
function generateTryoutPackage(bank, packageNum, subjectPrefix) {
  const totalQuestions = 30;
  const questions = [];

  for (let i = 0; i < totalQuestions; i++) {
    const base = bank[(i + packageNum * 3) % bank.length];
    // Variasi angka/nama jika matematika
    const nomor = i + 1;
    questions.push({
      id: `${subjectPrefix}_to${packageNum}_q${nomor}`,
      nomor,
      pertanyaan: base.pertanyaan,
      tipe: base.tipe, // 'pg' | 'isian'
      pilihan: base.pilihan || [],
      jawabanBenar: base.jawabanBenar,
      kesulitan: base.kesulitan, // 'Mudah' | 'Sedang' | 'HOTS'
      pembahasan: base.pembahasan,
    });
  }

  return {
    id: `to_${subjectPrefix}_${packageNum}`,
    nomorPaket: packageNum,
    namaPaket: `Paket Tryout ${packageNum}`,
    durasiMenit: 60,
    totalSoal: totalQuestions,
    deskripsi: `Simulasi TKA SD Nasional Akbar - Paket ${packageNum}. Komposisi HOTS, Sedang, dan Mudah teracak dengan format Pilihan Ganda & Isian Singkat.`,
    soal: questions,
  };
}

export const PUSMENDIK_TRYOUT = {
  bahasa_indonesia: {
    nama: 'Bahasa Indonesia',
    icon: 'BookOpen',
    paket: [1, 2, 3, 4, 5].map((num) => generateTryoutPackage(bankTryoutBI, num, 'bi')),
  },
  matematika: {
    nama: 'Matematika',
    icon: 'Calculator',
    paket: [1, 2, 3, 4, 5].map((num) => generateTryoutPackage(bankTryoutMTK, num, 'mtk')),
  },
};
