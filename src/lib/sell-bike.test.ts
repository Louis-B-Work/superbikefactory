import { describe, expect, it } from "vitest";
import { normaliseReg, sellBikeMailto, validateSellBike, type SellBikeInput } from "./sell-bike";

const valid: SellBikeInput = {
  reg: "ab21 cde",
  mileage: "12,500",
  make: "",
  model: "",
  name: "Sam Rider",
  email: "sam@example.com",
  phone: "07123 456789",
  consent: true,
};

describe("validateSellBike", () => {
  it("accepts a complete submission", () => {
    expect(validateSellBike(valid)).toEqual({});
  });

  it("flags each invalid field", () => {
    const errors = validateSellBike({ ...valid, reg: "!", mileage: "abc", name: "", email: "nope", phone: "123", consent: false });
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "mileage", "name", "phone", "reg"]);
  });
});

describe("helpers", () => {
  it("normalises registrations", () => {
    expect(normaliseReg(" ab21 cde ")).toBe("AB21CDE");
  });

  it("encodes the mailto body", () => {
    const url = sellBikeMailto("a@b.co", valid);
    expect(url.startsWith("mailto:a@b.co?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Registration: AB21CDE");
  });
});
