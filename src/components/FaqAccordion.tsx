"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/finance";
import { ArrowRightIcon } from "./icons";
import { TextLink, cn } from "./ui";

/** Numbered FAQ accordion with a smooth height animation. One answer open at a time. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <li
            key={f.q}
            className={cn(
              "group relative overflow-hidden rounded-2xl border bg-theme-card transition-[border-color,box-shadow] duration-300",
              isOpen
                ? "border-theme-ink/15 shadow-[0_18px_40px_-24px_rgba(35,38,56,0.35)]"
                : "border-theme-line hover:border-theme-ink/20",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 w-1 origin-top bg-brand-yellow transition-transform duration-300",
                isOpen ? "scale-y-100" : "scale-y-0",
              )}
            />
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-7 sm:py-6"
              >
                <span
                  aria-hidden
                  className={cn(
                    "w-7 shrink-0 text-sm font-bold tabular-nums transition-colors duration-300",
                    isOpen ? "text-theme-ink" : "text-theme-muted-35 group-hover:text-theme-ink/70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-base font-semibold text-theme-ink sm:text-lg">{f.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl leading-none font-light transition duration-300",
                    isOpen
                      ? "rotate-45 bg-brand-yellow text-brand-navy"
                      : "bg-theme-soft text-theme-muted-50 group-hover:bg-brand-yellow/40 group-hover:text-theme-ink",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "max-w-3xl pr-5 pb-6 pl-16 transition-opacity duration-300 sm:pr-7 sm:pl-[4.75rem]",
                    isOpen ? "opacity-100" : "opacity-0",
                  )}
                >
                  <p className="leading-relaxed text-theme-body/70">{f.a}</p>
                  {f.link && (
                    <TextLink href={f.link.href} className="mt-3">
                      {f.link.label} <ArrowRightIcon className="h-4 w-4" />
                    </TextLink>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
