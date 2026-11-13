"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, langs } from "@/lib/content";
import { useT } from "./Providers";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { RollText } from "@/components/ui/roll-text";

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
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-6 text-white mix-blend-difference">
        <Link href="/" className="group text-base md:text-lg"><RollText>{`© Code by ${site.name}`}</RollText></Link>
        <div className="flex items-center gap-6 text-base md:text-lg">
          <div className="flex gap-2 text-sm">
            {langs.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`uppercase transition-opacity ${l === lang ? "opacity-100" : "opacity-50 hover:opacity-100"}`}>{l}</button>
            ))}
          </div>
          <AnimatedThemeToggler variant="star" />
          <nav className="hidden md:flex gap-10">
            {links.map((l) => <Link key={l.href} href={l.href} className="group"><RollText>{l.label}</RollText></Link>)}
          </nav>
        </div>
      </header>

      {/* бургер */}
      <button onClick={() => setOpen(!open)} aria-label={t.menu}
        className="md:hidden fixed top-16 right-4 z-50 w-14 h-14 rounded-full bg-ink flex flex-col items-center justify-center gap-1.5">
        <span className={`block w-6 h-px bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
        <span className={`block w-6 h-px bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
      </button>
      <div className={`fixed inset-0 z-40 bg-ink text-paper flex flex-col justify-center px-8 gap-4 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "translate-y-0" : "-translate-y-full"}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-6xl tracking-tight">{l.label}</Link>
        ))}
      </div>
    </>
  );
}
