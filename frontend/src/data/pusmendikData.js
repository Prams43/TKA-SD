/**
 * Data Resmi Materi Pembelajaran TKA SD
 * Sumber Silabus Buku & Kurikulum Pusmendik Kemendikdasmen RI
 * 
 * Terdiri dari:
 * a. Matematika (12 Materi):
 *    1. Operasi Hitung
 *    2. Perbandingan dan Skala
 *    3. KPK dan FPB
 *    4. Bilangan Pangkat
 *    5. Pengukuran
 *    6. Jarak, Waktu, dan kecepatan
 *    7. Bangun datar
 *    8. Bangun ruang
 *    9. Memahami Kartesius
 *    10. Pengelolaan Data
 *    11. Besar Sudut
 *    12. Penaksiran Ukuran
 * 
 * b. Bahasa Indonesia (21 Materi):
 *    1. Penulisan Huruf Kapital
 *    2. Penulisan Kata Depan: dari, di, ke
 *    3. Pemakaian Tanda Baca
 *    4. Kata Berimbuhan
 *    5. Frasa (Kelompok Kata)
 *    6. Makna Kata
 *    7. Ungkapan
 *    8. Sinonim dan Antonim
 *    9. Kata dalam Bahasa Indonesia
 *    10. Kalimat
 *    11. Menyimak
 *    12. Menulis
 *    13. Puisi
 *    14. Prosa
 *    15. Kosakata
 *    16. Menyusun Kembali Informasi dari Teks
 *    17. Informasi Tersurat
 *    18. Menarik Kesimpulan
 *    19. Relevansi Peristiwa dalam teks
 *    20. Kesesuaian Antarunsur dalam teks
 *    21. Respons Emosional Terhadap Unsur Teks Fiksi
 */

