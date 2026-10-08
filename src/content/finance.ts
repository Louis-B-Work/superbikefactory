export interface Faq {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

export const faqs: Faq[] = [
  {
    q: "Can I get motorbike finance with bad credit?",
    a: "Often, yes. We work with a panel of lenders, some of whom specialise in helping people with less-than-perfect credit. Every application is assessed on your individual circumstances, affordability and credit history.",
    link: { label: "Bad credit motorbike finance", href: "/bad-credit-finance" },
  },
  {
    q: "Will getting a quote affect my credit score?",
    a: "No. Getting a quote and checking your eligibility uses a soft search, which lenders can't see and which won't affect your credit score. A hard search only happens if you choose to go ahead with a full application.",
  },
  {
    q: "Do I need a deposit?",
    a: "Not always. Many of our lenders offer no-deposit motorbike finance. Putting down a deposit lowers the amount you borrow, so your monthly repayments and the total interest will usually be lower.",
  },
  {
    q: "Can I buy a bike from any dealer?",
    a: "In most cases, yes. Finance can be used for new and used bikes from reputable UK dealers. Some lenders will also consider private sales. Our team will confirm what's possible when we go through your options.",
  },
  {
    q: "How long can I spread the cost over?",
    a: "Finance agreements typically run from 12 to 60 months. A longer term means lower monthly payments, but you'll usually pay more interest overall.",
  },
  {
    q: "Who can apply?",
    a: "You need to be at least 18, a UK resident, and have a regular income from employment, self-employment or a pension. You'll also need to hold the right licence for the bike you plan to ride.",
  },
  {
    q: "Are you a lender?",
    a: "No. SuperBike Factory is a credit broker, not a lender. We introduce you to lenders on our panel who may be able to offer you finance. We may receive a commission from the lender for this introduction, and it won't affect the amount you pay.",
  },
  {
    q: "Can I settle my finance early?",
    a: "Yes. You have the right to settle your agreement early at any time, and you may get a rebate on the interest. Your lender can give you a settlement figure.",
  },
];

export interface FinanceType {
  name: string;
  short: "HP" | "PCP";
  summary: string;
  bestFor: string;
  /** How a rider would describe this need, used as an answer in the finance finder. */
  goal: string;
  goalHint: string;
  points: string[];
}

export const financeTypes: FinanceType[] = [
  {
    name: "Hire Purchase",
    short: "HP",
    summary:
      "Spread the full cost of your bike over fixed monthly payments. When the last payment is made, the bike is yours.",
    bestFor: "Owning your bike",
    goal: "Owning the bike at the end",
    goalHint: "Pay it off and it's yours",
    points: [
      "Fixed monthly payments",
      "You own the bike at the end",
      "No mileage limits",
      "Optional deposit",
    ],
  },
  {
    name: "Personal Contract Purchase",
    short: "PCP",
    summary:
      "Lower monthly payments, with an optional final 'balloon' payment. At the end you can pay it and keep the bike, hand the bike back, or part-exchange it.",
    bestFor: "Lower monthly payments",
    goal: "The lowest monthly payments",
    goalHint: "Keep more of your money each month",
    points: [
      "Lower monthly payments than HP",
      "Choose what happens at the end",
      "Agreed annual mileage",
      "Great for changing bikes regularly",
    ],
  },
];

export interface Step {
  title: string;
  body: string;
  /** [PLACEHOLDER] Typical timings. Confirm with the partner before launch. */
  duration: string;
}

export const steps: Step[] = [
  {
    title: "Tell us about you",
    body: "Answer a few quick questions online. Checking your eligibility won't affect your credit score.",
    duration: "Typically 2 minutes",
  },
  {
    title: "We search our lenders",
    body: "Our team searches our panel of specialist lenders to find finance that fits your budget and circumstances.",
    duration: "Often the same day",
  },
  {
    title: "Ride away",
    body: "Choose your deal, pick your bike from a dealer, and get out on the road.",
    duration: "As soon as you're ready",
  },
];
