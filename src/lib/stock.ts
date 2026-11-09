import { site } from "@/config/site";
import type { Bike } from "@/content/stock";
import { calculateRepayment } from "./finance";

export type BudgetMode = "total" | "monthly";

export type SortKey = "picks" | "price-asc" | "price-desc" | "monthly-asc" | "newest" | "mileage-asc";

export interface StockQuery {
  mode: BudgetMode;
  /** Upper limit: a price in "total" mode, a monthly payment in "monthly" mode. */
  max?: number;
  make?: string;
  model?: string;
  category?: string;
}

export const FINANCE_TERM_MONTHS = 60;

export const totalBands = [3000, 4000, 5000, 6000, 8000, 10000, 15000];
export const monthlyBands = [75, 100, 125, 150, 200, 250, 300];

export const sortLabels: Record<SortKey, string> = {
  picks: "Our picks first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "monthly-asc": "Monthly payment: low to high",
  newest: "Newest arrivals first",
  "mileage-asc": "Lowest mileage first",
};

/** Illustrative monthly payment over 60 months with no deposit, or undefined for cash-only bikes. */
export function monthlyFor(bike: Pick<Bike, "price" | "cashOnly">): number | undefined {
  if (bike.cashOnly) return undefined;
  const { monthlyPayment } = calculateRepayment({
    principal: bike.price,
    apr: site.calculator.illustrativeApr,
    termMonths: FINANCE_TERM_MONTHS,
  });
  return Math.round(monthlyPayment);
}

export function filterBikes(all: Bike[], q: StockQuery): Bike[] {
  const make = q.make?.trim().toLowerCase();
  const model = q.model?.trim().toLowerCase();
  const category = q.category?.trim().toLowerCase();
  return all.filter((b) => {
    if (make && b.make.toLowerCase() !== make) return false;
    if (category && b.category.toLowerCase() !== category) return false;
    if (model && !`${b.model} ${b.variant}`.toLowerCase().includes(model)) return false;
    if (q.max !== undefined) {
      if (q.mode === "monthly") {
        const m = monthlyFor(b);
        if (m === undefined || m > q.max) return false;
      } else if (b.price > q.max) {
        return false;
      }
    }
    return true;
  });
}

export function sortBikes(all: Bike[], key: SortKey): Bike[] {
  const out = [...all];
  const monthly = (b: Bike) => monthlyFor(b) ?? Number.POSITIVE_INFINITY;
  switch (key) {
    case "price-asc":
      return out.sort((a, b) => a.price - b.price);
    case "price-desc":
      return out.sort((a, b) => b.price - a.price);
    case "monthly-asc":
      return out.sort((a, b) => monthly(a) - monthly(b));
    case "newest":
      return out.sort((a, b) => a.arrivedDaysAgo - b.arrivedDaysAgo);
    case "mileage-asc":
      return out.sort((a, b) => a.mileage - b.mileage);
    default:
      // "Our picks": badged bikes first, then most recent.
      return out.sort(
        (a, b) => Number(!!b.badge) - Number(!!a.badge) || a.arrivedDaysAgo - b.arrivedDaysAgo,
      );
  }
}

export function makeCounts(all: Bike[]): { make: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const b of all) counts.set(b.make, (counts.get(b.make) ?? 0) + 1);
  return [...counts]
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count || a.make.localeCompare(b.make));
}

export function categoryCounts(all: Bike[]): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const b of all) counts.set(b.category, (counts.get(b.category) ?? 0) + 1);
  return [...counts]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

/** Budget options with the number of bikes within each. Bands that match nothing are dropped. */
export function budgetBands(all: Bike[], mode: BudgetMode): { max: number; count: number }[] {
  const bands = mode === "monthly" ? monthlyBands : totalBands;
  return bands
    .map((max) => ({ max, count: filterBikes(all, { mode, max }).length }))
    .filter((b) => b.count > 0);
}

/** Parses URL search params into a query + sort, ignoring anything malformed. */
export function parseStockParams(params: { get(name: string): string | null }): {
  query: StockQuery;
  sort: SortKey;
} {
  const mode: BudgetMode = params.get("mode") === "monthly" ? "monthly" : "total";
  const maxRaw = Number(params.get("max"));
  const sortRaw = params.get("sort") as SortKey | null;
  return {
    query: {
      mode,
      max: Number.isFinite(maxRaw) && maxRaw > 0 ? maxRaw : undefined,
      make: params.get("make") || undefined,
      model: params.get("model") || undefined,
      category: params.get("category") || undefined,
    },
    sort: sortRaw && sortRaw in sortLabels ? sortRaw : "picks",
  };
}

export function stockSearchParams(query: StockQuery, sort?: SortKey): string {
  const p = new URLSearchParams();
  // Keep the mode even without a budget, so the Total/Monthly toggle sticks.
  if (query.mode === "monthly" || query.max !== undefined) p.set("mode", query.mode);
  if (query.max !== undefined) p.set("max", String(query.max));
  if (query.make) p.set("make", query.make);
  if (query.model) p.set("model", query.model);
  if (query.category) p.set("category", query.category);
  if (sort && sort !== "picks") p.set("sort", sort);
  return p.toString();
}
