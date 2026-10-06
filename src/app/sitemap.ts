import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { sitePathUrl } from "@/lib/deployment";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/bike-finance/",
    "/bad-credit-finance/",
    "/about/",
    "/privacy/",
    "/cookies/",
    "/complaints/",
  ];
  const primary = ["/bike-finance/", "/bad-credit-finance/"];
  return routes.map((path) => ({
    url: sitePathUrl(path, site.url),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : primary.includes(path) ? 0.9 : 0.5,
  }));
}
