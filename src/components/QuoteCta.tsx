"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import { site } from "@/config/site";
import { CloseIcon, MailIcon, PhoneIcon } from "./icons";
import { buttonClass, type ButtonVariant } from "./ui";

const QuoteNoticeContext = createContext<() => void>(() => {});

/** Hosts the single "coming soon" notice shown when a quote CTA is clicked before the partner URL is live. */
export function QuoteNoticeProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => dialogRef.current?.showModal(), []);
  const close = () => dialogRef.current?.close();

  return (
    <QuoteNoticeContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="quote-notice-title"
        aria-describedby="quote-notice-body"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2.5rem)] max-w-lg rounded-2xl bg-theme-card p-0 text-theme-body shadow-2xl backdrop:bg-brand-navy/50 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-8 sm:p-10">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full p-2 text-theme-muted-50 transition hover:bg-theme-soft hover:text-theme-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <h2 id="quote-notice-title" className="pr-8 text-2xl font-bold leading-tight text-theme-ink">
            Your quote will be with our finance partner
          </h2>
          <div id="quote-notice-body" className="mt-4 space-y-3 leading-relaxed text-theme-body/75">
            <p>
              Soon, clicking <strong className="font-semibold text-theme-ink">{site.primaryCta.label}</strong> will
              take you to our partner&apos;s secure website. There you can check your eligibility and get a personalised
              quote in minutes, without affecting your credit score.
            </p>
            <p>This link isn&apos;t live yet. In the meantime, our team is happy to help:</p>
          </div>

          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-3 text-theme-ink">
              <PhoneIcon className="h-4 w-4 shrink-0 text-theme-muted-50" />
              {site.contact.phone}
            </li>
            <li className="flex items-center gap-3 text-theme-ink wrap-anywhere">
              <MailIcon className="h-4 w-4 shrink-0 text-theme-muted-50" />
              {site.contact.email}
            </li>
          </ul>

          <button type="button" onClick={close} className={buttonClass("primary", "mt-8 w-full")} autoFocus>
            Got it
          </button>
        </div>
      </dialog>
    </QuoteNoticeContext.Provider>
  );
}

/**
 * "Get a quote" call to action. Links to the external partner site once
 * `site.primaryCta.url` is set; until then it opens the coming-soon notice.
 */
export function QuoteCta({
  variant = "primary",
  className,
  children = site.primaryCta.label,
  onClick,
}: {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  const openNotice = useContext(QuoteNoticeContext);
  const url = site.primaryCta.url;

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} onClick={onClick}>
        {children}
        <span className="sr-only"> (opens our finance partner&apos;s website in a new tab)</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={buttonClass(variant, className)}
      onClick={() => {
        onClick?.();
        openNotice();
      }}
    >
      {children}
    </button>
  );
}
