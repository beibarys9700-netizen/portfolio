// ====== РЕДАКТИРУЙ ЗДЕСЬ: твои данные ======
export const site = {
  name: "Beibarys",
  phone: "+7 775 938 60 67",
  phoneRaw: "77759386067",
  whatsapp: "https://wa.me/77759386067",
  telegram: "https://t.me/+77759386067",
  instagram: "#",
  email: "abdollab1220@gmail.com",
  socials: [
    { label: "WhatsApp", href: "https://wa.me/77759386067" },
    { label: "Telegram", href: "https://t.me/+77759386067" },
    { label: "Instagram", href: "#" },
  ],
};

export type Lang = "en" | "ru" | "kk";
export const langs: Lang[] = ["en", "ru", "kk"];

export type Project = {
  slug: string;
  title: string;
  color: string;
  accent: string;
  image: string;
  url: string;
  year: string;
  stack: string[];
  summary: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  screens: { label: Record<Lang, string>; caption: Record<Lang, string>; bg: string; badge: string }[];
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Nomadique",
    color: "#4B5BFF",
    accent: "#FF9A62",
    image: "",
    url: "https://nomadique-one.vercel.app",
    year: "2026",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Mobile-First Catalog"],
    summary: {
      en: "A refined editorial e-commerce catalog for an Almaty leather goods & bags atelier. Designed with fluid lookbook transitions, tactile product cards, and instant WhatsApp checkout.",
      ru: "Премиальный цифровой каталог и онлайн-витрина для алматинского бренда сумок и аксессуаров Nomadique. Плавные lookbook-переходы, тактильные карточки товаров и мгновенный заказ в WhatsApp.",
      kk: "Алматылық Nomadique сөмкелер мен аксессуарлар брендіне арналған премиум цифрлық каталог. Тегіс анимациялар, ыңғайлы тауар карточкалары және WhatsApp арқылы жылдам тапсырыс.",
    },
    highlights: {
      en: ["Editorial lookbook slider with touch physics", "Instant category filtering & cart drawer", "Sub-second page load on mobile networks"],
      ru: ["Журнальный lookbook-слайдер с тач-физикой", "Мгновенная фильтрация категорий и корзина", "Загрузка быстрее секунды на мобильном интернете"],
      kk: ["Тач-физикасы бар lookbook-слайдер", "Санаттарды лезде сүзу және себет", "Мобильді интернетте 1 секундтан жылдам жүктелу"],
    },
    screens: [
      {
        label: { en: "01 · Hero Lookbook", ru: "01 · Главный Lookbook", kk: "01 · Басты Lookbook" },
        caption: { en: "Full-bleed editorial slider with quick product preview card", ru: "Полноэкранный слайдер коллекции с быстрой карточкой товара", kk: "Тауар карточкасы бар толық экранды слайдер" },
        bg: "linear-gradient(135deg, #2b2724 0%, #594a42 50%, #16151a 100%)",
        badge: "COLLECTION 01 / 02",
      },
      {
        label: { en: "02 · Interactive Catalog", ru: "02 · Интерактивный каталог", kk: "02 · Интерактивті каталог" },
        caption: { en: "Category tabs (Bags / Accessories) with smooth color & angle switch", ru: "Переключение «Сумки / Аксессуары» с выбором оттенка и ракурса", kk: "«Сөмкелер / Аксессуарлар» санаттарын ауыстыру" },
        bg: "linear-gradient(135deg, #1b1f38 0%, #4B5BFF 60%, #14151c 100%)",
        badge: "CATALOG GRID",
      },
      {
        label: { en: "03 · Quick Checkout", ru: "03 · Быстрый заказ", kk: "03 · Жылдам тапсырыс" },
        caption: { en: "Slide-over bag with 1-click WhatsApp manager order", ru: "Выезжающая корзина с оформлением в WhatsApp в 1 клик", kk: "1 кликпен WhatsApp арқылы тапсырыс беру" },
        bg: "linear-gradient(135deg, #3a231c 0%, #E8573D 60%, #16151a 100%)",
        badge: "1-CLICK ORDER",
      },
    ],
  },
  {
    slug: "project-five",
    title: "Green Clean",
    color: "#2E9E5B",
    accent: "#6EE7B7",
    image: "",
    url: "https://greencleankz.vercel.app",
    year: "2026",
    stack: ["React", "Tailwind CSS", "Interactive Calculator", "Lead Generation"],
    summary: {
      en: "High-conversion service website for an eco-friendly cleaning company in Almaty. Features an interactive price calculator, before/after comparison, and direct messenger booking.",
      ru: "Конверсионный сайт для сервиса эко-клининга в Алматы. Включает интерактивный калькулятор стоимости уборки по квадратуре, блок «До / После» и быструю бронь в мессенджеры.",
      kk: "Алматыдағы эко-клининг қызметіне арналған конверсиялық сайт. Аумақ бойынша интерактивті баға калькуляторы, «Дейін / Кейін» блогы және мессенджер арқылы брондау.",
    },
    highlights: {
      en: ["Interactive apartment area & tariff calculator", "Clear service breakdown checklists", "Direct WhatsApp lead capture with pre-filled parameters"],
      ru: ["Интерактивный калькулятор площади и тарифа", "Наглядные чек-листы что входит в уборку", "Заявка в WhatsApp с уже заполненным расчётом"],
      kk: ["Пәтер аумағы мен тарифінің интерактивті калькуляторы", "Тазалау тізімінің көрнекі чек-парақтары", "Дайын есеппен WhatsApp-қа өтінім жіберу"],
    },
    screens: [
      {
        label: { en: "01 · Hero & Instant Quote", ru: "01 · Первый экран и расчёт", kk: "01 · Басты экран және есеп" },
        caption: { en: "Trust-focused hero with eco-badges and 60-second cost estimator", ru: "Экран с эко-гарантиями и расчётом стоимости за 60 секунд", kk: "Эко-кепілдіктер және 60 секундта бағаны есептеу" },
        bg: "linear-gradient(135deg, #0d2e1e 0%, #2E9E5B 60%, #091912 100%)",
        badge: "ECO CLEANING KZ",
      },
      {
        label: { en: "02 · Interactive Calculator", ru: "02 · Калькулятор площади", kk: "02 · Аумақ калькуляторы" },
        caption: { en: "Live m² slider + room counter with instant KZT price update", ru: "Ползунок м² и выбор типа уборки с мгновенным пересчётом цены в ₸", kk: "Шаршы метр слайдері және теңгемен лезде есептеу" },
        bg: "linear-gradient(135deg, #12352c 0%, #12A4A0 60%, #0d1b1e 100%)",
        badge: "LIVE CALCULATOR",
      },
      {
        label: { en: "03 · Room Checklist", ru: "03 · Чек-лист комнат", kk: "03 · Бөлмелер чек-парағы" },
        caption: { en: "Interactive tabs for Kitchen, Bathroom, Living room details", ru: "Интерактивные вкладки: Кухня, Ванная, Комнаты — что именно моют", kk: "Ас үй, Жуынатын бөлме, Бөлмелер — толық тізім" },
        bg: "linear-gradient(135deg, #1f2e16 0%, #4ea832 60%, #11180d 100%)",
        badge: "SERVICE DETAILS",
      },
    ],
  },
];

