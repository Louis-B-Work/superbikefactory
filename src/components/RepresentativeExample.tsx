import { site } from "@/config/site";
import { calculateRepayment, formatGBP } from "@/lib/finance";

/** FCA-style representative example. Figures come from site config and are placeholders. */
export function RepresentativeExample({ className }: { className?: string }) {
  const ex = site.compliance.representativeExample;
  const { monthlyPayment, totalPayable, totalInterest } = calculateRepayment({
    principal: ex.amountOfCredit,
    apr: ex.apr,
    termMonths: ex.termMonths,
  });

  const rows: Array<[string, string]> = [
    ["Amount of credit", formatGBP(ex.amountOfCredit)],
    ["Deposit", formatGBP(ex.deposit)],
    ["Duration of agreement", `${ex.termMonths} months`],
    ["Monthly repayments", `${ex.termMonths} × ${formatGBP(monthlyPayment)}`],
    ["Interest rate (fixed)", `${ex.apr}% APR`],
    ["Total charge for credit", formatGBP(totalInterest)],
    ["Total amount payable", formatGBP(totalPayable + ex.deposit)],
  ];

  return (
    <div className={className}>
      <div className="rounded-2xl border border-theme-line bg-theme-soft p-6 sm:p-8">
        <p className="text-3xl font-bold text-theme-ink">
          Representative {ex.apr}% APR
        </p>
        <dl className="mt-6 space-y-3 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-theme-line pb-3">
              <dt className="text-theme-muted-60">{k}</dt>
              <dd className="font-semibold text-theme-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs text-theme-muted-50">
          [PLACEHOLDER] Illustrative figures only. Replace with an approved representative example from the lending
          panel before launch.
        </p>
      </div>
    </div>
  );
}
