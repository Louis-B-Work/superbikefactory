import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24", className)}>{children}</div>
  );
}

type SectionTone = "white" | "soft" | "dark";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-theme-surface",
  soft: "bg-theme-soft",
  dark: "bg-brand-navy text-white",
};

export function Section({
  tone = "white",
  pattern = false,
  className,
  id,
  children,
}: {
  tone?: SectionTone;
  /** Fill the empty side gutters on large screens with faint speed lines. */
  pattern?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn("py-20 sm:py-28", pattern && "relative isolate", toneClasses[tone], className)}
    >
      {pattern && <SpeedLines />}
      <Container>{children}</Container>
    </section>
  );
}

/** Decorative speed-line layer for a `relative isolate` parent. Large screens only. */
export function SpeedLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 hidden bg-speed-lines on-dark:[--speed-line:rgb(255_255_255/0.06)] lg:block",
        className,
      )}
    />
  );
}

export function SectionHeading({
  title,
  intro,
  align = "center",
}: {
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-14", align === "center" && "text-center")}>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-theme-ink on-dark:text-white sm:text-4xl">
        <HoverTitle>{title}</HoverTitle>
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg leading-relaxed text-theme-body/70 on-dark:text-white/70",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary";
export type { ButtonVariant };

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover hover:shadow-[0_12px_24px_-12px_rgba(35,38,56,0.45)]",
  secondary:
    "border border-theme-ink/15 text-theme-ink hover:border-theme-ink hover:shadow-[0_12px_24px_-14px_rgba(35,38,56,0.3)]",
};

const buttonBase = cn(
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold",
  "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out",
  "hover:-translate-y-0.5 active:translate-y-0 active:duration-100",
  // Arrow icons nudge forward on hover.
  "[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out hover:[&_svg]:translate-x-1",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:[&_svg]:translate-x-0",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
);

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(buttonBase, buttonVariants[variant], className);
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

/** Plain text link with an arrow, for secondary actions. */
export function TextLink({
  className,
  children,
  onDark = false,
  ...props
}: ComponentProps<typeof Link> & { onDark?: boolean }) {
  return (
    <Link
      className={cn(
        "link-fill inline-flex items-center gap-1.5 pb-0.5 font-bold",
        "[&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1",
        onDark ? "text-white" : "text-theme-ink",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Yellow text accent (the old site's `.gold`). Only use on dark backgrounds. */
export function Gold({ children }: { children: ReactNode }) {
  return <span className="text-brand-yellow">{children}</span>;
}

/** Yellow marker underline. Use on light backgrounds where yellow text lacks contrast. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="box-decoration-clone bg-[linear-gradient(transparent_60%,var(--marker)_60%,var(--marker)_92%,transparent_92%)] px-1">
      {children}
    </span>
  );
}

/** Wraps a light-background title so the yellow marker sweeps in behind it on hover. */
export function HoverTitle({ children }: { children: ReactNode }) {
  return <span className="hover-marker">{children}</span>;
}
