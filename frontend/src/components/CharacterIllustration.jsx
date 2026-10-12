import React, { useState, useEffect } from 'react';
import originalImage from '../assets/10280401.jpg';

/**
 * Komponen Karakter Siswa TKA SD (Ilustrasi Bersih)
 * Responsif: dapat tampil rapi di sebelah kanan bahkan pada layar HP (mobile)
 */
const CharacterIllustration = () => {
  const [processedSrc, setProcessedSrc] = useState(null);

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

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[150px] xs:max-w-[190px] sm:max-w-[320px] md:max-w-[420px]">
      {/* Character Container (Murni Ilustrasi Bersih Tanpa Button & Tulisan Klik) */}
      <div className="relative z-10 w-full flex justify-center">
        <img
          src={processedSrc || originalImage}
          alt="Karakter Siswa Pintar TKA SD"
          className="w-auto h-[175px] xs:h-[215px] sm:h-[350px] md:h-[440px] lg:h-[490px] object-contain transition-all duration-200 max-w-full drop-shadow-sm pointer-events-none"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default CharacterIllustration;
