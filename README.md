# 🎓 TKA SD (Tes Kemampuan Akademik Sekolah Dasar)

Aplikasi Web Fullstack Monorepo untuk platform latihan Tes Kemampuan Akademik (TKA) siswa Sekolah Dasar. Dibangun dengan arsitektur bersih, modular, dan terpisah antara **Backend (Node.js Express + Cloudflare D1 REST API)** dan **Frontend (React Vite + Tailwind CSS)**.

---

## 📁 Struktur Folder Proyek

```text
TKA-SD/
├── README.md                      # Panduan lengkap instalasi, setup, dan penggunaan
├── .gitignore                     # Mengabaikan node_modules, .env, dan build artifacts
├── backend/                       # Server API Express & Integrasi Cloudflare D1
│   ├── package.json
│   ├── .env.example
│   ├── schema.sql                 # Definisi tabel database users
│   └── src/
│       ├── server.js              # Entry point Express server
│       ├── app.js                 # Setup Express, CORS, middleware, dan routing
│       ├── config/
│       │   ├── env.js             # Validasi dan ekspor variabel lingkungan
│       │   └── db.js              # Helper query parameterized Cloudflare D1 REST API
│       ├── routes/
│       │   └── auth.routes.js     # Endpoint /register, /login, dan /me
│       ├── controllers/
│       │   └── auth.controller.js # Logika bisnis autentikasi dan validasi
│       ├── models/
│       │   └── user.model.js      # Abstraksi query database D1 untuk tabel users
│       ├── middlewares/
│       │   ├── auth.middleware.js # Verifikasi token JWT
│       │   └── error.middleware.js# Penanganan 404 dan error terpusat
│       └── utils/
│           ├── token.js           # Helper generate dan verifikasi JWT
│           └── validator.js       # Validasi format @gmail.com dan panjang password
└── frontend/                      # Client Application React (Vite)
    ├── package.json
    ├── vite.config.js             # Konfigurasi Vite & proxy API backend
    ├── tailwind.config.js         # Konfigurasi tema dan warna Tailwind CSS
    ├── postcss.config.js
    ├── index.html                 # Template HTML & Google Fonts Poppins
    └── src/
        ├── main.jsx               # Entry point React
        ├── App.jsx                # Definisi routing, protected route & public route
        ├── index.css              # Direktif Tailwind CSS & utility animasi
        ├── pages/
        │   ├── Login.jsx          # Halaman Login (route "/")
        │   ├── Register.jsx       # Halaman Pendaftaran (route "/register")
        │   └── Dashboard.jsx      # Halaman Dashboard Siswa (route "/dashboard")
        ├── components/
        │   ├── Navbar.jsx         # Navigasi atas & tombol logout
        │   ├── InputField.jsx     # Input reusable + toggle intip password
        │   ├── Button.jsx         # Tombol dinamis dengan loading spinner
        │   ├── SubjectCard.jsx    # Kartu mata pelajaran (Bahasa Indonesia & Matematika)
        │   ├── ProtectedRoute.jsx # Guard route untuk halaman privat
        │   └── PublicRoute.jsx    # Guard route agar user login tidak kembali ke login/register
        ├── services/
        │   ├── api.js             # Instance Axios dengan interceptor JWT
        │   └── authService.js     # Service API pemanggil endpoint auth
        ├── context/
        │   └── AuthContext.jsx    # State management sesi login & token
        └── utils/
            └── validation.js      # Validasi form di sisi klien
```

---

## 🛠️ Tech Stack

| Layer | Teknologi |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM v6, Tailwind CSS, Axios, Lucide React Icons |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | Cloudflare D1 (Serverless SQL Database) via REST API Endpoint `/query` |
| **Autentikasi**| JSON Web Token (JWT) masa berlaku 1 hari, bcryptjs (hash 10 rounds) |
| **Protokol** | RESTful JSON API, Parameterized SQL queries (`?`) |

---

## ☁️ Panduan Konfigurasi Cloudflare D1

Cloudflare D1 adalah database SQL serverless berbasis SQLite. Backend Express berkomunikasi dengan Cloudflare D1 menggunakan endpoint resmi:
`POST https://api.cloudflare.com/client/v4/accounts/{account_id}/d1/database/{database_id}/query`

### Langkah 1: Buat Database D1 di Cloudflare
1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) dan login ke akun Anda.
2. Pada menu sidebar sebelah kiri, pilih **Workers & Pages** > **D1 SQL Database**.
3. Klik tombol **Create database**.
4. Masukkan nama database (misalnya: `tka-sd-db`), lalu klik **Create**.

