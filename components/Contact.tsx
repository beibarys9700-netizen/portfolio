"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { site, Lang } from "@/lib/content";
import { useT } from "./Providers";
import Reveal from "./Reveal";
import { playClick } from "@/lib/sound";

const copy: Record<
  Lang,
  {
    kicker: string;
    noteTitle: string;
    noteHint: string;
    noteHintTouch: string;
    noteRevealed: string;
    clearBtn: string;
    revealAllBtn: string;
    waLabel: string;
    waSub: string;
    tgLabel: string;
    tgSub: string;
    igLabel: string;
    igSub: string;
    mailLabel: string;
    copied: string;
    penTag: string;
  }
> = {
  en: {
    kicker: "Interactive scratchpad",
    noteTitle: "Take the pen & write on the sticky note",
    noteHint: "Hold & scribble across the yellow note with the pen to write down my contacts",
    noteHintTouch: "Drag your finger with the pen across the yellow note to reveal my contacts",
    noteRevealed: "Contacts written down! Click any link below:",
    clearBtn: "New note",
    revealAllBtn: "Write instantly ✍️",
    waLabel: "WhatsApp",
    waSub: "Fastest reply · +7 775 938 60 67",
    tgLabel: "Telegram",
    tgSub: "Direct chat · +7 775 938 60 67",
    igLabel: "Instagram",
    igSub: "Reels & behind the scenes (soon)",
    mailLabel: "Email",
    copied: "Copied ✓",
    penTag: "BEIBARYS PEN 0.5mm",
  },
  ru: {
    kicker: "Интерактивный блокнот",
    noteTitle: "Возьми ручку и напиши на стикере",
    noteHint: "Зажми курсор (или просто води ручкой) по жёлтому листочку — на нём пропишутся мои контакты",
    noteHintTouch: "Проведи пальцем с ручкой по жёлтому стикеру — и на нём появятся мои контакты",
    noteRevealed: "Контакты записаны! Нажми, чтобы написать мне:",
    clearBtn: "Чистый лист",
    revealAllBtn: "Записать сразу ✍️",
    waLabel: "WhatsApp",
    waSub: "Отвечаю быстрее всего · 8 775 938 60 67",
    tgLabel: "Telegram",
    tgSub: "Личный чат · 8 775 938 60 67",
    igLabel: "Instagram",
    igSub: "Работы и лайфстайл (скоро)",
    mailLabel: "Почта",
    copied: "Скопировано ✓",
    penTag: "BEIBARYS PEN 0.5mm",
  },
  kk: {
    kicker: "Интерактивті блокнот",
    noteTitle: "Қаламды алып, стикерге жазыңыз",
    noteHint: "Сары парақшаның үстінен қаламмен жүргізіңіз — менің байланыс нөмірлерім жазылады",
    noteHintTouch: "Сары стикердің үстінен саусақпен жүргізіңіз — байланыс нөмірлерім шығады",
    noteRevealed: "Контактілер жазылды! Хабарласу үшін басыңыз:",
    clearBtn: "Жаңа парақ",
    revealAllBtn: "Бірден жазу ✍️",
    waLabel: "WhatsApp",
    waSub: "Ең жылдам жауап · 8 775 938 60 67",
    tgLabel: "Telegram",
    tgSub: "Жеке чат · 8 775 938 60 67",
    igLabel: "Instagram",
    igSub: "Жұмыстар мен сторис (жақында)",
    mailLabel: "Пошта",
    copied: "Көшірілді ✓",
    penTag: "BEIBARYS PEN 0.5mm",
  },
};

