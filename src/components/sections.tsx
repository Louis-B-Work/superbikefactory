import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { faqs as allFaqs, financeTypes, testimonials, type Faq } from "@/content/finance";
import { financeGuides } from "@/content/bikeFinance";
import { FaqAccordion } from "./FaqAccordion";
import { FinanceFinder } from "./FinanceFinder";
import { financeTypeIcons } from "./financeTypeIcons";
import { HeroVideo } from "./HeroVideo";
import {
  ArrowRightIcon,
  CheckIcon,
  KeyIcon,
  UsersIcon,
} from "./icons";
import { QuoteCta } from "./QuoteCta";
import { Reveal } from "./Reveal";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { WhySuperCarousel } from "./WhySuperCarousel";
import { Container, HoverTitle, Section, SectionHeading, cn } from "./ui";

export function FullBleedHero({
  title,
  intro,
  image,
  imageAlt = "",
  video,
  videoPortrait,
  objectPosition = "center",
  size = "short",
  align = "left",
  points,
  children,
}: {
  title: ReactNode;
  intro: ReactNode;
  /** Still image. With `video` it is the poster, shown until the video plays and to reduced-motion users. */
  image: string;
  imageAlt?: string;
  /** Muted, looping background video (MP4). */
  video?: string;
  /** Portrait crop of `video` for phones (see HeroVideo). */
  videoPortrait?: string;
  /** CSS object-position, e.g. "70% center", to keep the subject clear of the text. */
  objectPosition?: string;
  size?: "tall" | "short";
  align?: "left" | "center";
  points?: string[];
  children?: ReactNode;
}) {
  const centred = align === "center";
  return (
    <section
      data-hero
      className={cn(
        // Slides under the sticky header so the transparent header sits on the image.
        "relative isolate -mt-18 flex overflow-hidden bg-brand-navy pt-18 text-white",
        size === "tall" ? "min-h-[max(600px,92svh)]" : "min-h-[max(480px,64svh)]",
      )}
    >
      <div aria-hidden={!imageAlt || undefined} className="animate-hero-settle absolute inset-0 -z-20">
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="100vw"
          className="-z-30 object-cover"
          style={{ objectPosition }}
        />
        {video && <HeroVideo src={video} portraitSrc={videoPortrait} objectPosition={objectPosition} />}
      </div>
      {/* Legibility: darken behind the text and under the header. */}
      {centred ? (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-brand-navy/35" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(35_38_56/0.65),rgb(35_38_56/0.15)_75%)]"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-brand-navy/80 to-transparent" />
        </>
      ) : (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-linear-to-t sm:bg-linear-to-r sm:from-brand-navy/90 sm:via-brand-navy/60 sm:to-brand-navy/25",
            size === "tall"
              ? "from-brand-navy/95 via-brand-navy/60 to-brand-navy/10"
              : "from-brand-navy/90 via-brand-navy/70 to-brand-navy/45",
          )}
        />
      )}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-black/45 to-transparent" />

      <Container
        className={cn(
          "flex flex-1 pt-10 pb-12 sm:items-center sm:py-20",
          centred && "justify-center text-center",
          // The tall left-aligned hero keeps its text low on mobile; everything else sits centred.
          size === "tall" && !centred ? "items-end" : "items-center",
        )}
      >
        <div className={cn(centred && "flex max-w-5xl flex-col items-center")}>
          <h1
            className={cn(
              "animate-hero-in font-bold leading-[1.04] tracking-tight [animation-delay:150ms]",
              size === "tall"
                ? "text-[clamp(2.25rem,11vw,3rem)] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                : "text-4xl sm:text-5xl lg:text-6xl",
            )}
          >
            {title}
          </h1>
          <p className="animate-hero-in mt-6 max-w-xl text-lg leading-relaxed text-white/85 [animation-delay:320ms] 2xl:text-xl">
            {intro}
          </p>
          {points && (
            <ul
              className={cn(
                "animate-hero-in mt-7 [animation-delay:450ms]",
                centred
                  ? "flex flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8"
                  : "space-y-2.5",
              )}
            >
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-left text-white/90">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-yellow" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          )}
          {children && (
            <div
              className={cn(
                "animate-hero-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 [animation-delay:580ms]",
                centred && "justify-center",
              )}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
export { HowItWorks } from "./HowItWorks";

/** Card chrome for the detailed finance guide. */
const revealCardClass =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-theme-line bg-theme-card p-7 transition duration-300 outline-none hover:-translate-y-1 hover:border-theme-ink/20 hover:shadow-[0_12px_40px_-12px_rgba(35,38,56,0.18)] focus-visible:border-theme-ink/20 focus-visible:ring-3 focus-visible:ring-brand-yellow" +
  " on-dark:border-white/10 on-dark:bg-white/[0.04] on-dark:hover:border-white/25 on-dark:hover:bg-white/[0.07] on-dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)] on-dark:focus-visible:border-white/25";

function CardIcon({ icon: Icon }: { icon: typeof UsersIcon }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-theme-soft text-theme-ink transition-colors duration-300 group-hover:bg-brand-yellow group-hover:text-brand-navy group-focus:bg-brand-yellow group-focus:text-brand-navy on-dark:bg-white/10 on-dark:text-white on-dark:group-hover:bg-brand-yellow on-dark:group-hover:text-brand-navy on-dark:group-focus:bg-brand-yellow on-dark:group-focus:text-brand-navy">
      <Icon className="h-6 w-6" strokeWidth={1.5} />
    </span>
  );
}

function CardBar() {
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-yellow transition-transform duration-300 group-hover:scale-x-100 group-focus:scale-x-100"
    />
  );
}

