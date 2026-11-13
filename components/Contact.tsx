"use client";
import { site } from "@/lib/content";
import { useT } from "./Providers";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function Contact() {
  const { t } = useT();
  return (
    <footer id="contact" className="bg-ink text-paper px-6 md:px-[8%] pt-16 pb-8 border-t border-paper/10">
      <Reveal>
        <h2 className="text-5xl md:text-9xl tracking-tighter leading-none">{t.contactTitle}</h2>
      </Reveal>
      <div className="mt-12 flex flex-wrap items-center gap-8">
        <Magnetic href={`mailto:${site.email}`} className="w-36 h-36 !bg-accent hover:!bg-paper hover:!text-ink">{t.contactBtn}</Magnetic>
        <a href={`mailto:${site.email}`} className="text-xl md:text-3xl underline underline-offset-8 decoration-paper/30 hover:decoration-accent">{site.email}</a>
      </div>
      <div className="mt-24 flex flex-wrap justify-between gap-4 text-sm text-paper/60">
        <div className="flex gap-6">{site.socials.map((s) => <a key={s.label} href={s.href} className="hover:text-paper">{s.label}</a>)}</div>
        <div>© {new Date().getFullYear()} {site.name}. {t.rights}</div>
      </div>
    </footer>
  );
}

