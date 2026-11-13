"use client";
import { useEffect, useSyncExternalStore } from "react";
import { initSound, isSoundOn, playClick, setSound, subscribeSound } from "@/lib/sound";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";

// Глобальные тактильные клики по кнопкам и ссылкам
export function SoundFx() {
  useEffect(() => {
    initSound();
    const h = (e: Event) => { if ((e.target as HTMLElement).closest?.("button, a")) playClick(); };
    document.addEventListener("click", h, true);
    return () => document.removeEventListener("click", h, true);
  }, []);
  return null;
}

// Кнопка с эквалайзером для шапки
export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, isSoundOn, () => false);
  const { lang } = useT();
  const ui = uiDict[lang];
  return (
    <button onClick={() => setSound(!on)} aria-label={on ? ui.soundOn : ui.soundOff} title={on ? ui.soundOn : ui.soundOff}
      className="flex h-6 items-end gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="eq-bar block w-[3px] rounded-full bg-current"
          style={{ height: on ? undefined : 3, animation: on ? undefined : "none", animationDelay: `${i * 0.15}s`, opacity: on ? 1 : 0.5 }} />
      ))}
    </button>
  );
}
