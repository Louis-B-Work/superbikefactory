import type { Metadata } from "next";
import { EditorialSection } from "@/components/EditorialSection";
import { FeatureCard } from "@/components/FeatureCard";
import { ArrowRightIcon, ScaleIcon, ShieldIcon, UsersIcon } from "@/components/icons";
import { QuoteCta } from "@/components/QuoteCta";
import { CtaBand, FullBleedHero } from "@/components/sections";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Gold, Section, SectionHeading, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SuperBike Factory has helped riders across the UK get on two wheels for years. Now we're focused on one thing: finding you the right motorbike finance.",
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
            The name riders trust, <Gold>now in finance</Gold>
          </>
        }
        intro="SuperBike Factory helped thousands of riders across the UK find their next bike. Now we're putting that experience into one thing: helping you pay for it."
        image="/images/hero-about-cruiser.jpg"
        imageAlt="Detail of a black cruiser motorbike with chrome engine and exhaust"
        objectPosition="65% center"
      >
        <QuoteCta>
          Get a quote <ArrowRightIcon className="h-4 w-4" />
        </QuoteCta>
        <TextLink href="#our-story" onDark>
          Our story
        </TextLink>
      </FullBleedHero>

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
          you matters just as much. Now we&apos;re putting that experience into motorbike finance.
        </p>
        <p>
          We no longer sell bikes. We help you explore finance from our panel of lenders, so you can focus on
          choosing your next ride from a dealer.
        </p>
        <ButtonLink href="/bike-finance" className="mt-5">
          Explore bike finance <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
      </EditorialSection>

      <Section tone="dark" pattern>
        <SectionHeading title="The things that won't change" intro="A new focus, with the same rider-first approach." />
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
              intro="What that means for you, without the jargon."
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
        title="Your next chapter starts here"
        image="/images/mountain-ride.jpg"
        objectPosition="60% 65%"
        mirror={false}
      />
    </>
  );
}
