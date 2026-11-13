"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Lenis from "lenis";
import { Lang, dict } from "@/lib/content";
import Preloader from "./Preloader";
import SmartCursor from "./SmartCursor";
import { SoundFx } from "./Sound";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
export const useT = () => {
  const { lang, setLang } = useContext(LangCtx);
  return { t: dict[lang], lang, setLang };
};

export default function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && dict[saved]) setLangState(saved);
  }, []);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("lang", l); document.documentElement.lang = l; };

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <Preloader />
      <SmartCursor />
      <SoundFx />
      {children}
    </LangCtx.Provider>
  );
}

