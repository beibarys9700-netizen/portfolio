import { cn } from "@/lib/utils";

// Текст, у которого при наведении на родителя с классом `group` буквы по очереди «прокручиваются» вверх.
export function RollText({ children, className, step = 18 }: { children: string; className?: string; step?: number }) {
  return (
    <span className={cn("inline-flex whitespace-pre", className)} aria-label={children}>
      {Array.from(children).map((ch, i) => (
        <span key={i} aria-hidden className="relative inline-block overflow-hidden align-bottom leading-[1.1]">
          <span className="block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full" style={{ transitionDelay: `${i * step}ms` }}>{ch}</span>
          <span className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full text-accent" style={{ transitionDelay: `${i * step}ms` }}>{ch}</span>
        </span>
      ))}
    </span>
  );
}

