import Image from "next/image";
import type { ReactNode } from "react";
import { Section, SectionHeading, cn } from "./ui";

export function EditorialSection({
  id,
  title,
  image,
  imageAlt,
  objectPosition = "center",
  tone = "white",
  imageFirst = false,
  children,
}: {
  id?: string;
  title: ReactNode;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  tone?: "white" | "soft" | "dark";
  imageFirst?: boolean;
  children: ReactNode;
}) {
  return (
    <Section id={id} tone={tone} className={id && "scroll-mt-18"}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className={cn("max-w-2xl", imageFirst && "lg:order-last")}>
          <SectionHeading align="left" title={title} />
          <div className="-mt-6 space-y-5 text-lg leading-relaxed text-theme-body/70 on-dark:text-white/70">
            {children}
          </div>
        </div>
        <div className="group relative aspect-[5/4] overflow-hidden rounded-2xl bg-brand-navy lg:aspect-[4/5] lg:max-h-[720px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 motion-safe:can-hover:group-hover:scale-105 motion-reduce:transition-none"
            style={{ objectPosition }}
          />
          <span aria-hidden className="absolute bottom-0 left-0 h-1 w-1/3 bg-brand-yellow" />
        </div>
      </div>
    </Section>
  );
}
