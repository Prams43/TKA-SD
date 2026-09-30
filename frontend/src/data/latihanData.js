/**
 * Bank Soal Latihan TKA SD Pusmendik Kemendikdasmen
 * 
 * Aturan Level:
 * - Level 1 - 3: 5 soal
 * - Level 4 - 7: 10 soal
 * - Level 8 - 10: 20 soal
 * - Tipe: Pilihan Ganda (PG)
 * - Jawaban & Nilai diberikan di akhir
 * - Tersedia Review Latihan Soal lengkap dengan penjelasan/pembahasan setiap nomor
 */

// Kumpulan template soal Bahasa Indonesia berstandar Pusmendik
const rawSoalBI = [
  {
    t: 'Bacalah kalimat berikut: "Hutan lindung memiliki peranan vital dalam menjaga tata air dan mencegah terjadinya erosi tanah." Makna istilah "vital" dalam kalimat tersebut adalah...',
    opts: ['Sangat penting / utama', 'Kurang bermanfaat', 'Berbahaya bagi warga', 'Sementara waktu'],
    ans: 0,
    exp: 'Istilah "vital" berarti sangat penting atau sangat diperlukan bagi kehidupan/kelangsungan suatu ekosistem.',
  },
  {
    t: 'Penulisan kata berikut yang baku sesuai dengan KBBI adalah...',
    opts: ['Ijin', 'Nasehat', 'Jadwal', 'Kwalitas'],
    ans: 2,
    exp: 'Kata baku yang tepat adalah "jadwal". Bentuk baku lainnya: izin (bukan ijin), nasihat (bukan nasehat), kualitas (bukan kwalitas).',
  },
  {
    t: 'Manakah di antara kalimat berikut yang merupakan kalimat FAKTA?',
    opts: [
      'Bunga mawar merah tampak jauh lebih memukau daripada melati.',
      'Sungai Kapuas merupakan sungai terpanjang di wilayah Indonesia.',
      'Belajar di malam hari terasa lebih mudah dan menyenangkan.',
      'Pantai Kuta adalah destinasi wisata paling sempurna di Asia.',
    ],
    ans: 1,
    exp: 'Sungai Kapuas sebagai sungai terpanjang di Indonesia merupakan fakta geografis nyata yang dapat diuji dan dibuktikan kebenarannya.',
  },
  {
    t: 'Bacalah teks: "Rani selalu menyisihkan sebagian uang sakunya ke dalam celengan ayam setiap hari. Saat temannya membutuhkan bantuan buku pelajaran, Rani dengan ikhlas membantunya." Watak Rani dalam kutipan teks tersebut adalah...',
    opts: ['Kikir dan pemalu', 'Hemat dan dermawan', 'Sombong dan boros', 'Pemberani dan keras kepala'],
    ans: 1,
    exp: 'Menyisihkan uang saku mencerminkan sifat hemat, sedangkan ikhlas membantu teman mencerminkan sikap dermawan.',
  },
  {
    t: 'Kalimat utama yang berada di akhir paragraf dan diawali kata simpulan "Oleh karena itu" termasuk jenis paragraf...',
    opts: ['Deduktif', 'Induktif', 'Campuran', 'Deskriptif'],
    ans: 1,
    exp: 'Paragraf induktif meletakkan kalimat utama di bagian akhir paragraf sebagai simpulan dari uraian-uraian khusus sebelumnya.',
  },
  {
    t: 'Kata dasar dari "mempertanggungjawabkan" adalah...',
    opts: ['Tanggung jawab', 'Pertanggung', 'Jawabkan', 'Tanggung'],
    ans: 0,
    exp: 'Kata dasar dari kata berimbuhan gabung memper-...-kan tersebut adalah kata majemuk "tanggung jawab".',
  },
  {
    t: 'Ungkapan "panjang tangan" dalam cerita bermakna konotatif yaitu...',
    opts: ['Suka menolong orang lain', 'Suka mencuri barang milik orang lain', 'Suka bekerja keras', 'Memiliki tangan yang kekar'],
    ans: 1,
    exp: 'Ungkapan panjang tangan adalah kiasan untuk orang yang gemar mencuri.',
  },
  {
    t: 'Pesan moral atau amanat yang disampaikan dalam sebuah cerita fiksi umumnya bertujuan untuk...',
    opts: [
      'Menghibur pembaca tanpa memberikan nilai apapun',
      'Mengajak pembaca meniru perbuatan jahat tokoh',
      'Memberikan teladan kebaikan bagi kehidupan pembaca',
      'Menambah panjang halaman buku cerita',
    ],
    ans: 2,
    exp: 'Amanat cerita adalah pesan didaktis/nasihat positif dari pengarang kepada pembaca.',
  },
  {
    t: 'Bacalah kalimat: "Pertandingan sepak bola itu berlangsung seru karena kedua tim saling serang." Kata tanya yang tepat untuk menanyakan penyebab keseruan pertandingan adalah...',
    opts: ['Kapan', 'Di mana', 'Mengapa', 'Bagaimana'],
    ans: 2,
    exp: 'Kata tanya "mengapa" digunakan untuk menanyakan sebab atau alasan suatu peristiwa.',
  },
  {
    t: 'Sinonim dari kata "evaluasi" dalam konteks penilaian belajar adalah...',
    opts: ['Penilaian / penaksiran', 'Pencatatan nama', 'Pembagian kelompok', 'Penundaan jadwal'],
    ans: 0,
    exp: 'Evaluasi memiliki persamaan makna dengan asesmen, penilaian, atau pengukuran hasil.',
  },
  {
    t: 'Berikut yang termasuk teks informasi ilmiah sederhana untuk TKA SD adalah...',
    opts: [
      'Cerita peri bersayap emas di negeri dongeng',
      'Artikel tentang siklus daur air hujan dan evaporasi',
      'Kisah kancil yang menipu buaya di pinggir sungai',
      'Fabel kura-kura yang memenangkan lomba lari',
    ],
    ans: 1,
    exp: 'Daur air merupakan teks nonfiksi/informasi ilmiah yang memuat fakta alam nyata.',
  },
  {
    t: 'Tanda baca yang tepat untuk mengakhiri kalimat perintah "Tolong ambilkan buku itu di atas meja" adalah...',
    opts: ['Tanda titik (.)', 'Tanda tanya (?)', 'Tanda seru (!)', 'Tanda koma (,)'],
    ans: 2,
    exp: 'Kalimat perintah atau ajakan diakhiri dengan tanda seru (!).',
  },
  {
    t: 'Ide pokok suatu paragraf dapat ditemukan dengan cara...',
    opts: [
      'Membaca kalimat pertama sampai terakhir dan mencari inti pembahasannya',
      'Menghitung jumlah seluruh huruf vokal dalam paragraf',
      'Hanya membaca kata terakhir di pojok kanan bawah',
      'Melihat gambar ilustrasi tanpa membaca teksnya',
    ],
    ans: 0,
    exp: 'Ide pokok ditemukan melalui membaca cermat dan mengidentifikasi kalimat utama serta topik sentral teks.',
  },
  {
    t: 'Antonim (lawan kata) dari kata "optimis" adalah...',
    opts: ['Pesimis', 'Dinamis', 'Realistis', 'Harmonis'],
    ans: 0,
    exp: 'Optimis berarti berpandangan positif dan penuh harapan, sedangkan pesimis berarti mudah putus asa.',
  },
  {
    t: 'Bacalah kalimat: "Sampah plastik membutuhkan waktu ratusan tahun untuk terurai di dalam tanah." Informasi tersurat dari kalimat tersebut adalah...',
    opts: [
      'Plastik sangat ramah lingkungan',
      'Sampah plastik dapat terurai dalam waktu semalam',
      'Proses penguraian sampah plastik membutuhkan waktu ratusan tahun',
      'Semua sampah di bumi adalah sampah plastik',
    ],
    ans: 2,
    exp: 'Informasi ini tertulis secara langsung dan eksplisit di dalam kalimat wacana.',
  },
  {
    t: 'Penggunaan huruf kapital yang tepat di bawah ini adalah...',
    opts: [
      'kami berlibur ke danau toba pada hari selasa.',
      'Kami berlibur ke Danau Toba pada hari Selasa.',
      'Kami berlibur ke danau Toba pada Hari selasa.',
      'kami Berlibur ke Danau toba pada hari Selasa.',
    ],
    ans: 1,
    exp: 'Huruf kapital dipakai di awal kalimat, nama geografis (Danau Toba), dan nama hari (Selasa).',
  },
  {
    t: 'Majas personifikasi adalah gaya bahasa yang...',
    opts: [
      'Membandingkan manusia dengan hewan',
      'Menggambarkan benda mati seolah-olah bernyawa dan berperilaku seperti manusia',
      'Menyatakan hal secara berlebih-lebihan',
      'Merendahkan diri sendiri agar dipuji',
    ],
    ans: 1,
    exp: 'Personifikasi memberikan sifat insani (manusiawi) kepada benda mati (contoh: "Angin malam membelai rambutnya lembut").',
  },
  {
    t: 'Peribahasa "Air beriak tanda tak dalam" bermakna...',
    opts: [
      'Orang yang banyak bicara biasanya kurang berilmu',
      'Sungai yang dalam tidak memiliki air',
      'Orang pintar selalu banyak bicara di mana saja',
      'Kita harus berhati-hati saat menyeberang sungai',
    ],
    ans: 0,
    exp: 'Makna peribahasa tersebut adalah orang yang sombong dan banyak bualannya biasanya ilmunya sedikit.',
  },
  {
    t: 'Bagan atau ikhtisar dibuat dengan tujuan utama untuk...',
    opts: [
      'Memperumit pemahaman isi bacaan',
      'Menyajikan poin-poin penting teks secara ringkas dan terstruktur',
      'Mengubah fakta bacaan menjadi fiksi',
      'Menghapus seluruh nama tokoh dalam teks',
    ],
    ans: 1,
    exp: 'Ikhtisar atau bagan membantu pembaca memahami alur dan informasi inti secara visual dan ringkas.',
  },
  {
    t: 'Simpulan dari teks narasi dapat dirumuskan setelah pembaca...',
    opts: [
      'Membaca judul teks saja',
      'Membaca keseluruhan isi teks dari awal hingga akhir',
      'Memilih kalimat yang paling panjang',
      'Menghitung jumlah paragraf teks',
    ],
    ans: 1,
    exp: 'Simpulan memerlukan pemahaman komprehensif terhadap seluruh fakta dan pesan teks.',
  },
];

