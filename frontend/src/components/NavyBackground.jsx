import React from 'react';

/**
 * Komponen Latar Belakang Utama Website TKA SD
 * Menampilkan tema gradient teal/cyan cerah khas ed-tech modern
 * dengan aksen gelembung (bulet-bulet) & lengkungan halus eksklusif di pojok-pojok layar.
 * Area tengah tetap bersih dan jernih untuk keterbacaan materi & kartu kuis.
 */
const NavyBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Latar Dasar: Gradient Teal - Cyan Halus Khas Ruangguru / Ed-Tech Edukatif */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 75% 20%, rgba(135, 235, 245, 0.28) 0%, transparent 48%),
            radial-gradient(circle at 18% 82%, rgba(15, 125, 138, 0.22) 0%, transparent 52%),
            linear-gradient(135deg, #1898AA 0%, #1CA2B7 25%, #2EB2C1 52%, #1FA4B8 78%, #158897 100%)
          `,
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. POJOK KANAN ATAS (Top-Right Corner Bubbles & Arcs)          */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-0 right-0 w-80 sm:w-[480px] h-80 sm:h-[480px] pointer-events-none">
        {/* Lengkungan Lingkaran Raksasa Pojok */}
        <div
          className="absolute -top-32 -right-32 w-[380px] sm:w-[560px] h-[380px] sm:h-[560px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(105, 194, 202, 0.22) 50%, rgba(255, 255, 255, 0.03) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.18)',
          }}
        />

        {/* Cincin Lengkungan Sekunder */}
        <div
          className="absolute -top-16 -right-16 w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 70%, transparent 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
          }}
        />

        {/* Inti Lingkaran Sudut */}
        <div
          className="absolute -top-6 -right-6 w-[150px] sm:w-[220px] h-[150px] sm:h-[220px] rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(2px)',
          }}
        />

        {/* Gelembung Bulat Terang di Sekitar Pojok */}
        <div
          className="absolute top-20 right-48 sm:top-28 sm:right-72 w-16 h-16 sm:w-20 sm:h-20 rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 8px 24px rgba(20, 110, 120, 0.18)',
          }}
        >
          {/* Titik Kilau Refleksi Gelembung */}
          <div className="absolute top-2.5 left-3 w-3 h-2 rounded-full bg-white/70 rotate-[-30deg]" />
        </div>

        {/* Gelembung Sedang 1 */}
        <div
          className="absolute top-36 right-20 sm:top-48 sm:right-32 w-11 h-11 sm:w-14 sm:h-14 rounded-full animate-float-reverse"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.12) 70%, transparent 100%)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="absolute top-1.5 left-2 w-2 h-1.5 rounded-full bg-white/60 rotate-[-25deg]" />
        </div>

        {/* Gelembung Kecil 2 */}
        <div
          className="absolute top-52 right-40 sm:top-72 sm:right-56 w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.28)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
          }}
        />

        {/* Gelembung Mini 3 */}
        <div
          className="absolute top-28 right-16 sm:top-36 sm:right-20 w-4 h-4 rounded-full bg-white/40"
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. POJOK KANAN BAWAH (Bottom-Right Corner Bubbles & Arcs)      */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-0 right-0 w-80 sm:w-[480px] h-80 sm:h-[480px] pointer-events-none">
        {/* Lengkungan Lingkaran Besar Pojok Bawah */}
        <div
          className="absolute -bottom-36 -right-28 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(105, 194, 202, 0.2) 60%, rgba(255, 255, 255, 0.02) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.16)',
          }}
        />

        {/* Cincin Lingkaran Sekunder */}
        <div
          className="absolute -bottom-16 -right-16 w-[240px] sm:w-[350px] h-[240px] sm:h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.06) 70%, transparent 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
          }}
        />

        {/* Gelembung Bulat Utama Pojok Bawah */}
        <div
          className="absolute bottom-28 right-44 sm:bottom-36 sm:right-64 w-14 h-14 sm:w-18 sm:h-18 rounded-full animate-float-reverse"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.12) 60%, transparent 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.32)',
          }}
        >
          <div className="absolute top-2 left-2.5 w-2.5 h-1.5 rounded-full bg-white/70 rotate-[-30deg]" />
        </div>

        {/* Gelembung Pendamping */}
        <div
          className="absolute bottom-40 right-20 sm:bottom-56 sm:right-32 w-9 h-9 sm:w-11 sm:h-11 rounded-full animate-float-slow"
          style={{
            background: 'rgba(255, 255, 255, 0.24)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
          }}
        />

        {/* Gelembung Mini */}
        <div
          className="absolute bottom-16 right-36 sm:bottom-24 sm:right-48 w-5 h-5 rounded-full bg-white/35"
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. POJOK KIRI ATAS (Top-Left Corner Bubbles & Arcs)            */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-0 left-0 w-80 sm:w-[460px] h-80 sm:h-[460px] pointer-events-none">
        {/* Lengkungan Lingkaran Pojok Kiri Atas */}
        <div
          className="absolute -top-32 -left-32 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(105, 194, 202, 0.18) 55%, transparent 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.16)',
          }}
        />

        {/* Cincin Lingkaran Kiri Atas */}
        <div
          className="absolute -top-14 -left-14 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.14)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
          }}
        />

        {/* Gelembung Bulat Pojok Kiri Atas */}
        <div
          className="absolute top-24 left-40 sm:top-32 sm:left-60 w-14 h-14 sm:w-16 sm:h-16 rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.14) 65%, transparent 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.32)',
          }}
        >
          <div className="absolute top-2 left-2.5 w-2.5 h-1.5 rounded-full bg-white/70 rotate-[-30deg]" />
        </div>

        {/* Gelembung Kecil */}
        <div
          className="absolute top-44 left-24 sm:top-56 sm:left-36 w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.22)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        />

        <div
          className="absolute top-16 left-28 sm:top-24 sm:left-40 w-4 h-4 rounded-full bg-white/35"
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. POJOK KIRI BAWAH (Bottom-Left Corner Bubbles & Arcs)        */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-0 left-0 w-80 sm:w-[460px] h-80 sm:h-[460px] pointer-events-none">
        {/* Lengkungan Lingkaran Pojok Kiri Bawah */}
        <div
          className="absolute -bottom-36 -left-32 w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, rgba(105, 194, 202, 0.18) 60%, transparent 100%)',
            border: '2px solid rgba(255, 255, 255, 0.16)',
          }}
        />

        {/* Cincin Lingkaran Sekunder */}
        <div
          className="absolute -bottom-16 -left-16 w-[230px] sm:w-[330px] h-[230px] sm:h-[330px] rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.13)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
          }}
        />

        {/* Gelembung Pojok Kiri Bawah */}
        <div
          className="absolute bottom-28 left-40 sm:bottom-36 sm:left-60 w-13 h-13 sm:w-16 sm:h-16 rounded-full animate-float-reverse"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.12) 65%, transparent 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="absolute top-2 left-2.5 w-2 h-1.5 rounded-full bg-white/70 rotate-[-30deg]" />
        </div>

        {/* Gelembung Sedang */}
        <div
          className="absolute bottom-44 left-20 sm:bottom-60 sm:left-32 w-9 h-9 sm:w-11 sm:h-11 rounded-full animate-float-slow"
          style={{
            background: 'rgba(255, 255, 255, 0.24)',
            border: '1px solid rgba(255, 255, 255, 0.32)',
          }}
        />

        {/* Gelembung Mini */}
        <div
          className="absolute bottom-16 left-32 sm:bottom-24 sm:left-44 w-5 h-5 rounded-full bg-white/35"
        />
      </div>

      {/* Catatan: Area tengah dibiarkan polos & jernih tanpa gelembung agar materi, kuis, dan tabel terbaca sempurna */}
    </div>
  );
};

export default NavyBackground;


