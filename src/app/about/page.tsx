import type { Metadata } from "next";
import { EditorialSection } from "@/components/EditorialSection";
import { FeatureCard } from "@/components/FeatureCard";
import { ArrowRightIcon, ScaleIcon, ShieldIcon, UsersIcon } from "@/components/icons";
import { CtaBand, FullBleedHero } from "@/components/sections";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Gold, Section, SectionHeading, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SuperBike Factory has helped riders across the UK get on two wheels for years. Buy a quality used bike, sell the one you ride now, and finance it your way.",
};

const values = [
  {
    icon: UsersIcon,
    title: "Riders first",
    body: "We're bike people. We know what the right bike means, and we want to get you on it.",
  },
  {
    icon: ShieldIcon,
    title: "Honest & transparent",
    body: "Clear figures and no hidden fees. We'll explain how your finance works before you commit.",
  },
  {
    icon: ScaleIcon,
    title: "Fair for everyone",
    body: "Your credit history doesn't define you. We look for lenders who see the whole picture.",
  },
];

export default function AboutPage() {
  return (
    <>
      <FullBleedHero
        title={
          <>
            The name riders trust, <Gold>for your next bike</Gold>
          </>
        }
        intro="SuperBike Factory has helped riders across the UK find their next bike for years. Now you can buy, sell and finance, all in one place."
        image="/images/hero-about-cruiser.jpg"
        imageAlt="Detail of a black cruiser motorbike with chrome engine and exhaust"
        objectPosition="65% center"
      >
        <ButtonLink href="/bikes">
          Browse our bikes <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
        <TextLink href="#our-story" onDark>
          Our story
        </TextLink>
      </FullBleedHero>

      <aside aria-label="Help with pre-administration complaints" className="border-y border-brand-yellow/40 bg-brand-yellow/10">
        <Container className="py-4">
          <p className="text-sm leading-relaxed text-theme-body/80">
            <strong className="text-theme-ink">Bought before administration?</strong>{" "}
            For help with a complaint relating to that period, email the administrators at{" "}
            <a href="mailto:SBF@kr8.co.uk" className="font-bold text-theme-ink underline underline-offset-2">
              SBF@kr8.co.uk
            </a>
            .
          </p>
        </Container>
      </aside>

      <EditorialSection
        id="our-story"
        title={<>Built by bikers.<br /><span className="font-serif font-normal italic">Still here for bikers.</span></>}
        image="/images/city-ride.jpg"
        imageAlt="Rider travelling through the city on a black motorbike"
        objectPosition="55% center"
        imageFirst
      >
        <p>
          For years, SuperBike Factory was one of the UK&apos;s best-known names in used motorbikes. A huge choice
          of bikes, nationwide delivery and a team who lived and breathed two wheels.
        </p>
        <p>
          We learned that finding the right bike is only half the journey. Paying for it in a way that works for
          you matters just as much.
        </p>
        <p>
          Today we bring both together: quality used bikes to choose from, finance from our panel of lenders if
          you want it, and a straightforward way to sell the bike you ride now.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="/bikes">
            Browse our bikes <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <TextLink href="/sell-your-bike">Sell your bike</TextLink>
        </div>
      </EditorialSection>

      <Section tone="dark" pattern>
        <SectionHeading title="The things that won't change" intro="The same rider-first approach, whether you're buying, selling or financing." />
        <ul className="grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 90} className="h-full">
                <FeatureCard icon={Icon} title={title}>
                  <p>{body}</p>
                </FeatureCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              title="We're a broker, not a lender"
              intro="If you choose finance for your bike, here's what that means, without the jargon."
            />
            <TextLink href="/bike-finance">
              How bike finance works <ArrowRightIcon className="h-4 w-4" />
            </TextLink>
          </div>
          <div className="space-y-8 lg:col-span-7">
            <div className="border-l-2 border-brand-yellow pl-6">
              <h3 className="text-xl font-bold text-theme-ink">We do the searching</h3>
              <p className="mt-3 leading-relaxed text-theme-body/70">
                SuperBike Factory doesn&apos;t lend money. We introduce you to lenders on our panel who may be able
                to offer you finance. The lender assesses your application and provides the agreement.
              </p>
            </div>
            <div className="border-l-2 border-brand-yellow pl-6">
              <h3 className="text-xl font-bold text-theme-ink">You make the decision</h3>
              <p className="mt-3 leading-relaxed text-theme-body/70">
                Take time to understand the monthly repayments, APR and total amount payable before committing.
                Whether you go ahead is your choice; any offer is subject to status and affordability.
              </p>
            </div>
            <div className="border-l-2 border-brand-yellow pl-6">
              <h3 className="text-xl font-bold text-theme-ink">Clear about commission</h3>
              <p className="mt-3 leading-relaxed text-theme-body/70">
                We may receive a commission from the lender for an introduction. It won&apos;t affect the amount
                you pay, and we&apos;ll always be upfront about how it works.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Your next ride starts here"
        body="Browse our bikes in stock, or tell us what yours is worth."
        image="/images/mountain-ride.jpg"
        objectPosition="60% 65%"
        mirror={false}
      >
        <ButtonLink href="/bikes" className="mt-9">
          Browse our bikes <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
      </CtaBand>
    </>
  );
}
