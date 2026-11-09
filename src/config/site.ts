/**
 * Central site configuration.
 *
 * Anything wrapped in [PLACEHOLDER: ...] MUST be replaced with real, approved
 * details before the site goes live. Finance promotions are regulated by the
 * FCA (CONC 3), so representative examples and APRs must reflect genuine
 * lender figures.
 */

export const site = {
  name: "SuperBike Factory",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://superbikefactory.co.uk",
  tagline: "Quality used bikes. Super Finance.",
  description:
    "Quality used motorbikes for sale, with finance from our panel of lenders whatever your credit history. Search our stock or sell your bike to SuperBike Factory.",

  // Home is reached via the logo, so it isn't listed here.
  nav: [
    { label: "Buy", href: "/bikes" },
    { label: "Sell", href: "/sell-your-bike" },
    { label: "Finance", href: "/bike-finance" },
    { label: "Guides", href: "/guides" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  trustpilot: {
    url: "https://uk.trustpilot.com/review/superbikefactory.co.uk",
    rating: 4.6,
    reviewCount: 19186,
  },

  /**
   * Quote CTAs send visitors to an external partner site.
   * While `url` is empty, clicking a quote CTA shows a notice explaining this instead.
   */
  primaryCta: {
    label: "Get a quote",
    url: "" as string, // [PLACEHOLDER] e.g. "https://partner.example.com/apply?ref=superbikefactory"
  },

  contact: {
    phone: "[PLACEHOLDER: 0000 000 0000]",
    email: "[PLACEHOLDER: finance@superbikefactory.co.uk]",
    hours: "[PLACEHOLDER: Mon–Fri 9am–6pm, Sat 9am–5pm]",
  },

  /** "Sell your bike" form. While `endpoint` is empty the form hands the details to the visitor's email client. */
  sell: {
    endpoint: "" as string, // [PLACEHOLDER] e.g. a Formspree/Getform URL that accepts JSON
  },

  legalLinks: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Cookie policy", href: "/cookies" },
    { label: "Complaints", href: "/complaints" },
  ],

  compliance: {
    companyName: "[PLACEHOLDER: SuperBike Factory Ltd]",
    companyNumber: "[PLACEHOLDER: 00000000]",
    registeredAddress: "[PLACEHOLDER: Registered office address]",
    fcaFrn: "[PLACEHOLDER: 000000]",
    brokerStatement:
      "[PLACEHOLDER: SuperBike Factory Ltd] is authorised and regulated by the Financial Conduct Authority (FRN [PLACEHOLDER: 000000]). We are a credit broker, not a lender. We work with a select panel of lenders and may receive a commission or fee from them for introducing you. This will not affect the amount you pay. Finance is subject to status and affordability; terms and conditions apply. Applicants must be 18+ and UK residents.",
    representativeExample: {
      // [PLACEHOLDER] Illustrative figures only – replace with an approved lender representative example.
      apr: 14.9,
      amountOfCredit: 8000,
      termMonths: 48,
      deposit: 0,
    },
  },

  calculator: {
    /** Illustrative APR used by the on-site calculator. [PLACEHOLDER] */
    illustrativeApr: 14.9,
    minPrice: 1500,
    maxPrice: 30000,
    priceStep: 250,
    defaultPrice: 8000,
    defaultDeposit: 500,
    depositStep: 100,
    terms: [12, 24, 36, 48, 60],
    defaultTerm: 48,
    /**
     * Illustrative APR for the bad credit page calculator. Specialist lenders usually charge more. [PLACEHOLDER]
     */
    badCreditIllustrativeApr: 29.9,
  },
} as const;

export type NavItem = (typeof site.nav)[number];
