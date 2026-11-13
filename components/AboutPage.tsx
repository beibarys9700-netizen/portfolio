"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, animate } from "motion/react";
import { useT } from "./Providers";
import { aboutDict, tools } from "@/lib/about";
import InteractiveBg from "./InteractiveBg";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { site } from "@/lib/content";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";

// Слово из букв: каждая буква подпрыгивает и окрашивается при наведении
function HoverLine({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease: [0.2, 0.7, 0.2, 1] }}>
        {Array.from(text).map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block whitespace-pre cursor-default"
            whileHover={{ y: -14, rotate: i % 2 ? 6 : -6, color: "#4B5BFF", scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// Фото: 3D-наклон за курсором + прожектор
function PhotoStage({ hint }: { hint: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 14 }), sy = useSpring(my, { stiffness: 120, damping: 14 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotX = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const gx = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const gy = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);
  const glow = useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.75), rgba(75,91,255,0.25) 35%, transparent 65%)`);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { mx.set(0); my.set(0); };
  return (
    <div className="relative mx-auto w-full max-w-[460px] [perspective:1100px]" onPointerMove={move} onPointerLeave={leave} ref={ref}>
      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative aspect-[4/5]">
        {/* фон-арка */}
        <motion.div style={{ background: glow, translateZ: 0 }} className="absolute inset-0 rounded-t-[999px] rounded-b-[40px] bg-ink/90 overflow-hidden">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px)" }} />
        </motion.div>
        {/* вращающаяся круглая надпись */}
        <div style={{ transform: "translateZ(40px)" }} className="absolute -left-6 top-8 md:-left-14 w-28 h-28 rounded-full bg-accent text-white flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 w-full h-full">
            <defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text fontSize="10.5" fill="white" letterSpacing="2.5"><textPath href="#c">DESIGN • CODE • MOTION • </textPath></text>
          </svg>
          <span className="text-2xl">✦</span>
        </div>
        {/* фото */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me.png" alt="Beibarys" draggable={false}
          style={{ transform: "translateZ(90px)" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[104%] w-auto max-w-none select-none drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]" />
        {/* стикеры */}
        <motion.div style={{ transform: "translateZ(130px)" }} animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-[-4%] top-[18%] rounded-full bg-paper text-ink px-4 py-2 text-sm shadow-xl">🎸 Guitar</motion.div>
        <motion.div style={{ transform: "translateZ(110px)" }} animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}
          className="absolute left-[-6%] bottom-[22%] rounded-full bg-paper text-ink px-4 py-2 text-sm shadow-xl">🧱 LEGO</motion.div>
      </motion.div>
      <div className="mt-6 text-center text-xs uppercase tracking-widest opacity-60">{hint}</div>
    </div>
  );
}

function Counter({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, n, { duration: 2, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, n]);
  return <span ref={ref}>{v}{suffix}</span>;
}

// Карточка с прожектором, следящим за курсором
function SpotCard({ index, title, text }: { index: number; title: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, on: false });
  return (
    <div ref={ref}
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top, on: true }); }}
      onPointerLeave={() => setPos((p) => ({ ...p, on: false }))}
      className="group relative overflow-hidden rounded-3xl border border-ink/15 bg-paper p-8 md:p-10 min-h-[280px] flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2">
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: pos.on ? 1 : 0, background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(75,91,255,.9), rgba(75,91,255,0) 70%)` }} />
      <div className="relative z-10 text-sm opacity-60 group-hover:text-white group-hover:opacity-90 transition-colors">0{index + 1}</div>
      <div className="relative z-10 group-hover:text-white transition-colors duration-300">
        <h3 className="text-3xl md:text-4xl tracking-tight mb-4">{title}</h3>
        <p className="opacity-70 group-hover:opacity-95 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function Process({ title, steps }: { title: string; steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="bg-ink text-paper px-6 md:px-[8%] py-28 md:py-40">
      <Reveal><h2 className="text-5xl md:text-8xl tracking-tighter leading-none mb-20">{title}</h2></Reveal>
      <div ref={ref} className="relative">
        <div className="absolute left-0 right-0 top-[7px] h-px bg-paper/20 hidden md:block" />
        <motion.div style={{ width: w }} className="absolute left-0 top-[7px] h-px bg-accent hidden md:block" />
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-accent mb-8 ring-8 ring-ink" />
                <div className="text-sm opacity-50 mb-2">0{i + 1}</div>
                <h3 className="text-3xl tracking-tight mb-3">{s.title}</h3>
                <p className="opacity-70 leading-relaxed max-w-[260px]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const { lang } = useT();
  const a = aboutDict[lang];
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen bg-sage text-white overflow-hidden px-6 md:px-[8%] pt-32 pb-20 flex items-center">
        <InteractiveBg />
        <div className="relative z-10 grid w-full md:grid-cols-[1.25fr_1fr] gap-16 items-center">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest opacity-70 hover:opacity-100 mb-10">← {a.back}</Link>
            <div className="text-sm uppercase tracking-widest opacity-70 mb-6">{a.kicker}</div>
            <h1 className="text-[11vw] md:text-[5.6vw] leading-[1] tracking-[-0.04em] font-medium">
              {a.heroLines.map((l, i) => <HoverLine key={l} text={l} delay={0.15 * i} />)}
            </h1>
            <Reveal delay={400}><p className="mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-white/85">{a.lead}</p></Reveal>
            <Reveal delay={600}>
              <div className="mt-8 flex flex-wrap gap-3">
                {a.tags.map((t) => <span key={t} className="rounded-full border border-white/40 px-4 py-2 text-sm backdrop-blur">{t}</span>)}
              </div>
            </Reveal>
          </div>
          <PhotoStage hint={a.hint} />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-paper py-10 overflow-hidden border-b border-ink/10">
        <ScrollVelocityContainer className="text-5xl md:text-8xl tracking-tighter font-medium">
          <ScrollVelocityRow baseVelocity={4} direction={-1}>{tools.map((t) => `${t}  ✦  `).join("")}</ScrollVelocityRow>
        </ScrollVelocityContainer>
      </section>

      {/* STATS */}
      <section className="bg-paper px-6 md:px-[8%] py-28 md:py-36">
        <Reveal><div className="text-[11px] uppercase text-ink/60 mb-10">{a.statsTitle}</div></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-6">
          {a.stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="text-6xl md:text-8xl tracking-tighter leading-none"><Counter n={s.n} suffix={s.suffix} /></div>
              <div className="mt-4 text-sm md:text-base opacity-70 max-w-[200px]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="bg-paper px-6 md:px-[8%] pb-28 md:pb-40">
        <Reveal><h2 className="text-5xl md:text-8xl tracking-tighter leading-none mb-16">{a.doTitle}</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {a.doItems.map((d, i) => <Reveal key={i} delay={i * 100}><SpotCard index={i} title={d.title} text={d.text} /></Reveal>)}
        </div>
      </section>

      <Process title={a.processTitle} steps={a.process} />

      {/* FUN + CTA */}
      <section className="relative bg-sage text-white overflow-hidden px-6 md:px-[8%] py-28 md:py-44">
        <InteractiveBg />
        <div className="relative z-10">
          <Reveal><div className="text-sm uppercase tracking-widest opacity-70 mb-6">{a.funTitle}</div></Reveal>
          <Reveal delay={100}><p className="text-3xl md:text-6xl tracking-tight leading-[1.1] max-w-4xl">{a.funText}</p></Reveal>
          <Reveal delay={200}>
            <div className="mt-20 flex flex-wrap items-center gap-10">
              <h2 className="text-5xl md:text-8xl tracking-tighter leading-none">{a.ctaTitle}</h2>
              <Magnetic href={`mailto:${site.email}`} className="w-36 h-36 !bg-accent hover:!bg-paper hover:!text-ink">{a.ctaBtn}</Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
