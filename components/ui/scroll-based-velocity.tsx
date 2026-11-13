"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export function ScrollVelocityContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full overflow-hidden", className)}>{children}</div>;
}

// Бегущая строка: скорость и направление зависят от скролла страницы.
export function ScrollVelocityRow({
  children,
  baseVelocity = 20,
  direction = 1,
  className,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });

  const blockRef = useRef<HTMLSpanElement>(null);
  const [blockW, setBlockW] = useState(1);
  const [copies, setCopies] = useState(4);
  const dir = useRef(direction);

  useLayoutEffect(() => {
    const measure = () => {
      const w = blockRef.current?.offsetWidth || 1;
      setBlockW(w);
      setCopies(Math.ceil(window.innerWidth / w) + 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-blockW, 0, v)}px`);
  const skew = useTransform(smooth, [-1500, 0, 1500], [10, 0, -10], { clamp: true });

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * 5 * (delta / 1000);
    if (factor.get() < 0) dir.current = (-direction as 1 | -1);
    else if (factor.get() > 0) dir.current = direction;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <motion.div className={cn("inline-flex", className)} style={{ x, skewX: skew }}>
        {Array.from({ length: copies }, (_, i) => (
          <span key={i} ref={i === 0 ? blockRef : undefined} className="block shrink-0 pr-[0.35em]">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

