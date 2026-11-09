import Link from "next/link";
import { BikeCard } from "@/components/BikeCard";
import { FeatureCard } from "@/components/FeatureCard";
import { ArrowRightIcon, CheckIcon, KeyIcon, ShieldIcon, TagIcon, WalletIcon } from "@/components/icons";
import { CtaBand, FaqSection, FullBleedHero, Reviews } from "@/components/sections";
import { StockSearch } from "@/components/StockSearch";
import { TrustpilotAttribution } from "@/components/TrustpilotAttribution";
import { ButtonLink, Gold, Section, SectionHeading, TextLink } from "@/components/ui";
import { bikes } from "@/content/stock";
import { filterBikes, makeCounts, sortBikes, stockSearchParams, type StockQuery } from "@/lib/stock";

const popularSearches: { label: string; query: StockQuery }[] = [
  { label: "Bikes under £5,000", query: { mode: "total", max: 5000 } },
  { label: "Under £100 a month", query: { mode: "monthly", max: 100 } },
  { label: "Adventure bikes", query: { mode: "total", category: "Adventure" } },
  { label: "Sports bikes", query: { mode: "total", category: "Sport" } },
  { label: "Cruisers", query: { mode: "total", category: "Cruiser" } },
  { label: "Commuters & scooters", query: { mode: "total", category: "Commuter" } },
];

export default function Home() {
  const makes = makeCounts(bikes);
  const arrivals = sortBikes(bikes, "newest").slice(0, 4);

  return (
    <>
      <FullBleedHero
        size="tall"
        title={
          // Kept on one line; shrinks on phones so it still fits.
          <span className="whitespace-nowrap max-md:text-[6vw]">
            Find your next <Gold>super</Gold> bike
          </span>
        }
        intro={`${bikes.length} quality used bikes in stock today. Tell us your budget and we'll show you what it buys.`}
        image="/images/hero-home-poster.jpg"
        imageAlt="Motorcyclist riding a winding mountain road at golden hour"
        video="/videos/hero-home.mp4"
        videoPortrait="/videos/hero-home-portrait.mp4"
        align="center"
      >
        <StockSearch className="w-[min(calc(100vw-2.5rem),62rem)]" />
        <TrustpilotAttribution onDark />
      </FullBleedHero>

      <Section tone="soft" className="py-14 sm:py-16">
        <h2 className="mb-6 text-2xl font-bold text-theme-ink">Browse by make</h2>
        <ul className="flex flex-wrap gap-3">
          {makes.map((m) => (
            <li key={m.make}>
              <Link
                href={`/bikes?${stockSearchParams({ mode: "total", make: m.make })}`}
                className="inline-flex items-center gap-2 rounded-full border border-theme-line bg-theme-card px-5 py-2.5 font-semibold text-theme-ink transition hover:border-theme-ink/30 hover:bg-brand-yellow focus-visible:ring-3 focus-visible:ring-brand-yellow focus-visible:outline-none hover:text-brand-navy"
              >
                {m.make}
                <span className="text-sm font-normal text-theme-body/60">{m.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          title="Find the right bike, fast"
          intro="The searches riders run most. Every count is live stock."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularSearches.map(({ label, query }) => {
            const n = filterBikes(bikes, query).length;
            return (
              <li key={label}>
                <Link
                  href={`/bikes?${stockSearchParams(query)}`}
                  className="group flex items-center justify-between rounded-2xl border border-theme-line bg-theme-card p-6 transition hover:-translate-y-0.5 hover:border-theme-ink/20 hover:shadow-[0_12px_40px_-12px_rgba(35,38,56,0.18)] focus-visible:ring-3 focus-visible:ring-brand-yellow focus-visible:outline-none motion-reduce:hover:translate-y-0"
                >
                  <span>
                    <span className="block text-lg font-bold text-theme-ink">{label}</span>
                    <span className="text-sm text-theme-body/70">
                      View {n} {n === 1 ? "bike" : "bikes"}
                    </span>
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-theme-ink transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="soft">
        <SectionHeading title="Our latest arrivals" intro="Freshly prepared, fully checked and ready to ride." />
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {arrivals.map((bike) => (
            <li key={bike.slug}>
              <BikeCard bike={bike} />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <TextLink href="/bikes">
            View all {bikes.length} bikes <ArrowRightIcon className="h-4 w-4" />
          </TextLink>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard icon={ShieldIcon} title="Inspected before sale">
            Every bike is mechanically checked and HPI cleared before it goes on the forecourt.
          </FeatureCard>
          <FeatureCard icon={CheckIcon} title="Warranty included">
            Cover as standard on every bike, with extended plans available.
          </FeatureCard>
          <FeatureCard icon={WalletIcon} title="Finance in minutes">
            A decision usually within the hour. All credit histories considered.
          </FeatureCard>
          <FeatureCard icon={KeyIcon} title="Part-exchange welcome">
            We&apos;ll value your old bike and settle any outstanding finance.
          </FeatureCard>
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start with the monthly payment</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
              Most riders know what they can afford each month long before they know which bike they want. Work it
              the same way round: set your budget, then see what it buys.
            </p>
            <ul className="mt-6 space-y-2.5 text-white/90">
              {[
                "A decision in principle in minutes, with no mark on your credit file.",
                "All credit histories considered.",
                "Hire Purchase and PCP available on most of our stock.",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/bike-finance">
                About bike finance <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
              <TextLink href="/calculator" onDark>
                Calculate payments
              </TextLink>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            Figures are for illustration only and are not a quotation. Your actual rate and monthly payment depend
            on your circumstances and the lender you are matched with. SuperBike Factory is a credit broker, not a
            lender.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Got a bike to sell? We'll buy it."
        body="Free valuation, no obligation, and we'll buy your bike whether you're buying one from us or not. Still on finance? We'll settle it direct with your lender."
        image="/images/city-ride.jpg"
      >
        <ButtonLink href="/sell-your-bike" className="mt-9">
          <TagIcon className="h-4 w-4" /> Get a free valuation
        </ButtonLink>
      </CtaBand>

      <Reviews />
      <FaqSection limit={4} />
    </>
  );
}
