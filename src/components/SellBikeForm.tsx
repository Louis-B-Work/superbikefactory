"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { sellBikeMailto, validateSellBike, type SellBikeErrors, type SellBikeInput } from "@/lib/sell-bike";
import { buttonClass, cn } from "./ui";

const empty: SellBikeInput = {
  reg: "",
  mileage: "",
  make: "",
  model: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

const inputClass =
  "h-12 w-full rounded-xl border border-theme-control-line bg-theme-surface px-4 text-[15px] text-theme-ink outline-none transition focus:border-theme-ink focus-visible:ring-3 focus-visible:ring-brand-yellow aria-[invalid=true]:border-theme-error";

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-theme-body/80">
        {label}
        {optional && <span className="font-normal text-theme-muted-50"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1.5 text-sm text-theme-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Valuation request. Posts to `site.sell.endpoint` when configured; otherwise hands the details to the visitor's email client. */
export function SellBikeForm() {
  const [values, setValues] = useState<SellBikeInput>(empty);
  const [errors, setErrors] = useState<SellBikeErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "email" | "failed">("idle");

  const set = <K extends keyof SellBikeInput>(key: K, value: SellBikeInput[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const field = (name: keyof SellBikeInput) => ({
    id: name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateSellBike(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    const endpoint = site.sell.endpoint;
    if (!endpoint) {
      setStatus("email");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent" || status === "email") {
    return (
      <div role="status" className="rounded-2xl border border-theme-line bg-theme-card p-8">
        <h2 className="text-2xl font-bold text-theme-ink">
          {status === "sent" ? "Thanks, we've got your details" : "One more step: send us your details"}
        </h2>
        <p className="mt-3 leading-relaxed text-theme-body/75">
          {status === "sent"
            ? "We'll be in touch shortly with your free, no-obligation valuation."
            : "Online submission isn't switched on yet. Tap the button to send your details by email and we'll come back to you with a valuation."}
        </p>
        {status === "email" && (
          <a href={sellBikeMailto(site.contact.email, values)} className={buttonClass("primary", "mt-6")}>
            Email my details
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Get a free valuation"
      className="rounded-2xl border border-theme-line bg-theme-card p-6 sm:p-8"
    >
      <h2 className="text-2xl font-bold text-theme-ink">Get your free valuation</h2>
      <p className="mt-2 text-theme-body/70">It takes a minute. No obligation to sell.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Registration" name="reg" error={errors.reg}>
          <input
            {...field("reg")}
            type="text"
            autoComplete="off"
            placeholder="AB21 CDE"
            className={cn(inputClass, "uppercase")}
            value={values.reg}
            onChange={(e) => set("reg", e.target.value)}
          />
        </Field>
        <Field label="Current mileage" name="mileage" error={errors.mileage}>
          <input
            {...field("mileage")}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="e.g. 12,500"
            className={inputClass}
            value={values.mileage}
            onChange={(e) => set("mileage", e.target.value)}
          />
        </Field>
        <Field label="Make" name="make" optional>
          <input
            {...field("make")}
            type="text"
            className={inputClass}
            value={values.make}
            onChange={(e) => set("make", e.target.value)}
          />
        </Field>
        <Field label="Model" name="model" optional>
          <input
            {...field("model")}
            type="text"
            className={inputClass}
            value={values.model}
            onChange={(e) => set("model", e.target.value)}
          />
        </Field>
        <Field label="Your name" name="name" error={errors.name}>
          <input
            {...field("name")}
            type="text"
            autoComplete="name"
            className={inputClass}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>
        <Field label="Phone number" name="phone" error={errors.phone}>
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Email address" name="email" error={errors.email}>
            <input
              {...field("email")}
              type="email"
              autoComplete="email"
              className={inputClass}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-theme-body/80">
          <input
            {...field("consent")}
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-brand-navy"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <span>I agree to SuperBike Factory contacting me about my valuation. See our privacy policy.</span>
        </label>
        {errors.consent && (
          <p id="consent-error" role="alert" className="mt-1.5 text-sm text-theme-error">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-5 text-sm text-theme-error">
          Something went wrong sending your details. Please try again, or contact us directly.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "mt-6 w-full sm:w-auto")}>
        {status === "sending" ? "Sending…" : "Get my free valuation"}
      </button>
      <p className="mt-4 text-xs text-theme-muted-50">
        Valuations are indicative and subject to inspection. No obligation to sell.
      </p>
    </form>
  );
}
