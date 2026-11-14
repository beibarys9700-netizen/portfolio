"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { projects } from "@/lib/content";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";

type P = (typeof projects)[number];

function Stage({ p, mode }: { p: P; mode: "mobile" | "desktop" }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 14 }), sy = useSpring(my, { stiffness: 110, damping: 14 });
  const rY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const rX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(false), [p.url, mode]);

  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const mobile = mode === "mobile";
  const W = mobile ? 390 : 1280, H = mobile ? 800 : 800;

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }}
      className="flex min-h-[500px] md:min-h-[640px] items-center justify-center [perspective:1400px] w-full max-w-full overflow-hidden py-4">
      <motion.div style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="max-w-full">
        {mobile ? (
          // Мобильный телефон с динамическим пропорциональным масштабом под экран
          <div
            className="relative overflow-hidden bg-black shadow-[0_30px_70px_-15px_rgba(0,0,0,.75)] rounded-[38px] md:rounded-[44px] border-[7px] md:border-[10px] border-[#1c1c20] mx-auto"
            style={{ width: "min(300px, 78vw)", height: "min(580px, 150vw)" }}>
            <div className="absolute left-1/2 top-2 z-20 h-4 md:h-5 w-20 md:w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 flex items-end p-5 text-2xl md:text-3xl text-white" style={{ background: `linear-gradient(135deg, ${p.color}, #16151A)` }}>
                {!loaded && p.title}
              </div>
              {p.url && (
                <iframe key={`${p.url}-${mode}`} src={p.url} title={p.title} loading="lazy" onLoad={() => setLoaded(true)}
                  className="absolute left-0 top-0 border-0 bg-white"
                  style={{
                    width: "390px",
                    height: "800px",
                    transform: "scale(calc(min(300px, 78vw) / 390))",
                    transformOrigin: "top left",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity .5s",
                  }} />
              )}
            </div>
          </div>
        ) : (
          // Десктоп-окно
          <div
            className="relative overflow-hidden bg-black shadow-[0_40px_90px_-20px_rgba(0,0,0,.65)] rounded-xl border border-white/15 mx-auto"
            style={{ width: "min(540px, 88vw)", height: "min(360px, 58vw)" }}>
            <div className="flex h-7 items-center gap-1.5 bg-[#222226] px-3">
              <i className="h-2 w-2 rounded-full bg-[#ff5f57]" /><i className="h-2 w-2 rounded-full bg-[#febc2e]" /><i className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded bg-black/40 px-3 py-0.5 text-[10px] text-white/50">{p.url.replace("https://", "")}</span>
            </div>
            <div className="relative w-full h-[calc(100%-28px)] overflow-hidden">
              <div className="absolute inset-0 flex items-end p-5 text-2xl text-white" style={{ background: `linear-gradient(135deg, ${p.color}, #16151A)` }}>
                {!loaded && p.title}
              </div>
              {p.url && (
                <iframe key={`${p.url}-${mode}`} src={p.url} title={p.title} loading="lazy" onLoad={() => setLoaded(true)}
                  className="absolute left-0 top-0 border-0 bg-white"
                  style={{
                    width: "1280px",
                    height: "800px",
                    transform: "scale(calc(min(540px, 88vw) / 1280))",
                    transformOrigin: "top left",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity .5s",
                  }} />
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function CaseDrawer({ index, onClose }: { index: number | null; onClose: () => void }) {
  const { lang, t } = useT();
  const ui = uiDict[lang];
  const [mode, setMode] = useState<"mobile" | "desktop">("mobile");
  const p = index !== null ? projects[index] : null;

  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [index, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div key="bg" className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            key="drawer" data-lenis-prevent
            className="fixed right-0 top-0 z-[95] h-full w-full overflow-y-auto bg-ink text-paper md:w-[min(720px,92vw)]"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <div className="sticky top-0 z-30 flex items-center justify-between bg-ink/90 px-6 py-5 backdrop-blur-md md:px-10 border-b border-paper/10">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-paper/50">{ui.caseLabel} · 0{(index ?? 0) + 1}</div>
                <div className="text-2xl tracking-tight md:text-5xl">{p.title}</div>
              </div>
              <button onClick={onClose} className="flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-paper/30 text-xl transition-colors hover:bg-accent hover:border-accent" aria-label={ui.close}>✕</button>
            </div>

            <div className="px-5 md:px-10 py-6">
              <div className="mb-3 text-sm text-paper/60">{t.categories[(index ?? 0) % t.categories.length]}</div>
              <div className="inline-flex rounded-full border border-paper/20 p-1 text-xs md:text-sm mb-4">
                {(["mobile", "desktop"] as const).map((m) => (
                  <button key={m} onClick={() => setMode(m)} className={`rounded-full px-5 py-2 transition-colors ${mode === m ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"}`}>
                    {m === "mobile" ? ui.mobile : ui.desktop}
                  </button>
                ))}
              </div>
              <Stage p={p} mode={mode} />
              <a href={p.url} target="_blank" rel="noreferrer" data-cursor={ui.openLive}
                className="mb-12 flex items-center justify-between rounded-full bg-accent px-8 py-5 text-lg transition-colors hover:bg-paper hover:text-ink">
                <span>{ui.openLive}</span><span>{p.url.replace("https://", "")}</span>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

