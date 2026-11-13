"use client";
import { useEffect, useRef } from "react";

// Интерактивный фон: светящиеся «аврора»-шары + сеть частиц, реагирующая на курсор.
const BLOBS = [
  { c: "75,91,255", r: 0.42, sx: 0.00021, sy: 0.00017, px: 0.0, py: 1.3 },
  { c: "255,92,168", r: 0.34, sx: 0.00017, sy: 0.00024, px: 2.1, py: 0.4 },
  { c: "60,220,200", r: 0.3, sx: 0.00026, sy: 0.00019, px: 4.2, py: 2.8 },
  { c: "255,200,90", r: 0.26, sx: 0.00019, sy: 0.00022, px: 5.5, py: 3.9 },
];

export default function InteractiveBg() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const parent = canvas.parentElement!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999, sx: 0, sy: 0, active: false };
    type P = { x: number; y: number; vx: number; vy: number };
    let parts: P[] = [];

    const resize = () => {
      w = parent.clientWidth; h = parent.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(110, Math.floor((w * h) / 14000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
      mouse.sx = w / 2; mouse.sy = h / 2;
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
    };
    const onLeave = () => { mouse.active = false; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(parent);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains("dark");

      // плавное следование за курсором
      if (mouse.active) {
        mouse.sx += (mouse.x - mouse.sx) * 0.08;
        mouse.sy += (mouse.y - mouse.sy) * 0.08;
      }
      const size = Math.max(w, h);

      // aurora-шары
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (const b of BLOBS) {
        const x = w * (0.5 + 0.38 * Math.sin(t * b.sx * 6 + b.px));
        const y = h * (0.5 + 0.34 * Math.cos(t * b.sy * 6 + b.py));
        const r = size * b.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.c},${dark ? 0.42 : 0.5})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      // шар у курсора
      if (mouse.active) {
        const r = size * 0.22;
        const g = ctx.createRadialGradient(mouse.sx, mouse.sy, 0, mouse.sx, mouse.sy, r);
        g.addColorStop(0, "rgba(255,255,255,0.55)");
        g.addColorStop(0.4, "rgba(120,140,255,0.28)");
        g.addColorStop(1, "rgba(75,91,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.sx - r, mouse.sy - r, r * 2, r * 2);
      }
      ctx.globalCompositeOperation = "source-over";

      // частицы и связи
      const line = dark ? "255,255,255" : "22,21,26";
      for (const p of parts) {
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 22500 && d2 > 1) { const d = Math.sqrt(d2), f = (150 - d) / 150; p.vx += (dx / d) * f * 0.25; p.vy += (dy / d) * f * 0.25; }
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.vx += (Math.random() - 0.5) * 0.02; p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        ctx.fillStyle = `rgba(${line},0.55)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.6, 0, 6.283); ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            ctx.strokeStyle = `rgba(${line},${(1 - d2 / 14400) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        if (mouse.active) {
          const dx = a.x - mouse.x, dy = a.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 32400) {
            ctx.strokeStyle = `rgba(75,91,255,${(1 - d2 / 32400) * 0.8})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden />;
}

