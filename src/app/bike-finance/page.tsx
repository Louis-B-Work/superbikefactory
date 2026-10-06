import type { Metadata } from "next";
import { EditorialSection } from "@/components/EditorialSection";
import { FeatureCard } from "@/components/FeatureCard";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { RepresentativeExample } from "@/components/RepresentativeExample";
import { QuoteCta } from "@/components/QuoteCta";
import { Reveal } from "@/components/Reveal";
import { CtaBand, FaqSection, FinanceTypes, FullBleedHero, HowItWorks } from "@/components/sections";
import { Gold, Section, SectionHeading, TextLink } from "@/components/ui";
import { financeConsiderations } from "@/content/bikeFinance";

export const metadata: Metadata = {
  title: "Bike Finance",
  description:
    "Motorbike finance for new and used bikes: HP and PCP from our panel of lenders. All credit histories considered. Get a quote with no impact on your credit score.",
};

const eligibility = [
  "Aged 18 or over",
  "A UK resident for the last 3 years",
  "A regular income (employed, self-employed or retired)",
  "A valid UK licence for the bike you'll ride",
  "A UK bank account",
];

export default function BikeFinancePage() {
  return (
    <>
      <FullBleedHero
        title={
          <>
            Motorbike finance, <Gold>made simple</Gold>
          </>
        }
        intro="New or used, sports or scooter, we'll search our panel of lenders to find finance that fits you. Checking your eligibility won't affect your credit score."
        image="/images/hero-finance.jpg"
        imageAlt="Black and orange electric motorbike parked against a dark tiled wall"
        objectPosition="72% center"
      >
        <QuoteCta>
          Get a quote <ArrowRightIcon className="h-4 w-4" />
        </QuoteCta>
        <TextLink href="#calculator" onDark>
          Calculate payments
        </TextLink>
      </FullBleedHero>

      <EditorialSection
        title={<>More time riding.<br /><span className="font-serif font-normal italic">Less time searching.</span></>}
        image="/images/city-ride.jpg"
        imageAlt="Motorcyclist riding a black sports bike through the city"
        objectPosition="55% center"
      >
        <p>
          Your first big bike, a daily commute or a weekend escape. Whatever you ride for, finance can help you
          spread the cost of a new or used motorbike over monthly repayments.
        </p>
        <p>
          We&apos;re a credit broker, not a lender. Instead of approaching lenders one by one, you tell us what you
          need and we search our panel for options that fit your circumstances.
        </p>
        <p>
          Start with the type of agreement that suits your plans, then work out a budget you&apos;re comfortable with.
          Any offer is subject to your circumstances and affordability.
        </p>
        <TextLink href="#finance-types" className="mt-3">
          Explore your options <ArrowRightIcon className="h-4 w-4" />
        </TextLink>
      </EditorialSection>

      <FinanceTypes detailed />

      <HowItWorks />

      <Section tone="dark" pattern>
        <SectionHeading
          title="A good deal goes beyond the monthly payment"
          intro="Three things to think about before choosing your motorbike finance."
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {financeConsiderations.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 90} className="h-full">
                <FeatureCard number={i + 1} title={item.title}>
                  <p>{item.body}</p>
                </FeatureCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section pattern>
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              title="Can I apply?"
              intro="Most riders can. You'll usually need to be:"
            />
            <ul className="-mt-6 space-y-3">
              {eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 text-theme-body/80">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-theme-ink" strokeWidth={2.5} />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-8 leading-relaxed text-theme-body/70">
              Had credit problems in the past? Don&apos;t let that put you off. Some of our lenders specialise in
              helping riders with less-than-perfect credit.
            </p>
            <TextLink href="/bad-credit-finance" className="mt-4">
              Bad credit motorbike finance <ArrowRightIcon className="h-4 w-4" />
            </TextLink>
            <p className="mt-6 text-sm leading-relaxed text-theme-muted-60">
              Individual lenders may have additional requirements. Meeting these criteria doesn&apos;t guarantee
              approval; finance is subject to status and affordability.
            </p>
          </div>
          <RepresentativeExample />
        </div>
      </Section>

      <FaqSection />
      <CtaBand image="/images/mountain-ride.jpg" objectPosition="60% 65%" mirror={false} />
    </>
  );
}
