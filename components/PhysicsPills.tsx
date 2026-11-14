"use client";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useT } from "./Providers";
import { uiDict } from "@/lib/ui";

const PILLS = ["React", "Next.js", "Tailwind", "UI/UX", "Almaty", "Fast Launch", "Motion", "Figma", "TypeScript", "Vercel"];

// Физическая «песочница»: стеклянные капсулы падают, их можно хватать и швырять (Matter.js).
export default function PhysicsPills() {
  const { lang } = useT();
  const ui = uiDict[lang];
  const wrap = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);
  }, []);

  useEffect(() => {
    const host = wrap.current!;
    const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Runner } = Matter;
    const engine = Engine.create({ gravity: { x: 0, y: 1.1, scale: 0.001 } });
    const runner = Runner.create();
    let w = host.clientWidth, h = host.clientHeight;
    const els = Array.from(host.querySelectorAll<HTMLElement>("[data-pill]"));
    const walls: Matter.Body[] = [];
    const mkWalls = () => {
      walls.forEach((b) => Composite.remove(engine.world, b));
      walls.length = 0;
      const t = 200, o = { isStatic: true, friction: 0.4 };
      walls.push(
        Bodies.rectangle(w / 2, h + t / 2, w * 3, t, o),
        Bodies.rectangle(-t / 2, h / 2, t, h * 6, o),
        Bodies.rectangle(w + t / 2, h / 2, t, h * 6, o),
        Bodies.rectangle(w / 2, -h * 2, w * 3, t, o)
      );
      Composite.add(engine.world, walls);
    };
    mkWalls();

    const bodies = els.map((el, i) => {
      const bw = el.offsetWidth, bh = el.offsetHeight;
      const b = Bodies.rectangle(w * (0.15 + Math.random() * 0.7), -80 - i * 90, bw, bh, {
        chamfer: { radius: bh / 2 }, restitution: 0.45, friction: 0.2, frictionAir: 0.012, angle: (Math.random() - 0.5) * 1.2,
      });
      return b;
    });
    let started = false;
    const start = () => { if (started) return; started = true; Composite.add(engine.world, bodies); Runner.run(runner, engine); };

    const mouse = Mouse.create(host);
    // не перехватываем прокрутку страницы колесом и свайпом, чтобы страница нормально скроллилась на мобилках
    const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
    m.element.removeEventListener("wheel", m.mousewheel);
    m.element.removeEventListener("mousewheel", m.mousewheel);
    m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, damping: 0.05, render: { visible: false } } });
    Composite.add(engine.world, mc);

    let raf = 0;
    const draw = () => {
      bodies.forEach((b, i) => {
        els[i].style.transform = `translate3d(${b.position.x - els[i].offsetWidth / 2}px,${b.position.y - els[i].offsetHeight / 2}px,0) rotate(${b.angle}rad)`;
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.35 });
    io.observe(host);
    const ro = new ResizeObserver(() => { w = host.clientWidth; h = host.clientHeight; mkWalls(); bodies.forEach((b) => { if (b.position.x > w) Body.setPosition(b, { x: w / 2, y: 40 }); }); });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      Runner.stop(runner); Composite.clear(engine.world, false); Engine.clear(engine);
    };
  }, []);

  return (
    <div className="mt-24 md:mt-40">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-3xl md:text-5xl tracking-tighter">{ui.playTitle}</h3>
        <span className="text-xs uppercase tracking-widest text-paper/50">{isTouch ? ui.playHintTouch : ui.playHint}</span>
      </div>
      <div ref={wrap} data-cursor={`✋ ${ui.drag}`}
        className="relative h-[420px] md:h-[520px] w-full overflow-hidden rounded-3xl border border-paper/10 bg-gradient-to-b from-paper/[0.03] to-accent/10 touch-pan-y select-none">
        {PILLS.map((p, i) => (
          <div key={p} data-pill
            className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 md:px-6 py-2 md:py-3 text-sm md:text-2xl backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_10px_30px_-10px_rgba(0,0,0,.6)] cursor-grab active:cursor-grabbing"
            style={{ transform: `translate3d(-999px,-999px,0)`, color: i % 3 === 0 ? "#B8C0FF" : undefined }}>
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

