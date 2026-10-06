import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { sitePathUrl } from "@/lib/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: sitePathUrl("/sitemap.xml", site.url),
  };
}
