"use client";

import { useId, useMemo, useState } from "react";
import { site } from "@/config/site";
import { calculateRepayment, formatGBP } from "@/lib/finance";
import { validateCalculatorAmount } from "@/lib/calculator-input";
import { ArrowRightIcon } from "./icons";
import { QuoteCta } from "./QuoteCta";
import { cn } from "./ui";

const cfg = site.calculator;
const MIN_BORROW = 1000;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function AmountInput({
  id,
  label,
  value,
  min,
  max,
  onChange,
  onValidityChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onValidityChange: (invalid: boolean) => void;
}) {
  const [draft, setDraft] = useState({ value, text: String(value) });
  const text = draft.value === value ? draft.text : String(value);
  const error = validateCalculatorAmount(text, min, max);

  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-sm font-semibold text-theme-body/70">{label}</label>
      <div className="flex items-center gap-3 rounded-xl border border-theme-control-line px-4 focus-within:border-theme-ink">
        <span aria-hidden className="font-bold text-theme-ink">£</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={text}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          className="min-h-12 min-w-0 flex-1 bg-transparent py-3 text-xl font-bold text-theme-ink"
          onChange={(event) => {
            const next = event.target.value;
            const invalid = validateCalculatorAmount(next, min, max) !== null;
            const nextValue = invalid ? value : Number(next);
            setDraft({ value: nextValue, text: next });
            onValidityChange(invalid);
            if (!invalid) onChange(nextValue);
          }}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-theme-error">{error}</p>
      ) : (
        <p id={`${id}-hint`} className="mt-2 text-xs text-theme-muted-60">
          {formatGBP(min, true)} to {formatGBP(max, true)}
        </p>
      )}
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  display,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold text-theme-body/70">
          {label}
        </label>
        <output htmlFor={id} className="text-xl font-bold text-theme-ink">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-theme-muted-45">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function FinanceCalculator({
  className,
  apr = cfg.illustrativeApr,
  stacked = false,
  editableAmounts = false,
}: {
  className?: string;
  /** Illustrative APR to calculate with. Defaults to the site-wide figure. */
  apr?: number;
  /** Put the result below the sliders on desktop too, for narrow columns. */
  stacked?: boolean;
  /** Direct amount entry and an expanded HP breakdown for the bad credit guide. */
  editableAmounts?: boolean;
}) {
  const id = useId();
  const [price, setPrice] = useState<number>(cfg.defaultPrice);
  const [deposit, setDeposit] = useState<number>(cfg.defaultDeposit);
  const [term, setTerm] = useState<number>(cfg.defaultTerm);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidDeposit, setInvalidDeposit] = useState(false);

  const maxDeposit = Math.max(0, price - MIN_BORROW);
  const safeDeposit = clamp(deposit, 0, maxDeposit);
  const borrow = price - safeDeposit;
  const invalid = invalidPrice || invalidDeposit;

  const result = useMemo(
    () => calculateRepayment({ principal: borrow, apr, termMonths: term }),
    [borrow, term, apr],
  );

  return (
    <div className={className}>
      {editableAmounts && (
        <p className="mb-6 rounded-xl border border-theme-line bg-theme-soft p-4 text-sm leading-relaxed text-theme-body/70">
          Illustrative Hire Purchase estimate at {apr}% APR. This calculator spreads the amount borrowed over
          your selected term; it does not calculate PCP or an optional final payment.
        </p>
      )}
      <div className={cn("grid overflow-hidden rounded-2xl border border-theme-line bg-theme-card", !stacked && "lg:grid-cols-5")}>
        <div className={cn("space-y-8 p-6 sm:p-10", !stacked && "lg:col-span-3", stacked && "lg:p-8")}>
          {editableAmounts ? (
            <>
              <AmountInput
                id={`${id}-price`}
                label="Bike price"
                value={price}
                min={cfg.minPrice}
                max={cfg.maxPrice}
                onChange={(value) => {
                  setPrice(value);
                  setDeposit(Math.min(safeDeposit, Math.max(0, value - MIN_BORROW)));
                  setInvalidDeposit(false);
                }}
                onValidityChange={setInvalidPrice}
              />
              <AmountInput
                key={price}
                id={`${id}-deposit`}
                label="Deposit"
                value={safeDeposit}
                min={0}
                max={maxDeposit}
                onChange={setDeposit}
                onValidityChange={setInvalidDeposit}
              />
            </>
          ) : (
            <>
              <Slider
                id={`${id}-price`}
                label="Bike price"
                value={price}
                display={formatGBP(price, true)}
                min={cfg.minPrice}
                max={cfg.maxPrice}
                step={cfg.priceStep}
                minLabel={formatGBP(cfg.minPrice, true)}
                maxLabel={formatGBP(cfg.maxPrice, true)}
                onChange={setPrice}
              />
              <Slider
                id={`${id}-deposit`}
                label="Deposit"
                value={safeDeposit}
                display={formatGBP(safeDeposit, true)}
                min={0}
                max={maxDeposit}
                step={cfg.depositStep}
                minLabel="No deposit"
                maxLabel={formatGBP(maxDeposit, true)}
                onChange={setDeposit}
              />
            </>
          )}

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-theme-body/70">Term</legend>
            <div className="grid grid-cols-5 gap-2">
              {cfg.terms.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`${id}-term`}
                    value={t}
                    checked={term === t}
                    onChange={() => setTerm(t)}
                    className="peer sr-only"
                  />
                  <span className="flex min-h-11 items-center justify-center rounded-full border border-theme-control-line py-2 text-center text-sm font-semibold text-theme-muted-60 transition peer-checked:border-theme-ink peer-checked:text-theme-ink peer-focus-visible:ring-3 peer-focus-visible:ring-brand-yellow hover:border-theme-ink/40">
                    {t / 12} yr{t > 12 ? "s" : ""}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div
          className={cn(
            "flex min-w-0 flex-col justify-between gap-8 border-t border-theme-line bg-theme-soft p-6 sm:p-10",
            !stacked && "lg:col-span-2 lg:border-t-0 lg:border-l",
            stacked && "lg:p-8",
          )}
        >
          <div aria-live="polite">
            {invalid ? (
              <p className="text-theme-error">Correct the amounts above to see your repayment estimate.</p>
            ) : (
              <>
                <p className="text-sm font-semibold text-theme-muted-60">
                  {editableAmounts ? `${term} estimated monthly payments of` : "Estimated monthly"}
                </p>
                <p className="mt-1 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-theme-ink">
                  {formatGBP(result.monthlyPayment)}
                </p>
                <dl className="mt-8 space-y-2.5 text-sm">
                  {[
                    ...(editableAmounts ? [
                      ["Bike price", formatGBP(price)],
                      ["Deposit", formatGBP(safeDeposit)],
                      ["Agreement term", `${term} months`],
                    ] : []),
                    ["Amount borrowed", formatGBP(borrow)],
                    ["Total interest", formatGBP(result.totalInterest)],
                    ["Total payable", formatGBP(result.totalPayable + safeDeposit)],
                    ["Illustrative APR", `${apr}%`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-theme-muted-60">{k}</dt>
                      <dd className="font-semibold text-theme-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
          {!invalid && (
            <QuoteCta className="w-full">
              Get my quote <ArrowRightIcon className="h-4 w-4" />
            </QuoteCta>
          )}
        </div>
      </div>
      <p className={cn("mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-theme-muted-50")}>
        For illustration only, based on {apr}% APR (fixed). This is not an offer of finance. The rate
        you&apos;re offered depends on your circumstances and may differ. Total payable includes your deposit. Finance
        is subject to status and affordability.
      </p>
    </div>
  );
}
