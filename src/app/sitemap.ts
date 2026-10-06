import type { MetadataRoute } from "next";
import { site } from "@/config/site";

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
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : primary.includes(path) ? 0.9 : 0.5,
  }));
}
