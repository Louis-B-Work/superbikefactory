export interface RepaymentInput {
  /** Amount to borrow (price minus deposit), in pounds. */
  principal: number;
  /** Annual Percentage Rate, e.g. 14.9 for 14.9%. */
  apr: number;
  termMonths: number;
}

export interface RepaymentResult {
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
}

/**
 * Monthly rate derived from APR. APR is an annualised compound rate, so the
 * equivalent monthly rate is (1 + APR)^(1/12) - 1.
 */
export function monthlyRateFromApr(apr: number): number {
  return Math.pow(1 + apr / 100, 1 / 12) - 1;
}

/** Standard amortising loan repayment. All values rounded to pence. */
export function calculateRepayment({
  principal,
  apr,
  termMonths,
}: RepaymentInput): RepaymentResult {
  if (principal <= 0 || termMonths <= 0) {
    return { monthlyPayment: 0, totalPayable: 0, totalInterest: 0 };
  }

  const r = monthlyRateFromApr(apr);
  const monthly =
    r === 0
      ? principal / termMonths
      : (principal * r) / (1 - Math.pow(1 + r, -termMonths));

  const monthlyPayment = roundPence(monthly);
  const totalPayable = roundPence(monthlyPayment * termMonths);
  const totalInterest = roundPence(totalPayable - principal);

  return { monthlyPayment, totalPayable, totalInterest };
}

export function roundPence(value: number): number {
  return Math.round(value * 100) / 100;
}

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
const gbpWhole = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export function formatGBP(value: number, wholePounds = false): string {
  return (wholePounds ? gbpWhole : gbp).format(value);
}
