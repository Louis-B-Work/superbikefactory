import type { ReactNode } from "react";
import { Container, SpeedLines, cn } from "./ui";

export function UtilityHero({
  title,
  intro,
  center = false,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <section data-hero className="relative isolate overflow-hidden border-b border-theme-line bg-theme-soft py-16 sm:py-24">
      <SpeedLines />
      <Container>
        <div className={cn("mx-auto", center ? "max-w-3xl text-center" : "max-w-2xl")}>
          <h1 className="animate-hero-in text-4xl font-bold leading-tight tracking-tight text-theme-ink [animation-delay:120ms] sm:text-5xl">
            {title}
          </h1>
          <span aria-hidden className={cn("animate-hero-in mt-6 block h-1 w-12 rounded-full bg-brand-yellow [animation-delay:200ms]", center && "mx-auto")} />
          {intro && (
            <p className="animate-hero-in mt-6 text-lg leading-relaxed text-theme-body/70 [animation-delay:260ms]">
              {intro}
            </p>
          )}
          {children && <div className="animate-hero-in mt-8 [animation-delay:340ms]">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
