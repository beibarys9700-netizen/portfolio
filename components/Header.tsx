"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, langs } from "@/lib/content";
import { useT } from "./Providers";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { RollText } from "@/components/ui/roll-text";
import { SoundToggle } from "./Sound";

export default function Header() {
  const { t, lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const onAbout = usePathname() === "/about";
  const links = [
    { href: "/#work", label: t.nav.work },
    { href: "/about", label: t.nav.about },
    { href: onAbout ? "#contact" : "/#contact", label: t.nav.contact },
  ];
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 md:px-10 py-4 md:py-6 text-white mix-blend-difference">
        <Link href="/" className="group text-sm md:text-lg font-medium"><RollText>{`© Code by ${site.name}`}</RollText></Link>
        <div className="flex items-center gap-3 md:gap-6 text-sm md:text-lg pr-14 md:pr-0">
          <div className="flex gap-1.5 md:gap-2 text-xs md:text-sm">
            {langs.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`uppercase transition-opacity px-1 py-0.5 ${l === lang ? "opacity-100 font-bold" : "opacity-50 hover:opacity-100"}`}>{l}</button>
            ))}
          </div>
          <SoundToggle />
          <AnimatedThemeToggler variant="star" />
          <nav className="hidden md:flex gap-10">
            {links.map((l) => <Link key={l.href} href={l.href} className="group"><RollText>{l.label}</RollText></Link>)}
          </nav>
        </div>
      </header>

      {/* бургер */}
      <button onClick={() => setOpen(!open)} aria-label={t.menu}
        className="md:hidden fixed top-5 right-4 z-50 w-12 h-12 rounded-full bg-ink text-paper shadow-lg flex flex-col items-center justify-center gap-1.5 border border-paper/20">
        <span className={`block w-5 h-0.5 bg-paper transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
        <span className={`block w-5 h-0.5 bg-paper transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
      </button>
      <div className={`fixed inset-0 z-40 bg-ink text-paper flex flex-col justify-center px-8 gap-4 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "translate-y-0" : "-translate-y-full"}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-6xl tracking-tight">{l.label}</Link>
        ))}
      </div>
    </>
  );
}
