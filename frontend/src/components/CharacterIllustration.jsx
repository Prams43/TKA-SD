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
      {/* Interactive Speech Bubble */}
      <div
        onClick={handleCharacterClick}
        className="cursor-pointer mb-2 px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs sm:text-sm font-medium border border-slate-300 shadow-xs flex items-center space-x-1.5 z-20 text-center"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        <span className="line-clamp-2 sm:line-clamp-none">{quotes[quoteIndex]}</span>
      </div>

      {/* Character Container */}
      <div
        onClick={handleCharacterClick}
        className={`relative cursor-pointer transition-transform duration-200 ${
          isWiggling ? 'scale-102' : ''
        } z-10 w-full flex justify-center`}
        title="Klik aku untuk bicara!"
      >
        <img
          src={processedSrc || originalImage}
          alt="Karakter Siswa Pintar TKA SD"
          className="w-auto h-[210px] xs:h-[250px] sm:h-[350px] md:h-[440px] lg:h-[490px] object-contain transition-all duration-200 max-w-full"
          draggable="false"
        />

        {/* Badge Klik Saya (muncul saat hover) */}
        <div className="absolute bottom-2 right-2 sm:right-4 bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded border border-slate-700 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <MessageCircle className="w-3 h-3" />
          <span>Klik!</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterIllustration;
