"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useT } from "./Providers";
import { aboutDict, tools } from "@/lib/about";
import { site, Lang } from "@/lib/content";
import { playClick } from "@/lib/sound";

// Классические 3D-рамки в стиле Windows 98 / Retro Creative OS
const winBox =
  "bg-[#C0C0C0] text-[#0b0b0e] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#2b2b2b] border-b-[#2b2b2b] shadow-[4px_4px_0_rgba(0,0,0,0.45)]";
const winInset =
  "bg-white text-[#0b0b0e] border-2 border-t-[#555555] border-l-[#555555] border-r-[#FFFFFF] border-b-[#FFFFFF]";
const winBtn =
  "bg-[#C0C0C0] text-[#0b0b0e] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#2b2b2b] border-b-[#2b2b2b] active:border-t-[#2b2b2b] active:border-l-[#2b2b2b] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF] active:translate-y-[1px] px-3 py-1 text-xs font-mono font-bold select-none";

const osCopy: Record<
  Lang,
  {
    osTitle: string;
    startBtn: string;
    backHome: string;
    winBio: string;
    winStats: string;
    winGallery: string;
    winLego: string;
    winSkills: string;
    winProcess: string;
    winMessenger: string;
    roleBadge: string;
    sloganTitle: string;
    sloganSub: string;
    legoHint: string;
    legoClear: string;
    galleryHint: string;
    photos: { title: string; tag: string; caption: string }[];
    writeWa: string;
    writeTg: string;
  }
