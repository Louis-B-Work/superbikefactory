import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy">
      <p>
        This site uses only the cookies it needs to work. If analytics or marketing cookies are added later, this
        policy and a consent banner must be updated to match.
      </p>
      <h2>Managing cookies</h2>
      <p>You can control and delete cookies in your browser settings.</p>
    </LegalPage>
  );
}
