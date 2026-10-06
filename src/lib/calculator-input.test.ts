import { describe, expect, it } from "vitest";
import { validateCalculatorAmount } from "./calculator-input";

describe("validateCalculatorAmount", () => {
  it("accepts whole pounds and inclusive bounds", () => {
    for (const text of ["1500", "8000", "30000"]) {
      expect(validateCalculatorAmount(text, 1500, 30000)).toBeNull();
    }
    expect(validateCalculatorAmount("0", 0, 7000)).toBeNull();
  });

  it("reports missing, non-finite and fractional amounts", () => {
    expect(validateCalculatorAmount("", 0, 30000)).toBe("Enter an amount.");
    expect(validateCalculatorAmount(" ", 0, 30000)).toBe("Enter an amount.");
    for (const text of ["invalid", "Infinity", "NaN"]) {
      expect(validateCalculatorAmount(text, 0, 30000)).toBe("Enter a valid amount.");
    }
    expect(validateCalculatorAmount("1500.50", 0, 30000)).toBe("Enter an amount in whole pounds.");
  });

  it("rejects out-of-range prices and deposits", () => {
    expect(validateCalculatorAmount("1499", 1500, 30000)).toContain("£1,500");
    expect(validateCalculatorAmount("30001", 1500, 30000)).toContain("£30,000");
    expect(validateCalculatorAmount("-1", 0, 7000)).not.toBeNull();
    expect(validateCalculatorAmount("7001", 0, 7000)).not.toBeNull();
  });
});