> = {
  en: {
    osTitle: "BEIBARYS_OS v98.26 // CREATIVE DESKTOP",
    startBtn: "Start",
    backHome: "← Exit to Portfolio",
    winBio: "C:\\BEIBARYS\\ABOUT_ME.EXE",
    winStats: "TASK_MANAGER // STATS.SYS",
    winGallery: "PHOTO_VIEWER.EXE — Interactive Polaroid Stack",
    winLego: "LEGO_BUILDER_98.EXE — Click grid to place bricks",
    winSkills: "SERVICES_AND_STACK.DLL",
    winProcess: "WORKFLOW_PIPELINE.BAT",
    winMessenger: "MESSENGER_DIRECT.EXE",
    roleBadge: "LVL 99 · WEB DESIGNER & FRONTEND DEVELOPER",
    sloganTitle: "Building LEGO since childhood —",
    sloganSub: "today I assemble high-converting websites the exact same way: brick by brick, pixel by pixel, until every detail clicks.",
    legoHint: "Click any cell to snap a LEGO brick!",
    legoClear: "Clear board",
    galleryHint: "Click or tap cards to shuffle the Polaroid stack · Choose view mode:",
    photos: [
      { title: "BEIBARYS_PORTRAIT.PNG", tag: "FOUNDER / ALMATY", caption: "Beibarys — Web Designer & Frontend Developer" },
      { title: "LEGO_ARCHITECT.BMP", tag: "SINCE CHILDHOOD", caption: "Every great interface starts with modular building blocks" },
      { title: "GOLDEN_HOUR_HILL.JPG", tag: "AESTHETICS", caption: "Atmospheric visuals, 3D motion & memorable art direction" },
      { title: "ORIGINAL_SHOT.JPG", tag: "ARCHIVE_2026", caption: "Behind the scenes — crafting websites that launch in days" },
    ],
    writeWa: "WhatsApp (8 775 938 60 67)",
    writeTg: "Telegram (8 775 938 60 67)",
  },
  ru: {
    osTitle: "BEIBARYS_OS v98.26 // КРЕАТИВНЫЙ РАБОЧИЙ СТОЛ",
    startBtn: "Пуск",
    backHome: "← На главную",
    winBio: "C:\\BEIBARYS\\ОБО_МНЕ.EXE",
    winStats: "ДИСПЕТЧЕР_ОПЫТА // STATS.SYS",
    winGallery: "ФОТО_ГАЛЕРЕЯ.EXE — Интерактивная колода кадров",
    winLego: "LEGO_КОНСТРУКТОР_98.EXE — Нажимай на клетки и строй из кубиков",
    winSkills: "ЧЕМ_ЗАНИМАЮСЬ.DLL",
    winProcess: " ПРОЦЕСС_РАБОТЫ.BAT",
    winMessenger: "ПРЯМАЯ_СВЯЗЬ.EXE",
    roleBadge: "LVL 99 · ВЕБ-ДИЗАЙНЕР И РАЗРАБОТЧИК",
    sloganTitle: "С детства собираю LEGO —",
    sloganSub: "а сегодня точно так же собираю сильные сайты и цифровые каталоги: деталь за деталью, пиксель к пикселю, пока всё не встанет идеально.",
    legoHint: "Нажимай на поле, чтобы ставить цветные кубики LEGO!",
    legoClear: "Очистить поле",
    galleryHint: "Нажимай на карточки, чтобы листать стопку Polaroid · Или переключи режим:",
    photos: [
      { title: "BEIBARYS_PORTRAIT.PNG", tag: "АЛМАТЫ / KZ", caption: "Бейбарыс — веб-дизайнер и фронтенд-разработчик" },
      { title: "LEGO_AVATAR.PNG", tag: "С ДЕТСТВА С LEGO", caption: "Любой сложный проект складывается из продуманных деталей" },
      { title: "STUDIO_HILL.JPG", tag: "АТМОСФЕРА", caption: "Дизайнерский визуал, 3D и плавные микроанимации" },
      { title: "ORIGINAL_ARCHIVE.JPG", tag: "АРХИВ_2026", caption: "Запуск сайтов и каталогов за дни, а не месяцы" },
    ],
    writeWa: "Написать в WhatsApp (8 775 938 60 67)",
    writeTg: "Написать в Telegram (8 775 938 60 67)",
  },
  kk: {
    osTitle: "BEIBARYS_OS v98.26 // КРЕАТИВТІ ЖҰМЫС ҮСТЕЛІ",
    startBtn: "Бастау",
    backHome: "← Басты бетке",
    winBio: "C:\\BEIBARYS\\МЕН_ТУРАЛЫ.EXE",
    winStats: "ТӘЖІРИБЕ_ДИСПЕТЧЕРІ // STATS.SYS",
    winGallery: "ФОТО_ГАЛЕРЕЯ.EXE — Интерактивті Polaroid карталары",
    winLego: "LEGO_КОНСТРУКТОР_98.EXE — Торды басып, LEGO текшелерін қойыңыз",
    winSkills: "НЕМЕН_АЙНАЛЫСАМЫН.DLL",
    winProcess: "ЖҰМЫС_ПРОЦЕСІ.BAT",
    winMessenger: "ТІКЕЛЕЙ_БАЙЛАНЫС.EXE",
    roleBadge: "LVL 99 · ВЕБ-ДИЗАЙНЕР ЖӘНЕ ӘЗІРЛЕУШІ",
    sloganTitle: "Бала кезімнен LEGO жинаймын —",
    sloganSub: "бүгінде сайттар мен цифрлық каталогтарды да дәл солай құрастырамын: бөлшектен бөлшекке, пиксельден пиксельге, әр деталь өз орнына түскенше.",
    legoHint: "Түрлі-түсті LEGO текшелерін қою үшін торды басыңыз!",
    legoClear: "Тазалау",
    galleryHint: "Polaroid карталарын ауыстыру үшін басыңыз:",
    photos: [
      { title: "BEIBARYS_PORTRAIT.PNG", tag: "АЛМАТЫ / KZ", caption: "Бейбарыс — веб-дизайнер және фронтенд-әзірлеуші" },
      { title: "LEGO_AVATAR.PNG", tag: "БАЛА КЕЗДЕН LEGO", caption: "Кез келген мықты интерфейс ұқыпты бөлшектерден тұрады" },
      { title: "STUDIO_HILL.JPG", tag: "АТМОСФЕРА", caption: "Дизайнерлік визуал, 3D және тегіс анимациялар" },
      { title: "ORIGINAL_ARCHIVE.JPG", tag: "МҰРАҒАТ_2026", caption: "Сайттар мен каталогтарды санаулы күнде іске қосу" },
    ],
    writeWa: "WhatsApp-қа жазу (8 775 938 60 67)",
    writeTg: "Telegram-ға жазу (8 775 938 60 67)",
  },
};

