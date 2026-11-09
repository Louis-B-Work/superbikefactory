export interface SellBikeInput {
  reg: string;
  mileage: string;
  make: string;
  model: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

export type SellBikeErrors = Partial<Record<keyof SellBikeInput, string>>;

export function normaliseReg(reg: string): string {
  return reg.replace(/\s+/g, "").toUpperCase();
}

/** Loose check: UK plates are 2-7 letters/digits once spaces are removed. Real lookup happens at valuation. */
export function validateSellBike(input: SellBikeInput): SellBikeErrors {
  const errors: SellBikeErrors = {};
  if (!/^[A-Z0-9]{2,7}$/.test(normaliseReg(input.reg))) errors.reg = "Enter your registration, e.g. AB21 CDE";

  const miles = Number(input.mileage.replace(/,/g, ""));
  if (!input.mileage.trim() || !Number.isInteger(miles) || miles < 0 || miles > 500000) {
    errors.mileage = "Enter the mileage as a whole number";
  }

  if (input.name.trim().length < 2) errors.name = "Enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = "Enter a valid email address";
  if (input.phone.replace(/[^\d]/g, "").length < 10) errors.phone = "Enter a valid phone number";
  if (!input.consent) errors.consent = "Please agree so we can contact you about your valuation";
  return errors;
}

export function sellBikeMailto(email: string, input: SellBikeInput): string {
  const body = [
    `Registration: ${normaliseReg(input.reg)}`,
    `Mileage: ${input.mileage}`,
    `Make: ${input.make || "-"}`,
    `Model: ${input.model || "-"}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent("Bike valuation request")}&body=${encodeURIComponent(body)}`;
}
