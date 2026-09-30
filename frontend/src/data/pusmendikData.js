/**
 * Data Terstruktur Kurikulum & Pemaparan Materi TKA SD
 * Sumber Resmi: Pusmendik Kemendikdasmen RI
 * Format: Terstruktur rapi dengan komponen tabel, perbandingan, rumus, contoh konkret, dan tips juara.
 */

export const PUSMENDIK_MATERI = {
  bahasa_indonesia: {
    title: 'Bahasa Indonesia',
    icon: 'BookOpen',
    deskripsi: 'Fokus pada keterampilan membaca teks informasi dan fiksi berstandar TKA SD Pusmendik.',
    elemen: [
      {
        id: 'bi_tekstual',
        namaElemen: '1. Pemahaman Tekstual',
        deskripsi: 'Memahami fakta eksplisit, kosakata khusus, dan menyajikan kembali informasi tersurat.',
        bab: [
          {
            id: 'bi_tekstual_1',
            judul: 'Kosakata Baku dan Istilah Khusus dalam Teks',
            ringkasan: 'Mengidentifikasi kosakata umum dan khusus dalam teks fiksi dan teks informasi ilmiah sederhana.',
            tujuan: 'Murid mampu membedakan kata baku dan tidak baku menurut KBBI serta memahami istilah khusus dalam teks bertema sains dan lingkungan.',
            konsepKunci: 'Teks TKA SD menggunakan kata berimbuhan, kata bermakna denotatif (sebenarnya), dan istilah khusus bidang tertentu. Penguasaan kosakata baku mempermudah penangkapan ide pokok bacaan.',
            daftarBaku: [
              { baku: 'Apotek', tidakBaku: 'Apotik', arti: 'Tempat menjual dan meracik obat' },
              { baku: 'Praktik', tidakBaku: 'Praktek', arti: 'Pelaksanaan secara nyata apa yang disebut dalam teori' },
              { baku: 'Antre', tidakBaku: 'Antri', arti: 'Berdiri berjajar menunggu giliran' },
              { baku: 'Jadwal', tidakBaku: 'Jadual', arti: 'Pembagian waktu berdasarkan rencana urutan kerja' },
              { baku: 'Izin', tidakBaku: 'Ijin', arti: 'Pernyataan mengabulkan atau memperbolehkan' },
              { baku: 'Kualitas', tidakBaku: 'Kwalitas', arti: 'Tingkat baik buruknya atau mutu sesuatu' },
              { baku: 'Nasihat', tidakBaku: 'Nasehat', arti: 'Ajaran atau petunjuk baik' },
              { baku: 'Zaman', tidakBaku: 'Jaman', arti: 'Jangka waktu panjang yang menandai sejarah' },
            ],
            istilahKhusus: [
              { istilah: 'Reboisasi', bidang: 'Lingkungan', makna: 'Penanaman kembali hutan yang telah ditebang atau gundul.' },
              { istilah: 'Habitat', bidang: 'Biologi', makna: 'Tempat hidup alami suatu makhluk hidup berkembang biak.' },
              { istilah: 'Erosi', bidang: 'Geografi', makna: 'Pengikisan permukaan tanah oleh aliran air atau hembusan angin kencang.' },
              { istilah: 'Imunitas', bidang: 'Kesehatan', makna: 'Daya tahan atau kekebalan tubuh terhadap serangan kuman/penyakit.' },
            ],
            contohSoal: {
              kasus: 'Perhatikan kalimat: "Dokter menyarankan agar pasien membeli obat di apotik terdekat sesuai nasehat medis."',
              perbaikan: 'Penulisan kata yang tepat adalah "apotek" dan "nasihat".',
              penjelasan: 'Bentuk baku menurut KBBI adalah apotek (dengan huruf e) dan nasihat (dengan huruf i).',
            },
            tipsJuara: 'Ingat kata berakhiran -er (apoteker berasal dari apotek, praktisi berasal dari praktik). Jika ragu, perhatikan kata sebelum dan sesudahnya untuk menebak makna dalam konteks kalimat!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Manakah penulisan kata baku yang tepat menurut PUEBI/KBBI?',
                pilihan: ['Apotik', 'Apotek', 'Praktek', 'Kwualitas'],
                jawabanBenar: 1,
                hint: 'Ingat, kata yang tepat memakai huruf "e", bukan "i", seperti kata apoteker.',
              },
              {
                id: 2,
                pertanyaan: 'Dalam teks tentang lingkungan hidup, istilah "Reboisasi" memiliki arti...',
                pilihan: [
                  'Penebangan pohon secara liar di kawasan hutan',
                  'Penanaman kembali hutan yang gundul atau tandus',
                  'Pengolahan sampah plastik menjadi kerajinan',
                  'Pembersihan saluran air dari endapan lumpur',
                ],
                jawabanBenar: 1,
                hint: 'Kata "Re-" berarti kembali, berkaitan erat dengan pemulihan pepohonan di kawasan hutan.',
              },
              {
                id: 3,
                pertanyaan: 'Kata dasar dari kata berimbuhan "mengidentifikasi" adalah...',
                pilihan: ['Identik', 'Identitas', 'Identifikasi', 'Identitaskan'],
                jawabanBenar: 2,
                hint: 'Imbuhan "meng-" melekat pada kata dasar berawalan huruf vokal "i".',
              },
            ],
          },
          {
            id: 'bi_tekstual_2',
            judul: 'Menemukan Informasi Tersurat (5W1H)',
            ringkasan: 'Menemukan fakta eksplisit (siapa, di mana, kapan, mengapa, dan bagaimana) dalam teks informasi.',
            tujuan: 'Murid mampu menemukan fakta eksplisit yang tertulis langsung di dalam teks wacana menggunakan 6 kata tanya panduan (ADiKSiMBa).',
            konsepKunci: 'Informasi tersurat adalah informasi yang tertulis nyata di dalam teks tanpa perlu ditafsirkan atau ditebak. Seluruh jawabannya ada di dalam paragraf bacaan.',
            tabel5w1h: [
              { tanya: 'Apa (What)', fungsi: 'Menanyakan objek, nama peristiwa, atau hal yang dibahas.', contoh: 'Apa yang sedang dibersihkan warga?' },
              { tanya: 'Di mana (Where)', fungsi: 'Menanyakan lokasi atau tempat terjadinya peristiwa.', contoh: 'Di mana perlombaan diselenggarakan?' },
              { tanya: 'Kapan (When)', fungsi: 'Menanyakan waktu kejadian (hari, tanggal, jam, musim).', contoh: 'Kapan kegiatan bakti sosial dimulai?' },
              { tanya: 'Siapa (Who)', fungsi: 'Menanyakan orang, tokoh, atau pihak yang terlibat.', contoh: 'Siapa yang memimpin upacara bendera?' },
              { tanya: 'Mengapa (Why)', fungsi: 'Menanyakan sebab atau alasan peristiwa terjadi (kata kunci: karena, sebab).', contoh: 'Mengapa kita harus mencuci tangan?' },
              { tanya: 'Bagaimana (How)', fungsi: 'Menanyakan cara, proses, atau suasana peristiwa berlangsung.', contoh: 'Bagaimana proses terjadinya hujan?' },
            ],
            contohTeks: {
              teks: '"Pada hari Minggu pagi, 24 Agustus, Budi dan warga Desa Sukamaju bergotong royong membersihkan saluran air desa karena musim hujan telah tiba."',
              analisis: [
                { k: 'Kapan', v: 'Minggu pagi, 24 Agustus' },
                { k: 'Siapa', v: 'Budi dan warga Desa Sukamaju' },
                { k: 'Apa', v: 'Bergotong royong membersihkan saluran air desa' },
                { k: 'Mengapa', v: 'Karena musim hujan telah tiba' },
              ],
            },
            tipsJuara: 'Saat membaca soal informasi tersurat, cari kata kunci yang sama persis antara kalimat soal dan kalimat yang ada di dalam paragraf!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Kata tanya yang digunakan untuk menanyakan alasan atau penyebab terjadinya suatu peristiwa adalah...',
                pilihan: ['Kapan', 'Di mana', 'Mengapa', 'Siapa'],
                jawabanBenar: 2,
                hint: 'Pertanyaan ini selalu dijawab dengan kata hubung penjelas seperti "karena" atau "sebab".',
              },
              {
                id: 2,
                pertanyaan: 'Informasi yang langsung tertulis jelas di dalam teks tanpa perlu ditafsirkan disebut informasi...',
                pilihan: ['Tersirat', 'Tersurat', 'Khayalan', 'Kiasan'],
                jawabanBenar: 1,
                hint: 'Lawan dari kata "tersirat" (tersembunyi) adalah kata yang bermakna tertulis nyata.',
              },
              {
                id: 3,
                pertanyaan: 'Teks: "Sultan Hasanuddin lahir di Makassar pada 12 Januari 1631." Informasi kapan yang sesuai adalah...',
                pilihan: ['Makassar', '12 Januari 1631', 'Sultan Hasanuddin', 'Masa penjajahan Belanda'],
                jawabanBenar: 1,
                hint: 'Kata tanya "kapan" menanyakan waktu, hari, bulan, dan tahun peristiwa.',
              },
            ],
          },
        ],
      },
      {
        id: 'bi_inferensial',
        namaElemen: '2. Pemahaman Inferensial',
        deskripsi: 'Menyimpulkan ide pokok, gagasan pendukung, amanat, watak tokoh, dan hubungan sebab-akibat.',
        bab: [
          {
            id: 'bi_inferensial_1',
            judul: 'Menentukan Ide Pokok dan Gagasan Pendukung',
            ringkasan: 'Menganalisis kalimat utama paragraf deduktif, induktif, dan menyimpulkan pesan tersirat.',
            tujuan: 'Murid mampu menemukan ide pokok yang mendasari paragraf serta membedakan kalimat utama dengan kalimat penjelas/pendukung.',
            konsepKunci: 'Ide pokok adalah inti sari dari topik pembahasan dalam suatu paragraf. Ide pokok dituangkan ke dalam satu Kalimat Utama, kemudian diperjelas oleh beberapa Kalimat Pendukung.',
            jenisParagraf: [
              {
                jenis: 'Paragraf Deduktif',
                letak: 'Kalimat utama di AWAL paragraf',
                pola: 'Dari gagasan umum di awal, lalu diikuti rincian-rincian khusus.',
                ciri: 'Kalimat pertama langsung memuat topik utama yang dibahas.',
              },
              {
                jenis: 'Paragraf Induktif',
                letak: 'Kalimat utama di AKHIR paragraf',
                pola: 'Dari rincian-rincian khusus, lalu disimpulkan di kalimat terakhir.',
                ciri: 'Sering diawali kata simpulan: "Oleh karena itu", "Dengan demikian", "Jadi".',
              },
              {
                jenis: 'Paragraf Campuran',
                letak: 'Di AWAL dan ditegaskan kembali di AKHIR',
                pola: 'Gagasan umum diajukan di awal, dirinci di tengah, dan diringkas ulang di akhir.',
                ciri: 'Kalimat terakhir mengulang inti kalimat pertama dengan variasi kata.',
              },
            ],
            tipsJuara: 'Coba baca kalimat pertama dan kalimat terakhir dari paragraf tersebut terlebih dahulu. Di antara dua kalimat itulah letak ide pokok paling sering berada!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Paragraf yang memiliki kalimat utama di awal paragraf disebut paragraf...',
                pilihan: ['Induktif', 'Deduktif', 'Campuran', 'Naratif'],
                jawabanBenar: 1,
                hint: 'Ingat huruf awal: "D" untuk Depan atau Awal paragraf.',
              },
              {
                id: 2,
                pertanyaan: 'Kalimat yang berfungsi menjelaskan, memberi contoh, atau memerinci kalimat utama disebut...',
                pilihan: ['Kalimat tanya', 'Kalimat penjelas/pendukung', 'Kalimat perintah', 'Kalimat majemuk'],
                jawabanBenar: 1,
                hint: 'Kalimat ini bertugas mendampingi dan mendukung ide pokok.',
              },
              {
                id: 3,
                pertanyaan: 'Jika sebuah paragraf diakhiri kalimat "Oleh karena itu, kita harus menjaga kelestarian hutan", maka paragraf tersebut bertipe...',
                pilihan: ['Deduktif', 'Induktif', 'Deskriptif', 'Eksposisi'],
                jawabanBenar: 1,
                hint: 'Kalimat simpulan di bagian ujung akhir menandakan pola induksi.',
              },
            ],
          },
          {
            id: 'bi_inferensial_2',
            judul: 'Menyimpulkan Amanat & Watak Tokoh Cerita',
            ringkasan: 'Menggali pesan moral tersirat dan karakter tokoh fiksi berdasarkan dialog dan perbuatan tokoh.',
            tujuan: 'Murid mampu menelaah watak kepribadian tokoh cerita fiksi serta memetik pesan moral kebaikan yang tersirat.',
            konsepKunci: 'Amanat adalah nasihat kebaikan yang ingin disampaikan penulis kepada pembaca. Karakter tokoh dapat diketahui melalui tingkah laku, dialog ucapan, dan reaksi saat menghadapi masalah.',
            kategoriTokoh: [
              { kategori: 'Tokoh Protagonis', sifat: 'Baik, penyayang, jujur, pemaaf, dan berani membela kebenaran.', peran: 'Tokoh utama yang menjadi teladan bagi pembaca.' },
              { kategori: 'Tokoh Antagonis', sifat: 'Iri hati, sombong, pendendam, serakah, atau suka memfitnah.', peran: 'Pemeran penentang yang memicu timbulnya konflik dalam cerita.' },
              { kategori: 'Tokoh Tritagonis', sifat: 'Bijaksana, adil, tenang, dan netral.', peran: 'Penengah atau pendamai ketika terjadi pertikaian antar tokoh.' },
            ],
            tipsJuara: 'Untuk menemukan amanat cerita, perhatikan bagaimana cerita tersebut berakhir. Tokoh yang berbuat baik biasanya mendapat kebahagiaan, sedangkan tokoh jahat akan menyesali perbuatannya!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Pesan moral atau nasihat kebaikan yang ingin disampaikan pengarang melalui cerita disebut...',
                pilihan: ['Latar', 'Alur', 'Amanat', 'Tema'],
                jawabanBenar: 2,
                hint: 'Ini adalah nasihat atau pelajaran berharga yang dapat dipetik dari akhir kisah.',
              },
              {
                id: 2,
                pertanyaan: 'Tokoh yang memiliki sifat baik hati, suka menolong, dan bersahaja disebut tokoh...',
                pilihan: ['Antagonis', 'Protagonis', 'Tritagonis', 'Figuran'],
                jawabanBenar: 1,
                hint: 'Lawan dari antagonis adalah pemeran utama yang disenangi pembaca.',
              },
              {
                id: 3,
                pertanyaan: 'Dalam cerita "Kancil dan Buaya", sifat Kancil yang menggunakan akal cerdiknya untuk menyeberang sungai menunjukkan watak...',
                pilihan: ['Pemalas', 'Pemberang', 'Cerdik dan banyak akal', 'Sombong'],
                jawabanBenar: 2,
                hint: 'Kancil terkenal memiliki kepandaian dalam mencari solusi saat terdesak.',
              },
            ],
          },
        ],
      },
      {
        id: 'bi_evaluasi',
        namaElemen: '3. Evaluasi dan Apresiasi',
        deskripsi: 'Membedakan fakta dan opini, menilai ide, serta merefleksikan nilai teks ke kehidupan sehari-hari.',
        bab: [
          {
            id: 'bi_evaluasi_1',
            judul: 'Membedakan Kalimat Fakta dan Kalimat Opini',
            ringkasan: 'Menganalisis pernyataan yang terbukti secara objektif versus pendapat atau penilaian subjektif.',
            tujuan: 'Murid mampu memilah kalimat yang memuat kenyataan objektif (fakta) dan kalimat yang memuat pendapat subjektif (opini).',
            konsepKunci: 'Fakta dapat dibuktikan kebenarannya oleh siapa saja melalui data atau kenyataan alam. Opini mencerminkan perasaan, selera, atau dugaan seseorang yang bisa berbeda bagi tiap orang.',
            perbandinganFaktaOpini: [
              {
                faktor: 'Sifat Pernyataan',
                fakta: 'Objektif (berlaku universal bagi semua orang)',
                opini: 'Subjektif (tergantung selera/pendapat pribadi)',
              },
              {
                faktor: 'Bukti Pendukung',
                fakta: 'Ada angka, tanggal, lokasi, atau data ilmiah akurat',
                opini: 'Belum pasti, berupa dugaan, anjuran, atau perkiraan',
              },
              {
                faktor: 'Kata Kunci Penanda',
                fakta: 'terletak di, terjadi pada, berukuran, berjumlah',
                opini: 'menurut saya, sangat indah, paling lezat, sebaiknya, tampaknya',
              },
              {
                faktor: 'Contoh Nyata',
                fakta: 'Matahari terbit di sebelah timur dan tenggelam di barat.',
                opini: 'Pemandangan matahari terbenam di pantai itu sungguh menakjubkan.',
              },
            ],
            tipsJuara: 'Jika dalam kalimat terdapat kata sifat superlatif (paling, ter-indah, sangat nikmat, sebaiknya), kalimat tersebut hampir pasti adalah Opini!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Manakah kalimat di bawah ini yang merupakan FAKTA?',
                pilihan: [
                  'Es krim rasa cokelat adalah es krim paling lezat di dunia.',
                  'Matahari terbit dari sebelah timur dan tenggelam di sebelah barat.',
                  'Belajar matematika di pagi hari terasa sangat menyenangkan.',
                  'Baju berwarna biru tampak lebih bagus daripada baju merah.',
                ],
                jawabanBenar: 1,
                hint: 'Fakta adalah peristiwa alam nyata yang dapat dibuktikan kebenarannya oleh siapa saja.',
              },
              {
                id: 2,
                pertanyaan: 'Kata-kata berikut ini yang biasanya menjadi penanda kalimat OPINI adalah...',
                pilihan: ['Menurut saya, sangat elok, sebaiknya', 'Tanggal 17 Agustus 1945', 'Sebanyak 25 kilogram', 'Di Kota Surabaya'],
                jawabanBenar: 0,
                hint: 'Opini mencerminkan perkiraan, selera, atau perasaan pribadi seseorang.',
              },
              {
                id: 3,
                pertanyaan: '"Danau Toba terletak di Provinsi Sumatera Utara." Kalimat tersebut termasuk...',
                pilihan: ['Kalimat Opini', 'Kalimat Fakta', 'Kalimat Perintah', 'Kalimat Pengandaian'],
                jawabanBenar: 1,
                hint: 'Letak geografis suatu danau tertera di peta resmi dan dapat dibuktikan kebenarannya.',
              },
            ],
          },
        ],
      },
    ],
  },

  matematika: {
    title: 'Matematika',
    icon: 'Calculator',
    deskripsi: 'Merujuk pada 3 elemen resmi Pusmendik: Bilangan, Geometri & Pengukuran, dan Data.',
    elemen: [
      {
        id: 'mtk_bilangan',
        namaElemen: '1. Bilangan',
        deskripsi: 'Operasi hitung bilangan cacah, pecahan, desimal, persen, KPK-FPB, dan perbandingan.',
        bab: [
          {
            id: 'mtk_bilangan_1',
            judul: 'Operasi Hitung Campuran Bilangan Cacah',
            ringkasan: 'Urutan pengerjaan operasi tanda kurung, perkalian/pembagian, dan penjumlahan/pengurangan.',
            tujuan: 'Murid mampu menghitung operasi hitung campuran bilangan cacah dengan menerapkan urutan kekuatan operasi (KABATAKU) secara tepat.',
            konsepKunci: 'Operasi hitung memiliki kasta kekuatan. Jika tidak ada tanda kurung, perkalian dan pembagian HARUS dikerjakan lebih dulu daripada penjumlahan dan pengurangan.',
            urutanOperasi: [
              { tingkat: 'Tingkat 1', nama: 'Tanda Kurung ( )', aturan: 'Operasi di dalam tanda kurung wajib dikerjakan paling awal, apapun jenis operasinya.' },
              { tingkat: 'Tingkat 2', nama: 'Perkalian (×) & Pembagian (÷)', aturan: 'Sama kuat. Jika muncul bersamaan, kerjakan secara berurutan dari kiri ke kanan.' },
              { tingkat: 'Tingkat 3', nama: 'Penjumlahan (+) & Pengurangan (-)', aturan: 'Dikerjakan paling akhir setelah tingkat 1 & 2 tuntas, berurutan dari kiri ke kanan.' },
            ],
            contohLangkah: {
              soal: 'Hitunglah nilai dari: 50 + 20 × 4 - 30 ÷ 5',
              langkah: [
                { no: 1, text: 'Identifikasi operasi perkalian & pembagian: (20 × 4 = 80) dan (30 ÷ 5 = 6)' },
                { no: 2, text: 'Tuliskan persamaan baru: 50 + 80 - 6' },
                { no: 3, text: 'Kerjakan penjumlahan dari kiri: 50 + 80 = 130' },
                { no: 4, text: 'Kurangkan hasil akhir: 130 - 6 = 124' },
              ],
              hasil: '124',
            },
            tipsJuara: 'Berikan tanda lingkaran atau garis bawah pada perkalian dan pembagian terlebih dahulu sebelum menghitung, agar kamu tidak terjebak menjumlahkan angka di depan!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Berapakah hasil dari 50 + 20 × 3?',
                pilihan: ['210', '110', '150', '90'],
                jawabanBenar: 1,
                hint: 'Kerjakan operasi perkalian (20 × 3 = 60) terlebih dahulu sebelum dijumlahkan dengan 50.',
              },
              {
                id: 2,
                pertanyaan: 'Hasil dari (80 - 30) ÷ 5 + 12 adalah...',
                pilihan: ['22', '18', '25', '30'],
                jawabanBenar: 0,
                hint: 'Kerjakan operasi di dalam kurung (80 - 30 = 50) terlebih dahulu, lalu bagi 5 (hasil 10), baru ditambah 12.',
              },
              {
                id: 3,
                pertanyaan: 'Ibu membeli 3 pak buku tulis. Setiap pak berisi 10 buku. Kemudian Ibu membagikannya kepada 5 orang anak sama banyak. Berapa buku yang didapat setiap anak?',
                pilihan: ['4 buku', '5 buku', '6 buku', '8 buku'],
                jawabanBenar: 2,
                hint: 'Hitung total buku seluruhnya (3 × 10 = 30 buku), lalu bagi rata kepada 5 anak (30 ÷ 5).',
              },
            ],
          },
          {
            id: 'mtk_bilangan_2',
            judul: 'Pecahan, Desimal, dan Persen',
            ringkasan: 'Operasi pecahan biasa, campuran, penyederhanaan, dan konversi ke bentuk desimal/persen.',
            tujuan: 'Murid mampu melakukan operasi hitung penjumlahan, pengurangan, perkalian, pembagian pecahan, serta mengonversinya ke desimal dan persen.',
            konsepKunci: 'Pecahan biasa dinyatakan dalam a/b (a = pembilang, b = penyebut). Penjumlahan dan pengurangan hanya bisa dilakukan jika penyebutnya sudah disamakan memakai KPK.',
            rumusPecahan: [
              { nama: 'Penjumlahan / Pengurangan', rumus: 'Samakan penyebut dengan KPK, lalu hitung pembilang.', contoh: '1/2 + 1/3 = 3/6 + 2/6 = 5/6' },
              { nama: 'Perkalian Pecahan', rumus: 'Kalikan pembilang × pembilang dan penyebut × penyebut.', contoh: '2/3 × 3/4 = 6/12 = 1/2' },
              { nama: 'Pembagian Pecahan', rumus: 'Ubah menjadi perkalian dengan membalik pecahan kedua.', contoh: '3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 1 1/2' },
              { nama: 'Konversi ke Persen (%)', rumus: 'Ubah penyebut menjadi 100 dengan mengalikan angka yang sama.', contoh: '3/4 = (3 × 25) / (4 × 25) = 75/100 = 75%' },
            ],
            tabelKonversi: [
              { pecahan: '1/2', desimal: '0,5', persen: '50%' },
              { pecahan: '1/4', desimal: '0,25', persen: '25%' },
              { pecahan: '3/4', desimal: '0,75', persen: '75%' },
              { pecahan: '1/5', desimal: '0,2', persen: '20%' },
              { pecahan: '2/5', desimal: '0,4', persen: '40%' },
              { pecahan: '1/8', desimal: '0,125', persen: '12,5%' },
            ],
            tipsJuara: 'Hafalkan pasangan pengali penyebut 100: (2 × 50), (4 × 25), (5 × 20), (10 × 10). Ini akan membuat konversi ke persen menjadi sangat cepat!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Bentuk desimal dari pecahan 3/4 adalah...',
                pilihan: ['0,25', '0,50', '0,75', '0,80'],
                jawabanBenar: 2,
                hint: 'Ubah penyebut menjadi 100 dengan mengalikan 25 pada pembilang dan penyebut (3 × 25 = 75).',
              },
              {
                id: 2,
                pertanyaan: 'Hasil dari 1/2 + 1/4 adalah...',
                pilihan: ['2/6', '3/4', '2/4', '1/8'],
                jawabanBenar: 1,
                hint: 'Samakan penyebut menjadi 4, sehingga 1/2 berubah menjadi 2/4. Kemudian hitung 2/4 + 1/4.',
              },
              {
                id: 3,
                pertanyaan: 'Bentuk persen dari 2/5 adalah...',
                pilihan: ['20%', '30%', '40%', '50%'],
                jawabanBenar: 2,
                hint: 'Kalikan pembilang 2 dengan 20 agar penyebut 5 menjadi 100 (2 × 20 = 40).',
              },
            ],
          },
        ],
      },
      {
        id: 'mtk_geometri',
        namaElemen: '2. Geometri dan Pengukuran',
        deskripsi: 'Keliling & luas bangun datar, volume bangun ruang, serta konversi satuan baku.',
        bab: [
          {
            id: 'mtk_geometri_1',
            judul: 'Keliling dan Luas Bangun Datar',
            ringkasan: 'Rumus keliling dan luas persegi, persegi panjang, segitiga, dan lingkaran.',
            tujuan: 'Murid mampu menghitung panjang keliling dan luas daerah bangun datar dua dimensi.',
            konsepKunci: 'Keliling adalah panjang total garis tepi yang mengelilingi bangun datar. Luas adalah besarnya daerah permukaan yang dibatasi oleh garis tepi tersebut.',
            rumusBangunDatar: [
              { bangun: 'Persegi', keliling: 'K = 4 × s', luas: 'L = s × s = s²', keterangan: 's = panjang sisi persegi' },
              { bangun: 'Persegi Panjang', keliling: 'K = 2 × (p + l)', luas: 'L = p × l', keterangan: 'p = panjang, l = lebar' },
              { bangun: 'Segitiga', keliling: 'K = sisi + sisi + sisi', luas: 'L = 1/2 × a × t', keterangan: 'a = alas, t = tinggi tegak lurus' },
              { bangun: 'Lingkaran', keliling: 'K = π × d = 2 × π × r', luas: 'L = π × r²', keterangan: 'π = 22/7 (jika r kelipatan 7) atau 3,14' },
            ],
            contohKasus: {
              soal: 'Sebuah taman berbentuk persegi panjang memiliki panjang 15 m dan lebar 8 m. Berapakah luas dan kelilingnya?',
              langkah: [
                'Luas = panjang × lebar = 15 m × 8 m = 120 m²',
                'Keliling = 2 × (panjang + lebar) = 2 × (15 + 8) = 2 × 23 = 46 m',
              ],
            },
            tipsJuara: 'Perhatikan satuan! Luas selalu memakai satuan persegi (cm², m²), sedangkan keliling memakai satuan panjang biasa (cm, m).',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sebuah persegi panjang memiliki panjang 12 cm dan lebar 5 cm. Berapakah luasnya?',
                pilihan: ['34 cm²', '60 cm²', '17 cm²', '50 cm²'],
                jawabanBenar: 1,
                hint: 'Gunakan rumus Luas Persegi Panjang: Luas = panjang × lebar (12 × 5).',
              },
              {
                id: 2,
                pertanyaan: 'Keliling persegi dengan panjang sisi 9 cm adalah...',
                pilihan: ['18 cm', '27 cm', '36 cm', '81 cm'],
                jawabanBenar: 2,
                hint: 'Keliling persegi dihitung dengan menjumlahkan ke-4 sisinya (4 × 9).',
              },
              {
                id: 3,
                pertanyaan: 'Luas segitiga dengan alas 10 cm dan tinggi 8 cm adalah...',
                pilihan: ['40 cm²', '80 cm²', '18 cm²', '20 cm²'],
                jawabanBenar: 0,
                hint: 'Rumus luas segitiga adalah 1/2 × alas × tinggi = 1/2 × 10 × 8.',
              },
            ],
          },
          {
            id: 'mtk_geometri_2',
            judul: 'Volume Kubus dan Balok',
            ringkasan: 'Menghitung isi/ruang bangun tiga dimensi menggunakan kubus satuan dan rumus baku.',
            tujuan: 'Murid mampu menghitung volume bangun ruang tiga dimensi dan mengonversinya ke satuan liter.',
            konsepKunci: 'Volume menunjukkan kapasitas atau daya tampung isi ruang suatu bangun tiga dimensi. 1 liter setara dengan 1 desimeter kubik (dm³) atau 1.000 sentimeter kubik (cm³).',
            rumusBangunRuang: [
              {
                bangun: 'Kubus',
                rumus: 'Volume = s × s × s = s³',
                unsur: 'Memiliki 6 sisi persegi yang sama besar, 12 rusuk sama panjang, dan 8 titik sudut.',
                contoh: 'Rusuk 6 cm -> V = 6 × 6 × 6 = 216 cm³',
              },
              {
                bangun: 'Balok',
                rumus: 'Volume = p × l × t',
                unsur: 'Memiliki 3 pasang sisi persegi panjang yang sejajar, 12 rusuk, dan 8 titik sudut.',
                contoh: 'p = 10 cm, l = 5 cm, t = 4 cm -> V = 10 × 5 × 4 = 200 cm³',
              },
            ],
            tipsJuara: 'Akar pangkat tiga (∛) sangat berguna untuk mencari panjang rusuk kubus jika volumenya sudah diketahui! Hafalkan 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 10³=1.000.',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Volume kubus dengan panjang rusuk 5 cm adalah...',
                pilihan: ['25 cm³', '100 cm³', '125 cm³', '150 cm³'],
                jawabanBenar: 2,
                hint: 'Hitung perkalian 5 × 5 × 5 = 125.',
              },
              {
                id: 2,
                pertanyaan: 'Sebuah balok memiliki panjang 8 cm, lebar 4 cm, dan tinggi 3 cm. Berapa volumenya?',
                pilihan: ['96 cm³', '64 cm³', '84 cm³', '72 cm³'],
                jawabanBenar: 0,
                hint: 'Volume balok dihitung dengan mengalikan panjang × lebar × tinggi = 8 × 4 × 3.',
              },
              {
                id: 3,
                pertanyaan: 'Sebuah bak penampung air berbentuk kubus memiliki volume 1.000 liter (dm³). Berapakah panjang rusuk bak tersebut?',
                pilihan: ['8 dm', '10 dm', '100 dm', '12 dm'],
                jawabanBenar: 1,
                hint: 'Cari bilangan yang jika dipangkatkan tiga menghasilkan 1.000 (10 × 10 × 10 = 1.000).',
              },
            ],
          },
        ],
      },
      {
        id: 'mtk_data',
        namaElemen: '3. Data',
        deskripsi: 'Penyajian data tabel & diagram batang, rata-rata (mean), median, dan modus.',
        bab: [
          {
            id: 'mtk_data_1',
            judul: 'Membaca Data, Mean, Median, dan Modus',
            ringkasan: 'Menganalisis tabel frekuensi, menghitung nilai rata-rata, dan menentukan data yang paling sering muncul.',
            tujuan: 'Murid mampu membaca informasi dari tabel/diagram serta menentukan nilai rata-rata (mean), nilai tengah (median), dan modus.',
            konsepKunci: 'Statistika dasar mengukur ukuran pemusatan data untuk menarik kesimpulan dari sekumpulan nilai ulangan atau data pengamatan.',
            tigaPemusatanData: [
              {
                nama: 'Mean (Rata-rata)',
                rumus: 'Jumlah seluruh nilai data ÷ Banyaknya data',
                contoh: 'Nilai 80, 90, 70 -> Mean = (80 + 90 + 70) ÷ 3 = 240 ÷ 3 = 80',
              },
              {
                nama: 'Modus',
                rumus: 'Nilai data yang frekuensi kemunculannya PALING BANYAK',
                contoh: 'Nilai 7, 8, 8, 9, 8 -> Angka 8 muncul 3 kali (terbanyak), jadi Modus = 8',
              },
              {
                nama: 'Median',
                rumus: 'Nilai data yang terletak TEPAT DI TENGAH setelah diurutkan',
                contoh: 'Data: 6, 7, 8, 9, 10 -> Nilai tengah di urutan ke-3 adalah 8',
              },
            ],
            tipsJuara: 'Untuk mencari Median, JANGAN LANGSUNG ambil angka di tengah! Wajib urutkan datanya dari angka terkecil ke terbesar terlebih dahulu!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Nilai ulangan Andi adalah 7, 8, 9, 8, 8, 7, 10. Nilai modus dari data tersebut adalah...',
                pilihan: ['7', '8', '9', '10'],
                jawabanBenar: 1,
                hint: 'Modus adalah angka yang paling sering muncul (angka 8 muncul 3 kali).',
              },
              {
                id: 2,
                pertanyaan: 'Rata-rata (mean) dari nilai 6, 8, 7, 9 adalah...',
                pilihan: ['7', '7,5', '8', '8,5'],
                jawabanBenar: 1,
                hint: 'Jumlahkan keempat nilai (6 + 8 + 7 + 9 = 30) lalu bagi dengan banyaknya data (30 ÷ 4 = 7,5).',
              },
              {
                id: 3,
                pertanyaan: 'Jika data 3, 5, 7, 8, 9 memiliki 5 data berurutan, maka nilai median (nilai tengahnya) adalah...',
                pilihan: ['5', '7', '8', '6'],
                jawabanBenar: 1,
                hint: 'Karena data sudah urut, ambil angka tepat di posisi tengah (urutan ke-3 yaitu 7).',
              },
            ],
          },
        ],
      },
    ],
  },
};
