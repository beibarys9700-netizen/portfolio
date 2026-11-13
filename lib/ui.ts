import type { Lang } from "./content";

export const uiDict: Record<Lang, {
  viewCase: string; copy: string; copied: string; drag: string;
  desktop: string; mobile: string; openLive: string; close: string; caseLabel: string;
  xrayKicker: string; xrayTitle: string; xrayText: string; wire: string; design: string;
  soundOn: string; soundOff: string; playTitle: string; playHint: string;
  greetings: string[];
}> = {
  en: {
    viewCase: "View case ↗", copy: "Copy", copied: "Copied ✓", drag: "Drag",
    desktop: "Desktop", mobile: "Mobile", openLive: "Open live site ↗", close: "Close", caseLabel: "Case study",
    xrayKicker: "Wireframe X-Ray", xrayTitle: "From skeleton to finished design.",
    xrayText: "Move your cursor across the layout: on the left is the bare structure, on the right is the final design with typography, colour and products.",
    wire: "Wireframe", design: "Design",
    soundOn: "Sound on", soundOff: "Sound off", playTitle: "My stack — grab and throw it", playHint: "Drag the capsules with your cursor",
    greetings: ["Сәлем", "Привет", "Hello"],
  },
  ru: {
    viewCase: "Смотреть кейс ↗", copy: "Скопировать", copied: "Скопировано ✓", drag: "Тяни",
    desktop: "Десктоп", mobile: "Мобайл", openLive: "Открыть живой сайт ↗", close: "Закрыть", caseLabel: "Кейс",
    xrayKicker: "Рентген каркаса", xrayTitle: "От скелета до готового дизайна.",
    xrayText: "Води курсором по макету: слева голый каркас, справа — финальный дизайн с типографикой, цветом и товарами.",
    wire: "Каркас", design: "Дизайн",
    soundOn: "Звук вкл", soundOff: "Звук выкл", playTitle: "Мой стек — хватай и швыряй", playHint: "Тяни капсулы курсором",
    greetings: ["Сәлем", "Привет", "Hello"],
  },
  kk: {
    viewCase: "Кейсті көру ↗", copy: "Көшіру", copied: "Көшірілді ✓", drag: "Сүйре",
    desktop: "Десктоп", mobile: "Мобайл", openLive: "Тірі сайтты ашу ↗", close: "Жабу", caseLabel: "Кейс",
    xrayKicker: "Каркас рентгені", xrayTitle: "Қаңқадан дайын дизайнға дейін.",
    xrayText: "Курсорды макет бойымен жүргізіңіз: сол жақта жалаң құрылым, оң жақта — типографика, түс және тауарлармен дайын дизайн.",
    wire: "Каркас", design: "Дизайн",
    soundOn: "Дыбыс қосулы", soundOff: "Дыбыс өшірулі", playTitle: "Менің стекім — ұста да лақтыр", playHint: "Капсулаларды курсормен сүйреңіз",
    greetings: ["Сәлем", "Привет", "Hello"],
  },
};

