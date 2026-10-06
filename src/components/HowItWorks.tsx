"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/content/finance";
import { FinanceCalculator } from "./FinanceCalculator";
import { ClockIcon, FormIcon, KeyIcon, SearchIcon } from "./icons";
import { Reveal } from "./Reveal";
import { Section, SectionHeading, cn } from "./ui";

const stepIcons = [FormIcon, SearchIcon, KeyIcon];

/** "On the road in three steps": the steps as a branch on the left, the payment calculator on the right. */
export function HowItWorks({
  apr,
  calculatorNote = "Move the sliders to get an idea of your repayments.",
}: {
  /** Illustrative APR for the calculator. Defaults to the site-wide figure. */
  apr?: number;
  calculatorNote?: string;
}) {
  return (
    <Section className="overflow-x-clip border-t border-theme-line">
      <SectionHeading
        title="On the road in three steps"
        intro="See what you could pay, then three simple steps get you riding."
      />
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-20">
        <StepsBranch />
        <div id="calculator" className="scroll-mt-24">
          <h3 className="text-xl font-bold text-theme-ink sm:text-2xl">What could you pay each month?</h3>
          <p className="mt-2 leading-relaxed text-theme-body/70">{calculatorNote}</p>
          <FinanceCalculator apr={apr} stacked className="mt-6" />
        </div>
      </div>
    </Section>
  );
}

/** Where on screen (fraction of viewport height) the branch "reaches" a step as you scroll. */
const REACH_LINE = 0.62;

function StepsBranch() {
  const listRef = useRef<HTMLOListElement>(null);
  // The spine runs from the first badge's centre to the last; measured so it fits however the steps are spaced.
  const [spine, setSpine] = useState({ top: 0, height: 0, fill: 0 });
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const listTop = list.getBoundingClientRect().top;
      const centres = Array.from(list.querySelectorAll<HTMLElement>("[data-step-badge]")).map((b) => {
        const r = b.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      const first = centres[0];
      const last = centres[centres.length - 1];
      const line = window.innerHeight * REACH_LINE;
      setSpine({
        top: first - listTop,
        height: last - first,
        fill: Math.min(1, Math.max(0, (line - first) / (last - first || 1))),
      });
      setReached(centres.reduce((n, c, i) => (c <= line ? i : n), -1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    const ro = new ResizeObserver(onScroll);
    ro.observe(list);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative flex flex-col gap-6 lg:h-full lg:justify-between">
      <span
        aria-hidden
        className="absolute left-6 w-0.5 -translate-x-1/2 bg-theme-line"
        style={{ top: spine.top, height: spine.height }}
      >
        <span
          className="block h-full w-full origin-top bg-brand-yellow"
          style={{ transform: `scaleY(${spine.fill})` }}
        />
      </span>

      {steps.map((step, i) => {
        const Icon = stepIcons[i];
        const isReached = i <= reached;
        return (
          <li key={step.title} className="relative grid grid-cols-[3rem_1fr] items-start gap-x-5 sm:gap-x-6">
            <Reveal from="pop" className="relative z-10 mt-5">
              <span
                data-step-badge
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ring-8 ring-theme-surface transition-colors duration-500",
                  isReached
                    ? "bg-brand-yellow text-brand-navy"
                    : "border border-theme-line bg-theme-card text-theme-muted-45",
                )}
              >
                0{i + 1}
              </span>
            </Reveal>

            <Reveal from="left" delay={120}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-theme-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(35,38,56,0.3)] sm:p-7",
                  isReached ? "border-theme-ink/15" : "border-theme-line",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 w-1 origin-top bg-brand-yellow transition-transform duration-500",
                    isReached ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-theme-soft text-theme-ink transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-brand-navy">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.5} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-muted-55">
                    <ClockIcon className="h-3.5 w-3.5" />
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-theme-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-theme-body/70">{step.body}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}