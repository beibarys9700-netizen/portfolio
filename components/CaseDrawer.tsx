"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, Project, Lang } from "@/lib/content";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";
import { playClick } from "@/lib/sound";

const drawerCopy: Record<
  Lang,
  {
    aboutProject: string;
    stackTitle: string;
    highlightsTitle: string;
    screensTitle: string;
    demoTitle: string;
    demoSub: string;
    livePreviewTitle: string;
    interactHint: string;
  }
> = {
  en: {
    aboutProject: "Project Overview",
    stackTitle: "Tech & Deliverables",
    highlightsTitle: "Key Features",
    screensTitle: "Key Screens & Visuals",
    demoTitle: "Interactive Micro-Demo",
    demoSub: "Try clicking inside the mini-widget below to feel the interaction:",
    livePreviewTitle: "Live Interactive Site",
    interactHint: "You can scroll & click inside this live window",
  },
  ru: {
    aboutProject: "О проекте",
    stackTitle: "Стек и задачи",
    highlightsTitle: "Ключевые фишки",
    screensTitle: "Скрины и ключевые экраны",
    demoTitle: "Мини-видео / Интерактив проекта",
    demoSub: "Попробуй понажимать прямо внутри мини-сцены ниже:",
    livePreviewTitle: "Живое превью сайта",
    interactHint: "Внутри окна можно скроллить и нажимать",
  },
  kk: {
    aboutProject: "Жоба туралы",
    stackTitle: "Стек және міндеттер",
    highlightsTitle: "Негізгі ерекшеліктер",
    screensTitle: "Негізгі экрандар мен скриндер",
    demoTitle: "Интерактивті мини-демо",
    demoSub: "Төмендегі мини-сахнаның ішінде басып көріңіз:",
    livePreviewTitle: "Сайттың тірі превьюі",
    interactHint: "Терезенің ішінде скролл жасап, басуға болады",
  },
};