type Dict = {
  role: [string, string];
  location: string;
  nav: { work: string; about: string; contact: string };
  intro: string;
  introSmall: string;
  recent: string;
  categories: string[];
  aboutBtn: string;
  view: string;
  aboutTitle: string;
  aboutText: string;
  contactTitle: string;
  contactBtn: string;
  menu: string;
  rights: string;
};

export const dict: Record<Lang, Dict> = {
  en: {
    role: ["Freelance", "Designer & Developer"],
    location: "Located in Kazakhstan",
    nav: { work: "Work", about: "About", contact: "Contact" },
    intro: "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.",
    introSmall: "I blend clean visual aesthetics with modern frontend engineering (React, Tailwind, Framer Motion) to build fast, conversion-focused websites and digital catalogs that launch in days, not months.",
    recent: "Recent work",
    categories: ["Design & Development", "Interaction & Development", "Design & Development", "Design & Development", "Interaction & Development"],
    aboutBtn: "About me",
    view: "View",
    aboutTitle: "I design and build websites that people remember.",
    aboutText: "I'm Beibarys, a freelance web designer and developer based in Almaty. I help brands, e-commerce stores, and local businesses stand out through high-speed interfaces, thoughtful micro-interactions, and clean, scalable code.",
    contactTitle: "Let's work together",
    contactBtn: "Get in touch",
    menu: "Menu",
    rights: "All rights reserved",
  },
  ru: {
    role: ["Фриланс", "Дизайнер и разработчик"],
    location: "Нахожусь в Казахстане",
    nav: { work: "Работы", about: "Обо мне", contact: "Контакты" },
    intro: "Помогаю брендам выделяться в цифровую эпоху. Вместе мы зададим новый стандарт. Без лишнего, всегда на острие.",
    introSmall: "Соединяю чистую визуальную эстетику с современной фронтенд-разработкой (React, Tailwind, Framer Motion), создавая быстрые сайты и каталоги с акцентом на конверсию — запуск за дни, а не месяцы.",
    recent: "Недавние работы",
    categories: ["Дизайн и разработка", "Интерактив и разработка", "Дизайн и разработка", "Дизайн и разработка", "Интерактив и разработка"],
    aboutBtn: "Обо мне",
    view: "Смотреть",
    aboutTitle: "Я создаю сайты, которые запоминаются.",
    aboutText: "Меня зовут Бейбарыс, я веб-дизайнер и разработчик из Алматы. Помогаю брендам, онлайн-магазинам и локальному бизнесу выделяться за счёт сверхбыстрых интерфейсов, продуманных микроанимаций и чистого кода.",
    contactTitle: "Давай работать вместе",
    contactBtn: "Связаться",
    menu: "Меню",
    rights: "Все права защищены",
  },
  kk: {
    role: ["Фриланс", "Дизайнер және әзірлеуші"],
    location: "Қазақстанда орналасқанмын",
    nav: { work: "Жұмыстар", about: "Мен туралы", contact: "Байланыс" },
    intro: "Брендтерге цифрлық дәуірде ерекшеленуге көмектесемін. Бірге жаңа стандарт орнатамыз. Артық сөзсіз, әрдайым алдыңғы қатарда.",
    introSmall: "Заманауи фронтенд-әзірлеу (React, Tailwind, Framer Motion) мен таза визуалды эстетиканы ұштастыра отырып, конверсияға бағытталған жылдам сайттар мен каталогтар жасаймын — айлап емес, санаулы күнде іске қосамыз.",
    recent: "Соңғы жұмыстар",
    categories: ["Дизайн және әзірлеу", "Интерактив және әзірлеу", "Дизайн және әзірлеу", "Дизайн және әзірлеу", "Интерактив және әзірлеу"],
    aboutBtn: "Мен туралы",
    view: "Қарау",
    aboutTitle: "Мен есте қалатын сайттар жасаймын.",
    aboutText: "Менің атым Бейбарыс, Алматылық веб-дизайнер әрі әзірлеушімін. Брендтерге, онлайн-дүкендерге және жергілікті бизнеске жылдам интерфейстер, ұқыпты микроанимациялар және таза код арқылы ерекшеленуге көмектесемін.",
    contactTitle: "Бірге жұмыс істейік",
    contactBtn: "Хабарласу",
    menu: "Мәзір",
    rights: "Барлық құқықтар қорғалған",
  },
};


