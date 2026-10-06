import { describe, expect, it } from "vitest";
import {
  calculateRepayment,
  formatGBP,
  monthlyRateFromApr,
} from "./finance";

describe("monthlyRateFromApr", () => {
  it("compounds back to the APR over 12 months", () => {
    const r = monthlyRateFromApr(14.9);
    expect(Math.pow(1 + r, 12) - 1).toBeCloseTo(0.149, 10);
  });

  it("is zero for 0% APR", () => {
    expect(monthlyRateFromApr(0)).toBe(0);
  });
});

describe("calculateRepayment", () => {
  it("splits the principal evenly at 0% APR", () => {
    expect(
      calculateRepayment({ principal: 1200, apr: 0, termMonths: 12 }),
    ).toEqual({ monthlyPayment: 100, totalPayable: 1200, totalInterest: 0 });
  });

  it("calculates a typical amortising repayment", () => {
    // £8,000 over 48 months at 14.9% APR
    const result = calculateRepayment({
      principal: 8000,
      apr: 14.9,
      termMonths: 48,
    });
    expect(result.monthlyPayment).toBeGreaterThan(215);
    expect(result.monthlyPayment).toBeLessThan(225);
    expect(result.totalPayable).toBeCloseTo(result.monthlyPayment * 48, 2);
    expect(result.totalInterest).toBeCloseTo(result.totalPayable - 8000, 2);
  });

  it("returns zeros when there is nothing to borrow", () => {
    expect(
      calculateRepayment({ principal: 0, apr: 14.9, termMonths: 48 }),
    ).toEqual({ monthlyPayment: 0, totalPayable: 0, totalInterest: 0 });
    expect(
      calculateRepayment({ principal: -50, apr: 14.9, termMonths: 48 }),
    ).toEqual({ monthlyPayment: 0, totalPayable: 0, totalInterest: 0 });
  });

  it("charges more interest over a longer term", () => {
    const short = calculateRepayment({ principal: 5000, apr: 12, termMonths: 24 });
    const long = calculateRepayment({ principal: 5000, apr: 12, termMonths: 60 });
    expect(long.monthlyPayment).toBeLessThan(short.monthlyPayment);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });
});

describe("formatGBP", () => {
  it("formats pounds and pence", () => {
    expect(formatGBP(1234.5)).toBe("£1,234.50");
  });
  it("formats whole pounds", () => {
    expect(formatGBP(1234.5, true)).toBe("£1,235");
  });
});
