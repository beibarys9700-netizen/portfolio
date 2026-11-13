"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "circle" | "star";

// Звезда из 10 точек (5 лучей) с центром в (cx, cy) и внешним радиусом r.
function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${cx + rad * Math.cos(a)}px ${cy + rad * Math.sin(a)}px`);
  }
  return `polygon(${pts.join(",")})`;
}

// Кнопка смены темы: новая тема «расходится» от кнопки кругом или звездой.
export function AnimatedThemeToggler({
  variant = "star",
  duration = 900,
  className,
}: {
  variant?: Variant;
  duration?: number;
  className?: string;
}) {
  const [dark, setDark] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(async () => {
    const apply = () => {
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      setDark(next);
    };
    const btn = ref.current;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!btn || !doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    await doc.startViewTransition(() => apply()).ready;

    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = left + width / 2, y = top + height / 2;
    const maxR = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const from = variant === "star" ? star(x, y, 0) : `circle(0px at ${x}px ${y}px)`;
    const to = variant === "star" ? star(x, y, maxR * 2.3) : `circle(${maxR}px at ${x}px ${y}px)`;
    document.documentElement.animate(
      { clipPath: [from, to] },
      { duration, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
    );
  }, [variant, duration]);

  return (
    <button ref={ref} onClick={toggle} aria-label="Toggle theme" className={cn("w-9 h-9 flex items-center justify-center", className)}>
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

