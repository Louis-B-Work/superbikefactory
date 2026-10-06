import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { UtilityHero } from "./UtilityHero";
import { Section } from "./ui";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <UtilityHero title={title}>
        <p className="border-l-2 border-brand-yellow pl-4 text-sm leading-relaxed text-theme-muted-60">
          [PLACEHOLDER] This page is a placeholder. Replace it with approved legal copy before launch.
        </p>
      </UtilityHero>
      <Section>
        <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-theme-body/75 sm:text-lg [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-theme-line [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-theme-ink">
          {children}
        </div>
      </Section>
      <section className="border-t border-theme-line bg-theme-soft px-5 py-8 sm:px-8">
        <nav aria-label="Policies and support" className="mx-auto flex max-w-2xl flex-wrap gap-x-8 gap-y-4">
          {site.legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.label.toLowerCase() === title.toLowerCase() ? "page" : undefined}
              className="link-underline text-sm font-semibold text-theme-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
