import { site } from "@/config/site";
import { cn, Highlight } from "./ui";

export function TrustpilotAttribution({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const { rating, reviewCount, url } = site.trustpilot;
  const ratingText = rating.toFixed(1);
  const countText = reviewCount.toLocaleString("en-GB");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Trustpilot rating: ${ratingText} out of 5 from ${countText} reviews`}
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold transition-opacity hover:opacity-80 sm:text-sm",
        onDark ? "text-white" : "text-theme-ink",
        className,
      )}
    >
      <span aria-hidden className="tracking-[0.12em] text-brand-yellow">★★★★★</span>
      <span>
        <Highlight>{ratingText}/5</Highlight> · {countText} Trustpilot reviews
      </span>
    </a>
  );
}