// Kumpulan template soal Matematika berstandar Pusmendik
const rawSoalMTK = [
  {
    t: 'Hasil dari 45 + 15 × 6 - 20 adalah...',
    opts: ['115', '340', '135', '125'],
    ans: 0, // 15*6 = 90, 45+90-20 = 115
    exp: 'Perkalian dikerjakan terlebih dahulu: 15 × 6 = 90. Kemudian 45 + 90 - 20 = 115.',
  },
  {
    t: 'Bentuk paling sederhana dari pecahan 24/36 adalah...',
    opts: ['12/18', '2/3', '4/6', '3/4'],
    ans: 1, // FPB 12 -> 2/3
    exp: 'Bagi pembilang dan penyebut dengan FPB-nya (12): 24 ÷ 12 = 2 dan 36 ÷ 12 = 3. Jadi bentuk sederhananya 2/3.',
  },
  {
    t: 'KPK dari bilangan 12 dan 18 adalah...',
    opts: ['6', '24', '36', '72'],
    ans: 2, // 36
    exp: 'Faktorisasi prima: 12 = 2² × 3, 18 = 2 × 3². KPK = 2² × 3² = 4 × 9 = 36.',
  },
  {
    t: 'FPB dari bilangan 30 dan 45 adalah...',
    opts: ['5', '10', '15', '90'],
    ans: 2, // 15
    exp: 'Faktorisasi prima: 30 = 2 × 3 × 5, 45 = 3² × 5. FPB = 3 × 5 = 15.',
  },
  {
    t: 'Hasil dari 3/4 + 1/2 dalam bentuk pecahan biasa adalah...',
    opts: ['4/6', '5/4', '1', '7/4'],
    ans: 1, // 3/4 + 2/4 = 5/4
    exp: 'Samakan penyebut menjadi 4: 3/4 + 2/4 = 5/4 (atau 1 1/4).',
  },
  {
    t: 'Bentuk persen dari pecahan 3/5 adalah...',
    opts: ['30%', '50%', '60%', '75%'],
    ans: 2, // 3/5 * 100% = 60%
    exp: '3/5 × 100% = (300 ÷ 5)% = 60%.',
  },
  {
    t: 'Sebuah persegi memiliki keliling 48 cm. Panjang sisi persegi tersebut adalah...',
    opts: ['12 cm', '16 cm', '24 cm', '9 cm'],
    ans: 0, // 48 / 4 = 12
    exp: 'Sisi persegi = Keliling ÷ 4 = 48 ÷ 4 = 12 cm.',
  },
  {
    t: 'Luas persegi panjang yang berukuran panjang 15 cm dan lebar 8 cm adalah...',
    opts: ['46 cm²', '120 cm²', '60 cm²', '23 cm²'],
    ans: 1, // 15 * 8 = 120
    exp: 'Luas = panjang × lebar = 15 cm × 8 cm = 120 cm².',
  },
  {
    t: 'Volume sebuah kubus yang memiliki panjang rusuk 7 cm adalah...',
    opts: ['49 cm³', '196 cm³', '343 cm³', '294 cm³'],
    ans: 2, // 7^3 = 343
    exp: 'Volume kubus = s³ = 7 × 7 × 7 = 343 cm³.',
  },
  {
    t: 'Sebuah balok memiliki panjang 10 cm, lebar 6 cm, dan tinggi 5 cm. Volume balok tersebut adalah...',
    opts: ['300 cm³', '150 cm³', '210 cm³', '60 cm³'],
    ans: 0, // 10*6*5 = 300
    exp: 'Volume balok = p × l × t = 10 × 6 × 5 = 300 cm³.',
  },
  {
    t: 'Data nilai ulangan matematika Doni: 80, 70, 90, 80, 85, 75. Nilai rata-rata (mean) ulangan Doni adalah...',
    opts: ['78', '80', '82', '85'],
    ans: 1, // (80+70+90+80+85+75)/6 = 480/6 = 80
    exp: 'Mean = (80 + 70 + 90 + 80 + 85 + 75) ÷ 6 = 480 ÷ 6 = 80.',
  },
  {
    t: 'Modus dari data nilai: 7, 8, 6, 9, 8, 7, 8, 10 adalah...',
    opts: ['6', '7', '8', '9'],
    ans: 2, // 8 muncul 3 kali
    exp: 'Angka 8 muncul paling sering yaitu sebanyak 3 kali.',
  },
  {
    t: 'Pada sebuah peta berskala 1 : 500.000, jarak kota A ke kota B adalah 4 cm. Jarak sebenarnya kedua kota tersebut adalah...',
    opts: ['2 km', '20 km', '200 km', '2.000 km'],
    ans: 1, // 4 * 500.000 cm = 2.000.000 cm = 20 km
    exp: 'Jarak sebenarnya = 4 cm × 500.000 = 2.000.000 cm = 20 km.',
  },
  {
    t: 'Hasil dari 2,5 + 0,75 - 1,2 adalah...',
    opts: ['2,05', '1,95', '2,15', '3,05'],
    ans: 0, // 3.25 - 1.2 = 2.05
    exp: '2,5 + 0,75 = 3,25. Lalu 3,25 - 1,2 = 2,05.',
  },
  {
    t: 'Sebuah lingkaran memiliki diameter 14 cm. Keliling lingkaran tersebut adalah... (π = 22/7)',
    opts: ['22 cm', '44 cm', '88 cm', '154 cm'],
    ans: 1, // 22/7 * 14 = 44
    exp: 'Keliling lingkaran = π × d = (22/7) × 14 cm = 44 cm.',
  },
  {
    t: '2 jam + 45 menit jika diubah ke dalam satuan menit adalah...',
    opts: ['145 menit', '165 menit', '105 menit', '180 menit'],
    ans: 1, // 120 + 45 = 165
    exp: '2 jam = 2 × 60 menit = 120 menit. 120 + 45 = 165 menit.',
  },
  {
    t: 'Pak Budi memanen 2,5 kuintal padi. Berapa kilogram padi yang dipanen Pak Budi? (1 kuintal = 100 kg)',
    opts: ['25 kg', '250 kg', '2.500 kg', '25.000 kg'],
    ans: 1, // 2.5 * 100 = 250
    exp: '2,5 kuintal = 2,5 × 100 kg = 250 kg.',
  },
  {
    t: 'Besar sudut siku-siku adalah...',
    opts: ['45°', '90°', '180°', '360°'],
    ans: 1,
    exp: 'Sudut siku-siku memiliki besar tepat 90 derajat.',
  },
  {
    t: 'Perbandingan banyak kelereng Amir dan Budi adalah 3 : 5. Jika jumlah kelereng mereka 40 butir, banyak kelereng Amir adalah...',
    opts: ['15 butir', '25 butir', '18 butir', '20 butir'],
    ans: 0, // 3/(3+5) * 40 = 3/8 * 40 = 15
    exp: 'Bagian Amir = 3 / (3 + 5) × 40 = 3/8 × 40 = 15 butir.',
  },
  {
    t: 'Sebuah segitiga memiliki panjang alas 14 cm dan tinggi 10 cm. Luas segitiga tersebut adalah...',
    opts: ['140 cm²', '70 cm²', '24 cm²', '48 cm²'],
    ans: 1, // 1/2 * 14 * 10 = 70
    exp: 'Luas segitiga = 1/2 × alas × tinggi = 1/2 × 14 × 10 = 70 cm².',
  },
];

