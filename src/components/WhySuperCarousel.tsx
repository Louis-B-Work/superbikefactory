"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type KeyboardEvent } from "react";
import { whySuperCards } from "@/content/whySuper";
import { ArrowRightIcon } from "./icons";
import { Reveal } from "./Reveal";

export function WhySuperCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);

  const nudge = (direction: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.firstElementChild;
    if (!track || !(first instanceof HTMLElement)) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Why choose SuperBike Factory">
      <ul
        id="why-super-cards"
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Our benefits, scroll or swipe horizontally"
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto overscroll-x-contain px-5 py-4 focus-visible:rounded-2xl sm:-mx-8 sm:scroll-px-8 sm:gap-6 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12 xl:-mx-16 xl:scroll-px-16 xl:px-16 2xl:-mx-24 2xl:scroll-px-24 2xl:px-24"
      >
        {whySuperCards.map((card, i) => (
          <li
            key={card.title}
            className="w-[min(74vw,280px)] shrink-0 snap-start first:ml-auto last:mr-auto sm:w-80 lg:w-[370px]"
          >
            <Reveal delay={i * 90} threshold={0.01} className="h-full">
              <Link
                href={card.href}
                aria-label={`${card.title}: ${card.linkLabel}`}
                className="group relative isolate flex min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-brand-navy-dark p-6 text-white transition-transform duration-300 motion-safe:can-hover:hover:scale-[1.02] sm:min-h-[520px] sm:p-8 lg:min-h-[600px] motion-reduce:transition-none"
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 370px, (min-width: 640px) 320px, (min-width: 379px) 280px, 74vw"
                  className="-z-20 object-cover"
                  style={{ objectPosition: card.objectPosition }}
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-brand-navy/95 via-brand-navy/45 to-brand-navy/20" />
                <div>
                  <h3 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{card.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-white/90">{card.body}</p>
                </div>
                <span
                  aria-hidden
                  className="mt-12 flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full bg-white text-brand-navy transition-colors duration-300 group-hover:bg-brand-yellow group-focus-visible:bg-brand-yellow motion-reduce:transition-none"
                >
                  <ArrowRightIcon className="h-5 w-5 -rotate-45 transition-transform duration-300 motion-safe:group-hover:rotate-0 motion-safe:group-focus-visible:rotate-0 motion-reduce:transition-none" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
