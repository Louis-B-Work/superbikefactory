import type { Metadata } from "next";
import Link from "next/link";
import { UtilityHero } from "@/components/UtilityHero";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact details for SuperBike Factory will be available here soon.",
};

export default function ContactPage() {
  return (
    <>
      <UtilityHero title="Contact us" intro="We're here to help with your motorbike finance questions." />
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-theme-line bg-theme-card p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-theme-ink">Contact details coming soon</h2>
          <p className="mt-3 leading-relaxed text-theme-body/70">
            Our phone number and contact details will be added here shortly.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-theme-muted-60">
            Looking for help with a complaint? Visit our{" "}
            <Link href="/complaints" className="font-bold text-theme-ink underline underline-offset-2">
              complaints page
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
