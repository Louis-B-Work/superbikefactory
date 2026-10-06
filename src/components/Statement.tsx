"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { ArrowRightIcon } from "./icons";
import { TextLink, cn } from "./ui";
import { ThemeLogo } from "./ThemeLogo";

type Segment = { text: string; style?: "serif" | "mark" };

/** Header height, so the pinned statement centres in the space below it. */
const HEADER_PX = 72;
/** Share of the pinned scroll spent lighting words; the rest holds the finished statement before moving on. */
const REVEAL_SHARE = 0.8;
/** How long scrolling must have settled before the finished statement collapses its pinned stretch. */
const COLLAPSE_IDLE_MS = 200;

/**
 * Large centred brand statement. When it reaches the middle of the screen it pins in place, and
 * the visitor's scrolling lights its words up one by one; once it's fully lit the page carries on.
 * This only plays once per page load: afterwards the words stay lit and the pin no longer holds the page.
 * The pin is a tall section with a sticky inner panel, so scrolling stays native. Words are only
 * dimmed, and the section only made tall, once the script is running (`data-scrub` / `data-pinned`),
 * so no-JS and reduced-motion visitors see the finished statement in a normal-height section.
 */
export function Statement({ segments, children }: { segments: Segment[]; children?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const el = ref.current;
    if (!section || !panel || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    el.dataset.scrub = "";
    section.dataset.pinned = "";

    let lit = -1;
    let frame = 0;
    let idle = 0;

    // Once the statement has played, collapse the pinned stretch to a single screen so later passes
    // scroll straight through; the panel looks exactly as it did while pinned. Collapsing moves
    // everything below the section, so it waits until scrolling has settled (a jump mid-glide would
    // fight the smooth scroller) and the change is out of sight: either the panel hasn't locked yet and
    // fills the rest of the screen, or the section is above the screen and the scroll position is
    // corrected to keep the content in view still.
    const collapse = () => {
      const rect = section.getBoundingClientRect();
      const above = rect.bottom <= 0;
      const beforePin = rect.top >= HEADER_PX && rect.top + panel.offsetHeight >= window.innerHeight;
      if (!above && !beforePin) return;
      section.dataset.played = "";
      if (above) window.scrollBy(0, section.getBoundingClientRect().bottom - rect.bottom);
      stop();
    };

    const update = () => {
      frame = 0;
      if (lit >= words.length) {
        clearTimeout(idle);
        idle = window.setTimeout(collapse, COLLAPSE_IDLE_MS);
        return;
      }
      const rect = section.getBoundingClientRect();
      // How far through the pinned stretch we are: 0 as the panel locks in place, 1 as it lets go.
      const travel = section.offsetHeight - (window.innerHeight - HEADER_PX);
      const progress = Math.min(1, Math.max(0, (HEADER_PX - rect.top) / (travel || 1)));
      // Words only ever light up, so the reveal plays once per page load rather than rewinding on the way back up.
      const next = Math.max(lit, Math.round(Math.min(1, progress / REVEAL_SHARE) * words.length));
      if (next === lit) return;
      words.forEach((w, i) => w.toggleAttribute("data-lit", i < next));
      lit = next;
      if (lit >= words.length) update();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      stop();
      delete el.dataset.scrub;
      delete section.dataset.pinned;
      delete section.dataset.played;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="group/pin relative bg-theme-surface pt-28 pb-16 data-pinned:h-[250svh] data-pinned:py-0 data-pinned:data-played:h-[calc(100svh-4.5rem)] sm:pt-40 sm:pb-20 sm:data-pinned:py-0"
    >
      <div
        ref={panelRef}
        className="group-data-pinned/pin:sticky group-data-pinned/pin:top-18 group-data-pinned/pin:flex group-data-pinned/pin:h-[calc(100svh-4.5rem)] group-data-pinned/pin:items-center"
      >
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          {" "}
          <ThemeLogo className="mx-auto h-7 w-fit sm:h-8" />
          <p
            ref={ref}
            data-no-reveal
            className="mt-10 text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.16] font-semibold tracking-tight text-theme-ink"
          >
            {segments.map((seg, s) => {
              const words = seg.text.split(" ");
              return words.map((word, w) => {
                const last = w === words.length - 1;
                // The marker runs across the gaps inside its phrase, so those spaces live inside the span.
                const spaceInside = seg.style === "mark" && !last;
                const spaceAfter = !spaceInside && !(last && s === segments.length - 1);
                return (
                  <Fragment key={`${s}-${w}`}>
                    <span
                      data-word=""
                      data-mark={seg.style === "mark" || undefined}
                      className={cn(
                        seg.style === "serif" && "font-serif text-[1.14em] font-normal tracking-normal italic",
                      )}
                    >
                      {spaceInside ? `${word} ` : word}
                    </span>
                    {spaceAfter && " "}
                  </Fragment>
                );
              });
            })}
          </p>
          {children && <div className="mt-12">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function HomeStatement() {
  return (
    <Statement
      segments={[
        { text: "We believe bikes are for everyone,", style: "serif" },
        {
          text: "and paying for them should be simple, fair and free of jargon. For years, riders trusted us to find their next bike. Now we search our panel of lenders to find finance that fits you,",
        },
        { text: "whatever your credit history.", style: "mark" },
      ]}
    >
      <TextLink href="/about">
        More about us <ArrowRightIcon className="h-4 w-4" />
      </TextLink>
    </Statement>
  );
}