// Интерактивное мини-превью механики проекта (работает мгновенно как живое демо-видео + кликабельно)
function MiniInteractiveDemo({ p, lang }: { p: Project; lang: Lang }) {
  const isNomadique = p.slug === "project-one";
  const [bagColor, setBagColor] = useState(0);
  const [bagAdded, setBagAdded] = useState(false);
  const [area, setArea] = useState(65);
  const [cleanType, setCleanType] = useState<"std" | "deep">("std");

  if (isNomadique) {
    const swatches = [
      { name: "Espresso Suede", hex: "#4E382C", price: "48 000 ₸" },
      { name: "Sand Canvas", hex: "#C8B496", price: "44 000 ₸" },
      { name: "Obsidian Leather", hex: "#1B1B20", price: "52 000 ₸" },
    ];
    const cur = swatches[bagColor];
    return (
      <div className="relative overflow-hidden rounded-2xl border border-paper/15 bg-[#161413] p-5 text-white shadow-xl">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/55 mb-4">
          <span>● REC // NOMADIQUE LOOKBOOK INTERACTION</span>
          <span>60 FPS</span>
        </div>

        <div className="grid sm:grid-cols-[1fr_1.15fr] gap-5 items-center">
          {/* Анимированная карточка сумки */}
          <motion.div
            key={bagColor}
            initial={{ scale: 0.94, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="relative aspect-[4/3] rounded-xl flex items-center justify-center overflow-hidden border border-white/15"
            style={{ background: `radial-gradient(circle at 30% 25%, ${cur.hex}, #0d0c0c 85%)` }}
          >
            {/* Силуэт дизайнерской сумки-тоут */}
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex flex-col items-center"
            >
              <div className="h-7 w-14 rounded-t-full border-4 border-b-0 border-[#e5d5be]" />
              <div
                className="h-24 w-32 rounded-lg shadow-2xl border border-white/25 flex items-end justify-between p-2.5"
                style={{ backgroundColor: cur.hex }}
              >
                <span className="text-[9px] font-mono tracking-widest uppercase text-white/80">NOMADIQUE</span>
                <span className="h-4 w-2 rounded-sm bg-[#e5d5be]" />
              </div>
            </motion.div>
            <span className="absolute left-3 top-3 rounded-full bg-black/45 backdrop-blur px-2.5 py-0.5 text-[10px]">
              NEW COLLECTION
            </span>
          </motion.div>

          {/* Панель выбора цвета и быстрой покупки */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider text-white/50">The Atelier Tote</div>
            <div className="flex items-baseline justify-between">
              <div className="text-xl font-medium">{cur.name}</div>
              <div className="text-lg font-mono text-[#e5d5be]">{cur.price}</div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              {swatches.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => {
                    setBagColor(idx);
                    setBagAdded(false);
                    playClick();
                  }}
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${
                    bagColor === idx ? "scale-110 border-white" : "border-white/25 opacity-70"
                  }`}
                  style={{ backgroundColor: s.hex }}
                  aria-label={s.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setBagAdded(!bagAdded);
                playClick("on");
              }}
              className={`mt-2 w-full rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                bagAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-black hover:bg-[#e5d5be]"
              }`}
            >
              {bagAdded
                ? lang === "ru"
                  ? "✓ Добавлено в заказ WhatsApp"
                  : lang === "kk"
                  ? "✓ WhatsApp тапсырысқа қосылды"
                  : "✓ Added to WhatsApp Order"
                : lang === "ru"
                ? "Добавить в корзину →"
                : lang === "kk"
                ? "Себетке қосу →"
                : "Add to Bag →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Мини-интерактив для Green Clean: живой калькулятор площади и тарифа
  const rate = cleanType === "std" ? 450 : 750;
  const total = (area * rate).toLocaleString("ru-RU");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-400/25 bg-[#0c1d15] p-5 text-white shadow-xl">
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-emerald-300/70 mb-4">
        <span>● REC // GREEN CLEAN LIVE CALCULATOR</span>
        <span>INTERACTIVE</span>
      </div>

      <div className="grid sm:grid-cols-[1.1fr_0.9fr] gap-5 items-center">
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setCleanType("std");
                playClick();
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                cleanType === "std" ? "bg-emerald-500 text-black font-semibold" : "bg-white/10 text-white/75"
              }`}
            >
              {lang === "ru" ? "Поддерживающая" : lang === "kk" ? "Күнделікті" : "Standard"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCleanType("deep");
                playClick();
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                cleanType === "deep" ? "bg-emerald-500 text-black font-semibold" : "bg-white/10 text-white/75"
              }`}
            >
              {lang === "ru" ? "Генеральная" : lang === "kk" ? "Күрделі" : "Deep Clean"}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/75 mb-1">
              <span>{lang === "ru" ? "Площадь квартиры" : lang === "kk" ? "Пәтер аумағы" : "Apartment area"}</span>
              <span className="font-mono font-bold text-emerald-300">{area} м²</span>
            </div>
            <input
              type="range"
              min={30}
              max={160}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="rounded-xl bg-black/35 border border-emerald-400/25 p-4 text-center">
          <div className="text-[11px] uppercase tracking-wider text-white/55">
            {lang === "ru" ? "Итоговая оценка" : lang === "kk" ? "Жалпы бағасы" : "Estimated Total"}
          </div>
          <div className="mt-1 text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">
            {total} ₸
          </div>
          <div className="mt-1 text-[11px] text-white/50">ECO- средства включены ✓</div>
        </div>
      </div>
    </div>
  );
}

// Галерея скринов / ключевых экранов проекта + живое окно
export default function CaseDrawer({ index, onClose }: { index: number | null; onClose: () => void }) {
  const { lang, t } = useT();
  const ui = uiDict[lang];
  const dc = drawerCopy[lang];
  const [mode, setMode] = useState<"mobile" | "desktop">("mobile");
  const [activeScreen, setActiveScreen] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const p = index !== null ? projects[index] : null;

  useEffect(() => {
    setLoaded(false);
    setActiveScreen(0);
  }, [index, mode]);

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
          <motion.div
            key="bg"
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            data-lenis-prevent
            className="fixed right-0 top-0 z-[95] h-full w-full overflow-y-auto bg-ink text-paper md:w-[min(820px,94vw)] border-l border-paper/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Шапка кейса */}
            <div className="sticky top-0 z-30 flex items-center justify-between bg-ink/90 px-5 py-4 backdrop-blur-md md:px-10 border-b border-paper/10">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-paper/50">
                  {ui.caseLabel} · 0{(index ?? 0) + 1} · {p.year}
                </div>
                <div className="text-2xl font-medium tracking-tight md:text-4xl">{p.title}</div>
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white hover:bg-paper hover:text-ink transition-colors"
                >
                  <span>{ui.openLive}</span>
                </a>
                <button
                  onClick={onClose}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/30 text-lg transition-colors hover:bg-accent hover:border-accent"
                  aria-label={ui.close}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-5 md:px-10 py-7 space-y-10">
              {/* 1. КРАТКОЕ ОПИСАНИЕ ПРОЕКТА И СТЕК */}
              <div className="grid md:grid-cols-[1.35fr_0.9fr] gap-6 rounded-2xl border border-paper/10 bg-paper/[0.03] p-5 md:p-6">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">
                    {dc.aboutProject}
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-paper/85">
                    {p.summary[lang]}
                  </p>
                  {/* Список фишек */}
                  <div className="mt-4 space-y-1.5">
                    {p.highlights[lang].map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs md:text-sm text-paper/75">
                        <span className="text-accent">✦</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-paper/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-paper/50 mb-2.5">
                      {dc.stackTitle}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-paper/20 bg-paper/5 px-3 py-1 text-xs text-paper/85"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-paper/50">
                    {t.categories[(index ?? 0) % t.categories.length]}
                  </div>
                </div>
              </div>

              {/* 2. МИНИ-ВИДЕО / ИНТЕРАКТИВНОЕ ДЕМО */}
              <div>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-lg md:text-xl font-medium tracking-tight">{dc.demoTitle}</div>
                  <div className="text-xs text-paper/55">{dc.demoSub}</div>
                </div>
                <MiniInteractiveDemo p={p} lang={lang} />
              </div>

              {/* 3. СКРИНЫ / КЛЮЧЕВЫЕ ЭКРАНЫ ПРОЕКТА */}
              <div>
                <div className="text-lg md:text-xl font-medium tracking-tight mb-3">{dc.screensTitle}</div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {p.screens.map((sc, idx) => (
                    <button
                      key={sc.badge}
                      type="button"
                      onClick={() => {
                        setActiveScreen(idx);
                        playClick();
                      }}
                      className={`group text-left rounded-2xl border p-3.5 transition-all ${
                        activeScreen === idx
                          ? "border-accent bg-accent/10 shadow-lg"
                          : "border-paper/15 bg-paper/[0.02] hover:border-paper/35"
                      }`}
                    >
                      <div
                        className="relative h-28 w-full rounded-xl overflow-hidden mb-3 flex flex-col justify-between p-3 border border-white/10"
                        style={{ background: sc.bg }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-black/45 px-2 py-0.5 text-[9px] font-mono tracking-wider text-white/90">
                            {sc.badge}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-white/70" />
                        </div>
                        {/* Мини-мокап интерфейса внутри карточки скрина */}
                        <div className="space-y-1">
                          <div className="h-2 w-2/3 rounded bg-white/80" />
                          <div className="h-1.5 w-1/2 rounded bg-white/45" />
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-paper">{sc.label[lang]}</div>
                      <div className="mt-1 text-[11px] leading-snug text-paper/65">{sc.caption[lang]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. ЖИВОЕ ОКНО САЙТА (Мобайл / Десктоп) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="text-lg md:text-xl font-medium tracking-tight">{dc.livePreviewTitle}</div>
                    <div className="text-xs text-paper/55">{dc.interactHint}</div>
                  </div>
                  <div className="inline-flex rounded-full border border-paper/20 p-1 text-xs">
                    {(["mobile", "desktop"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`rounded-full px-4 py-1.5 transition-colors ${
                          mode === m ? "bg-paper text-ink font-medium" : "text-paper/60 hover:text-paper"
                        }`}
                      >
                        {m === "mobile" ? ui.mobile : ui.desktop}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center py-2">
                  {mode === "mobile" ? (
                    <div
                      className="relative overflow-hidden bg-black shadow-[0_30px_70px_-15px_rgba(0,0,0,.75)] rounded-[38px] border-[7px] border-[#222228] mx-auto"
                      style={{ width: "min(310px, 82vw)", height: "min(580px, 148vw)" }}
                    >
                      <div className="absolute left-1/2 top-2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
                      <div className="relative w-full h-full overflow-hidden">
                        <div
                          className="absolute inset-0 flex items-end p-5 text-2xl text-white"
                          style={{ background: `linear-gradient(135deg, ${p.color}, #16151A)` }}
                        >
                          {!loaded && p.title}
                        </div>
                        <iframe
                          key={`${p.url}-mobile`}
                          src={p.url}
                          title={p.title}
                          loading="lazy"
                          onLoad={() => setLoaded(true)}
                          className="absolute inset-0 h-full w-full border-0 bg-white"
                          style={{ opacity: loaded ? 1 : 0, transition: "opacity .5s" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden bg-black shadow-[0_40px_90px_-20px_rgba(0,0,0,.65)] rounded-xl border border-white/15 w-full aspect-[16/10]">
                      <div className="flex h-7 items-center gap-1.5 bg-[#222226] px-3">
                        <i className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                        <i className="h-2 w-2 rounded-full bg-[#febc2e]" />
                        <i className="h-2 w-2 rounded-full bg-[#28c840]" />
                        <span className="ml-3 truncate rounded bg-black/40 px-3 py-0.5 text-[10px] text-white/50">
                          {p.url.replace("https://", "")}
                        </span>
                      </div>
                      <div className="relative w-full h-[calc(100%-28px)] overflow-hidden">
                        <div
                          className="absolute inset-0 flex items-end p-5 text-xl text-white"
                          style={{ background: `linear-gradient(135deg, ${p.color}, #16151A)` }}
                        >
                          {!loaded && p.title}
                        </div>
                        <iframe
                          key={`${p.url}-desktop`}
                          src={p.url}
                          title={p.title}
                          loading="lazy"
                          onLoad={() => setLoaded(true)}
                          className="absolute inset-0 h-full w-full border-0 bg-white"
                          style={{ opacity: loaded ? 1 : 0, transition: "opacity .5s" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Нижняя CTA-кнопка перехода на живой сайт */}
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                data-cursor={ui.openLive}
                className="flex items-center justify-center gap-3 rounded-full bg-accent px-6 py-4 text-base md:text-lg font-medium transition-colors hover:bg-paper hover:text-ink text-white shadow-lg"
              >
                <span>{ui.openLive}</span>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