// Шапка окна Windows 98
function WinBar({ title, accent = "from-[#000080] to-[#1084d0]" }: { title: string; accent?: string }) {
  return (
    <div className={`flex items-center justify-between bg-gradient-to-r ${accent} px-2.5 py-1.5 text-white select-none`}>
      <div className="flex items-center gap-2 truncate font-mono text-xs font-bold tracking-wide">
        <span className="inline-block h-3 w-3 bg-[#FFF3A8] border border-black" />
        <span className="truncate">{title}</span>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="flex h-4 w-4 items-center justify-center bg-[#C0C0C0] text-[10px] font-bold text-black border border-t-white border-l-white border-r-black border-b-black">
          _
        </span>
        <span className="flex h-4 w-4 items-center justify-center bg-[#C0C0C0] text-[10px] font-bold text-black border border-t-white border-l-white border-r-black border-b-black">
          □
        </span>
        <span className="flex h-4 w-4 items-center justify-center bg-[#C0C0C0] text-[10px] font-bold text-black border border-t-white border-l-white border-r-black border-b-black">
          ×
        </span>
      </div>
    </div>
  );
}

// Интерактивный мини-конструктор LEGO прямо внутри окна About
const LEGO_COLORS = ["#E83828", "#4B5BFF", "#F5C518", "#1FAF5A", "#FF8A2B"];

