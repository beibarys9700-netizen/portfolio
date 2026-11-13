"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

// Упрощённая версия TextAnimate из Magic UI: текст появляется по символам / словам.
export const waveVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotate: 45, scale: 0.5 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      y: { type: "spring", damping: 12, stiffness: 200, mass: 0.8 },
      rotate: { type: "spring", damping: 8, stiffness: 150 },
      scale: { type: "spring", damping: 10, stiffness: 300 },
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 30,
    rotate: 45,
    scale: 0.5,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export function TextAnimate({
  children,
  by = "character",
  variants = waveVariants,
  className,
  startDelay = 0,
}: {
  children: string;
  by?: "character" | "word";
  variants?: Variants;
  className?: string;
  startDelay?: number;
}) {
  const words = children.split(" ");
  let index = 0;
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={children}
    >
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-pre" aria-hidden>
          {by === "character" ? (
            Array.from(word).map((ch, c) => (
              <motion.span key={c} custom={index++ + startDelay * 10} variants={variants} className="inline-block">
                {ch}
              </motion.span>
            ))
          ) : (
            <motion.span custom={index++ + startDelay * 10} variants={variants} className="inline-block">
              {word}
            </motion.span>
          )}
          {w < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