/**
 * Fungsi pembantu untuk membuat daftar soal per level sesuai ketentuan:
 * - Level 1 - 3: 5 soal
 * - Level 4 - 7: 10 soal
 * - Level 8 - 10: 20 soal
 */
function buildLevelsForSubject(sourceBank, subjectPrefix) {
  const levels = [];

  for (let lvl = 1; lvl <= 10; lvl++) {
    let questionCount = 5;
    if (lvl >= 4 && lvl <= 7) questionCount = 10;
    if (lvl >= 8 && lvl <= 10) questionCount = 20;

    // Ambil soal dengan pergeseran indeks agar variatif
    const questions = [];
    const offset = (lvl - 1) * 3;

    for (let i = 0; i < questionCount; i++) {
      const base = sourceBank[(offset + i) % sourceBank.length];
      questions.push({
        id: `${subjectPrefix}_lvl${lvl}_q${i + 1}`,
        nomor: i + 1,
        pertanyaan: base.t,
        pilihan: base.opts,
        jawabanBenar: base.ans,
        penjelasan: base.exp,
      });
    }

    levels.push({
      level: lvl,
      namaLevel: `Level ${lvl}`,
      targetSoal: questionCount,
      deskripsi:
        lvl <= 3
          ? 'Tahap Fondasi Dasar (5 Soal Pilihan Ganda)'
          : lvl <= 7
          ? 'Tahap Penguatan Konsep (10 Soal Pilihan Ganda)'
          : 'Tahap Mahir & Analisis TKA (20 Soal Pilihan Ganda)',
      soal: questions,
    });
  }

  return levels;
}

export const PUSMENDIK_LATIHAN = {
  bahasa_indonesia: {
    nama: 'Bahasa Indonesia',
    icon: 'BookOpen',
    levels: buildLevelsForSubject(rawSoalBI, 'bi'),
  },
  matematika: {
    nama: 'Matematika',
    icon: 'Calculator',
    levels: buildLevelsForSubject(rawSoalMTK, 'mtk'),
  },
};
