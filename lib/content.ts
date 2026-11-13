// ====== РЕДАКТИРУЙ ЗДЕСЬ: твои данные ======
export const site = {
  name: "Beibarys",
  email: "hello@example.com",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Telegram", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export type Lang = "en" | "ru" | "kk";
export const langs: Lang[] = ["en", "ru", "kk"];

// Проекты: image — путь к скриншоту в /public (пока градиент-заглушка)
export const projects = [
  { slug: "project-one", title: "Nomadique", color: "#4B5BFF", image: "" },
  { slug: "project-two", title: "Aquasplash", color: "#12A4A0", image: "" },
  { slug: "project-three", title: "Sumka Store", color: "#E8573D", image: "" },
  { slug: "project-four", title: "Qosymsha", color: "#8A5CF5", image: "" },
  { slug: "project-five", title: "Green Clean", color: "#2E9E5B", image: "" },
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


