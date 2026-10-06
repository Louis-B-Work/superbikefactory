import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p>
        This policy explains how {site.compliance.companyName} collects, uses and protects your personal information
        when you use this website or contact us.
      </p>
      <h2>What we collect</h2>
      <p>Contact details you give us when you call or email, and basic information about how you use this website.</p>
      <h2>How we use it</h2>
      <p>To respond to your questions and to improve our website.</p>
      <h2>Quotes and applications</h2>
      <p>
        When you get a quote, you&apos;re taken to our finance partner&apos;s website. Any information you enter there is
        handled under their privacy policy.
      </p>
      <h2>Your rights</h2>
      <p>
        You have rights under UK GDPR, including the right to access, correct or delete your data. Contact us at{" "}
        {site.contact.email}.
      </p>
    </LegalPage>
  );
}
