import type { Metadata } from "next";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Finance Calculator",
  description: "Estimate monthly motorbike finance payments with our illustrative calculator.",
};

export default function CalculatorPage() {
  return (
    <Section className="pt-12 sm:pt-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-theme-ink sm:text-5xl">Finance calculator</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-theme-body/70">
          Adjust the bike price, deposit and term to see an illustrative estimate.
        </p>
        <FinanceCalculator className="mt-8" stacked />
      </div>
    </Section>
  );
}
