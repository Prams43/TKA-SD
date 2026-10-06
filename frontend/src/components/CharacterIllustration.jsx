import React, { useState, useEffect } from 'react';
import originalImage from '../assets/10280401.jpg';
import { MessageCircle, Sparkles } from 'lucide-react';

/**
 * Komponen Karakter Siswa TKA SD
 * Responsif: dapat tampil rapi di sebelah kanan bahkan pada layar HP (mobile)
 */
const CharacterIllustration = () => {
  const [processedSrc, setProcessedSrc] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);

  const quotes = [
    'Siap jadi juara TKA SD? Yuk pilih menu di samping!',
    'Latihan rutin 15 menit sehari bikin kamu makin pintar!',
    'Tryout berikutnya sudah siap, ayo uji kemampuanmu!',
    'Kamu hebat! Terus semangat belajar ya! 🌟',
  ];

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = originalImage;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = img.naturalWidth || 800;
        const h = img.naturalHeight || 800;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // BFS flood fill dari sudut gambar untuk menghapus background putih luar
        const visited = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        const startPoints = [0, w - 1, (h - 1) * w, (h - 1) * w + (w - 1)];

        for (const p of startPoints) {
          visited[p] = 1;
          queue[tail++] = p;
        }

        while (head < tail) {
          const idx = queue[head++];
          const x = idx % w;
          const y = (idx / w) | 0;
          const pixelIdx = idx * 4;

          const r = data[pixelIdx];
          const g = data[pixelIdx + 1];
          const b = data[pixelIdx + 2];

          if (r > 240 && g > 240 && b > 240) {
            data[pixelIdx + 3] = 0;

            if (x > 0) {
              const left = idx - 1;
              if (!visited[left]) {
                visited[left] = 1;
                queue[tail++] = left;
              }
            }
            if (x < w - 1) {
              const right = idx + 1;
              if (!visited[right]) {
                visited[right] = 1;
                queue[tail++] = right;
              }
            }
            if (y > 0) {
              const up = idx - w;
              if (!visited[up]) {
                visited[up] = 1;
                queue[tail++] = up;
              }
            }
            if (y < h - 1) {
              const down = idx + w;
              if (!visited[down]) {
                visited[down] = 1;
                queue[tail++] = down;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        if (isMounted) {
          setProcessedSrc(canvas.toDataURL('image/png'));
        }
      } catch (err) {
        console.warn('Gagal memproses transparansi gambar:', err);
      }
    };

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCharacterClick = () => {
    setIsWiggling(true);
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    setTimeout(() => setIsWiggling(false), 600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none group w-full max-w-[170px] xs:max-w-[210px] sm:max-w-[320px] md:max-w-[420px]">
      {/* Ambient Radial Glow Halus */}
      <div className="absolute w-36 h-36 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-blue-400/10 blur-2xl sm:blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-28 h-28 sm:w-56 sm:h-56 rounded-full bg-emerald-400/10 blur-xl sm:blur-2xl pointer-events-none -bottom-2 sm:-bottom-4" />

      {/* Interactive Speech Bubble */}
      <div
        onClick={handleCharacterClick}
        className="cursor-pointer mb-1 sm:mb-3 px-2 sm:px-3.5 py-1 sm:py-2 rounded-xl sm:rounded-2xl bg-white text-slate-800 text-[9px] sm:text-xs md:text-sm font-semibold shadow-md shadow-blue-950/10 border border-slate-200/90 flex items-center space-x-1.5 backdrop-blur-md transform transition-all duration-300 hover:scale-105 active:scale-95 z-20 text-center animate-fade-in"
      >
        <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0 animate-bounce" />
        <span className="line-clamp-2 sm:line-clamp-none">{quotes[quoteIndex]}</span>
      </div>

      {/* Floating Character Container */}
      <div
        onClick={handleCharacterClick}
        className={`relative cursor-pointer transition-transform duration-300 ${
          isWiggling ? 'scale-105 rotate-2' : 'hover:scale-[1.03]'
        } animate-float z-10 w-full flex justify-center`}
        title="Klik aku untuk bicara!"
      >
        <img
          src={processedSrc || originalImage}
          alt="Karakter Siswa Pintar TKA SD"
          className="w-auto h-[210px] xs:h-[250px] sm:h-[350px] md:h-[440px] lg:h-[490px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 max-w-full"
          draggable="false"
        />

        {/* Badge Klik Saya (muncul saat hover) */}
        <div className="absolute bottom-2 right-2 sm:right-4 bg-blue-600/85 text-white text-[9px] sm:text-[11px] font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>Klik!</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterIllustration;
