import type { Metadata } from "next";
import { Suspense } from "react";
import { StockBrowser } from "@/components/StockBrowser";
import { UtilityHero } from "@/components/UtilityHero";
import { Section } from "@/components/ui";
import { bikes } from "@/content/stock";

export const metadata: Metadata = {
  title: "Motorbikes for Sale",
  description:
    "Browse quality used motorbikes in stock at SuperBike Factory. Search by budget, make and model, with finance available on most bikes.",
};

export default function BikesPage() {
  return (
    <>
      <UtilityHero
        title="Bikes for sale"
        intro={`${bikes.length} quality used motorbikes, all prepared and ready to ride away.`}
      />
      <Section className="py-12 sm:py-16">
        <Suspense fallback={<p className="text-theme-body/70">Loading bikes…</p>}>
          <StockBrowser />
        </Suspense>
      </Section>
    </>
  );
}
