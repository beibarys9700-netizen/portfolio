import type { Lang } from "./content";

export const uiDict: Record<Lang, {
  viewCase: string; copy: string; copied: string; drag: string;
  desktop: string; mobile: string; openLive: string; close: string; caseLabel: string;
  xrayKicker: string; xrayTitle: string; xrayText: string; wire: string; design: string;
  soundOn: string; soundOff: string; playTitle: string; playHint: string; playHintTouch: string;
  heroMarquee1: string; heroMarquee2: string; heroMarquee3: string;
  heroCta: string; heroCardTitle: string; heroCardSub: string; heroShare: string; heroCopied: string;
  greetings: string[];
}> = {
  en: {
    viewCase: "View case ↗", copy: "Copy", copied: "Copied ✓", drag: "Drag",
    desktop: "Desktop", mobile: "Mobile", openLive: "Live Site ↗", close: "Close", caseLabel: "Case study",
    xrayKicker: "Wireframe X-Ray", xrayTitle: "From skeleton to finished design.",
    xrayText: "Move your cursor or swipe across the layout: on the left is the bare structure, on the right is the final design with typography, colour and products.",
    wire: "Wireframe", design: "Design",
    soundOn: "Sound on", soundOff: "Sound off", playTitle: "My stack — grab and throw it", playHint: "Drag the capsules with your cursor",
    playHintTouch: "Drag capsules with your finger",
    heroMarquee1: "BEIBARYS — DESIGNER & DEVELOPER — ",
    heroMarquee2: "CREATIVE FRONTEND • UI/UX • MOTION • ",
    heroMarquee3: "DIGITAL CATALOGS • FAST LAUNCH • ALMATY • ",
    heroCta: "About Beibarys & Studio",
    heroCardTitle: "DESIGN & CODE CURATED",
    heroCardSub: "BY BEIBARYS • ALMATY",
    heroShare: "Explore selected works",
    heroCopied: "Link copied ✓",
    greetings: ["Сәлем", "Привет", "Hello"],
  },
  ru: {
    viewCase: "Смотреть кейс ↗", copy: "Скопировать", copied: "Скопировано ✓", drag: "Тяни",
    desktop: "Десктоп", mobile: "Мобайл", openLive: "Открыть сайт ↗", close: "Закрыть", caseLabel: "Кейс",
    xrayKicker: "Рентген каркаса", xrayTitle: "От скелета до готового дизайна.",
    xrayText: "Води курсором или пальцем по макету: слева голый каркас, справа — финальный дизайн с типографикой, цветом и товарами.",
    wire: "Каркас", design: "Дизайн",
    soundOn: "Звук вкл", soundOff: "Звук выкл", playTitle: "Мой стек — хватай и швыряй", playHint: "Тяни капсулы курсором",
    playHintTouch: "Тяни капсулы пальцем",
    heroMarquee1: "БЕЙБАРЫС — ДИЗАЙНЕР И РАЗРАБОТЧИК — ",
    heroMarquee2: "КРЕАТИВНЫЙ ФРОНТЕНД • UI/UX • АНИМАЦИИ • ",
    heroMarquee3: "ЦИФРОВЫЕ КАТАЛОГИ • БЫСТРЫЙ ЗАПУСК • АЛМАТЫ • ",
    heroCta: "Обо мне и подходе",
    heroCardTitle: "ДИЗАЙН И КОД СОЗДАНЫ",
    heroCardSub: "БЕЙБАРЫСОМ • АЛМАТЫ",
    heroShare: "Смотреть проекты",
    heroCopied: "Ссылка скопирована ✓",
    greetings: ["Сәлем", "Привет", "Hello"],
  },
  kk: {
    viewCase: "Кейсті көру ↗", copy: "Көшіру", copied: "Көшірілді ✓", drag: "Сүйре",
    desktop: "Десктоп", mobile: "Мобайл", openLive: "Сайтты ашу ↗", close: "Жабу", caseLabel: "Кейс",
    xrayKicker: "Каркас рентгені", xrayTitle: "Қаңқадан дайын дизайнға дейін.",
    xrayText: "Курсорды немесе саусақты макет бойымен жүргізіңіз: сол жақта жалаң құрылым, оң жақта — типографика, түс және тауарлармен дайын дизайн.",
    wire: "Каркас", design: "Дизайн",
    soundOn: "Дыбыс қосулы", soundOff: "Дыбыс өшірулі", playTitle: "Менің стекім — ұста да лақтыр", playHint: "Капсулаларды курсормен сүйреңіз",
    playHintTouch: "Капсулаларды саусақпен сүйреңіз",
    heroMarquee1: "БЕЙБАРЫС — ДИЗАЙНЕР ЖӘНЕ ӘЗІРЛЕУШІ — ",
    heroMarquee2: "КРЕАТИВТІ ФРОНТЕНД • UI/UX • АНИМАЦИЯ • ",
    heroMarquee3: "ЦИФРЛЫҚ КАТАЛОГТАР • ЖЫЛДАМ ІСКЕ ҚОСУ • АЛМАТЫ • ",
    heroCta: "Мен туралы толығырақ",
    heroCardTitle: "ДИЗАЙН МЕН КОД АВТОРЫ",
    heroCardSub: "БЕЙБАРЫС • АЛМАТЫ",
    heroShare: "Жұмыстарды көру",
    heroCopied: "Сілтеме көшірілді ✓",
    greetings: ["Сәлем", "Привет", "Hello"],
  },
};

