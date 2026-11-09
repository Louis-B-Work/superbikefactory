import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { bikes } from "@/content/stock";
import { sitePathUrl } from "@/lib/deployment";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/bikes/",
    ...bikes.map((b) => `/bikes/${b.slug}/`),
    "/sell-your-bike/",
    "/bike-finance/",
    "/calculator/",
    "/bad-credit-finance/",
    "/guides/",
    "/contact/",
    "/about/",
    "/privacy/",
    "/cookies/",
    "/complaints/",
  ];
  const primary = ["/bikes/", "/sell-your-bike/", "/bike-finance/"];
  return routes.map((path) => ({
    url: sitePathUrl(path, site.url),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : primary.includes(path) ? 0.9 : 0.5,
  }));
}
