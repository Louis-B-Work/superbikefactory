import Link from "next/link";
import { site } from "@/config/site";
import { Container } from "./ui";
import { ThemeControl } from "./ThemeControl";
import { ThemeLogo } from "./ThemeLogo";

export function Footer() {
  const { compliance, contact } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-theme-line bg-theme-surface text-sm text-theme-body/70">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-6">
          <Link href="/" aria-label={`${site.name} home`}>
            <ThemeLogo className="h-6" />
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed">
            Motorbike finance from a name riders already know, whatever your credit history.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="mb-4 font-semibold text-theme-ink">Explore</h2>
          <ul className="space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline transition-colors duration-300 hover:text-theme-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 lg:col-span-3">
          <h2 className="mb-4 font-semibold text-theme-ink">Contact</h2>
          <ul className="space-y-2.5 wrap-anywhere">
            <li>{contact.phone}</li>
            <li>{contact.email}</li>
            <li>{contact.hours}</li>
          </ul>
        </div>
      </Container>

      <Container className="space-y-4 border-t border-theme-line py-8 text-xs leading-relaxed text-theme-muted-55">
        <p>{compliance.brokerStatement}</p>
        <p>
          {compliance.companyName} is registered in England and Wales, company number {compliance.companyNumber}.
          Registered office: {compliance.registeredAddress}. You can check our details on the{" "}
          <a
            href="https://register.fca.org.uk/"
            className="underline hover:text-theme-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            FCA Register
          </a>
          .
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline transition-colors duration-300 hover:text-theme-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <ThemeControl />
          </ul>
        </div>
      </Container>
    </footer>
  );
}
