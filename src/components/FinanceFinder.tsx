"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { financeTypes } from "@/content/finance";
import { financeTypeIcons } from "./financeTypeIcons";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, KeyIcon } from "./icons";
import { QuoteCta } from "./QuoteCta";
import { TextLink, cn } from "./ui";

type Path = { d: string; active: boolean };

function subscribeToLayout(listener: () => void) {
  const media = window.matchMedia("(min-width: 64rem)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function isMobileLayout() {
  return !window.matchMedia("(min-width: 64rem)").matches;
}

/** Position of `el` relative to `root`, ignoring CSS transforms (so reveal animations don't skew it). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/**
 * "Find the finance that fits" as a one-question picker: the visitor chooses what matters most
 * and a branch draws from their answer to the finance type that suits it best.
 */
export function FinanceFinder() {
  // Starts on the first answer so there is always a match on show; the visitor can switch.
  const [selected, setSelected] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const mobile = useSyncExternalStore(subscribeToLayout, isMobileLayout, () => false);
  const [paths, setPaths] = useState<Path[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLSpanElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current || !mobile) return;
    moveFocus.current = false;
    if (showResult) backRef.current?.focus({ preventScroll: true });
    else optionRefs.current[selected]?.focus({ preventScroll: true });
  }, [showResult, mobile, selected]);

  // Sweep the marker under the question once it's well into view, to point visitors at the first step.
  useEffect(() => {
    const el = questionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.marked = "";
        observer.disconnect();
      },
      { threshold: 1, rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    const result = resultRef.current;
    // The branch is only drawn in the side-by-side desktop layout.
    if (!root || !result || !window.matchMedia("(min-width: 64rem)").matches) {
      setPaths([]);
      return;
    }
    const r = offsetWithin(result, root);
    const ex = r.x;
    const ey = r.y + Math.min(r.h / 2, 120);
    setPaths(
      optionRefs.current.map((btn, i) => {
        if (!btn) return { d: "", active: false };
        const o = offsetWithin(btn, root);
        const sx = o.x + o.w;
        const sy = o.y + o.h / 2;
        const mx = sx + (ex - sx) / 2;
        return { d: `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`, active: i === selected };
      }),
    );
  }, [selected]);

  useEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [measure]);

  const choose = (i: number, reveal = false) => {
    setSelected(i);
    if (mobile && reveal) {
      moveFocus.current = true;
      setShowResult(true);
    }
  };
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + financeTypes.length) % financeTypes.length;
    choose(next);
    optionRefs.current[next]?.focus();
  };

  const match = financeTypes[selected];
  const MatchIcon = financeTypeIcons[match.short] ?? KeyIcon;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="Finance finder"
      data-finder-result={showResult ? "true" : "false"}
      className="finance-finder relative mx-auto grid max-w-6xl items-center lg:gap-x-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      {/* Branch from every answer to the result; the chosen one draws in yellow. */}
      {paths.length > 0 && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {paths.map((p, i) =>
            p.active ? null : (
              <path key={i} d={p.d} fill="none" strokeWidth={1.5} className="stroke-theme-line" strokeDasharray="4 6" />
            ),
          )}
          {paths.map((p, i) =>
            p.active ? (
              <path
                key={`${i}-${selected}`}
                d={p.d}
                fill="none"
                strokeWidth={3}
                strokeLinecap="round"
                pathLength={1}
                className="animate-branch-draw stroke-brand-yellow"
              />
            ) : null,
          )}
        </svg>
      )}

      <div data-finder-panel="choices" inert={mobile && showResult}>
        <h3 id="finder-question" className="text-2xl font-bold text-theme-ink">
          <span ref={questionRef} className="hover-marker">
            What matters most to you?
          </span>
        </h3>
        <p className="mt-3 text-sm text-theme-muted lg:hidden">Tap an option to see your finance match.</p>
        <div role="radiogroup" aria-labelledby="finder-question" className="mt-6 space-y-3">
          {financeTypes.map((t, i) => {
            const isSelected = selected === i;
            const Icon = financeTypeIcons[t.short] ?? KeyIcon;
            return (
              <button
                key={t.short}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => choose(i, true)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "group relative flex w-full items-center gap-4 rounded-2xl border bg-theme-card p-4 text-left transition duration-300 sm:p-5",
                  isSelected
                    ? "border-theme-ink shadow-[0_14px_32px_-18px_rgba(35,38,56,0.45)]"
                    : "border-theme-line hover:-translate-y-0.5 hover:border-theme-ink/30",
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    isSelected ? "bg-brand-yellow text-brand-navy" : "bg-theme-soft text-theme-ink group-hover:bg-brand-yellow/40",
                  )}
                >
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-bold text-theme-ink">{t.goal}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] leading-none font-bold tracking-wide uppercase transition-colors duration-300",
                        isSelected ? "bg-brand-yellow text-brand-navy" : "bg-theme-soft text-theme-ink",
                      )}
                    >
                      {t.short}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm text-theme-muted-60">{t.goalHint}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300",
                    isSelected ? "border-brand-navy bg-brand-navy text-brand-yellow" : "border-theme-control-line",
                  )}
                >
                  {isSelected && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => choose(selected, true)}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-theme-ink lg:hidden"
        >
          See my {financeTypes[selected].short} match <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div ref={resultRef} data-finder-panel="result" inert={mobile && !showResult} aria-live="polite">
          <div className="mb-4 lg:hidden">
            <button
              ref={backRef}
              type="button"
              onClick={() => {
                moveFocus.current = true;
                setShowResult(false);
              }}
              className="inline-flex min-h-11 items-center gap-2 font-bold text-theme-ink"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Change my selection
            </button>
          </div>
          <article
            key={match.short}
            className="animate-result-in relative overflow-hidden rounded-3xl border border-theme-ink/10 bg-theme-card p-7 shadow-[0_24px_60px_-30px_rgba(35,38,56,0.45)] sm:p-9"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow text-brand-navy">
                <MatchIcon className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <span className="rounded-full bg-brand-navy px-3 py-1 text-xs font-bold text-brand-yellow">
                Your best match
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-bold text-theme-ink sm:text-3xl">{match.name}</h3>
            <p className="mt-2 inline-flex rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-semibold text-theme-ink">
              Best for: {match.bestFor}
            </p>
            <p className="mt-5 leading-relaxed text-theme-body/70">{match.summary}</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-theme-line pt-6 sm:grid-cols-2">
              {match.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-theme-body/80">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-theme-ink" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <QuoteCta>
                Get a quote <ArrowRightIcon className="h-4 w-4" />
              </QuoteCta>
              <TextLink href="/bike-finance#finance-types">Compare all options</TextLink>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-theme-muted-50">
              A guide only. Our team will talk you through what suits your circumstances before you apply.
            </p>
          </article>
      </div>
    </div>
  );
}
