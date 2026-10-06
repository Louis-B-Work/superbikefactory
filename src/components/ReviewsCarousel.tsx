"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import type { Testimonial } from "@/content/finance";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from "./icons";
import { cn } from "./ui";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={cn("h-4.5 w-4.5", i < rating ? "text-brand-yellow" : "text-theme-line")}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index, total }: { review: Testimonial; index: number; total: number }) {
  return (
    <article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      className="relative flex h-full flex-col rounded-2xl border border-theme-line bg-theme-card p-7 shadow-[0_1px_2px_rgba(35,38,56,0.04),0_8px_24px_-12px_rgba(35,38,56,0.12)] transition duration-300 can-hover:hover:-translate-y-1 can-hover:hover:shadow-[0_1px_2px_rgba(35,38,56,0.04),0_20px_40px_-16px_rgba(35,38,56,0.22)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <Stars rating={review.rating} />
        <span className="text-xs text-theme-muted-45">{review.date}</span>
      </div>

      <h3 className="mt-5 text-lg font-bold leading-snug text-theme-ink">{review.title}</h3>
      <blockquote className="mt-3 flex-1 leading-relaxed text-theme-body/75">
        <p>“{review.quote}”</p>
      </blockquote>

      <footer className="mt-7 flex items-center gap-3 border-t border-theme-line pt-5">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-brand-yellow"
        >
          {review.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-theme-ink">
            {review.name}, <span className="font-normal text-theme-muted-60">{review.location}</span>
          </p>
          <p className="truncate text-sm text-theme-muted-55">{review.bike}</p>
        </div>
      </footer>
    </article>
  );
}

export function ReviewsCarousel({ reviews, heading }: { reviews: Testimonial[]; heading?: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(reviews.length);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const slideWidth = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const track = trackRef.current;
    const step = slideWidth();
    if (!track || !step) return;
    const visible = Math.max(1, Math.round((track.clientWidth + 1) / step));
    setPages(Math.max(1, reviews.length - visible + 1));
    setActive(Math.round(track.scrollLeft / step));
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  }, [reviews.length, slideWidth]);

  useEffect(() => {
    update();
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => ro.disconnect();
  }, [update]);

  const goTo = (index: number) => {
    trackRef.current?.scrollTo({ left: index * slideWidth(), behavior: "smooth" });
  };
  const nudge = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * slideWidth(), behavior: "smooth" });
  };

  // Mouse drag-to-scroll. Touch and pen use the browser's native swipe and scroll-snap.
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !trackRef.current) return;
    drag.current = { startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d || !track) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      track.setPointerCapture(e.pointerId);
    }
    if (d.moved) track.scrollLeft = d.startScroll - dx;
  };
  const endDrag = (e: PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    drag.current = null;
    if (!d?.moved || !track) return;
    if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
    setDragging(false);
    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
    const step = slideWidth();
    if (step) {
      // Settle on the nearest card, biased in the direction of the drag.
      const dx = e.clientX - d.startX;
      const raw = track.scrollLeft / step;
      const index = Math.abs(dx) > step * 0.15 ? (dx < 0 ? Math.ceil(raw) : Math.floor(raw)) : Math.round(raw);
      track.scrollTo({ left: index * step, behavior: "smooth" });
    }
  };
  const onClickCapture = (e: MouseEvent<HTMLUListElement>) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-theme-ink/15 bg-theme-card text-theme-ink transition hover:border-theme-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-theme-ink/15";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div className="min-w-0">{heading}</div>
        <div className="hidden shrink-0 gap-3 sm:flex">
          <button type="button" className={arrowClass} onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous review">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <button type="button" className={arrowClass} onClick={() => nudge(1)} disabled={atEnd} aria-label="Next review">
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        tabIndex={0}
        aria-label="Reviews, scroll or swipe horizontally"
        className={cn(
          "no-scrollbar -mx-5 flex gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pt-2 pb-8 outline-none focus-visible:ring-3 focus-visible:ring-brand-yellow sm:-mx-2 sm:scroll-px-2 sm:gap-6 sm:px-2 can-hover:cursor-grab",
          // Snapping fights a mouse drag, so it is paused until the drag settles.
          dragging ? "cursor-grabbing! snap-none select-none" : "snap-x snap-mandatory",
        )}
      >
        {reviews.map((review, i) => (
          <li
            key={review.name + review.date}
            className="shrink-0 basis-[86%] snap-start sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] 2xl:basis-[calc((100%-4.5rem)/4)]"
          >
            <ReviewCard review={review} index={i} total={reviews.length} />
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "w-7 bg-brand-navy" : "w-2 bg-brand-navy/15 hover:bg-brand-navy/30",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
