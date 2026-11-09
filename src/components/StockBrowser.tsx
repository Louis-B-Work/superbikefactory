"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo } from "react";
import { bikes } from "@/content/stock";
import { formatGBP } from "@/lib/finance";
import {
  budgetBands,
  categoryCounts,
  filterBikes,
  makeCounts,
  parseStockParams,
  sortBikes,
  sortLabels,
  stockSearchParams,
  type BudgetMode,
  type SortKey,
  type StockQuery,
} from "@/lib/stock";
import { BikeCard } from "./BikeCard";
import { cn } from "./ui";

const fieldClass =
  "h-11 w-full rounded-xl border border-theme-control-line bg-theme-surface px-3.5 text-[15px] text-theme-ink outline-none transition focus:border-theme-ink focus-visible:ring-3 focus-visible:ring-brand-yellow";

/** Filterable, sortable stock grid. Filters live in the URL so results can be shared and searched into from the hero. */
export function StockBrowser() {
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { query, sort } = parseStockParams(params);

  const results = useMemo(() => sortBikes(filterBikes(bikes, query), sort), [query, sort]);
  const makes = useMemo(() => makeCounts(bikes), []);
  const categories = useMemo(() => categoryCounts(bikes), []);
  const bands = useMemo(() => budgetBands(bikes, query.mode), [query.mode]);

  function update(patch: Partial<StockQuery>, nextSort: SortKey = sort) {
    const qs = stockSearchParams({ ...query, ...patch }, nextSort);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const hasFilters = !!(query.max || query.make || query.model || query.category);
  const setMode = (mode: BudgetMode) => update({ mode, max: undefined });

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:items-start">
      <form
        aria-label="Filter bikes"
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5 rounded-2xl border border-theme-line bg-theme-card p-5 lg:sticky lg:top-24"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-theme-ink">Filters</h2>
          {hasFilters && (
            <Link href={pathname} replace scroll={false} className="link-underline text-sm font-semibold">
              Clear all
            </Link>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-theme-body/80">Budget type</legend>
          <div className="grid grid-cols-2 gap-1 rounded-full bg-theme-soft p-1 text-sm font-bold">
            {(["total", "monthly"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={query.mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-full px-3 py-2 transition focus-visible:ring-3 focus-visible:ring-brand-yellow focus-visible:outline-none",
                  query.mode === m ? "bg-brand-navy text-white" : "text-theme-body/70 hover:text-theme-ink",
                )}
              >
                {m === "total" ? "Total cost" : "Monthly cost"}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${id}-max`} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
            Your budget
          </label>
          <select
            id={`${id}-max`}
            className={fieldClass}
            value={query.max ?? ""}
            onChange={(e) => update({ max: e.target.value ? Number(e.target.value) : undefined })}
          >
            <option value="">Any price</option>
            {bands.map((b) => (
              <option key={b.max} value={b.max}>
                Up to {formatGBP(b.max, true)}
                {query.mode === "monthly" ? " a month" : ""} ({b.count})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-make`} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
            Make
          </label>
          <select
            id={`${id}-make`}
            className={fieldClass}
            value={query.make ?? ""}
            onChange={(e) => update({ make: e.target.value || undefined })}
          >
            <option value="">Any make</option>
            {makes.map((m) => (
              <option key={m.make} value={m.make}>
                {m.make} ({m.count})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-model`} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
            Model
          </label>
          <input
            id={`${id}-model`}
            type="text"
            autoComplete="off"
            placeholder="Any model"
            className={fieldClass}
            value={query.model ?? ""}
            onChange={(e) => update({ model: e.target.value || undefined })}
          />
        </div>

        <div>
          <label htmlFor={`${id}-cat`} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
            Type
          </label>
          <select
            id={`${id}-cat`}
            className={fieldClass}
            value={query.category ?? ""}
            onChange={(e) => update({ category: e.target.value || undefined })}
          >
            <option value="">Any type</option>
            {categories.map((c) => (
              <option key={c.category} value={c.category}>
                {c.category} ({c.count})
              </option>
            ))}
          </select>
        </div>
      </form>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p role="status" className="font-semibold text-theme-ink">
            Showing {results.length} {results.length === 1 ? "bike" : "bikes"}
          </p>
          <div className="flex items-center gap-3">
            <label htmlFor={`${id}-sort`} className="text-sm font-semibold text-theme-body/80">
              Sort by
            </label>
            <select
              id={`${id}-sort`}
              className={cn(fieldClass, "w-auto")}
              value={sort}
              onChange={(e) => update({}, e.target.value as SortKey)}
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((bike, i) => (
              <li key={bike.slug}>
                <BikeCard bike={bike} priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-theme-line bg-theme-card p-10 text-center">
            <h3 className="text-xl font-bold text-theme-ink">No bikes match those filters</h3>
            <p className="mt-2 text-theme-body/70">Try widening your budget or clearing a filter.</p>
            <Link
              href={pathname}
              replace
              scroll={false}
              className="mt-5 inline-block font-bold text-theme-ink link-underline"
            >
              Clear all filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
