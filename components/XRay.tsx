"use client";
import { useRef, useState } from "react";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";
import Reveal from "./Reveal";

// Один и тот же макет магазина: wire=true — монохромный каркас, wire=false — финальный дизайн.
function Mock({ wire }: { wire: boolean }) {
  const items = [
    { n: "Atelier Tote", p: "42 000 ₸", c: "linear-gradient(135deg,#FF9A62,#E8573D)" },
    { n: "Nomad Duffel", p: "58 000 ₸", c: "linear-gradient(135deg,#7C8CFF,#4B5BFF)" },
    { n: "Steppe Clutch", p: "27 500 ₸", c: "linear-gradient(135deg,#4DD6C8,#12A4A0)" },
  ];
  const line = (w: string) => <div className={`h-2 rounded-full ${wire ? "bg-ink/20" : "bg-white/70"}`} style={{ width: w }} />;
  return (
    <div className={`absolute inset-0 flex flex-col overflow-hidden ${wire ? "bg-paper font-mono text-ink/50" : "bg-[#0F0E14] text-white"}`}>
      {/* nav */}
      <div className={`flex items-center justify-between px-6 py-4 ${wire ? "border-b border-dashed border-ink/30" : "border-b border-white/10"}`}>
        {wire ? <div className="h-5 w-20 border border-dashed border-ink/40" /> : <div className="text-lg font-medium tracking-tight">Nomadique<span className="text-[#7C8CFF]">.</span></div>}
        <div className="flex gap-4 text-xs">{wire ? [1, 2, 3].map((i) => <div key={i} className="h-2 w-10 bg-ink/20" />) : ["Shop", "Story", "Cart (2)"].map((x) => <span key={x} className="opacity-70">{x}</span>)}</div>
      </div>
      {/* hero */}
      <div className="relative flex flex-1 items-center gap-6 px-6 py-6">
        <div className="z-10 flex-1">
          {wire ? (
            <><div className="mb-3 h-6 w-3/4 bg-ink/25" /><div className="mb-5 h-6 w-1/2 bg-ink/25" />{line("90%")}<div className="mt-2" />{line("70%")}
              <div className="mt-6 inline-block border border-dashed border-ink/40 px-5 py-2 text-xs">[ button ]</div></>
          ) : (
            <><h3 className="text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">Bags made for <span className="bg-gradient-to-r from-[#FF9A62] to-[#7C8CFF] bg-clip-text text-transparent">the road.</span></h3>
              <p className="mt-3 max-w-xs text-sm text-white/60">Handmade in Almaty. Ships in 2 days across Kazakhstan.</p>
              <div className="mt-5 inline-block rounded-full bg-[#4B5BFF] px-6 py-2.5 text-sm shadow-[0_10px_30px_-5px_#4B5BFF]">Shop now →</div></>
          )}
        </div>
        {wire ? (
          <div className="relative hidden h-40 w-1/3 border border-dashed border-ink/40 md:block"><svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none"><line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" opacity=".4" /><line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" opacity=".4" /></svg></div>
        ) : (
          <div className="relative hidden h-44 w-1/3 rounded-3xl md:block" style={{ background: "linear-gradient(135deg,#7C8CFF,#4B5BFF 55%,#FF9A62)", boxShadow: "0 30px 60px -20px #4B5BFF" }}>
            <div className="absolute inset-4 rounded-2xl border border-white/30" /></div>
        )}
      </div>
      {/* products */}
      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        {items.map((it) => (
          <div key={it.n} className={wire ? "border border-dashed border-ink/40 p-2" : "rounded-2xl bg-white/5 p-2"}>
            <div className={`h-16 md:h-24 ${wire ? "bg-ink/10" : "rounded-xl"}`} style={wire ? undefined : { background: it.c }} />
            {wire ? <><div className="mt-2 h-2 w-3/4 bg-ink/25" /><div className="mt-1.5 h-2 w-1/3 bg-ink/15" /></>
              : <div className="mt-2 flex justify-between items-center text-[11px] gap-1"><span>{it.n}</span><span className="text-white/60 whitespace-nowrap">{it.p}</span></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Блок «рентген»: слева каркас, справа финальный дизайн; граница следует за курсором/пальцем.
export default function XRay() {
  const { lang } = useT();
  const ui = uiDict[lang];
  const box = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const set = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    setX(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  return (
    <section className="bg-paper px-6 md:px-[8%] py-24 md:py-40 border-t border-ink/10">
      <Reveal>
        <div className="text-[11px] uppercase text-ink/60 mb-4">{ui.xrayKicker}</div>
        <h2 className="text-4xl md:text-7xl tracking-tighter leading-[1.05] max-w-4xl">{ui.xrayTitle}</h2>
        <p className="mt-6 max-w-xl text-ink/70 leading-relaxed">{ui.xrayText}</p>
      </Reveal>
      <Reveal delay={150}>
        <div ref={box} onPointerMove={set} onPointerDown={set} data-cursor={`↔ ${ui.drag}`}
          className="relative mt-8 md:mt-14 aspect-[3/4] sm:aspect-[16/10] w-full select-none overflow-hidden rounded-2xl md:rounded-3xl border border-ink/15 shadow-2xl touch-none">
          <Mock wire />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}><Mock wire={false} /></div>
          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_12px_#4B5BFF]" style={{ left: `${x}%` }}>
            <div className="absolute top-1/2 left-1/2 flex h-10 w-10 md:h-12 md:w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-xl text-xs md:text-sm">↔</div>
          </div>
          <span className="pointer-events-none absolute left-3 top-3 md:left-4 md:top-4 rounded-full bg-ink/90 backdrop-blur px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs text-paper">{ui.wire}</span>
          <span className="pointer-events-none absolute right-3 top-3 md:right-4 md:top-4 rounded-full bg-accent/90 backdrop-blur px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs text-white">{ui.design}</span>
        </div>
      </Reveal>
    </section>
  );
}