### Langkah 2: Jalankan `schema.sql`
1. Setelah database dibuat, klik pada nama database tersebut di dashboard Cloudflare.
2. Buka tab **Console**.
3. Salin isi file `backend/schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. Tempel ke dalam kotak query Console dan klik tombol **Execute**. Tabel `users` kini siap digunakan!

### Langkah 3: Dapatkan Account ID & Database ID
1. **Account ID**: Dapat dilihat di URL dashboard Anda (setelah `dash.cloudflare.com/`) atau di bagian bawah menu **Workers & Pages** (Overview sebelah kanan).
2. **Database ID**: Buka database D1 Anda di menu D1, Anda akan melihat **Database ID** dalam format UUID (contoh: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

### Langkah 4: Buat Cloudflare API Token
1. Klik avatar profil Anda di pojok kanan atas Cloudflare > pilih **My Profile**.
2. Pilih tab **API Tokens** pada sidebar kiri, lalu klik **Create Token**.
3. Pilih template **Create Custom Token** (klik *Get started*).
4. Beri nama token, misal: `TKA-SD-D1-Token`.
5. Di bagian **Permissions**, atur:
   - **Account** -> **D1** -> **Edit**
6. Di bagian **Account Resources**, pilih **Include** -> **All accounts** (atau pilih akun spesifik Anda).
7. Klik **Continue to summary** lalu **Create Token**.
8. **Simpan token yang muncul** (token hanya ditampilkan sekali).

---

## ⚙️ Konfigurasi Environment Variable (`.env`)

Masuk ke folder `backend`, duplikasi file `.env.example` menjadi `.env`:

```bash
cd backend
cp .env.example .env
```

Buka file `backend/.env` dan lengkapi nilainya:
```ini
PORT=5000
CF_ACCOUNT_ID=masukkan_account_id_anda
CF_DATABASE_ID=masukkan_database_id_anda
CF_API_TOKEN=masukkan_api_token_anda
JWT_SECRET=rahasia_super_aman_tka_sd_2026
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Backend (Port 5000)

Buka terminal pertama:
```bash
# Pindah ke folder backend
cd backend

# Pasang dependencies
npm install

# Jalankan server mode pengembangan (dengan nodemon)
npm run dev
```
Server backend akan aktif di `http://localhost:5000`. Anda dapat memeriksa endpoint kesehatan di:
`http://localhost:5000/api/health`

### 2. Menjalankan Frontend (Port 5173)

Buka terminal kedua:
```bash
# Pindah ke folder frontend
cd frontend

# Pasang dependencies
npm install

# Jalankan server pengembangan Vite
npm run dev
```
Buka browser Anda dan akses:
`http://localhost:5173`

---

## 🔄 Alur & Fitur Aplikasi

1. **Rute Awal (`/`)**: Pengguna langsung disambut dengan **Halaman Login**.
2. **Pendaftaran Akun Baru**:
   - Klik link *"Belum punya akun? Daftar di sini"* untuk menuju ke `/register`.
   - Masukkan akun Gmail (harus berakhiran `@gmail.com`), password minimal 8 karakter, dan konfirmasi password.
   - Dilengkapi validasi interaktif di sisi klien.
   - Setelah sukses, pengguna secara otomatis dialihkan kembali ke halaman Login disertai pesan notifikasi hijau.
3. **Login Pengguna**:
   - Masukkan Gmail dan password yang telah didaftarkan.
   - Dilengkapi tombol intip/sembunyikan password (Show/Hide Password).
   - Setelah sukses, JWT disimpan di `localStorage` dan pengguna diarahkan ke `/dashboard`.
4. **Proteksi Route (`ProtectedRoute`)**:
   - Jika pengguna belum login mencoba mengakses `/dashboard`, sistem secara otomatis melemparnya kembali ke `/`.
5. **Pencegahan Login Ganda (`PublicRoute`)**:
   - Jika pengguna yang **sudah login** mencoba mengakses `/` atau `/register`, sistem langsung mengarahkannya kembali ke `/dashboard`.
6. **Dashboard Siswa TKA SD**:
   - Menampilkan sapaan personal `Halo, [email]` (berasal dari endpoint `/api/me`).
   - Informasi tujuan Tes Kemampuan Akademik (TKA) SD.
   - **2 Modul Mata Pelajaran**: *Bahasa Indonesia* dan *Matematika* dengan jumlah soal, estimasi durasi, dan tombol "Mulai Latihan".
   - Rekap tabel **Riwayat Nilai Latihan** try out sebelumnya.
   - Tombol **Keluar** di navbar yang menghapus sesi token dan mengembalikan pengguna ke halaman Login.
