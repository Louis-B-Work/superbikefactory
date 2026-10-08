import type { Metadata } from "next";
import { UtilityHero } from "@/components/UtilityHero";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Motorbike Finance Guides",
  description: "Helpful motorbike finance guides from SuperBike Factory are coming soon.",
};

export default function GuidesPage() {
  return (
    <>
      <UtilityHero title="Guides" intro="Straightforward answers to help you make sense of motorbike finance." />
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-theme-line bg-theme-card p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-theme-ink">Guides are on the way</h2>
          <p className="mt-3 leading-relaxed text-theme-body/70">
            We&apos;re preparing practical guides for riders. Check back soon for the first articles.
          </p>
        </div>
      </Section>
    </>
  );
}
