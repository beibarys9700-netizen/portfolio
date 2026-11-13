"use client";
import { useRef, ReactNode } from "react";
import gsap from "gsap";

// Круглая кнопка, которая «тянется» за курсором
export default function Magnetic({ children, className = "", href = "#" }: { children: ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.4, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power3.out" });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)" });
  return (
    <a ref={ref} href={href} onMouseMove={move} onMouseLeave={leave}
      className={`flex items-center justify-center rounded-full bg-ink text-paper text-sm hover:bg-accent transition-colors duration-300 ${className}`}>
      {children}
    </a>
  );
}

