import type { Metadata } from "next";
import { EditorialSection } from "@/components/EditorialSection";
import { FeatureCard } from "@/components/FeatureCard";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { QuoteCta } from "@/components/QuoteCta";
import { Reveal } from "@/components/Reveal";
import { CtaBand, FaqSection, FullBleedHero, Reviews } from "@/components/sections";
import { Gold, Section, SectionHeading, TextLink } from "@/components/ui";
import { site } from "@/config/site";
import { approvalTips, badCreditFaqs, badCreditSteps, creditIssues, lenderChecks } from "@/content/badCredit";

export const metadata: Metadata = {
  title: "Bad Credit Motorbike Finance",
  description:
    "Motorbike finance for people with bad credit, CCJs, defaults or a thin credit file. Specialist lenders who look beyond your score. Checking your eligibility won't affect your credit score.",
};

const eligibility = [
  "Aged 18 or over",
  "A UK resident",
  "A regular income (employed, self-employed or retired)",
  "A valid UK licence for the bike you'll ride",
  "A UK bank account",
];

export default function BadCreditFinancePage() {
  return (
    <>
      <FullBleedHero
        title={
          <>
            Bad credit? <Gold>You can still ride.</Gold>
          </>
        }
        intro="A low credit score doesn't have to stop you. We work with specialist lenders who look at your whole situation, not just your credit history."
        points={[
          "Missed payments, defaults and CCJs considered",
          "Checking your eligibility won't affect your score",
        ]}
        image="/images/hero-bad-credit.jpg"
        imageAlt="Rider's view over the handlebars of a motorbike on a tree-lined country road"
        objectPosition="center 65%"
      >
        <QuoteCta>
          Check my eligibility <ArrowRightIcon className="h-4 w-4" />
        </QuoteCta>
        <TextLink href="#calculator" onDark>
          Calculate payments
        </TextLink>
      </FullBleedHero>

      <Section pattern>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              title="What is bad credit motorbike finance?"
            />
            <div className="-mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-theme-body/70">
              <p>
                A credit problem can narrow your borrowing options, but your score alone doesn&apos;t tell the whole
                story. Bad credit motorbike finance describes agreements that may be available to riders whose
                history makes mainstream borrowing more difficult.
              </p>
              <p>
                The underlying agreement is still{" "}
                <TextLink href="/bike-finance">motorbike finance</TextLink>. You borrow towards the cost of a bike
                and repay under the lender&apos;s terms. What differs is the lender&apos;s approach to your application:
                some consider a wider picture of your income, commitments and recent financial history.
              </p>
              <p>
                A missed payment and a limited credit file are different situations, and neither should be treated
                as a guaranteed yes or no. We&apos;re a broker, not a lender; we search our panel, while the lender
                decides whether it can offer finance that you can afford.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-theme-line bg-theme-soft p-8 lg:col-span-5">
            <h3 className="text-lg font-bold text-theme-ink">&ldquo;Bad credit&rdquo; can mean</h3>
            <ul className="mt-5 space-y-3">
              {creditIssues.map((issue) => (
                <li key={issue} className="flex items-start gap-3 text-theme-body/80">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-theme-ink" strokeWidth={2.5} />
                  {issue}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-theme-line pt-5 text-sm text-theme-muted-60">
              Having one or more of these doesn&apos;t automatically rule you out.
            </p>
          </div>
        </div>
      </Section>

      <Section id="calculator" tone="soft" className="scroll-mt-24 border-t border-theme-line">
        <SectionHeading
          title="Bad credit motorbike finance calculator"
          intro="Enter a bike price, deposit and repayment term to explore an illustrative monthly cost. This is a budgeting tool, not a personalised quote."
        />
        <div className="mx-auto max-w-5xl">
          <FinanceCalculator apr={site.calculator.badCreditIllustrativeApr} editableAmounts />
          <p className="mt-5 text-center text-sm leading-relaxed text-theme-muted-60">
            Rates for applicants with credit problems can be higher. This estimate uses our placeholder
            illustrative APR, not a lender offer or a rate based on your credit profile. The calculator leaves
            at least £1,000 to borrow; this is a tool limit, not a statement of lender eligibility.
          </p>
        </div>
      </Section>

      <EditorialSection
        title={<>The right bike.<br /><span className="font-serif font-normal italic">A realistic budget.</span></>}
        image="/images/hero-about-cruiser.jpg"
        imageAlt="Black cruiser motorbike with chrome details in warm evening light"
        objectPosition="60% center"
        tone="soft"
        imageFirst
      >
        <p>
          Specialist finance usually comes with a higher interest rate. Before you choose a bike, think about
          what you can comfortably repay alongside your existing bills and commitments.
        </p>
        <p>
          A deposit reduces the amount you need to borrow. A longer term may lower the monthly payment, but it
          usually increases the interest you pay overall. Look at the total cost as well as the monthly figure.
        </p>
        <p>
          Use our calculator as a guide, not an offer. Your actual rate and any finance available will depend on
          the lender&apos;s assessment of your circumstances and affordability.
        </p>
        <TextLink href="#calculator" className="mt-3">
          Work out your budget <ArrowRightIcon className="h-4 w-4" />
        </TextLink>
      </EditorialSection>

      <Section tone="dark" pattern>
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              title="Who can apply?"
              intro="Most riders can. You'll usually need to be:"
            />
            <ul className="-mt-6 space-y-3">
              {eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 text-white/80">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" strokeWidth={2.5} />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/60">
              Lender requirements vary. Meeting these criteria doesn&apos;t guarantee acceptance, and you should
              only borrow what you can afford to repay.
            </p>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              title="More than a credit score"
              intro="What specialist lenders look at when they assess your application."
            />
            <ul className="-mt-6 grid gap-5 sm:grid-cols-2">
              {lenderChecks.map((c, i) => (
                <li key={c.title}>
                  <Reveal delay={(i % 2) * 90} className="h-full">
                    <FeatureCard number={i + 1} title={c.title}>
                      <p>{c.body}</p>
                    </FeatureCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="From enquiry to agreement"
          intro="Understand the checks and decisions involved before you apply."
        />
        <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {badCreditSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={(i % 2) * 90} className="h-full">
                <FeatureCard number={i + 1} title={step.title}>
                  <p>{step.body}</p>
                </FeatureCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-theme-line">
        <SectionHeading
          title="Improve your chances of approval"
          intro="Practical checks before you apply. None guarantees acceptance, but they can help you prepare a more accurate application."
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approvalTips.map((tip, i) => (
            <li key={tip.title}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <FeatureCard number={i + 1} title={tip.title}>
                  <p>{tip.body}</p>
                </FeatureCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Reviews />
      <FaqSection items={badCreditFaqs} title="Bad credit finance FAQs" />
      <CtaBand
        title="Ready for a fresh start?"
        body="See what you could be eligible for in minutes. It won't affect your credit score."
        image="/images/mountain-ride.jpg"
        objectPosition="60% 65%"
        mirror={false}
      />
    </>
  );
}
