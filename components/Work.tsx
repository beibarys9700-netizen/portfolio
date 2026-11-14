"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/lib/content";
import { useT } from "./Providers";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { TextAnimate } from "@/components/ui/text-animate";
import { RollText } from "@/components/ui/roll-text";
import CaseDrawer from "./CaseDrawer";
import { uiDict } from "@/lib/ui";

export default function Work() {
  const { t, lang } = useT();
  const ui = uiDict[lang];
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(preview.current, { scale: 0 });
    const px = gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3" });
    const py = gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3" });
    const move = (e: MouseEvent) => { px(e.clientX); py(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    gsap.to(preview.current, { scale: active === null ? 0 : 1, duration: 0.45, ease: "power3.out" });
    if (active !== null) gsap.to(strip.current, { yPercent: -(100 / projects.length) * active, duration: 0.6, ease: "power3.out" });
  }, [active]);

  return (
    <section id="work" className="relative bg-paper px-6 md:px-[8%] pt-32 pb-24">
      <div className="grid md:grid-cols-[1fr_1fr] gap-10 mb-24">
        <p className="text-4xl md:text-6xl leading-[1.1] tracking-tight max-w-3xl"><TextAnimate by="word">{t.intro}</TextAnimate></p>
        <Reveal delay={150} className="md:pl-24">
          <p className="text-base max-w-md leading-relaxed">{t.introSmall}</p>
          <Magnetic href="/about" className="mt-12 w-32 h-32">{t.aboutBtn}</Magnetic>
        </Reveal>
      </div>

      <div className="text-[11px] uppercase text-ink/60 mb-4">{t.recent}</div>
      <ul onMouseLeave={() => setActive(null)} className="border-t border-ink/15">
        {projects.map((p, i) => (
          <li key={p.slug} onMouseEnter={() => setActive(i)} className="border-b border-ink/15">
            <Reveal>
              <a href={`#${p.slug}`} data-cursor={ui.viewCase} onClick={(e) => { e.preventDefault(); setOpen(i); }} className={`group flex items-center justify-between py-8 md:py-12 transition-opacity duration-300 ${active !== null && active !== i ? "opacity-30" : "opacity-100"}`}>
                <h3 className={`font-unbounded font-bold text-5xl md:text-[8vw] leading-none tracking-tight transition-transform duration-500 ${active === i ? "md:translate-x-6 text-accent" : ""}`}><RollText step={25}>{p.title}</RollText></h3>
                <div className="flex items-center gap-4">
                  <span className="hidden md:block text-base w-64 text-ink/70"><RollText step={10}>{t.categories[i % t.categories.length]}</RollText></span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* плавающее превью */}
      <div className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block">
        <div ref={preview}>
          <div className="-translate-x-1/2 -translate-y-1/2 w-[340px] h-[240px] overflow-hidden rounded-sm bg-ink">
            <div ref={strip} className="h-full" style={{ height: `${projects.length * 100}%` }}>
              {projects.map((p) => (
                <div key={p.slug} className="flex items-end p-5 text-white text-3xl tracking-tight"
                  style={{ height: `${100 / projects.length}%`, background: p.image ? `url(${p.image}) center/cover` : `linear-gradient(135deg, ${p.color}, #16151A)` }}>
                  {p.image ? null : p.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CaseDrawer index={open} onClose={() => setOpen(null)} />
    </section>
  );
}


