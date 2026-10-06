import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteNoticeProvider } from "@/components/QuoteCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/config/site";
import { themeBootstrap } from "@/lib/theme";
import "lenis/dist/lenis.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

/** Editorial accent face, used sparingly for italic lead-ins (see Statement). */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Motorbike Finance | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `Motorbike Finance | ${site.name}`,
    description: site.description,
    images: [{ url: "/images/hero-home.jpg", width: 2400, height: 1600 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" suppressHydrationWarning className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <noscript>
          <style>{`
            [data-reveal]{opacity:1!important;transform:none!important}
            @media(width < 64rem){
              .finance-finder{gap:2rem}
              .finance-finder [data-finder-panel]{grid-area:auto!important;max-height:none!important;visibility:visible!important;overflow:visible!important;translate:none!important}
              .finance-finder button:not([role="radio"]){display:none}
            }
          `}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[60] rounded bg-brand-yellow px-4 py-2 font-bold text-brand-navy focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <QuoteNoticeProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollReveal />
          <SmoothScroll />
        </QuoteNoticeProvider>
      </body>
    </html>
  );
}
