import type { ComponentType, ReactNode, SVGProps } from "react";
import { HoverTitle, cn } from "./ui";

export function FeatureCard({
  icon: Icon,
  number,
  title,
  children,
  className,
}: ({
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  number?: never;
} | {
  icon?: never;
  number: number;
}) & {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-theme-line bg-theme-card p-7 sm:p-8",
        "transition-[transform,translate,border-color,box-shadow,background-color] duration-300 motion-safe:can-hover:hover:-translate-y-1 can-hover:hover:border-theme-ink/20 can-hover:hover:shadow-[0_12px_40px_-12px_rgba(35,38,56,0.18)]",
        "on-dark:border-white/10 on-dark:bg-white/[0.04] on-dark:hover:border-white/25 on-dark:hover:bg-white/[0.07]",
        "motion-reduce:transition-none",
        className,
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-theme-soft font-bold text-theme-ink transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-brand-navy on-dark:bg-white/10 on-dark:text-brand-yellow on-dark:group-hover:bg-brand-yellow on-dark:group-hover:text-brand-navy motion-reduce:transition-none">
        {Icon ? <Icon className="h-6 w-6" strokeWidth={1.5} /> : String(number).padStart(2, "0")}
      </span>
      <h3 className="mt-6 text-xl font-bold text-theme-ink on-dark:text-white">
        <HoverTitle>{title}</HoverTitle>
      </h3>
      <div className="mt-3 leading-relaxed text-theme-body/70 on-dark:text-white/70">{children}</div>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-yellow transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
      />
    </div>
  );
}