export const PUSMENDIK_MATERI = {
  matematika: {
    title: 'Matematika',
    icon: 'Calculator',
    deskripsi: '12 Materi Pokok Standar TKA SD: Bilangan, Operasi, Pengukuran, Geometri, dan Pengolahan Data.',
    elemen: [
      {
        id: 'mtk_bilangan_operasi',
        namaElemen: '1. Bilangan & Operasi Hitung',
        deskripsi: 'Keterampilan dasar perhitungan numerasi, faktor, kelipatan, dan pangkat.',
        bab: [
          {
            id: 'mtk_1',
            no: 1,
            judul: 'Operasi Hitung',
            ringkasan: 'Operasi hitung campuran bilangan cacah, bulat negatif/positif, dan aturan KABATAKU.',
            tujuan: 'Murid mampu menghitung operasi hitung campuran dengan mendahulukan tanda kurung, perkalian/pembagian, lalu penjumlahan/pengurangan.',
            konsepKunci: 'Hierarki KABATAKU: (1) Tanda kurung [()], (2) Perkalian & Pembagian (tingkat setara dari kiri ke kanan), (3) Penjumlahan & Pengurangan (tingkat setara dari kiri ke kanan).',
            uraianMateri: [
              {
                subjudul: 'Aturan Tingkatan Operasi Hitung',
                konten: 'Jika terdapat tanda kurung, kerjakan operasi di dalamnya terlebih dahulu. Perkalian (×) dan pembagian (÷) dikerjakan sebelum penjumlahan (+) dan pengurangan (-).',
                rumus: '(Kurung)  →  Kali (×) & Bagi (÷)  →  Tambah (+) & Kurang (-)',
                contoh: '25 + 15 × 4 - 20 ÷ 5 = 25 + 60 - 4 = 81'
              },
              {
                subjudul: 'Sifat-Sifat Operasi Hitung',
                konten: 'Komutatif (pertukaran): a + b = b + a; Asosiatif (pengelompokan): (a + b) + c = a + (b + c); Distributif (penyebaran): a × (b + c) = (a × b) + (a × c).',
                contoh: '12 × (10 + 5) = (12 × 10) + (12 × 5) = 120 + 60 = 180'
              }
            ],
            contohSoal: {
              soal: 'Hasil dari 150 - 50 : 5 + 25 x 4 adalah...',
              penjelasan: 'Kerjakan pembagian dan perkalian lebih dulu: 50 : 5 = 10, dan 25 x 4 = 100. Sehingga: 150 - 10 + 100 = 140 + 100 = 240.'
            },
            tipsJuara: 'Beri tanda kurung pensil pada perkalian atau pembagian terlebih dahulu agar tidak terkecoh!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Hasil dari 40 + 20 × 3 - 50 adalah...',
                pilihan: ['130', '50', '180', '70'],
                jawabanBenar: 1,
                hint: 'Dahulukan perkalian 20 × 3 = 60, lalu 40 + 60 - 50.'
              },
              {
                id: 2,
                pertanyaan: 'Bentuk distributif dari 8 × (15 + 5) adalah...',
                pilihan: ['(8 + 15) × (8 + 5)', '(8 × 15) + (8 × 5)', '(8 × 15) × 5', '8 × 15 + 5'],
                jawabanBenar: 1,
                hint: 'Sifat distributif menyebarkan faktor pengali 8 ke masing-masing suku di dalam kurung.'
              },
              {
                id: 3,
                pertanyaan: 'Sebuah toko memiliki 12 kotak pensil. Setiap kotak berisi 10 pensil. Jika 40 pensil terjual, berapa sisa pensil?',
                pilihan: ['60', '80', '120', '160'],
                jawabanBenar: 1,
                hint: 'Hitung total awal (12 × 10 = 120), lalu kurangkan dengan yang terjual (120 - 40).'
              }
            ]
          },
          {
            id: 'mtk_2',
            no: 2,
            judul: 'Perbandingan dan Skala',
            ringkasan: 'Konsep rasio dua nilai atau lebih dan rumus skala gambar/peta terhadap jarak sebenarnya.',
            tujuan: 'Murid mampu menghitung perbandingan senilai/berbalik nilai dan menghitung jarak peta, skala, serta jarak sebenarnya.',
            konsepKunci: 'Skala = Jarak pada Peta (JP) : Jarak Sebenarnya (JS). Satuan JS harus disamakan ke cm terlebih dahulu (1 km = 100.000 cm).',
            uraianMateri: [
              {
                subjudul: 'Rumus Segitiga Skala',
                konten: 'Skala = JP / JS; Jarak Sebenarnya (JS) = JP / Skala; Jarak pada Peta (JP) = JS × Skala.',
                rumus: 'Skala = JP : JS  (Semua dalam satuan cm)',
                contoh: 'JP = 5 cm, JS = 25 km = 2.500.000 cm. Skala = 5 : 2.500.000 = 1 : 500.000'
              },
              {
                subjudul: 'Perbandingan Senilai',
                konten: 'Jika nilai A naik, nilai B juga naik dengan kelipatan yang sama (misal: jumlah buku dan harga total).',
                contoh: 'Harga 3 buku Rp15.000. Harga 7 buku = (7/3) × 15.000 = Rp35.000.'
              }
            ],
            contohSoal: {
              soal: 'Jarak kota P dan Q pada peta berskala 1 : 1.200.000 adalah 4 cm. Jarak sebenarnya adalah...',
              penjelasan: 'JS = JP / Skala = 4 × 1.200.000 cm = 4.800.000 cm = 48 km.'
            },
            tipsJuara: 'Ingat tangga konversi: dari km ke cm turun 5 tangga, artinya dikali 100.000 (tambah 5 nol)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Perbandingan uang Ani dan Budi adalah 3 : 5. Jika jumlah uang mereka Rp80.000, berapa uang Ani?',
                pilihan: ['Rp20.000', 'Rp30.000', 'Rp40.000', 'Rp50.000'],
                jawabanBenar: 1,
                hint: 'Uang Ani = (3 / (3 + 5)) × 80.000 = (3/8) × 80.000.'
              },
              {
                id: 2,
                pertanyaan: 'Jarak sebenarnya 60 km. Jika digambar pada peta dengan skala 1 : 1.500.000, jarak pada peta adalah...',
                pilihan: ['2 cm', '4 cm', '6 cm', '8 cm'],
                jawabanBenar: 1,
                hint: 'Ubah 60 km ke cm (6.000.000 cm), lalu bagi dengan 1.500.000.'
              },
              {
                id: 3,
                pertanyaan: 'Skala peta 1 : 250.000. Jika jarak pada peta 6 cm, berapakah jarak sebenarnya dalam kilometer?',
                pilihan: ['12 km', '15 km', '25 km', '150 km'],
                jawabanBenar: 1,
                hint: '6 × 250.000 = 1.500.000 cm. Coret 5 nol untuk mengubah cm ke km.'
              }
            ]
          },
          {
            id: 'mtk_3',
            no: 3,
            judul: 'KPK dan FPB',
            ringkasan: 'Kelipatan Persekutuan Terkecil (KPK) dan Faktor Persekutuan Terbesar (FPB) dengan pohon faktor.',
            tujuan: 'Murid mampu menentukan KPK dan FPB dari dua atau tiga bilangan serta menyelesaikan soal cerita kontekstual.',
            konsepKunci: 'KPK: ambil semua faktor prima, jika ada yang sama ambil pangkat terbesar (soal ciri: "bersama-sama lagi"). FPB: ambil faktor prima yang sama saja dengan pangkat terkecil (soal ciri: "dibagi sama banyak").',
            uraianMateri: [
              {
                subjudul: 'Metode Faktorisasi Prima (Pohon Faktor)',
                konten: 'Bagi bilangan dengan bilangan prima (2, 3, 5, 7, 11...). Tuliskan faktorisasi prima dalam bentuk pangkat.',
                contoh: '24 = 2³ × 3; 36 = 2² × 3². FPB = 2² × 3 = 12; KPK = 2³ × 3² = 8 × 9 = 72.'
              },
              {
                subjudul: 'Kata Kunci Soal Cerita',
                konten: 'Soal KPK biasanya berkaitan dengan waktu: "bertemu bersama", "berlatih bersama lagi", "lampu menyala bersamaan". Soal FPB berkaitan dengan pembagian: "dibagi ke dalam kantong sama banyak", "jumlah kemasan terbanyak".'
              }
            ],
            contohSoal: {
              soal: 'Lampu A menyala setiap 6 detik, lampu B setiap 8 detik. Keduanya akan menyala bersamaan setiap... detik.',
              penjelasan: 'Gunakan KPK dari 6 dan 8. Faktorisasi: 6 = 2 × 3; 8 = 2³. KPK = 2³ × 3 = 8 × 3 = 24 detik.'
            },
            tipsJuara: 'Ingat: FPB = Faktor Paling Bawah (pangkat terkecil yang sama), KPK = Kumpulkan Semua (pangkat terbesar)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'FPB dari 30 dan 45 adalah...',
                pilihan: ['5', '10', '15', '90'],
                jawabanBenar: 2,
                hint: 'Faktorisasi: 30 = 2 × 3 × 5; 45 = 3² × 5. Ambil faktor persekutuan terkecil: 3 × 5.'
              },
              {
                id: 2,
                pertanyaan: 'Ali berenang setiap 4 hari sekali dan Budi setiap 6 hari sekali. Jika hari ini mereka berenang bersama, berapa hari lagi mereka bertemu kembali?',
                pilihan: ['8 hari', '10 hari', '12 hari', '24 hari'],
                jawabanBenar: 2,
                hint: 'Cari KPK dari 4 dan 6 (kelipatan 4: 4, 8, 12... dan 6: 6, 12...).'
              },
              {
                id: 3,
                pertanyaan: 'Ibu memiliki 20 kue lapis dan 30 kue bolu. Kue akan dimasukkan ke dalam piring dengan jumlah sama banyak. Berapa piring terbanyak yang dibutuhkan?',
                pilihan: ['5 piring', '10 piring', '15 piring', '20 piring'],
                jawabanBenar: 1,
                hint: 'Cari FPB dari 20 dan 30.'
              }
            ]
          },
          {
            id: 'mtk_4',
            no: 4,
            judul: 'Bilangan Pangkat',
            ringkasan: 'Operasi pangkat dua (kuadrat), akar kuadrat, pangkat tiga (kubik), dan akar pangkat tiga.',
            tujuan: 'Murid mampu menghitung kuadrat dan kubik bilangan serta menarik akar kuadrat dan akar kubik.',
            konsepKunci: 'a² = a × a. a³ = a × a × a. Akar pangkat tiga (∛) sangat erat kaitannya dengan mencari rusuk kubus dari volume yang diketahui (s = ∛V).',
            uraianMateri: [
              {
                subjudul: 'Daftar Bilangan Kuadrat & Kubik Dasar',
                konten: 'Hafalkan pangkat dasar 1-10: 1²=1, 2²=4, 3²=9, ..., 10²=100. Pangkat tiga dasar: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343, 8³=512, 9³=729, 10³=1000.'
              },
              {
                subjudul: 'Akar Pangkat Tiga Cepat',
                konten: 'Perhatikan digit satuan: 1→1, 2→8, 3→7, 4→4, 5→5, 6→6, 7→3, 8→2, 9→9, 0→0. Pisahkan 3 angka terakhir untuk mencari puluhan dan satuan.',
                contoh: '∛1.728 → pisahkan 1 dan 728. Depan: 1³ ≤ 1 (1). Satuan: 8 berpasangan dengan 2. Maka ∛1.728 = 12.'
              }
            ],
            contohSoal: {
              soal: 'Hasil dari 15² + ∛4.096 adalah...',
              penjelasan: '15² = 225. ∛4.096 = 16 (karena 16³ = 4.096). Maka 225 + 16 = 241.'
            },
            tipsJuara: 'Untuk akar pangkat tiga, hanya angka 2 berpasangan dengan 8 dan 3 berpasangan dengan 7 (jumlahnya 10). Sisanya angkanya sama!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Hasil dari 14² - 8² adalah...',
                pilihan: ['120', '132', '144', '168'],
                jawabanBenar: 1,
                hint: '14² = 196; 8² = 64. Kurangkan 196 - 64.'
              },
              {
                id: 2,
                pertanyaan: 'Sebuah kolam berbentuk kubus memiliki volume 3.375 liter. Panjang sisi kolam tersebut adalah...',
                pilihan: ['13 dm', '15 dm', '25 dm', '35 dm'],
                jawabanBenar: 1,
                hint: 'Panjang sisi kubus = ∛3.375. Angka belakang 5 pasangannya 5, angka depan 3 adalah 1.'
              },
              {
                id: 3,
                pertanyaan: 'Nilai dari ∛8.000 + 12² adalah...',
                pilihan: ['144', '164', '184', '224'],
                jawabanBenar: 1,
                hint: '∛8.000 = 20; 12² = 144. Jumlahkan 20 + 144.'
              }
            ]
          }
        ]
      },
      {
        id: 'mtk_geometri_pengukuran',
        namaElemen: '2. Pengukuran, Geometri & Bangun Ruang',
        deskripsi: 'Satuan ukuran, kecepatan, bangun datar, ruang, sudut, dan taksiran.',
        bab: [
          {
            id: 'mtk_5',
            no: 5,
            judul: 'Pengukuran',
            ringkasan: 'Konversi satuan panjang (km-mm), massa/berat (kg-mg), waktu (jam-detik), dan kuantitas (lusin, kodi, rim).',
            tujuan: 'Murid mampu mengonversi satuan ukuran baku dalam kehidupan sehari-hari.',
            konsepKunci: 'Tangga satuan: turun 1 tangga dikali 10, naik 1 tangga dibagi 10. Untuk satuan luas (m²): turun dikali 100. Satuan volume (m³): turun dikali 1.000. 1 liter = 1 dm³.',
            uraianMateri: [
              {
                subjudul: 'Satuan Kuantitas Populer',
                konten: '1 lusin = 12 buah; 1 gros = 12 lusin = 144 buah; 1 kodi = 20 lembar/helai; 1 rim = 500 lembar kertas.'
              },
              {
                subjudul: 'Satuan Berat & Volume',
                konten: '1 ton = 1.000 kg; 1 kuintal = 100 kg; 1 kg = 10 ons = 1.000 g; 1 liter = 1 dm³ = 1.000 ml = 1.000 cm³ (cc).'
              }
            ],
            contohSoal: {
              soal: 'Ibu membeli 2 kg tepung terigu, 500 gram gula pasir, dan 15 ons beras. Berapa gram berat total belanjaan Ibu?',
              penjelasan: '2 kg = 2.000 g. 500 g = 500 g. 15 ons = 1.500 g. Total = 2.000 + 500 + 1.500 = 4.000 gram.'
            },
            tipsJuara: 'Samakan semua satuan ke satuan yang ditanyakan pada pilihan ganda sebelum melakukan penjumlahan!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: '2,5 ton + 4 kuintal = ... kg.',
                pilihan: ['2.700 kg', '2.900 kg', '3.100 kg', '3.400 kg'],
                jawabanBenar: 1,
                hint: '2,5 ton = 2.500 kg; 4 kuintal = 400 kg. 2.500 + 400 = 2.900 kg.'
              },
              {
                id: 2,
                pertanyaan: 'Paman membeli 3 gros kancing baju. Jumlah kancing baju Paman adalah...',
                pilihan: ['36 buah', '360 buah', '432 buah', '600 buah'],
                jawabanBenar: 2,
                hint: '1 gros = 144 buah. 3 × 144 = 432 buah.'
              },
              {
                id: 3,
                pertanyaan: '3 jam 15 menit sama dengan berapa menit?',
                pilihan: ['180 menit', '195 menit', '205 menit', '215 menit'],
                jawabanBenar: 1,
                hint: '3 jam = 3 × 60 = 180 menit. 180 + 15 = 195 menit.'
              }
            ]
          },
          {
            id: 'mtk_6',
            no: 6,
            judul: 'Jarak, Waktu, dan kecepatan',
            ringkasan: 'Hubungan segitiga J-K-W (Jarak, Kecepatan, dan Waktu) serta pemecahan masalah perjalanan.',
            tujuan: 'Murid mampu menghitung kecepatan rata-rata, jarak tempuh, waktu keberangkatan dan waktu tiba.',
            konsepKunci: 'Rumus segitiga: Jarak (J) = Kecepatan (K) × Waktu (W); Kecepatan (K) = Jarak (J) / Waktu (W); Waktu (W) = Jarak (J) / Kecepatan (K).',
            uraianMateri: [
              {
                subjudul: 'Rumus Segitiga J-K-W',
                konten: 'J di puncak segitiga, K dan W di bawah. Tutup huruf yang dicari untuk menemukan rumusnya.',
                rumus: 'J = K × W   |   K = J : W   |   W = J : K',
                contoh: 'Jarak 120 km ditempuh dalam 2 jam. Kecepatan = 120 : 2 = 60 km/jam.'
              },
              {
                subjudul: 'Menghitung Waktu Tiba',
                konten: 'Waktu Tiba = Waktu Berangkat + Waktu Tempuh + Waktu Istirahat (jika ada).'
              }
            ],
            contohSoal: {
              soal: 'Pak Budi berkendara dengan kecepatan 60 km/jam. Jika ia menempuh jarak 150 km, berapa lama waktu perjalanannya?',
              penjelasan: 'Waktu = Jarak : Kecepatan = 150 : 60 = 2,5 jam = 2 jam 30 menit.'
            },
            tipsJuara: 'Jika hasil waktu pecahan seperti 0,5 jam, kalikan dengan 60 untuk mengubahnya ke menit (0,5 × 60 = 30 menit)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sebuah bus melaju dengan kecepatan 70 km/jam selama 3 jam. Berapa jarak yang ditempuh bus tersebut?',
                pilihan: ['140 km', '210 km', '240 km', '270 km'],
                jawabanBenar: 1,
                hint: 'Jarak = Kecepatan × Waktu = 70 × 3 = 210 km.'
              },
              {
                id: 2,
                pertanyaan: 'Kereta berangkat pukul 08.00 dan tiba pukul 11.30 menempuh jarak 210 km. Berapakah kecepatan rata-ratanya?',
                pilihan: ['50 km/jam', '60 km/jam', '65 km/jam', '70 km/jam'],
                jawabanBenar: 1,
                hint: 'Waktu tempuh = 3,5 jam. Kecepatan = 210 : 3,5 = 60 km/jam.'
              },
              {
                id: 3,
                pertanyaan: 'Jarak kota A ke B adalah 180 km. Dengan kecepatan 60 km/jam dan istirahat 30 menit, jika berangkat pukul 07.00 maka tiba pukul...',
                pilihan: ['10.00', '10.30', '11.00', '11.30'],
                jawabanBenar: 1,
                hint: 'Waktu perjalanan = 180 : 60 = 3 jam. Tambah istirahat 30 menit. 07.00 + 3 jam 30 menit = 10.30.'
              }
            ]
          },
          {
            id: 'mtk_7',
            no: 7,
            judul: 'Bangun datar',
            ringkasan: 'Sifat-sifat, keliling, luas bangun datar (persegi, persegi panjang, segitiga, jajar genjang, trapesium, lingkaran).',
            tujuan: 'Murid mampu menghitung luas dan keliling berbagai bangun datar serta bangun gabungan.',
            konsepKunci: 'Persegi (L = s², K = 4s); Persegi Panjang (L = p × l, K = 2(p+l)); Segitiga (L = ½ × a × t); Lingkaran (L = πr², K = 2πr = πd, dengan π = 22/7 atau 3,14).',
            uraianMateri: [
              {
                subjudul: 'Daftar Rumus Luas Bangun Datar',
                konten: '• Persegi: s × s\n• Persegi Panjang: p × l\n• Segitiga: ½ × alas × tinggi\n• Jajar Genjang: alas × tinggi\n• Trapesium: ½ × (a + b) × tinggi\n• Belah Ketupat & Layang-layang: ½ × d1 × d2\n• Lingkaran: π × r² (r = jari-jari, d = 2r)'
              }
            ],
            contohSoal: {
              soal: 'Sebuah lingkaran memiliki jari-jari 14 cm. Luas lingkaran tersebut adalah...',
              penjelasan: 'L = π × r² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 cm².'
            },
            tipsJuara: 'Gunakan π = 22/7 jika jari-jari kelipatan 7. Jika bukan kelipatan 7, gunakan π = 3,14.',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sebuah segitiga memiliki alas 12 cm dan tinggi 8 cm. Luas segitiga adalah...',
                pilihan: ['48 cm²', '96 cm²', '40 cm²', '24 cm²'],
                jawabanBenar: 0,
                hint: 'Luas = ½ × alas × tinggi = ½ × 12 × 8 = 48 cm².'
              },
              {
                id: 2,
                pertanyaan: 'Keliling persegi yang luasnya 81 cm² adalah...',
                pilihan: ['18 cm', '36 cm', '45 cm', '54 cm'],
                jawabanBenar: 1,
                hint: 'Cari sisi persegi: s = √81 = 9 cm. Keliling = 4 × 9 = 36 cm.'
              },
              {
                id: 3,
                pertanyaan: 'Panjang diameter lingkaran adalah 20 cm. Luas lingkaran tersebut adalah (π = 3,14)...',
                pilihan: ['62,8 cm²', '314 cm²', '628 cm²', '1.256 cm²'],
                jawabanBenar: 1,
                hint: 'Jari-jari r = 20 / 2 = 10 cm. Luas = 3,14 × 10 × 10 = 314 cm².'
              }
            ]
          },
          {
            id: 'mtk_8',
            no: 8,
            judul: 'Bangun ruang',
            ringkasan: 'Sifat, jaring-jaring, volume, dan luas permukaan kubus, balok, prisma, limas, dan tabung.',
            tujuan: 'Murid mampu menentukan sifat bangun ruang serta menghitung volume bangun ruang.',
            konsepKunci: 'Volume Prisma & Tabung = Luas Alas × Tinggi. Volume Limas & Kerucut = ⅓ × Luas Alas × Tinggi. Kubus: V = s³, Balok: V = p × l × t, Tabung: V = πr²t.',
            uraianMateri: [
              {
                subjudul: 'Karakteristik Bangun Ruang Utama',
                konten: '• Kubus: 6 sisi persegi sama, 12 rusuk sama panjang, 8 titik sudut.\n• Balok: 6 sisi (3 pasang sisi kongruen), 12 rusuk, 8 titik sudut.\n• Tabung: 3 sisi (2 lingkaran alas & tutup, 1 selimut melengkung), 2 rusuk lengkung, tidak memiliki titik sudut.'
              }
            ],
            contohSoal: {
              soal: 'Sebuah balok berukuran panjang 15 cm, lebar 8 cm, dan tinggi 10 cm. Volume balok adalah...',
              penjelasan: 'V = p × l × t = 15 × 8 × 10 = 1.200 cm³.'
            },
            tipsJuara: 'Semua bangun ruang yang memiliki alas dan tutup sama (kubus, balok, prisma, tabung) rumusnya selalu Luas Alas × Tinggi!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sebuah kubus memiliki panjang rusuk 7 cm. Volume kubus tersebut adalah...',
                pilihan: ['196 cm³', '294 cm³', '343 cm³', '441 cm³'],
                jawabanBenar: 2,
                hint: 'V = s³ = 7 × 7 × 7 = 343 cm³.'
              },
              {
                id: 2,
                pertanyaan: 'Banyak rusuk dan sisi pada bangun prisma segitiga berturut-turut adalah...',
                pilihan: ['9 dan 5', '6 dan 5', '9 dan 6', '12 dan 6'],
                jawabanBenar: 0,
                hint: 'Prisma segitiga memiliki 5 sisi (2 alas/tutup + 3 tegak) dan 9 rusuk.'
              },
              {
                id: 3,
                pertanyaan: 'Sebuah kaleng berbentuk tabung berjari-jari 7 cm dan tinggi 10 cm. Volume kaleng adalah...',
                pilihan: ['1.540 cm³', '1.450 cm³', '770 cm³', '2.200 cm³'],
                jawabanBenar: 0,
                hint: 'V = π × r² × t = (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1.540 cm³.'
              }
            ]
          },
          {
            id: 'mtk_9',
            no: 9,
            judul: 'Memahami Kartesius',
            ringkasan: 'Membaca dan menentukan koordinat titik (x, y) pada bidang kartesius dua dimensi.',
            tujuan: 'Murid mampu menentukan letak titik koordinat dan menggambarkan bangun datar pada bidang koordinat kartesius.',
            konsepKunci: 'Format titik selalu (x, y). Nilai x (absis) dibaca horizontal (kanan positif, kiri negatif). Nilai y (ordinat) dibaca vertikal (atas positif, bawah negatif).',
            uraianMateri: [
              {
                subjudul: 'Aturan Menulis Koordinat',
                konten: 'Langkah menentukan titik (x, y):\n1. Mulai dari titik pusat O (0,0).\n2. Geser mendatar sepanjang sumbu X ke kanan (+) atau ke kiri (-).\n3. Geser tegak sepanjang sumbu Y ke atas (+) atau ke bawah (-).',
                rumus: 'Titik P = (x, y)  →  (Sumbu Mendatar, Sumbu Tegak)'
              }
            ],
            contohSoal: {
              soal: 'Titik A(2, 1), B(6, 1), C(6, 4). Agar ABCD membentuk persegi panjang, koordinat titik D adalah...',
              penjelasan: 'Titik D sejajar dengan A pada sumbu Y (y=4) dan sejajar dengan A pada sumbu X (x=2). Maka koordinat D adalah (2, 4).'
            },
            tipsJuara: 'Ingat abjad: X duluan baru Y! X mendatar (tidur), Y tegak (berdiri)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Jika titik K terletak 4 satuan ke kanan dari titik O dan 3 satuan ke atas, maka koordinat titik K adalah...',
                pilihan: ['(3, 4)', '(4, 3)', '(-4, 3)', '(4, -3)'],
                jawabanBenar: 1,
                hint: 'Kanan = x positif (+4), atas = y positif (+3). Format: (x, y).'
              },
              {
                id: 2,
                pertanyaan: 'Titik yang memiliki absis -2 dan ordinat 5 ditulis...',
                pilihan: ['(5, -2)', '(-2, 5)', '(-2, -5)', '(2, 5)'],
                jawabanBenar: 1,
                hint: 'Absis adalah x, ordinat adalah y. Format: (absis, ordinat).'
              },
              {
                id: 3,
                pertanyaan: 'Diketahui titik P(1, 2), Q(5, 2), R(3, 6). Jika ketiga titik dihubungkan akan membentuk bangun...',
                pilihan: ['Persegi', 'Segitiga sama kaki', 'Jajar genjang', 'Trapesium'],
                jawabanBenar: 1,
                hint: 'P dan Q berada pada garis mendatar y=2, R berada di tengah-tengah x=3 di atasnya.'
              }
            ]
          },
          {
            id: 'mtk_10',
            no: 10,
            judul: 'Pengelolaan Data',
            ringkasan: 'Statistika dasar: penyajian data (tabel, diagram batang/lingkaran), mean (rata-rata), median, dan modus.',
            tujuan: 'Murid mampu membaca diagram serta menghitung nilai rata-rata, median, dan modus kumpulan data.',
            konsepKunci: 'Mean = Jumlah seluruh data ÷ Banyak data. Modus = Nilai yang paling sering muncul. Median = Nilai tengah setelah data diurutkan dari yang terkecil.',
            uraianMateri: [
              {
                subjudul: '3 Ukuran Pemusatan Data',
                konten: '• Mean (Rata-rata): Jumlah nilai / banyak data\n• Median (Nilai Tengah): Urutkan data dari terkecil ke terbesar, ambil nilai tepat di tengah.\n• Modus (Nilai Terbanyak): Data dengan frekuensi kemunculan tertinggi.'
              }
            ],
            contohSoal: {
              soal: 'Nilai ulangan matematika: 7, 8, 6, 9, 8, 8, 7. Tentukan mean dan modusnya!',
              penjelasan: 'Mean = (7+8+6+9+8+8+7) ÷ 7 = 53 ÷ 7 = 7,57. Modus = 8 (muncul 3 kali).'
            },
            tipsJuara: 'Untuk mencari median, WAJIB urutkan data dari yang terkecil ke terbesar terlebih dahulu!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Data nilai: 6, 7, 8, 8, 9, 10. Nilai rata-rata (mean) data tersebut adalah...',
                pilihan: ['7,5', '8,0', '8,5', '9,0'],
                jawabanBenar: 1,
                hint: '(6 + 7 + 8 + 8 + 9 + 10) ÷ 6 = 48 ÷ 6 = 8.'
              },
              {
                id: 2,
                pertanyaan: 'Data berat badan (kg): 32, 35, 30, 32, 34, 32, 35. Modus dari data tersebut adalah...',
                pilihan: ['30 kg', '32 kg', '34 kg', '35 kg'],
                jawabanBenar: 1,
                hint: 'Nilai 32 muncul paling banyak, yaitu sebanyak 3 kali.'
              },
              {
                id: 3,
                pertanyaan: 'Median dari data: 5, 8, 6, 9, 7 adalah...',
                pilihan: ['6', '7', '8', '9'],
                jawabanBenar: 1,
                hint: 'Urutkan data: 5, 6, 7, 8, 9. Angka tepat di tengah adalah 7.'
              }
            ]
          },
          {
            id: 'mtk_11',
            no: 11,
            judul: 'Besar Sudut',
            ringkasan: 'Jenis-jenis sudut (lancip, siku-siku, tumpul, lurus), pengukuran sudut dengan busur derajat, sudut segitiga dan segi empat.',
            tujuan: 'Murid mampu mengidentifikasi jenis sudut serta menghitung besar sudut yang belum diketahui pada bangun datar.',
            konsepKunci: 'Sudut Lancip (< 90°), Sudut Siku-siku (= 90°), Sudut Tumpul (> 90° dan < 180°), Sudut Lurus (= 180°). Jumlah sudut dalam segitiga = 180°. Jumlah sudut dalam segi empat = 360°.',
            uraianMateri: [
              {
                subjudul: 'Klasifikasi Derajat Sudut',
                konten: '• Sudut Lancip: 0° < x < 90°\n• Sudut Siku-siku: Tepat 90° (biasanya diberi tanda kotak kecil)\n• Sudut Tumpul: 90° < x < 180°\n• Sudut Lurus: Tepat 180°\n• Sudut Satu Putaran Penuh: 360°'
              },
              {
                subjudul: 'Aturan Sudut Segitiga & Segi Empat',
                konten: 'Jumlah ketiga sudut dalam segitiga selalu 180°. Sudut A + Sudut B + Sudut C = 180°. Jumlah keempat sudut dalam segi empat selalu 360°.'
              }
            ],
            contohSoal: {
              soal: 'Sebuah segitiga memiliki dua sudut berukuran 55° dan 65°. Besar sudut ketiga adalah...',
              penjelasan: 'Sudut ketiga = 180° - (55° + 65°) = 180° - 120° = 60°.'
            },
            tipsJuara: 'Sudut pada jarum jam: tiap lompatan 1 angka (5 menit) bernilai 30° (360° ÷ 12 = 30°)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sudut yang besarnya 125° termasuk jenis sudut...',
                pilihan: ['Lancip', 'Siku-siku', 'Tumpul', 'Refleks'],
                jawabanBenar: 2,
                hint: 'Sudut antara 90° dan 180° disebut sudut tumpul.'
              },
              {
                id: 2,
                pertanyaan: 'Segitiga siku-siku memiliki salah satu sudut 40°. Besar sudut lainnya adalah...',
                pilihan: ['40°', '50°', '60°', '90°'],
                jawabanBenar: 1,
                hint: 'Segitiga siku-siku memiliki satu sudut 90°. Sudut ketiga = 180° - 90° - 40° = 50°.'
              },
              {
                id: 3,
                pertanyaan: 'Sudut terkecil yang dibentuk oleh kedua jarum jam pada pukul 03.00 adalah...',
                pilihan: ['45°', '60°', '90°', '120°'],
                jawabanBenar: 2,
                hint: 'Pukul 03.00 jarum panjang di 12 dan pendek di 3 (3 lompatan × 30° = 90°).'
              }
            ]
          },
          {
            id: 'mtk_12',
            no: 12,
            judul: 'Penaksiran Ukuran',
            ringkasan: 'Teknik pembulatan bilangan ke satuan, puluhan, dan ratusan terdekat serta taksiran operasi hitung.',
            tujuan: 'Murid mampu memperkirakan dan menaksir hasil perhitungan numerik secara cepat dan logis.',
            konsepKunci: 'Aturan Pembulatan: jika angka di belakangnya < 5 (0, 1, 2, 3, 4) dibulatkan ke bawah; jika angka di belakangnya ≥ 5 (5, 6, 7, 8, 9) dibulatkan ke atas.',
            uraianMateri: [
              {
                subjudul: 'Macam-Macam Taksiran',
                konten: '• Taksiran Atas: Semua bilangan dibulatkan ke atas.\n• Taksiran Bawah: Semua bilangan dibulatkan ke bawah.\n• Taksiran Terbaik (Umum): Mengikuti kaidah matematika (≥ 5 ke atas, < 5 ke bawah).'
              }
            ],
            contohSoal: {
              soal: 'Taksiran terbaik ke puluhan terdekat dari 47 × 23 adalah...',
              penjelasan: '47 dibulatkan ke puluhan terdekat menjadi 50. 23 dibulatkan menjadi 20. Taksiran = 50 × 20 = 1.000.'
            },
            tipsJuara: 'Bulatkan terlebih dahulu masing-masing bilangan sebelum mengalikan atau membaginya!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Hasil pembulatan bilangan 3.648 ke ratusan terdekat adalah...',
                pilihan: ['3.600', '3.650', '3.700', '4.000'],
                jawabanBenar: 0,
                hint: 'Perhatikan angka puluhan (4). Karena 4 < 5, dibulatkan ke bawah menjadi 3.600.'
              },
              {
                id: 2,
                pertanyaan: 'Taksiran terbaik dari 189 + 312 ke ratusan terdekat adalah...',
                pilihan: ['400', '500', '600', '700'],
                jawabanBenar: 1,
                hint: '189 dibulatkan jadi 200, 312 dibulatkan jadi 300. 200 + 300 = 500.'
              },
              {
                id: 3,
                pertanyaan: 'Taksiran terbaik dari 82 : 19 ke puluhan terdekat adalah...',
                pilihan: ['3', '4', '5', '6'],
                jawabanBenar: 1,
                hint: '82 dibulatkan jadi 80, 19 dibulatkan jadi 20. 80 : 20 = 4.'
              }
            ]
          }
        ]
      }
    ]
  },
  bahasa_indonesia: {
    title: 'Bahasa Indonesia',
    icon: 'BookOpen',
    deskripsi: '21 Materi Pokok Standar TKA SD: Ejaan, Tata Bahasa, Kosakata, Sastra, dan Pemahaman Analisis Teks.',
    elemen: [
      {
        id: 'bi_ejaan_tatabahasa',
        namaElemen: '1. Ejaan, Tanda Baca & Tata Bahasa',
        deskripsi: 'Kaidah penulisan baku PUEBI/EYD, kata depan, tanda baca, imbuhan, frasa, dan kalimat.',
        bab: [
          {
            id: 'bi_1',
            no: 1,
            judul: 'Penulisan Huruf Kapital',
            ringkasan: 'Kaidah pemakaian huruf kapital pada awal kalimat, nama diri, geografi, hari/bulan, dan sapaan.',
            tujuan: 'Murid mampu menggunakan huruf kapital secara tepat sesuai kaidah EYD edisi V.',
            konsepKunci: 'Huruf kapital digunakan pada: awal kalimat, nama orang, gelar kehormatan diikuti nama, nama bangsa/suku/bahasa, nama tahun/bulan/hari raya, nama geografi (sungai, gunung, kota).',
            uraianMateri: [
              {
                subjudul: 'Aturan Penting Huruf Kapital',
                konten: '• Huruf pertama awal kalimat: Dia membaca buku.\n• Nama orang dan julukan: Amir Hamzah, Haji Agus Salim.\n• Nama geografi: Sungai Musi, Danau Toba, Pulau Bali (tetapi: berlayar ke teluk).\n• Nama hari dan bulan: hari Senin, bulan Agustus, Idulfitri.'
              }
            ],
            contohSoal: {
              soal: 'Perbaiki kalimat: "pada hari senin, paman pergi ke kota bandung."',
              penjelasan: 'Huruf kapital dipakai pada awal kalimat (Pada), nama hari (Senin), dan nama kota (Bandung): "Pada hari Senin, paman pergi ke kota Bandung."'
            },
            tipsJuara: 'Nama jenis/buah tidak memakai kapital (jeruk bali, pisang ambon, kunci inggris)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Penulisan huruf kapital yang benar adalah...',
                pilihan: [
                  'Presiden joko widodo berkunjung ke papua.',
                  'Ibu membeli gula Jawa di pasar.',
                  'Upacara kemerdekaan diadakan pada hari Senin.',
                  'Kami berenang di sungai musi.'
                ],
                jawabanBenar: 2,
                hint: 'Nama hari (Senin) diawali huruf kapital.'
              },
              {
                id: 2,
                pertanyaan: 'Manakah nama geografi yang ditulis secara tepat?',
                pilihan: ['gunung Merapi', 'Danau toba', 'Selat Sunda', 'pulau Madura'],
                jawabanBenar: 2,
                hint: 'Keduanya harus diawali kapital: Selat Sunda.'
              },
              {
                id: 3,
                pertanyaan: 'Penulisan nama dan gelar yang benar adalah...',
                pilihan: ['dr. Wahidin Sudirohusodo', 'Dr. wahidin Sudirohusodo', 'dr. wahidin sudirohusodo', 'Dr. Wahidin sudirohusodo'],
                jawabanBenar: 0,
                hint: 'Gelar dokter ditulis dr. diikuti nama orang yang berhuruf kapital.'
              }
            ]
          },
          {
            id: 'bi_2',
            no: 2,
            judul: 'Penulisan Kata Depan: dari, di, ke',
            ringkasan: 'Membedakan penulisan kata depan (dipisah) dengan awalan di- dan ke- (digabung).',
            tujuan: 'Murid mampu membedakan kata depan tempat dan awalan pembentuk kata kerja pasif.',
            konsepKunci: 'Kata depan (di, ke, dari) DITULIS TERPISAH jika menunjukkan tempat atau arah (di sekolah, ke pasar, dari rumah). Awalan (di-, ke-) DITULIS SERANGKAI pada kata kerja pasif (dimakan, ditulis, ketua).',
            uraianMateri: [
              {
                subjudul: 'Uji Sederhana "Bisa Diganti Me-"',
                konten: 'Jika kata tersebut bisa diganti dengan awalan "me-", maka itu adalah awalan kata kerja sehingga DITULIS SERANGKAI.\nContoh: dimakan → memakan (serangkai). Sedangkan "di sekolah" tidak bisa diubah jadi "menyekolah" (dipisah).'
              }
            ],
            contohSoal: {
              soal: 'Tentukan penulisan: "Buku itu di simpan di atas meja oleh Budi."',
              penjelasan: '"di simpan" salah karena kata kerja (harus "disimpan"). "di atas" benar karena menunjukkan posisi/tempat.'
            },
            tipsJuara: 'Jika setelah kata "di/ke/dari" adalah kata tempat/arah (atas, bawah, rumah, sekolah), maka WAJIB DIPISAH!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Penulisan kata depan yang benar terdapat pada kalimat...',
                pilihan: [
                  'Adik sedang belajar dikamar tidur.',
                  'Ayah baru saja pulang dari kantor.',
                  'Surat itu dimasukan kedalam amplop.',
                  'Ibu pergi kepasar membeli sayur.'
                ],
                jawabanBenar: 1,
                hint: '"dari kantor" menunjukkan tempat asal dan ditulis terpisah.'
              },
              {
                id: 2,
                pertanyaan: 'Kata berawalan "di-" yang ditulis serangkai secara benar adalah...',
                pilihan: ['di dapur', 'di baca', 'dilarang', 'di lemari'],
                jawabanBenar: 2,
                hint: '"dilarang" adalah kata kerja pasif dari "melarang", jadi ditulis serangkai.'
              },
              {
                id: 3,
                pertanyaan: 'Kalimat berikut yang tepat penulisannya adalah...',
                pilihan: [
                  'Lukisan itu di pajang didinding.',
                  'Lukisan itu dipajang di dinding.',
                  'Lukisan itu dipajang didinding.',
                  'Lukisan itu di pajang di dinding.'
                ],
                jawabanBenar: 1,
                hint: '"dipajang" serangkai (kata kerja), "di dinding" terpisah (tempat).'
              }
            ]
          },
          {
            id: 'bi_3',
            no: 3,
            judul: 'Pemakaian Tanda Baca',
            ringkasan: 'Fungsi dan kaidah pemakaian tanda titik (.), koma (,), titik dua (:), tanda petik ("..."), dan tanda tanya/seru.',
            tujuan: 'Murid mampu menempatkan tanda baca secara tepat dalam kalimat langsung, rincian, dan penutup.',
            konsepKunci: 'Tanda koma (,) digunakan untuk rincian lebih dari dua hal dan memisahkan petikan langsung. Titik dua (:) digunakan sebelum rincian lengkap. Tanda petik ("...") mengapit petikan langsung.',
            uraianMateri: [
              {
                subjudul: 'Fungsi Tanda Baca Utama',
                konten: '• Titik (.): Akhir kalimat pernyataan, pemisah jam & menit (07.30), singkatan.\n• Koma (,): Rincian (buku, pensil, dan tas), sebelum kata hubung pertentangan (tetapi, melainkan).\n• Petik ("..."): Kalimat langsung. Contoh: Ibu berkata, "Cepat mandi!"'
              }
            ],
            contohSoal: {
              soal: 'Perbaiki kalimat: "Ibu membeli apel mangga dan jeruk"',
              penjelasan: 'Perlu tanda koma di antara rincian: "Ibu membeli apel, mangga, dan jeruk."'
            },
            tipsJuara: 'Dalam rincian bahasa Indonesia baku, sebelum kata "dan" wajib diberi tanda koma (A, B, dan C)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Penggunaan tanda baca yang benar terdapat pada kalimat...',
                pilihan: [
                  'Ibu membeli bayam, wortel, dan tomat.',
                  'Ibu membeli bayam wortel dan tomat.',
                  'Ibu membeli bayam, wortel dan tomat.',
                  'Ibu membeli: bayam, wortel, dan tomat'
                ],
                jawabanBenar: 0,
                hint: 'Rincian baku menggunakan koma sebelum konjungsi "dan".'
              },
              {
                id: 2,
                pertanyaan: 'Penulisan kalimat langsung yang tepat adalah...',
                pilihan: [
                  '"Kapan kita berangkat"? tanya Doni.',
                  '"Kapan kita berangkat?" tanya Doni.',
                  '"Kapan kita berangkat?" Tanya Doni.',
                  'Kapan kita berangkat? "tanya Doni."'
                ],
                jawabanBenar: 1,
                hint: 'Tanda tanya berada di dalam tanda petik penutup, dan kata "tanya" berhuruf kecil.'
              },
              {
                id: 3,
                pertanyaan: 'Tanda titik dua (:) dipakai secara tepat pada kalimat...',
                pilihan: [
                  'Kita memerlukan: kursi, meja, dan lemari.',
                  'Alat yang diperlukan: kuas, kanvas, dan cat air.',
                  'Ayah membaca: koran.',
                  'Saya suka: buah mangga.'
                ],
                jawabanBenar: 1,
                hint: 'Titik dua digunakan jika didahului pernyataan pengantar lengkap.'
              }
            ]
          },
          {
            id: 'bi_4',
            no: 4,
            judul: 'Kata Berimbuhan',
            ringkasan: 'Morfologi awalan (me-, ber-, di-, ter-), akhiran (-an, -kan, -i), serta peluluhan fonem K, T, S, P.',
            tujuan: 'Murid mampu membentuk kata berimbuhan dengan tepat dan memahami kaidah peluluhan K-T-S-P.',
            konsepKunci: 'Fonem K, T, S, P luluh jika mendapat awalan me- atau pe-, dengan syarat huruf kedua kata dasar adalah huruf vokal. Contoh: me + kirim = mengirim (luluh), me + kritik = mengkritik (tidak luluh karena huruf kedua konsonan r).',
            uraianMateri: [
              {
                subjudul: 'Kaidah Peluluhan K-T-S-P',
                konten: '• me- + [K] + vokal → meng-... (me + karang = mengarang)\n• me- + [T] + vokal → men-... (me + tulis = menulis)\n• me- + [S] + vokal → meny-... (me + sapu = menyapu)\n• me- + [P] + vokal → mem-... (me + potong = memotong)'
              }
            ],
            contohSoal: {
              soal: 'Bentuk kata yang benar dari me- + pesona adalah...',
              penjelasan: 'Huruf P luluh menjadi m karena huruf kedua adalah huruf vokal (e): memesona (bukan mempesona).'
            },
            tipsJuara: 'Ingat kata baku: memesona, memengaruhi, mengubah, menyontek (K, T, S, P luluh)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Bentuk bentukan kata yang baku menurut KBBI adalah...',
                pilihan: ['Mempesona', 'Memesona', 'Mempersilahkan', 'Menterjemahkan'],
                jawabanBenar: 1,
                hint: 'Fonem P pada pesona luluh menjadi memesona.'
              },
              {
                id: 2,
                pertanyaan: 'Awalan me- pada kata "mengkritik" tidak mengalami peluluhan karena...',
                pilihan: [
                  'Kata dasar diawali dua huruf konsonan (kr-)',
                  'Merupakan kata serapan',
                  'Termasuk kata benda',
                  'Kata dasar berawalan huruf k'
                ],
                jawabanBenar: 0,
                hint: 'Gugus konsonan seperti kr, pr, tr, sp tidak mengalami peluluhan.'
              },
              {
                id: 3,
                pertanyaan: 'Kata dasar dari kata berimbuhan "penglihatan" adalah...',
                pilihan: ['Kelihatan', 'Lihat', 'Melihat', 'Hati'],
                jawabanBenar: 1,
                hint: 'Imbuhan peng- -an melekat pada kata dasar lihat.'
              }
            ]
          },
          {
            id: 'bi_5',
            no: 5,
            judul: 'Frasa (Kelompok Kata)',
            ringkasan: 'Gabungan dua kata atau lebih yang bersifat nonpredikatif dan menduduki satu fungsi kalimat.',
            tujuan: 'Murid mampu mengidentifikasi frasa nominal, verbal, dan adjektival dalam kalimat.',
            konsepKunci: 'Frasa tidak memiliki predikat sendiri. Contoh: "buku cerita tebal" (frasa benda), "sedang makan siang" (frasa kerja), "sangat indah sekali" (frasa sifat).',
            uraianMateri: [
              {
                subjudul: 'Jenis-Jenis Frasa',
                konten: '• Frasa Nominal: Inti berupa kata benda (rumah besar, sepatu baru).\n• Frasa Verbal: Inti berupa kata kerja (sedang tidur, akan berangkat).\n• Frasa Adjektival: Inti berupa kata sifat (sangat pandai, agak mahal).'
              }
            ],
            contohSoal: {
              soal: 'Pada kalimat "Kakak memakai baju baru", manakah yang merupakan frasa?',
              penjelasan: '"baju baru" adalah frasa nominal yang menduduki jabatan objek.'
            },
            tipsJuara: 'Frasa tidak boleh mengandung Subjek + Predikat utuh (karena itu sudah menjadi klausa/kalimat)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Kelompok kata di bawah ini yang merupakan frasa adalah...',
                pilihan: ['Ibu memasak', 'Buku tulis baru', 'Adik menangis', 'Burung terbang'],
                jawabanBenar: 1,
                hint: '"Buku tulis baru" adalah gabungan kata tanpa predikat.'
              },
              {
                id: 2,
                pertanyaan: 'Frasa "sedang belajar" termasuk ke dalam jenis frasa...',
                pilihan: ['Nominal', 'Verbal', 'Adjektival', 'Numeralia'],
                jawabanBenar: 1,
                hint: 'Kata intinya adalah "belajar" yang merupakan kata kerja.'
              },
              {
                id: 3,
                pertanyaan: 'Contoh frasa adjektival (kata sifat) adalah...',
                pilihan: ['Rumah mewah', 'Sangat ramah', 'Tiga ekor', 'Di sekolah'],
                jawabanBenar: 1,
                hint: '"Ramah" adalah kata sifat yang diperkuat dengan kata "sangat".'
              }
            ]
          },
          {
            id: 'bi_6',
            no: 6,
            judul: 'Makna Kata',
            ringkasan: 'Makna leksikal (kamus), gramatikal (imbuhan), makna denotatif (sebenarnya) dan konotatif (kiasan).',
            tujuan: 'Murid mampu membedakan makna sebenarnya dan makna kiasan dalam konteks bacaan.',
            konsepKunci: 'Denotatif = makna lugas sesuai kamus apa adanya. Konotatif = makna kiasan atau nilai rasa tambahan.',
            uraianMateri: [
              {
                subjudul: 'Contoh Denotatif vs Konotatif',
                konten: '• Denotatif: Ibu memotong ekor kambing (ekor hewan sebenarnya).\n• Konotatif: Budi menjadi ekor dalam kelompok itu (orang yang selalu mengekor/mengikuti).'
              }
            ],
            contohSoal: {
              soal: 'Kalimat yang bermakna konotatif adalah...',
              penjelasan: '"Ia menjadi kambing hitam dalam masalah itu." Kambing hitam di sini bermakna orang yang disalahkan.'
            },
            tipsJuara: 'Perhatikan konteks kalimat: jika tidak masuk akal secara fisik, artinya kata tersebut bermakna konotatif/kiasan!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Kalimat berikut yang mengandung kata bermakna denotatif (sebenarnya) adalah...',
                pilihan: [
                  'Tangan kanannya terluka kena pisau.',
                  'Pak RT adalah tangan kanan kepala desa.',
                  'Ia memiliki hati yang dingin.',
                  'Masalah itu diselesaikan dengan kepala dingin.'
                ],
                jawabanBenar: 0,
                hint: '"Tangan kanan" pada opsi A bermakna anggota tubuh sebelah kanan.'
              },
              {
                id: 2,
                pertanyaan: 'Makna kata "bintang kelas" adalah...',
                pilihan: ['Benda langit di kelas', 'Siswa terpandai di kelas', 'Lampu hiasan kelas', 'Ketua kelas'],
                jawabanBenar: 1,
                hint: 'Bintang melambangkan keunggulan atau kecemerlangan prestasi.'
              },
              {
                id: 3,
                pertanyaan: 'Kata "meja hijau" bermakna kiasan yang berarti...',
                pilihan: ['Meja makan warna hijau', 'Pengadilan', 'Ruang rapat', 'Taman bermain'],
                jawabanBenar: 1,
                hint: 'Meja hijau adalah istilah hukum untuk pengadilan.'
              }
            ]
          },
          {
            id: 'bi_7',
            no: 7,
            judul: 'Ungkapan',
            ringkasan: 'Kumpulan ungkapan tradisional (idiom) bahasa Indonesia beserta arti dan penerapannya.',
            tujuan: 'Murid memahami arti ungkapan populer yang sering muncul pada soal cerita fiksi TKA SD.',
            konsepKunci: 'Ungkapan adalah gabungan dua kata atau lebih yang membentuk makna baru dan tidak dapat diartikan per kata.',
            uraianMateri: [
              {
                subjudul: 'Daftar Ungkapan Populer TKA SD',
                konten: '• Buah tangan: Oleh-oleh\n• Buah bibir: Bahan pembicaraan orang banyak\n• Kutu buku: Orang yang sangat suka membaca buku\n• Panjang tangan: Suka mencuri\n• Lapang dada: Ikhlas / sabar menerima keadaan\n• Gulung tikar: Bangkrut'
              }
            ],
            contohSoal: {
              soal: 'Paman pulang dari Surabaya membawa buah tangan. Arti buah tangan adalah...',
              penjelasan: 'Buah tangan adalah ungkapan yang berarti oleh-oleh.'
            },
            tipsJuara: 'Hafalkan makna ungkapan umum agar bisa menjawab soal cerita dengan cepat tanpa ragu!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Rani selalu bersikap tenang saat menghadapi masalah. Sikap Rani mencerminkan ungkapan...',
                pilihan: ['Tinggi hati', 'Kepala dingin', 'Besar kepala', 'Bermuka dua'],
                jawabanBenar: 1,
                hint: 'Kepala dingin bermakna tenang dan tidak terburu-buru emosi.'
              },
              {
                id: 2,
                pertanyaan: 'Arti ungkapan "tinggi hati" adalah...',
                pilihan: ['Sombong', 'Dermawan', 'Pintar', 'Tinggi badan'],
                jawabanBenar: 0,
                hint: 'Tinggi hati sama artinya dengan sombong atau congkak.'
              },
              {
                id: 3,
                pertanyaan: 'Meskipun nilainya belum memuaskan, Dedi menerima hasil itu dengan lapang dada. Lapang dada artinya...',
                pilihan: ['Marah', 'Ikhlas dan sabar', 'Sedih', 'Kecewa'],
                jawabanBenar: 1,
                hint: 'Lapang dada bermakna berbesar hati dan ikhlas menerima kenyataan.'
              }
            ]
          },
          {
            id: 'bi_8',
            no: 8,
            judul: 'Sinonim dan Antonim',
            ringkasan: 'Persamaan kata (sinonim) dan lawan kata (antonim) dalam teks bacaan.',
            tujuan: 'Murid mampu mencari padanan kata dan lawan kata yang sesuai konteks kalimat.',
            konsepKunci: 'Sinonim = persamaan makna (misal: pandai = pintar). Antonim = pertentangan makna (misal: rajin >< malas).',
            uraianMateri: [
              {
                subjudul: 'Daftar Sinonim & Antonim Penting',
                konten: '• Asli >< Tiruan (Palsu)\n• Canggih = Modern >< Kuno (Tradisional)\n• Hemat = Irit >< Boros\n• Faktual = Nyata >< Fiktif (Rekaan)\n• Mandiri >< Bergantung'
              }
            ],
            contohSoal: {
              soal: 'Sinonim kata "sukacita" adalah...',
              penjelasan: 'Sukacita memiliki persamaan makna dengan kegembiraan atau kebahagiaan.'
            },
            tipsJuara: 'Masukkan pilihan jawaban langsung ke dalam kalimat soal untuk menguji apakah artinya tetap nyambung!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Antonim dari kata "sukarela" adalah...',
                pilihan: ['Ikhlas', 'Paksaan', 'Gembira', 'Senang'],
                jawabanBenar: 1,
                hint: 'Sukarela berarti atas kehendak sendiri tanpa paksaan, lawan katanya adalah terpaksa/paksaan.'
              },
              {
                id: 2,
                pertanyaan: 'Sinonim kata "pesat" pada kalimat "Pembangunan desa itu berkembang pesat" adalah...',
                pilihan: ['Lambat', 'Cepat', 'Mundur', 'Tenang'],
                jawabanBenar: 1,
                hint: 'Pesat berarti maju dengan sangat cepat.'
              },
              {
                id: 3,
                pertanyaan: 'Lawan kata dari "tradisional" adalah...',
                pilihan: ['Kuno', 'Zaman dulu', 'Modern', 'Lama'],
                jawabanBenar: 2,
                hint: 'Modern adalah antonim dari tradisional.'
              }
            ]
          },
          {
            id: 'bi_9',
            no: 9,
            judul: 'Kata dalam Bahasa Indonesia',
            ringkasan: 'Klasifikasi kelas kata: nomina (kata benda), verba (kata kerja), adjektiva (kata sifat), numeralia, dan konjungsi.',
            tujuan: 'Murid mampu membedakan jenis kata berdasarkan fungsi gramatikalnya.',
            konsepKunci: 'Nomina: dapat diingkari dengan "bukan" (bukan meja). Adjektiva: dapat diberi keterangan pembanding "sangat/lebih" (sangat pandai). Verba: kata kerja aksi (berlari, menulis).',
            uraianMateri: [
              {
                subjudul: 'Penggolongan Kelas Kata Utama',
                konten: '• Kata Benda (Nomina): Meja, sekolah, kucing, udara.\n• Kata Kerja (Verba): Berlari, membaca, menyiram.\n• Kata Sifat (Adjektiva): Cantik, bersih, malas, pintar.\n• Kata Hubung (Konjungsi): Dan, atau, tetapi, karena, sehingga.'
              }
            ],
            contohSoal: {
              soal: 'Kata "menyeberang" termasuk ke dalam kelas kata...',
              penjelasan: '"menyeberang" adalah kata kerja (verba) yang menyatakan tindakan.'
            },
            tipsJuara: 'Coba tambahkan kata "sangat". Jika cocok (sangat bersih), berarti itu kata sifat!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Kata di bawah ini yang tergolong kata sifat (adjektiva) adalah...',
                pilihan: ['Melihat', 'Rumah', 'Indah', 'Berlari'],
                jawabanBenar: 2,
                hint: 'Dapat diberi kata "sangat indah", jadi merupakan kata sifat.'
              },
              {
                id: 2,
                pertanyaan: 'Kelompok kata benda (nomina) yang benar adalah...',
                pilihan: ['Pohon, pensil, tas', 'Tidur, makan, minum', 'Sangat, agak, paling', 'Cepat, lambat, tinggi'],
                jawabanBenar: 0,
                hint: 'Pohon, pensil, dan tas adalah nama benda/objek.'
              },
              {
                id: 3,
                pertanyaan: 'Kata tugas yang berfungsi menghubungkan dua klausa setara adalah...',
                pilihan: ['Di', 'Ke', 'Dan', 'Dari'],
                jawabanBenar: 2,
                hint: '"Dan" adalah konjungsi penghubung.'
              }
            ]
          },
          {
            id: 'bi_10',
            no: 10,
            judul: 'Kalimat',
            ringkasan: 'Struktur pola kalimat dasar (S-P-O-K), jenis kalimat (berita, tanya, perintah), dan ciri kalimat efektif.',
            tujuan: 'Murid mampu menganalisis pola kalimat S-P-O-K dan menyusun kalimat efektif.',
            konsepKunci: 'Kalimat efektif: hemat kata, logis, memiliki subjek dan predikat yang jelas, serta tidak ambigu.',
            uraianMateri: [
              {
                subjudul: 'Unsur Kalimat SPOK',
                konten: '• Subjek (S): Pelaku atau pokok bahasan (Budi)\n• Predikat (P): Tindakan atau keadaan subjek (membaca)\n• Objek (O): Hal yang dikenai tindakan (buku cerita)\n• Keterangan (K): Tempat/waktu/cara (di perpustakaan)'
              }
            ],
            contohSoal: {
              soal: 'Tentukan pola kalimat: "Ayah mencuci mobil di garasi."',
              penjelasan: 'Ayah (S) + mencuci (P) + mobil (O) + di garasi (K. Tempat) = S-P-O-K.'
            },
            tipsJuara: 'Kalimat efektif tidak boleh boros kata (salah: "Para siswa-siswa", benar: "Para siswa" atau "Siswa-siswa")!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Pola kalimat "Dokter memeriksa pasien di ruang klinik" adalah...',
                pilihan: ['S - P - O', 'S - P - O - K', 'S - P - K', 'K - S - P - O'],
                jawabanBenar: 1,
                hint: 'Dokter (S), memeriksa (P), pasien (O), di klinik (K).'
              },
              {
                id: 2,
                pertanyaan: 'Kalimat berikut yang merupakan kalimat efektif adalah...',
                pilihan: [
                  'Banyak anak-anak bermain di taman.',
                  'Anak-anak bermain di taman.',
                  'Anak-anak sangat bermain sekali di taman.',
                  'Banyak anak-anak sekali bermain di taman.'
                ],
                jawabanBenar: 1,
                hint: 'Hindari pemborosan kata "banyak" bersamaan dengan kata ulang "anak-anak".'
              },
              {
                id: 3,
                pertanyaan: 'Kalimat yang berfungsi meminta seseorang melakukan sesuatu disebut kalimat...',
                pilihan: ['Berita', 'Tanya', 'Perintah', 'Seru'],
                jawabanBenar: 2,
                hint: 'Kalimat perintah diakhiri tanda seru atau partikel -lah.'
              }
            ]
          }
        ]
      },
      {
        id: 'bi_keterampilan_sastra',
        namaElemen: '2. Keterampilan Berbahasa & Sastra',
        deskripsi: 'Menyimak, menulis, apresiasi puisi, prosa fiksi, dan penguasaan kosakata.',
        bab: [
          {
            id: 'bi_11',
            no: 11,
            judul: 'Menyimak',
            ringkasan: 'Keterampilan mendengarkan informasi secara kritis, mencatat ide pokok lisan, dan menangkap instruksi.',
            tujuan: 'Murid mampu menyimak pembacaan teks dan menjawab pertanyaan berdasarkan tuturan lisan.',
            konsepKunci: 'Menyimak berbeda dengan sekadar mendengar. Menyimak melibatkan konsentrasi penuh untuk memahami isi, menangkap pesan tersirat, dan mencatat poin-poin penting.',
            uraianMateri: [
              {
                subjudul: 'Langkah Menyimak Efektif',
                konten: '1. Pusatkan perhatian pada pembicara/audio.\n2. Catat kata kunci dan nama tokoh.\n3. Jangan tergesa-gesa menyimpulkan sebelum tuturan selesai.\n4. Rangkum inti pesan dengan kata-kata sendiri.'
              }
            ],
            contohSoal: {
              soal: 'Tujuan utama dari kegiatan menyimak kritis adalah...',
              penjelasan: 'Memahami fakta, membedakan opini, dan menangkap maksud sebenarnya dari pembicara.'
            },
            tipsJuara: 'Gunakan teknik 5W1H (Apa, Siapa, Di mana, Kapan, Mengapa, Bagaimana) saat menyimak!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sikap yang baik saat menyimak penjelasan guru adalah...',
                pilihan: [
                  'Mengobrol dengan teman sebangku',
                  'Fokus mendengarkan dan mencatat hal penting',
                  'Membaca komik secara sembunyi-sembunyi',
                  'Tertidur di atas meja'
                ],
                jawabanBenar: 1,
                hint: 'Menyimak membutuhkan konsentrasi dan catatan poin penting.'
              },
              {
                id: 2,
                pertanyaan: 'Hal pertama yang perlu dicatat saat menyimak berita adalah...',
                pilihan: ['Warna baju pembaca berita', 'Topik atau pokok permasalahan', 'Jumlah kata dalam berita', 'Nama kameramen'],
                jawabanBenar: 1,
                hint: 'Topik utama adalah inti dari isi bacaan atau berita.'
              },
              {
                id: 3,
                pertanyaan: 'Membedakan antara fakta dan rekaan saat mendengarkan cerita termasuk ke dalam kegiatan menyimak...',
                pilihan: ['Pasif', 'Kritis', 'Sekilas', 'Sambil lalu'],
                jawabanBenar: 1,
                hint: 'Menyimak kritis bertujuan menganalisis kebenaran isi tuturan.'
              }
            ]
          },
          {
            id: 'bi_12',
            no: 12,
            judul: 'Menulis',
            ringkasan: 'Menyusun paragraf deskripsi, narasi, petunjuk penggunaan (prosedur), dan surat pribadi/resmi.',
            tujuan: 'Murid mampu menyusun teks tertulis secara runtut, kohesif, dan memperhatikan tanda baca.',
            konsepKunci: 'Teks narasi menceritakan peristiwa urut waktu (kronologis). Teks deskripsi menggambarkan objek lewat pancaindra. Teks prosedur menyajikan langkah-langkah kerja berurutan.',
            uraianMateri: [
              {
                subjudul: 'Ciri Teks Prosedur / Petunjuk',
                konten: '• Menggunakan kalimat perintah (imperatif): "Kocoklah telur hingga mengembang."\n• Menggunakan urutan angka atau konjungsi urutan (pertama, kedua, lalu, selanjutnya).\n• Rinci dan tidak membingungkan.'
              }
            ],
            contohSoal: {
              soal: 'Urutan petunjuk membuat teh manis yang tepat adalah...',
              penjelasan: '1. Masukkan teh celup ke dalam gelas. 2. Tuang air panas. 3. Tambahkan gula secukupnya. 4. Aduk hingga rata.'
            },
            tipsJuara: 'Pada soal mengurutkan petunjuk acak, cari kalimat awal (persiapan bahan) dan kalimat akhir (penyajian)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Teks yang menggambarkan suatu benda secara jelas sehingga pembaca seolah melihatnya sendiri disebut...',
                pilihan: ['Narasi', 'Deskripsi', 'Eksposisi', 'Persuasi'],
                jawabanBenar: 1,
                hint: 'Teks deskripsi berfokus pada penggambaran objek secara mendalam.'
              },
              {
                id: 2,
                pertanyaan: 'Ciri utama kalimat petunjuk pemakaian adalah...',
                pilihan: [
                  'Berupa kalimat pertanyaan',
                  'Berisi pendapat pribadi',
                  'Menggunakan kalimat perintah yang jelas dan runtut',
                  'Menggunakan bahasa kiasan'
                ],
                jawabanBenar: 2,
                hint: 'Petunjuk menggunakan kalimat perintah imperatif.'
              },
              {
                id: 3,
                pertanyaan: 'Bagian pembuka dalam surat resmi biasanya berisi...',
                pilihan: ['Kop surat dan tanggal surat', 'Tanda tangan pengirim', 'Isi permohonan', 'Salam penutup'],
                jawabanBenar: 0,
                hint: 'Kop surat (kepala surat) berada di posisi paling atas surat resmi.'
              }
            ]
          },
          {
            id: 'bi_13',
            no: 13,
            judul: 'Puisi',
            ringkasan: 'Unsur pembangun puisi: bait, larik, rima (persajakan), majas, dan pesan moral dalam puisi anak.',
            tujuan: 'Murid mampu menentukan rima, makna kata kias, dan amanat yang terkandung dalam puisi.',
            konsepKunci: 'Puisi menggunakan bahasa yang indah, padat, dan berima. Bait adalah kesatuan beberapa larik/baris. Amanat adalah pesan kebaikan yang ingin disampaikan penyair.',
            uraianMateri: [
              {
                subjudul: 'Unsur Intrinsik Puisi',
                konten: '• Bait & Larik: Kumpulan baris membentuk bait.\n• Rima: Pengulangan bunyi akhir (a-b-a-b, a-a-a-a).\n• Majas / Gaya Bahasa: Personifikasi (benda mati seolah hidup), Metafora (perbandingan langsung).\n• Amanat: Nilai moral atau nasihat.'
              }
            ],
            contohSoal: {
              soal: '"Mentari tersenyum menyapa pagi". Majas yang digunakan adalah...',
              penjelasan: 'Majas personifikasi, karena mentari (benda mati) digambarkan tersenyum seperti manusia.'
            },
            tipsJuara: 'Amanat puisi biasanya bersifat positif (mengajak rajin belajar, menyayangi orang tua, menjaga alam)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Baris dalam puisi disebut juga...',
                pilihan: ['Bait', 'Larik', 'Rima', 'Irama'],
                jawabanBenar: 1,
                hint: 'Larik adalah sebutan untuk baris-baris puisi.'
              },
              {
                id: 2,
                pertanyaan: '"Angin berbisik lembut di telingaku". Kalimat puisi tersebut bermajas...',
                pilihan: ['Metafora', 'Personifikasi', 'Hiperbola', 'Litotes'],
                jawabanBenar: 1,
                hint: 'Angin digambarkan bisa berbisik seperti manusia (personifikasi).'
              },
              {
                id: 3,
                pertanyaan: 'Pesan kebaikan yang ingin disampaikan penyair kepada pembaca disebut...',
                pilihan: ['Tema', 'Rima', 'Amanat', 'Latar'],
                jawabanBenar: 2,
                hint: 'Amanat adalah pesan moral dalam karya sastra.'
              }
            ]
          },
          {
            id: 'bi_14',
            no: 14,
            judul: 'Prosa',
            ringkasan: 'Unsur intrinsik karya sastra fiksi (cerpen, dongeng, fabel): tema, tokoh, watak, latar, dan alur.',
            tujuan: 'Murid mampu menentukan tokoh utama, watak tokoh, latar tempat/waktu, dan konflik cerita.',
            konsepKunci: 'Tokoh Protagonis (berwatak baik), Antagonis (penentang/jahat), Tritagonis (penengah). Latar: tempat, waktu, suasana. Alur: maju, mundur, campuran.',
            uraianMateri: [
              {
                subjudul: 'Unsur Intrinsik Cerita Fiksi',
                konten: '• Tema: Gagasan dasar cerita.\n• Tokoh & Penokohan: Pelaku dan karakter sifatnya.\n• Latar (Setting): Tempat (desa), waktu (sore), suasana (menegangkan).\n• Alur (Plot): Urutan jalannya peristiwa dari awal hingga penyelesaian.\n• Amanat: Pelajaran hidup bagi pembaca.'
              }
            ],
            contohSoal: {
              soal: 'Kancil membantu semut yang tercebur ke sungai. Watak tokoh Kancil adalah...',
              penjelasan: 'Kancil berwatak suka menolong, dermawan, dan peduli sesama.'
            },
            tipsJuara: 'Watak tokoh dapat diketahui lewat perbuatannya, ucapannya, atau dialog tokoh lain!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Tokoh yang memiliki sifat baik dan disukai pembaca disebut tokoh...',
                pilihan: ['Antagonis', 'Protagonis', 'Figuran', 'Tritagonis'],
                jawabanBenar: 1,
                hint: 'Protagonis adalah tokoh utama yang berwatak baik.'
              },
              {
                id: 2,
                pertanyaan: 'Cerita fiksi yang tokoh utamanya berupa hewan yang bertingkah seperti manusia disebut...',
                pilihan: ['Mite', 'Legenda', 'Fabel', 'Sage'],
                jawabanBenar: 2,
                hint: 'Fabel adalah cerita binatang berkepribadian manusia.'
              },
              {
                id: 3,
                pertanyaan: '"Matahari perlahan tenggelam di balik bukit". Kutipan tersebut menggambarkan latar...',
                pilihan: ['Tempat saja', 'Waktu dan tempat', 'Suasana saja', 'Alat'],
                jawabanBenar: 1,
                hint: 'Matahari tenggelam (waktu sore), di balik bukit (tempat).'
              }
            ]
          },
          {
            id: 'bi_15',
            no: 15,
            judul: 'Kosakata',
            ringkasan: 'Penguasaan kosakata baku, istilah serapan, dan makna leksikal ragam teks sains dan sosial.',
            tujuan: 'Murid mampu memahami arti kosakata khusus dan membedakan kata baku dan tidak baku.',
            konsepKunci: 'Kosakata baku merujuk pada ejaan resmi KBBI. Membaca teks bertema lingkungan, kesehatan, dan teknologi memperkaya kosakata akademik.',
            uraianMateri: [
              {
                subjudul: 'Contoh Kosakata Baku vs Tidak Baku',
                konten: '• Baku: Apotek, Praktik, Izin, Antre, Risiko, Nasihat, Ekosistem.\n• Tidak Baku: Apotik, Praktek, Ijin, Antri, Resiko, Nasehat, Ekosistim.'
              }
            ],
            contohSoal: {
              soal: 'Penulisan kata yang tepat: "Kita harus menjaga kualitet / kualitas air."',
              penjelasan: 'Kata baku yang benar adalah "kualitas".'
            },
            tipsJuara: 'Perhatikan akhiran: kata serapan bahasa Inggris -ty berubah menjadi -tas (quality → kualitas, activity → aktivitas)!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Penulisan kata baku yang benar menurut KBBI adalah...',
                pilihan: ['Jadual', 'Jadwal', 'Jadualkan', 'Djadwal'],
                jawabanBenar: 1,
                hint: 'Kata baku yang tepat memakai huruf w: jadwal.'
              },
              {
                id: 2,
                pertanyaan: 'Arti kata "habitat" dalam ilmu biologi adalah...',
                pilihan: ['Makanan alami hewan', 'Tempat hidup alami makhluk hidup', 'Musuh alami hewan', 'Jenis perkembangbiakan'],
                jawabanBenar: 1,
                hint: 'Habitat adalah tempat tinggal alami suatu makhluk hidup.'
              },
              {
                id: 3,
                pertanyaan: 'Bentuk baku dari kata "resiko" adalah...',
                pilihan: ['Resiko', 'Risiko', 'Risyiko', 'Resikau'],
                jawabanBenar: 1,
                hint: 'Huruf e diganti menjadi i: risiko.'
              }
            ]
          }
        ]
      },
      {
        id: 'bi_pemahaman_teks',
        namaElemen: '3. Pemahaman & Analisis Teks Bacaan',
        deskripsi: 'Menyusun kembali informasi, fakta tersurat, kesimpulan, relevansi, dan respons emosional.',
        bab: [
          {
            id: 'bi_16',
            no: 16,
            judul: 'Menyusun Kembali Informasi dari Teks',
            ringkasan: 'Merangkum, menyusun parafrasa, membuat peta pikiran, dan menyusun urutan peristiwa teks secara kronologis.',
            tujuan: 'Murid mampu menuliskan kembali ide pokok bacaan secara ringkas dan runtut.',
            konsepKunci: 'Ringkasan dibuat dengan menggabungkan gagasan-gagasan pokok setiap paragraf tanpa mengubah alur atau sudut pandang penulis aslinya.',
            uraianMateri: [
              {
                subjudul: 'Langkah Merangkum Bacaan',
                konten: '1. Baca keseluruhan paragraf dengan seksama.\n2. Tentukan kalimat utama dan ide pokok tiap paragraf.\n3. Rangkaikan ide pokok menggunakan kata hubung yang tepat.\n4. Hilangkan contoh dan rincian yang tidak terlalu penting.'
              }
            ],
            contohSoal: {
              soal: 'Apa kunci utama membuat ringkasan yang baik?',
              penjelasan: 'Mempertahankan ide pokok dan urutan cerita tanpa menambah opini pribadi.'
            },
            tipsJuara: 'Coret kalimat penjelas dan contoh-contoh, fokus hanya pada ide pokok di kalimat utama!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Sebuah ringkasan yang baik harus memuat...',
                pilihan: [
                  'Seluruh contoh dan angka dalam teks',
                  'Ide pokok dari setiap paragraf bacaan',
                  'Pendapat pribadi pembaca',
                  'Kalimat baru yang berbeda maknanya'
                ],
                jawabanBenar: 1,
                hint: 'Ringkasan disusun dari gabungan ide pokok tiap paragraf.'
              },
              {
                id: 2,
                pertanyaan: 'Tujuan dari menyusun kembali urutan peristiwa dalam teks adalah...',
                pilihan: [
                  'Memperpanjang cerita',
                  'Mengetahui urutan kejadian secara kronologis',
                  'Mengubah watak tokoh',
                  'Membuat cerita baru'
                ],
                jawabanBenar: 1,
                hint: 'Kronologis berarti sesuai dengan urutan waktu kejadian.'
              },
              {
                id: 3,
                pertanyaan: 'Diagram yang menghubungkan konsep utama dengan cabang-cabang subtopik disebut...',
                pilihan: ['Peta konsep / mind map', 'Tabel frekuensi', 'Kartu kata', 'Garis bilangan'],
                jawabanBenar: 0,
                hint: 'Mind map membantu menyusun kembali informasi secara visual.'
              }
            ]
          },
          {
            id: 'bi_17',
            no: 17,
            judul: 'Informasi Tersurat',
            ringkasan: 'Menemukan fakta eksplisit (5W1H / ADiKSiMBa) yang tertulis langsung di dalam teks wacana.',
            tujuan: 'Murid mampu menemukan fakta yang dinyatakan secara langsung tanpa perlu penafsiran.',
            konsepKunci: 'Informasi tersurat adalah informasi yang jawabannya tertulis nyata di dalam kalimat bacaan. Cukup cari kata kunci yang sama antara soal dan teks.',
            uraianMateri: [
              {
                subjudul: 'Panduan Kata Tanya 5W1H',
                konten: '• Apa: Menanyakan benda/peristiwa.\n• Di mana: Menanyakan tempat.\n• Kapan: Menanyakan waktu.\n• Siapa: Menanyakan tokoh/orang.\n• Mengapa: Menanyakan alasan/penyebab (karena).\n• Bagaimana: Menanyakan cara/proses/keadaan.'
              }
            ],
            contohSoal: {
              soal: '"Pada hari Minggu, Budi menanam pohon mangga di halaman rumah." Di mana Budi menanam pohon?',
              penjelasan: 'Jawaban tersurat ada di kalimat: "di halaman rumah".'
            },
            tipsJuara: 'Jawaban informasi tersurat 100% ada di dalam teks bacaan! Jangan mengarang jawaban di luar teks!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Kata tanya yang digunakan untuk menanyakan alasan terjadinya suatu peristiwa adalah...',
                pilihan: ['Kapan', 'Di mana', 'Mengapa', 'Bagaimana'],
                jawabanBenar: 2,
                hint: '"Mengapa" menanyakan sebab atau alasan terjadinya hal tersebut.'
              },
              {
                id: 2,
                pertanyaan: 'Ciri informasi tersurat adalah...',
                pilihan: [
                  'Harus ditebak pembaca',
                  'Tertulis nyata dan jelas di dalam teks',
                  'Merupakan kiasan',
                  'Tidak ada di dalam bacaan'
                ],
                jawabanBenar: 1,
                hint: 'Tersurat berarti tertulis secara eksplisit.'
              },
              {
                id: 3,
                pertanyaan: 'Jika dalam teks tertulis "Rapat diselenggarakan pukul 09.00", maka pertanyaan yang tepat adalah...',
                pilihan: ['Di mana rapat diadakan?', 'Kapan rapat diselenggarakan?', 'Siapa pemimpin rapat?', 'Apa agenda rapat?'],
                jawabanBenar: 1,
                hint: 'Waktu jam dijawab dengan kata tanya "Kapan".'
              }
            ]
          },
          {
            id: 'bi_18',
            no: 18,
            judul: 'Menarik Kesimpulan',
            ringkasan: 'Menyimpulkan isi atau pesan utama bacaan berdasarkan seluruh fakta dan premis yang tersaji.',
            tujuan: 'Murid mampu merumuskan kesimpulan akhir yang mencakup seluruh gagasan wacana.',
            konsepKunci: 'Kesimpulan adalah inti sari dari keseluruhan teks. Kesimpulan yang tepat harus didukung oleh bukti-bukti yang tertulis di dalam paragraf.',
            uraianMateri: [
              {
                subjudul: 'Cara Merumuskan Kesimpulan',
                konten: '1. Pahami ide pokok tiap paragraf.\n2. Hubungkan sebab dan akibat antarparagraf.\n3. Cari kalimat yang mewakili keseluruhan isi, bukan hanya penggalan kecil satu kalimat saja.'
              }
            ],
            contohSoal: {
              soal: 'Teks: "Budi rajin belajar, selalu mengulang pelajaran di rumah, dan aktif bertanya di kelas. Akibatnya, ia selalu meraih peringkat satu." Kesimpulannya...',
              penjelasan: 'Kesimpulan: Ketekunan dan kerajinan belajar Budi membuahkan prestasi juara di sekolah.'
            },
            tipsJuara: 'Pilihan kesimpulan yang benar harus mencakup gambaran umum seluruh isi bacaan, bukan fakta kecil satu kalimat!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Kesimpulan bacaan yang baik adalah...',
                pilihan: [
                  'Menyalin kalimat terakhir persis',
                  'Pendapat baru yang bertentangan dengan teks',
                  'Inti sari yang mewakili seluruh isi paragraf',
                  'Penjelasan bagian yang paling panjang'
                ],
                jawabanBenar: 2,
                hint: 'Kesimpulan adalah intisari menyeluruh dari bacaan.'
              },
              {
                id: 2,
                pertanyaan: 'Kata penghubung yang sering mengawali kalimat kesimpulan adalah...',
                pilihan: ['Meskipun', 'Oleh karena itu', 'Tetapi', 'Sejak'],
                jawabanBenar: 1,
                hint: '"Oleh karena itu", "Jadi", atau "Dengan demikian" sering menjadi tanda simpulan.'
              },
              {
                id: 3,
                pertanyaan: 'Jika teks membahas bahaya sampah plastik dan cara mendaur ulangnya, simpulan yang tepat adalah...',
                pilihan: [
                  'Plastik adalah penemuan terhebat',
                  'Pengelolaan dan daur ulang sampah plastik sangat penting untuk lingkungan',
                  'Sampah plastik tidak berbahaya',
                  'Semua orang harus membakar plastik'
                ],
                jawabanBenar: 1,
                hint: 'Simpulan merangkum bahaya dan solusi daur ulang.'
              }
            ]
          },
          {
            id: 'bi_19',
            no: 19,
            judul: 'Relevansi Peristiwa dalam teks',
            ringkasan: 'Menghubungkan peristiwa atau konflik dalam cerita dengan situasi nyata dalam kehidupan sehari-hari.',
            tujuan: 'Murid mampu mengambil nilai pelajaran dari teks dan mengaitkannya dengan kehidupan sosial nyata.',
            konsepKunci: 'Relevansi adalah keterkaitan antara masalah tokoh di dalam cerita dengan pengalaman hidup kita sendiri (misal: sikap tolong menolong, kejujuran, hemat energi).',
            uraianMateri: [
              {
                subjudul: 'Contoh Relevansi Konseptual',
                konten: 'Tokoh fabel semut yang menabung makanan untuk musim dingin memiliki relevansi dengan kebiasaan manusia menabung uang untuk masa depan.'
              }
            ],
            contohSoal: {
              soal: 'Dalam cerita, tokoh Danu selalu membuang sampah sembarangan sehingga lingkungannya banjir. Apa relevansinya dengan kehidupan nyata?',
              penjelasan: 'Kebiasaan membuang sampah sembarangan di dunia nyata juga menjadi penyebab utama tersumbatnya saluran air dan banjir.'
            },
            tipsJuara: 'Cari persamaan antara tindakan tokoh dengan norma/etika dalam kehidupan masyarakat kita sehari-hari!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Peristiwa dalam dongeng yang mengajarkan kita untuk tidak bersikap sombong relevan dengan nilai...',
                pilihan: ['Kekayaan', 'Kerendahan hati', 'Kecepatan', 'Kekuatan fisik'],
                jawabanBenar: 1,
                hint: 'Lawan dari sombong adalah rendah hati.'
              },
              {
                id: 2,
                pertanyaan: 'Tokoh kura-kura yang pantang menyerah dalam perlombaan lari mengajarkan kita bahwa...',
                pilihan: [
                  'Kita harus cepat berlari',
                  'Usaha gigih dan konsisten dapat mengalahkan kesombongan',
                  'Tidur saat lomba itu menyenangkan',
                  'Kelinci selalu menang'
                ],
                jawabanBenar: 1,
                hint: 'Pelajaran hidup nyata: kegigihan mengalahkan kesombongan.'
              },
              {
                id: 3,
                pertanyaan: 'Relevansi teks tentang gotong royong warga desa dengan kehidupan kita adalah...',
                pilihan: [
                  'Pekerjaan berat akan terasa lebih ringan jika dikerjakan bersama-sama',
                  'Semua pekerjaan harus diserahkan kepada kepala desa',
                  'Tidak perlu membantu tetangga',
                  'Gotong royong membuang-buang waktu'
                ],
                jawabanBenar: 0,
                hint: 'Gotong royong meringankan pekerjaan berat.'
              }
            ]
          },
          {
            id: 'bi_20',
            no: 20,
            judul: 'Kesesuaian Antarunsur dalam teks',
            ringkasan: 'Menganalisis hubungan sebab-akibat antarperistiwa, kesesuaian judul dengan isi, dan motivasi tindakan tokoh.',
            tujuan: 'Murid mampu menilai apakah tindakan tokoh logis dan sesuai dengan watak serta alur cerita.',
            konsepKunci: 'Teks yang baik memiliki koherensi: peristiwa A menyebabkan peristiwa B. Watak tokoh tercermin dari tindakan yang diambilnya.',
            uraianMateri: [
              {
                subjudul: 'Analisis Hubungan Sebab-Akibat',
                konten: '• Sebab: Mengapa suatu peristiwa terjadi (alasan).\n• Akibat: Hasil atau konsekuensi dari peristiwa tersebut.'
              }
            ],
            contohSoal: {
              soal: 'Karena tidak belajar semalam (sebab), nilai ulangan Budi menurun (akibat). Hubungan keduanya adalah...',
              penjelasan: 'Hubungan sebab-akibat yang logis dan konsisten.'
            },
            tipsJuara: 'Cari kata penghubung sebab-akibat seperti "karena", "sebab", "sehingga", "maka"!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Hubungan yang tepat antara judul dan isi teks adalah...',
                pilihan: [
                  'Judul harus berbeda total dari isi teks',
                  'Judul mencerminkan pokok permasalahan yang dibahas dalam teks',
                  'Judul tidak perlu dibaca',
                  'Judul hanya hiasan semata'
                ],
                jawabanBenar: 1,
                hint: 'Judul yang baik merangkum topik utama bacaan.'
              },
              {
                id: 2,
                pertanyaan: '"Hutan ditebang secara liar sehingga lereng bukit longsor saat hujan lebat". Hubungan peristiwa tersebut adalah...',
                pilihan: ['Perbandingan', 'Sebab - akibat', 'Pertentangan', 'Urutan tempat'],
                jawabanBenar: 1,
                hint: 'Penebangan liar adalah penyebab, dan tanah longsor adalah akibatnya.'
              },
              {
                id: 3,
                pertanyaan: 'Tindakan tokoh yang suka menolong orang lain sesuai dengan watak tokoh yang...',
                pilihan: ['Kikir', 'Dermawan / Baik hati', 'Iri hati', 'Keras kepala'],
                jawabanBenar: 1,
                hint: 'Suka menolong menunjukkan watak baik hati atau dermawan.'
              }
            ]
          },
          {
            id: 'bi_21',
            no: 21,
            judul: 'Respons Emosional Terhadap Unsur Teks Fiksi',
            ringkasan: 'Memberikan penilaian, empati, dan tanggapan emosional terhadap nasib dan keputusan tokoh cerita fiksi.',
            tujuan: 'Murid mampu mengungkapkan perasaan setuju, sedih, bangga, atau simpati terhadap isi teks fiksi.',
            konsepKunci: 'Membaca sastra mengasah kecerdasan emosional: kita ikut merasakan kesedihan tokoh yang malang, dan merasa bangga atas keberhasilan tokoh yang berjuang gigih.',
            uraianMateri: [
              {
                subjudul: 'Bentuk Respons Emosional Siswa',
                konten: '• Empati: Ikut merasakan penderitaan tokoh yang kurang beruntung.\n• Apresiasi: Mengagumi ketabahan dan kecerdikan tokoh.\n• Evaluasi Kritis: Menolak perilaku curang atau culas yang dilakukan tokoh antagonis.'
              }
            ],
            contohSoal: {
              soal: 'Bagaimana perasaanmu saat membaca kisah Malin Kundang yang durhaka kepada ibunya?',
              penjelasan: 'Perasaan sedih dan kecewa atas kedurhakaan Malin Kundang, serta bertekad untuk selalu berbakti kepada orang tua.'
            },
            tipsJuara: 'Respons emosional yang baik selalu diarahkan pada peneguhan nilai-nilai moral budi pekerti yang luhur!',
            soalLatihan: [
              {
                id: 1,
                pertanyaan: 'Tanggapan yang bijak terhadap tokoh yang melakukan kecurangan saat ujian adalah...',
                pilihan: [
                  'Meniru perbuatannya karena menguntungkan',
                  'Merasa tidak setuju karena kejujuran jauh lebih penting daripada nilai',
                  'Memuji kecerdikannya',
                  'Mengajak teman lain berbuat curang'
                ],
                jawabanBenar: 1,
                hint: 'Sikap etis yang benar adalah menolak kecurangan.'
              },
              {
                id: 2,
                pertanyaan: 'Sikap empati pembaca saat tokoh cerita tertimpa musibah ditunjukkan dengan...',
                pilihan: ['Menertawakannya', 'Merasa iba dan terdorong untuk membantu', 'Bersikap cuek', 'Merasa senang'],
                jawabanBenar: 1,
                hint: 'Empati berarti merasakan kesedihan orang lain dan terdorong membantu.'
              },
              {
                id: 3,
                pertanyaan: 'Apresiasi terhadap tokoh cerita yang berjuang melawan kemiskinan dengan rajin belajar adalah...',
                pilihan: [
                  'Kagum atas kegigihannya dan terinspirasi untuk rajin belajar',
                  'Mengejek keadaannya',
                  'Mengabaikan perjuangannya',
                  'Menyuruhnya berhenti sekolah'
                ],
                jawabanBenar: 0,
                hint: 'Apresiasi adalah rasa kagum dan mengambil inspirasi positif.'
              }
            ]
          }
        ]
      }
    ]
  }
};
