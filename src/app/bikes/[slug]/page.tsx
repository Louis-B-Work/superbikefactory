import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BikeCard } from "@/components/BikeCard";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { QuoteCta } from "@/components/QuoteCta";
import { ButtonLink, Section } from "@/components/ui";
import { site } from "@/config/site";
import { bikeSubtitle, bikeTitle, bikes, getBike } from "@/content/stock";
import { formatGBP } from "@/lib/finance";
import { FINANCE_TERM_MONTHS, monthlyFor } from "@/lib/stock";

export const dynamicParams = false;

export function generateStaticParams() {
  return bikes.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBike(slug);
  if (!bike) return {};
  return {
    title: `${bike.year} ${bikeTitle(bike)} for Sale`,
    description: `${bikeTitle(bike)} ${bike.variant}, ${bike.mileage.toLocaleString("en-GB")} miles, ${formatGBP(bike.price, true)}. ${bike.description}`,
  };
}

export default async function BikePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bike = getBike(slug);
  if (!bike) notFound();

  const monthly = monthlyFor(bike);
  const similar = bikes.filter((b) => b.slug !== bike.slug && b.category === bike.category).slice(0, 4);
  const specs: [string, string][] = [
    ["Make", bike.make],
    ["Model", bike.model],
    ["Year", `${bike.year} (${bike.plate})`],
    ["Mileage", `${bike.mileage.toLocaleString("en-GB")} miles`],
    ["Engine", `${bike.engineCc}cc`],
    ["Type", bike.category],
    ["Colour", bike.colour],
  ];

  return (
    <>
      <Section className="pt-10 pb-12 sm:pt-12 sm:pb-16">
        <Link
          href="/bikes"
          className="link-underline mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-theme-ink"
        >
          <ArrowLeftIcon className="h-4 w-4" /> All bikes
        </Link>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-theme-soft">
              <Image
                src={bike.image}
                alt={`${bike.year} ${bikeTitle(bike)}`}
                fill
                preload
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              {bike.badge && (
                <span className="absolute top-4 left-4 rounded-full bg-brand-yellow px-3.5 py-1 text-sm font-bold text-brand-navy">
                  {bike.badge}
                </span>
              )}
            </div>
            <h2 className="mt-10 text-2xl font-bold text-theme-ink">About this bike</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-theme-body/80">{bike.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {bike.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-theme-body/90">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-success" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-theme-line bg-theme-card p-6">
              <h1 className="text-3xl font-bold leading-tight text-theme-ink">{bikeTitle(bike)}</h1>
              <p className="mt-1 text-theme-body/70">{bikeSubtitle(bike)}</p>
              <p className="mt-5 text-4xl font-bold text-theme-ink">{formatGBP(bike.price, true)}</p>
              {monthly !== undefined ? (
                <>
                  <p className="mt-1 font-semibold text-theme-ink">
                    or {formatGBP(monthly, true)} a month over {FINANCE_TERM_MONTHS / 12} years
                  </p>
                  <p className="mt-2 text-xs leading-snug text-theme-muted-50">
                    Representative {site.calculator.illustrativeApr}% APR, no deposit. For illustration only, not a
                    quotation. We are a credit broker, not a lender. Finance is subject to status.
                  </p>
                </>
              ) : (
                <p className="mt-1 font-semibold text-theme-body/70">Cash sale only</p>
              )}
              <div className="mt-6 flex flex-col gap-3">
                {monthly !== undefined && (
                  <QuoteCta className="w-full">
                    Get a finance quote <ArrowRightIcon className="h-4 w-4" />
                  </QuoteCta>
                )}
                <ButtonLink href="/contact" variant="secondary" className="w-full">
                  Enquire about this bike
                </ButtonLink>
              </div>
            </div>

            <dl className="divide-y divide-theme-line rounded-2xl border border-theme-line bg-theme-card px-6 text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-3">
                  <dt className="text-theme-body/70">{k}</dt>
                  <dd className="font-semibold text-theme-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="text-sm text-theme-body/70">
              Got a bike to part-exchange?{" "}
              <Link href="/sell-your-bike" className="font-bold text-theme-ink underline underline-offset-2">
                Get a free valuation
              </Link>
              .
            </p>
          </aside>
        </div>
      </Section>

      {similar.length > 0 && (
        <Section tone="soft" className="py-14 sm:py-20">
          <h2 className="mb-8 text-2xl font-bold text-theme-ink">Similar bikes</h2>
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {similar.map((b) => (
              <li key={b.slug}>
                <BikeCard bike={b} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
