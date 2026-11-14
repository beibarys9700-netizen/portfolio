"use client";
import { useT } from "./Providers";
import { aboutDict } from "@/lib/about";
import Reveal from "./Reveal";
import PhysicsPills from "./PhysicsPills";

export default function About() {
  const { t, lang } = useT();
  const a = aboutDict[lang];
  return (
    <section id="about" className="bg-ink text-paper px-6 md:px-[8%] py-32 md:py-48">
      <Reveal><h2 className="text-4xl md:text-7xl tracking-tighter leading-[1.05] max-w-4xl">{t.aboutTitle}</h2></Reveal>
      <div className="mt-12 md:ml-[42%] grid gap-6 max-w-xl">
        <Reveal delay={150}><p className="text-paper/75 leading-relaxed text-base md:text-lg">{t.aboutText}</p></Reveal>
        <Reveal delay={250}>
          <div className="rounded-2xl border border-paper/15 bg-paper/[0.04] p-5 flex items-start gap-4">
            <span className="text-2xl shrink-0">🧱</span>
            <p className="text-sm md:text-base text-paper/85 italic leading-relaxed">{a.funText}</p>
          </div>
        </Reveal>
      </div>
      <PhysicsPills />
    </section>
  );
}