export function WhySuper() {
  return (
    <Section tone="dark">
      <SectionHeading
        title="Why so super?"
        intro="Riders have trusted SuperBike Factory for years. Now we're putting that know-how into finding you the right finance."
      />
      <WhySuperCarousel />
    </Section>
  );
}

/**
 * Finance types. The home page asks one question and branches to the best match (FinanceFinder);
 * the Bike Finance page is the detailed guide, so it shows every option in full.
 */
export function FinanceTypes({ detailed = false }: { detailed?: boolean }) {
  if (!detailed) {
    return (
      <Section id="finance-types" className="overflow-x-clip">
        <SectionHeading
          title="Find the finance that fits"
          intro="Tell us what matters most and we'll point you to the option that suits you best."
        />
        <FinanceFinder />
      </Section>
    );
  }
  return (
    <Section id="finance-types">
      <SectionHeading
        title="Find the finance that fits"
        intro="A quick guide to the main options. Our team can talk you through which suits you best."
      />
      <ul className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {financeTypes.map((t, i) => (
          <li key={t.short}>
            <Reveal delay={i * 90} className="h-full">
              <article className={cn(revealCardClass, "sm:p-8")}>
                <CardIcon icon={financeTypeIcons[t.short] ?? KeyIcon} />
                <h3 className="mt-6 text-lg font-bold text-theme-ink sm:text-xl">{t.name}</h3>
                <p className="mt-2 inline-flex w-fit rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-semibold text-theme-ink">
                  Best for: {t.bestFor}
                </p>
                <p className="mt-3 leading-relaxed text-theme-body/70">{t.summary}</p>
                <ul className="mt-6 space-y-2.5 border-t border-theme-line pt-6">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-theme-body/80">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-theme-ink" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 space-y-5 border-t border-theme-line pt-6">
                  <div>
                    <h4 className="font-bold text-theme-ink">At the end of your agreement</h4>
                    <p className="mt-2 leading-relaxed text-theme-body/70">{financeGuides[t.short].endOfAgreement}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-theme-ink">Worth thinking about</h4>
                    <p className="mt-2 leading-relaxed text-theme-body/70">{financeGuides[t.short].consider}</p>
                  </div>
                </div>
                <CardBar />
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
export function Reviews() {
  return (
    <Section tone="soft">
      <ReviewsCarousel
        reviews={testimonials}
        heading={
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-theme-ink sm:text-4xl">
            <HoverTitle>What riders say</HoverTitle>
          </h2>
        }
      />
      <p className="mt-10 text-center text-xs text-theme-muted-40">
        [PLACEHOLDER] Sample reviews for layout only. Replace with genuine customer reviews (e.g. a Trustpilot widget)
        before launch.
      </p>
    </Section>
  );
}

export function FaqList({ items = allFaqs, limit }: { items?: Faq[]; limit?: number }) {
  return <FaqAccordion items={limit ? items.slice(0, limit) : items} />;
}

export function FaqSection({
  limit,
  items,
  title = "Questions? We've got answers",
}: {
  limit?: number;
  items?: Faq[];
  title?: string;
}) {
  const { phone, hours } = site.contact;
  return (
    <Section id="faqs" className="border-t border-theme-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading align="left" title={title} intro="Straight answers to the things riders ask us most." />
            <div className="-mt-4 border-l-2 border-brand-yellow pl-5">
              <h3 className="font-bold text-theme-ink">Still got questions?</h3>
              <p className="mt-1 leading-relaxed text-theme-body/70">
                Speak to our team. We know bikes as well as we know finance.
              </p>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="link-fill mt-4 inline-block text-xl font-bold text-theme-ink"
              >
                {phone}
              </a>
              <p className="mt-1 text-sm text-theme-muted-55">{hours}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 xl:col-span-8">
          <FaqList items={items} limit={limit} />
        </div>
      </div>
    </Section>
  );
}

export function CtaBand({
  title = "Ready to ride?",
  body = "Get a no-obligation quote in minutes. It won't affect your credit score.",
  image = "/images/cta-ride.jpg",
  objectPosition = "center 60%",
  mirror = true,
}: {
  title?: string;
  body?: string;
  image?: string;
  objectPosition?: string;
  mirror?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className={cn("-z-20 object-cover", mirror && "-scale-x-100")}
        style={{ objectPosition }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-brand-navy/75 sm:bg-transparent sm:bg-linear-to-r sm:from-brand-navy/95 sm:via-brand-navy/70 sm:to-brand-navy/15"
      />
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-xl">
          <span aria-hidden className="block h-1 w-12 rounded-full bg-brand-yellow" />
          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/80">{body}</p>
          <QuoteCta className="mt-9">
            {site.primaryCta.label} <ArrowRightIcon className="h-4 w-4" />
          </QuoteCta>
        </div>
      </Container>
    </section>
  );
}