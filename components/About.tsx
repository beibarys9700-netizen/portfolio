"use client";
import { useT } from "./Providers";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useT();
  return (
    <section id="about" className="bg-ink text-paper px-6 md:px-[8%] py-32 md:py-48">
      <Reveal><h2 className="text-4xl md:text-7xl tracking-tighter leading-[1.05] max-w-4xl">{t.aboutTitle}</h2></Reveal>
      <Reveal delay={150}><p className="mt-12 md:ml-[50%] max-w-md text-paper/70 leading-relaxed">{t.aboutText}</p></Reveal>
    </section>
  );
}