export default function Contact() {
  const { t, lang } = useT();
  const c = copy[lang];
  const noteRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Позиция 3D-ручки над стикером
  const [penPos, setPenPos] = useState({ x: 240, y: 65, active: false, down: false });
  const [progress, setProgress] = useState(0); // 0..100% насколько исписали листочек
  const [isTouch, setIsTouch] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const lastPt = useRef<{ x: number; y: number } | null>(null);
  const totalDist = useRef(0);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
  }, []);

  // Инициализация холста для чернил ручки
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = noteRef.current;
    if (!canvas || !host) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = host.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const drawStroke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (lastPt.current) {
      const dx = x - lastPt.current.x;
      const dy = y - lastPt.current.y;
      const d = Math.hypot(dx, dy);
      if (d > 1) {
        ctx.strokeStyle = "rgba(28, 52, 185, 0.55)"; // синяя шариковая ручка
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(lastPt.current.x, lastPt.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        totalDist.current += d;
        const nextProg = Math.min(100, Math.round((totalDist.current / 380) * 100));
        setProgress(nextProg);
      }
    }
    lastPt.current = { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const host = noteRef.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    lastPt.current = { x, y };
    setPenPos({ x, y, active: true, down: true });
    drawStroke(x + 0.5, y + 0.5);
    playClick();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const host = noteRef.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
    setPenPos((p) => ({ x, y, active: inside, down: p.down }));

    // На десктопе пишем даже просто при движении ручкой по стикеру (или с зажатием на телефоне)
    if (inside && (penPos.down || !isTouch)) {
      drawStroke(x, y);
    } else {
      lastPt.current = null;
    }
  };

  const handlePointerUp = () => {
    lastPt.current = null;
    setPenPos((p) => ({ ...p, down: false }));
  };

  const resetNote = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    totalDist.current = 0;
    lastPt.current = null;
    setProgress(0);
    playClick();
  };

  const instantWrite = () => {
    totalDist.current = 420;
    setProgress(100);
    playClick("on");
  };

  const copyText = (key: string, val: string) => {
    navigator.clipboard?.writeText(val).catch(() => {});
    setCopiedKey(key);
    playClick("on");
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const revealed = progress >= 20;
  const fullReveal = Math.min(1, progress / 55);

  return (
    <footer id="contact" className="relative bg-ink text-paper px-6 md:px-[8%] pt-24 pb-12 border-t border-paper/10 overflow-hidden">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent mb-3">{c.kicker}</div>
        <h2 className="text-5xl md:text-8xl tracking-tighter leading-[0.98]">{t.contactTitle}</h2>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-center">
        {/* ЛЕВАЯ КОЛОНКА: Интерактивный стикер + реалистичная ручка */}
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm md:text-base text-paper/75">
              {progress >= 65 ? c.noteRevealed : isTouch ? c.noteHintTouch : c.noteHint}
            </p>
            <div className="flex items-center gap-2">
              {progress < 75 && (
                <button
                  onClick={instantWrite}
                  className="rounded-full bg-accent/20 border border-accent/50 px-3.5 py-1 text-xs font-medium text-paper hover:bg-accent transition-colors"
                >
                  {c.revealAllBtn}
                </button>
              )}
              {progress > 0 && (
                <button
                  onClick={resetNote}
                  className="rounded-full border border-paper/20 px-3 py-1 text-xs text-paper/70 hover:text-paper hover:border-paper/50 transition-colors"
                >
                  {c.clearBtn}
                </button>
              )}
            </div>
          </div>

          {/* Сам жёлтый стикер на рабочем столе */}
          <div
            ref={noteRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => {
              lastPt.current = null;
              setPenPos((p) => ({ ...p, active: false, down: false }));
            }}
            className="relative mx-auto w-full max-w-[540px] min-h-[370px] sm:min-h-[400px] rounded-sm bg-[#FFF3A8] text-[#182038] p-6 sm:p-8 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.75),4px_6px_0_#e2d278] rotate-[-1.2deg] select-none touch-none cursor-crosshair overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(58, 92, 180, 0.16) 31px, rgba(58, 92, 180, 0.16) 32px)",
            }}
          >
            {/* Полупрозрачный кусочек скотча сверху */}
            <div
              className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 h-8 w-32 rotate-[1.5deg] bg-white/45 backdrop-blur-sm border border-white/40 shadow-sm"
              aria-hidden
            />

            {/* Красная вертикальная поля-линия блокнота */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-10 sm:left-12 w-px bg-rose-400/45" aria-hidden />

            {/* Верхняя шапка стикера */}
            <div className="relative z-10 pl-6 sm:pl-8 flex items-center justify-between border-b border-[#182038]/15 pb-2 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#182038]/60">
                NOTE // {site.name.toUpperCase()}
              </span>
              <span className="font-mono text-xs font-bold text-[#1c34b9]">
                {progress}% ✍️
              </span>
            </div>

            {/* Подсказка по центру, пока пользователь ещё не начал водить ручкой */}
            {!revealed && (
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
                <div className="mb-2 text-3xl animate-bounce">🖊️</div>
                <div className="text-lg sm:text-xl font-semibold text-[#182038]/75">
                  {c.noteTitle}
                </div>
                <div className="mt-1 text-xs text-[#182038]/55 max-w-xs">
                  {isTouch ? c.noteHintTouch : c.noteHint}
                </div>
              </div>
            )}

            {/* Проступающие «рукописные» контакты по мере рисования ручкой */}
            <div
              className="relative z-20 pl-6 sm:pl-8 space-y-3.5 transition-all duration-300"
              style={{
                opacity: Math.max(0.12, fullReveal),
                filter: `blur(${Math.max(0, (1 - fullReveal) * 5)}px)`,
                transform: `translateY(${(1 - fullReveal) * 8}px)`,
                pointerEvents: revealed ? "auto" : "none",
              }}
            >
              <div className="text-xs font-mono uppercase tracking-wider text-[#1c34b9]/80">
                ★ {site.name} — Web Designer & Developer (Almaty)
              </div>

              {/* Номер для WhatsApp и Telegram */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-mono bg-[#1c34b9]/10 text-[#1c34b9] px-2 py-0.5 rounded font-semibold">
                  TEL / WA / TG:
                </span>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c34b9] underline decoration-wavy decoration-[#1c34b9]/50 hover:text-accent"
                >
                  8 775 938 60 67
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyText("phone", "+77759386067");
                  }}
                  className="rounded bg-[#182038]/10 hover:bg-[#182038] hover:text-white px-2 py-0.5 text-[11px] font-mono transition-colors"
                >
                  {copiedKey === "phone" ? c.copied : "copy"}
                </button>
              </div>

              {/* Быстрые кнопки прямо на листочке */}
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1FAF5A] text-white px-4 py-1.5 text-xs sm:text-sm font-medium shadow hover:scale-105 transition-transform"
                >
                  <span>💬 WhatsApp</span>
                  <span>↗</span>
                </a>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#229ED9] text-white px-4 py-1.5 text-xs sm:text-sm font-medium shadow hover:scale-105 transition-transform"
                >
                  <span>✈️ Telegram</span>
                  <span>↗</span>
                </a>
                <a
                  href={site.instagram}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-1.5 text-xs sm:text-sm font-medium shadow hover:scale-105 transition-transform"
                >
                  <span>📸 Instagram</span>
                </a>
              </div>

              {/* Почта */}
              <div className="pt-2 border-t border-[#182038]/15 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-mono text-xs text-[#182038]/60">EMAIL:</span>
                <a
                  href={`mailto:${site.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold text-[#1c34b9] underline underline-offset-4"
                >
                  {site.email}
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyText("email", site.email);
                  }}
                  className="rounded bg-[#182038]/10 hover:bg-[#182038] hover:text-white px-2 py-0.5 text-[11px] font-mono transition-colors"
                >
                  {copiedKey === "email" ? c.copied : "copy"}
                </button>
              </div>

              {/* Слоган про LEGO */}
              <div className="pt-2 text-xs italic text-[#182038]/75">
                «🧱 С детства собираю LEGO — а сегодня собираю сайты деталь за деталью»
              </div>
            </div>

            {/* Холст, на котором остаются синие чернила от ручки */}
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            />

            {/* Реалистичная векторная 3D-ручка, которая лежит на листочке и следует за рукой */}
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-30"
              animate={{
                x: penPos.active ? penPos.x : 290,
                y: penPos.active ? penPos.y : 55,
                rotate: penPos.down ? -38 : penPos.active ? -32 : -18,
                scale: penPos.down ? 0.96 : 1,
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.4 }}
            >
              {/* Тень от ручки на бумаге */}
              <div
                className="absolute left-3 top-3 h-4 w-44 rounded-full bg-black/25 blur-md origin-left"
                style={{ transform: "rotate(6deg)" }}
              />
              {/* Корпус дизайнерской ручки (кончик в (0,0)) */}
              <svg
                width="210"
                height="36"
                viewBox="0 0 210 36"
                fill="none"
                className="-translate-y-1/2 origin-left drop-shadow-md"
              >
                {/* Пишущий узел (шарик в 0,18) */}
                <circle cx="2" cy="18" r="2" fill="#1c34b9" />
                {/* Металлический конус */}
                <polygon points="2,18 22,12 22,24" fill="url(#metal)" />
                {/* Синий грип */}
                <rect x="22" y="11" width="32" height="14" rx="2" fill="#3246DF" />
                {/* Основной тёмно-графитовый корпус */}
                <rect x="54" y="10" width="136" height="16" rx="4" fill="#161822" />
                {/* Серебристое колечко */}
                <rect x="52" y="10" width="4" height="16" fill="#D8DCE8" />
                {/* Металлическая клипса */}
                <rect x="135" y="6" width="42" height="3.5" rx="1.5" fill="#D8DCE8" />
                {/* Кнопка на торце */}
                <rect x="190" y="13" width="14" height="10" rx="3" fill="#4B5BFF" />
                {/* Надпись на корпусе */}
                <text x="72" y="21" fill="#9BA3B8" fontSize="6.5" fontFamily="monospace" letterSpacing="1.2">
                  {c.penTag}
                </text>
                <defs>
                  <linearGradient id="metal" x1="2" y1="12" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F3F4F8" />
                    <stop offset="0.5" stopColor="#B8C0D0" />
                    <stop offset="1" stopColor="#6E7685" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Прямые крупные карточки мессенджеров (акцент на WhatsApp, Telegram и Instagram) */}
        <div className="flex flex-col gap-4">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 hover:from-emerald-500 hover:to-emerald-600 p-6 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-2xl text-white shadow-md group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                💬
              </span>
              <div>
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                  {c.waLabel}
                </div>
                <div className="text-xs md:text-sm text-paper/70 group-hover:text-white/90">
                  {c.waSub}
                </div>
              </div>
            </div>
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

          <a
            href={site.telegram}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-sky-400/35 bg-gradient-to-r from-sky-500/20 to-sky-500/5 hover:from-sky-500 hover:to-sky-600 p-6 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-2xl text-white shadow-md group-hover:bg-white group-hover:text-sky-600 transition-colors">
                ✈️
              </span>
              <div>
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                  {c.tgLabel}
                </div>
                <div className="text-xs md:text-sm text-paper/70 group-hover:text-white/90">
                  {c.tgSub}
                </div>
              </div>
            </div>
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

          <a
            href={site.instagram}
            className="group flex items-center justify-between rounded-2xl border border-pink-400/35 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-amber-500/10 hover:from-pink-500 hover:to-amber-500 p-6 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-2xl text-white shadow-md">
                📸
              </span>
              <div>
                <div className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                  {c.igLabel}
                </div>
                <div className="text-xs md:text-sm text-paper/70 group-hover:text-white/90">
                  {c.igSub}
                </div>
              </div>
            </div>
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

          {/* Компактная строка для почты */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-paper/15 bg-paper/[0.03] px-5 py-4 text-sm">
            <span className="text-paper/60">{c.mailLabel}:</span>
            <a
              href={`mailto:${site.email}`}
              data-copy={site.email}
              className="font-mono text-base text-paper underline decoration-paper/30 underline-offset-4 hover:decoration-accent"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-paper/10 flex flex-wrap justify-between gap-4 text-sm text-paper/60">
        <div className="flex gap-6">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-paper">
              {s.label}
            </a>
          ))}
        </div>
        <div>
          © {new Date().getFullYear()} {site.name}. {t.rights}
        </div>
      </div>
    </footer>
  );
}
