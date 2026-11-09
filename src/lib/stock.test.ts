import { describe, expect, it } from "vitest";
import { bikes } from "@/content/stock";
import {
  budgetBands,
  filterBikes,
  makeCounts,
  monthlyFor,
  parseStockParams,
  sortBikes,
  stockSearchParams,
} from "./stock";

describe("monthlyFor", () => {
  it("is undefined for cash-only bikes", () => {
    expect(monthlyFor({ price: 3995, cashOnly: true })).toBeUndefined();
  });

  it("returns a positive whole-pound payment for finance bikes", () => {
    const m = monthlyFor({ price: 6000 });
    expect(m).toBeGreaterThan(0);
    expect(Number.isInteger(m)).toBe(true);
  });
});

describe("filterBikes", () => {
  it("returns everything with an empty query", () => {
    expect(filterBikes(bikes, { mode: "total" })).toHaveLength(bikes.length);
  });

  it("filters by total price", () => {
    const out = filterBikes(bikes, { mode: "total", max: 5000 });
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((b) => b.price <= 5000)).toBe(true);
  });

  it("filters by monthly payment and excludes cash-only bikes", () => {
    const out = filterBikes(bikes, { mode: "monthly", max: 150 });
    expect(out.every((b) => !b.cashOnly && (monthlyFor(b) ?? Infinity) <= 150)).toBe(true);
  });

  it("matches make case-insensitively and model by substring", () => {
    const out = filterBikes(bikes, { mode: "total", make: "yamaha", model: "mt" });
    expect(out.map((b) => b.model)).toEqual(["MT-07"]);
  });
});

describe("sortBikes", () => {
  it("sorts by price ascending without mutating the input", () => {
    const copy = [...bikes];
    const out = sortBikes(bikes, "price-asc");
    expect(bikes).toEqual(copy);
    for (let i = 1; i < out.length; i++) expect(out[i].price).toBeGreaterThanOrEqual(out[i - 1].price);
  });

  it("puts cash-only bikes last when sorting by monthly payment", () => {
    const out = sortBikes(bikes, "monthly-asc");
    const firstCash = out.findIndex((b) => b.cashOnly);
    expect(out.slice(firstCash).every((b) => b.cashOnly)).toBe(true);
  });
});

describe("counts and bands", () => {
  it("makeCounts totals the stock", () => {
    expect(makeCounts(bikes).reduce((n, m) => n + m.count, 0)).toBe(bikes.length);
  });

  it("budgetBands only lists bands that contain bikes", () => {
    for (const mode of ["total", "monthly"] as const) {
      expect(budgetBands(bikes, mode).every((b) => b.count > 0)).toBe(true);
    }
  });
});

describe("URL params", () => {
  it("round-trips a query", () => {
    const qs = stockSearchParams({ mode: "monthly", max: 150, make: "Honda", model: "CB" }, "price-asc");
    const { query, sort } = parseStockParams(new URLSearchParams(qs));
    expect(query).toMatchObject({ mode: "monthly", max: 150, make: "Honda", model: "CB" });
    expect(sort).toBe("price-asc");
  });

  it("keeps monthly mode when no budget is set", () => {
    const qs = stockSearchParams({ mode: "monthly" });
    expect(parseStockParams(new URLSearchParams(qs)).query.mode).toBe("monthly");
  });

  it("ignores malformed values", () => {
    const { query, sort } = parseStockParams(new URLSearchParams("max=abc&sort=bogus&mode=x"));
    expect(query).toEqual({ mode: "total", max: undefined, make: undefined, model: undefined, category: undefined });
    expect(sort).toBe("picks");
  });
});
