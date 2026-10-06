"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./ui";

export type RevealFrom = "left" | "right" | "up" | "pop";

/**
 * Fades/slides its children in the first time they scroll into view.
 * Styling lives in globals.css under [data-reveal]; reduced-motion users and
 * no-JS visitors see the content immediately.
 */
export function Reveal({
  from = "up",
  delay = 0,
  threshold = 0.2,
  className,
  children,
}: {
  from?: RevealFrom;
  /** Delay in ms before the transition starts. */
  delay?: number;
  /** Visible fraction needed to reveal; use a lower value for peeking carousel cards. */
  threshold?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-reveal={from}
      data-revealed={revealed || undefined}
      className={cn(className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
