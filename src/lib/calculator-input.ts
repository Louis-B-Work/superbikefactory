export function validateCalculatorAmount(text: string, min: number, max: number): string | null {
  if (text.trim() === "") return "Enter an amount.";
  const amount = Number(text);
  if (!Number.isFinite(amount)) return "Enter a valid amount.";
  if (!Number.isInteger(amount)) return "Enter an amount in whole pounds.";
  if (amount < min || amount > max) {
    return `Enter an amount between £${min.toLocaleString("en-GB")} and £${max.toLocaleString("en-GB")}.`;
  }
  return null;
}
