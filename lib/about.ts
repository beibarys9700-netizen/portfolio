import type { Lang } from "./content";

type AboutDict = {
  back: string;
  kicker: string;
  heroLines: [string, string, string];
  lead: string;
  hint: string;
  tags: string[];
  statsTitle: string;
  stats: { n: number; suffix: string; label: string }[];
  doTitle: string;
  doItems: { title: string; text: string }[];
  processTitle: string;
  process: { title: string; text: string }[];
  toolsTitle: string;
  funTitle: string;
  funText: string;
  ctaTitle: string;
  ctaBtn: string;
};

export const tools = ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "GSAP", "Figma", "Vercel", "Three.js", "Lenis"];

export const aboutDict: Record<Lang, AboutDict> = {
  en: {
    back: "Back",
    kicker: "About me",
    heroLines: ["Design that", "feels alive,", "code that flies."],
    lead: "I'm Beibarys, a freelance web designer and developer based in Almaty. I help brands, e-commerce stores, and local businesses stand out through high-speed interfaces, thoughtful micro-interactions, and clean, scalable code.",
    hint: "Move your cursor over the photo",
    tags: ["Almaty, KZ", "Freelance", "EN · RU · KK"],
    statsTitle: "In numbers",
    stats: [
      { n: 20, suffix: "+", label: "projects launched" },
      { n: 7, suffix: "", label: "days to first launch" },
      { n: 100, suffix: "%", label: "custom design, no templates" },
      { n: 3, suffix: "", label: "languages on every site" },
    ],
    doTitle: "What I do",
    doItems: [
      { title: "Web design", text: "Clean, confident layouts with a clear visual voice — from first sketch to a polished Figma system." },
      { title: "Frontend development", text: "React, Next.js and Tailwind. Fast, accessible, SEO-ready and easy to maintain." },
      { title: "Interaction & motion", text: "Micro-interactions, smooth scroll, 3D and canvas effects that make a site memorable." },
      { title: "Catalogs & e-commerce", text: "Digital catalogs and shops that load instantly and turn visitors into customers." },
    ],
    processTitle: "How we work",
    process: [
      { title: "Brief", text: "We talk goals, audience and references." },
      { title: "Design", text: "Concept, style and key screens you can react to." },
      { title: "Build", text: "Clean code, animations and real content." },
      { title: "Launch", text: "Deploy, domain, analytics — live in days." },
    ],
    toolsTitle: "Tools I love",
    funTitle: "Beyond the screen",
    funText: "I play guitar, collect LEGO and believe every detail on a page deserves the same care as the big idea.",
    ctaTitle: "Have a project in mind?",
    ctaBtn: "Let's talk",
  },
  ru: {
    back: "Назад",
    kicker: "Обо мне",
    heroLines: ["Дизайн, который", "оживает, код,", "который летает."],
    lead: "Меня зовут Бейбарыс, я веб-дизайнер и разработчик из Алматы. Помогаю брендам, онлайн-магазинам и локальному бизнесу выделяться за счёт сверхбыстрых интерфейсов, продуманных микроанимаций и чистого кода.",
    hint: "Проведи курсором по фото",
    tags: ["Алматы, KZ", "Фриланс", "EN · RU · KK"],
    statsTitle: "В цифрах",
    stats: [
      { n: 20, suffix: "+", label: "запущенных проектов" },
      { n: 7, suffix: "", label: "дней до первого запуска" },
      { n: 100, suffix: "%", label: "авторский дизайн, без шаблонов" },
      { n: 3, suffix: "", label: "языка на каждом сайте" },
    ],
    doTitle: "Чем занимаюсь",
    doItems: [
      { title: "Веб-дизайн", text: "Чистые уверенные макеты с ясным визуальным голосом — от наброска до аккуратной системы в Figma." },
      { title: "Фронтенд-разработка", text: "React, Next.js и Tailwind. Быстро, доступно, готово к SEO и просто в поддержке." },
      { title: "Интерактив и анимация", text: "Микроанимации, плавный скролл, 3D и canvas-эффекты, после которых сайт запоминается." },
      { title: "Каталоги и e-commerce", text: "Цифровые каталоги и магазины, которые грузятся мгновенно и превращают посетителей в клиентов." },
    ],
    processTitle: "Как мы работаем",
    process: [
      { title: "Бриф", text: "Обсуждаем цели, аудиторию и референсы." },
      { title: "Дизайн", text: "Концепция, стиль и ключевые экраны для обсуждения." },
      { title: "Разработка", text: "Чистый код, анимации и реальный контент." },
      { title: "Запуск", text: "Деплой, домен, аналитика — онлайн за дни." },
    ],
    toolsTitle: "Мои инструменты",
    funTitle: "За пределами экрана",
    funText: "Играю на гитаре, собираю LEGO и уверен, что каждая деталь на странице достойна такой же заботы, как и большая идея.",
    ctaTitle: "Есть проект на примете?",
    ctaBtn: "Обсудим",
  },
  kk: {
    back: "Артқа",
    kicker: "Мен туралы",
    heroLines: ["Тірі сезілетін", "дизайн, ұшқан", "код."],
    lead: "Менің атым Бейбарыс, Алматылық веб-дизайнер әрі әзірлеушімін. Брендтерге, онлайн-дүкендерге және жергілікті бизнеске жылдам интерфейстер, ұқыпты микроанимациялар және таза код арқылы ерекшеленуге көмектесемін.",
    hint: "Курсорды фотоға жылжытыңыз",
    tags: ["Алматы, KZ", "Фриланс", "EN · RU · KK"],
    statsTitle: "Сандармен",
    stats: [
      { n: 20, suffix: "+", label: "іске қосылған жоба" },
      { n: 7, suffix: "", label: "күнде алғашқы іске қосу" },
      { n: 100, suffix: "%", label: "авторлық дизайн, шаблонсыз" },
      { n: 3, suffix: "", label: "тіл әр сайтта" },
    ],
    doTitle: "Немен айналысамын",
    doItems: [
      { title: "Веб-дизайн", text: "Анық визуалды үні бар таза, сенімді макеттер — алғашқы эскизден Figma жүйесіне дейін." },
      { title: "Фронтенд-әзірлеу", text: "React, Next.js және Tailwind. Жылдам, қолжетімді, SEO-ға дайын және қолдауға оңай." },
      { title: "Интерактив және анимация", text: "Сайтты есте қалдыратын микроанимациялар, тегіс скролл, 3D және canvas-эффектілер." },
      { title: "Каталогтар және e-commerce", text: "Лезде жүктелетін және келушіні клиентке айналдыратын цифрлық каталогтар мен дүкендер." },
    ],
    processTitle: "Қалай жұмыс істейміз",
    process: [
      { title: "Бриф", text: "Мақсат, аудитория және референстерді талқылаймыз." },
      { title: "Дизайн", text: "Концепция, стиль және негізгі экрандар." },
      { title: "Әзірлеу", text: "Таза код, анимациялар және нақты контент." },
      { title: "Іске қосу", text: "Деплой, домен, аналитика — бірнеше күнде онлайн." },
    ],
    toolsTitle: "Сүйікті құралдарым",
    funTitle: "Экраннан тыс",
    funText: "Гитарада ойнаймын, LEGO жинаймын және беттегі әр бөлшек үлкен идея сияқты қамқорлыққа лайық деп сенемін.",
    ctaTitle: "Жоба бар ма?",
    ctaBtn: "Талқылайық",
  },
};
