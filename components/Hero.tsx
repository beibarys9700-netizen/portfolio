"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/lib/content";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import Disintegrate from "./Disintegrate";

const HERO_IMAGE = "/lego.png";
const HERO_RATIO = 744 / 948;

// Полоски штрих-кода как на референсе Studio Null
const BARCODE = [2, 1, 3, 1, 2, 1, 1, 4, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2];

// Анимированные золотистые пылинки в закатном свете и мягкое свечение за курсором
function GoldenDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;

    type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; p: number };
    let motes: Mote[] = [];

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: 48 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.9 + Math.random() * 2.1,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -0.08 - Math.random() * 0.25,
        a: 0.25 + Math.random() * 0.55,
        p: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx + Math.sin(t * 0.0008 + m.p) * 0.12;
        m.y += m.vy;
        if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;
        const pulse = 0.55 + 0.45 * Math.sin(t * 0.002 + m.p);
        ctx.fillStyle = `rgba(255, 232, 185, ${m.a * pulse})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-[15] h-full w-full" aria-hidden />;
}

// Живые часы Алматы (GMT+5) в стиле "ALMATY, KZ • 17 04 QYZ"
function AlmatyClock() {
  const [time, setTime] = useState("17 : 00");
  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Almaty",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setTime(fmt.replace(":", " "));
      } catch {
        const d = new Date();
        setTime(`${String(d.getHours()).padStart(2, "0")} ${String(d.getMinutes()).padStart(2, "0")}`);
      }
    };
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
      <span>ALMATY, KZ • {time} GMT+5</span>
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useT();
  const ui = uiDict[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const [mood, setMood] = useState(0);
  const moods = [":)", "✦", "⚡", "🧱"];

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#6d7688] text-white select-none"
    >
      {/* 1. Атмосферное небо и закатное свечение (задний план) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hill-bg.jpg"
          alt="Golden hour grassy hill"
          className="h-full w-full object-cover object-[center_65%] scale-[1.03]"
        />
        {/* Мягкая виньетка сверху для идеальной читаемости шапки */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(35,40,52,0.42) 0%, rgba(110,115,132,0.06) 45%, rgba(28,24,18,0.35) 100%)",
          }}
        />
      </motion.div>

      {/* 2. Крупные двигающиеся надписи ЗА лего-фигуркой и ЗА вершиной холма */}
      <motion.div
        style={{ y: textY }}
        className="pointer-events-none absolute inset-x-0 top-[14%] md:top-[15%] z-[10] flex flex-col gap-1 md:gap-2"
      >
        {/* Главная гигантская бегущая строка имени и роли */}
        <ScrollVelocityContainer className="font-bold tracking-[-0.04em] leading-[0.9] text-[18vw] md:text-[11.5vw] text-white/90 drop-shadow-[0_12px_35px_rgba(65,55,70,0.28)]">
          <ScrollVelocityRow baseVelocity={4.5} direction={1}>
            {ui.heroMarquee1}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        {/* Вторая контр-направленная бегущая строка (контурная + полупрозрачная) */}
        <ScrollVelocityContainer className="font-semibold tracking-[-0.02em] leading-[0.95] text-[10vw] md:text-[5.5vw] text-white/35">
          <ScrollVelocityRow baseVelocity={3.2} direction={-1}>
            {ui.heroMarquee2}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>

        {/* Третья строка с ключевыми тегами */}
        <ScrollVelocityContainer className="hidden sm:block font-mono uppercase tracking-[0.18em] text-xs md:text-sm text-white/65 mt-1">
          <ScrollVelocityRow baseVelocity={2.2} direction={1}>
            {ui.heroMarquee3}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </motion.div>

      {/* Золотистая пыльца в воздухе */}
      <GoldenDust />

      {/* 3. LEGO-персонаж стоит прямо НА травяном холмике */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6vh] md:bottom-[4vh] z-[20] flex justify-center">
        {/* Тёплая тень на траве под LEGO-фигуркой */}
        <div
          className="absolute bottom-[2vh] h-10 w-56 md:w-80 rounded-full bg-black/55 blur-xl"
          aria-hidden
        />
        {/* Контровой солнечный ореол позади персонажа */}
        <div
          className="absolute bottom-[18vh] h-64 w-64 md:h-96 md:w-96 rounded-full bg-[#ffd7b5]/30 blur-3xl"
          aria-hidden
        />
        <CardContainer containerClassName="py-0 pointer-events-auto">
          <CardBody className="h-auto w-auto">
            <CardItem translateZ={65}>
              <Disintegrate
                src={HERO_IMAGE}
                ratio={HERO_RATIO}
                className="h-[50vh] sm:h-[58vh] md:h-[68vh] max-h-[720px] drop-shadow-[0_28px_45px_rgba(18,15,10,0.65)]"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* 4. Передний слой травинок и полевых цветов у подножия холма, чтобы фигурка буквально утопала в траве */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[24] h-[18vh] md:h-[22vh] overflow-hidden"
        style={{
          maskImage: "linear-gradient(to top, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 45%, transparent 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hill-bg.jpg"
          alt=""
          aria-hidden
          className="absolute bottom-0 left-0 h-[100vh] w-full max-w-none object-cover object-[center_65%] scale-[1.03]"
        />
      </div>

      {/* 5. Дизайнерский HUD-интерфейс в эстетике Studio Null (Radio Null) */}

      {/* Верхняя центральная/левая строка метаданных под шапкой */}
      <div className="pointer-events-none absolute inset-x-0 top-16 md:top-20 z-[30] flex items-center justify-between px-5 md:px-10">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-3.5 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
          <span>{site.name.toUpperCase()} FM</span>
        </div>

        <div className="hidden sm:block">
          <AlmatyClock />
        </div>

        <div className="flex items-center gap-3 text-right">
          <div className="leading-tight">
            <div className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              {t.role[0]}
            </div>
            <div className="text-[10px] md:text-xs italic text-white/75">
              {t.role[1]}
            </div>
          </div>
          <span className="hidden md:inline-block text-2xl font-bold tracking-tighter text-white">
            :b
          </span>
        </div>
      </div>

      {/* Левая вертикальная стеклянная шкала-пилюля (как в Studio Null) — на десктопе */}
      <div className="pointer-events-none absolute left-5 md:left-8 top-32 bottom-24 z-[30] hidden md:flex flex-col items-center">
        <div className="relative h-full w-9 rounded-full border border-white/35 bg-white/20 backdrop-blur-md overflow-hidden p-1 shadow-lg">
          <motion.div
            animate={{ height: ["28%", "78%", "45%", "28%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="w-full rounded-full bg-white/85 shadow-sm"
          />
        </div>
      </div>

      {/* Нижний бар в стиле Studio Null: слева смайл + капсула «Обо мне», справа карточка со штрихкодом и переход к проектам */}
      <div className="absolute inset-x-0 bottom-5 md:bottom-7 z-[30] flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 px-5 md:px-8">
        {/* Левый угол: круглая кнопка эмоции + капсула перехода на страницу /about */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMood((m) => (m + 1) % moods.length)}
            aria-label="Mood"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-[#141519]/90 text-sm font-medium text-white shadow-lg transition-transform active:scale-90 hover:border-white"
          >
            {moods[mood]}
          </button>

          <Link
            href="/about"
            className="group flex flex-1 sm:flex-initial items-center justify-between gap-5 rounded-xl border border-white/35 bg-black/25 hover:bg-white hover:text-[#16151A] px-4 md:px-5 py-2.5 text-xs md:text-sm font-medium tracking-tight backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            <span>{ui.heroCta}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Правый угол: карточка со штрихкодом (как на референсе) + кнопка к кейсам */}
        <div className="flex flex-col gap-2 sm:w-[270px]">
          {/* Стеклянный бейдж со штрихкодом */}
          <div className="hidden sm:flex flex-col items-center rounded-xl border border-white/35 bg-white/10 px-4 py-3 text-center backdrop-blur-md shadow-lg">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 leading-snug">
              {ui.heroCardTitle}
            </div>
            <div className="text-[9px] uppercase tracking-[0.16em] text-white/75 mb-2">
              {ui.heroCardSub}
            </div>
            {/* Штрихкод */}
            <div className="flex h-9 w-full items-stretch justify-center gap-[2px] px-2">
              {BARCODE.map((w, idx) => (
                <span
                  key={idx}
                  className="bg-white/90"
                  style={{ width: `${w * 2}px`, opacity: idx % 5 === 0 ? 0.65 : 0.95 }}
                />
              ))}
            </div>
            <div className="mt-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-white/85">
              PORTFOLIO • 2026 EDITION
            </div>
          </div>

          {/* Нижняя правая плашка — быстрый скролл к работам */}
          <a
            href="#work"
            className="group flex items-center justify-between rounded-xl border border-white/35 bg-black/25 hover:bg-white hover:text-[#16151A] px-4 py-2.5 text-xs md:text-sm font-medium backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            <span>{ui.heroShare}</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↘</span>
          </a>
        </div>
      </div>
    </section>
  );
}
