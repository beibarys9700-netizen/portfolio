"use client";
import { useRef, useState } from "react";

type Piece = { x: number; y: number; r: number };

// Картинка из плиток: при наведении рассыпается на кусочки и снова собирается.
export default function Disintegrate({
  src, ratio, cols = 14, rows = 18, className = "", style,
}: { src: string; ratio: number; cols?: number; rows?: number; className?: string; style?: React.CSSProperties }) {
  const [scattered, setScattered] = useState(false);
  const busy = useRef(false);
  const [pieces, setPieces] = useState<Piece[]>([]);

  const trigger = () => {
    if (busy.current) return;
    busy.current = true;
    setPieces(Array.from({ length: cols * rows }, (_, i) => {
      const cx = (i % cols) / cols - 0.5;
      return { x: cx * 260 + (Math.random() - 0.5) * 220, y: (Math.random() - 0.7) * 320, r: (Math.random() - 0.5) * 240 };
    }));
    setScattered(true);
    setTimeout(() => setScattered(false), 750);
    setTimeout(() => { busy.current = false; }, 1700);
  };

  return (
    <div onMouseEnter={trigger} className={`relative ${className}`} style={{ aspectRatio: String(ratio), ...style }}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = i % cols, cy = Math.floor(i / cols);
        const p = pieces[i];
        return (
          <div key={i} className="absolute"
            style={{
              left: `${(cx / cols) * 100}%`, top: `${(cy / rows) * 100}%`,
              width: `${100 / cols + 0.3}%`, height: `${100 / rows + 0.3}%`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${(cx / (cols - 1)) * 100}% ${(cy / (rows - 1)) * 100}%`,
              transform: scattered && p ? `translate(${p.x}px,${p.y}px) rotate(${p.r}deg) scale(0.4)` : "none",
              opacity: scattered ? 0 : 1,
              transition: scattered ? "transform .75s cubic-bezier(.2,.8,.3,1), opacity .75s ease-in" : `transform .9s cubic-bezier(.2,.8,.3,1) ${(cx + cy) * 8}ms, opacity .6s ease-out ${(cx + cy) * 8}ms`,
            }} />
        );
      })}
    </div>
  );
}

