import { ArrowRightIcon } from "@/components/icons";
import { QuoteCta } from "@/components/QuoteCta";
import { HomeStatement } from "@/components/Statement";
import {
  CtaBand,
  FaqSection,
  FinanceTypes,
  FullBleedHero,
  Reviews,
  WhySuper,
} from "@/components/sections";
import { TrustpilotAttribution } from "@/components/TrustpilotAttribution";
import { Gold, TextLink } from "@/components/ui";

export default function Home() {
  return (
    <>
      <FullBleedHero
        size="tall"
        title={
          <>
            Superbike. <Gold>Super Finance.</Gold>
          </>
        }
        intro="We search our panel of lenders to find a deal that fits your budget, whatever your credit history."
        image="/images/hero-home-poster.jpg"
        imageAlt="Motorcyclist riding a winding mountain road at golden hour"
        video="/videos/hero-home.mp4"
        videoPortrait="/videos/hero-home-portrait.mp4"
        align="center"
      >
        <QuoteCta>
          Get my quote <ArrowRightIcon className="h-4 w-4" />
        </QuoteCta>
        <TextLink href="/calculator" onDark>
          Calculate payments
        </TextLink>
        <TrustpilotAttribution onDark />
      </FullBleedHero>

      <HomeStatement />

      <WhySuper />
      <FinanceTypes />
      <Reviews />
      <FaqSection limit={4} />
      <CtaBand />
    </>
  );
}
