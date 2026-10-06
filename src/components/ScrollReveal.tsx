"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_MS = 90;
/** How far down the content tree to split a block into individually revealed children. */
const MAX_DEPTH = 2;

function isOverlay(el: HTMLElement) {
  const { position, display } = getComputedStyle(el);
  return position === "absolute" || position === "fixed" || display === "none";
}

/**
 * Collects the blocks to reveal inside `parent`. Blocks that already animate themselves
 * (<Reveal>, `[data-reveal]`) are left alone; wrappers around them are searched instead.
 * Groups of headings/paragraphs/columns are split up so they come in one after another.
 */
function collect(parent: Element, depth: number, out: HTMLElement[][]) {
  const group: HTMLElement[] = [];
  for (const child of Array.from(parent.children)) {
    if (
      !(child instanceof HTMLElement) ||
      child.hasAttribute("data-reveal") ||
      child.hasAttribute("data-no-reveal") ||
      isOverlay(child)
    )
      continue;
    if (child.querySelector("[data-reveal]")) {
      collect(child, depth + 1, out);
      continue;
    }
    const splittable =
      depth < MAX_DEPTH &&
      child.tagName === "DIV" &&
      !child.hasAttribute("role") &&
      child.childElementCount > 1;
    if (splittable) collect(child, depth + 1, out);
    else group.push(child);
  }
  if (group.length) out.push(group);
}

/**
 * Fades and lifts each section's content into view as the visitor scrolls down. Mounted once in
 * the layout and re-run on every navigation. Content already on screen when the page loads is
 * never hidden, and reduced-motion visitors see everything immediately.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups: HTMLElement[][] = [];
    document.querySelectorAll("main section:not([data-hero])").forEach((section) => {
      for (const container of Array.from(section.children)) {
        if (container instanceof HTMLElement && !isOverlay(container)) collect(container, 0, groups);
      }
    });

    const fold = window.innerHeight * 0.92;
    const targets: HTMLElement[] = [];
    for (const group of groups) {
      let index = 0;
      for (const el of group) {
        if (el.getBoundingClientRect().top < fold) continue;
        el.dataset.reveal = "up";
        el.dataset.autoReveal = "";
        // The delay only applies to the reveal itself, so hover effects on the element stay snappy afterwards.
        el.style.transitionDelay = `${Math.min(index, 5) * STAGGER_MS}ms`;
        el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
        targets.push(el);
        index++;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      for (const el of targets) {
        delete el.dataset.reveal;
        delete el.dataset.autoReveal;
        delete el.dataset.revealed;
        el.style.transitionDelay = "";
      }
    };
  }, [pathname]);

  return null;
}
