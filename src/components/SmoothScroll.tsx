"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Eased, inertial scrolling for mouse wheels and trackpads (touch keeps the native feel).
 * Lenis moves the real window scroll position, so sticky elements, IntersectionObservers and
 * scroll listeners all keep working. Skipped for reduced-motion visitors.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      autoRaf: true,
      // Let open dialogs handle their own wheel input.
      prevent: (node) => node.closest("dialog") !== null,
    });

    // Same-page links (#calculator etc.) glide too. Handled here, in the capture phase, so the click
    // is cancelled before Next's <Link> does its own instant jump. Lenis honours scroll-margin-top.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    };
    document.addEventListener("click", onClick, true);

    // Pause while the mobile menu or a modal locks the page.
    const sync = () => {
      const locked = document.body.style.overflow === "hidden" || document.querySelector("dialog[open]") !== null;
      if (locked) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"], subtree: false });
    observer.observe(document.body, { attributes: true, attributeFilter: ["open"], subtree: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
    };
  }, []);

  return null;
}