function LegoMiniBuilder({ hint, clearLabel }: { hint: string; clearLabel: string }) {
  // 8x5 сетка с предзаполненным пиксельным сердечком/кубиками LEGO
  const initial = [
    0, 1, 1, 0, 0, 2, 2, 0,
    1, 1, 1, 1, 2, 2, 2, 2,
    0, 3, 3, 3, 3, 3, 3, 0,
    0, 0, 4, 4, 4, 4, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
  ];
  const [grid, setGrid] = useState<number[]>(initial);
  const [colorIdx, setColorIdx] = useState(0);

  const toggleCell = (idx: number) => {
    playClick();
    setGrid((g) => {
      const next = [...g];
      next[idx] = next[idx] === colorIdx + 1 ? 0 : colorIdx + 1;
      return next;
    });
  };

  return (
    <div className="p-3 sm:p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span>🧱 {hint}</span>
        <button
          type="button"
          onClick={() => {
            setGrid(Array(40).fill(0));
            playClick();
          }}
          className={winBtn}
        >
          {clearLabel}
        </button>
      </div>

      {/* Выбор цвета кубика */}
      <div className="flex items-center gap-2">
        {LEGO_COLORS.map((hex, i) => (
          <button
            key={hex}
            type="button"
            onClick={() => {
              setColorIdx(i);
              playClick();
            }}
            className={`h-7 w-10 rounded-sm border-2 transition-transform flex items-center justify-center ${
              colorIdx === i ? "scale-110 border-black shadow" : "border-black/30 opacity-75"
            }`}
            style={{ backgroundColor: hex }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-white/40 border border-black/30" />
          </button>
        ))}
      </div>

      {/* Поле 8x5 с пинами LEGO */}
      <div className={`${winInset} bg-[#1c222e] p-2.5 grid grid-cols-8 gap-1.5`}>
        {grid.map((val, idx) => {
          const bg = val > 0 ? LEGO_COLORS[(val - 1) % LEGO_COLORS.length] : "rgba(255,255,255,0.06)";
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleCell(idx)}
              className="aspect-square rounded-[3px] border border-black/40 flex items-center justify-center transition-transform active:scale-90"
              style={{
                backgroundColor: bg,
                boxShadow: val > 0 ? "inset 0 2px 0 rgba(255,255,255,0.45), 0 2px 0 rgba(0,0,0,0.45)" : undefined,
              }}
            >
              {/* Круглый пупырышек LEGO (stud) */}
              <span
                className="h-2/5 w-2/5 rounded-full border border-black/35"
                style={{
                  backgroundColor: val > 0 ? bg : "rgba(255,255,255,0.08)",
                  boxShadow: val > 0 ? "inset 0 1px 0 rgba(255,255,255,0.5)" : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Необычная интерактивная фотогалерея (режим 3D-стопки Polaroid + режим сетки альбома)
const GALLERY_IMAGES = ["/me.png", "/lego.png", "/hill-bg.jpg", "/lego-raw.jpg"];

function RetroPhotoGallery({
  items,
  hint,
}: {
  items: { title: string; tag: string; caption: string }[];
  hint: string;
}) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<"deck" | "grid">("deck");

  const nextCard = () => {
    playClick();
    setActive((a) => (a + 1) % items.length);
  };

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-[#222]">{hint}</p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setView("deck");
              playClick();
            }}
            className={`${winBtn} ${view === "deck" ? "!bg-[#000080] !text-white" : ""}`}
          >
            🃏 3D Stack
          </button>
          <button
            type="button"
            onClick={() => {
              setView("grid");
              playClick();
            }}
            className={`${winBtn} ${view === "grid" ? "!bg-[#000080] !text-white" : ""}`}
          >
            ⊞ Film Grid
          </button>
        </div>
      </div>

      {view === "deck" ? (
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center py-4">
          {/* Интерактивная веерная стопка Polaroid-карточек */}
          <div
            onClick={nextCard}
            className="relative mx-auto h-[340px] sm:h-[380px] w-full max-w-[340px] cursor-pointer select-none"
          >
            {items.map((it, idx) => {
              const offset = (idx - active + items.length) % items.length;
              const isTop = offset === 0;
              return (
                <motion.div
                  key={it.title}
                  animate={{
                    rotate: isTop ? -2 : offset === 1 ? 6 : offset === 2 ? -8 : 11,
                    x: isTop ? 0 : offset === 1 ? 18 : offset === 2 ? -16 : 8,
                    y: isTop ? 0 : offset * 10,
                    scale: isTop ? 1 : 1 - offset * 0.05,
                    zIndex: items.length - offset,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="absolute inset-0 rounded-sm bg-[#FAF8F2] p-3 pb-12 shadow-[0_20px_45px_rgba(0,0,0,0.45)] border border-black/30 flex flex-col justify-between"
                >
                  <div className="relative h-full w-full overflow-hidden bg-[#181920] border border-black/20 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={GALLERY_IMAGES[idx % GALLERY_IMAGES.length]}
                      alt={it.title}
                      draggable={false}
                      className="h-full w-full object-contain"
                    />
                    <span className="absolute left-2 top-2 bg-[#000080] text-white font-mono text-[10px] px-2 py-0.5">
                      {it.tag}
                    </span>
                  </div>
                  <div className="pt-2.5 flex items-center justify-between font-mono text-xs text-black">
                    <span className="font-bold truncate">{it.title}</span>
                    <span className="text-[10px] opacity-60">0{idx + 1}/04 ↻</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Описание выбранного кадра + переключатели */}
          <div className={`${winInset} p-4 space-y-4`}>
            <div className="font-mono text-xs text-[#000080] font-bold">
              FILE_0{active + 1}: {items[active].title}
            </div>
            <p className="text-base sm:text-lg font-medium leading-snug text-[#111]">
              {items[active].caption}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {items.map((it, idx) => (
                <button
                  key={it.title}
                  type="button"
                  onClick={() => {
                    setActive(idx);
                    playClick();
                  }}
                  className={`${winBtn} ${active === idx ? "!bg-[#4B5BFF] !text-white" : ""}`}
                >
                  0{idx + 1}
                </button>
              ))}
              <button type="button" onClick={nextCard} className={winBtn}>
                Next Photo ▶
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Режим раскадровки / плёнки */
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, idx) => (
            <div key={it.title} className="bg-[#FAF8F2] p-2.5 border-2 border-black shadow-md">
              <div className="relative aspect-[4/4] w-full overflow-hidden bg-[#181920] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={GALLERY_IMAGES[idx % GALLERY_IMAGES.length]}
                  alt={it.title}
                  className="h-full w-full object-contain"
                />
                <span className="absolute left-2 top-2 bg-black/75 text-white font-mono text-[9px] px-1.5 py-0.5">
                  {it.tag}
                </span>
              </div>
              <div className="mt-2 font-mono text-[11px] font-bold text-black">{it.title}</div>
              <div className="mt-0.5 text-xs text-black/75 leading-snug">{it.caption}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  const { lang } = useT();
  const a = aboutDict[lang];
  const os = osCopy[lang];
  const [clock, setClock] = useState("19:30");

  useEffect(() => {
    const u = () => {
      const d = new Date();
      setClock(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    u();
    const id = setInterval(u, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-[#008080] text-[#0b0b0e] pt-24 pb-20 px-3 sm:px-6 md:px-[6%] overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(180deg, #007878 0%, #005858 100%)",
        backgroundSize: "24px 24px, 100% 100%",
      }}
    >
      {/* Верхняя панель быстрого возврата и статуса системы */}
      <div className="mx-auto max-w-6xl mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className={`${winBtn} inline-flex items-center gap-2 text-xs sm:text-sm`}>
          {os.backHome}
        </Link>
        <div className="font-mono text-xs text-white/90 bg-black/35 px-3 py-1 border border-white/25">
          🖥️ {os.osTitle}
        </div>
      </div>

      {/* СЕТКА ОКОН РАБОЧЕГО СТОЛА BEIBARYS_OS */}
      <div className="mx-auto max-w-6xl space-y-6">
        {/* РЯД 1: ГЛАВНОЕ ОКНО ОБО МНЕ + МИНИ-КОНСТРУКТОР LEGO */}
        <div className="grid lg:grid-cols-[1.25fr_0.85fr] gap-6 items-start">
          {/* Окно 1: Профиль игрока / дизайнера */}
          <div className={winBox}>
            <WinBar title={os.winBio} />
            <div className="p-4 sm:p-6 space-y-5">
              <div className="grid sm:grid-cols-[150px_1fr] gap-5 items-center">
                {/* Пиксельная/ретро рамка с аватаром */}
                <div className={`${winInset} relative aspect-square bg-[#181c26] overflow-hidden flex items-end justify-center`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/me.png" alt="Beibarys" className="h-[96%] w-auto object-contain" />
                  <span className="absolute bottom-1 right-1 bg-[#1FAF5A] text-white font-mono text-[9px] px-1.5 py-0.5">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="inline-block bg-[#000080] text-white font-mono text-[10px] sm:text-xs px-2.5 py-1 font-bold">
                    {os.roleBadge}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
                    {a.heroLines.join(" ")}
                  </h1>
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span key={t} className="bg-white border border-black/40 px-2 py-0.5 font-mono text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Основной текст */}
              <div className={`${winInset} p-4 text-sm sm:text-base leading-relaxed`}>
                {a.lead}
              </div>

              {/* Фирменный слоган про LEGO с детства */}
              <div className="bg-[#FFF3A8] border-2 border-black p-4 shadow-[3px_3px_0_#000]">
                <div className="font-mono text-xs font-bold uppercase text-[#1c34b9] mb-1">
                  🧱 LEGO PHILOSOPHY // SLOGAN.TXT
                </div>
                <div className="text-base sm:text-lg font-bold text-[#111]">{os.sloganTitle}</div>
                <p className="mt-1 text-xs sm:text-sm text-[#222] leading-relaxed">{os.sloganSub}</p>
              </div>
            </div>
          </div>

          {/* Окно 2: Интерактивный LEGO-конструктор + Статистика (3+ года опыта) */}
          <div className="space-y-6">
            <div className={winBox}>
              <WinBar title={os.winStats} accent="from-[#2E9E5B] to-[#12A4A0]" />
              <div className="p-4 grid grid-cols-2 gap-3">
                {a.stats.map((s, i) => (
                  <div key={i} className={`${winInset} p-3`}>
                    <div className="font-mono text-3xl sm:text-4xl font-bold text-[#000080]">
                      {s.n}
                      {s.suffix}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-[#333] uppercase">{s.label}</div>
                    {/* Ретро прогресс-бар */}
                    <div className="mt-2 h-2 w-full bg-[#ddd] border border-black/40 overflow-hidden flex gap-0.5 p-0.5">
                      {Array.from({ length: 8 }).map((_, b) => (
                        <span key={b} className="flex-1 bg-[#000080]" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={winBox}>
              <WinBar title={os.winLego} accent="from-[#E83828] to-[#FF8A2B]" />
              <LegoMiniBuilder hint={os.legoHint} clearLabel={os.legoClear} />
            </div>
          </div>
        </div>

        {/* РЯД 2: ИНТЕРАКТИВНАЯ ФОТОГАЛЕРЕЯ (3D POLAROID STACK + FILM GRID) */}
        <div className={winBox}>
          <WinBar title={os.winGallery} accent="from-[#4B5BFF] to-[#8A5CF5]" />
          <RetroPhotoGallery items={os.photos} hint={os.galleryHint} />
        </div>

        {/* РЯД 3: ЧЕМ ЗАНИМАЮСЬ + СТЕК */}
        <div className={winBox}>
          <WinBar title={os.winSkills} />
          <div className="p-4 sm:p-6 space-y-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {a.doItems.map((d, i) => (
                <div key={i} className={`${winInset} p-4 flex flex-col justify-between`}>
                  <div className="font-mono text-xs font-bold text-[#4B5BFF] mb-2">MODULE_0{i + 1}.EXE</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1.5">{d.title}</h3>
                    <p className="text-xs sm:text-sm text-[#333] leading-relaxed">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Панель инструментов */}
            <div className="border-t border-black/25 pt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase mr-2">{a.toolsTitle}:</span>
              {tools.map((t) => (
                <span key={t} className={winBtn}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* РЯД 4: КАК МЫ РАБОТАЕМ + БЫСТРАЯ СВЯЗЬ В WHATSAPP / TELEGRAM */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className={winBox}>
            <WinBar title={os.winProcess} />
            <div className="p-4 sm:p-6 grid sm:grid-cols-4 gap-3">
              {a.process.map((s, i) => (
                <div key={i} className={`${winInset} p-3.5`}>
                  <div className="font-mono text-xs font-bold bg-[#000080] text-white inline-block px-2 py-0.5 mb-2">
                    STEP 0{i + 1}
                  </div>
                  <div className="font-bold text-base mb-1">{s.title}</div>
                  <div className="text-xs text-[#333] leading-relaxed">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={winBox}>
            <WinBar title={os.winMessenger} accent="from-[#1FAF5A] to-[#000080]" />
            <div className="p-4 sm:p-5 space-y-3">
              <div className="font-bold text-lg">{a.ctaTitle}</div>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-[#1FAF5A] text-white font-mono text-xs sm:text-sm font-bold px-4 py-3 border-2 border-black shadow-[3px_3px_0_#000] hover:translate-y-[-1px] transition-transform"
              >
                <span>💬 {os.writeWa}</span>
                <span>↗</span>
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between bg-[#229ED9] text-white font-mono text-xs sm:text-sm font-bold px-4 py-3 border-2 border-black shadow-[3px_3px_0_#000] hover:translate-y-[-1px] transition-transform"
              >
                <span>✈️ {os.writeTg}</span>
                <span>↗</span>
              </a>
              <div className="pt-1 font-mono text-xs text-[#222]">
                📧 {site.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя фиксированная панель задач в стиле Windows 98 */}
      <div className="fixed bottom-0 inset-x-0 z-40 h-10 bg-[#C0C0C0] border-t-2 border-white px-2 flex items-center justify-between font-mono text-xs text-black select-none">
        <div className="flex items-center gap-2">
          <Link href="/" className={`${winBtn} flex items-center gap-1.5 !py-0.5`}>
            <span className="inline-block h-3 w-3 bg-[#4B5BFF]" />
            <span>{os.startBtn}</span>
          </Link>
          <span className="hidden sm:inline-block bg-white/70 border border-black/40 px-2.5 py-0.5 truncate">
            🧱 {os.winBio}
          </span>
          <span className="hidden md:inline-block bg-white/70 border border-black/40 px-2.5 py-0.5 truncate">
            📸 {os.winGallery}
          </span>
        </div>
        <div className={`${winInset} px-2.5 py-0.5 text-[11px] font-bold`}>
          🔊 {clock}
        </div>
      </div>
    </div>
  );
}
