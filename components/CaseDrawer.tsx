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
  const W = mobile ? 390 : 1280, H = mobile ? 800 : 800, S = mobile ? 0.7 : 0.4;

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }}
      className="flex min-h-[640px] items-center justify-center [perspective:1400px]">
      <motion.div style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <div
          className={`relative overflow-hidden bg-black shadow-[0_40px_90px_-20px_rgba(0,0,0,.65)] ${mobile ? "rounded-[44px] border-[10px] border-[#1c1c20]" : "rounded-xl border border-white/15"}`}
          style={{ width: W * S + (mobile ? 20 : 0), height: H * S + (mobile ? 20 : 28) }}>
          {!mobile && (
            <div className="flex h-7 items-center gap-1.5 bg-[#222226] px-3">
              <i className="h-2 w-2 rounded-full bg-[#ff5f57]" /><i className="h-2 w-2 rounded-full bg-[#febc2e]" /><i className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded bg-black/40 px-3 py-0.5 text-[10px] text-white/50">{p.url.replace("https://", "")}</span>
            </div>
          )}
          {mobile && <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />}
          <div className="relative overflow-hidden" style={{ width: W * S, height: H * S }}>
            {/* заглушка пока грузится */}
            <div className="absolute inset-0 flex items-end p-5 text-3xl text-white" style={{ background: `linear-gradient(135deg, ${p.color}, #16151A)` }}>
              {!loaded && p.title}
            </div>
            {p.url && (
              <iframe key={`${p.url}-${mode}`} src={p.url} title={p.title} loading="lazy" onLoad={() => setLoaded(true)}
                className="absolute left-0 top-0 origin-top-left border-0 bg-white"
                style={{ width: W, height: H, transform: `scale(${S})`, opacity: loaded ? 1 : 0, transition: "opacity .5s" }} />
            )}
          </div>
        </div>
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
            <div className="sticky top-0 z-10 flex items-center justify-between bg-ink/80 px-6 py-5 backdrop-blur md:px-10">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-paper/50">{ui.caseLabel} · 0{(index ?? 0) + 1}</div>
                <div className="text-3xl tracking-tight md:text-5xl">{p.title}</div>
              </div>
              <button onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-xl transition-colors hover:bg-accent hover:border-accent" aria-label={ui.close}>✕</button>
            </div>

            <div className="px-6 md:px-10">
              <div className="mb-2 text-sm text-paper/60">{t.categories[(index ?? 0) % t.categories.length]}</div>
              <div className="inline-flex rounded-full border border-paper/20 p-1 text-sm">
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

