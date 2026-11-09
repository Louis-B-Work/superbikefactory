"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type FormEvent } from "react";
import { bikes } from "@/content/stock";
import { formatGBP } from "@/lib/finance";
import { budgetBands, filterBikes, makeCounts, stockSearchParams, type BudgetMode } from "@/lib/stock";
import { SearchIcon } from "./icons";
import { cn } from "./ui";

const fieldClass =
  "h-12 w-full rounded-xl border border-theme-control-line bg-theme-surface px-4 text-[15px] text-theme-ink outline-none transition focus:border-theme-ink focus-visible:ring-3 focus-visible:ring-brand-yellow";

/** Hero search: budget (total or monthly), make and model, with a live match count. */
export function StockSearch({ className }: { className?: string }) {
  const router = useRouter();
  const id = useId();
  const [mode, setMode] = useState<BudgetMode>("total");
  const [max, setMax] = useState<number | undefined>();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const bands = useMemo(() => budgetBands(bikes, mode), [mode]);
  const makes = useMemo(() => makeCounts(bikes), []);
  const count = useMemo(() => filterBikes(bikes, { mode, max, make, model }).length, [mode, max, make, model]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const qs = stockSearchParams({ mode, max, make: make || undefined, model: model || undefined });
    router.push(qs ? `/bikes?${qs}` : "/bikes");
  }

  const monthly = mode === "monthly";

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Search bikes in stock"
      className={cn("w-full rounded-3xl bg-theme-surface p-5 text-left text-theme-ink shadow-2xl sm:p-6", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-3 text-sm font-bold">
          <span className={monthly ? "text-theme-muted-50" : "text-theme-ink"}>Total Cost</span>
          <button
            type="button"
            role="switch"
            aria-checked={monthly}
            aria-label="Show budget as a monthly cost"
            onClick={() => {
              setMode(monthly ? "total" : "monthly");
              setMax(undefined);
            }}
            className="relative h-8 w-14 rounded-full border border-theme-control-line bg-theme-soft outline-none transition focus-visible:ring-3 focus-visible:ring-brand-yellow"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1 left-1 h-6 w-6 rounded-full bg-brand-navy transition-transform duration-200 motion-reduce:transition-none",
                monthly && "translate-x-6",
              )}
            />
          </button>
          <span className={monthly ? "text-theme-ink" : "text-theme-muted-50"}>Monthly Cost</span>
        </div>
        <Link href="/sell-your-bike" className="link-underline text-sm font-bold text-theme-ink">
          or sell us your bike
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div>
          <label htmlFor={`${id}-budget`} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
            Your budget
          </label>
          <select
            id={`${id}-budget`}
            className={fieldClass}
            value={max ?? ""}
            onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Any price</option>
            {bands.map((b) => (
              <option key={b.max} value={b.max}>
                {monthly ? `Up to ${formatGBP(b.max, true)} a month` : `Up to ${formatGBP(b.max, true)}`} ({b.count})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-make`} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
            Make
          </label>
          <select id={`${id}-make`} className={fieldClass} value={make} onChange={(e) => setMake(e.target.value)}>
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
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-yellow px-8 text-[15px] font-bold text-brand-navy transition hover:bg-brand-yellow-hover focus-visible:ring-3 focus-visible:ring-brand-navy focus-visible:outline-none sm:col-span-2 lg:col-span-1"
        >
          <SearchIcon className="h-4 w-4" />
          Search <span aria-live="polite">({count})</span>
        </button>
      </div>
    </form>
  );
}
