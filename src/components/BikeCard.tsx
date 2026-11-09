import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { bikeSubtitle, bikeTitle, type Bike } from "@/content/stock";
import { formatGBP } from "@/lib/finance";
import { monthlyFor } from "@/lib/stock";
import { cn } from "./ui";

export function BikeCard({ bike, priority = false }: { bike: Bike; priority?: boolean }) {
  const monthly = monthlyFor(bike);
  return (
    <Link
      href={`/bikes/${bike.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-theme-line bg-theme-card outline-none transition duration-300",
        "hover:-translate-y-1 hover:border-theme-ink/20 hover:shadow-[0_12px_40px_-12px_rgba(35,38,56,0.18)]",
        "focus-visible:ring-3 focus-visible:ring-brand-yellow motion-reduce:hover:translate-y-0",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-theme-soft">
        <Image
          src={bike.image}
          alt={`${bike.year} ${bikeTitle(bike)}`}
          fill
          preload={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {bike.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-navy">
            {bike.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-theme-ink">{bikeTitle(bike)}</h3>
        <p className="mt-1 text-sm text-theme-body/70">{bikeSubtitle(bike)}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-theme-body/80">
          <li>{bike.mileage.toLocaleString("en-GB")} miles</li>
          <li>{bike.engineCc}cc</li>
          <li>{bike.colour}</li>
        </ul>
        <div className="mt-auto pt-5">
          <p className="text-2xl font-bold text-theme-ink">{formatGBP(bike.price, true)}</p>
          {monthly !== undefined ? (
            <>
              <p className="text-sm font-semibold text-theme-ink">{formatGBP(monthly, true)} a month</p>
              <p className="mt-2 text-xs leading-snug text-theme-muted-50">
                Representative {site.calculator.illustrativeApr}% APR. We are a credit broker, not a lender.
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold text-theme-body/70">Cash sale only</p>
          )}
        </div>
      </div>
    </Link>
  );
}
