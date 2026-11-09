import type { Metadata } from "next";
import { FaqSection, FullBleedHero } from "@/components/sections";
import { CheckIcon, ClockIcon, KeyIcon, SearchIcon, ShieldIcon, WalletIcon } from "@/components/icons";
import { FeatureCard } from "@/components/FeatureCard";
import { SellBikeForm } from "@/components/SellBikeForm";
import { Section, SectionHeading } from "@/components/ui";
import type { Faq } from "@/content/finance";

export const metadata: Metadata = {
  title: "Sell Your Bike",
  description:
    "Sell your motorbike to SuperBike Factory. Free no-obligation valuation, we settle any finance, and same-day payment.",
};

const sellFaqs: Faq[] = [
  {
    q: "How do you value my bike?",
    a: "We start from your registration and mileage, then confirm the figure with a quick inspection. Valuations are indicative until the bike has been inspected.",
  },
  {
    q: "Can I sell a bike that's still on finance?",
    a: "Yes. We'll get a settlement figure from your lender, pay it directly and give you the difference.",
  },
  {
    q: "Do I have to buy a bike from you?",
    a: "No. We'll buy your bike whether or not you're buying one from us. If you are, we can use the value as part-exchange.",
  },
  {
    q: "How quickly do I get paid?",
    a: "Once you've accepted the offer and we've completed the paperwork, payment is made the same day.",
  },
];

export default function SellYourBikePage() {
  return (
    <>
      <FullBleedHero
        title="Sell your bike"
        intro="Get a free valuation in minutes. We'll buy your bike whether you're buying from us or not, and settle any outstanding finance."
        image="/images/hero-finance.jpg"
        imageAlt="Motorcyclist riding on an open road"
        points={["Free, no-obligation valuation", "We settle outstanding finance", "Same-day payment"]}
      />

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading align="left" title="Selling made simple" intro="No haggling with strangers, no time-wasters." />
            <ol className="space-y-6">
              {[
                [SearchIcon, "Tell us about your bike", "Enter your registration and mileage."],
                [WalletIcon, "Get your valuation", "We'll come back with a fair, no-obligation figure."],
                [KeyIcon, "Bring it in, get paid", "We inspect the bike and pay you the same day."],
              ].map(([Icon, title, body], i) => {
                const I = Icon as typeof SearchIcon;
                return (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-navy">
                      <I className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-theme-ink">{title as string}</h3>
                      <p className="text-theme-body/70">{body as string}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <SellBikeForm />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Why sell to us" />
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon={ShieldIcon} title="Fair, transparent offers">
            We value bikes on the current market, not on how desperate you are.
          </FeatureCard>
          <FeatureCard icon={CheckIcon} title="Finance settled for you">
            Still paying off your bike? We pay your lender direct.
          </FeatureCard>
          <FeatureCard icon={ClockIcon} title="Paid the same day">
            Accept the offer and the money&apos;s with you the day we complete.
          </FeatureCard>
        </div>
      </Section>

      <FaqSection items={sellFaqs} title="Selling your bike: your questions" />
    </>
  );
}
