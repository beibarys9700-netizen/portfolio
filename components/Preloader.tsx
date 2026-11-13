"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { uiDict } from "@/lib/ui";

// Шторка-прелоадер: быстро меняются приветствия, потом шторка уезжает вверх с выпуклым краем.
export default function Preloader() {
  const g = uiDict.en.greetings;
  const [show, setShow] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("intro")) { setShow(false); return; }
    document.documentElement.style.overflow = "hidden";
    const iv = setInterval(() => setI((x) => Math.min(x + 1, g.length - 1)), 400);
    const done = setTimeout(() => {
      sessionStorage.setItem("intro", "1");
      document.documentElement.style.overflow = "";
      setShow(false);
    }, 1350);
    return () => { clearInterval(iv); clearTimeout(done); document.documentElement.style.overflow = ""; };
  }, [g.length]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink text-paper"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex items-center gap-4 text-5xl md:text-8xl tracking-tighter">
            <span className="inline-block h-3 w-3 md:h-5 md:w-5 rounded-full bg-accent" />
            <AnimatePresence mode="wait">
              <motion.span key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.18 }}>
                {g[i]}
              </motion.span>
            </AnimatePresence>
          </div>
          {/* выпуклый нижний край шторки */}
          <svg className="absolute left-0 top-full h-[12vw] w-full fill-ink" viewBox="0 0 100 12" preserveAspectRatio="none">
            <path d="M0 0H100V0C75 12 25 12 0 0Z" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

