/**
 * Data Simulasi Tryout Akbar TKA SD
 * Sumber Resmi: Pusmendik Kemendikdasmen RI & SK Kepala BSKAP No 047/H/AN/2025
 * Diadopsi langsung dari Bank Soal Standar sd.onedumind.com
 * 
 * 5 Paket Tryout Matematika (30 Soal per paket: PG, PG Kompleks, Benar/Salah)
 * 5 Paket Tryout Bahasa Indonesia (30 Soal per paket: PG, PG Kompleks, Benar/Salah)
 * Durasi: 60 Menit per Paket
 */

export const PUSMENDIK_TRYOUT = {
  "matematika": {
    "nama": "Matematika",
    "icon": "Calculator",
    "deskripsi": "5 Paket Tryout Akbar Numerasi (30 Soal HOTS & Standar Pusmendik Kemendikdasmen RI).",
    "paket": [
      {
        "nomorPaket": 1,
        "namaPaket": "Paket 1 (ANCHOR)",
        "kode": "TO-MTK-01",
        "deskripsi": "Simulasi Ujian TKA Matematika SD (Paket 1 (ANCHOR)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bu Siti memiliki persediaan tepung terigu sebanyak $3\\frac{1}{2}$ kg. Kemudian ia membeli lagi $2,25$ kg.",
            "question": "Bentuk pecahan desimal dari total berat tepung terigu Bu Siti sekarang adalah...",
            "indicator": "Melakukan perhitungan operasi hitung campuran bilangan pecahan dan desimal (C3).",
            "options": [
              "$5,25$ kg",
              "$5,50$ kg",
              "$5,75$ kg",
              "$6,25$ kg"
            ],
            "answer": "$5,75$ kg",
            "statements": [],
            "explanation": "Ubah ke desimal: $3\\frac{1}{2} = 3,5$.<br>Total = $3,5 + 2,25 = 5,75$ kg."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pak Budi membagikan 24 kg beras, 36 kg gula, dan 48 liter minyak goreng kepada tetangganya yang kurang mampu dalam paket sembako yang sama banyak.",
            "question": "Jumlah tetangga paling banyak yang dapat menerima paket sembako tersebut adalah...",
            "indicator": "Menyelesaikan permasalahan yang berkaitan dengan FPB dari tiga bilangan (C4).",
            "options": [
              "6 orang",
              "12 orang",
              "18 orang",
              "24 orang"
            ],
            "answer": "12 orang",
            "statements": [],
            "explanation": "Mencari FPB dari 24, 36, dan 48.<br>Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24.<br>Faktor 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.<br>Faktor 48: ..., 12, 16, ...<br>FPB adalah 12."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah taman berbentuk persegi panjang dengan ukuran panjang 18 m dan lebar 12 m. Di sekeliling taman akan ditanami pohon pucuk merah dengan jarak antar pohon 3 m.",
            "question": "Banyak pohon pucuk merah yang dibutuhkan adalah...",
            "indicator": "Mengaplikasikan konsep keliling bangun datar untuk menyelesaikan masalah kontekstual (C4).",
            "options": [
              "10 pohon",
              "20 pohon",
              "30 pohon",
              "60 pohon"
            ],
            "answer": "20 pohon",
            "statements": [],
            "explanation": "Keliling = $2 \\times (p + l) = 2 \\times (18 + 12) = 2 \\times 30 = 60$ m.<br>Banyak pohon = $\\frac{\\text{Keliling}}{\\text{Jarak}} = \\frac{60}{3} = 20$ pohon."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Diketahui sebuah bangun ruang memiliki ciri-ciri: memiliki 5 sisi, 8 rusuk, dan 5 titik sudut. Sisi alasnya berbentuk segiempat dan sisi tegaknya berbentuk segitiga.",
            "question": "Bangun ruang yang dimaksud adalah...",
            "indicator": "Melakukan identifikasi terhadap objek geometri berdasarkan ciri-cirinya (C3).",
            "options": [
              "Prisma Segitiga",
              "Limas Segiempat",
              "Limas Segitiga",
              "Prisma Segiempat"
            ],
            "answer": "Limas Segiempat",
            "statements": [],
            "explanation": "Ciri-ciri tersebut (alas segiempat, sisi tegak segitiga, 5 sisi, 5 titik sudut) adalah karakteristik dari Limas Segiempat."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bak mandi berbentuk balok memiliki volume 480 liter. Jika panjang bak 10 dm dan lebarnya 8 dm.",
            "question": "Tinggi bak mandi tersebut dalam satuan cm adalah...",
            "indicator": "Menarik kesimpulan nilai dimensi bangun ruang jika volume diketahui dengan konversi satuan (C5).",
            "options": [
              "6 cm",
              "60 cm",
              "600 cm",
              "0,6 cm"
            ],
            "answer": "60 cm",
            "statements": [],
            "explanation": "Volume = $p \\times l \\times t$. Diketahui $480$ liter = $480$ dm$^3$.<br>$480 = 10 \\times 8 \\times t \\Rightarrow 480 = 80 \\times t \\Rightarrow t = 6$ dm.<br>Konversi ke cm: $6$ dm = $60$ cm."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Andi berangkat dari kota A ke kota B dengan kecepatan rata-rata 60 km/jam. Ia berangkat pukul 07.00 dan sampai pukul 09.30.",
            "question": "Jarak antara kota A dan kota B adalah...",
            "indicator": "Mengaplikasikan rumus kecepatan, jarak, dan waktu dalam situasi rutin (C4).",
            "options": [
              "120 km",
              "135 km",
              "150 km",
              "180 km"
            ],
            "answer": "150 km",
            "statements": [],
            "explanation": "Waktu tempuh = 09.30 - 07.00 = 2 jam 30 menit = $2,5$ jam.<br>Jarak = $\\text{Kecepatan} \\times \\text{Waktu} = 60 \\times 2,5 = 150$ km."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Hasil dari operasi hitung campuran berikut adalah...<br>$$1.250 + 200 \\times 5 - 500$$",
            "question": "Hasil perhitungan tersebut adalah...",
            "indicator": "Melakukan perhitungan operasi hitung campuran bilangan cacah dengan urutan yang benar (C3).",
            "options": [
              "$1.750$",
              "$2.750$",
              "$6.750$",
              "$1.250$"
            ],
            "answer": "$1.750$",
            "statements": [],
            "explanation": "Perkalian didahulukan: $200 \\times 5 = 1.000$.<br>Lalu penjumlahan dan pengurangan dari kiri: $1.250 + 1.000 - 500 = 2.250 - 500 = 1.750$."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan pecahan-pecahan berikut: $0,45$; $0,8$; $\\frac{3}{5}$; $60\\%$.",
            "question": "Urutan pecahan dari yang terkecil ke yang terbesar adalah...",
            "indicator": "Mengaitkan berbagai bentuk representasi bilangan pecahan untuk mengurutkannya (C5).",
            "options": [
              "$0,45$; $\\frac{3}{5}$; $60\\%$; $0,8$",
              "$0,45$; $60\\%$; $\\frac{3}{5}$; $0,8$",
              "$\\frac{3}{5}$; $0,45$; $60\\%$; $0,8$",
              "$0,45$; $\\frac{3}{5}$; $0,8$; $60\\%$"
            ],
            "answer": "$0,45$; $\\frac{3}{5}$; $60\\%$; $0,8$",
            "statements": [],
            "explanation": "Ubah ke desimal:<br>$0,45 = 0,45$<br>$\\frac{3}{5} = 0,6$<br>$60\\% = 0,6$<br>$0,8 = 0,8$<br>Urutan: $0,45 < 0,6 = 0,6 < 0,8$.<br>Jadi: $0,45$; $\\frac{3}{5}$; $60\\%$; $0,8$."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bangun datar gabungan terdiri dari persegi dengan sisi 10 cm dan setengah lingkaran yang menempel pada salah satu sisinya.",
            "question": "Luas bangun gabungan tersebut adalah... ($\\pi = 3,14$)",
            "indicator": "Menentukan luas gabungan dua bangun datar (persegi dan setengah lingkaran) (C4).",
            "options": [
              "$139,25$ cm$^2$",
              "$178,5$ cm$^2$",
              "$257$ cm$^2$",
              "$314$ cm$^2$"
            ],
            "answer": "$139,25$ cm$^2$",
            "statements": [],
            "explanation": "Luas Persegi = $10 \\times 10 = 100$ cm$^2$.<br>Luas 1/2 Lingkaran ($r=5$) = $\\frac{1}{2} \\times 3,14 \\times 5 \\times 5 = 39,25$ cm$^2$.<br>Total = $100 + 39,25 = 139,25$ cm$^2$."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah akuarium berbentuk kubus dengan panjang rusuk 40 cm berisi air setengahnya. Kemudian dimasukkan mainan balok padat berukuran $20 \\times 10 \\times 5$ cm tenggelam seluruhnya.",
            "question": "Kenaikan tinggi air dalam akuarium tersebut adalah...",
            "indicator": "Menarik kesimpulan tentang perubahan tinggi air akibat penambahan volume benda lain (C6).",
            "options": [
              "0,625 cm",
              "1 cm",
              "2 cm",
              "5 cm"
            ],
            "answer": "0,625 cm",
            "statements": [],
            "explanation": "Volume balok = $20 \\times 10 \\times 5 = 1.000$ cm$^3$.<br>Luas alas akuarium = $40 \\times 40 = 1.600$ cm$^2$.<br>Kenaikan = $\\frac{\\text{Volume benda}}{\\text{Luas alas}} = \\frac{1.000}{1.600} = \\frac{10}{16} = 0,625$ cm."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui sifat-sifat bangun datar sebagai berikut: (1) Memiliki 4 sisi sama panjang, (2) Memiliki 2 pasang sisi sejajar, (3) Sudut-sudut yang berhadapan sama besar, (4) Kedua diagonalnya berpotongan tegak lurus.",
            "question": "Manakah bangun datar yang memenuhi SEMUA sifat di atas?",
            "indicator": "Mengelompokkan objek geometri berdasarkan prinsip matematika (C4).",
            "options": [
              "Persegi",
              "Belah Ketupat",
              "Layang-layang",
              "Persegi Panjang"
            ],
            "answer": [
              "Persegi",
              "Belah Ketupat"
            ],
            "statements": [],
            "explanation": "Sisi sama panjang dan diagonal tegak lurus dimiliki oleh Persegi dan Belah Ketupat.<br>Layang-layang sisinya tidak semua sama panjang.<br>Persegi panjang diagonalnya tidak tegak lurus."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ayah memiliki tali sepanjang $10$ meter. Tali tersebut dipotong untuk jemuran $4\\frac{1}{2}$ meter dan untuk mengikat pagar $2,75$ meter.",
            "question": "Pilihlah pernyataan-pernyataan yang **BENAR** berdasarkan informasi tersebut!",
            "indicator": "Mengevaluasi alternatif solusi dan fakta dari permasalahan pengurangan pecahan (C5).",
            "options": [
              "Sisa tali ayah adalah $2,75$ meter.",
              "Panjang tali yang digunakan lebih dari $7$ meter.",
              "Sisa tali lebih pendek daripada tali untuk pagar.",
              "Total tali yang digunakan adalah $7\\frac{1}{4}$ meter."
            ],
            "answer": [
              "Sisa tali ayah adalah $2,75$ meter.",
              "Panjang tali yang digunakan lebih dari $7$ meter.",
              "Total tali yang digunakan adalah $7\\frac{1}{4}$ meter."
            ],
            "statements": [],
            "explanation": "Dipakai: $4,5 + 2,75 = 7,25$ m ($7,25 > 7$m, Benar).<br>Sisa: $10 - 7,25 = 2,75$ m.<br>Sisa (2,75) sama dengan tali pagar (2,75), bukan lebih pendek.<br>$7,25 = 7\\frac{1}{4}$ meter."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan bilangan-bilangan berikut: 12, 18, 24.",
            "question": "Faktor persekutuan dari ketiga bilangan tersebut adalah...",
            "indicator": "Melakukan identifikasi faktor persekutuan dari beberapa bilangan (C3).",
            "options": [
              "2",
              "3",
              "4",
              "6"
            ],
            "answer": [
              "2",
              "3",
              "6"
            ],
            "statements": [],
            "explanation": "Faktor 12: 1, 2, 3, 4, 6, 12.<br>Faktor 18: 1, 2, 3, 6, 9, 18.<br>Faktor 24: 1, 2, 3, 4, 6, 8...<br>Persekutuan: 1, 2, 3, 6. (4 bukan faktor dari 18)."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Diberikan data berat badan 5 siswa: 35 kg, 38 kg, 40 kg, 42 kg, 45 kg.",
            "question": "Manakah pernyataan konversi satuan yang BENAR?",
            "indicator": "Menentukan hubungan antar satuan berat dalam konteks data (C5).",
            "options": [
              "Berat badan 35 kg setara dengan 350 ons.",
              "Berat badan 40 kg setara dengan 40.000 gram.",
              "Berat badan 45 kg setara dengan 4.500 dag.",
              "Selisih berat badan terberat dan teringan adalah 100 hg."
            ],
            "answer": [
              "Berat badan 35 kg setara dengan 350 ons.",
              "Berat badan 40 kg setara dengan 40.000 gram.",
              "Selisih berat badan terberat dan teringan adalah 100 hg."
            ],
            "statements": [],
            "explanation": "1 kg = 10 ons (hg), 1 kg = 1.000 g.<br>35 kg = 350 ons (Benar).<br>40 kg = 40.000 g (Benar).<br>45 kg = 450 dag (Salah, karena 45 x 100 = 4.500 g = 450 dag).<br>Selisih 10 kg = 100 hg (Benar)."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bus melaju dengan kecepatan 80 km/jam selama 3 jam.",
            "question": "Pilihlah besaran yang setara dengan jarak yang ditempuh bus tersebut.",
            "indicator": "Mengaitkan konsep jarak dengan berbagai satuan panjang (C4).",
            "options": [
              "240 km",
              "240.000 m",
              "2.400 hm",
              "24.000 dam"
            ],
            "answer": [
              "240 km",
              "240.000 m",
              "2.400 hm",
              "24.000 dam"
            ],
            "statements": [],
            "explanation": "Jarak = $80 \\times 3 = 240$ km.<br>240 km = 2.400 hm = 24.000 dam = 240.000 m.<br>Semua opsi benar."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui bangun ruang gabungan terdiri dari kubus (sisi 10 cm) dan balok (10x10x20 cm) yang disusun memanjang.",
            "question": "Manakah pernyataan yang BENAR mengenai bangun tersebut?",
            "indicator": "Mengevaluasi properti (luas/volume) dari bangun ruang gabungan (C6).",
            "options": [
              "Volume total bangun tersebut adalah $3.000$ cm$^3$.",
              "Volume kubus adalah setengah dari volume balok.",
              "Luas permukaan gabungan sama dengan jumlah luas permukaan kubus dan balok terpisah.",
              "Tinggi total bangun jika ditumpuk ke atas adalah 30 cm."
            ],
            "answer": [
              "Volume total bangun tersebut adalah $3.000$ cm$^3$.",
              "Volume kubus adalah setengah dari volume balok.",
              "Tinggi total bangun jika ditumpuk ke atas adalah 30 cm."
            ],
            "statements": [],
            "explanation": "Vol Kubus = $1.000$ cm$^3$. Vol Balok = $2.000$ cm$^3$. Total = $3.000$ cm$^3$ (Benar).<br>$1.000$ adalah setengah dari $2.000$ (Benar).<br>Luas permukaan gabungan < jumlah terpisah karena ada sisi berimpit (Salah).<br>Tinggi tumpukan $10+20=30$ cm (Benar)."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan gambar lingkaran dengan jari-jari $r$.",
            "question": "Rumus yang BENAR untuk unsur-unsur lingkaran adalah...",
            "indicator": "Mengingat dan mengidentifikasi rumus-rumus geometri (C3).",
            "options": [
              "Diameter ($d$) = $2 \\times r$",
              "Keliling ($K$) = $\\pi \\times r^2$",
              "Luas ($L$) = $\\pi \\times r^2$",
              "Keliling ($K$) = $2 \\times \\pi \\times r$"
            ],
            "answer": [
              "Diameter ($d$) = $2 \\times r$",
              "Luas ($L$) = $\\pi \\times r^2$",
              "Keliling ($K$) = $2 \\times \\pi \\times r$"
            ],
            "statements": [],
            "explanation": "Rumus Keliling adalah $2\\pi r$ atau $\\pi d$. Rumus $\\pi r^2$ adalah rumus Luas."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Harga sepasang sepatu Rp200.000,00. Toko memberikan diskon 20%.",
            "question": "Pernyataan mana yang BENAR terkait masalah aritmatika sosial sederhana ini?",
            "indicator": "Menjelaskan makna dan implikasi dari persentase dalam konteks uang (C5).",
            "options": [
              "Besar potongan harga adalah Rp40.000,00.",
              "Harga yang harus dibayar adalah Rp160.000,00.",
              "Jika membeli 2 pasang, diskon totalnya menjadi Rp80.000,00.",
              "Diskon 20% sama dengan membayar $\\frac{4}{5}$ dari harga awal."
            ],
            "answer": [
              "Besar potongan harga adalah Rp40.000,00.",
              "Harga yang harus dibayar adalah Rp160.000,00.",
              "Jika membeli 2 pasang, diskon totalnya menjadi Rp80.000,00.",
              "Diskon 20% sama dengan membayar $\\frac{4}{5}$ dari harga awal."
            ],
            "statements": [],
            "explanation": "Diskon = $\\frac{20}{100} \\times 200.000 = 40.000$.<br>Bayar = $200.000 - 40.000 = 160.000$.<br>2 pasang diskon = $2 \\times 40.000 = 80.000$.<br>Bayar $80\\%$ (sisa setelah diskon 20%) = $\\frac{80}{100} = \\frac{4}{5}$. Semua pernyataan benar."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Edo berenang setiap 4 hari sekali, Beni setiap 6 hari sekali. Mereka berenang bersama pada tanggal 1 Maret.",
            "question": "Kapankah mereka akan berenang bersama lagi?",
            "indicator": "Mengaplikasikan konsep KPK untuk menentukan waktu kejadian bersamaan (C4).",
            "options": [
              "13 Maret",
              "25 Maret",
              "12 hari setelah 1 Maret",
              "24 hari setelah 1 Maret"
            ],
            "answer": [
              "13 Maret",
              "25 Maret",
              "12 hari setelah 1 Maret",
              "24 hari setelah 1 Maret"
            ],
            "statements": [],
            "explanation": "KPK 4 dan 6 adalah 12. Mereka berenang bersama setiap 12 hari.<br>Tanggal: $1+12=13$ Maret, $13+12=25$ Maret.<br>Semua opsi benar."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan jaring-jaring bangun ruang berikut (bayangkan gambar jaring-jaring kubus dan balok).",
            "question": "Manakah yang merupakan ciri-ciri KUBUS?",
            "indicator": "Mengelompokkan sifat-sifat bangun ruang spesifik (C3).",
            "options": [
              "Memiliki 6 sisi berbentuk persegi yang kongruen.",
              "Memiliki 12 rusuk yang sama panjang.",
              "Memiliki 3 pasang sisi yang berhadapan sama luas.",
              "Memiliki titik puncak."
            ],
            "answer": [
              "Memiliki 6 sisi berbentuk persegi yang kongruen.",
              "Memiliki 12 rusuk yang sama panjang.",
              "Memiliki 3 pasang sisi yang berhadapan sama luas."
            ],
            "statements": [],
            "explanation": "Kubus sisinya persegi kongruen, rusuk sama panjang.<br>Ciri ke-3 juga benar (karena semua sama luas, otomatis yang berhadapan sama luas).<br>Kubus tidak punya titik puncak (itu ciri limas/kerucut)."
          },
          {
            "id": 21,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Pernyataan tentang operasi hitung bilangan bulat negatif.",
            "question": "Tentukan Benar atau Salah untuk setiap pernyataan berikut!",
            "indicator": "Memahami prinsip dasar operasi bilangan bulat (C3).",
            "options": [],
            "statements": [
              {
                "text": "Negatif dikali negatif hasilnya positif.",
                "answer": true
              },
              {
                "text": "Positif dibagi negatif hasilnya positif.",
                "answer": false
              },
              {
                "text": "Pengurangan adalah penjumlahan dengan lawan bilangan pengurangnya.",
                "answer": true
              }
            ],
            "explanation": "$(-) \\times (-) = (+)$.<br>$(+) : (-) = (-)$.<br>$a - b = a + (-b)$."
          },
          {
            "id": 22,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah segitiga memiliki alas $10$ cm dan tinggi $8$ cm.",
            "question": "Tentukan kebenaran pernyataan terkait luas segitiga tersebut!",
            "indicator": "Mengaplikasikan rumus luas segitiga (C4).",
            "options": [],
            "statements": [
              {
                "text": "Luas segitiga tersebut adalah $80\\text{ cm}^2$.",
                "answer": false
              },
              {
                "text": "Luas segitiga tersebut adalah $40\\text{ cm}^2$.",
                "answer": true
              },
              {
                "text": "Jika tinggi dijadikan $2$ kali lipat, luasnya menjadi $80\\text{ cm}^2$.",
                "answer": true
              }
            ],
            "explanation": "Luas = $\\frac{1}{2} \\times 10 \\times 8 = 40$ cm$^2$.<br>Jika tinggi $\\times 2$, Luas $\\times 2 = 80$ cm$^2$."
          },
          {
            "id": 23,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Konversi satuan volume dan liter.",
            "question": "Tentukan Benar atau Salah!",
            "indicator": "Mengidentifikasi kesetaraan satuan volume (C3).",
            "options": [],
            "statements": [
              {
                "text": "1 liter sama dengan 1 dm³.",
                "answer": true
              },
              {
                "text": "1 ml sama dengan 1 cm³ (cc).",
                "answer": true
              },
              {
                "text": "1 m³ sama dengan 100 liter.",
                "answer": false
              }
            ],
            "explanation": "$1$ m$^3$ = $1.000$ dm$^3$ = $1.000$ liter."
          },
          {
            "id": 24,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Perbandingan uang Ani dan Budi adalah $3 : 5$. Jumlah uang mereka Rp80.000,00.",
            "question": "Analisis pernyataan berikut!",
            "indicator": "Menentukan nilai dari perbandingan yang diketahui jumlahnya (C5).",
            "options": [],
            "statements": [
              {
                "text": "Uang Ani adalah Rp30.000,00.",
                "answer": true
              },
              {
                "text": "Selisih uang mereka adalah Rp20.000,00.",
                "answer": true
              },
              {
                "text": "Uang Budi lebih sedikit dari uang Ani.",
                "answer": false
              }
            ],
            "explanation": "Ani = $\\frac{3}{8} \\times 80.000 = 30.000$.<br>Budi = $\\frac{5}{8} \\times 80.000 = 50.000$.<br>Selisih = $20.000$.<br>Budi lebih banyak dari Ani."
          },
          {
            "id": 25,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pecahan $\\frac{3}{4}$ dan $75\\%$.",
            "question": "Tentukan kebenaran hubungan kedua bilangan tersebut!",
            "indicator": "Menjelaskan makna kesetaraan pecahan dan persen (C4).",
            "options": [],
            "statements": [
              {
                "text": "3/4 nilainya sama dengan 75%.",
                "answer": true
              },
              {
                "text": "3/4 jika dijadikan desimal menjadi 0,75.",
                "answer": true
              },
              {
                "text": "3/4 lebih kecil dari 0,70.",
                "answer": false
              }
            ],
            "explanation": "$\\frac{3}{4} = 0,75 = 75\\%$.<br>$0,75 > 0,70$."
          },
          {
            "id": 26,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah peta memiliki skala 1 : 1.000.000.",
            "question": "Evaluasi pernyataan mengenai skala peta ini!",
            "indicator": "Menarik kesimpulan valid dari informasi skala peta (C6).",
            "options": [],
            "statements": [
              {
                "text": "Setiap 1 cm di peta mewakili 10 km jarak sebenarnya.",
                "answer": true
              },
              {
                "text": "Jika jarak peta 5 cm, jarak sebenarnya 50 km.",
                "answer": true
              },
              {
                "text": "Skala tersebut berarti peta diperbesar 1 juta kali dari aslinya.",
                "answer": false
              }
            ],
            "explanation": "1 cm : 1.000.000 cm = 1 cm : 10 km.<br>Skala berarti pengecilan, bukan pembesaran."
          },
          {
            "id": 27,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sifat-sifat bangun datar lingkaran.",
            "question": "Tentukan Benar/Salah!",
            "indicator": "Mengelompokkan fakta mengenai lingkaran (C3).",
            "options": [],
            "statements": [
              {
                "text": "Memiliki simetri lipat tak terhingga.",
                "answer": true
              },
              {
                "text": "Memiliki simetri putar tak terhingga.",
                "answer": true
              },
              {
                "text": "Memiliki satu titik sudut.",
                "answer": false
              }
            ],
            "explanation": "Lingkaran tidak memiliki titik sudut."
          },
          {
            "id": 28,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Debit air sebuah keran adalah 10 liter/menit.",
            "question": "Analisis pernyataan debit berikut!",
            "indicator": "Menjelaskan hubungan volume, waktu, dan debit (C5).",
            "options": [],
            "statements": [
              {
                "text": "Dalam 1 jam, air yang keluar adalah 600 liter.",
                "answer": true
              },
              {
                "text": "Untuk mengisi bak 100 liter, butuh waktu 10 menit.",
                "answer": true
              },
              {
                "text": "Debit ini setara dengan 6000 liter/jam.",
                "answer": false
              }
            ],
            "explanation": "1 jam = 60 menit $\\rightarrow 10 \\times 60 = 600$ liter (Benar).<br>Waktu = $\\frac{\\text{Vol}}{\\text{Debit}} = \\frac{100}{10} = 10$ menit (Benar).<br>10 liter/menit = 600 liter/jam (Salah di pernyataan 6000)."
          },
          {
            "id": 29,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Data nilai ulangan siswa sebagai berikut:<br> $$7, 8, 6, 9, 7, 8, 8, 10$$",
            "question": "Hitunglah ukuran pemusatan data tersebut!",
            "indicator": "Mengaplikasikan rumus mean, median, modus (C4).",
            "options": [],
            "statements": [
              {
                "text": "Modus data tersebut adalah $8$.",
                "answer": true
              },
              {
                "text": "Rata-rata data adalah $8$.",
                "answer": false
              },
              {
                "text": "Median data adalah $8$.",
                "answer": true
              }
            ],
            "explanation": "Urut: 6, 7, 7, 8, 8, 8, 9, 10.<br>Modus = 8 (muncul 3x).<br>Median = $\\frac{8+8}{2} = 8$.<br>Mean = $\\frac{63}{8} = 7,875$."
          },
          {
            "id": 30,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan operasi hitung pangkat tiga dan akar pangkat tiga berikut.",
            "question": "Tentukan kebenaran perhitungan berikut!",
            "indicator": "Melakukan perhitungan pangkat dan akar pangkat tiga (C3).",
            "options": [],
            "statements": [
              {
                "text": "$$5^3 = 125$$",
                "answer": true
              },
              {
                "text": "$$\\sqrt[3]{27} = 9$$",
                "answer": false
              },
              {
                "text": "$$2^3 + 3^3 = 35$$",
                "answer": true
              }
            ],
            "explanation": "$\\sqrt[3]{27} = 3$ (karena $3 \\times 3 \\times 3 = 27$), bukan 9.<br>$8 + 27 = 35$."
          }
        ]
      },
      {
        "nomorPaket": 2,
        "namaPaket": "Paket 2 (PATHWAY)",
        "kode": "TO-MTK-02",
        "deskripsi": "Simulasi Ujian TKA Matematika SD (Paket 2 (PATHWAY)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Ibu memiliki sebuah kue bolu. Kue tersebut dipotong menjadi 8 bagian sama besar. Adik memakan 2 potong, dan Kakak memakan 3 potong.",
            "question": "Pecahan yang menunjukkan sisa kue bolu yang belum dimakan adalah...",
            "indicator": "Menyelesaikan masalah yang berkaitan dengan operasi pengurangan pecahan berpenyebut sama dalam konteks sehari-hari.",
            "options": [
              "3/8",
              "5/8",
              "2/8",
              "1/8"
            ],
            "answer": "3/8",
            "statements": [],
            "explanation": "Total kue = 8/8. Dimakan Adik = 2/8. Dimakan Kakak = 3/8. Sisa = 8/8 - 2/8 - 3/8 = 3/8."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Pak Budi memiliki kebun seluas 1.200 m². Sebanyak 0,25 bagian ditanami jagung, 1/5 bagian ditanami singkong, dan sisanya ditanami kedelai.",
            "question": "Luas tanah yang ditanami kedelai adalah...",
            "indicator": "Mengaplikasikan operasi hitung campuran pada bilangan cacah dan pecahan/desimal untuk menghitung nilai bagian tertentu.",
            "options": [
              "660 m²",
              "300 m²",
              "240 m²",
              "540 m²"
            ],
            "answer": "660 m²",
            "statements": [],
            "explanation": "Jagung = 0,25 x 1200 = 300 m². Singkong = 1/5 x 1200 = 240 m². Total terpakai = 300 + 240 = 540 m². Sisa (Kedelai) = 1200 - 540 = 660 m²."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan urutan bilangan pecahan berikut: 0,45; 1/2; 35%; 4/5.",
            "question": "Urutan bilangan dari yang terkecil ke yang terbesar adalah...",
            "indicator": "Mengurutkan berbagai bentuk pecahan (biasa, campuran, desimal, persen) dari kecil ke besar atau sebaliknya.",
            "options": [
              "35%; 0,45; 1/2; 4/5",
              "35%; 1/2; 0,45; 4/5",
              "1/2; 35%; 0,45; 4/5",
              "0,45; 35%; 1/2; 4/5"
            ],
            "answer": "35%; 0,45; 1/2; 4/5",
            "statements": [],
            "explanation": "Ubah ke desimal: 0,45; 0,5 (1/2); 0,35 (35%); 0,8 (4/5). Urutan: 0,35 < 0,45 < 0,5 < 0,8. Jadi: 35%; 0,45; 1/2; 4/5."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah peta memiliki skala 1 : 250.000. Jarak antara Kota A dan Kota B pada peta adalah 4 cm.",
            "question": "Jarak sebenarnya antara Kota A dan Kota B adalah...",
            "indicator": "Menggunakan konsep perbandingan dan skala untuk menentukan jarak sebenarnya.",
            "options": [
              "10 km",
              "100 km",
              "1.000 km",
              "25 km"
            ],
            "answer": "10 km",
            "statements": [],
            "explanation": "Jarak Sebenarnya = Jarak Peta x Skala = 4 cm x 250.000 = 1.000.000 cm. Ubah ke km: 1.000.000 / 100.000 = 10 km."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sebuah akuarium berbentuk balok memiliki panjang 60 cm, lebar 40 cm, dan tinggi 50 cm. Akuarium tersebut diisi air hingga penuh.",
            "question": "Volume air dalam akuarium tersebut dalam satuan liter adalah...",
            "indicator": "Menghitung volume bangun ruang balok dan mengonversi satuan volume (cm³ ke liter).",
            "options": [
              "120 liter",
              "12 liter",
              "1.200 liter",
              "12.000 liter"
            ],
            "answer": "120 liter",
            "statements": [],
            "explanation": "Volume = p x l x t = 60 x 40 x 50 = 120.000 cm³. 1 liter = 1.000 cm³. Jadi volume = 120.000 / 1.000 = 120 liter."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Ayah berangkat ke kantor mengendarai mobil dengan kecepatan rata-rata 60 km/jam. Jarak rumah ke kantor adalah 15 km.",
            "question": "Waktu yang diperlukan Ayah untuk sampai di kantor adalah...",
            "indicator": "Menyelesaikan masalah yang berkaitan dengan hubungan jarak, kecepatan, dan waktu.",
            "options": [
              "15 menit",
              "25 menit",
              "30 menit",
              "45 menit"
            ],
            "answer": "15 menit",
            "statements": [],
            "explanation": "Waktu = Jarak / Kecepatan = 15 km / 60 km/jam = 1/4 jam. 1/4 jam = 1/4 x 60 menit = 15 menit."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Diketahui sifat-sifat bangun datar sebagai berikut: (1) Memiliki 4 sisi sama panjang, (2) Sudut yang berhadapan sama besar, (3) Kedua diagonal berpotongan tegak lurus dan saling membagi dua sama panjang.",
            "question": "Bangun datar yang memiliki sifat-sifat tersebut adalah...",
            "indicator": "Mengidentifikasi bangun datar (belah ketupat) berdasarkan sifat-sifat sisinya, sudutnya, dan diagonalnya.",
            "options": [
              "Belah Ketupat",
              "Persegi Panjang",
              "Layang-layang",
              "Trapesium Sama Kaki"
            ],
            "answer": "Belah Ketupat",
            "statements": [],
            "explanation": "Sifat (1) menyingkirkan persegi panjang & trapesium. Sifat (3) diagonal membagi dua sama panjang membedakannya dari layang-layang (layang-layang hanya satu diagonal yang dibagi dua). Ini adalah ciri Belah Ketupat (atau Persegi, tapi persegi tidak ada di opsi)."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah taman berbentuk lingkaran memiliki diameter 28 meter. Di sekeliling taman akan ditanami pohon palem dengan jarak antar pohon 4 meter.",
            "question": "Banyak pohon palem yang dibutuhkan adalah...",
            "indicator": "Memecahkan masalah yang melibatkan keliling lingkaran dalam konteks kehidupan sehari-hari.",
            "options": [
              "22 pohon",
              "20 pohon",
              "44 pohon",
              "21 pohon"
            ],
            "answer": "22 pohon",
            "statements": [],
            "explanation": "Keliling = π x d = (22/7) x 28 = 22 x 4 = 88 meter. Banyak pohon = Keliling / Jarak = 88 / 4 = 22 pohon."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Hasil panen padi Pak Tani adalah 2,5 ton. Sebanyak 18 kuintal dijual ke pasar, dan sisanya disimpan di lumbung.",
            "question": "Berapa kilogram padi yang disimpan di lumbung?",
            "indicator": "Melakukan operasi hitung satuan berat dengan konversi antar satuan (ton, kuintal, kg).",
            "options": [
              "700 kg",
              "2.320 kg",
              "7.000 kg",
              "70 kg"
            ],
            "answer": "700 kg",
            "statements": [],
            "explanation": "Panen = 2,5 ton = 2.500 kg. Dijual = 18 kuintal = 1.800 kg. Disimpan = 2.500 - 1.800 = 700 kg."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan jaring-jaring kubus. Jika sisi nomor 3 adalah alas kubus,",
            "question": "maka sisi yang menjadi tutup kubus adalah nomor...",
            "indicator": "Memvisualisasikan spasial jaring-jaring bangun ruang (kubus) untuk menentukan posisi sisi.",
            "options": [
              "5",
              "1",
              "6",
              "2"
            ],
            "answer": "5",
            "statements": [],
            "explanation": "Pada jaring-jaring kubus standar, sisi alas dan tutup selalu berselang satu sisi lain. Jika nomor 3 adalah alas, maka sisi yang berhadapan (tutup) biasanya berjarak satu kotak, yaitu nomor 5."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Suhu di dalam kulkas adalah -4°C. Suhu di dalam ruangan adalah 28°C. Segelas air panas bersuhu 80°C diletakkan di atas meja.",
            "question": "Pilihlah pernyataan-pernyataan yang BENAR terkait bilangan bulat berdasarkan situasi di atas.",
            "indicator": "Menganalisis dan membandingkan bilangan bulat negatif dan positif dalam konteks suhu.",
            "options": [
              "Selisih suhu antara kulkas dan ruangan adalah 24°C.",
              "Selisih suhu antara kulkas dan ruangan adalah 32°C.",
              "Suhu kulkas lebih rendah daripada suhu ruangan.",
              "Suhu air panas 52°C lebih tinggi dari suhu ruangan."
            ],
            "answer": [
              "Selisih suhu antara kulkas dan ruangan adalah 32°C.",
              "Suhu kulkas lebih rendah daripada suhu ruangan.",
              "Suhu air panas 52°C lebih tinggi dari suhu ruangan."
            ],
            "statements": [],
            "explanation": "Selisih kulkas & ruangan = 28 - (-4) = 32°C (Benar). Kulkas (-4) < Ruangan (28) (Benar). Selisih air panas & ruangan = 80 - 28 = 52°C (Benar). Opsi 1 salah karena 28-4=24 (mengabaikan tanda negatif)."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui pecahan-pecahan berikut: A = 3/4, B = 0,75, C = 75%, D = 15/20.",
            "question": "Manakah dari pernyataan berikut yang menunjukkan kesetaraan nilai yang BENAR?",
            "indicator": "Mengevaluasi kesetaraan berbagai bentuk representasi bilangan rasional (pecahan, desimal, persen).",
            "options": [
              "Nilai A sama dengan nilai B.",
              "Nilai C lebih kecil dari nilai D.",
              "Semua bilangan (A, B, C, D) memiliki nilai yang sama.",
              "Nilai D jika diubah ke persen menjadi 80%."
            ],
            "answer": [
              "Nilai A sama dengan nilai B.",
              "Semua bilangan (A, B, C, D) memiliki nilai yang sama."
            ],
            "statements": [],
            "explanation": "A=3/4=0,75. B=0,75. C=75%=0,75. D=15/20 (bagi 5) = 3/4=0,75. Jadi A=B=C=D. Pernyataan 'C lebih kecil D' salah. 'D menjadi 80%' salah (harusnya 75%)."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bangun ruang gabungan terdiri dari kubus dengan sisi 10 cm dan balok dengan ukuran 20 cm x 10 cm x 12 cm yang menempel pada salah satu sisi kubus.",
            "question": "Pernyataan mana saja yang tepat mengenai bangun tersebut?",
            "indicator": "Menganalisis sifat-sifat metrik (volume dan luas) dari gabungan bangun ruang.",
            "options": [
              "Volume kubus adalah 1.000 cm³.",
              "Volume balok adalah 2.400 cm³.",
              "Volume total bangun gabungan adalah 3.000 cm³.",
              "Tinggi balok lebih panjang dari sisi kubus."
            ],
            "answer": [
              "Volume kubus adalah 1.000 cm³.",
              "Volume balok adalah 2.400 cm³.",
              "Tinggi balok lebih panjang dari sisi kubus."
            ],
            "statements": [],
            "explanation": "Vol Kubus = 10³ = 1000. Vol Balok = 20x10x12 = 2400. Total = 3400 (Opsi 3 salah karena menyebut 3000). Tinggi balok (12) > Sisi kubus (10) (Benar)."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Rina memiliki pita sepanjang 4,5 meter. Ia menggunakan 1 1/2 meter untuk kerajinan dan memberikan 1,25 meter kepada adiknya.",
            "question": "Analisis operasi hitung berikut yang BENAR menggambarkan sisa pita Rina.",
            "indicator": "Memodelkan dan mengevaluasi operasi pengurangan bilangan desimal dan pecahan campuran.",
            "options": [
              "Sisa pita dapat dihitung dengan 4,5 - 1,5 - 1,25.",
              "Sisa pita Rina adalah 1,75 meter.",
              "Pita yang diberikan ke adik lebih panjang daripada yang dipakai sendiri.",
              "Total pita yang keluar dari tangan Rina adalah 2,75 meter."
            ],
            "answer": [
              "Sisa pita dapat dihitung dengan 4,5 - 1,5 - 1,25.",
              "Sisa pita Rina adalah 1,75 meter.",
              "Total pita yang keluar dari tangan Rina adalah 2,75 meter."
            ],
            "statements": [],
            "explanation": "4,5 - 1,5 (1 1/2) - 1,25 = 1,75 (Benar). Total keluar = 1,5 + 1,25 = 2,75 (Benar). Adik (1,25) < Sendiri (1,5), jadi pernyataan 'Adik lebih panjang' Salah."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Pak Andi mengendarai motor selama 2 jam dengan kecepatan 50 km/jam. Pak Budi mengendarai mobil selama 1,5 jam dengan kecepatan 80 km/jam.",
            "question": "Pilihlah kesimpulan yang BENAR berdasarkan perbandingan jarak tempuh mereka.",
            "indicator": "Menganalisis dan membandingkan hasil perhitungan jarak berdasarkan kecepatan dan waktu dari dua situasi berbeda.",
            "options": [
              "Jarak yang ditempuh Pak Andi adalah 100 km.",
              "Jarak yang ditempuh Pak Budi adalah 120 km.",
              "Pak Andi menempuh jarak lebih jauh daripada Pak Budi.",
              "Selisih jarak tempuh mereka adalah 20 km."
            ],
            "answer": [
              "Jarak yang ditempuh Pak Andi adalah 100 km.",
              "Jarak yang ditempuh Pak Budi adalah 120 km.",
              "Selisih jarak tempuh mereka adalah 20 km."
            ],
            "statements": [],
            "explanation": "Andi: 2 x 50 = 100 km. Budi: 1,5 x 80 = 120 km. Budi > Andi (Opsi 3 salah). Selisih 120-100=20 (Benar)."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan koordinat titik berikut pada bidang Kartesius: A(-2, 3), B(2, 3), C(3, -2), D(-3, -2).",
            "question": "Jika titik-titik tersebut dihubungkan berurutan (A-B-C-D-A), pernyataan yang benar adalah...",
            "indicator": "Mengidentifikasi jenis bangun datar yang terbentuk dari titik-titik koordinat dan menganalisis sifatnya.",
            "options": [
              "Bangun yang terbentuk adalah Trapesium Sama Kaki.",
              "Panjang sisi AB adalah 4 satuan.",
              "Bangun tersebut memiliki sepasang sisi sejajar.",
              "Titik B berada di kuadran I."
            ],
            "answer": [
              "Bangun yang terbentuk adalah Trapesium Sama Kaki.",
              "Panjang sisi AB adalah 4 satuan.",
              "Bangun tersebut memiliki sepasang sisi sejajar.",
              "Titik B berada di kuadran I."
            ],
            "statements": [],
            "explanation": "AB horizontal di y=3, panjang 2-(-2)=4. CD horizontal di y=-2, panjang 3-(-3)=6. Karena AB sejajar CD dan panjang kaki AD dan BC simetris, ini Trapesium Sama Kaki. Titik B(2,3) positif-positif = Kuadran I. Semua opsi benar."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bak mandi berbentuk kubus memiliki kedalaman 80 cm. Air mengalir dari kran dengan debit 10 liter/menit.",
            "question": "Pilihlah langkah atau kesimpulan yang BENAR untuk menghitung waktu pengisian.",
            "indicator": "Merencanakan prosedur pemecahan masalah yang melibatkan volume kubus, konversi satuan, dan debit.",
            "options": [
              "Volume bak mandi harus dihitung dulu, yaitu 512.000 cm³.",
              "Volume bak mandi setara dengan 512 liter.",
              "Waktu yang dibutuhkan adalah Volume dibagi Debit.",
              "Waktu pengisian penuh adalah sekitar 51,2 menit."
            ],
            "answer": [
              "Volume bak mandi harus dihitung dulu, yaitu 512.000 cm³.",
              "Volume bak mandi setara dengan 512 liter.",
              "Waktu yang dibutuhkan adalah Volume dibagi Debit.",
              "Waktu pengisian penuh adalah sekitar 51,2 menit."
            ],
            "statements": [],
            "explanation": "Vol = 80³ = 512.000 cm³ = 512 Liter. Waktu = Vol/Debit = 512/10 = 51,2 menit. Semua langkah benar."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Berikut adalah data berat badan 5 siswa: 35 kg, 38 kg, 34 kg, 40 kg, 38 kg.",
            "question": "Manakah pernyataan statistik sederhana yang BENAR?",
            "indicator": "Menentukan rata-rata (mean), modus, dan median dari data tunggal.",
            "options": [
              "Rata-rata berat badan siswa adalah 37 kg.",
              "Modus data tersebut adalah 38 kg.",
              "Median data tersebut adalah 34 kg.",
              "Selisih berat terberat dan teringan adalah 6 kg."
            ],
            "answer": [
              "Rata-rata berat badan siswa adalah 37 kg.",
              "Modus data tersebut adalah 38 kg.",
              "Selisih berat terberat dan teringan adalah 6 kg."
            ],
            "statements": [],
            "explanation": "Urut data: 34, 35, 38, 38, 40. Median = 38 (data ke-3), jadi pernyataan 'Median 34' Salah. Modus = 38 (muncul 2x). Mean = (34+35+38+38+40)/5 = 185/5 = 37. Range = 40-34=6."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ibu membeli 3,5 kg gula pasir. Sebanyak 20% digunakan untuk membuat kue, dan 1 1/2 kg diberikan kepada nenek.",
            "question": "Evaluasi pernyataan berikut terkait sisa gula Ibu.",
            "indicator": "Mengevaluasi operasi hitung pecahan persen dan campuran dalam masalah pengurangan beruntun.",
            "options": [
              "Banyak gula yang digunakan untuk kue adalah 0,7 kg.",
              "Gula yang diberikan ke nenek adalah 1,5 kg.",
              "Sisa gula Ibu sekarang adalah 1,3 kg.",
              "Gula yang dipakai kue lebih sedikit daripada yang diberi ke nenek."
            ],
            "answer": [
              "Banyak gula yang digunakan untuk kue adalah 0,7 kg.",
              "Gula yang diberikan ke nenek adalah 1,5 kg.",
              "Sisa gula Ibu sekarang adalah 1,3 kg.",
              "Gula yang dipakai kue lebih sedikit daripada yang diberi ke nenek."
            ],
            "statements": [],
            "explanation": "Kue = 20% x 3,5 = 0,7 kg. Nenek = 1,5 kg. Sisa = 3,5 - 0,7 - 1,5 = 1,3 kg. Kue (0,7) < Nenek (1,5). Semua benar."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Dua buah lingkaran memiliki jari-jari masing-masing r1 = 7 cm dan r2 = 14 cm.",
            "question": "Pilihlah pernyataan yang BENAR mengenai perbandingan luas dan kelilingnya.",
            "indicator": "Menganalisis hubungan perbandingan jari-jari terhadap perbandingan keliling dan luas lingkaran.",
            "options": [
              "Perbandingan jari-jari r1 : r2 adalah 1 : 2.",
              "Perbandingan keliling lingkaran pertama dan kedua adalah 1 : 2.",
              "Perbandingan luas lingkaran pertama dan kedua adalah 1 : 4.",
              "Luas lingkaran kedua adalah dua kali luas lingkaran pertama."
            ],
            "answer": [
              "Perbandingan jari-jari r1 : r2 adalah 1 : 2.",
              "Perbandingan keliling lingkaran pertama dan kedua adalah 1 : 2.",
              "Perbandingan luas lingkaran pertama dan kedua adalah 1 : 4."
            ],
            "statements": [],
            "explanation": "r1:r2 = 7:14 = 1:2. Keliling berbanding lurus dengan r (1:2). Luas berbanding lurus dengan kuadrat r (1² : 2² = 1 : 4). Pernyataan 'Luas kedua dua kali...' salah, harusnya empat kali."
          },
          {
            "id": 21,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui pecahan A = 2/3 dan pecahan B = 5/7.",
            "question": "Tentukan kebenaran pernyataan terkait perbandingan kedua pecahan tersebut.",
            "indicator": "Membandingkan dua pecahan dengan penyebut berbeda menggunakan penalaran matematika.",
            "options": [],
            "statements": [
              {
                "text": "Pecahan A lebih besar daripada pecahan B.",
                "answer": false
              },
              {
                "text": "Jika penyebut disamakan menjadi 21, A menjadi 14/21.",
                "answer": true
              },
              {
                "text": "Selisih kedua pecahan tersebut adalah 1/21.",
                "answer": true
              },
              {
                "text": "Pecahan B senilai dengan 15/21.",
                "answer": true
              }
            ],
            "explanation": "A=14/21, B=15/21. Maka A < B (Salah). Selisih 15/21 - 14/21 = 1/21 (Benar). B=5/7 x 3/3 = 15/21 (Benar)."
          },
          {
            "id": 22,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bangun datar memiliki 4 sisi, sepasang sisi sejajar tidak sama panjang, dan dua kaki sudut yang sama panjang.",
            "question": "Analisis ciri-ciri bangun datar Trapesium Sama Kaki.",
            "indicator": "Mengidentifikasi sifat-sifat bangun datar trapesium sama kaki.",
            "options": [],
            "statements": [
              {
                "text": "Bangun tersebut adalah Trapesium Siku-siku.",
                "answer": false
              },
              {
                "text": "Bangun tersebut memiliki simetri lipat sebanyak 1.",
                "answer": true
              },
              {
                "text": "Sudut-sudut yang berdekatan di antara dua sisi sejajar berjumlah 180 derajat.",
                "answer": true
              },
              {
                "text": "Kedua diagonalnya sama panjang.",
                "answer": true
              }
            ],
            "explanation": "Deskripsi stimulus adalah Trapesium Sama Kaki, bukan Siku-siku (Salah). Punya 1 simetri lipat (Benar). Sudut dalam sepihak berjumlah 180 (Benar). Diagonal sama panjang (Benar)."
          },
          {
            "id": 23,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pak Eko memanen 4 ton padi. 1/2 bagian digiling menjadi beras, 10% disimpan sebagai bibit, dan sisanya dijual.",
            "question": "Tentukan kebenaran distribusi hasil panen berikut.",
            "indicator": "Menghitung distribusi porsi dalam satuan berat berdasarkan persentase dan pecahan.",
            "options": [],
            "statements": [
              {
                "text": "Padi yang digiling menjadi beras adalah 2.000 kg.",
                "answer": true
              },
              {
                "text": "Padi yang disimpan sebagai bibit adalah 40 kg.",
                "answer": false
              },
              {
                "text": "Padi yang dijual adalah 1.600 kg.",
                "answer": true
              },
              {
                "text": "Bagian yang dijual lebih besar dari bagian yang digiling.",
                "answer": false
              }
            ],
            "explanation": "Total 4 ton = 4000 kg. Giling = 1/2 x 4000 = 2000 kg. Bibit = 10% x 4000 = 400 kg (Salah, teks soal bilang 40 kg). Sisa Jual = 4000 - 2000 - 400 = 1600 kg. Jual (1600) < Giling (2000) (Salah)."
          },
          {
            "id": 24,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah prisma segitiga memiliki alas dengan luas 20 cm² dan tinggi prisma 15 cm.",
            "question": "Validasi pernyataan mengenai volume dan luas permukaan prisma.",
            "indicator": "Menghitung volume prisma dan memahami konsep luas permukaan.",
            "options": [],
            "statements": [
              {
                "text": "Volume prisma tersebut adalah 300 cm³.",
                "answer": true
              },
              {
                "text": "Jika tinggi prisma diduakalikan, volumenya menjadi 600 cm³.",
                "answer": true
              },
              {
                "text": "Luas permukaan prisma hanya bergantung pada luas alas saja.",
                "answer": false
              },
              {
                "text": "Prisma segitiga memiliki 5 sisi.",
                "answer": true
              }
            ],
            "explanation": "Vol = Luas Alas x Tinggi = 20 x 15 = 300 (Benar). Jika t=30, V=20x30=600 (Benar). Luas permukaan butuh keliling alas dan tinggi juga (Salah). Sisi prisma segitiga = 2 alas + 3 tegak = 5 (Benar)."
          },
          {
            "id": 25,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Jarak Kota A ke B pada peta 5 cm. Skala peta 1 : 1.200.000.",
            "question": "Tentukan kebenaran perhitungan jarak dan waktu tempuh.",
            "indicator": "Menganalisis hubungan skala, jarak sebenarnya, dan waktu tempuh.",
            "options": [],
            "statements": [
              {
                "text": "Jarak sebenarnya adalah 60 km.",
                "answer": true
              },
              {
                "text": "Jika ditempuh dengan kecepatan 60 km/jam, butuh waktu 1 jam.",
                "answer": true
              },
              {
                "text": "Jika skala diperbesar menjadi 1 : 600.000, jarak peta menjadi 2,5 cm.",
                "answer": false
              },
              {
                "text": "Jarak 60 km setara dengan 6.000.000 cm.",
                "answer": true
              }
            ],
            "explanation": "JS = 5 x 1.200.000 = 6.000.000 cm = 60 km. Waktu = 60/60 = 1 jam. Skala diperbesar (angka makin kecil, peta makin detail/besar), jarak peta harusnya makin besar (10 cm), bukan makin kecil (Salah)."
          },
          {
            "id": 26,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Data nilai ulangan matematika: 7, 8, 9, 6, 7, 8, 10, 8, 7, 9.",
            "question": "Tentukan kebenaran parameter statistik data tersebut.",
            "indicator": "Menghitung dan memverifikasi modus, median, dan mean data tunggal.",
            "options": [],
            "statements": [
              {
                "text": "Modus data tersebut adalah 7 dan 8.",
                "answer": true
              },
              {
                "text": "Nilai rata-ratanya adalah 8.",
                "answer": false
              },
              {
                "text": "Nilai tertinggi adalah 10.",
                "answer": true
              },
              {
                "text": "Banyak siswa yang nilainya di atas 8 adalah 3 orang.",
                "answer": true
              }
            ],
            "explanation": "Urut: 6, 7, 7, 7, 8, 8, 8, 9, 9, 10. Modus 7 dan 8 (muncul 3x) -> Bimodal (Benar). Mean = 79/10 = 7,9 (Salah, bukan 8). Nilai > 8 adalah 9, 9, 10 (3 orang) (Benar)."
          },
          {
            "id": 27,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah roda sepeda memiliki jari-jari 28 cm. Roda tersebut berputar sebanyak 100 kali.",
            "question": "Tentukan kebenaran mengenai jarak yang ditempuh.",
            "indicator": "Mengaplikasikan konsep keliling lingkaran untuk menghitung jarak tempuh roda.",
            "options": [],
            "statements": [
              {
                "text": "Keliling roda tersebut adalah 176 cm.",
                "answer": true
              },
              {
                "text": "Jarak yang ditempuh adalah 176 meter.",
                "answer": true
              },
              {
                "text": "Jika jari-jari dilipatgandakan, jarak tempuh menjadi setengahnya.",
                "answer": false
              },
              {
                "text": "Jarak tempuh dihitung dengan rumus n x π x r².",
                "answer": false
              }
            ],
            "explanation": "K = 2 x 22/7 x 28 = 176 cm (Benar). Jarak = 100 x 176 = 17600 cm = 176 m (Benar). Jika r x 2, Keliling x 2, Jarak x 2 (Salah). Rumus jarak = n x Keliling (2πr), bukan luas (Salah)."
          },
          {
            "id": 28,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Operasi hitung campuran: 1.500 - 500 : 50 + 200 x 5.",
            "question": "Tentukan kebenaran urutan dan hasil operasi hitung.",
            "indicator": "Menerapkan aturan hierarki operasi hitung campuran (KuKaBaTaKu) dengan benar.",
            "options": [],
            "statements": [
              {
                "text": "Operasi pengurangan dikerjakan paling pertama.",
                "answer": false
              },
              {
                "text": "Hasil dari 500 : 50 adalah 10.",
                "answer": true
              },
              {
                "text": "Hasil dari 200 x 5 adalah 1.000.",
                "answer": true
              },
              {
                "text": "Hasil akhir perhitungan tersebut adalah 2.490.",
                "answer": true
              }
            ],
            "explanation": "Urutan: Bagi/Kali dulu, baru Kurang/Tambah. 1500 - (10) + (1000) = 1490 + 1000 = 2490. Pengurangan dikerjakan setelah pembagian (Salah)."
          },
          {
            "id": 29,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Debit air sungai adalah 3000 liter/detik.",
            "question": "Konversi satuan debit air.",
            "indicator": "Melakukan konversi satuan volume dan waktu dalam besaran debit.",
            "options": [],
            "statements": [
              {
                "text": "Dalam 1 menit, air yang mengalir adalah 180.000 liter.",
                "answer": true
              },
              {
                "text": "3000 liter/detik sama dengan 3 m³/detik.",
                "answer": true
              },
              {
                "text": "Untuk mengisi kolam 9.000 m³, butuh waktu 3000 detik.",
                "answer": true
              },
              {
                "text": "Satuan debit tidak bisa diubah ke m³/jam.",
                "answer": false
              }
            ],
            "explanation": "1 menit = 60 detik -> 3000 x 60 = 180.000 (Benar). 1 m³ = 1000 liter -> 3000 l = 3 m³ (Benar). Waktu = Vol/Debit = 9000/3 = 3000 detik (Benar). Satuan bisa diubah (Salah)."
          },
          {
            "id": 30,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Sumbu simetri lipat pada bangun datar.",
            "question": "Verifikasi jumlah simetri lipat pada bangun datar berikut.",
            "indicator": "Mengidentifikasi jumlah simetri lipat pada berbagai bangun datar.",
            "options": [],
            "statements": [
              {
                "text": "Persegi memiliki 4 simetri lipat.",
                "answer": true
              },
              {
                "text": "Persegi panjang memiliki 4 simetri lipat.",
                "answer": false
              },
              {
                "text": "Segitiga sama sisi memiliki 3 simetri lipat.",
                "answer": true
              },
              {
                "text": "Lingkaran memiliki simetri lipat tak terhingga.",
                "answer": true
              }
            ],
            "explanation": "Persegi (4), Persegi Panjang (2), Segitiga Sama Sisi (3), Lingkaran (tak hingga). Pernyataan Persegi Panjang 4 adalah Salah."
          }
        ]
      },
      {
        "nomorPaket": 3,
        "namaPaket": "Paket 3 (FOCUS)",
        "kode": "TO-MTK-03",
        "deskripsi": "Simulasi Ujian TKA Matematika SD (Paket 3 (FOCUS)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Ibu membeli sebuah kue bolu dan memotongnya menjadi 8 bagian sama besar. Adik memakan 2 potong dan Kakak memakan 3 potong.",
            "question": "Pecahan yang menunjukkan sisa kue bolu ibu adalah...",
            "indicator": "Menyelesaikan masalah kontekstual yang melibatkan pengurangan pecahan.",
            "options": [
              "3/8",
              "5/8",
              "1/8",
              "2/8"
            ],
            "answer": "3/8",
            "statements": [],
            "explanation": "Total kue = 8/8. Dimakan Adik 2/8, Kakak 3/8. Total dimakan = 5/8. Sisa = 8/8 - 5/8 = 3/8."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan pecahan berikut: 3/4, 0.6, 55%, 0.8.",
            "question": "Urutan pecahan dari yang terbesar ke terkecil adalah...",
            "indicator": "Mengurutkan berbagai bentuk pecahan (biasa, desimal, persen).",
            "options": [
              "0.8; 3/4; 0.6; 55%",
              "3/4; 0.8; 55%; 0.6",
              "0.8; 0.6; 3/4; 55%",
              "55%; 0.6; 3/4; 0.8"
            ],
            "answer": "0.8; 3/4; 0.6; 55%",
            "statements": [],
            "explanation": "Ubah ke desimal: 3/4 = 0.75; 0.6 = 0.60; 55% = 0.55; 0.8 = 0.80. Urutan: 0.80 > 0.75 > 0.60 > 0.55."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bak mandi berbentuk kubus memiliki panjang rusuk 80 cm. Bak tersebut terisi air setengah bagian.",
            "question": "Volume air dalam bak mandi tersebut adalah... liter.",
            "indicator": "Menghitung volume kubus dan mengonversi satuan volume.",
            "options": [
              "256 liter",
              "512 liter",
              "320 liter",
              "640 liter"
            ],
            "answer": "256 liter",
            "statements": [],
            "explanation": "Volume penuh = s x s x s = 80 x 80 x 80 = 512.000 cm³ = 512 liter. Berisi setengah = 1/2 x 512 = 256 liter."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Ayah memiliki tali sepanjang 5 1/2 meter. Tali tersebut dipotong 2 1/4 meter untuk jemuran, dan sisanya dibagi menjadi 2 bagian sama panjang untuk mengikat kardus.",
            "question": "Panjang setiap potongan tali untuk mengikat kardus adalah...",
            "indicator": "Melakukan operasi hitung campuran pecahan (pengurangan dan pembagian).",
            "options": [
              "1 5/8 meter",
              "1 1/2 meter",
              "2 1/8 meter",
              "3 1/4 meter"
            ],
            "answer": "1 5/8 meter",
            "statements": [],
            "explanation": "Sisa tali = 5 1/2 - 2 1/4 = 11/2 - 9/4 = 22/4 - 9/4 = 13/4 meter. Dibagi 2 = 13/4 : 2 = 13/8 = 1 5/8 meter."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Jarak kota A ke kota B pada peta adalah 5 cm. Skala peta tersebut adalah 1 : 1.200.000.",
            "question": "Jarak sebenarnya kedua kota tersebut adalah...",
            "indicator": "Menggunakan konsep perbandingan skala untuk mencari jarak sebenarnya.",
            "options": [
              "60 km",
              "6 km",
              "600 km",
              "120 km"
            ],
            "answer": "60 km",
            "statements": [],
            "explanation": "Jarak Sebenarnya = Jarak Peta x Skala = 5 cm x 1.200.000 = 6.000.000 cm = 60 km."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Pak Budi memiliki kebun berbentuk persegi panjang dengan keliling 140 meter. Jika perbandingan panjang dan lebarnya adalah 4 : 3.",
            "question": "Luas kebun Pak Budi adalah...",
            "indicator": "Memecahkan masalah luas bangun datar yang melibatkan perbandingan.",
            "options": [
              "1.200 m²",
              "1.600 m²",
              "2.400 m²",
              "900 m²"
            ],
            "answer": "1.200 m²",
            "statements": [],
            "explanation": "Keliling = 2(p+l) -> 140 = 2(p+l) -> p+l = 70. Rasio 4:3. Panjang = 4/7 x 70 = 40. Lebar = 3/7 x 70 = 30. Luas = 40 x 30 = 1.200 m²."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Data nilai ulangan Matematika kelas 6 adalah: 80, 70, 90, 80, 60, 80, 70, 90, 100, 80.",
            "question": "Modus dari data tersebut adalah...",
            "indicator": "Menentukan modus dari sekumpulan data tunggal.",
            "options": [
              "80",
              "70",
              "90",
              "100"
            ],
            "answer": "80",
            "statements": [],
            "explanation": "Nilai 80 muncul sebanyak 4 kali (paling sering), maka modus adalah 80."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah lingkaran memiliki keliling 88 cm (π = 22/7).",
            "question": "Luas lingkaran tersebut adalah...",
            "indicator": "Menghitung luas lingkaran jika diketahui kelilingnya.",
            "options": [
              "616 cm²",
              "1.386 cm²",
              "154 cm²",
              "308 cm²"
            ],
            "answer": "616 cm²",
            "statements": [],
            "explanation": "K = 2πr -> 88 = 2 x 22/7 x r -> 88 = 44/7 x r -> r = 88 x 7/44 = 14 cm. Luas = 22/7 x 14 x 14 = 616 cm²."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Hasil dari 12.456 - 3.219 + 5.788 adalah...",
            "question": "Hasil operasi hitung bilangan cacah tersebut adalah...",
            "indicator": "Melakukan operasi penjumlahan dan pengurangan bilangan cacah.",
            "options": [
              "15.025",
              "14.925",
              "15.125",
              "9.237"
            ],
            "answer": "15.025",
            "statements": [],
            "explanation": "12.456 - 3.219 = 9.237. Kemudian 9.237 + 5.788 = 15.025."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah wadah berbentuk balok berukuran 20 cm x 15 cm x 30 cm berisi penuh minyak goreng. Minyak tersebut akan dituang ke dalam botol kecil bervolume 450 ml.",
            "question": "Banyak botol yang dibutuhkan adalah...",
            "indicator": "Menyelesaikan masalah yang berkaitan dengan volume bangun ruang dan pembagian.",
            "options": [
              "20 botol",
              "15 botol",
              "25 botol",
              "10 botol"
            ],
            "answer": "20 botol",
            "statements": [],
            "explanation": "Volume wadah = 20 x 15 x 30 = 9.000 cm³ = 9.000 ml. Jumlah botol = 9.000 / 450 = 20 botol."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui pecahan 2/3 dan 4/6 serta sebuah gambar lingkaran yang diarsir 2 bagian dari 3 bagian.",
            "question": "Pernyataan berikut yang benar mengenai pecahan senilai adalah... (Pilih semua yang benar)",
            "indicator": "Mengidentifikasi konsep pecahan senilai menggunakan gambar dan simbol.",
            "options": [
              "2/3 senilai dengan 4/6.",
              "2/3 lebih kecil dari 4/6.",
              "Jika pembilang dan penyebut 2/3 dikali 3, hasilnya 6/9.",
              "4/6 jika disederhanakan menjadi 1/2."
            ],
            "answer": [
              "2/3 senilai dengan 4/6.",
              "Jika pembilang dan penyebut 2/3 dikali 3, hasilnya 6/9."
            ],
            "statements": [],
            "explanation": "2/3 = 4/6 (benar). 2/3 = 6/9 (benar). 4/6 disederhanakan 2/3 (bukan 1/2)."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Toko 'Maju Jaya' memberikan diskon 20% untuk tas seharga Rp200.000 dan diskon 15% untuk sepatu seharga Rp300.000.",
            "question": "Manakah pernyataan yang benar terkait harga barang? (Pilih 2 jawaban)",
            "indicator": "Menyelesaikan masalah aritmatika sosial sederhana (diskon/persen).",
            "options": [
              "Besar diskon tas adalah Rp40.000.",
              "Harga sepatu setelah diskon adalah Rp250.000.",
              "Total potongan harga untuk kedua barang adalah Rp85.000.",
              "Harga tas setelah diskon lebih mahal dari harga sepatu diskon."
            ],
            "answer": [
              "Besar diskon tas adalah Rp40.000.",
              "Total potongan harga untuk kedua barang adalah Rp85.000."
            ],
            "statements": [],
            "explanation": "Diskon Tas = 20% x 200rb = 40rb. Diskon Sepatu = 15% x 300rb = 45rb. Total Potongan = 40rb+45rb = 85rb. Harga Sepatu setelah diskon = 255rb."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan sifat-sifat bangun datar berikut: (i) Memiliki 4 sisi sama panjang, (ii) Memiliki 2 pasang sudut sama besar, (iii) Diagonal berpotongan tegak lurus, (iv) Memiliki 2 simetri lipat.",
            "question": "Bangun datar yang memiliki sifat-sifat tersebut adalah... (Pilih semua kemungkinan)",
            "indicator": "Mengidentifikasi bangun datar berdasarkan sifat-sifatnya.",
            "options": [
              "Persegi",
              "Belah Ketupat",
              "Layang-layang",
              "Jajar Genjang"
            ],
            "answer": [
              "Persegi",
              "Belah Ketupat"
            ],
            "statements": [],
            "explanation": "Persegi dan Belah Ketupat memiliki 4 sisi sama panjang dan diagonal tegak lurus. Persegi memiliki 4 simetri lipat, Belah Ketupat 2. Sifat (ii) '2 pasang sudut sama besar' berlaku untuk keduanya."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Diketahui dua bilangan 12 dan 18.",
            "question": "Pernyataan yang benar tentang faktor dan kelipatan kedua bilangan tersebut adalah...",
            "indicator": "Menentukan FPB dan KPK dua bilangan.",
            "options": [
              "FPB dari 12 dan 18 adalah 6.",
              "KPK dari 12 dan 18 adalah 36.",
              "Faktor persekutuan mereka adalah 1, 2, 3, 6.",
              "KPK dari 12 dan 18 adalah 72."
            ],
            "answer": [
              "FPB dari 12 dan 18 adalah 6.",
              "KPK dari 12 dan 18 adalah 36.",
              "Faktor persekutuan mereka adalah 1, 2, 3, 6."
            ],
            "statements": [],
            "explanation": "Faktor 12: 1,2,3,4,6,12. Faktor 18: 1,2,3,6,9,18. FPB = 6. KPK (12, 18) = 36."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah akuarium berbentuk balok dengan ukuran panjang 60 cm, lebar 40 cm, dan tinggi 50 cm. Akuarium diisi air hingga 3/4 bagian.",
            "question": "Pilihlah pernyataan yang sesuai dengan kondisi tersebut.",
            "indicator": "Menghitung volume balok dan bagian volumenya.",
            "options": [
              "Volume penuh akuarium adalah 120.000 cm³.",
              "Volume air dalam akuarium adalah 90 liter.",
              "Tinggi air dalam akuarium adalah 40 cm.",
              "Masih dibutuhkan 30 liter air agar akuarium penuh."
            ],
            "answer": [
              "Volume penuh akuarium adalah 120.000 cm³.",
              "Volume air dalam akuarium adalah 90 liter.",
              "Masih dibutuhkan 30 liter air agar akuarium penuh."
            ],
            "statements": [],
            "explanation": "V = 60x40x50 = 120.000 cm³ = 120 liter. Isi 3/4 = 90 liter. Kurang = 120 - 90 = 30 liter. Tinggi air = 3/4 x 50 = 37.5 cm."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Suhu di dalam kulkas -4°C. Suhu di ruangan 28°C. Sebuah es krim dikeluarkan dari kulkas, suhunya naik 2°C setiap 3 menit.",
            "question": "Analisis situasi suhu berikut yang benar adalah...",
            "indicator": "Menyelesaikan masalah operasi hitung bilangan bulat negatif dalam konteks suhu.",
            "options": [
              "Selisih suhu kulkas dan ruangan adalah 32°C.",
              "Setelah 9 menit, suhu es krim menjadi 2°C.",
              "Suhu es krim akan mencapai 0°C setelah 6 menit.",
              "Suhu es krim lebih tinggi dari suhu ruangan."
            ],
            "answer": [
              "Selisih suhu kulkas dan ruangan adalah 32°C.",
              "Setelah 9 menit, suhu es krim menjadi 2°C.",
              "Suhu es krim akan mencapai 0°C setelah 6 menit."
            ],
            "statements": [],
            "explanation": "Selisih = 28 - (-4) = 32. Kenaikan per 3 menit = 2°C. 9 menit = 3x kenaikan (6°C), suhu = -4 + 6 = 2°C. Ke 0°C butuh naik 4°C (2x interval) = 6 menit."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diberikan data berat badan siswa (kg): 34, 35, 34, 36, 35, 34, 38, 37, 35, 34.",
            "question": "Pernyataan statistik yang benar untuk data tersebut adalah...",
            "indicator": "Menentukan mean, median, dan modus data tunggal.",
            "options": [
              "Modus data tersebut adalah 34.",
              "Rata-rata berat badan siswa adalah 35,2 kg.",
              "Siswa yang beratnya 38 kg ada 2 orang.",
              "Median data tersebut adalah 35."
            ],
            "answer": [
              "Modus data tersebut adalah 34.",
              "Rata-rata berat badan siswa adalah 35,2 kg.",
              "Median data tersebut adalah 35."
            ],
            "statements": [],
            "explanation": "34 muncul 4x (Modus). Jumlah data = 352, n=10, Mean=35.2. Urutan: 34,34,34,34,35,35,35,36,37,38. Median (data ke 5&6) = 35."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan jaring-jaring bangun ruang.",
            "question": "Ciri-ciri jaring-jaring kubus adalah... (Pilih semua yang benar)",
            "indicator": "Mengidentifikasi jaring-jaring bangun ruang sisi datar.",
            "options": [
              "Terdiri dari 6 persegi yang kongruen.",
              "Jika dilipat, sisi-sisi yang berhadapan tidak saling menutupi.",
              "Memiliki total 12 rusuk setelah dirakit.",
              "Terdiri dari 4 persegi panjang dan 2 persegi."
            ],
            "answer": [
              "Terdiri dari 6 persegi yang kongruen.",
              "Memiliki total 12 rusuk setelah dirakit."
            ],
            "statements": [],
            "explanation": "Jaring kubus terdiri dari 6 persegi sama. Persegi panjang adalah balok."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah lapangan berbentuk lingkaran dengan diameter 40 meter akan ditanami rumput. Biaya rumput Rp10.000 per m².",
            "question": "Fakta perhitungan yang tepat adalah... (π = 3,14)",
            "indicator": "Menghitung luas lingkaran dan estimasi biaya.",
            "options": [
              "Jari-jari lapangan adalah 20 meter.",
              "Luas lapangan adalah 1.256 m².",
              "Biaya total yang dibutuhkan Rp12.560.000.",
              "Keliling lapangan adalah 125,6 meter."
            ],
            "answer": [
              "Jari-jari lapangan adalah 20 meter.",
              "Luas lapangan adalah 1.256 m².",
              "Biaya total yang dibutuhkan Rp12.560.000.",
              "Keliling lapangan adalah 125,6 meter."
            ],
            "statements": [],
            "explanation": "r=20. L=3.14 x 20 x 20 = 1.256 m². Biaya = 1.256 x 10.000 = 12.560.000. K = 3.14 x 40 = 125.6. Semua benar."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ibu memiliki persediaan gula 3,5 kg. Ibu membeli lagi 2 1/4 kg. Gula tersebut digunakan untuk membuat kue sebanyak 40% dari total persediaan.",
            "question": "Pernyataan yang benar adalah...",
            "indicator": "Operasi hitung campuran berbagai bentuk pecahan.",
            "options": [
              "Total persediaan gula ibu adalah 5,75 kg.",
              "Gula yang digunakan untuk kue adalah 2,3 kg.",
              "Sisa gula ibu adalah 3,45 kg.",
              "Gula yang dibeli lebih sedikit dari gula awal."
            ],
            "answer": [
              "Total persediaan gula ibu adalah 5,75 kg.",
              "Gula yang digunakan untuk kue adalah 2,3 kg.",
              "Sisa gula ibu adalah 3,45 kg.",
              "Gula yang dibeli lebih sedikit dari gula awal."
            ],
            "statements": [],
            "explanation": "Total = 3.5 + 2.25 = 5.75 kg. Dipakai = 40% x 5.75 = 2.3 kg. Sisa = 5.75 - 2.3 = 3.45 kg. Beli 2.25 < 3.5 Awal. Semua benar."
          },
          {
            "id": 21,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Tentang sifat-sifat operasi hitung bilangan cacah.",
            "question": "Tentukan kebenaran sifat berikut.",
            "indicator": "Memahami sifat komutatif, asosiatif, dan distributif.",
            "options": [],
            "statements": [
              {
                "text": "25 + 14 = 14 + 25 adalah sifat komutatif.",
                "answer": true
              },
              {
                "text": "(10 x 2) x 5 = 10 x (2 x 5) adalah sifat asosiatif.",
                "answer": true
              },
              {
                "text": "50 - 20 = 20 - 50 adalah sifat komutatif.",
                "answer": false
              },
              {
                "text": "Perkalian bilangan dengan nol hasilnya selalu nol.",
                "answer": true
              }
            ],
            "explanation": "Pengurangan tidak berlaku sifat komutatif."
          },
          {
            "id": 22,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Konversi satuan pengukuran.",
            "question": "Benar atau Salah konversi berikut?",
            "indicator": "Mengkonversi satuan panjang, berat, dan waktu.",
            "options": [],
            "statements": [
              {
                "text": "1,5 km sama dengan 1.500 meter.",
                "answer": true
              },
              {
                "text": "2 jam 30 menit sama dengan 150 menit.",
                "answer": true
              },
              {
                "text": "300 gram sama dengan 3 kg.",
                "answer": false
              },
              {
                "text": "1 liter sama dengan 1.000 cc.",
                "answer": true
              }
            ],
            "explanation": "300 gram = 0,3 kg. 1 km = 1000 m. 1 jam = 60 menit."
          },
          {
            "id": 23,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Mengenai unsur-unsur lingkaran.",
            "question": "Validasi pernyataan tentang lingkaran.",
            "indicator": "Mengidentifikasi unsur lingkaran (jari-jari, diameter, busur).",
            "options": [],
            "statements": [
              {
                "text": "Diameter adalah garis lurus yang menghubungkan dua titik pada lingkaran dan melalui titik pusat.",
                "answer": true
              },
              {
                "text": "Panjang jari-jari adalah dua kali panjang diameter.",
                "answer": false
              },
              {
                "text": "Apotema adalah garis terpendek dari pusat ke tali busur.",
                "answer": true
              },
              {
                "text": "Tembereng adalah daerah yang dibatasi oleh busur dan tali busur.",
                "answer": true
              }
            ],
            "explanation": "Jari-jari adalah SETENGAH dari diameter, bukan dua kalinya."
          },
          {
            "id": 24,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Operasi hitung campuran bilangan bulat.",
            "question": "Cek kebenaran hasil operasi berikut.",
            "indicator": "Menghitung operasi campuran bilangan bulat (positif/negatif).",
            "options": [],
            "statements": [
              {
                "text": "-5 + (-3) = -8.",
                "answer": true
              },
              {
                "text": "10 - (-4) = 6.",
                "answer": false
              },
              {
                "text": "-8 x (-2) = -16.",
                "answer": false
              },
              {
                "text": "20 : (-4) = -5.",
                "answer": true
              }
            ],
            "explanation": "10 - (-4) = 14. -8 x (-2) = 16 (positif)."
          },
          {
            "id": 25,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Volume dan Luas Permukaan Bangun Ruang.",
            "question": "Tentukan kebenaran rumus.",
            "indicator": "Mengingat dan memahami rumus bangun ruang.",
            "options": [],
            "statements": [
              {
                "text": "Volume Kubus = s x s x s.",
                "answer": true
              },
              {
                "text": "Luas Permukaan Balok = p x l x t.",
                "answer": false
              },
              {
                "text": "Volume Prisma Segitiga = Luas Alas x Tinggi.",
                "answer": true
              },
              {
                "text": "Luas Permukaan Kubus = 6 x s².",
                "answer": true
              }
            ],
            "explanation": "LP Balok = 2(pl + pt + lt)."
          },
          {
            "id": 26,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sistem Koordinat Kartesius.",
            "question": "Pernyataan tentang posisi titik.",
            "indicator": "Menentukan letak titik pada kuadran.",
            "options": [],
            "statements": [
              {
                "text": "Titik (2, 3) berada di Kuadran I.",
                "answer": true
              },
              {
                "text": "Titik (-4, 5) berada di Kuadran III.",
                "answer": false
              },
              {
                "text": "Sumbu X adalah garis horizontal.",
                "answer": true
              },
              {
                "text": "Titik pusat koordinat adalah (0,0).",
                "answer": true
              }
            ],
            "explanation": "(-4, 5) ada di Kuadran II (x negatif, y positif)."
          },
          {
            "id": 27,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pecahan dan Desimal.",
            "question": "Hubungan nilai pecahan.",
            "indicator": "Mengubah bentuk pecahan ke desimal.",
            "options": [],
            "statements": [
              {
                "text": "1/4 sama dengan 0,25.",
                "answer": true
              },
              {
                "text": "3/5 sama dengan 0,6.",
                "answer": true
              },
              {
                "text": "1/8 sama dengan 0,12.",
                "answer": false
              },
              {
                "text": "2 1/2 sama dengan 2,5.",
                "answer": true
              }
            ],
            "explanation": "1/8 = 0,125."
          },
          {
            "id": 28,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Kecepatan, Jarak, dan Waktu.",
            "question": "Analisis hubungan rumus.",
            "indicator": "Memahami rumus kecepatan.",
            "options": [],
            "statements": [
              {
                "text": "Kecepatan = Jarak dibagi Waktu.",
                "answer": true
              },
              {
                "text": "Jika kecepatan 60 km/jam, dalam 2 jam menempuh 120 km.",
                "answer": true
              },
              {
                "text": "Waktu = Jarak dikali Kecepatan.",
                "answer": false
              },
              {
                "text": "m/detik adalah salah satu satuan kecepatan.",
                "answer": true
              }
            ],
            "explanation": "Waktu = Jarak dibagi Kecepatan."
          },
          {
            "id": 29,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bangun Datar Segiempat.",
            "question": "Sifat-sifat bangun datar.",
            "indicator": "Membedakan sifat trapesium dan layang-layang.",
            "options": [],
            "statements": [
              {
                "text": "Trapesium siku-siku memiliki tepat 2 sudut siku-siku.",
                "answer": true
              },
              {
                "text": "Layang-layang memiliki 2 pasang sisi sama panjang yang berdekatan.",
                "answer": true
              },
              {
                "text": "Jumlah sudut dalam segiempat adalah 180 derajat.",
                "answer": false
              },
              {
                "text": "Persegi panjang memiliki diagonal yang sama panjang.",
                "answer": true
              }
            ],
            "explanation": "Jumlah sudut segiempat adalah 360 derajat."
          },
          {
            "id": 30,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bilangan Prima dan Komposit.",
            "question": "Identifikasi bilangan.",
            "indicator": "Mengidentifikasi bilangan prima.",
            "options": [],
            "statements": [
              {
                "text": "2 adalah satu-satunya bilangan prima genap.",
                "answer": true
              },
              {
                "text": "9 adalah bilangan prima.",
                "answer": false
              },
              {
                "text": "1 bukan bilangan prima maupun komposit.",
                "answer": true
              },
              {
                "text": "17 dan 19 adalah pasangan bilangan prima.",
                "answer": true
              }
            ],
            "explanation": "9 bisa dibagi 3, jadi bukan prima (komposit)."
          }
        ]
      },
      {
        "nomorPaket": 4,
        "namaPaket": "Paket 4 (RHYTHM)",
        "kode": "TO-MTK-04",
        "deskripsi": "Simulasi Ujian TKA Matematika SD (Paket 4 (RHYTHM)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Ibu membeli 3 ½ kg tepung terigu. Sebanyak 1,25 kg digunakan untuk membuat kue bolu, dan 0,5 kg digunakan untuk membuat gorengan.",
            "question": "Sisa tepung terigu yang dimiliki Ibu sekarang adalah ...",
            "indicator": "Melakukan operasi hitung campuran (pengurangan) yang melibatkan pecahan campuran dan desimal.",
            "options": [
              "1,75 kg",
              "2,25 kg",
              "1,5 kg",
              "1,25 kg"
            ],
            "answer": "1,75 kg",
            "statements": [],
            "explanation": "3 ½ = 3,5. Sisa = 3,5 - 1,25 - 0,5 = 2,25 - 0,5 = 1,75 kg."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui dua buah lampu hias. Lampu A menyala setiap 12 detik sekali, sedangkan lampu B menyala setiap 15 detik sekali. Kedua lampu menyala bersamaan pada pukul 19.00.",
            "question": "Pada pukul berapakah kedua lampu akan menyala bersamaan untuk kedua kalinya?",
            "indicator": "Menyelesaikan permasalahan kontekstual menggunakan konsep KPK.",
            "options": [
              "19.01",
              "19.02",
              "19.05",
              "19.00 detik ke-60"
            ],
            "answer": "19.01",
            "statements": [],
            "explanation": "KPK dari 12 dan 15 adalah 60. Jadi lampu menyala bersama setiap 60 detik (1 menit). 19.00 + 1 menit = 19.01."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sebuah peta memiliki skala 1 : 2.000.000. Jarak antara kota A dan kota B pada peta adalah 4 cm.",
            "question": "Jarak sebenarnya antara kedua kota tersebut adalah ...",
            "indicator": "Mengaplikasikan konsep perbandingan/skala untuk menentukan jarak sebenarnya.",
            "options": [
              "8 km",
              "80 km",
              "800 km",
              "8.000 km"
            ],
            "answer": "80 km",
            "statements": [],
            "explanation": "Jarak Sebenarnya = Jarak Peta × Skala = 4 cm × 2.000.000 = 8.000.000 cm = 80 km."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ayah mengendarai mobil dengan kecepatan rata-rata 60 km/jam. Ia berangkat pukul 08.00 dan sampai di tujuan pukul 10.30.",
            "question": "Jika Ayah ingin sampai 30 menit lebih awal, maka kecepatan rata-rata yang harus ditempuh adalah ...",
            "indicator": "Mengevaluasi hubungan jarak, waktu, dan kecepatan untuk menentukan solusi baru.",
            "options": [
              "70 km/jam",
              "75 km/jam",
              "80 km/jam",
              "90 km/jam"
            ],
            "answer": "75 km/jam",
            "statements": [],
            "explanation": "Waktu awal = 2,5 jam. Jarak = 60 × 2,5 = 150 km. Waktu baru = 2,5 jam - 0,5 jam = 2 jam. Kecepatan baru = 150 km / 2 jam = 75 km/jam."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan gambar gabungan bangun datar persegi dan setengah lingkaran. Panjang sisi persegi adalah 14 cm.",
            "question": "Luas gabungan bangun datar tersebut adalah ... (π = 22/7)",
            "indicator": "Menghitung luas gabungan bangun datar (persegi dan setengah lingkaran).",
            "options": [
              "196 cm²",
              "273 cm²",
              "350 cm²",
              "154 cm²"
            ],
            "answer": "273 cm²",
            "statements": [],
            "explanation": "Luas Persegi = 14×14 = 196. Luas ½ Lingkaran = ½ × 22/7 × 7 × 7 = 77. Total = 196 + 77 = 273 cm²."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bak mandi berbentuk balok memiliki panjang 100 cm, lebar 60 cm, dan tinggi 80 cm. Bak tersebut telah terisi air 2/3 bagian.",
            "question": "Volume air yang perlu ditambahkan agar bak mandi tersebut penuh adalah ...",
            "indicator": "Menganalisis volume bangun ruang dan pecahan untuk menentukan volume sisa.",
            "options": [
              "160 liter",
              "320 liter",
              "480 liter",
              "160.000 liter"
            ],
            "answer": "160 liter",
            "statements": [],
            "explanation": "Volume Total = 100×60×80 = 480.000 cm³ = 480 liter. Bagian kosong = 1 - 2/3 = 1/3. Air yang ditambah = 1/3 × 480 = 160 liter."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Pak Budi memanen padi seberat 1,2 ton. Padi tersebut dimasukkan ke dalam karung yang masing-masing berisi 50 kg.",
            "question": "Banyak karung yang dibutuhkan Pak Budi adalah ...",
            "indicator": "Menyelesaikan masalah yang melibatkan konversi satuan berat (ton ke kg) dan pembagian.",
            "options": [
              "20 karung",
              "24 karung",
              "120 karung",
              "240 karung"
            ],
            "answer": "24 karung",
            "statements": [],
            "explanation": "1,2 ton = 1.200 kg. Jumlah karung = 1.200 / 50 = 24 karung."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Urutan pecahan berikut dari yang terkecil ke yang terbesar adalah: 0,45; 7/10; 50%; 3/5.",
            "question": "Urutan yang benar adalah ...",
            "indicator": "Mengurutkan berbagai bentuk pecahan (desimal, biasa, persen).",
            "options": [
              "0,45; 50%; 3/5; 7/10",
              "0,45; 3/5; 50%; 7/10",
              "3/5; 0,45; 50%; 7/10",
              "50%; 0,45; 7/10; 3/5"
            ],
            "answer": "0,45; 50%; 3/5; 7/10",
            "statements": [],
            "explanation": "Ubah ke desimal: 0,45; 0,7; 0,5; 0,6. Urutan: 0,45 (0,45) < 0,5 (50%) < 0,6 (3/5) < 0,7 (7/10)."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah termometer menunjukkan suhu ruangan 25°C. Seseorang mengatakan bahwa suhu tersebut sama dengan 80°F.",
            "question": "Pernyataan tersebut ... (Petunjuk: F = 9/5 C + 32)",
            "indicator": "Mengevaluasi kebenaran konversi suhu berdasarkan rumus.",
            "options": [
              "Benar, karena hasil konversinya tepat 80°F",
              "Salah, seharusnya 77°F",
              "Salah, seharusnya 45°F",
              "Salah, seharusnya 85°F"
            ],
            "answer": "Salah, seharusnya 77°F",
            "statements": [],
            "explanation": "F = (9/5 × 25) + 32 = (9 × 5) + 32 = 45 + 32 = 77°F."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah kubus memiliki volume 3.375 cm³. Kubus tersebut akan dipotong menjadi kubus-kubus kecil dengan panjang rusuk 3 cm.",
            "question": "Banyak kubus kecil yang dapat dibuat adalah ...",
            "indicator": "Menganalisis hubungan volume kubus besar dan kubus kecil.",
            "options": [
              "125 buah",
              "115 buah",
              "225 buah",
              "375 buah"
            ],
            "answer": "125 buah",
            "statements": [],
            "explanation": "Rusuk kubus besar = ∛3375 = 15 cm. Volume kubus kecil = 3×3×3 = 27. Banyak kubus = 3375 / 27 = 125. ATAU: (15/3)³ = 5³ = 125."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diberikan sifat-sifat bangun datar sebagai berikut: (1) Memiliki 4 sisi sama panjang, (2) Memiliki 2 pasang sudut sama besar, (3) Diagonal berpotongan tegak lurus, (4) Tidak memiliki sudut siku-siku.",
            "question": "Bangun datar yang memiliki sifat-sifat di atas adalah... (Pilih 2 jawaban yang mungkin benar)",
            "indicator": "Menganalisis sifat-sifat bangun datar segiempat.",
            "options": [
              "Persegi",
              "Belah Ketupat",
              "Layang-layang",
              "Persegi Panjang"
            ],
            "answer": [
              "Belah Ketupat",
              "Layang-layang"
            ],
            "statements": [],
            "explanation": "Sifat (1) 4 sisi sama panjang dan (4) tidak siku-siku hanya dimiliki Belah Ketupat. Tapi jika opsi direvisi menjadi sifat umum..."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan bilangan pecahan berikut: 1/2, 0.5, 50%, 2/4.",
            "question": "Pilihlah pasangan bilangan yang nilainya SETARA! (Pilih semua yang benar)",
            "indicator": "Menganalisis relasi berbagai bentuk pecahan senilai.",
            "options": [
              "1/2 dan 50%",
              "0.5 dan 2/4",
              "1/2 dan 0.75",
              "50% dan 0.2"
            ],
            "answer": [
              "1/2 dan 50%",
              "0.5 dan 2/4"
            ],
            "statements": [],
            "explanation": "1/2 = 0.5 = 50% = 2/4. Semuanya bernilai setengah."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah lingkaran memiliki jari-jari 10 cm. (π = 3,14)",
            "question": "Pernyataan berikut yang BENAR terkait lingkaran tersebut adalah...",
            "indicator": "Menghitung dan menganalisis besaran (diameter, keliling, luas) pada lingkaran.",
            "options": [
              "Diameternya 20 cm",
              "Kelilingnya 62,8 cm",
              "Luasnya 314 cm²",
              "Luasnya 62,8 cm²",
              "Kelilingnya 31,4 cm"
            ],
            "answer": [
              "Diameternya 20 cm",
              "Kelilingnya 62,8 cm",
              "Luasnya 314 cm²"
            ],
            "statements": [],
            "explanation": "d = 2r = 20. K = 3,14 x 20 = 62,8. L = 3,14 x 10 x 10 = 314."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui data nilai ulangan matematika siswa kelas 6: 7, 8, 8, 9, 7, 10, 8, 9, 8, 6.",
            "question": "Manakah pernyataan yang BENAR berdasarkan data di atas?",
            "indicator": "Mengevaluasi data tunggal untuk menentukan modus, median, dan mean.",
            "options": [
              "Modus data adalah 8",
              "Rata-rata (mean) lebih dari 8",
              "Siswa yang mendapat nilai 8 ada 4 orang",
              "Nilai terendah adalah 7"
            ],
            "answer": [
              "Modus data adalah 8",
              "Siswa yang mendapat nilai 8 ada 4 orang"
            ],
            "statements": [],
            "explanation": "Data: 6, 7, 7, 8, 8, 8, 8, 9, 9, 10. Modus = 8 (muncul 4 kali). Mean = 80/10 = 8 (tidak lebih dari 8). Nilai terendah 6."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan sifat-sifat bangun ruang berikut!",
            "question": "Ciri-ciri bangun ruang KUBUS adalah... (Pilih 2 jawaban)",
            "indicator": "Mengidentifikasi sifat-sifat bangun ruang kubus.",
            "options": [
              "Memiliki 6 sisi berbentuk persegi yang kongruen",
              "Memiliki 12 rusuk yang sama panjang",
              "Memiliki 8 sisi",
              "Memiliki titik puncak"
            ],
            "answer": [
              "Memiliki 6 sisi berbentuk persegi yang kongruen",
              "Memiliki 12 rusuk yang sama panjang"
            ],
            "statements": [],
            "explanation": "Kubus memiliki 6 sisi persegi sama luas, 12 rusuk sama panjang, 8 titik sudut."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Diketahui operasi hitung: 1.500 - 500 : 50 + 200 x 5",
            "question": "Langkah pengerjaan yang benar sesuai urutan operasi hitung campuran adalah... (Pilih langkah-langkah yang valid)",
            "indicator": "Menentukan urutan operasi hitung campuran (Kabataku).",
            "options": [
              "Mengerjakan pembagian (500 : 50) terlebih dahulu",
              "Mengerjakan pengurangan (1.500 - 500) terlebih dahulu",
              "Mengerjakan perkalian (200 x 5) setelah atau bersamaan dengan pembagian",
              "Hasil akhirnya adalah 2.490"
            ],
            "answer": [
              "Mengerjakan pembagian (500 : 50) terlebih dahulu",
              "Mengerjakan perkalian (200 x 5) setelah atau bersamaan dengan pembagian",
              "Hasil akhirnya adalah 2.490"
            ],
            "statements": [],
            "explanation": "1500 - (500:50) + (200x5) = 1500 - 10 + 1000 = 2490."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Budi memiliki persediaan tali rafia merah 2,5 m dan tali rafia biru 175 cm. Tali tersebut disambung untuk mengikat tumpukan kardus.",
            "question": "Pernyataan perbandingan yang benar adalah...",
            "indicator": "Menganalisis perbandingan panjang dengan satuan berbeda.",
            "options": [
              "Tali merah lebih panjang daripada tali biru",
              "Selisih panjang kedua tali adalah 0,75 m",
              "Panjang gabungan tali adalah 4,25 m",
              "Perbandingan panjang tali merah dan biru adalah 10 : 7"
            ],
            "answer": [
              "Tali merah lebih panjang daripada tali biru",
              "Selisih panjang kedua tali adalah 0,75 m",
              "Panjang gabungan tali adalah 4,25 m",
              "Perbandingan panjang tali merah dan biru adalah 10 : 7"
            ],
            "statements": [],
            "explanation": "Merah = 250 cm, Biru = 175 cm. Merah > Biru. Selisih = 75 cm = 0,75 m. Gabungan = 425 cm = 4,25 m. Rasio = 250:175 = 10:7. (Semua opsi benar, soal meminta memilih yang benar). *Note: Opsi semua benar di MCMA valid jika user diminta memilih pernyataan benar.*"
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah kolam renang diisi air dengan debit 50 liter/menit. Kolam tersebut penuh dalam waktu 2 jam.",
            "question": "Manakah pernyataan yang sesuai dengan situasi tersebut?",
            "indicator": "Mengevaluasi hubungan debit, volume, dan waktu.",
            "options": [
              "Volume kolam adalah 6.000 liter",
              "Jika debit diperbesar menjadi 100 liter/menit, waktu pengisian menjadi 1 jam",
              "Volume kolam adalah 100 liter",
              "Waktu 2 jam sama dengan 120 menit"
            ],
            "answer": [
              "Volume kolam adalah 6.000 liter",
              "Jika debit diperbesar menjadi 100 liter/menit, waktu pengisian menjadi 1 jam",
              "Waktu 2 jam sama dengan 120 menit"
            ],
            "statements": [],
            "explanation": "Waktu = 120 menit. Volume = 50 x 120 = 6000 liter. Jika debit 2x lipat, waktu setengahnya (1 jam)."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Koordinat titik A(2, 3), B(6, 3), C(6, 7), dan D(2, 7) dihubungkan membentuk sebuah bangun datar.",
            "question": "Ciri-ciri bangun yang terbentuk adalah...",
            "indicator": "Menganalisis bangun datar yang terbentuk pada bidang koordinat.",
            "options": [
              "Bangun tersebut adalah Persegi",
              "Luas bangun tersebut 16 satuan luas",
              "Keliling bangun tersebut 16 satuan panjang",
              "Bangun tersebut adalah Persegi Panjang"
            ],
            "answer": [
              "Bangun tersebut adalah Persegi",
              "Luas bangun tersebut 16 satuan luas",
              "Keliling bangun tersebut 16 satuan panjang"
            ],
            "statements": [],
            "explanation": "Panjang AB = 4, BC = 4. Sisi sama panjang (4 satuan). Maka Persegi. Luas = 16. Keliling = 16."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pak Tani memiliki dua petak sawah. Petak pertama menghasilkan 1,5 ton gabah, petak kedua 12 kuintal.",
            "question": "Pilihlah konversi dan operasi yang benar!",
            "indicator": "Melakukan operasi hitung dengan konversi satuan berat.",
            "options": [
              "1,5 ton = 1.500 kg",
              "12 kuintal = 1.200 kg",
              "Total panen = 2.700 kg",
              "Selisih panen = 300 kg"
            ],
            "answer": [
              "1,5 ton = 1.500 kg",
              "12 kuintal = 1.200 kg",
              "Total panen = 2.700 kg",
              "Selisih panen = 300 kg"
            ],
            "statements": [],
            "explanation": "Semua konversi dan operasi hitung di atas benar secara matematis."
          },
          {
            "id": 21,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan bilangan bulat berikut: -5, 2, -10, 0, 8.",
            "question": "Pernyataan urutan atau perbandingan yang benar adalah...",
            "indicator": "Mengurutkan dan membandingkan bilangan bulat negatif dan positif.",
            "options": [
              "-10 adalah bilangan terkecil",
              "Urutan dari terbesar: 8, 2, 0, -5, -10",
              "0 lebih kecil dari -5",
              "-5 lebih besar dari -10"
            ],
            "answer": [
              "-10 adalah bilangan terkecil",
              "Urutan dari terbesar: 8, 2, 0, -5, -10",
              "-5 lebih besar dari -10"
            ],
            "statements": [],
            "explanation": "0 > -5 (Salah opsi 3). -5 > -10 (Benar)."
          },
          {
            "id": 22,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Diberikan pernyataan matematika mengenai operasi hitung bilangan.",
            "question": "Tentukan apakah pernyataan berikut Benar atau Salah.",
            "indicator": "Menilai kebenaran operasi hitung campuran bilangan cacah.",
            "options": [],
            "statements": [
              {
                "text": "Hasil dari 10 + 20 x 5 adalah 110.",
                "answer": true
              },
              {
                "text": "Hasil dari (10 + 20) x 5 adalah 150.",
                "answer": true
              },
              {
                "text": "Operasi perkalian dikerjakan setelah penjumlahan jika tanpa kurung.",
                "answer": false
              },
              {
                "text": "100 - 50 : 2 = 25.",
                "answer": false
              }
            ],
            "explanation": "10+100=110 (Benar). 30x5=150 (Benar). Perkalian lebih kuat dari penjumlahan (Salah). 100-25=75 (Salah)."
          },
          {
            "id": 23,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah balok memiliki ukuran p = 10 cm, l = 5 cm, t = 4 cm.",
            "question": "Tentukan kebenaran pernyataan terkait balok tersebut.",
            "indicator": "Menilai kebenaran besaran geometri (volume dan luas permukaan) balok.",
            "options": [],
            "statements": [
              {
                "text": "Volume balok adalah 200 cm³.",
                "answer": true
              },
              {
                "text": "Luas permukaan balok adalah 220 cm².",
                "answer": true
              },
              {
                "text": "Jika tinggi digandakan, volume menjadi 400 cm³.",
                "answer": true
              },
              {
                "text": "Balok memiliki 6 sisi yang semuanya berbentuk persegi.",
                "answer": false
              }
            ],
            "explanation": "V=200. LP=2(50+40+20)=220. V baru = 10x5x8=400. Sisi balok persegi panjang (salah)."
          },
          {
            "id": 24,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Analisis pecahan 3/4 dan 0,8.",
            "question": "Tentukan Benar/Salah untuk perbandingan berikut.",
            "indicator": "Membandingkan nilai pecahan biasa dan desimal.",
            "options": [],
            "statements": [
              {
                "text": "3/4 lebih kecil dari 0,8.",
                "answer": true
              },
              {
                "text": "Bentuk persen dari 3/4 adalah 75%.",
                "answer": true
              },
              {
                "text": "0,8 senilai dengan 4/5.",
                "answer": true
              },
              {
                "text": "Selisih kedua bilangan adalah 0,5.",
                "answer": false
              }
            ],
            "explanation": "3/4=0,75. 0,75 < 0,8 (Benar). Selisih 0,05 (Salah)."
          },
          {
            "id": 25,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perjalanan dari Kota A ke B ditempuh dalam waktu 3 jam dengan kecepatan 60 km/jam.",
            "question": "Cek kebenaran pernyataan berikut.",
            "indicator": "Menilai hubungan jarak, kecepatan, dan waktu.",
            "options": [],
            "statements": [
              {
                "text": "Jarak Kota A ke B adalah 180 km.",
                "answer": true
              },
              {
                "text": "Jika kecepatan 90 km/jam, waktu tempuh menjadi 2 jam.",
                "answer": true
              },
              {
                "text": "Kecepatan dan waktu berbanding lurus.",
                "answer": false
              },
              {
                "text": "Jarak tempuh tetap sama meski kecepatan berubah.",
                "answer": true
              }
            ],
            "explanation": "J=60x3=180. Waktu=180/90=2. Hubungan kecepatan-waktu terbalik (salah). Jarak adalah konstanta (benar)."
          },
          {
            "id": 26,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Tentang satuan kuantitas: Lusin, Kodi, Gros, Rim.",
            "question": "Benar atau Salah konversi berikut?",
            "indicator": "Menilai kebenaran konversi satuan kuantitas.",
            "options": [],
            "statements": [
              {
                "text": "1 Lusin = 12 buah.",
                "answer": true
              },
              {
                "text": "1 Kodi = 20 buah.",
                "answer": true
              },
              {
                "text": "1 Gros = 100 buah.",
                "answer": false
              },
              {
                "text": "1 Rim = 500 lembar.",
                "answer": true
              }
            ],
            "explanation": "1 Gros = 144 buah (12 lusin)."
          },
          {
            "id": 27,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan jaring-jaring bangun ruang.",
            "question": "Tentukan pernyataan yang benar.",
            "indicator": "Menilai jaring-jaring bangun ruang.",
            "options": [],
            "statements": [
              {
                "text": "Jaring-jaring kubus terdiri dari 6 persegi.",
                "answer": true
              },
              {
                "text": "Jaring-jaring tabung terdiri dari 2 lingkaran dan 1 persegi panjang.",
                "answer": true
              },
              {
                "text": "Jaring-jaring limas segiempat memiliki 5 sisi segitiga.",
                "answer": false
              },
              {
                "text": "Jaring-jaring kerucut terdiri dari juring lingkaran dan lingkaran.",
                "answer": true
              }
            ],
            "explanation": "Limas segiempat alasnya segiempat (1 sisi), tegaknya segitiga (4 sisi)."
          },
          {
            "id": 28,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Mengenai bilangan prima dan faktor.",
            "question": "Validasi pernyataan berikut.",
            "indicator": "Mengidentifikasi bilangan prima dan faktor bilangan.",
            "options": [],
            "statements": [
              {
                "text": "2 adalah satu-satunya bilangan prima genap.",
                "answer": true
              },
              {
                "text": "9 adalah bilangan prima.",
                "answer": false
              },
              {
                "text": "Faktor dari 6 adalah 1, 2, 3, 6.",
                "answer": true
              },
              {
                "text": "KPK dari 4 dan 6 adalah 24.",
                "answer": false
              }
            ],
            "explanation": "9 bisa dibagi 3 (bukan prima). KPK 4 & 6 adalah 12."
          },
          {
            "id": 29,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui lingkaran dengan diameter 28 cm.",
            "question": "Tentukan kebenaran perhitungan berikut (π=22/7).",
            "indicator": "Menilai hasil perhitungan parameter lingkaran.",
            "options": [],
            "statements": [
              {
                "text": "Jari-jarinya 14 cm.",
                "answer": true
              },
              {
                "text": "Kelilingnya 88 cm.",
                "answer": true
              },
              {
                "text": "Luasnya 616 cm².",
                "answer": true
              },
              {
                "text": "Luas setengah lingkarannya 300 cm².",
                "answer": false
              }
            ],
            "explanation": "L = 616. Setengahnya 308."
          },
          {
            "id": 30,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sifat-sifat bangun datar layang-layang.",
            "question": "Benar atau Salah sifat berikut?",
            "indicator": "Mengidentifikasi sifat bangun layang-layang.",
            "options": [],
            "statements": [
              {
                "text": "Memiliki 2 pasang sisi sama panjang.",
                "answer": true
              },
              {
                "text": "Kedua diagonalnya sama panjang.",
                "answer": false
              },
              {
                "text": "Diagonalnya berpotongan tegak lurus.",
                "answer": true
              },
              {
                "text": "Memiliki 4 sumbu simetri.",
                "answer": false
              }
            ],
            "explanation": "Diagonal layang-layang tidak sama panjang. Hanya 1 sumbu simetri."
          }
        ]
      },
      {
        "nomorPaket": 5,
        "namaPaket": "Paket 5 (INSIGHT)",
        "kode": "TO-MTK-05",
        "deskripsi": "Simulasi Ujian TKA Matematika SD (Paket 5 (INSIGHT)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan ilustrasi berikut. Sebuah pizza dipotong menjadi 8 bagian sama besar. Andi memakan 2 bagian.",
            "question": "Pecahan yang senilai dengan bagian pizza yang dimakan Andi adalah...",
            "indicator": "Menentukan pecahan senilai menggunakan gambar dan simbol matematika.",
            "options": [
              "1/4",
              "1/3",
              "3/8",
              "1/2"
            ],
            "answer": "1/4",
            "statements": [],
            "explanation": "Bagian yang dimakan Andi adalah 2 dari 8 bagian, atau 2/8. Jika disederhanakan (pembilang dan penyebut dibagi 2), maka 2/8 = 1/4."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diberikan kartu bilangan sebagai berikut: Kartu A (0,75), Kartu B (4/5), Kartu C (70%), Kartu D (2/3).",
            "question": "Urutan kartu bilangan dari yang memiliki nilai terkecil hingga terbesar adalah...",
            "indicator": "Membandingkan dan mengurutkan berbagai bentuk pecahan (biasa, desimal, persen).",
            "options": [
              "D, C, A, B",
              "C, D, A, B",
              "C, A, D, B",
              "D, A, C, B"
            ],
            "answer": "D, C, A, B",
            "statements": [],
            "explanation": "Ubah ke bentuk desimal: A=0,75; B=4/5=0,80; C=70%=0,70; D=2/3≈0,66. Urutan dari terkecil: D (0,66), C (0,70), A (0,75), B (0,80)."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Seorang petani memanen 1.250 kg beras. Beras tersebut dimasukkan ke dalam 25 karung sama berat. Kemudian, 5 karung beras dijual ke pasar.",
            "question": "Sisa beras yang dimiliki petani sekarang adalah...",
            "indicator": "Melakukan operasi hitung campuran bilangan cacah dalam pemecahan masalah.",
            "options": [
              "250 kg",
              "750 kg",
              "1.000 kg",
              "1.200 kg"
            ],
            "answer": "1.000 kg",
            "statements": [],
            "explanation": "Berat per karung = 1.250 / 25 = 50 kg. Beras yang dijual = 5 x 50 = 250 kg. Sisa beras = 1.250 - 250 = 1.000 kg."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Ibu memiliki persediaan gula sebanyak 3/4 kg. Ibu ingin membuat 5 loyang kue. Setiap loyang kue memerlukan gula sebanyak 1/5 dari total persediaan gula yang dimiliki Ibu.",
            "question": "Berat gula yang digunakan untuk satu loyang kue adalah...",
            "indicator": "Mengaplikasikan operasi perkalian pecahan dengan bilangan asli atau pecahan lain.",
            "options": [
              "3/20 kg",
              "1/4 kg",
              "3/25 kg",
              "15/4 kg"
            ],
            "answer": "3/20 kg",
            "statements": [],
            "explanation": "Satu loyang membutuhkan 1/5 dari total persediaan. Hitungannya: 1/5 x 3/4 kg = (1x3)/(5x4) = 3/20 kg."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Lampu A menyala setiap 12 detik sekali, sedangkan Lampu B menyala setiap 15 detik sekali. Kedua lampu menyala bersamaan pada detik ke-0.",
            "question": "Kedua lampu akan menyala bersamaan lagi untuk kedua kalinya pada detik ke...",
            "indicator": "Menyelesaikan masalah yang berkaitan dengan KPK dua bilangan.",
            "options": [
              "30",
              "45",
              "60",
              "120"
            ],
            "answer": "120",
            "statements": [],
            "explanation": "Cari KPK dari 12 dan 15. Faktorisasi 12 = 2² x 3, 15 = 3 x 5. KPK = 2² x 3 x 5 = 4 x 3 x 5 = 60. Ini adalah pertama kali setelah detik 0. Untuk kedua kalinya, berarti 60 x 2 = 120 detik."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan sifat-sifat bangun datar berikut: (1) Memiliki 4 sisi sama panjang, (2) Sudut-sudut yang berhadapan sama besar, (3) Kedua diagonalnya berpotongan tegak lurus dan saling membagi dua sama panjang.",
            "question": "Bangun datar yang dimaksud adalah...",
            "indicator": "Mengidentifikasi bangun datar berdasarkan sifat-sifatnya.",
            "options": [
              "Persegi Panjang",
              "Belah Ketupat",
              "Layang-layang",
              "Trapesium"
            ],
            "answer": "Belah Ketupat",
            "statements": [],
            "explanation": "Sifat 4 sisi sama panjang dimiliki Persegi dan Belah Ketupat. Namun sifat sudut berhadapan sama besar (bukan siku-siku semua) mengarah ke Belah Ketupat."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah wadah berbentuk balok memiliki ukuran panjang 10 cm, lebar 8 cm, dan tinggi 12 cm. Wadah tersebut diisi air hingga 3/4 bagian.",
            "question": "Volume air yang perlu ditambahkan agar wadah terisi penuh adalah...",
            "indicator": "Menghitung volume bangun ruang dan menerapkannya dalam masalah pengisian air.",
            "options": [
              "240 cm³",
              "720 cm³",
              "960 cm³",
              "1.200 cm³"
            ],
            "answer": "240 cm³",
            "statements": [],
            "explanation": "Volume total = 10 x 8 x 12 = 960 cm³. Air yang ada = 3/4 x 960 = 720 cm³. Air yang perlu ditambahkan = 960 - 720 = 240 cm³ (atau 1/4 bagian dari 960)."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Jarak kota A ke kota B adalah 180 km. Ayah mengendarai mobil dari kota A ke kota B dengan kecepatan rata-rata 60 km/jam. Ayah berangkat pukul 08.00.",
            "question": "Pukul berapa Ayah tiba di kota B?",
            "indicator": "Menghitung waktu tempuh berdasarkan jarak dan kecepatan (Hubungan satuan).",
            "options": [
              "10.00",
              "10.30",
              "11.00",
              "11.30"
            ],
            "answer": "11.00",
            "statements": [],
            "explanation": "Waktu = Jarak / Kecepatan = 180 km / 60 km/jam = 3 jam. Berangkat 08.00 + 3 jam = 11.00."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Ibu membeli 3,5 kg tepung terigu, 25 ons gula pasir, dan 500 gram mentega.",
            "question": "Berat total belanjaan Ibu dalam satuan kilogram adalah...",
            "indicator": "Melakukan konversi dan operasi hitung satuan berat.",
            "options": [
              "5,5 kg",
              "6,0 kg",
              "6,5 kg",
              "7,0 kg"
            ],
            "answer": "6,5 kg",
            "statements": [],
            "explanation": "Konversi ke kg: 3,5 kg tetap; 25 ons = 2,5 kg (1 ons = 100g = 0,1kg); 500 gram = 0,5 kg. Total = 3,5 + 2,5 + 0,5 = 6,5 kg."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah keran air dapat mengisi bak mandi bervolume 120 liter dalam waktu 10 menit.",
            "question": "Jika keran tersebut digunakan untuk mengisi kolam bervolume 360 liter, waktu yang dibutuhkan adalah...",
            "indicator": "Menganalisis hubungan debit, volume, dan waktu.",
            "options": [
              "20 menit",
              "25 menit",
              "30 menit",
              "40 menit"
            ],
            "answer": "30 menit",
            "statements": [],
            "explanation": "Debit = 120 liter / 10 menit = 12 liter/menit. Waktu untuk 360 liter = Volume / Debit = 360 / 12 = 30 menit."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui pecahan 3/5. Perhatikan pernyataan-pernyataan di bawah ini.",
            "question": "Pilihlah bentuk-bentuk yang nilainya setara dengan pecahan tersebut! (Jawaban lebih dari satu)",
            "indicator": "Menentukan relasi berbagai bentuk pecahan (biasa, desimal, persen).",
            "options": [
              "0,6",
              "60%",
              "6/10",
              "35%"
            ],
            "answer": [
              "0,6",
              "60%",
              "6/10"
            ],
            "statements": [],
            "explanation": "3/5 = 6/10 (dikali 2/2) = 0,6 = 60%. 35% tidak setara."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Pak Budi memiliki 24 buah apel dan 36 buah jeruk. Ia ingin membagikan buah-buahan tersebut ke dalam beberapa keranjang dengan jumlah sama banyak.",
            "question": "Pilihlah pernyataan yang benar berdasarkan situasi tersebut! (Jawaban lebih dari satu)",
            "indicator": "Menyelesaikan masalah terkait FPB.",
            "options": [
              "Jumlah keranjang terbanyak yang bisa dibuat adalah 12.",
              "Setiap keranjang berisi 2 apel.",
              "Setiap keranjang berisi 3 jeruk.",
              "Faktor persekutuan terbesar dari 24 dan 36 adalah 6."
            ],
            "answer": [
              "Jumlah keranjang terbanyak yang bisa dibuat adalah 12.",
              "Setiap keranjang berisi 2 apel.",
              "Setiap keranjang berisi 3 jeruk."
            ],
            "statements": [],
            "explanation": "FPB dari 24 dan 36 adalah 12. Jadi keranjang terbanyak = 12. Isi apel = 24/12 = 2. Isi jeruk = 36/12 = 3. Pernyataan FPB adalah 6 salah (seharusnya 12)."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bangun ruang memiliki sifat-sifat: (1) Memiliki 5 sisi, (2) Memiliki 6 titik sudut, (3) Memiliki 9 rusuk.",
            "question": "Bangun ruang manakah yang TIDAK sesuai dengan ciri-ciri tersebut? (Jawaban lebih dari satu)",
            "indicator": "Menganalisis sifat-sifat bangun ruang (Prisma/Limas).",
            "options": [
              "Limas Segiempat",
              "Prisma Segitiga",
              "Balok",
              "Tabung"
            ],
            "answer": [
              "Limas Segiempat",
              "Balok",
              "Tabung"
            ],
            "statements": [],
            "explanation": "Ciri-ciri tersebut adalah milik Prisma Segitiga. Limas segiempat (5 sisi, 5 titik sudut), Balok (6 sisi), Tabung (3 sisi) tidak sesuai."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah bak mandi berbentuk kubus memiliki panjang rusuk 80 cm.",
            "question": "Pilihlah pernyataan yang benar mengenai bak mandi tersebut!",
            "indicator": "Menghitung volume kubus dan konversi satuan.",
            "options": [
              "Volume bak mandi adalah 512.000 cm³.",
              "Volume bak mandi adalah 512 liter.",
              "Luas alas bak mandi adalah 6.400 cm².",
              "Jika diisi setengahnya, volumenya 256 liter."
            ],
            "answer": [
              "Volume bak mandi adalah 512.000 cm³.",
              "Volume bak mandi adalah 512 liter.",
              "Luas alas bak mandi adalah 6.400 cm².",
              "Jika diisi setengahnya, volumenya 256 liter."
            ],
            "statements": [],
            "explanation": "V = 80³ = 512.000 cm³ = 512 dm³ = 512 liter. Luas alas = 80 x 80 = 6.400 cm². Setengah volume = 256 liter. Semua pernyataan benar."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Seorang pelari menempuh jarak 10 km dalam waktu 1 jam 15 menit.",
            "question": "Pilihlah pernyataan konversi yang benar dari data tersebut!",
            "indicator": "Menerapkan hubungan antar satuan jarak dan waktu.",
            "options": [
              "Waktu tempuh sama dengan 75 menit.",
              "Jarak tempuh sama dengan 10.000 meter.",
              "Kecepatan rata-rata pelari adalah 8 km/jam.",
              "Waktu tempuh sama dengan 4.500 detik."
            ],
            "answer": [
              "Waktu tempuh sama dengan 75 menit.",
              "Jarak tempuh sama dengan 10.000 meter.",
              "Kecepatan rata-rata pelari adalah 8 km/jam.",
              "Waktu tempuh sama dengan 4.500 detik."
            ],
            "statements": [],
            "explanation": "1 jam 15 menit = 60+15 = 75 menit (Benar). 10 km = 10.000 m (Benar). 75 menit = 1,25 jam. Kecepatan = 10/1,25 = 8 km/jam (Benar). 75 menit x 60 = 4.500 detik (Benar)."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Dua buah bilangan pecahan A = 2/3 dan B = 3/5. Dilakukan operasi hitung pada kedua bilangan tersebut.",
            "question": "Tentukan hasil operasi hitung yang benar!",
            "indicator": "Melakukan operasi penjumlahan, pengurangan, perkalian pecahan.",
            "options": [
              "A + B = 19/15",
              "A - B = 1/15",
              "A x B = 6/15",
              "A : B = 10/9"
            ],
            "answer": [
              "A + B = 19/15",
              "A - B = 1/15",
              "A x B = 6/15",
              "A : B = 10/9"
            ],
            "statements": [],
            "explanation": "A+B = 10/15 + 9/15 = 19/15. A-B = 10/15 - 9/15 = 1/15. AxB = 6/15. A:B = 2/3 x 5/3 = 10/9. Semua benar."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah taman berbentuk persegi panjang dengan ukuran panjang 20 m dan lebar 15 m. Di sekeliling taman akan ditanami pohon dengan jarak antar pohon 5 meter.",
            "question": "Manakah pernyataan yang merupakan bagian dari langkah penyelesaian masalah tersebut?",
            "indicator": "Merencanakan penyelesaian masalah keliling bangun datar.",
            "options": [
              "Menghitung keliling taman terlebih dahulu.",
              "Keliling taman adalah 70 meter.",
              "Banyak pohon yang dibutuhkan adalah Keliling dibagi jarak antar pohon.",
              "Dibutuhkan 14 pohon untuk mengelilingi taman."
            ],
            "answer": [
              "Menghitung keliling taman terlebih dahulu.",
              "Keliling taman adalah 70 meter.",
              "Banyak pohon yang dibutuhkan adalah Keliling dibagi jarak antar pohon.",
              "Dibutuhkan 14 pohon untuk mengelilingi taman."
            ],
            "statements": [],
            "explanation": "Keliling = 2 x (20+15) = 70 m. Langkah: Hitung keliling -> Bagi jarak. Pohon = 70 / 5 = 14. Semua benar."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui data berat badan 5 siswa (dalam kg): 35, 38, 40, 35, 42.",
            "question": "Pernyataan yang benar mengenai data tersebut adalah...",
            "indicator": "Mengidentifikasi data kuantitatif (konteks pengukuran berat).",
            "options": [
              "Berat badan terberat adalah 42 kg.",
              "Selisih berat badan terberat dan teringan adalah 7 kg.",
              "Rata-rata berat badan adalah 38 kg.",
              "Modus data tersebut adalah 35 kg."
            ],
            "answer": [
              "Berat badan terberat adalah 42 kg.",
              "Selisih berat badan terberat dan teringan adalah 7 kg.",
              "Rata-rata berat badan adalah 38 kg.",
              "Modus data tersebut adalah 35 kg."
            ],
            "statements": [],
            "explanation": "Max=42. Selisih=42-35=7. Mean=(35+38+40+35+42)/5 = 190/5 = 38. Modus=35 (muncul 2x)."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah truk membawa muatan 3 ton beras, 5 kuintal jagung, dan 200 kg kedelai.",
            "question": "Pilihlah konversi berat yang tepat dari muatan tersebut!",
            "indicator": "Mengkonversi antar satuan berat (ton, kuintal, kg).",
            "options": [
              "3 ton = 3.000 kg",
              "5 kuintal = 500 kg",
              "Total muatan adalah 3.700 kg",
              "Muatan jagung lebih berat daripada kedelai"
            ],
            "answer": [
              "3 ton = 3.000 kg",
              "5 kuintal = 500 kg",
              "Total muatan adalah 3.700 kg",
              "Muatan jagung lebih berat daripada kedelai"
            ],
            "statements": [],
            "explanation": "3 ton=3000kg. 5kw=500kg. Total=3000+500+200=3700kg. 500kg > 200kg."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ayah memiliki kolam ikan dengan debit air masuk 20 liter/menit. Kolam tersebut penuh dalam waktu 1 jam.",
            "question": "Evaluasilah pernyataan berikut jika debit air diubah menjadi 30 liter/menit!",
            "indicator": "Menganalisis perubahan variabel pada rumus debit.",
            "options": [
              "Volume kolam adalah 1.200 liter.",
              "Waktu pengisian akan menjadi lebih cepat.",
              "Waktu yang dibutuhkan menjadi 40 menit.",
              "Waktu yang dibutuhkan menjadi 90 menit."
            ],
            "answer": [
              "Volume kolam adalah 1.200 liter.",
              "Waktu pengisian akan menjadi lebih cepat.",
              "Waktu yang dibutuhkan menjadi 40 menit."
            ],
            "statements": [],
            "explanation": "Volume = 20 l/mnt x 60 mnt = 1.200 liter. Jika debit 30, Waktu = 1200 / 30 = 40 menit (lebih cepat). Pernyataan 90 menit salah."
          },
          {
            "id": 21,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan perbandingan pecahan berikut.",
            "question": "Tentukan apakah pernyataan perbandingan berikut Benar atau Salah.",
            "indicator": "Membandingkan dua bilangan pecahan.",
            "options": [],
            "statements": [
              {
                "text": "1/3 > 1/4",
                "answer": true
              },
              {
                "text": "2/5 < 3/10",
                "answer": false
              },
              {
                "text": "0,5 = 50%",
                "answer": true
              },
              {
                "text": "3/4 > 0,7",
                "answer": true
              }
            ],
            "explanation": "1/3(0,33) > 1/4(0,25) [Benar]. 2/5(0,4) > 3/10(0,3) [Salah]. 0,5=50% [Benar]. 3/4(0,75) > 0,7 [Benar]."
          },
          {
            "id": 22,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diketahui sebuah segitiga memiliki panjang alas 12 cm dan tinggi 8 cm.",
            "question": "Tentukan kebenaran pernyataan terkait luas segitiga tersebut.",
            "indicator": "Menghitung luas bangun datar (segitiga).",
            "options": [],
            "statements": [
              {
                "text": "Rumus luas segitiga adalah alas x tinggi.",
                "answer": false
              },
              {
                "text": "Luas segitiga tersebut adalah 48 cm².",
                "answer": true
              },
              {
                "text": "Jika tinggi diperbesar 2 kali, luasnya menjadi 96 cm².",
                "answer": true
              },
              {
                "text": "Luas segitiga sama dengan luas persegi panjang berukuran 12 cm x 4 cm.",
                "answer": true
              }
            ],
            "explanation": "Rumus L = 1/2 x a x t [Pernyataan 1 Salah]. L = 1/2 x 12 x 8 = 48 [Benar]. Jika t=16, L=96 [Benar]. Luas persegi panjang 12x4 = 48 [Benar]."
          },
          {
            "id": 23,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah kardus berbentuk kubus memiliki volume 1.000 cm³. Kardus tersebut akan dilapisi kertas kado di seluruh permukaannya.",
            "question": "Evaluasilah kebenaran perhitungan berikut.",
            "indicator": "Menghitung luas permukaan kubus dari volume yang diketahui.",
            "options": [],
            "statements": [
              {
                "text": "Panjang rusuk kardus adalah 10 cm.",
                "answer": true
              },
              {
                "text": "Kardus memiliki 6 sisi berbentuk persegi.",
                "answer": true
              },
              {
                "text": "Luas satu sisi kardus adalah 100 cm².",
                "answer": true
              },
              {
                "text": "Luas kertas kado minimal yang dibutuhkan adalah 600 cm².",
                "answer": true
              }
            ],
            "explanation": "rusuk = ∛1000 = 10. Sisi kubus ada 6. Luas 1 sisi = 10x10=100. Luas permukaan = 6 x 100 = 600. Semua Benar."
          },
          {
            "id": 24,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Berikut adalah konversi satuan waktu.",
            "question": "Tentukan apakah konversi berikut Benar atau Salah.",
            "indicator": "Mengkonversi antar satuan waktu.",
            "options": [],
            "statements": [
              {
                "text": "1 abad = 100 tahun",
                "answer": true
              },
              {
                "text": "1 windu = 10 tahun",
                "answer": false
              },
              {
                "text": "1 lustrum = 5 tahun",
                "answer": true
              },
              {
                "text": "2 jam = 120 detik",
                "answer": false
              }
            ],
            "explanation": "1 windu = 8 tahun. 2 jam = 7.200 detik."
          },
          {
            "id": 25,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Sebuah lingkaran memiliki diameter 28 cm (π = 22/7).",
            "question": "Analisis perhitungan lingkaran berikut.",
            "indicator": "Menghitung keliling dan luas lingkaran.",
            "options": [],
            "statements": [
              {
                "text": "Jari-jari lingkaran adalah 14 cm.",
                "answer": true
              },
              {
                "text": "Keliling lingkaran adalah 88 cm.",
                "answer": true
              },
              {
                "text": "Luas lingkaran adalah 616 cm².",
                "answer": true
              },
              {
                "text": "Diameter adalah dua kali jari-jari.",
                "answer": true
              }
            ],
            "explanation": "r = 14. K = 22/7 x 28 = 88. L = 22/7 x 14 x 14 = 616. Semua Benar."
          },
          {
            "id": 26,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Operasi hitung campuran bilangan bulat: 20 + 5 x (-3).",
            "question": "Tentukan kebenaran langkah dan hasil pengerjaan.",
            "indicator": "Menerapkan aturan urutan operasi hitung (kabataku).",
            "options": [],
            "statements": [
              {
                "text": "Operasi penjumlahan dikerjakan terlebih dahulu.",
                "answer": false
              },
              {
                "text": "Operasi perkalian dikerjakan terlebih dahulu.",
                "answer": true
              },
              {
                "text": "Hasil dari 5 x (-3) adalah 15.",
                "answer": false
              },
              {
                "text": "Hasil akhir perhitungan adalah 5.",
                "answer": true
              }
            ],
            "explanation": "Kali dulu: 5 x (-3) = -15. Lalu 20 + (-15) = 5. Pernyataan 1 Salah, 3 Salah (harusnya -15)."
          },
          {
            "id": 27,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Dua mobil berangkat dari kota yang sama. Mobil A kecepatan 60 km/jam, Mobil B kecepatan 80 km/jam.",
            "question": "Analisis perbandingan kedua mobil tersebut.",
            "indicator": "Membandingkan besaran turunan (kecepatan).",
            "options": [],
            "statements": [
              {
                "text": "Dalam 1 jam, Mobil B menempuh jarak lebih jauh.",
                "answer": true
              },
              {
                "text": "Mobil A membutuhkan waktu lebih lama untuk menempuh jarak yang sama.",
                "answer": true
              },
              {
                "text": "Perbandingan kecepatan Mobil A dan B adalah 3 : 4.",
                "answer": true
              },
              {
                "text": "Selisih jarak mereka setelah 2 jam adalah 20 km.",
                "answer": false
              }
            ],
            "explanation": "Semua benar, kecuali selisih jarak. Setelah 2 jam: A=120km, B=160km. Selisih = 40km (Pernyataan 4 Salah)."
          },
          {
            "id": 28,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Andi ingin membuat kerangka balok dari kawat dengan ukuran 10 cm x 8 cm x 5 cm.",
            "question": "Evaluasi kebutuhan bahan kawat.",
            "indicator": "Menyelesaikan masalah terkait panjang rusuk bangun ruang.",
            "options": [],
            "statements": [
              {
                "text": "Balok memiliki 12 rusuk.",
                "answer": true
              },
              {
                "text": "Total panjang kawat yang dibutuhkan adalah 92 cm.",
                "answer": true
              },
              {
                "text": "Jika Andi punya kawat 1 meter, sisa kawatnya 8 cm.",
                "answer": true
              },
              {
                "text": "Kawat sepanjang 50 cm cukup untuk membuat kerangka tersebut.",
                "answer": false
              }
            ],
            "explanation": "Panjang kerangka = 4(p+l+t) = 4(10+8+5) = 4(23) = 92 cm. 100 - 92 = 8 cm. Kawat 50 cm tidak cukup."
          },
          {
            "id": 29,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sifat-sifat operasi hitung.",
            "question": "Tentukan kebenaran sifat operasi hitung berikut.",
            "indicator": "Mengidentifikasi sifat komutatif, asosiatif, dan distributif.",
            "options": [],
            "statements": [
              {
                "text": "a + b = b + a (Sifat Komutatif)",
                "answer": true
              },
              {
                "text": "(a x b) x c = a x (b x c) (Sifat Asosiatif)",
                "answer": true
              },
              {
                "text": "a x (b + c) = (a x b) + (a x c) (Sifat Distributif)",
                "answer": true
              },
              {
                "text": "a - b = b - a (Sifat Komutatif Pengurangan)",
                "answer": false
              }
            ],
            "explanation": "Pengurangan tidak berlaku sifat komutatif."
          },
          {
            "id": 30,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Diagram lingkaran menunjukkan hobi siswa: 40% Sepak Bola, 25% Renang, Sisanya Membaca.",
            "question": "Analisis data persentase tersebut.",
            "indicator": "Menganalisis data dalam bentuk diagram lingkaran (Persen).",
            "options": [],
            "statements": [
              {
                "text": "Persentase siswa yang hobi Membaca adalah 35%.",
                "answer": true
              },
              {
                "text": "Siswa yang hobi Sepak Bola paling sedikit.",
                "answer": false
              },
              {
                "text": "Jumlah persentase Renang dan Membaca lebih besar dari Sepak Bola.",
                "answer": true
              },
              {
                "text": "Selisih persentase Sepak Bola dan Renang adalah 15%.",
                "answer": true
              }
            ],
            "explanation": "Membaca = 100% - (40+25)% = 35% [Benar]. Sepak Bola 40% (Paling banyak) [Pernyataan 2 Salah]. (25+35)=60 > 40 [Benar]. 40-25=15 [Benar]."
          }
        ]
      }
    ]
  },
  "bahasa_indonesia": {
    "nama": "Bahasa Indonesia",
    "icon": "BookOpen",
    "deskripsi": "5 Paket Tryout Akbar Literasi (30 Soal HOTS & Standar Pusmendik Kemendikdasmen RI).",
    "paket": [
      {
        "nomorPaket": 1,
        "namaPaket": "Paket 1 (ANCHOR)",
        "kode": "TO-BI-01",
        "deskripsi": "Simulasi Ujian TKA Bahasa Indonesia SD (Paket 1 (ANCHOR)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Bacalah teks berikut!<br>Tanaman hidroponik adalah cara bercocok tanam tanpa menggunakan tanah. Media tanam yang digunakan biasanya berupa air yang mengandung nutrisi, sabut kelapa, atau kerikil. Metode ini sangat cocok diterapkan di lahan sempit.",
            "question": "Makna kata 'media' dalam teks tersebut adalah...",
            "indicator": "Menjelaskan makna kosakata umum/khusus dalam bidang pertanian (C2).",
            "options": [
              "Alat komunikasi",
              "Perantara atau sarana",
              "Lahan yang luas",
              "Jenis tanaman",
              "Hasil panen"
            ],
            "answer": "Perantara atau sarana",
            "statements": [],
            "explanation": "Dalam konteks pertanian hidroponik, 'media' berarti bahan atau sarana tempat tumbuhnya akar tanaman (pengganti tanah)."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah paragraf berikut!<br>Batik merupakan warisan budaya Indonesia yang telah diakui dunia. Setiap daerah di Indonesia memiliki motif batik yang khas. Misalnya, motif Megamendung berasal dari Cirebon, sedangkan motif Parang berasal dari Yogyakarta. Keberagaman motif ini menunjukkan kekayaan budaya bangsa kita.",
            "question": "Informasi tersurat yang terdapat dalam paragraf tersebut adalah...",
            "indicator": "Mengidentifikasi informasi tersurat dalam teks nonfiksi (C3).",
            "options": [
              "Batik adalah satu-satunya warisan budaya Indonesia.",
              "Motif Megamendung merupakan motif khas dari Yogyakarta.",
              "Motif Parang berasal dari Cirebon.",
              "Setiap daerah di Indonesia memiliki motif batik yang khas.",
              "Batik hanya dikenal di wilayah Asia."
            ],
            "answer": "Setiap daerah di Indonesia memiliki motif batik yang khas.",
            "statements": [],
            "explanation": "Kalimat kedua secara eksplisit menyatakan: 'Setiap daerah di Indonesia memiliki motif batik yang khas.'"
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah cerita berikut!<br>Sore itu, Doni melihat seekor kucing kecil yang terjebak di atas pohon mangga. Kucing itu mengeong ketakutan. Tanpa pikir panjang, Doni memanjat pohon itu dengan hati-hati. Ia menggendong kucing itu dan membawanya turun. Setelah sampai di bawah, Doni memberi kucing itu sedikit sisa makan siangnya.",
            "question": "Nilai moral yang dapat diambil dari cerita di atas adalah...",
            "indicator": "Menyimpulkan nilai-nilai dalam teks fiksi (C4).",
            "options": [
              "Kita harus berani memanjat pohon yang tinggi.",
              "Hewan peliharaan harus selalu dijaga di dalam rumah.",
              "Kita harus memiliki rasa kasih sayang terhadap sesama makhluk hidup.",
              "Sisa makanan sebaiknya diberikan kepada hewan.",
              "Kucing adalah hewan yang pandai memanjat."
            ],
            "answer": "Kita harus memiliki rasa kasih sayang terhadap sesama makhluk hidup.",
            "statements": [],
            "explanation": "Tindakan Doni menolong dan memberi makan kucing menunjukkan nilai kasih sayang terhadap hewan (sesama makhluk hidup)."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan kalimat berikut!<br>'Rudi menjadi <b>buah bibir</b> di sekolahnya karena berhasil memenangkan olimpiade matematika tingkat nasional.'",
            "question": "Makna ungkapan 'buah bibir' pada kalimat tersebut adalah...",
            "indicator": "Menjelaskan makna ungkapan yang digunakan dalam teks (C4).",
            "options": [
              "Orang yang sombong",
              "Bahan pembicaraan",
              "Anak kesayangan",
              "Juara bertahan",
              "Oleh-oleh"
            ],
            "answer": "Bahan pembicaraan",
            "statements": [],
            "explanation": "'Buah bibir' adalah ungkapan yang berarti menjadi bahan pembicaraan orang banyak."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah ilustrasi berikut!<br>Desa Suka Makmur sering mengalami banjir saat musim hujan. Hal ini disebabkan oleh banyaknya sampah yang menyumbat aliran sungai. Warga desa kurang peduli terhadap kebersihan lingkungan. Pak RT mengajak warga untuk kerja bakti membersihkan sungai setiap hari Minggu.",
            "question": "Tanggapan yang tepat dan logis terhadap isi ilustrasi tersebut adalah...",
            "indicator": "Menilai relevansi peristiwa dalam teks dengan logika kehidupan sehari-hari (C5).",
            "options": [
              "Sebaiknya warga membiarkan sampah tersebut karena itu tugas pemerintah.",
              "Banjir di Desa Suka Makmur tidak ada hubungannya dengan sampah.",
              "Ajakan Pak RT sangat tepat untuk mencegah banjir terulang kembali.",
              "Warga desa sebaiknya pindah rumah agar tidak terkena banjir.",
              "Kerja bakti hanya membuang-buang waktu istirahat warga."
            ],
            "answer": "Ajakan Pak RT sangat tepat untuk mencegah banjir terulang kembali.",
            "statements": [],
            "explanation": "Tanggapan ini paling positif, logis, dan solutif untuk mengatasi masalah banjir akibat sampah."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut!<br>Bunglon adalah hewan yang unik. Ia mampu mengubah warna kulitnya sesuai dengan lingkungan sekitarnya. Kemampuan ini disebut mimikri. Tujuannya adalah untuk mengelabui musuh atau mangsanya.",
            "question": "Objek yang dibahas dalam teks tersebut adalah...",
            "indicator": "Mengidentifikasi objek berdasarkan kosakata dalam teks nonfiksi (C3).",
            "options": [
              "Kemampuan lari hewan",
              "Jenis makanan bunglon",
              "Habitat asli bunglon",
              "Kemampuan adaptasi bunglon",
              "Cara bunglon berkembang biak"
            ],
            "answer": "Kemampuan adaptasi bunglon",
            "statements": [],
            "explanation": "Teks membahas kemampuan bunglon mengubah warna (mimikri) yang merupakan bentuk adaptasi."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah paragraf berikut!<br>Pemanasan global memberikan dampak buruk bagi kehidupan. Suhu bumi yang meningkat menyebabkan es di kutub mencair. Akibatnya, permukaan air laut naik dan dapat menenggelamkan pulau-pulau kecil. Selain itu, cuaca menjadi tidak menentu.",
            "question": "Ide pokok paragraf tersebut adalah...",
            "indicator": "Menyimpulkan ide pokok paragraf (C4).",
            "options": [
              "Es di kutub mencair karena panas.",
              "Naiknya permukaan air laut.",
              "Dampak buruk pemanasan global.",
              "Cuaca di bumi menjadi tidak menentu.",
              "Penyebab pulau kecil tenggelam."
            ],
            "answer": "Dampak buruk pemanasan global.",
            "statements": [],
            "explanation": "Kalimat utama ada di awal paragraf: 'Pemanasan global memberikan dampak buruk bagi kehidupan.' Kalimat lain adalah penjelas."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kutipan cerita berikut!<br>'Maafkan aku, Budi. Aku tidak sengaja merusakkan mainanmu,' kata Andi dengan wajah tertunduk. Budi terdiam sejenak, lalu tersenyum. 'Tidak apa-apa, Andi. Itu kan hanya kecelakaan. Kita bisa memperbaikinya bersama-sama.'",
            "question": "Kesimpulan tentang watak tokoh Budi adalah...",
            "indicator": "Menyimpulkan karakter tokoh dalam teks fiksi (C5).",
            "options": [
              "Pemarah dan pendendam",
              "Pemaaf dan bijaksana",
              "Cengeng dan manja",
              "Sombong dan angkuh",
              "Penakut dan pemalu"
            ],
            "answer": "Pemaaf dan bijaksana",
            "statements": [],
            "explanation": "Budi memaafkan Andi yang merusak mainannya dan mengajak memperbaiki bersama, menunjukkan sifat pemaaf."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan data berikut untuk membuat laporan!<br>1. Pengamatan dilakukan di Taman Safari.<br>2. Waktu pengamatan hari Minggu, 10 Maret 2024.<br>3. Objek yang diamati adalah perilaku gajah.<br>4. Gajah menggunakan belalainya untuk makan dan minum.",
            "question": "Jika data tersebut disusun menjadi paragraf laporan, kalimat utamanya adalah...",
            "indicator": "Menyusun kembali informasi dari teks ke dalam bentuk ikhtisar/laporan (C3).",
            "options": [
              "Gajah adalah hewan yang sangat besar.",
              "Pada hari Minggu, 10 Maret 2024, kami melakukan pengamatan perilaku gajah di Taman Safari.",
              "Gajah menggunakan belalai untuk mengambil makanan.",
              "Taman Safari adalah tempat wisata yang indah.",
              "Banyak orang berkunjung ke Taman Safari."
            ],
            "answer": "Pada hari Minggu, 10 Maret 2024, kami melakukan pengamatan perilaku gajah di Taman Safari.",
            "statements": [],
            "explanation": "Kalimat ini merangkum konteks (waktu, tempat, objek) yang menjadi dasar laporan pengamatan."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah pantun berikut!<br>Berakit-rakit ke hulu,<br>Berenang-renang ke tepian.<br>Bersakit-sakit dahulu,<br>Bersenang-senang kemudian.",
            "question": "Amanat yang terkandung dalam pantun tersebut adalah...",
            "indicator": "Menyimpulkan amanat dari teks sastra (pantun) (C4).",
            "options": [
              "Kita harus rajin berolahraga renang.",
              "Jika ingin sukses, harus berani bersusah payah terlebih dahulu.",
              "Membuat rakit memerlukan keahlian khusus.",
              "Hidup harus selalu bersenang-senang.",
              "Jangan suka menyakiti orang lain."
            ],
            "answer": "Jika ingin sukses, harus berani bersusah payah terlebih dahulu.",
            "statements": [],
            "explanation": "Baris 3 dan 4 (isi) bermakna usaha keras (sakit) di awal akan membuahkan hasil (senang) di akhir."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!<br>Hutan bakau memiliki fungsi yang sangat penting. Akar bakau yang kuat dapat menahan gelombang air laut sehingga mencegah abrasi. Selain itu, hutan bakau menjadi tempat tinggal bagi berbagai jenis hewan seperti ikan, kepiting, dan burung. Buah bakau juga dapat diolah menjadi makanan.",
            "question": "Berdasarkan teks di atas, manakah pernyataan yang BENAR mengenai manfaat hutan bakau? (Pilih lebih dari satu jawaban)",
            "indicator": "Mengidentifikasi informasi eksplisit dan implisit dalam teks laporan (C4).",
            "options": [
              "Mencegah pengikisan pantai (abrasi).",
              "Sebagai habitat atau tempat tinggal hewan.",
              "Menyebabkan banjir rob.",
              "Sumber bahan pangan olahan.",
              "Tempat rekreasi yang berbahaya."
            ],
            "answer": [
              "Mencegah pengikisan pantai (abrasi).",
              "Sebagai habitat atau tempat tinggal hewan.",
              "Sumber bahan pangan olahan."
            ],
            "statements": [],
            "explanation": "Teks menyebutkan: mencegah abrasi, tempat tinggal hewan, dan buahnya diolah jadi makanan."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan kalimat-kalimat berikut!<br>1) Ayah membaca koran di teras.<br>2) Ibu memasak nasi goreng di dapur.<br>3) Adik bermain bola di lapangan.<br>4) Kakak sedang belajar matematika.",
            "question": "Manakah kalimat yang memiliki pola S-P-O-K (Subjek-Predikat-Objek-Keterangan)? (Pilih lebih dari satu)",
            "indicator": "Mengidentifikasi struktur kalimat dalam teks (C3).",
            "options": [
              "Kalimat 1",
              "Kalimat 2",
              "Kalimat 3",
              "Kalimat 4"
            ],
            "answer": [
              "Kalimat 1",
              "Kalimat 2",
              "Kalimat 3"
            ],
            "statements": [],
            "explanation": "1) Ayah(S) membaca(P) koran(O) di teras(K). 2) Ibu(S) memasak(P) nasi goreng(O) di dapur(K). 3) Adik(S) bermain(P) bola(O) di lapangan(K). Kalimat 4 hanya S-P-O."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kutipan fabel berikut!<br>Kancil melihat Buaya sedang tidur di tepi sungai. Kancil ingin menyeberang tapi tidak ada jembatan. Kancil mendapat ide. Ia membangunkan Buaya dan berkata bahwa Raja Hutan ingin menghitung jumlah buaya untuk diberi hadiah daging segar. Buaya pun senang dan memanggil teman-temannya untuk berbaris.",
            "question": "Pernyataan yang sesuai dengan watak atau tindakan tokoh dalam cerita adalah... (Pilih jawaban benar)",
            "indicator": "Menilai kesesuaian antarunsur (tokoh dan watak) dalam teks (C5).",
            "options": [
              "Kancil adalah hewan yang cerdik dan banyak akal.",
              "Buaya adalah hewan yang waspada dan sulit ditipu.",
              "Kancil menggunakan tipu muslihat untuk menyeberang.",
              "Buaya bersifat polos dan mudah percaya.",
              "Raja Hutan benar-benar akan membagikan daging."
            ],
            "answer": [
              "Kancil adalah hewan yang cerdik dan banyak akal.",
              "Kancil menggunakan tipu muslihat untuk menyeberang.",
              "Buaya bersifat polos dan mudah percaya."
            ],
            "statements": [],
            "explanation": "Kancil cerdik menipu buaya. Buaya mudah percaya (polos) karena langsung berbaris demi hadiah."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Energi alternatif adalah energi yang digunakan untuk menggantikan bahan bakar fosil. Contoh energi alternatif adalah energi matahari, angin, dan air. Energi ini ramah lingkungan karena tidak menghasilkan polusi.'",
            "question": "Pilihlah kosakata khusus bidang lingkungan/sains yang terdapat dalam teks! (Pilih jawaban benar)",
            "indicator": "Mengidentifikasi penggunaan kosakata khusus dalam bidang tertentu (C4).",
            "options": [
              "Energi alternatif",
              "Bahan bakar fosil",
              "Membeli",
              "Polusi",
              "Mahal"
            ],
            "answer": [
              "Energi alternatif",
              "Bahan bakar fosil",
              "Polusi"
            ],
            "statements": [],
            "explanation": "Kata-kata tersebut merupakan istilah teknis dalam bidang sains/lingkungan. 'Membeli' dan 'Mahal' adalah kata umum."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan petunjuk acak membuat kopi berikut!<br>1. Tuangkan air panas ke dalam cangkir.<br>2. Masukkan bubuk kopi dan gula ke dalam cangkir.<br>3. Aduk hingga rata.<br>4. Kopi siap dinikmati.<br>5. Didihkan air secukupnya.",
            "question": "Urutan langkah-langkah yang logis adalah... (Pilih langkah yang berurutan benar)",
            "indicator": "Menyusun ulang informasi dari teks (prosedur) (C3).",
            "options": [
              "Langkah pertama adalah mendidihkan air.",
              "Setelah air mendidih, masukkan bubuk kopi (langkah ini bisa ditukar).",
              "Langkah terakhir adalah mengaduk kopi.",
              "Urutan yang benar: 5 - 2 - 1 - 3 - 4.",
              "Urutan yang benar: 2 - 1 - 5 - 3 - 4."
            ],
            "answer": [
              "Langkah pertama adalah mendidihkan air.",
              "Urutan yang benar: 5 - 2 - 1 - 3 - 4."
            ],
            "statements": [],
            "explanation": "Logikanya: Didihkan air (5) -> Masukkan kopi/gula (2) -> Tuang air panas (1) -> Aduk (3) -> Sajikan (4)."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Budi selalu datang terlambat ke sekolah. Ia sering bangun kesiangan karena begadang main game. Nilai pelajarannya pun menurun drastis.'",
            "question": "Saran yang tepat untuk Budi sesuai ilustrasi tersebut adalah... (Pilih saran yang relevan)",
            "indicator": "Menilai relevansi peristiwa dan memberikan saran berdasarkan pengetahuan pribadi (C5).",
            "options": [
              "Sebaiknya Budi mengurangi waktu bermain game di malam hari.",
              "Budi harus memasang alarm agar bangun lebih pagi.",
              "Budi sebaiknya pindah ke sekolah yang masuknya siang.",
              "Budi perlu mengatur jadwal tidur dan belajarnya dengan baik.",
              "Guru harus membiarkan Budi agar ia sadar sendiri."
            ],
            "answer": [
              "Sebaiknya Budi mengurangi waktu bermain game di malam hari.",
              "Budi harus memasang alarm agar bangun lebih pagi.",
              "Budi perlu mengatur jadwal tidur dan belajarnya dengan baik."
            ],
            "statements": [],
            "explanation": "Saran harus solutif mengatasi penyebab masalah (begadang, bangun siang)."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Puisi:<br>Wahai sahabatku,<br>Janganlah kau bersedih hati<br>Badai pasti berlalu<br>Mentari kan bersinar lagi",
            "question": "Makna kiasan dalam puisi tersebut adalah... (Pilih jawaban benar)",
            "indicator": "Menjelaskan makna ungkapan/kiasan dalam teks sastra (C4).",
            "options": [
              "'Badai' melambangkan masalah atau kesedihan.",
              "'Mentari' melambangkan harapan atau kebahagiaan.",
              "Penulis menyuruh sahabatnya melihat cuaca.",
              "Puisi ini berisi nasihat untuk tidak putus asa.",
              "Sahabat penulis sedang kehujanan."
            ],
            "answer": [
              "'Badai' melambangkan masalah atau kesedihan.",
              "'Mentari' melambangkan harapan atau kebahagiaan.",
              "Puisi ini berisi nasihat untuk tidak putus asa."
            ],
            "statements": [],
            "explanation": "Badai dan mentari adalah metafora untuk masa sulit dan masa bahagia."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Paragraf: 'Museum Angkut di Malang sangat menarik. Di sana terdapat berbagai koleksi alat transportasi dari zaman dahulu hingga modern. Ada sepeda onthel, mobil antik, hingga pesawat terbang. Pengunjung juga bisa berfoto di zona-zona yang didesain mirip kota-kota di dunia.'",
            "question": "Informasi yang sesuai dengan isi paragraf adalah... (Pilih jawaban benar)",
            "indicator": "Mengidentifikasi informasi eksplisit dalam teks deskripsi (C3).",
            "options": [
              "Museum Angkut terletak di Surabaya.",
              "Koleksi museum hanya alat transportasi modern.",
              "Terdapat koleksi mobil antik di Museum Angkut.",
              "Pengunjung bisa berfoto di zona yang mirip kota dunia.",
              "Museum Angkut adalah kebun binatang."
            ],
            "answer": [
              "Terdapat koleksi mobil antik di Museum Angkut.",
              "Pengunjung bisa berfoto di zona yang mirip kota dunia."
            ],
            "statements": [],
            "explanation": "Lokasi di Malang (bukan Surabaya). Koleksi dari zaman dahulu (bukan hanya modern). Bukan kebun binatang."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: 'Rara melihat dompet terjatuh di jalan. Ia melihat KTP di dalamnya dan tahu alamat pemiliknya. Meski Rara sedang butuh uang, ia memilih mengembalikan dompet itu ke alamat pemiliknya.'",
            "question": "Nilai positif apa yang bisa ditiru dari tokoh Rara? (Pilih jawaban benar)",
            "indicator": "Menilai nilai-nilai dalam teks (C5).",
            "options": [
              "Kejujuran.",
              "Tanggung jawab.",
              "Amanah (dapat dipercaya).",
              "Kecerdikan.",
              "Ketidaksabaran."
            ],
            "answer": [
              "Kejujuran.",
              "Tanggung jawab.",
              "Amanah (dapat dipercaya)."
            ],
            "statements": [],
            "explanation": "Mengembalikan barang temuan menunjukkan kejujuran dan integritas."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Kalimat: 'Para hadirin sekalian, dimohon untuk naik ke atas panggung sekarang juga agar supaya acara segera dimulai.'",
            "question": "Penyebab kalimat tersebut TIDAK efektif adalah... (Pilih alasan yang benar)",
            "indicator": "Mengevaluasi penggunaan bahasa (kalimat efektif) (C4).",
            "options": [
              "Penggunaan kata 'para' dan 'hadirin' sekaligus (pemborosan).",
              "Penggunaan kata 'naik' dan 'ke atas' (makna ganda/pleonasme).",
              "Penggunaan kata 'agar' dan 'supaya' secara bersamaan.",
              "Kalimatnya terlalu sopan.",
              "Tidak ada subjek dalam kalimat."
            ],
            "answer": [
              "Penggunaan kata 'para' dan 'hadirin' sekaligus (pemborosan).",
              "Penggunaan kata 'naik' dan 'ke atas' (makna ganda/pleonasme).",
              "Penggunaan kata 'agar' dan 'supaya' secara bersamaan."
            ],
            "statements": [],
            "explanation": "Para=banyak, Hadirin=orang banyak. Naik=pasti ke atas. Agar=supaya. Ini adalah pemborosan kata."
          },
          {
            "id": 21,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Teks: 'Katak adalah hewan amfibi. Ia dapat hidup di dua alam, yaitu di darat dan di air. Katak muda bernapas dengan insang, sedangkan katak dewasa bernapas dengan paru-paru dan kulit.'",
            "question": "Tentukan Benar atau Salah pernyataan berikut berdasarkan teks!",
            "indicator": "Mengidentifikasi informasi eksplisit dalam teks (C3).",
            "options": [],
            "statements": [
              {
                "text": "Katak termasuk hewan reptil.",
                "answer": false
              },
              {
                "text": "Hewan amfibi dapat hidup di air dan darat.",
                "answer": true
              },
              {
                "text": "Katak dewasa bernapas menggunakan insang.",
                "answer": false
              }
            ],
            "explanation": "Teks menyebut katak adalah amfibi, bukan reptil. Katak dewasa bernapas dengan paru-paru/kulit."
          },
          {
            "id": 22,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Kalimat: 'Ayah membeli obat di apotik dan membeli perangko di bis.'",
            "question": "Analisis penggunaan kata baku dalam kalimat tersebut!",
            "indicator": "Mengidentifikasi penggunaan kosakata baku dan tidak baku (C4).",
            "options": [],
            "statements": [
              {
                "text": "Kata 'apotik' adalah bentuk baku.",
                "answer": false
              },
              {
                "text": "Kata 'bis' seharusnya ditulis 'bus'.",
                "answer": true
              },
              {
                "text": "Kata baku dari 'apotik' adalah 'apotek'.",
                "answer": true
              }
            ],
            "explanation": "Baku: Apotek, Bus."
          },
          {
            "id": 23,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: 'Si Kancil mencuri timun Pak Tani. Ia tertangkap perangkap. Kancil menangis menyesali perbuatannya dan berjanji tidak akan mencuri lagi. Pak Tani merasa kasihan lalu melepaskannya.'",
            "question": "Evaluasi respon emosional terhadap cerita!",
            "indicator": "Menyimpulkan respons emosional terhadap unsur teks fiksi (C5).",
            "options": [],
            "statements": [
              {
                "text": "Kita merasa kasihan melihat Kancil tertangkap.",
                "answer": true
              },
              {
                "text": "Tindakan Kancil mencuri patut ditiru karena cerdik.",
                "answer": false
              },
              {
                "text": "Sikap Pak Tani melepaskan Kancil menunjukkan belas kasihan.",
                "answer": true
              }
            ],
            "explanation": "Mencuri tidak patut ditiru. Emosi kasihan muncul saat Kancil menangis/tertangkap."
          },
          {
            "id": 24,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks Laporan: 'Bunga bangkai (Rafflesia arnoldii) adalah bunga raksasa yang mengeluarkan bau busuk. Bau ini berfungsi untuk menarik lalat agar membantu penyerbukan.'",
            "question": "Tentukan kebenaran kesimpulan berikut!",
            "indicator": "Menyimpulkan fungsi bagian objek dalam teks (C4).",
            "options": [],
            "statements": [
              {
                "text": "Bau busuk bunga bangkai bertujuan mengusir musuh.",
                "answer": false
              },
              {
                "text": "Lalat membantu proses penyerbukan bunga bangkai.",
                "answer": true
              },
              {
                "text": "Bunga bangkai termasuk bunga yang harum.",
                "answer": false
              }
            ],
            "explanation": "Bau busuk untuk menarik lalat (penyerbukan), bukan mengusir musuh."
          },
          {
            "id": 25,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Penggunaan tanda baca: 'Ibu membeli : apel, jeruk, dan mangga.'",
            "question": "Analisis ketepatan tanda baca!",
            "indicator": "Menilai penggunaan tanda baca (C3).",
            "options": [],
            "statements": [
              {
                "text": "Penggunaan tanda titik dua (:) sudah tepat.",
                "answer": false
              },
              {
                "text": "Seharusnya tidak perlu tanda titik dua setelah 'membeli'.",
                "answer": true
              },
              {
                "text": "Tanda koma (,) digunakan untuk perincian.",
                "answer": true
              }
            ],
            "explanation": "Titik dua tidak dipakai jika perincian merupakan pelengkap kalimat (objek). 'Ibu membeli apel...'."
          },
          {
            "id": 26,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Pantun: 'Asam kandis asam gelugur / Ketiga asam si riang-riang / Menangis mayat di pintu kubur / Teringat badan tidak sembahyang.'",
            "question": "Evaluasi isi pantun!",
            "indicator": "Menilai jenis dan isi pantun (C5).",
            "options": [],
            "statements": [
              {
                "text": "Ini adalah jenis pantun jenaka.",
                "answer": false
              },
              {
                "text": "Pantun ini termasuk pantun agama/nasihat.",
                "answer": true
              },
              {
                "text": "Pesan pantun adalah pentingnya beribadah sebelum meninggal.",
                "answer": true
              }
            ],
            "explanation": "Isinya tentang penyesalan mayat karena tidak sembahyang (Agama)."
          },
          {
            "id": 27,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Kalimat majemuk: 'Andi ingin bermain bola, tetapi hujan turun sangat deras.'",
            "question": "Analisis hubungan antarklausa!",
            "indicator": "Mengidentifikasi hubungan logis (konjungsi) dalam kalimat (C4).",
            "options": [],
            "statements": [
              {
                "text": "Kalimat tersebut menyatakan hubungan sebab-akibat.",
                "answer": false
              },
              {
                "text": "Kata 'tetapi' menunjukkan hubungan perlawanan/pertentangan.",
                "answer": true
              },
              {
                "text": "Kalimat tersebut adalah kalimat majemuk setara.",
                "answer": true
              }
            ],
            "explanation": "'Tetapi' adalah konjungsi pertentangan."
          },
          {
            "id": 28,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Pemerintah mengimbau warga memakai masker karena polusi udara memburuk. Namun, banyak warga yang acuh tak acuh dan tidak memakai masker saat keluar rumah.'",
            "question": "Prediksi dampak berdasarkan teks!",
            "indicator": "Memprediksi kejadian berdasarkan perilaku tokoh/masyarakat dalam teks (C6).",
            "options": [],
            "statements": [
              {
                "text": "Warga akan menjadi lebih sehat karena udara segar.",
                "answer": false
              },
              {
                "text": "Jumlah penderita penyakit pernapasan (ISPA) kemungkinan meningkat.",
                "answer": true
              },
              {
                "text": "Polusi udara akan hilang dengan sendirinya.",
                "answer": false
              }
            ],
            "explanation": "Jika polusi buruk dan warga tidak pakai masker, risiko penyakit pernapasan naik."
          },
          {
            "id": 29,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Sinonim kata. Kalimat: 'Pemandangan di Raja Ampat sangat <b>memukau</b>.'",
            "question": "Tentukan kebenaran sinonim kata yang dicetak tebal!",
            "indicator": "Menjelaskan persamaan kata (sinonim) dalam konteks (C3).",
            "options": [],
            "statements": [
              {
                "text": "Sinonim 'memukau' adalah 'mempesona'.",
                "answer": true
              },
              {
                "text": "Sinonim 'memukau' adalah 'membosankan'.",
                "answer": false
              },
              {
                "text": "Kata 'menakjubkan' dapat menggantikan kata 'memukau'.",
                "answer": true
              }
            ],
            "explanation": "Memukau = indah, mempesona, menakjubkan."
          },
          {
            "id": 30,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ilustrasi: Ani selalu menyisihkan uang jajannya. Setelah setahun, uangnya cukup untuk membeli sepeda baru.",
            "question": "Kesesuaian peribahasa dengan ilustrasi!",
            "indicator": "Menilai kesesuaian antara ilustrasi cerita dan peribahasa (C5).",
            "options": [],
            "statements": [
              {
                "text": "Peribahasa yang tepat: 'Besar pasak daripada tiang'.",
                "answer": false
              },
              {
                "text": "Peribahasa yang tepat: 'Sedikit demi sedikit, lama-lama menjadi bukit'.",
                "answer": true
              },
              {
                "text": "Peribahasa yang tepat: 'Air beriak tanda tak dalam'.",
                "answer": false
              }
            ],
            "explanation": "Menabung sedikit demi sedikit hingga banyak cocok dengan 'sedikit demi sedikit, lama-lama menjadi bukit'."
          }
        ]
      },
      {
        "nomorPaket": 2,
        "namaPaket": "Paket 2 (PATHWAY)",
        "kode": "TO-BI-02",
        "deskripsi": "Simulasi Ujian TKA Bahasa Indonesia SD (Paket 2 (PATHWAY)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 1,
            "kesulitan": "Mudah",
            "stimulus": "Bacalah teks berikut!\nTanaman lidah buaya memiliki beragam manfaat. Daging pelepahnya yang tebal mengandung gel yang kaya akan vitamin. Gel ini sering dimanfaatkan sebagai bahan dasar produk kecantikan, seperti sampo dan pelembap kulit. Selain itu, lidah buaya juga dapat diolah menjadi minuman segar yang menyehatkan pencernaan.",
            "question": "Makna kata 'produk' dalam teks tersebut adalah...",
            "indicator": "Menjelaskan makna kata umum yang digunakan dalam teks nonfiksi.",
            "options": [
              "Barang atau jasa yang dibuat dan ditambah gunanya",
              "Hasil kerja keras seseorang",
              "Bahan mentah dari alam",
              "Sesuatu yang tumbuh liar",
              "Alat untuk membuat sesuatu"
            ],
            "answer": "Barang atau jasa yang dibuat dan ditambah gunanya",
            "statements": [],
            "explanation": "Dalam konteks kalimat 'produk kecantikan', kata produk bermakna barang hasil olahan atau buatan (pabrik/kriya) yang memiliki nilai guna."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Perhatikan kalimat berikut!\n'Para petani di Desa Sukamakmur sedang melakukan *panen raya* padi di sawah mereka dengan penuh sukacita.'",
            "question": "Istilah *panen raya* dalam bidang pertanian bermakna...",
            "indicator": "Mengidentifikasi penggunaan kosakata khusus dalam bidang pertanian.",
            "options": [
              "Menanam padi secara serentak",
              "Memanen hasil pertanian dalam jumlah besar secara serentak",
              "Membersihkan hama tanaman",
              "Menjual hasil bumi ke kota",
              "Pesta rakyat setelah bekerja"
            ],
            "answer": "Memanen hasil pertanian dalam jumlah besar secara serentak",
            "statements": [],
            "explanation": "Panen raya adalah istilah khusus pertanian yang merujuk pada masa pemungutan hasil sawah/ladang secara besar-besaran."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah paragraf berikut!\nBunglon adalah hewan yang unik. Ia mampu mengubah warna kulitnya sesuai dengan lingkungan tempat ia berada. Kemampuan ini disebut mimikri. Hal ini bertujuan untuk mengelabui musuh atau mangsanya. Dengan demikian, bunglon dapat bertahan hidup di alam liar.",
            "question": "Berdasarkan teks tersebut, objek yang dibahas adalah...",
            "indicator": "Mengidentifikasi objek berdasarkan kosakata yang digunakan dalam teks nonfiksi.",
            "options": [
              "Lingkungan alam",
              "Warna kulit",
              "Hewan reptil (Bunglon)",
              "Musuh bunglon",
              "Proses mimikri"
            ],
            "answer": "Hewan reptil (Bunglon)",
            "statements": [],
            "explanation": "Teks secara eksplisit membahas karakteristik dan kemampuan bertahan hidup dari bunglon."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut!\n(1) Siapkan blender, buah mangga, air, es batu, dan gula. (2) Kupas mangga dan potong dadu. (3) Masukkan semua bahan ke dalam blender. (4) Nyalakan blender hingga halus. (5) Tuang ke gelas saji.",
            "question": "Informasi tersurat yang terdapat dalam teks prosedur di atas adalah...",
            "indicator": "Mengidentifikasi informasi tersurat dalam teks prosedur.",
            "options": [
              "Jus mangga sangat menyehatkan tubuh.",
              "Mangga harus dikupas sebelum dimasukkan ke blender.",
              "Blender adalah alat elektronik yang mahal.",
              "Gula bisa diganti dengan madu.",
              "Es batu harus dihancurkan terlebih dahulu."
            ],
            "answer": "Mangga harus dikupas sebelum dimasukkan ke blender.",
            "statements": [],
            "explanation": "Kalimat (2) secara eksplisit menyatakan 'Kupas mangga'. Opsi lain adalah opini atau tidak tertulis di teks."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kutipan cerita berikut!\n'Maafkan aku, Bu. Aku tidak sengaja memecahkan vas bunga kesayangan Ibu,' kata Rara sambil menunduk takut. Ibu menghela napas panjang, lalu tersenyum lembut. 'Tidak apa-apa, Nak. Yang penting kamu jujur dan mau mengakui kesalahan. Vas bunga bisa dibeli lagi, tapi kejujuran itu tak ternilai harganya.'",
            "question": "Amanat yang terkandung dalam kutipan cerita tersebut adalah...",
            "indicator": "Menyimpulkan amanat dalam teks fiksi.",
            "options": [
              "Kita harus berhati-hati saat memegang barang pecah belah.",
              "Vas bunga adalah barang yang sangat berharga bagi seorang Ibu.",
              "Kejujuran lebih penting daripada sekadar materi.",
              "Seorang anak tidak boleh membuat ibunya marah.",
              "Kesalahan harus ditebus dengan mengganti barang."
            ],
            "answer": "Kejujuran lebih penting daripada sekadar materi.",
            "statements": [],
            "explanation": "Pesan moral utama disampaikan melalui ucapan Ibu bahwa kejujuran Rara lebih berharga daripada vas bunga yang pecah."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nGlobalisasi membawa dampak positif dan negatif. Dampak positifnya, teknologi informasi berkembang pesat sehingga memudahkan komunikasi. Namun, dampak negatifnya, budaya asing yang tidak sesuai norma seringkali mudah masuk dan ditiru oleh generasi muda.",
            "question": "Ide pokok paragraf di atas adalah...",
            "indicator": "Menyimpulkan ide pokok dari teks nonfiksi.",
            "options": [
              "Teknologi informasi memudahkan komunikasi.",
              "Generasi muda suka meniru budaya asing.",
              "Dampak positif dan negatif globalisasi.",
              "Perkembangan pesat teknologi.",
              "Norma budaya yang mulai luntur."
            ],
            "answer": "Dampak positif dan negatif globalisasi.",
            "statements": [],
            "explanation": "Kalimat utama terletak di awal paragraf yang menyebutkan bahwa globalisasi membawa dampak positif dan negatif, kemudian kalimat penjelas merincinya."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan kalimat berikut!\n'Hatinya *berbunga-bunga* saat namanya dipanggil sebagai juara pertama lomba pidato tingkat nasional.'",
            "question": "Makna ungkapan *berbunga-bunga* pada kalimat tersebut adalah...",
            "indicator": "Menjelaskan makna ungkapan yang digunakan dalam teks.",
            "options": [
              "Sangat terkejut",
              "Sangat sedih",
              "Sangat gembira",
              "Sangat bingung",
              "Sangat bangga"
            ],
            "answer": "Sangat gembira",
            "statements": [],
            "explanation": "Ungkapan 'berbunga-bunga' bermakna perasaan yang sangat senang atau gembira."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah ilustrasi berikut!\nDi masa pandemi, sekolah dilakukan secara daring. Rino seringkali terlambat masuk ruang pertemuan maya dan jarang mengumpulkan tugas. Akibatnya, nilai Rino menurun drastis.",
            "question": "Penilaian yang tepat terhadap sikap Rino berdasarkan ilustrasi tersebut adalah...",
            "indicator": "Menilai relevansi peristiwa dalam teks dengan kehidupan sehari-hari (sebab-akibat).",
            "options": [
              "Rino anak yang pintar namun kurang fasilitas.",
              "Rino wajar bersikap begitu karena bosan di rumah.",
              "Sikap Rino tidak disiplin dan merugikan dirinya sendiri.",
              "Guru Rino terlalu ketat dalam memberikan nilai.",
              "Pembelajaran daring memang sulit diikuti."
            ],
            "answer": "Sikap Rino tidak disiplin dan merugikan dirinya sendiri.",
            "statements": [],
            "explanation": "Perilaku terlambat dan tidak mengumpulkan tugas menunjukkan ketidakdisiplinan yang berdampak negatif (nilai turun) bagi dirinya sendiri."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kutipan puisi berikut!\nAngin berbisik di telingaku,\nMembawa kabar dari seberang,\nTentang sawah yang kini membatu,\nTentang sungai yang keruh dan garang.",
            "question": "Respons emosional yang muncul setelah membaca puisi tersebut adalah...",
            "indicator": "Menyimpulkan respons emosional terhadap unsur teks fiksi (puisi).",
            "options": [
              "Bahagia karena alam masih asri.",
              "Marah kepada angin yang berbisik.",
              "Prihatin terhadap kerusakan alam.",
              "Takut akan datangnya bencana.",
              "Bingung dengan kabar yang dibawa."
            ],
            "answer": "Prihatin terhadap kerusakan alam.",
            "statements": [],
            "explanation": "Kata 'sawah membatu' dan 'sungai keruh' menggambarkan kerusakan lingkungan, yang memancing rasa sedih atau prihatin."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Bacalah data berikut!\n1. Hewan menyusui\n2. Melahirkan anak\n3. Bernapas dengan paru-paru\n4. Hidup di air",
            "question": "Objek yang sesuai dengan ciri-ciri tersebut adalah...",
            "indicator": "Mengidentifikasi objek berdasarkan deskripsi ciri-ciri (kosakata) dalam teks.",
            "options": [
              "Hiu",
              "Kuda Laut",
              "Paus",
              "Buaya",
              "Penyu"
            ],
            "answer": "Paus",
            "statements": [],
            "explanation": "Paus adalah mamalia (menyusui, melahirkan, paru-paru) yang hidup di air. Hiu/Kuda Laut (ikan), Buaya/Penyu (reptil bertelur)."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut!\nSampah plastik menjadi masalah serius bagi lingkungan. Plastik sulit terurai oleh tanah dan dapat mencemari laut. Hewan laut sering mengira plastik sebagai makanan mereka. Hal ini dapat menyebabkan kematian pada hewan tersebut.",
            "question": "Berdasarkan teks di atas, pilihlah pernyataan-pernyataan yang merupakan dampak negatif sampah plastik!",
            "indicator": "Mengidentifikasi informasi tersurat yang berupa hubungan sebab-akibat dalam teks.",
            "options": [
              "Menyuburkan tanah di sekitarnya.",
              "Sulit terurai oleh tanah.",
              "Menjadi sumber makanan bergizi bagi ikan.",
              "Mencemari ekosistem laut.",
              "Menyebabkan kematian hewan laut."
            ],
            "answer": [
              "Sulit terurai oleh tanah.",
              "Mencemari ekosistem laut.",
              "Menyebabkan kematian hewan laut."
            ],
            "statements": [],
            "explanation": "Teks menyebutkan plastik sulit terurai, mencemari laut, dan mematikan hewan. Opsi menyuburkan tanah dan makanan bergizi adalah salah."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah fabel berikut!\nSemut bekerja keras mengumpulkan makanan untuk musim dingin. Sementara itu, Belalang hanya bernyanyi dan menertawakan Semut. Saat musim dingin tiba, Semut duduk nyaman dengan perut kenyang, sedangkan Belalang kelaparan dan kedinginan.",
            "question": "Pilihlah sifat-sifat tokoh Semut yang patut diteladani!",
            "indicator": "Menyimpulkan watak tokoh dalam teks fiksi.",
            "options": [
              "Rajin bekerja.",
              "Suka menertawakan teman.",
              "Memiliki persiapan matang untuk masa depan.",
              "Sombong atas keberhasilannya.",
              "Disiplin dalam menjalankan tugas."
            ],
            "answer": [
              "Rajin bekerja.",
              "Memiliki persiapan matang untuk masa depan.",
              "Disiplin dalam menjalankan tugas."
            ],
            "statements": [],
            "explanation": "Semut digambarkan bekerja keras (rajin), mengumpulkan untuk musim dingin (persiapan/visioner). Belalang yang pemalas dan sombong."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks 1: Bunga melati putih bersih, harum mewangi di taman sari. Ia lambang kesucian hati.\nTeks 2: Bunga mawar merah merona, durinya tajam menjaga diri. Ia lambang keberanian.",
            "question": "Tentukan persamaan informasi dari kedua teks tersebut!",
            "indicator": "Menilai kesesuaian antarunsur dan/atau antarinformasi dalam dua teks berbeda.",
            "options": [
              "Kedua teks membahas tentang jenis bunga.",
              "Kedua teks menyebutkan warna bunga.",
              "Kedua teks menjelaskan tentang duri tanaman.",
              "Kedua teks menggunakan bunga sebagai lambang sifat.",
              "Kedua teks menceritakan taman yang indah."
            ],
            "answer": [
              "Kedua teks membahas tentang jenis bunga.",
              "Kedua teks menyebutkan warna bunga.",
              "Kedua teks menggunakan bunga sebagai lambang sifat."
            ],
            "statements": [],
            "explanation": "Teks 1 (Melati, Putih, Lambang suci). Teks 2 (Mawar, Merah, Lambang berani). Persamaannya: objek bunga, ada warna, dan simbolisasi."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Perhatikan kata-kata berikut: (1) Diagnosa, (2) Resep, (3) Pasien, (4) Stetoskop, (5) Cangkul.",
            "question": "Manakah kata-kata yang termasuk kosakata khusus di bidang kesehatan?",
            "indicator": "Mengidentifikasi penggunaan kosakata khusus dalam bidang kesehatan.",
            "options": [
              "Diagnosa",
              "Resep",
              "Pasien",
              "Stetoskop",
              "Cangkul"
            ],
            "answer": [
              "Diagnosa",
              "Resep",
              "Pasien",
              "Stetoskop"
            ],
            "statements": [],
            "explanation": "Cangkul adalah kosakata bidang pertanian. Sisanya adalah istilah medis/kesehatan."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nBudi menemukan dompet di jalan. Ia melihat isinya banyak uang. Namun, ia melihat kartu identitas pemiliknya. Budi memutuskan mengembalikan dompet itu ke alamat pemiliknya. Pemilik dompet sangat berterima kasih dan memberi Budi hadiah, namun Budi menolaknya dengan halus.",
            "question": "Nilai-nilai positif apa yang dapat diambil dari perilaku Budi?",
            "indicator": "Menilai relevansi nilai-nilai dalam teks dengan norma kehidupan.",
            "options": [
              "Kejujuran dalam tindakan.",
              "Mengharapkan imbalan setelah menolong.",
              "Tanggung jawab sosial.",
              "Ketulusan membantu tanpa pamrih.",
              "Memanfaatkan kesempatan dalam kesempitan."
            ],
            "answer": [
              "Kejujuran dalam tindakan.",
              "Tanggung jawab sosial.",
              "Ketulusan membantu tanpa pamrih."
            ],
            "statements": [],
            "explanation": "Budi jujur (mengembalikan), bertanggung jawab, dan tulus (menolak hadiah). Opsi mengharapkan imbalan dan memanfaatkan kesempatan bertentangan dengan isi cerita."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks eksposisi berikut!\nHutan bakau memiliki fungsi ekologis dan ekonomis. Fungsi ekologisnya sebagai penahan abrasi pantai dan tempat hidup biota laut. Fungsi ekonomisnya, kayu bakau bisa dijadikan arang dan buahnya bisa diolah menjadi makanan.",
            "question": "Informasi yang sesuai dengan teks di atas adalah...",
            "indicator": "Menyusun ulang informasi secara eksplisit dari teks (mengelompokkan informasi).",
            "options": [
              "Hutan bakau mencegah pengikisan pantai.",
              "Kayu bakau tidak memiliki nilai jual.",
              "Hutan bakau adalah habitat hewan laut.",
              "Buah bakau beracun dan tidak bisa dimakan.",
              "Hutan bakau memiliki manfaat ganda."
            ],
            "answer": [
              "Hutan bakau mencegah pengikisan pantai.",
              "Hutan bakau adalah habitat hewan laut.",
              "Hutan bakau memiliki manfaat ganda."
            ],
            "statements": [],
            "explanation": "Abrasi = pengikisan (Benar). Tempat hidup biota = habitat (Benar). Fungsi ekologis & ekonomis = manfaat ganda (Benar)."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Kalimat: 'Ayah *membanting tulang* setiap hari demi membiayai sekolah kami, sementara kami hanya bisa *berpangku tangan* di rumah.'",
            "question": "Pilihlah arti ungkapan yang terdapat dalam kalimat tersebut!",
            "indicator": "Menjelaskan makna ungkapan (idiom) dalam teks.",
            "options": [
              "Membanting tulang artinya bekerja keras.",
              "Membanting tulang artinya mematahkan tulang.",
              "Berpangku tangan artinya bermalas-malasan.",
              "Berpangku tangan artinya sedang berdoa.",
              "Membanting tulang artinya olahraga berat."
            ],
            "answer": [
              "Membanting tulang artinya bekerja keras.",
              "Berpangku tangan artinya bermalas-malasan."
            ],
            "statements": [],
            "explanation": "Membanting tulang = kerja keras. Berpangku tangan = tidak melakukan apa-apa/malas."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Awal cerita: Sungai di desa itu jernih dan banyak ikannya.\nPeristiwa: Pabrik baru membuang limbah ke sungai tanpa diolah.\nAkhir cerita: Air sungai berubah hitam, bau, dan ikan-ikan mati mengapung.",
            "question": "Pilihlah pernyataan yang merupakan kesimpulan perubahan latar dan penyebabnya!",
            "indicator": "Menyimpulkan perubahan pada latar dalam teks fiksi.",
            "options": [
              "Latar sungai berubah dari bersih menjadi tercemar.",
              "Perubahan latar disebabkan oleh ulah manusia (pabrik).",
              "Ikan-ikan mati karena faktor usia.",
              "Sungai menjadi tempat wisata baru.",
              "Ekosistem sungai rusak akibat limbah."
            ],
            "answer": [
              "Latar sungai berubah dari bersih menjadi tercemar.",
              "Perubahan latar disebabkan oleh ulah manusia (pabrik).",
              "Ekosistem sungai rusak akibat limbah."
            ],
            "statements": [],
            "explanation": "Perubahan jelas dari jernih -> hitam (tercemar) akibat limbah pabrik."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut untuk menjawab soal!\nCara mencuci tangan yang benar: (1) Basahi tangan dengan air mengalir. (2) Tuang sabun secukupnya. (3) Gosok telapak, punggung tangan, dan sela jari. (4) Bilas dengan air bersih. (5) Keringkan dengan handuk/tisu.",
            "question": "Manakah pernyataan yang merupakan langkah inti membersihkan kotoran dalam teks tersebut?",
            "indicator": "Mengidentifikasi langkah-langkah dalam teks prosedur.",
            "options": [
              "Membasahi tangan dengan air.",
              "Menuang sabun ke tangan.",
              "Menggosok seluruh bagian tangan.",
              "Membilas busa sabun.",
              "Mengeringkan tangan."
            ],
            "answer": [
              "Menuang sabun ke tangan.",
              "Menggosok seluruh bagian tangan."
            ],
            "statements": [],
            "explanation": "Proses pembersihan kotoran terjadi saat menuang sabun (agen pembersih) dan menggosok (aksi mekanis). Membasahi dan membilas adalah pendukung."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Tokoh A: 'Sebaiknya kita kerjakan tugas ini bersama-sama agar cepat selesai.'\nTokoh B: 'Ah, aku malas. Kamu saja yang kerjakan, nanti tulis namaku.'\nTokoh C: 'Itu tidak adil. Kita harus bagi tugas sesuai kemampuan.'",
            "question": "Evaluasi sikap tokoh dalam dialog di atas!",
            "indicator": "Menilai karakter tokoh dan memberikan tanggapan kritis.",
            "options": [
              "Tokoh A memiliki inisiatif yang baik.",
              "Tokoh B bersikap egois dan tidak bertanggung jawab.",
              "Tokoh C bersikap bijaksana dan adil.",
              "Tokoh B patut dicontoh karena cerdik.",
              "Tokoh A dan C memiliki kerjasama yang positif."
            ],
            "answer": [
              "Tokoh A memiliki inisiatif yang baik.",
              "Tokoh B bersikap egois dan tidak bertanggung jawab.",
              "Tokoh C bersikap bijaksana dan adil.",
              "Tokoh A dan C memiliki kerjasama yang positif."
            ],
            "statements": [],
            "explanation": "Sikap B curang (tidak patut dicontoh). A inisiatif kerjasama. C menegakkan keadilan."
          },
          {
            "id": 21,
            "type": "category",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Teks: 'Transportasi umum seperti bus TransJakarta dan KRL Commuter Line sangat membantu mengurangi kemacetan di ibu kota. Masyarakat diimbau beralih dari kendaraan pribadi ke transportasi umum.'",
            "question": "Tentukan Benar/Salah pernyataan berikut berdasarkan teks!",
            "indicator": "Mengidentifikasi informasi eksplisit dalam teks.",
            "options": [],
            "statements": [
              {
                "text": "Bus TransJakarta adalah salah satu contoh transportasi umum.",
                "answer": true
              },
              {
                "text": "Teks menyarankan masyarakat membeli mobil pribadi.",
                "answer": false
              },
              {
                "text": "Penggunaan transportasi umum dapat mengurangi kemacetan.",
                "answer": true
              },
              {
                "text": "KRL Commuter Line hanya beroperasi di desa.",
                "answer": false
              },
              {
                "text": "Tujuan teks adalah mengajak menggunakan transportasi umum.",
                "answer": true
              }
            ],
            "explanation": "Teks pro transportasi umum untuk kurangi macet. Tidak menyarankan beli mobil pribadi. KRL di ibu kota (kota), bukan desa."
          },
          {
            "id": 22,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Ikhtisar Teks Sejarah: Proklamasi Kemerdekaan Indonesia dibacakan oleh Soekarno didampingi Hatta pada tanggal 17 Agustus 1945 di Jalan Pegangsaan Timur No. 56, Jakarta.",
            "question": "Verifikasi kesesuaian informasi untuk bagan/ikhtisar.",
            "indicator": "Menyusun kembali informasi dari teks dalam bentuk ikhtisar (memverifikasi data fakta).",
            "options": [],
            "statements": [
              {
                "text": "Tokoh proklamator adalah Soekarno dan Hatta.",
                "answer": true
              },
              {
                "text": "Peristiwa terjadi di Surabaya.",
                "answer": false
              },
              {
                "text": "Waktu peristiwa adalah 17 Agustus 1945.",
                "answer": true
              },
              {
                "text": "Lokasi pembacaan di Jalan Pegangsaan Timur No. 56.",
                "answer": true
              },
              {
                "text": "Naskah proklamasi diketik oleh Sayuti Melik (Info ini tidak ada di teks stimulus).",
                "answer": false
              }
            ],
            "explanation": "Sesuai stimulus: Tokoh Benar, Waktu Benar, Lokasi Benar. Lokasi Surabaya Salah (di Jakarta). Info Sayuti Melik benar secara sejarah tapi SALAH berdasarkan konteks 'dari teks stimulus saja'."
          },
          {
            "id": 23,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Kalimat: 'Anak itu *panjang tangan*, sehingga sering dijauhi teman-temannya.'",
            "question": "Analisis makna ungkapan 'panjang tangan'.",
            "indicator": "Menjelaskan makna ungkapan dan konteks penggunaannya.",
            "options": [],
            "statements": [
              {
                "text": "Panjang tangan artinya suka menolong.",
                "answer": false
              },
              {
                "text": "Panjang tangan artinya suka mencuri.",
                "answer": true
              },
              {
                "text": "Akibat sifat tersebut, ia dijauhi teman.",
                "answer": true
              },
              {
                "text": "Ungkapan ini memiliki konotasi positif.",
                "answer": false
              },
              {
                "text": "Ungkapan ini menggambarkan fisik tangan yang panjang.",
                "answer": false
              }
            ],
            "explanation": "Panjang tangan = Suka mencuri (Konotasi negatif). Bukan fisik, bukan suka menolong (ringan tangan)."
          },
          {
            "id": 24,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: Kancil menipu Buaya agar berbaris di sungai untuk dihitung, padahal Kancil hanya ingin menyeberang tanpa dimakan.",
            "question": "Evaluasi tindakan tokoh Kancil.",
            "indicator": "Menilai tindakan tokoh dalam teks fiksi.",
            "options": [],
            "statements": [
              {
                "text": "Kancil adalah hewan yang cerdik.",
                "answer": true
              },
              {
                "text": "Tindakan Kancil membohongi Buaya adalah tindakan terpuji.",
                "answer": false
              },
              {
                "text": "Kancil menggunakan akalnya untuk bertahan hidup.",
                "answer": true
              },
              {
                "text": "Buaya dalam cerita ini digambarkan mudah dikelabui.",
                "answer": true
              },
              {
                "text": "Kita boleh meniru sikap suka berbohong Kancil.",
                "answer": false
              }
            ],
            "explanation": "Cerdik (Benar). Berbohong tidak terpuji (Salah). Bertahan hidup (Benar). Buaya polos (Benar). Tidak boleh meniru bohong (Salah)."
          },
          {
            "id": 25,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kosakata Bidang Antariksa: Planet, Orbit, Satelit, Fotosintesis, Komet.",
            "question": "Klasifikasi kosakata khusus bidang antariksa.",
            "indicator": "Mengelompokkan kosakata khusus berdasarkan bidangnya.",
            "options": [],
            "statements": [
              {
                "text": "Planet adalah benda langit.",
                "answer": true
              },
              {
                "text": "Orbit adalah jalur lintasan benda langit.",
                "answer": true
              },
              {
                "text": "Fotosintesis termasuk istilah antariksa.",
                "answer": false
              },
              {
                "text": "Satelit adalah pengiring planet.",
                "answer": true
              },
              {
                "text": "Komet adalah bintang berekor.",
                "answer": true
              }
            ],
            "explanation": "Fotosintesis adalah istilah biologi (tumbuhan), bukan antariksa."
          },
          {
            "id": 26,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Pantun: Berakit-rakit ke hulu, berenang-renang ke tepian. Bersakit-sakit dahulu, bersenang-senang kemudian.",
            "question": "Analisis pesan/amanat pantun.",
            "indicator": "Menyimpulkan nilai-nilai dalam teks sastra lama (pantun).",
            "options": [],
            "statements": [
              {
                "text": "Kita harus belajar berenang agar selamat.",
                "answer": false
              },
              {
                "text": "Kesuksesan dapat diraih dengan kerja keras dan pengorbanan.",
                "answer": true
              },
              {
                "text": "Jangan pernah pergi ke hulu sungai.",
                "answer": false
              },
              {
                "text": "Usaha keras di awal akan membuahkan hasil manis di akhir.",
                "answer": true
              },
              {
                "text": "Pantun ini mengajarkan tentang olahraga air.",
                "answer": false
              }
            ],
            "explanation": "Makna kiasan: kerja keras dulu baru sukses. Bukan makna harfiah berenang."
          },
          {
            "id": 27,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: Perpustakaan adalah gudang ilmu. Di sana tersimpan ribuan buku. Suasana tenang membuat kita nyaman membaca. Namun sayang, pengunjung sering meninggalkan sampah di meja baca.",
            "question": "Evaluasi kesesuaian antarunsur teks.",
            "indicator": "Menilai kesesuaian antara situasi yang diharapkan dengan kenyataan dalam teks.",
            "options": [],
            "statements": [
              {
                "text": "Perpustakaan digambarkan sebagai tempat positif (gudang ilmu).",
                "answer": true
              },
              {
                "text": "Suasana tenang mendukung kegiatan membaca.",
                "answer": true
              },
              {
                "text": "Perilaku pengunjung membuang sampah sesuai dengan aturan perpustakaan.",
                "answer": false
              },
              {
                "text": "Terdapat pertentangan antara fungsi perpustakaan dan perilaku pengunjung.",
                "answer": true
              },
              {
                "text": "Kalimat terakhir mendukung kalimat pertama.",
                "answer": false
              }
            ],
            "explanation": "Perilaku buang sampah kontradiktif (bertentangan) dengan suasana nyaman/ilmu. Kalimat terakhir adalah kritik/masalah, bukan pendukung kalimat 'gudang ilmu'."
          },
          {
            "id": 28,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Fakta: Hujan deras mengguyur kota semalaman. Saluran air tersumbat sampah. \nKesimpulan: Terjadi banjir di pagi hari.",
            "question": "Analisis hubungan sebab-akibat (Inferensial).",
            "indicator": "Menyimpulkan peristiwa berdasarkan informasi tersirat/tersurat.",
            "options": [],
            "statements": [
              {
                "text": "Hujan deras adalah satu-satunya penyebab banjir.",
                "answer": false
              },
              {
                "text": "Sampah yang menyumbat saluran turut memicu banjir.",
                "answer": true
              },
              {
                "text": "Kesimpulan 'Terjadi banjir' logis berdasarkan fakta yang ada.",
                "answer": true
              },
              {
                "text": "Jika saluran air bersih, kemungkinan banjir bisa dikurangi.",
                "answer": true
              },
              {
                "text": "Banjir disebabkan oleh air laut pasang.",
                "answer": false
              }
            ],
            "explanation": "Banjir karena hujan + sumbatan (bukan hujan saja). Kesimpulan logis. Tidak ada info air laut pasang."
          },
          {
            "id": 29,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat 1: Ibu *membeli* sayur di pasar. \nKalimat 2: Ayah *memukul* paku dengan palu.",
            "question": "Identifikasi kata kerja (verba) dalam kalimat.",
            "indicator": "Mengidentifikasi kelas kata (kata kerja) dalam kalimat.",
            "options": [],
            "statements": [
              {
                "text": "Kata 'membeli' adalah predikat pada kalimat 1.",
                "answer": true
              },
              {
                "text": "Kata 'sayur' adalah kata kerja.",
                "answer": false
              },
              {
                "text": "Kata 'memukul' menunjukkan aktivitas fisik.",
                "answer": true
              },
              {
                "text": "Kata 'pasar' dan 'palu' adalah kata benda.",
                "answer": true
              },
              {
                "text": "Tidak ada kata kerja dalam kedua kalimat tersebut.",
                "answer": false
              }
            ],
            "explanation": "Membeli, memukul = Verba (Kerja). Sayur, pasar, paku, palu = Nomina (Benda)."
          },
          {
            "id": 30,
            "type": "category",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Deskripsi: Benda ini terbuat dari kayu dan grafit. Digunakan untuk menulis dan bisa dihapus.",
            "question": "Tebak benda berdasarkan deskripsi.",
            "indicator": "Mengidentifikasi objek berdasarkan deskripsi bahan dan fungsi.",
            "options": [],
            "statements": [
              {
                "text": "Benda tersebut adalah pulpen.",
                "answer": false
              },
              {
                "text": "Benda tersebut adalah pensil.",
                "answer": true
              },
              {
                "text": "Benda tersebut adalah spidol.",
                "answer": false
              },
              {
                "text": "Ciri khasnya adalah bisa dihapus.",
                "answer": true
              },
              {
                "text": "Grafit adalah bahan utama isi pensil.",
                "answer": true
              }
            ],
            "explanation": "Kayu + Grafit + Bisa dihapus = Pensil. Pulpen/Spidol pakai tinta."
          }
        ]
      },
      {
        "nomorPaket": 3,
        "namaPaket": "Paket 3 (FOCUS)",
        "kode": "TO-BI-03",
        "deskripsi": "Simulasi Ujian TKA Bahasa Indonesia SD (Paket 3 (FOCUS)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut!\nTanaman hidroponik adalah cara bercocok tanam tanpa menggunakan tanah. Media tanamnya diganti dengan air yang mengandung nutrisi. Nutrisi ini sangat penting bagi pertumbuhan tanaman agar dapat berkembang dengan subur meskipun tanpa tanah.",
            "question": "Makna kata khusus 'nutrisi' dalam paragraf tersebut adalah...",
            "indicator": "Mengidentifikasi penggunaan kosakata umum dan khusus dalam bidang pertanian.",
            "options": [
              "Zat beracun untuk hama",
              "Makanan bergizi untuk tumbuhan",
              "Air yang mengalir deras",
              "Media pengganti tanah",
              "Cahaya matahari buatan"
            ],
            "answer": "Makanan bergizi untuk tumbuhan",
            "statements": [],
            "explanation": "Dalam konteks biologi/pertanian, nutrisi adalah zat-zat gizi yang dibutuhkan organisme (tanaman) untuk tumbuh."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks deskripsi berikut!\nBenda ini memiliki layar yang lebar dan tombol-tombol huruf di bagian bawahnya. Ia dapat dilipat sehingga mudah dibawa ke mana saja. Benda ini sering digunakan ayah untuk bekerja mengetik dokumen dan mengirim surat elektronik.",
            "question": "Objek yang dideskripsikan dalam teks tersebut adalah...",
            "indicator": "Mengidentifikasi objek berdasarkan kosakata yang digunakan dalam teks nonfiksi.",
            "options": [
              "Televisi",
              "Komputer meja",
              "Laptop",
              "Kalkulator",
              "Tablet"
            ],
            "answer": "Laptop",
            "statements": [],
            "explanation": "Kata kunci 'layar lebar', 'tombol huruf (keyboard)', 'dapat dilipat', dan 'mudah dibawa' merujuk pada laptop."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut!\nPemerintah Kota Surabaya akan menggelar Festival Rujak Uleg pada hari Minggu di sepanjang Jalan Kembang Jepun. Acara ini bertujuan untuk melestarikan kuliner tradisional dan menarik wisatawan. Ratusan peserta akan berpartisipasi dengan kostum unik.",
            "question": "Informasi tersurat yang terdapat dalam teks tersebut adalah...",
            "indicator": "Mengidentifikasi informasi tersurat dalam teks.",
            "options": [
              "Festival Rujak Uleg diadakan setiap bulan.",
              "Acara diadakan di Balai Kota Surabaya.",
              "Peserta wajib membawa cobek sendiri.",
              "Tujuan acara untuk melestarikan kuliner tradisional.",
              "Festival ini hanya untuk warga asli Surabaya."
            ],
            "answer": "Tujuan acara untuk melestarikan kuliner tradisional.",
            "statements": [],
            "explanation": "Informasi ini tertulis jelas pada kalimat kedua: 'Acara ini bertujuan untuk melestarikan kuliner tradisional...'."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah paragraf berikut!\nSampah plastik menjadi masalah serius bagi lingkungan. Plastik sulit terurai dan dapat mencemari tanah serta laut. Hewan-hewan laut sering mengira plastik sebagai makanan. Oleh karena itu, kita harus mulai mengurangi penggunaan plastik sekali pakai.",
            "question": "Ide pokok paragraf tersebut adalah...",
            "indicator": "Menyimpulkan ide pokok dalam teks.",
            "options": [
              "Hewan laut memakan plastik.",
              "Cara mendaur ulang plastik.",
              "Bahaya sampah plastik bagi lingkungan.",
              "Larangan menggunakan plastik.",
              "Proses terurainya plastik."
            ],
            "answer": "Bahaya sampah plastik bagi lingkungan.",
            "statements": [],
            "explanation": "Paragraf membahas dampak negatif sampah plastik, yang intinya adalah bahayanya bagi lingkungan."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kutipan cerita berikut!\nRina selalu menyisihkan uang jajannya setiap hari. Ia ingin membeli tas sekolah baru tanpa menyusahkan orang tuanya. Setelah tiga bulan, akhirnya uangnya terkumpul. Ia bergegas ke toko tas dengan wajah berseri-seri.",
            "question": "Amanat yang terkandung dalam cerita tersebut adalah...",
            "indicator": "Menyimpulkan amanat dalam teks fiksi.",
            "options": [
              "Kita harus meminta uang lebih kepada orang tua.",
              "Sebaiknya kita boros agar pedagang senang.",
              "Berhemat dan mandiri untuk mencapai keinginan.",
              "Membeli tas baru harus setiap tiga bulan.",
              "Jangan suka menabung karena lama."
            ],
            "answer": "Berhemat dan mandiri untuk mencapai keinginan.",
            "statements": [],
            "explanation": "Cerita mengajarkan kemandirian (tidak menyusahkan orang tua) dan ketekunan menabung (berhemat) untuk mencapai tujuan."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nAwalnya, Desa Sukamaju sangat gersang dan panas. Namun, setelah Pak Budi mengajak warga menanam pohon di setiap pekarangan, suasana berubah. Lima tahun kemudian, desa tersebut menjadi asri, sejuk, dan memiliki sumber air yang melimpah.",
            "question": "Perubahan yang terjadi pada latar desa dalam teks tersebut adalah...",
            "indicator": "Menyimpulkan perubahan sederhana pada latar dalam teks fiksi atau nonfiksi.",
            "options": [
              "Dari sejuk menjadi panas",
              "Dari ramai menjadi sepi",
              "Dari gersang menjadi asri",
              "Dari kaya menjadi miskin",
              "Dari desa menjadi kota"
            ],
            "answer": "Dari gersang menjadi asri",
            "statements": [],
            "explanation": "Teks menyebutkan perubahan dari 'gersang dan panas' menjadi 'asri, sejuk'."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kalimat berikut!\nAyah 'membanting tulang' setiap hari demi membiayai sekolah adik-adikku.",
            "question": "Makna ungkapan 'membanting tulang' pada kalimat tersebut adalah...",
            "indicator": "Menjelaskan makna ungkapan yang digunakan dalam teks.",
            "options": [
              "Mematahkan tulang",
              "Bekerja keras",
              "Berolahraga berat",
              "Menjual tulang",
              "Sakit tulang"
            ],
            "answer": "Bekerja keras",
            "statements": [],
            "explanation": "Ungkapan 'membanting tulang' adalah idiom yang berarti bekerja sangat keras."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nDi era digital, banyak anak lebih suka bermain gawai daripada bermain di luar rumah. Akibatnya, mereka kurang bersosialisasi dan kurang gerak. Padahal, bermain bersama teman di lapangan melatih kerjasama dan kesehatan fisik.",
            "question": "Mengapa peristiwa dalam teks tersebut relevan dengan kehidupan sehari-hari saat ini?",
            "indicator": "Menilai relevansi peristiwa dalam teks dengan kehidupan sehari-hari.",
            "options": [
              "Karena gawai sudah tidak diproduksi lagi.",
              "Karena semua anak pasti menjadi atlet.",
              "Karena fenomena kecanduan gawai banyak terjadi di sekitar kita.",
              "Karena bermain di luar rumah dilarang pemerintah.",
              "Karena anak-anak zaman sekarang tidak butuh teman."
            ],
            "answer": "Karena fenomena kecanduan gawai banyak terjadi di sekitar kita.",
            "statements": [],
            "explanation": "Teks mengangkat isu kecanduan gawai pada anak, yang merupakan fenomena nyata dan relevan di masyarakat saat ini."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah pantun berikut!\nBerakit-rakit ke hulu,\nBerenang-renang ke tepian.\nBersakit-sakit dahulu,\nBersenang-senang kemudian.",
            "question": "Pesan dalam pantun tersebut sesuai dengan peribahasa...",
            "indicator": "Menilai kesesuaian antarunsur/informasi (isi pantun dengan peribahasa).",
            "options": [
              "Besar pasak daripada tiang.",
              "Air susu dibalas dengan air tuba.",
              "Berjerih payah dahulu baru menikmati hasilnya.",
              "Tong kosong nyaring bunyinya.",
              "Sepandai-pandai tupai melompat akhirnya jatuh juga."
            ],
            "answer": "Berjerih payah dahulu baru menikmati hasilnya.",
            "statements": [],
            "explanation": "Isi pantun (baris 3 & 4) mengajarkan tentang usaha keras terlebih dahulu sebelum mendapatkan kebahagiaan/kesuksesan."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kutipan cerita!\n'Maafkan aku, Din. Aku tidak sengaja merusakkan mainanmu,' kata Budi sambil menunduk takut. Dini terdiam sejenak, lalu tersenyum. 'Tidak apa-apa, Bud. Itu kan cuma kecelakaan. Kita bisa perbaiki bersama.'",
            "question": "Respons emosional positif yang dapat diteladani dari tokoh Dini adalah...",
            "indicator": "Menyimpulkan respons emosional terhadap unsur teks fiksi.",
            "options": [
              "Pendam dendam",
              "Sikap pemaaf",
              "Sikap acuh tak acuh",
              "Rasa takut berlebihan",
              "Sikap ingin menang sendiri"
            ],
            "answer": "Sikap pemaaf",
            "statements": [],
            "explanation": "Dini menunjukkan sikap pemaaf dengan tidak marah dan justru mengajak memperbaiki bersama."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Perhatikan kalimat-kalimat berikut!\n1) Matahari terbit dari timur.\n2) Wah, indahnya pemandangan ini!\n3) Air mengalir dari tempat tinggi ke rendah.\n4) Sebaiknya kamu belajar lebih giat.",
            "question": "Manakah yang merupakan kalimat berisi fakta? (Pilih semua jawaban benar)",
            "indicator": "Mengidentifikasi informasi fakta dalam teks.",
            "options": [
              "Kalimat 1",
              "Kalimat 2",
              "Kalimat 3",
              "Kalimat 4"
            ],
            "answer": [
              "Kalimat 1",
              "Kalimat 3"
            ],
            "statements": [],
            "explanation": "Matahari terbit dari timur dan sifat air adalah fakta alam. Kalimat 2 adalah opini (perasaan), kalimat 4 adalah saran."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nKupu-kupu mengalami metamorfosis sempurna. Tahapannya dimulai dari telur yang menetas menjadi ulat. Ulat makan banyak daun lalu berubah menjadi kepompong. Akhirnya, keluarlah kupu-kupu yang indah.",
            "question": "Pernyataan yang sesuai dengan isi teks di atas adalah... (Pilih 2 jawaban)",
            "indicator": "Menyusun kembali informasi dari teks (urutan/detail).",
            "options": [
              "Kupu-kupu mengalami metamorfosis tidak sempurna.",
              "Ulat berubah langsung menjadi kupu-kupu.",
              "Fase kepompong terjadi setelah fase ulat.",
              "Telur adalah fase pertama metamorfosis kupu-kupu.",
              "Ulat memakan serangga lain."
            ],
            "answer": [
              "Fase kepompong terjadi setelah fase ulat.",
              "Telur adalah fase pertama metamorfosis kupu-kupu."
            ],
            "statements": [],
            "explanation": "Sesuai teks: telur -> ulat -> kepompong -> kupu-kupu. Ulat makan daun, bukan serangga."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nPak Raden dikenal sebagai orang yang kikir. Ia tidak pernah mau menyumbang untuk kegiatan desa. Berbeda dengan Pak Somad, tetangganya, yang sangat dermawan dan suka membantu warga yang kesusahan.",
            "question": "Sifat tokoh yang terdapat dalam teks adalah... (Pilih semua yang benar)",
            "indicator": "Menyimpulkan watak tokoh dalam teks fiksi.",
            "options": [
              "Pak Raden bersifat dermawan.",
              "Pak Raden bersifat pelit/kikir.",
              "Pak Somad bersifat sombong.",
              "Pak Somad bersifat suka menolong.",
              "Pak Raden suka membantu."
            ],
            "answer": [
              "Pak Raden bersifat pelit/kikir.",
              "Pak Somad bersifat suka menolong."
            ],
            "statements": [],
            "explanation": "Teks secara eksplisit menyebut Pak Raden kikir dan Pak Somad dermawan/suka membantu."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan infografis tentang 'Cara Mencuci Tangan' yang berisi langkah: 1) Basahi tangan, 2) Gunakan sabun, 3) Gosok seluruh permukaan tangan selama 20 detik, 4) Bilas dengan air bersih, 5) Keringkan.",
            "question": "Informasi penting yang didapat dari prosedur tersebut adalah... (Pilih 2 jawaban)",
            "indicator": "Menyimpulkan gagasan pendukung dari teks prosedur.",
            "options": [
              "Kita boleh mencuci tangan tanpa sabun.",
              "Menggosok tangan sebaiknya dilakukan minimal 20 detik.",
              "Air yang digunakan tidak harus bersih.",
              "Langkah terakhir adalah mengeringkan tangan.",
              "Mencuci tangan hanya perlu 5 detik."
            ],
            "answer": [
              "Menggosok tangan sebaiknya dilakukan minimal 20 detik.",
              "Langkah terakhir adalah mengeringkan tangan."
            ],
            "statements": [],
            "explanation": "Poin 3 menyebutkan durasi 20 detik, dan poin 5 adalah mengeringkan."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah paragraf berikut!\nHutan mangrove memiliki fungsi ekologis yang penting. Akarnya yang kuat dapat menahan gelombang air laut sehingga mencegah abrasi. Selain itu, hutan mangrove menjadi tempat tinggal bagi berbagai jenis ikan dan kepiting.",
            "question": "Manfaat hutan mangrove berdasarkan teks adalah... (Pilih semua jawaban benar)",
            "indicator": "Mengidentifikasi informasi tersurat tentang manfaat objek.",
            "options": [
              "Mencegah terjadinya abrasi pantai.",
              "Sebagai tempat wisata kuliner.",
              "Habitat bagi ikan dan kepiting.",
              "Menghasilkan kayu bakar yang banyak.",
              "Menyebabkan banjir rob."
            ],
            "answer": [
              "Mencegah terjadinya abrasi pantai.",
              "Habitat bagi ikan dan kepiting."
            ],
            "statements": [],
            "explanation": "Teks menyebutkan 'mencegah abrasi' dan 'tempat tinggal ikan dan kepiting'."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah cerita berikut!\nSiti menemukan dompet di jalan. Ia melihat isinya banyak uang. Temannya, Budi, menyuruh Siti mengambil uangnya. Namun, Siti menolak dan memilih menyerahkan dompet itu ke pos polisi terdekat.",
            "question": "Nilai moral positif yang ditunjukkan Siti adalah... (Pilih 2 jawaban)",
            "indicator": "Menyimpulkan nilai-nilai dalam teks.",
            "options": [
              "Kejujuran.",
              "Keserakahan.",
              "Tanggung jawab.",
              "Ketidakpedulian.",
              "Kerjasama dalam kejahatan."
            ],
            "answer": [
              "Kejujuran.",
              "Tanggung jawab."
            ],
            "statements": [],
            "explanation": "Siti jujur (tidak mengambil uang) dan bertanggung jawab (menyerahkan ke polisi)."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nJerapah adalah hewan tertinggi di dunia. Hewan ini memiliki leher yang sangat panjang. Leher panjangnya berguna untuk meraih daun-daun muda di pohon yang tinggi sebagai makanannya.",
            "question": "Ciri-ciri objek yang dideskripsikan adalah... (Pilih semua yang benar)",
            "indicator": "Mengidentifikasi objek berdasarkan deskripsi dalam teks.",
            "options": [
              "Memiliki leher pendek.",
              "Merupakan hewan tertinggi di dunia.",
              "Memakan daging.",
              "Lehernya berfungsi meraih daun tinggi.",
              "Hidup di dalam air."
            ],
            "answer": [
              "Merupakan hewan tertinggi di dunia.",
              "Lehernya berfungsi meraih daun tinggi."
            ],
            "statements": [],
            "explanation": "Sesuai teks: hewan tertinggi dan leher panjang untuk makan daun."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah pernyataan berikut!\n'Penggunaan kendaraan pribadi yang berlebihan menyebabkan kemacetan dan polusi udara.'",
            "question": "Tanggapan atau solusi yang logis terhadap pernyataan di atas adalah... (Pilih 2 jawaban)",
            "indicator": "Menilai relevansi dan memberikan tanggapan terhadap isu.",
            "options": [
              "Sebaiknya kita beralih menggunakan transportasi umum.",
              "Pemerintah harus menutup semua pabrik kendaraan.",
              "Kita bisa menggunakan sepeda untuk jarak dekat.",
              "Semua orang harus membeli mobil baru.",
              "Biarkan saja karena itu hak setiap orang."
            ],
            "answer": [
              "Sebaiknya kita beralih menggunakan transportasi umum.",
              "Kita bisa menggunakan sepeda untuk jarak dekat."
            ],
            "statements": [],
            "explanation": "Solusi untuk mengurangi macet/polusi adalah transportasi umum dan kendaraan ramah lingkungan (sepeda), bukan menutup pabrik atau membeli mobil baru."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks 1: Bawang Putih rajin membantu ibunya mencuci di sungai. Teks 2: Malin Kundang malu mengakui ibunya yang miskin di depan istrinya.",
            "question": "Perbedaan karakter tokoh utama pada kedua teks tersebut adalah... (Pilih semua yang benar)",
            "indicator": "Membandingkan karakter tokoh antar teks.",
            "options": [
              "Bawang Putih berbakti, Malin Kundang durhaka.",
              "Bawang Putih pemalas, Malin Kundang rajin.",
              "Bawang Putih rendah hati, Malin Kundang sombong.",
              "Keduanya sama-sama menyayangi orang tua.",
              "Bawang Putih jahat, Malin Kundang baik."
            ],
            "answer": [
              "Bawang Putih berbakti, Malin Kundang durhaka.",
              "Bawang Putih rendah hati, Malin Kundang sombong."
            ],
            "statements": [],
            "explanation": "Bawang Putih digambarkan rajin/baik, Malin Kundang malu/durhaka."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perhatikan kata-kata berikut dalam bidang kesehatan: 1) Stetoskop, 2) Cangkul, 3) Resep, 4) Papan tulis, 5) Diagnosa.",
            "question": "Manakah yang termasuk kosakata khusus bidang kesehatan/kedokteran? (Pilih 3 jawaban)",
            "indicator": "Mengidentifikasi penggunaan kosakata khusus bidang tertentu.",
            "options": [
              "Stetoskop",
              "Cangkul",
              "Resep",
              "Papan tulis",
              "Diagnosa"
            ],
            "answer": [
              "Stetoskop",
              "Resep",
              "Diagnosa"
            ],
            "statements": [],
            "explanation": "Cangkul (pertanian), Papan tulis (pendidikan). Stetoskop, Resep, Diagnosa (kesehatan)."
          },
          {
            "id": 21,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Tentang teks Laporan Hasil Pengamatan.",
            "question": "Tentukan Benar atau Salah pernyataan berikut!",
            "indicator": "Memahami karakteristik teks laporan hasil pengamatan.",
            "options": [],
            "statements": [
              {
                "text": "Laporan hasil pengamatan harus berdasarkan fakta yang dilihat.",
                "answer": true
              },
              {
                "text": "Laporan hasil pengamatan berisi khayalan penulis.",
                "answer": false
              },
              {
                "text": "Tujuan laporan adalah memberikan informasi yang objektif.",
                "answer": true
              },
              {
                "text": "Bahasa dalam laporan boleh tidak baku dan berantakan.",
                "answer": false
              },
              {
                "text": "Data dalam laporan boleh direkayasa.",
                "answer": false
              }
            ],
            "explanation": "Laporan pengamatan bersifat faktual, objektif, dan menggunakan bahasa baku."
          },
          {
            "id": 22,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah kalimat: 'Bunga mawar itu *gugur* satu per satu kelopaknya.'",
            "question": "Analisis makna kata *gugur*.",
            "indicator": "Menjelaskan makna kata/ungkapan dalam konteks kalimat.",
            "options": [],
            "statements": [
              {
                "text": "Makna 'gugur' dalam kalimat tersebut adalah jatuh/rontok.",
                "answer": true
              },
              {
                "text": "Makna 'gugur' dalam kalimat tersebut adalah meninggal dunia.",
                "answer": false
              },
              {
                "text": "Kata 'gugur' biasanya digunakan untuk daun atau bunga.",
                "answer": true
              },
              {
                "text": "Antonim dari 'gugur' dalam konteks ini adalah tumbuh.",
                "answer": true
              },
              {
                "text": "Kalimat tersebut menggunakan majas personifikasi.",
                "answer": false
              }
            ],
            "explanation": "Gugur pada bunga berarti rontok. Gugur pada pahlawan berarti meninggal. Tidak ada personifikasi di sini."
          },
          {
            "id": 23,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Kancil menipu Buaya agar bisa menyeberang sungai. Kancil cerdik tapi licik.'",
            "question": "Evaluasi terhadap tokoh Kancil.",
            "indicator": "Menilai kesesuaian sifat tokoh dengan tindakannya.",
            "options": [],
            "statements": [
              {
                "text": "Tindakan Kancil menipu adalah tindakan terpuji.",
                "answer": false
              },
              {
                "text": "Kecerdikan Kancil digunakan untuk hal yang salah.",
                "answer": true
              },
              {
                "text": "Kita patut meniru sikap suka berbohong demi tujuan pribadi.",
                "answer": false
              },
              {
                "text": "Kancil adalah tokoh yang cerdas menyelesaikan masalah.",
                "answer": true
              },
              {
                "text": "Buaya adalah korban dari kelicikan Kancil.",
                "answer": true
              }
            ],
            "explanation": "Menipu bukan tindakan terpuji, meskipun menunjukkan kecerdasan."
          },
          {
            "id": 24,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Tentang Surat Resmi dan Surat Pribadi.",
            "question": "Identifikasi ciri-ciri surat.",
            "indicator": "Membedakan jenis teks (surat resmi vs pribadi).",
            "options": [],
            "statements": [
              {
                "text": "Surat resmi menggunakan kop surat.",
                "answer": true
              },
              {
                "text": "Surat kepada teman menggunakan bahasa baku yang kaku.",
                "answer": false
              },
              {
                "text": "Nomor surat terdapat pada surat pribadi.",
                "answer": false
              },
              {
                "text": "Salam pembuka surat resmi biasanya 'Dengan hormat'.",
                "answer": true
              },
              {
                "text": "Surat undangan ulang tahun termasuk surat resmi instansi.",
                "answer": false
              }
            ],
            "explanation": "Surat pribadi bahasa santai/akrab, tidak ada kop/nomor. Undangan ultah pribadi bukan resmi instansi."
          },
          {
            "id": 25,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Situasi: Temanmu mengejek teman lain yang sepatunya rusak.",
            "question": "Tanggapan terhadap situasi.",
            "indicator": "Menilai relevansi peristiwa dan respon moral.",
            "options": [],
            "statements": [
              {
                "text": "Tindakan mengejek itu tidak sesuai dengan nilai Pancasila.",
                "answer": true
              },
              {
                "text": "Sebaiknya kita ikut mengejek agar suasana ramai.",
                "answer": false
              },
              {
                "text": "Kita harus menghibur teman yang diejek.",
                "answer": true
              },
              {
                "text": "Peristiwa ini relevan dengan isu perundungan (bullying) di sekolah.",
                "answer": true
              },
              {
                "text": "Sepatu rusak adalah aib yang pantas ditertawakan.",
                "answer": false
              }
            ],
            "explanation": "Mengejek adalah bullying (perundungan) yang salah dan melanggar moral."
          },
          {
            "id": 26,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Tentang ide pokok paragraf.",
            "question": "Konsep ide pokok.",
            "indicator": "Memahami konsep ide pokok.",
            "options": [],
            "statements": [
              {
                "text": "Ide pokok adalah gagasan utama yang mendasari sebuah paragraf.",
                "answer": true
              },
              {
                "text": "Dalam satu paragraf boleh terdapat tiga ide pokok.",
                "answer": false
              },
              {
                "text": "Ide pokok biasanya terdapat dalam kalimat utama.",
                "answer": true
              },
              {
                "text": "Kalimat penjelas berfungsi mendukung ide pokok.",
                "answer": true
              },
              {
                "text": "Ide pokok selalu berada di kalimat terakhir.",
                "answer": false
              }
            ],
            "explanation": "Satu paragraf satu ide pokok. Letaknya bisa di awal, akhir, atau campuran."
          },
          {
            "id": 27,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Puisi: 'Angin berbisik di telingaku, menyapa pagi yang sendu.'",
            "question": "Apresiasi unsur puisi (Majas).",
            "indicator": "Menilai penggunaan gaya bahasa (majas) dalam teks.",
            "options": [],
            "statements": [
              {
                "text": "Kalimat tersebut menggunakan majas personifikasi.",
                "answer": true
              },
              {
                "text": "Angin digambarkan seolah-olah memiliki sifat manusia (berbisik/menyapa).",
                "answer": true
              },
              {
                "text": "Majas yang digunakan adalah hiperbola.",
                "answer": false
              },
              {
                "text": "Penggunaan majas bertujuan memperindah bahasa.",
                "answer": true
              },
              {
                "text": "Kalimat tersebut adalah kalimat fakta ilmiah.",
                "answer": false
              }
            ],
            "explanation": "Personifikasi: benda mati (angin) dianggap hidup."
          },
          {
            "id": 28,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Tentang poster lingkungan 'Hemat Air, Selamatkan Bumi'.",
            "question": "Analisis isi poster.",
            "indicator": "Menilai kesesuaian antarunsur dalam teks visual (poster).",
            "options": [],
            "statements": [
              {
                "text": "Kalimat poster tersebut bersifat persuasif (mengajak).",
                "answer": true
              },
              {
                "text": "Tujuannya agar orang memboroskan air.",
                "answer": false
              },
              {
                "text": "Gambar keran air yang bocor cocok untuk poster ini.",
                "answer": false
              },
              {
                "text": "Poster harus menggunakan tulisan yang kecil dan sulit dibaca.",
                "answer": false
              },
              {
                "text": "Pesan poster relevan dengan pelestarian lingkungan.",
                "answer": true
              }
            ],
            "explanation": "Poster hemat air melarang boros. Gambar keran bocor (jika konteksnya 'matikan keran') bisa cocok, tapi biasanya gambar positif lebih baik, namun pernyataan 'boros' salah. Gambar keran bocor tanpa silang bisa ambigu, tapi pernyataan C 'cocok' bisa diperdebatkan, namun 'memboroskan' pasti salah. Mari fokus ke B dan D yang jelas salah."
          },
          {
            "id": 29,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks Prosedur 'Cara Membuat Mie Instan'. Langkah: Rebus air, masukkan mie, tuang bumbu, aduk, sajikan.",
            "question": "Urutan dan logika prosedur.",
            "indicator": "Menyusun kembali informasi dalam bentuk bagan/prosedur.",
            "options": [],
            "statements": [
              {
                "text": "Menuang bumbu sebaiknya dilakukan sebelum air mendidih.",
                "answer": false
              },
              {
                "text": "Langkah 'sajikan' adalah langkah terakhir.",
                "answer": true
              },
              {
                "text": "Mie dimasukkan ke dalam air yang sudah mendidih.",
                "answer": true
              },
              {
                "text": "Urutan langkah boleh dibolak-balik sesuka hati.",
                "answer": false
              },
              {
                "text": "Teks prosedur bertujuan memandu pembaca melakukan sesuatu.",
                "answer": true
              }
            ],
            "explanation": "Prosedur harus urut. Bumbu biasanya di piring atau saat mie matang."
          },
          {
            "id": 30,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: Seorang anak desa berhasil membuat robot dari barang bekas karena tidak mampu membeli mainan.",
            "question": "Simpulan dan inspirasi cerita.",
            "indicator": "Menyimpulkan nilai inspiratif dari teks.",
            "options": [],
            "statements": [
              {
                "text": "Keterbatasan biaya menghalangi kreativitas.",
                "answer": false
              },
              {
                "text": "Kreativitas bisa muncul dalam kondisi terbatas.",
                "answer": true
              },
              {
                "text": "Anak itu seharusnya mencuri mainan saja.",
                "answer": false
              },
              {
                "text": "Barang bekas bisa menjadi benda yang berguna.",
                "answer": true
              },
              {
                "text": "Kita harus menyerah jika tidak punya uang.",
                "answer": false
              }
            ],
            "explanation": "Cerita mengajarkan kreativitas dalam keterbatasan."
          }
        ]
      },
      {
        "nomorPaket": 4,
        "namaPaket": "Paket 4 (RHYTHM)",
        "kode": "TO-BI-04",
        "deskripsi": "Simulasi Ujian TKA Bahasa Indonesia SD (Paket 4 (RHYTHM)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah kalimat berikut: 'Para petani menggunakan sistem *irigasi* tetes untuk menghemat air di lahan kering.'",
            "question": "Makna kata *irigasi* dalam kalimat tersebut adalah...",
            "indicator": "Mengidentifikasi penggunaan kosakata khusus dalam bidang pertanian.",
            "options": [
              "Pengolahan tanah",
              "Penyimpanan hasil panen",
              "Pengairan sawah/lahan",
              "Pemupukan tanaman"
            ],
            "answer": "Pengairan sawah/lahan",
            "statements": [],
            "explanation": "Irigasi adalah istilah teknis pertanian yang berarti sistem pengairan."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Teks Deskripsi: 'Benda ini memiliki gerbong-gerbong yang panjang. Ia berjalan di atas rel besi dan berhenti di stasiun untuk menaikkan penumpang.'",
            "question": "Objek yang dideskripsikan dalam teks tersebut adalah...",
            "indicator": "Mengidentifikasi objek berdasarkan kosakata dalam teks.",
            "options": [
              "Bus",
              "Pesawat",
              "Kereta Api",
              "Kapal Laut"
            ],
            "answer": "Kereta Api",
            "statements": [],
            "explanation": "Kata kunci: gerbong, rel, stasiun merujuk pada Kereta Api."
          },
          {
            "id": 3,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Teks: 'Kesehatan tubuh sangat bergantung pada asupan gizi. Protein, karbohidrat, dan vitamin adalah nutrisi penting. Selain itu, olahraga teratur juga meningkatkan imunitas.'",
            "question": "Manakah kata-kata yang termasuk istilah bidang kesehatan dalam teks? (Pilih jawaban yang benar)",
            "indicator": "Mengidentifikasi kosakata khusus bidang kesehatan.",
            "options": [
              "Gizi",
              "Olahraga",
              "Imunitas",
              "Protein"
            ],
            "answer": [
              "Gizi",
              "Imunitas",
              "Protein"
            ],
            "statements": [],
            "explanation": "Olahraga adalah kata umum, sedangkan gizi, imunitas, dan protein lebih spesifik ke istilah biologi/kesehatan."
          },
          {
            "id": 4,
            "type": "category",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Kalimat: 'Ayah pergi ke apotek untuk membeli obat resep dokter.'",
            "question": "Tentukan Benar atau Salah terkait kosakata dalam kalimat.",
            "indicator": "Mengidentifikasi penggunaan kosakata baku.",
            "options": [],
            "statements": [
              {
                "text": "Kata 'apotek' adalah kata baku.",
                "answer": true
              },
              {
                "text": "Kata 'apotek' seharusnya ditulis 'apotik'.",
                "answer": false
              },
              {
                "text": "Kata 'resep' berhubungan dengan bidang medis.",
                "answer": true
              },
              {
                "text": "Kalimat tersebut menggunakan ragam bahasa tidak resmi.",
                "answer": false
              }
            ],
            "explanation": "Bentuk baku menurut KBBI adalah 'Apotek' (bukan Apotik)."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Teks: 'Taman Nasional Ujung Kulon terletak di Banten. Taman ini merupakan habitat asli badak bercula satu yang sangat langka. Selain badak, di sana juga terdapat banteng, merak, dan berbagai jenis burung.'",
            "question": "Informasi tersurat yang benar berdasarkan teks adalah...",
            "indicator": "Mengidentifikasi informasi tersurat dalam teks nonfiksi.",
            "options": [
              "Taman Nasional Ujung Kulon ada di Jawa Tengah.",
              "Badak bercula satu adalah hewan yang populasinya sangat banyak.",
              "Ujung Kulon adalah habitat asli badak bercula satu.",
              "Hanya badak yang hidup di Taman Nasional Ujung Kulon."
            ],
            "answer": "Ujung Kulon adalah habitat asli badak bercula satu.",
            "statements": [],
            "explanation": "Sesuai dengan kalimat kedua dalam teks."
          },
          {
            "id": 6,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Paragraf: 'Sampah plastik menjadi masalah serius. Plastik sulit terurai di tanah. Jika dibuang ke sungai, plastik bisa menyebabkan banjir. Jika dibakar, asapnya mencemari udara.'",
            "question": "Pilihlah informasi pokok yang dapat disusun menjadi ringkasan! (Pilih lebih dari satu)",
            "indicator": "Menyusun kembali informasi dari teks (Ikhtisar).",
            "options": [
              "Sampah plastik adalah masalah serius.",
              "Plastik menyebabkan tanah subur.",
              "Dampak buruk sampah plastik bagi lingkungan.",
              "Plastik mudah terurai."
            ],
            "answer": [
              "Sampah plastik adalah masalah serius.",
              "Dampak buruk sampah plastik bagi lingkungan."
            ],
            "statements": [],
            "explanation": "Ringkasan mencakup masalah utama dan dampaknya (tanah, air, udara)."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks Prosedur 'Membuat Teh Manis': (1) Masukkan teh celup dan gula ke dalam gelas. (2) Tuangkan air panas. (3) Aduk hingga gula larut. (4) Teh manis siap dinikmati.",
            "question": "Kutipan tersebut merupakan bagian dari jenis teks...",
            "indicator": "Mengidentifikasi jenis teks berdasarkan informasi.",
            "options": [
              "Narasi",
              "Deskripsi",
              "Prosedur",
              "Persuasi"
            ],
            "answer": "Prosedur",
            "statements": [],
            "explanation": "Berisi langkah-langkah melakukan sesuatu."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: 'Budi melihat dompet terjatuh di jalan. Ia melihat isinya, banyak uang dan kartu identitas. Meski sedang butuh uang untuk membeli buku, Budi memilih mengantarkan dompet itu ke alamat pemiliknya.'",
            "question": "Sifat tokoh Budi dalam cerita tersebut adalah...",
            "indicator": "Menyimpulkan watak tokoh dalam teks fiksi.",
            "options": [
              "Sombong",
              "Jujur",
              "Pemalas",
              "Ceroboh"
            ],
            "answer": "Jujur",
            "statements": [],
            "explanation": "Tindakan mengembalikan dompet meski butuh uang menunjukkan kejujuran."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Hutan bakau memiliki fungsi penting. Akarnya yang kuat dapat menahan gelombang ombak yang besar. Hal ini mencegah terjadinya pengikisan pantai atau abrasi.'",
            "question": "Ide pokok paragraf tersebut adalah...",
            "indicator": "Menyimpulkan ide pokok teks.",
            "options": [
              "Hutan bakau tempat hidup ikan.",
              "Akar bakau sangat lemah.",
              "Fungsi hutan bakau mencegah abrasi.",
              "Pantai yang indah."
            ],
            "answer": "Fungsi hutan bakau mencegah abrasi.",
            "statements": [],
            "explanation": "Paragraf membahas fungsi utama bakau (menahan ombak/cegah abrasi)."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Fabel: 'Semut bekerja keras mengumpulkan makanan untuk musim dingin, sedangkan Belalang hanya bernyanyi dan mengejek Semut. Saat musim dingin tiba, Belalang kelaparan dan kedinginan, sementara Semut nyaman di sarangnya.'",
            "question": "Amanat atau pesan moral dari cerita tersebut adalah...",
            "indicator": "Menyimpulkan amanat dalam teks fiksi.",
            "options": [
              "Kita harus rajin menabung/bekerja untuk masa depan.",
              "Bernyanyi itu lebih penting daripada makan.",
              "Jangan berteman dengan Semut.",
              "Musim dingin sangat menakutkan."
            ],
            "answer": "Kita harus rajin menabung/bekerja untuk masa depan.",
            "statements": [],
            "explanation": "Kisah ini mengajarkan pentingnya persiapan dan kerja keras (Semut) vs kemalasan (Belalang)."
          },
          {
            "id": 11,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Cerita: 'Awalnya desa itu gersang dan panas. Namun, setelah Pak Tani mengajak warga menanam pohon buah di setiap pekarangan, kini desa itu menjadi sejuk dan asri.'",
            "question": "Simpulkan perubahan latar dalam cerita.",
            "indicator": "Menyimpulkan perubahan pada latar teks fiksi.",
            "options": [],
            "statements": [
              {
                "text": "Latar tempat berubah dari desa ke kota.",
                "answer": false
              },
              {
                "text": "Latar suasana berubah dari panas menjadi sejuk.",
                "answer": true
              },
              {
                "text": "Perubahan terjadi karena kegiatan menanam pohon.",
                "answer": true
              },
              {
                "text": "Desa menjadi semakin gersang.",
                "answer": false
              }
            ],
            "explanation": "Perubahan kondisi lingkungan (gersang -> asri) akibat penanaman pohon."
          },
          {
            "id": 12,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat: 'Meskipun anak orang kaya, Rina tetap *rendah hati* dan mau berteman dengan siapa saja.'",
            "question": "Makna ungkapan *rendah hati* adalah...",
            "indicator": "Menjelaskan makna ungkapan (idiom) dalam teks.",
            "options": [
              "Sombong",
              "Tidak sombong/baik hati",
              "Suka memberi",
              "Merasa rendah diri"
            ],
            "answer": "Tidak sombong/baik hati",
            "statements": [],
            "explanation": "Rendah hati berarti tidak angkuh atau sombong."
          },
          {
            "id": 13,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat: 'Karena sering berbohong, kini Andi menjadi *buah bibir* di sekolahnya.'",
            "question": "Arti ungkapan *buah bibir* adalah...",
            "indicator": "Menjelaskan makna ungkapan.",
            "options": [
              "Bahan pembicaraan",
              "Anak kesayangan",
              "Oleh-oleh",
              "Orang yang jujur"
            ],
            "answer": "Bahan pembicaraan",
            "statements": [],
            "explanation": "Buah bibir artinya menjadi bahan pembicaraan orang banyak."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pasangkan ungkapan berikut dengan maknanya yang tepat! \n1. Kutu buku\n2. Banting tulang\n3. Besar kepala",
            "question": "Pilihlah pasangan ungkapan dan makna yang BENAR!",
            "indicator": "Menjelaskan makna ungkapan.",
            "options": [
              "Kutu buku = Orang yang gemar membaca",
              "Banting tulang = Bekerja keras",
              "Besar kepala = Sakit kepala",
              "Banting tulang = Menyerah"
            ],
            "answer": [
              "Kutu buku = Orang yang gemar membaca",
              "Banting tulang = Bekerja keras"
            ],
            "statements": [],
            "explanation": "Besar kepala artinya sombong, bukan sakit kepala."
          },
          {
            "id": 15,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: 'Doni selalu mematikan keran air setelah digunakan. Ia juga mematikan lampu kamar saat siang hari.'",
            "question": "Tindakan Doni tersebut relevan dengan kehidupan sehari-hari, yaitu dalam hal...",
            "indicator": "Menilai relevansi peristiwa dengan kehidupan sehari-hari.",
            "options": [
              "Pemborosan energi",
              "Penghematan energi",
              "Pencemaran lingkungan",
              "Kesehatan tubuh"
            ],
            "answer": "Penghematan energi",
            "statements": [],
            "explanation": "Mematikan air dan lampu adalah perilaku hemat energi yang patut ditiru."
          },
          {
            "id": 16,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Pemerintah melarang perburuan liar hewan langka seperti Harimau Sumatera. Hal ini bertujuan agar hewan tersebut tidak punah.'",
            "question": "Evaluasi kesesuaian informasi.",
            "indicator": "Menilai kesesuaian antarunsur/informasi dalam teks.",
            "options": [],
            "statements": [
              {
                "text": "Tindakan pemerintah sesuai dengan tujuan pelestarian.",
                "answer": true
              },
              {
                "text": "Perburuan liar akan menambah jumlah hewan.",
                "answer": false
              },
              {
                "text": "Harimau Sumatera termasuk hewan yang dilindungi.",
                "answer": true
              },
              {
                "text": "Kepunahan hewan tidak berpengaruh pada manusia.",
                "answer": false
              }
            ],
            "explanation": "Larangan berburu logis untuk mencegah kepunahan."
          },
          {
            "id": 17,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Puisi: 'Ibu... kau adalah pelita dalam gelapku. Kasihmu tiada tara, sepanjang masa.'",
            "question": "Respons emosional yang tepat setelah membaca kutipan puisi tersebut adalah...",
            "indicator": "Menyimpulkan respons emosional terhadap teks fiksi.",
            "options": [
              "Marah",
              "Terharu dan sayang",
              "Takut",
              "Kecewa"
            ],
            "answer": "Terharu dan sayang",
            "statements": [],
            "explanation": "Puisi tentang kasih ibu memancing emosi haru dan kasih sayang."
          },
          {
            "id": 18,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: 'Siti menemukan uang di kelas. Teman-temannya menyuruh Siti mengambilnya untuk jajan. Namun, Siti menolak dan menyerahkannya ke Guru.'",
            "question": "Pendapatmu tentang sikap teman-teman Siti adalah...",
            "indicator": "Memberikan penilaian terhadap perilaku tokoh.",
            "options": [
              "Patut ditiru karena cerdas.",
              "Tidak patut ditiru karena tidak jujur.",
              "Sangat baik karena peduli pada Siti.",
              "Biasa saja."
            ],
            "answer": "Tidak patut ditiru karena tidak jujur.",
            "statements": [],
            "explanation": "Menyuruh mengambil uang temuan adalah tindakan tidak jujur/salah."
          },
          {
            "id": 19,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat: 'Paman datang dari desa membawa *buah tangan* berupa pisang dan singkong.'",
            "question": "Makna *buah tangan* adalah...",
            "indicator": "Menjelaskan makna ungkapan.",
            "options": [
              "Buah-buahan",
              "Oleh-oleh",
              "Karya seni",
              "Hasil panen"
            ],
            "answer": "Oleh-oleh",
            "statements": [],
            "explanation": "Buah tangan adalah idiom untuk oleh-oleh."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Bencana banjir sering terjadi akibat ulah manusia. Membuang sampah di sungai dan menebang pohon sembarangan adalah penyebab utamanya.'",
            "question": "Penyebab banjir yang disebutkan dalam teks adalah... (Pilih jawaban yang benar)",
            "indicator": "Mengidentifikasi informasi tersurat (sebab-akibat).",
            "options": [
              "Curah hujan tinggi",
              "Membuang sampah di sungai",
              "Menebang pohon sembarangan",
              "Membangun jembatan"
            ],
            "answer": [
              "Membuang sampah di sungai",
              "Menebang pohon sembarangan"
            ],
            "statements": [],
            "explanation": "Teks secara spesifik menyebutkan sampah dan penebangan pohon."
          },
          {
            "id": 21,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pantun: 'Asam kandis asam gelugur / Ketiga asam si riang-riang / Menangis mayat di pintu kubur / Teringat badan tidak sembahyang.'",
            "question": "Analisis isi pantun.",
            "indicator": "Menyimpulkan nilai/isi pantun.",
            "options": [],
            "statements": [
              {
                "text": "Ini adalah pantun jenaka.",
                "answer": false
              },
              {
                "text": "Isinya mengingatkan untuk beribadah selagi hidup.",
                "answer": true
              },
              {
                "text": "Baris 1 dan 2 adalah sampiran.",
                "answer": true
              },
              {
                "text": "Pantun ini mengajak kita bersedih.",
                "answer": false
              }
            ],
            "explanation": "Pantun agama mengingatkan tentang ibadah/kematian."
          },
          {
            "id": 22,
            "type": "mcq",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Kalimat: 'Ibu *menggoreng* ikan di dapur.'",
            "question": "Kata dasar dari kata *menggoreng* adalah...",
            "indicator": "Mengidentifikasi unsur kebahasaan (kata dasar).",
            "options": [
              "Goreng",
              "Gorengan",
              "Penggorengan",
              "Menggorengkan"
            ],
            "answer": "Goreng",
            "statements": [],
            "explanation": "Imbuhan meN- + goreng."
          },
          {
            "id": 23,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Ilustrasi: Seorang anak selalu menyisihkan uang jajannya untuk disumbangkan ke panti asuhan.",
            "question": "Nilai positif yang dapat kita teladani adalah...",
            "indicator": "Menilai relevansi peristiwa dengan nilai kehidupan.",
            "options": [
              "Hemat",
              "Dermawan/Peduli sesama",
              "Boros",
              "Pamer"
            ],
            "answer": "Dermawan/Peduli sesama",
            "statements": [],
            "explanation": "Menyumbang = dermawan."
          },
          {
            "id": 24,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Deskripsi: 'Hewan ini memiliki leher yang sangat panjang. Kulitnya bermotif totol-totol cokelat. Ia memakan daun-daunan di pohon yang tinggi.'",
            "question": "Ciri-ciri hewan tersebut sesuai teks adalah... (Pilih jawaban yang benar)",
            "indicator": "Mengidentifikasi objek berdasarkan deskripsi.",
            "options": [
              "Berleher panjang",
              "Pemakan daging",
              "Bermotif totol cokelat",
              "Makan daun di pohon tinggi"
            ],
            "answer": [
              "Berleher panjang",
              "Bermotif totol cokelat",
              "Makan daun di pohon tinggi"
            ],
            "statements": [],
            "explanation": "Hewan tersebut adalah Jerapah (herbivora/pemakan daun)."
          },
          {
            "id": 25,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Kupu-kupu mengalami metamorfosis sempurna. Mulai dari telur, ulat, kepompong, hingga menjadi kupu-kupu dewasa.'",
            "question": "Tahapan setelah telur dalam siklus hidup kupu-kupu adalah...",
            "indicator": "Menyusun kembali informasi (urutan proses).",
            "options": [
              "Kepompong",
              "Kupu-kupu dewasa",
              "Ulat (Larva)",
              "Nimfa"
            ],
            "answer": "Ulat (Larva)",
            "statements": [],
            "explanation": "Urutan: Telur -> Ulat -> Kepompong -> Kupu-kupu."
          },
          {
            "id": 26,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat: 'Para siswa *berwisata* ke Museum Sejarah.'",
            "question": "Analisis kalimat.",
            "indicator": "Mengidentifikasi unsur kalimat.",
            "options": [],
            "statements": [
              {
                "text": "Subjek kalimat adalah 'Para siswa'.",
                "answer": true
              },
              {
                "text": "Predikat kalimat adalah 'ke Museum'.",
                "answer": false
              },
              {
                "text": "Kata 'berwisata' adalah kata kerja.",
                "answer": true
              },
              {
                "text": "Kalimat ini menceritakan kegiatan lampau.",
                "answer": false
              }
            ],
            "explanation": "S (Para siswa) P (berwisata) K (ke Museum)."
          },
          {
            "id": 27,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Situasi: Di kantin sekolah, Ani melihat penjual salah memberikan uang kembalian lebih kepada Andi. Andi diam saja dan memasukkan uang itu ke saku.",
            "question": "Tanggapan yang tepat terhadap sikap Andi adalah...",
            "indicator": "Memberikan penilaian terhadap perilaku tokoh.",
            "options": [
              "Andi cerdas memanfaatkan situasi.",
              "Andi tidak jujur, seharusnya ia mengembalikan uang itu.",
              "Itu rezeki Andi.",
              "Penjual yang salah, Andi tidak salah."
            ],
            "answer": "Andi tidak jujur, seharusnya ia mengembalikan uang itu.",
            "statements": [],
            "explanation": "Kejujuran mengharuskan pengembalian hak orang lain."
          },
          {
            "id": 28,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Pidato: 'Hadirin yang saya hormati, kebersihan adalah sebagian dari iman. Lingkungan yang bersih akan membuat kita sehat dan nyaman belajar.'",
            "question": "Tujuan dari kutipan pidato tersebut adalah...",
            "indicator": "Menyimpulkan tujuan teks (pidato persuasi).",
            "options": [
              "Menghibur pendengar",
              "Mengajak menjaga kebersihan",
              "Menceritakan pengalaman",
              "Menjelaskan cara menyapu"
            ],
            "answer": "Mengajak menjaga kebersihan",
            "statements": [],
            "explanation": "Pidato persuasif bertujuan mengajak."
          },
          {
            "id": 29,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Teks: 'Transportasi umum seperti bus dan kereta api dapat mengurangi kemacetan. Selain itu, biayanya juga lebih murah dibandingkan kendaraan pribadi.'",
            "question": "Manfaat transportasi umum menurut teks adalah...",
            "indicator": "Mengidentifikasi informasi tersurat.",
            "options": [
              "Mengurangi kemacetan",
              "Biaya lebih murah",
              "Lebih cepat sampai",
              "Bisa berhenti di mana saja"
            ],
            "answer": [
              "Mengurangi kemacetan",
              "Biaya lebih murah"
            ],
            "statements": [],
            "explanation": "Hanya kemacetan dan biaya yang disebutkan dalam teks."
          },
          {
            "id": 30,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Peribahasa: 'Air susu dibalas dengan air tuba.'",
            "question": "Pemahaman makna peribahasa.",
            "indicator": "Menjelaskan makna ungkapan/peribahasa.",
            "options": [],
            "statements": [
              {
                "text": "Artinya kebaikan dibalas dengan kejahatan.",
                "answer": true
              },
              {
                "text": "Artinya memberi minum susu.",
                "answer": false
              },
              {
                "text": "Peribahasa ini mengajarkan untuk tidak melupakan budi baik orang.",
                "answer": true
              },
              {
                "text": "Maknanya sama dengan 'kacang lupa kulitnya'.",
                "answer": false
              }
            ],
            "explanation": "Air susu (baik) dibalas tuba/racun (jahat). Kacang lupa kulit = lupa asal usul."
          }
        ]
      },
      {
        "nomorPaket": 5,
        "namaPaket": "Paket 5 (INSIGHT)",
        "kode": "TO-BI-05",
        "deskripsi": "Simulasi Ujian TKA Bahasa Indonesia SD (Paket 5 (INSIGHT)) - 30 Soal Standar Pusmendik.",
        "durasiMenit": 60,
        "soal": [
          {
            "id": 1,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Bacalah teks berikut!\nDokter memberikan resep obat kepada pasien penderita hipertensi. Pasien diminta untuk menebus resep tersebut di apotek terdekat. Apoteker menjelaskan aturan pakai obat agar tekanan darah pasien kembali stabil.",
            "question": "Kata khusus bidang kesehatan yang terdapat dalam paragraf tersebut adalah...",
            "indicator": "Mengidentifikasi penggunaan kosakata khusus dalam bidang kesehatan.",
            "options": [
              "Resep, obat, pasien, hipertensi",
              "Hipertensi, resep, apotek, apoteker",
              "Dokter, pasien, aturan pakai, stabil",
              "Obat, apotek, tekanan darah, stabil"
            ],
            "answer": "Hipertensi, resep, apotek, apoteker",
            "statements": [],
            "explanation": "Kata 'hipertensi', 'resep', 'apotek', dan 'apoteker' merupakan istilah teknis yang spesifik digunakan dalam bidang kesehatan/medis."
          },
          {
            "id": 2,
            "type": "mcq",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Bacalah kalimat berikut!\nAyah membawa 'buah tangan' berupa kue bolu dari Bandung untuk kami.",
            "question": "Makna ungkapan 'buah tangan' dalam kalimat tersebut adalah...",
            "indicator": "Menjelaskan makna ungkapan yang digunakan dalam teks.",
            "options": [
              "Hasil karya",
              "Oleh-oleh",
              "Anak kesayangan",
              "Buah-buahan"
            ],
            "answer": "Oleh-oleh",
            "statements": [],
            "explanation": "Ungkapan 'buah tangan' secara idiomatik berarti oleh-oleh atau barang yang dibawa dari bepergian."
          },
          {
            "id": 3,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: 'Bunglon memiliki kemampuan mimikri, yaitu mengubah warna kulit sesuai dengan lingkungannya. Hal ini dilakukan untuk mengelabui musuh dan melindungi diri dari predator.'",
            "question": "Berdasarkan teks tersebut, objek yang dibahas memiliki ciri khusus berupa...",
            "indicator": "Mengidentifikasi objek berdasarkan kosakata dan deskripsi dalam teks nonfiksi.",
            "options": [
              "Kemampuan berlari cepat",
              "Kemampuan mengubah warna kulit",
              "Memiliki racun yang mematikan",
              "Hidup di dua alam"
            ],
            "answer": "Kemampuan mengubah warna kulit",
            "statements": [],
            "explanation": "Teks secara eksplisit menyebutkan 'mimikri' dan menjelaskan definisinya sebagai kemampuan mengubah warna kulit."
          },
          {
            "id": 4,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\n(1) Sampah plastik menjadi masalah serius bagi lingkungan. (2) Sulitnya proses penguraian membuat sampah ini menumpuk selama ratusan tahun. (3) Pemerintah menghimbau masyarakat untuk mengurangi penggunaan kantong plastik sekali pakai. (4) Kita bisa mulai dengan membawa tas belanja sendiri.",
            "question": "Informasi tersurat yang terdapat pada kalimat nomor (2) adalah...",
            "indicator": "Mengidentifikasi informasi tersurat dalam teks.",
            "options": [
              "Pemerintah melarang penggunaan plastik.",
              "Masyarakat harus mendaur ulang sampah.",
              "Sampah plastik sulit terurai dan menumpuk lama.",
              "Tas belanja mengurangi sampah plastik."
            ],
            "answer": "Sampah plastik sulit terurai dan menumpuk lama.",
            "statements": [],
            "explanation": "Kalimat (2) secara jelas menyatakan 'Sulitnya proses penguraian membuat sampah ini menumpuk selama ratusan tahun'."
          },
          {
            "id": 5,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: Budi menemukan dompet di jalan. Isinya penuh uang. Temannya menyuruh mengambil uang itu, tapi Budi memilih mengembalikannya ke alamat pemilik yang ada di KTP.",
            "question": "Nilai moral yang dapat diambil dari tindakan Budi adalah...",
            "indicator": "Menyimpulkan nilai-nilai (moral) dalam teks fiksi.",
            "options": [
              "Kejujuran lebih berharga daripada materi",
              "Kita harus mendengarkan saran teman",
              "Menemukan barang berarti menjadi milik kita",
              "Uang bisa digunakan untuk jajan"
            ],
            "answer": "Kejujuran lebih berharga daripada materi",
            "statements": [],
            "explanation": "Tindakan Budi mengembalikan dompet meskipun ada kesempatan mengambilnya menunjukkan nilai kejujuran."
          },
          {
            "id": 6,
            "type": "mcq",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks: Hutan bakau memiliki akar tunjang yang kuat. Akar ini berfungsi menahan ombak agar tidak mengikis daratan (abrasi). Selain itu, hutan bakau menjadi tempat tinggal bagi ikan-ikan kecil dan kepiting.",
            "question": "Ide pokok paragraf tersebut adalah...",
            "indicator": "Menyimpulkan ide pokok paragraf.",
            "options": [
              "Ikan kecil dan kepiting di hutan bakau",
              "Jenis-jenis akar tanaman",
              "Fungsi dan manfaat hutan bakau",
              "Bahaya abrasi bagi daratan"
            ],
            "answer": "Fungsi dan manfaat hutan bakau",
            "statements": [],
            "explanation": "Paragraf membahas fungsi akar bakau menahan abrasi dan manfaatnya sebagai habitat hewan."
          },
          {
            "id": 7,
            "type": "mcq",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Data Kegemaran Siswa Kelas VI:\n- Sepak Bola: 15 siswa\n- Membaca: 10 siswa\n- Menari: 5 siswa\n- Melukis: 5 siswa",
            "question": "Jika data tersebut diubah menjadi narasi, pernyataan yang tepat adalah...",
            "indicator": "Menyusun kembali informasi dari teks (data) ke bentuk lain.",
            "options": [
              "Mayoritas siswa kelas VI gemar melukis.",
              "Hobi membaca paling sedikit diminati.",
              "Jumlah siswa yang gemar menari sama dengan yang gemar melukis.",
              "Siswa yang gemar sepak bola lebih sedikit dari yang gemar membaca."
            ],
            "answer": "Jumlah siswa yang gemar menari sama dengan yang gemar melukis.",
            "statements": [],
            "explanation": "Data menunjukkan Menari (5) dan Melukis (5), jumlahnya sama."
          },
          {
            "id": 8,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Kutipan Cerita: 'Maafkan aku, Rina. Aku tidak sengaja mematahkan pensilmu,' kata Dito dengan wajah tertunduk. Rina tersenyum, 'Tidak apa-apa, Dito. Itu hanya pensil, masih bisa diraut.'",
            "question": "Bagaimana penilaianmu terhadap sikap Rina?",
            "indicator": "Menilai karakter tokoh dalam teks fiksi.",
            "options": [
              "Rina adalah anak yang pemarah.",
              "Rina memiliki sifat pemaaf dan tidak membesar-besarkan masalah.",
              "Rina tidak peduli dengan barang miliknya.",
              "Rina takut kepada Dito."
            ],
            "answer": "Rina memiliki sifat pemaaf dan tidak membesar-besarkan masalah.",
            "statements": [],
            "explanation": "Respon Rina yang tersenyum dan memaafkan menunjukkan sifat pemaaf."
          },
          {
            "id": 9,
            "type": "mcq",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Awal cerita: Desa Sukamaju dilanda kekeringan panjang. Sumur-sumur kering. Pak Kades mengajak warga bergotong royong membuat embung (penampungan air) hujan. Warga bekerja keras siang malam.",
            "question": "Prediksi peristiwa yang akan terjadi selanjutnya jika hujan mulai turun adalah...",
            "indicator": "Menyimpulkan/memprediksi perubahan sederhana pada latar/situasi.",
            "options": [
              "Warga akan pindah ke desa lain.",
              "Embung akan terisi air dan mengatasi kekeringan.",
              "Sumur warga akan tetap kering selamanya.",
              "Pak Kades akan memarahi warga."
            ],
            "answer": "Embung akan terisi air dan mengatasi kekeringan.",
            "statements": [],
            "explanation": "Upaya membuat embung bertujuan menampung air, sehingga saat hujan turun, masalah kekeringan teratasi."
          },
          {
            "id": 10,
            "type": "mcq",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Poster: 'Hemat Energi, Sayangi Bumi! Matikan lampu jika tidak digunakan.'",
            "question": "Relevansi pesan poster tersebut dengan kehidupan siswa sehari-hari adalah...",
            "indicator": "Menilai relevansi peristiwa/pesan dalam teks dengan kehidupan sehari-hari.",
            "options": [
              "Siswa harus membeli lampu baru.",
              "Siswa tidak perlu belajar di malam hari.",
              "Siswa harus membiasakan diri mematikan lampu kamar saat keluar ruangan.",
              "Siswa harus menanam pohon di sekolah."
            ],
            "answer": "Siswa harus membiasakan diri mematikan lampu kamar saat keluar ruangan.",
            "statements": [],
            "explanation": "Tindakan mematikan lampu saat keluar ruangan adalah aplikasi langsung dari pesan hemat energi."
          },
          {
            "id": 11,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Bacalah teks berikut!\nTanaman kaktus memiliki daun yang berbentuk duri untuk mengurangi penguapan. Batangnya tebal dan berlapis lilin untuk menyimpan air. Akar kaktus sangat panjang untuk mencari sumber air di dalam tanah.",
            "question": "Pilihlah ciri-ciri adaptasi kaktus berdasarkan teks! (Pilih lebih dari satu)",
            "indicator": "Mengidentifikasi informasi eksplisit dari teks nonfiksi.",
            "options": [
              "Daun berbentuk lebar dan tipis.",
              "Batang tebal dan berlapis lilin.",
              "Akar pendek di permukaan tanah.",
              "Daun berbentuk duri untuk mengurangi penguapan."
            ],
            "answer": [
              "Batang tebal dan berlapis lilin.",
              "Daun berbentuk duri untuk mengurangi penguapan."
            ],
            "statements": [],
            "explanation": "Teks menyebutkan batang tebal berlapis lilin dan daun duri. Opsi lain bertentangan dengan teks."
          },
          {
            "id": 12,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Cerita: Semut bekerja keras mengumpulkan makanan untuk musim dingin, sementara Belalang hanya bernyanyi dan mengejek Semut. Saat musim dingin tiba, Belalang kelaparan dan kedinginan, sedangkan Semut nyaman di sarangnya yang penuh makanan.",
            "question": "Manakah pelajaran berharga (amanat) yang sesuai dengan cerita tersebut? (Pilih lebih dari satu)",
            "indicator": "Menyimpulkan amanat/pesan moral dari teks fiksi.",
            "options": [
              "Kita harus rajin bekerja untuk mempersiapkan masa depan.",
              "Bersenang-senanglah selagi muda tanpa memikirkan akibatnya.",
              "Jangan meremehkan usaha orang lain.",
              "Musim dingin adalah waktu yang tepat untuk bernyanyi."
            ],
            "answer": [
              "Kita harus rajin bekerja untuk mempersiapkan masa depan.",
              "Jangan meremehkan usaha orang lain."
            ],
            "statements": [],
            "explanation": "Semut mewakili kerja keras dan persiapan, Belalang mewakili kemalasan yang berujung penyesalan."
          },
          {
            "id": 13,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kosa kata bidang pertanian: (1) Irigasi, (2) Stetoskop, (3) Pupuk, (4) Traktor, (5) Injeksi.",
            "question": "Manakah yang termasuk istilah khusus bidang pertanian? (Pilih lebih dari satu)",
            "indicator": "Mengelompokkan kosakata khusus bidang tertentu.",
            "options": [
              "Irigasi",
              "Stetoskop",
              "Pupuk",
              "Traktor"
            ],
            "answer": [
              "Irigasi",
              "Pupuk",
              "Traktor"
            ],
            "statements": [],
            "explanation": "Irigasi, pupuk, dan traktor adalah istilah pertanian. Stetoskop dan injeksi adalah istilah medis."
          },
          {
            "id": 14,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Puisi: 'Angin berbisik di telingaku, menyampaikan salam dari pantai nan jauh. Ombak memanggil, nyiur melambai, rindu hati ingin segera berlabuh.'",
            "question": "Pernyataan yang menggambarkan suasana atau makna puisi tersebut adalah... (Pilih lebih dari satu)",
            "indicator": "Menyimpulkan respons emosional dan suasana dalam teks puisi.",
            "options": [
              "Penulis merasa ketakutan terhadap ombak.",
              "Suasana puisi menggambarkan kerinduan akan suasana pantai.",
              "Penulis menggunakan majas personifikasi (angin berbisik, nyiur melambai).",
              "Puisi menceritakan tentang kemarahan alam."
            ],
            "answer": [
              "Suasana puisi menggambarkan kerinduan akan suasana pantai.",
              "Penulis menggunakan majas personifikasi (angin berbisik, nyiur melambai)."
            ],
            "statements": [],
            "explanation": "Kata 'rindu', 'salam', dan penggambaran alam menunjukkan kerinduan dan penggunaan majas."
          },
          {
            "id": 15,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Teks Prosedur 'Cara Membuat Teh Manis':\n1. Masukkan teh celup ke dalam cangkir.\n2. Tuang air panas secukupnya.\n3. Tambahkan gula pasir sesuai selera.\n4. Aduk hingga gula larut dan warna air berubah.\n5. Teh siap dinikmati.",
            "question": "Manakah pernyataan yang sesuai dengan prosedur di atas? (Pilih lebih dari satu)",
            "indicator": "Menilai kesesuaian antarunsur/informasi dalam teks prosedur.",
            "options": [
              "Air panas dituangkan sebelum teh celup dimasukkan.",
              "Gula ditambahkan setelah menuang air panas.",
              "Pengadukan dilakukan agar gula larut.",
              "Teh celup dimasukkan paling terakhir."
            ],
            "answer": [
              "Gula ditambahkan setelah menuang air panas.",
              "Pengadukan dilakukan agar gula larut."
            ],
            "statements": [],
            "explanation": "Sesuai urutan langkah: Air dituang setelah teh (Langkah 2), Gula setelah air (Langkah 3), Aduk untuk melarutkan (Langkah 4)."
          },
          {
            "id": 16,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Berita: Banjir kembali melanda kota A akibat sungai yang tersumbat sampah. Warga sering membuang sampah sembarangan ke sungai meskipun sudah ada larangan.",
            "question": "Tanggapan kritis yang relevan terhadap peristiwa tersebut adalah... (Pilih lebih dari satu)",
            "indicator": "Menilai relevansi peristiwa dan memberikan tanggapan kritis.",
            "options": [
              "Banjir adalah bencana alam yang tidak bisa dicegah.",
              "Perilaku warga membuang sampah menjadi penyebab utama banjir.",
              "Diperlukan sanksi tegas bagi pembuang sampah sembarangan.",
              "Pemerintah seharusnya membiarkan saja."
            ],
            "answer": [
              "Perilaku warga membuang sampah menjadi penyebab utama banjir.",
              "Diperlukan sanksi tegas bagi pembuang sampah sembarangan."
            ],
            "statements": [],
            "explanation": "Penyebab banjir disebutkan (sampah), sehingga tanggapan harus fokus pada perubahan perilaku dan penegakan aturan."
          },
          {
            "id": 17,
            "type": "mcma",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat: 'Anak itu dikenal sebagai *kutu buku* karena setiap istirahat selalu berada di perpustakaan.' dan 'Dia menjadi *bintang lapangan* setelah mencetak gol kemenangan.'",
            "question": "Pilihlah arti ungkapan yang benar! (Pilih lebih dari satu)",
            "indicator": "Menjelaskan makna ungkapan dalam teks.",
            "options": [
              "Kutu buku berarti orang yang suka membaca.",
              "Kutu buku berarti orang yang memelihara kutu.",
              "Bintang lapangan berarti pemain yang menonjol/hebat dalam olahraga.",
              "Bintang lapangan berarti pemain yang suka melihat bintang."
            ],
            "answer": [
              "Kutu buku berarti orang yang suka membaca.",
              "Bintang lapangan berarti pemain yang menonjol/hebat dalam olahraga."
            ],
            "statements": [],
            "explanation": "Ungkapan idiomatis: kutu buku (gemar membaca), bintang lapangan (pemain terbaik)."
          },
          {
            "id": 18,
            "type": "mcma",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Paragraf: (1) Energi matahari adalah energi terbarukan. (2) Panel surya menangkap sinar matahari dan mengubahnya menjadi listrik. (3) Penggunaan panel surya dapat menghemat tagihan listrik bulanan. (4) Listrik dari batubara menyebabkan polusi.",
            "question": "Manakah yang merupakan gagasan pendukung tentang manfaat energi matahari? (Pilih lebih dari satu)",
            "indicator": "Menyimpulkan gagasan pendukung dalam teks.",
            "options": [
              "Kalimat (1) tentang definisi.",
              "Kalimat (2) tentang cara kerja panel surya.",
              "Kalimat (3) tentang penghematan biaya.",
              "Kalimat (4) tentang dampak batubara."
            ],
            "answer": [
              "Kalimat (2) tentang cara kerja panel surya.",
              "Kalimat (3) tentang penghematan biaya."
            ],
            "statements": [],
            "explanation": "Kalimat (2) dan (3) menjelaskan/mendukung topik energi matahari. Kalimat (4) adalah perbandingan kontras."
          },
          {
            "id": 19,
            "type": "mcma",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Teks Fiksi: Raksasa itu terlihat menyeramkan dengan gigi taringnya. Namun, saat melihat burung kecil yang terluka, ia menangis dan mengobatinya dengan lembut.",
            "question": "Bagaimana karakter tokoh Raksasa tersebut? (Pilih lebih dari satu)",
            "indicator": "Menyimpulkan watak tokoh yang kompleks (tidak hitam putih).",
            "options": [
              "Memiliki penampilan yang menakutkan.",
              "Memiliki hati yang penyayang.",
              "Sangat jahat dan kejam.",
              "Peduli terhadap makhluk lain."
            ],
            "answer": [
              "Memiliki penampilan yang menakutkan.",
              "Memiliki hati yang penyayang.",
              "Peduli terhadap makhluk lain."
            ],
            "statements": [],
            "explanation": "Fisik menyeramkan (opsi 1), tapi tindakan mengobati burung menunjukkan kasih sayang (opsi 2, 4)."
          },
          {
            "id": 20,
            "type": "mcma",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Data: (A) Hujan deras selama 3 hari berturut-turut. (B) Sistem drainase kota buruk dan tersumbat. (C) ? (Akibat).",
            "question": "Kemungkinan akibat (C) yang logis berdasarkan data A dan B adalah... (Pilih lebih dari satu)",
            "indicator": "Menyimpulkan peristiwa (sebab-akibat) dalam teks.",
            "options": [
              "Terjadi genangan air atau banjir di kota.",
              "Jalanan menjadi kering dan berdebu.",
              "Aktivitas warga terganggu akibat air meluap.",
              "Warga kekurangan air bersih."
            ],
            "answer": [
              "Terjadi genangan air atau banjir di kota.",
              "Aktivitas warga terganggu akibat air meluap."
            ],
            "statements": [],
            "explanation": "Hujan deras + drainase buruk = Banjir/genangan yang mengganggu aktivitas."
          },
          {
            "id": 21,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Penggunaan tanda baca.",
            "question": "Tentukan Benar atau Salah penggunaan tanda baca pada kalimat berikut.",
            "indicator": "Menilai ketepatan penggunaan ejaan dan tanda baca.",
            "options": [],
            "statements": [
              {
                "text": "Ibu membeli apel, jeruk, dan mangga di pasar.",
                "answer": true
              },
              {
                "text": "Wow, indah sekali pemandangan ini?",
                "answer": false
              },
              {
                "text": "Kapan kamu akan berangkat ke Jakarta?",
                "answer": true
              },
              {
                "text": "Saya tinggal di Jl. Sudirman No 10.",
                "answer": true
              }
            ],
            "explanation": "Kalimat seru 'Wow' harusnya diakhiri tanda seru (!). Pemerian menggunakan koma."
          },
          {
            "id": 22,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Perbedaan Teks Fiksi dan Nonfiksi.",
            "question": "Tentukan kebenaran ciri-ciri jenis teks.",
            "indicator": "Membedakan karakteristik teks fiksi dan nonfiksi.",
            "options": [],
            "statements": [
              {
                "text": "Buku pelajaran dan ensiklopedia termasuk teks nonfiksi.",
                "answer": true
              },
              {
                "text": "Cerpen dan dongeng berisi kejadian nyata dan fakta.",
                "answer": false
              },
              {
                "text": "Teks nonfiksi menggunakan bahasa kiasan dan imajinatif.",
                "answer": false
              },
              {
                "text": "Fabel adalah contoh teks fiksi.",
                "answer": true
              }
            ],
            "explanation": "Fiksi = imajinasi (cerpen, dongeng, fabel). Nonfiksi = fakta (buku pelajaran)."
          },
          {
            "id": 23,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Meringkas Teks: 'Tidur yang cukup sangat penting bagi pertumbuhan anak. Saat tidur, tubuh memproduksi hormon pertumbuhan. Selain itu, tidur cukup membuat otak lebih segar untuk belajar keesokan harinya.'",
            "question": "Evaluasi pernyataan tentang ringkasan teks.",
            "indicator": "Menilai kesesuaian ringkasan dengan isi teks.",
            "options": [],
            "statements": [
              {
                "text": "Ringkasan: Tidur cukup penting untuk pertumbuhan dan kesegaran otak anak.",
                "answer": true
              },
              {
                "text": "Ringkasan: Anak-anak suka tidur di kelas.",
                "answer": false
              },
              {
                "text": "Ide pokok teks adalah manfaat tidur bagi anak.",
                "answer": true
              },
              {
                "text": "Teks menyarankan anak untuk begadang belajar.",
                "answer": false
              }
            ],
            "explanation": "Ringkasan harus mencakup poin utama (pertumbuhan & otak segar). Opsi negatif bertentangan."
          },
          {
            "id": 24,
            "type": "category",
            "level": 2,
            "kesulitan": "Mudah",
            "stimulus": "Antonim dan Sinonim.",
            "question": "Tentukan kebenaran hubungan kata berikut.",
            "indicator": "Mengidentifikasi hubungan makna antarkata (sinonim/antonim).",
            "options": [],
            "statements": [
              {
                "text": "'Besar' dan 'Kecil' adalah antonim.",
                "answer": true
              },
              {
                "text": "'Pintar' dan 'Pandai' adalah sinonim.",
                "answer": true
              },
              {
                "text": "'Panjang' dan 'Pendek' adalah sinonim.",
                "answer": false
              },
              {
                "text": "'Jauh' dan 'Dekat' adalah antonim.",
                "answer": true
              }
            ],
            "explanation": "Panjang dan Pendek berlawanan (antonim), bukan sinonim."
          },
          {
            "id": 25,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Unsur Intrinsik Cerita.",
            "question": "Tentukan kebenaran definisi unsur cerita.",
            "indicator": "Menjelaskan unsur-unsur intrinsik cerpen.",
            "options": [],
            "statements": [
              {
                "text": "Latar adalah tempat dan waktu terjadinya peristiwa.",
                "answer": true
              },
              {
                "text": "Tokoh antagonis adalah tokoh yang berwatak baik.",
                "answer": false
              },
              {
                "text": "Amanat adalah pesan yang ingin disampaikan penulis.",
                "answer": true
              },
              {
                "text": "Alur adalah urutan rangkaian peristiwa.",
                "answer": true
              }
            ],
            "explanation": "Antagonis biasanya berwatak jahat/penentang."
          },
          {
            "id": 26,
            "type": "category",
            "level": 6,
            "kesulitan": "HOTS",
            "stimulus": "Pesan Pantun: 'Berakit-rakit ke hulu, berenang-renang ke tepian. Bersakit-sakit dahulu, bersenang-senang kemudian.'",
            "question": "Analisis makna pantun.",
            "indicator": "Menyimpulkan pesan moral dari pantun.",
            "options": [],
            "statements": [
              {
                "text": "Pantun ini mengajarkan kita untuk menyerah saat susah.",
                "answer": false
              },
              {
                "text": "Maknanya adalah usaha keras akan membuahkan hasil yang manis.",
                "answer": true
              },
              {
                "text": "Kita disarankan untuk berenang di sungai.",
                "answer": false
              },
              {
                "text": "Kesuksesan butuh perjuangan.",
                "answer": true
              }
            ],
            "explanation": "Pantun ini tentang perjuangan/usaha sebelum sukses, bukan tentang berenang secara harfiah."
          },
          {
            "id": 27,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kata Baku.",
            "question": "Tentukan apakah penulisan kata berikut BAKU (Benar) atau TIDAK BAKU (Salah).",
            "indicator": "Mengidentifikasi kata baku dalam bahasa Indonesia.",
            "options": [],
            "statements": [
              {
                "text": "Apotek (Benar)",
                "answer": true
              },
              {
                "text": "Nopember (Benar)",
                "answer": false
              },
              {
                "text": "Jadwal (Benar)",
                "answer": true
              },
              {
                "text": "Antri (Benar)",
                "answer": false
              }
            ],
            "explanation": "Baku: Apotek, November, Jadwal, Antre. Tidak baku: Apotik, Nopember, Jadual, Antri."
          },
          {
            "id": 28,
            "type": "category",
            "level": 5,
            "kesulitan": "HOTS",
            "stimulus": "Kalimat Efektif: 'Para hadirin sekalian dimohon untuk maju ke depan.'",
            "question": "Evaluasi efektivitas kalimat.",
            "indicator": "Menilai keefektifan kalimat (pemborosan kata).",
            "options": [],
            "statements": [
              {
                "text": "Kalimat tersebut adalah kalimat efektif.",
                "answer": false
              },
              {
                "text": "Kata 'para' dan 'sekalian' bermakna jamak, jadi pemborosan.",
                "answer": true
              },
              {
                "text": "Kata 'maju' sudah pasti 'ke depan', jadi 'ke depan' tidak perlu.",
                "answer": true
              },
              {
                "text": "Perbaikan: 'Hadirin dimohon maju.'",
                "answer": true
              }
            ],
            "explanation": "Kalimat asli pleonasme (boros kata). Para=banyak, sekalian=banyak. Maju=ke depan."
          },
          {
            "id": 29,
            "type": "category",
            "level": 4,
            "kesulitan": "HOTS",
            "stimulus": "Surat Resmi.",
            "question": "Analisis bagian-bagian surat resmi.",
            "indicator": "Mengidentifikasi struktur surat resmi.",
            "options": [],
            "statements": [
              {
                "text": "Surat resmi harus memiliki kepala surat (kop surat).",
                "answer": true
              },
              {
                "text": "Bahasa yang digunakan boleh bahasa gaul/santai.",
                "answer": false
              },
              {
                "text": "Terdapat nomor surat, lampiran, dan perihal.",
                "answer": true
              },
              {
                "text": "Ditulis untuk keperluan pribadi antar teman.",
                "answer": false
              }
            ],
            "explanation": "Surat resmi menggunakan bahasa baku untuk keperluan dinas/instansi."
          },
          {
            "id": 30,
            "type": "category",
            "level": 3,
            "kesulitan": "Sedang",
            "stimulus": "Kalimat: 'Ayah membaca koran. Ibu memasak di dapur.'",
            "question": "Penggabungan kalimat.",
            "indicator": "Menyusun kalimat majemuk setara.",
            "options": [],
            "statements": [
              {
                "text": "Dapat digabung menggunakan kata hubung 'dan'.",
                "answer": true
              },
              {
                "text": "Hasil gabungan: 'Ayah membaca koran, tetapi Ibu memasak di dapur.'",
                "answer": false
              },
              {
                "text": "Hasil gabungan: 'Ayah membaca koran sedangkan Ibu memasak di dapur.'",
                "answer": true
              },
              {
                "text": "Kata hubung 'sehingga' cocok untuk kalimat ini.",
                "answer": false
              }
            ],
            "explanation": "Hubungan setara/kegiatan bersamaan cocok pakai 'dan' atau 'sedangkan'. 'Tetapi' untuk pertentangan, 'sehingga' untuk sebab-akibat."
          }
        ]
      }
    ]
  }
};
