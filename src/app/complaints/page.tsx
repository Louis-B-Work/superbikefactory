import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Complaints" };

export default function ComplaintsPage() {
  return (
    <LegalPage title="Complaints">
      <p>
        We aim to give every customer a great service. If something has gone wrong, please tell us and we&apos;ll do our
        best to put it right.
      </p>
      <h2>How to complain</h2>
      <p>
        Email {site.contact.email} or call {site.contact.phone}. We&apos;ll acknowledge your complaint promptly and aim to
        resolve it within 8 weeks.
      </p>
      <h2>Financial Ombudsman Service</h2>
      <p>
        If you&apos;re not happy with our final response, or we haven&apos;t resolved your complaint within 8 weeks, you may be
        able to refer it to the{" "}
        <a
          href="https://www.financial-ombudsman.org.uk/"
          className="link-fill font-bold text-theme-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Financial Ombudsman Service
        </a>
        .
      </p>
    </LegalPage>
  );
}
