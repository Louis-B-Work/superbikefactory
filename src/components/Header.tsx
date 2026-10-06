"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { publicPath } from "@/lib/deployment";
import { CloseIcon, MenuIcon } from "./icons";
import { QuoteCta } from "./QuoteCta";
import { ThemeLogo } from "./ThemeLogo";
import { Container, cn } from "./ui";

/** Routes that open with a full-bleed image hero, where the header starts transparent. */
const HERO_ROUTES = ["/", "/about", "/bike-finance", "/bad-credit-finance"];
const SCROLL_THRESHOLD = 24;

function normalise(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function Header() {
  const pathname = normalise(usePathname() ?? "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      // Written straight to the DOM so the bar tracks scrolling without re-rendering the header.
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const overHero = HERO_ROUTES.includes(pathname) && !scrolled && !open;
  const showProgress = scrolled && !open;

  return (
    <header
      data-over-hero={overHero || undefined}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
        overHero ? "bg-transparent" : "bg-theme-surface shadow-[0_1px_0_0_var(--line)]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] transition-opacity duration-300",
          showProgress ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          ref={progressRef}
          data-scroll-progress
          className="h-full w-full origin-left bg-brand-yellow"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <Container className="flex h-18 items-center justify-between gap-6">
        {/* Forces a real page load rather than client navigation, so the logo always refreshes and replays the entrance. */}
        <Link
          href="/"
          className="animate-nav-in relative shrink-0"
          aria-label={`${site.name} home`}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            setOpen(false);
            // Jump to the top first, so the reload doesn't restore the old scroll position.
            window.scrollTo({ top: 0, behavior: "instant" });
            if (pathname === "/") window.location.reload();
            else window.location.href = publicPath("/");
          }}
        >
          <ThemeLogo className="h-6 sm:h-7" preload />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item, i) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="animate-nav-in" style={{ animationDelay: `${100 + i * 80}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "link-underline py-1 text-[15px] font-semibold transition-colors duration-300",
                      overHero
                        ? active
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                        : active
                          ? "text-theme-ink"
                          : "text-theme-body/70 hover:text-theme-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="animate-nav-in hidden [animation-delay:380ms] md:block">
          <QuoteCta className="px-5 py-2.5 text-sm" />
        </div>

        <button
          type="button"
          className={cn(
            "animate-nav-in -mr-2 inline-flex items-center justify-center rounded-md p-2 transition-colors [animation-delay:120ms] md:hidden",
            overHero ? "text-white" : "text-theme-ink",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 top-18 bottom-0 bg-theme-surface md:hidden">
        <Container className="flex flex-col py-6">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-theme-line py-4 text-xl font-semibold",
                  active ? "text-theme-ink" : "text-theme-body/70",
                )}
              >
                {item.label}
                {active && <span aria-hidden className="ml-2 inline-block h-2 w-2 rounded-full bg-brand-yellow" />}
              </Link>
            );
          })}
          <QuoteCta className="mt-8" onClick={() => setOpen(false)} />
        </Container>
      </div>
    </header>
  );
}
