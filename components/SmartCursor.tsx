"use client";
import { useEffect, useRef, useState } from "react";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";

// Курсор-хамелеон: кружок с инверсией → капсула с подписью над [data-cursor] → «Скопировать» над [data-copy].
export default function SmartCursor() {
  const { lang } = useT();
  const ui = uiDict[lang];
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [on, setOn] = useState(false);
  const copiedTimer = useRef<number>();
  const labelRef = useRef("");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;

    const set = (l: string) => { labelRef.current = l; setLabel(l); };
    const move = (e: PointerEvent) => { pos.tx = e.clientX; pos.ty = e.clientY; setOn(true); };
    const over = (e: PointerEvent) => {
      if (labelRef.current === ui.copied) return;
      const t = e.target as HTMLElement;
      const copy = t.closest?.("[data-copy]");
      const c = t.closest?.("[data-cursor]") as HTMLElement | null;
      set(copy ? ui.copy : c ? c.dataset.cursor || "" : "");
    };
    const click = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.("[data-copy]") as HTMLElement | null;
      if (!t) return;
      e.preventDefault(); e.stopPropagation();
      navigator.clipboard?.writeText(t.dataset.copy || "").catch(() => {});
      set(ui.copied);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => set(ui.copy), 1600);
    };
    const leave = () => setOn(false);
    const dn = () => setDown(true), up = () => setDown(false);

    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.18; pos.y += (pos.ty - pos.y) * 0.18;
      if (el.current) el.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click, true);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", dn); window.addEventListener("pointerup", up);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click, true);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", dn); window.removeEventListener("pointerup", up);
    };
  }, [ui.copy, ui.copied]);

  const has = !!label;
  return (
    <div ref={el} className="pointer-events-none fixed left-0 top-0 z-[200] hidden [@media(hover:hover)_and_(pointer:fine)]:block" style={{ opacity: on ? 1 : 0 }}>
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center whitespace-nowrap rounded-full text-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${
          has ? "h-14 px-6 bg-accent text-white shadow-2xl" : "h-7 w-7 bg-white mix-blend-difference"
        }`}
        style={{ transform: `translate(-50%,-50%) scale(${down ? 0.8 : 1})` }}
      >
        <span className={`transition-opacity duration-200 ${has ? "opacity-100" : "opacity-0 w-0"}`}>{label}</span>
      </div>
    </div>
  );
}

