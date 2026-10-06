import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("deployment paths", () => {
  it.each(["", "/superbikefactory"])("serves public assets under %s", async (prefix) => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", prefix);
    const { publicPath } = await import("./deployment");
    const { default: imageLoader } = await import("./image-loader");
    expect(publicPath("/logo.png")).toBe(`${prefix}/logo.png`);
    expect(publicPath("/videos/hero-home.mp4")).toBe(`${prefix}/videos/hero-home.mp4`);
    expect(publicPath("/")).toBe(`${prefix}/`);
    expect(publicPath("https://example.com/photo.jpg")).toBe("https://example.com/photo.jpg");
    expect(publicPath("//example.com/photo.jpg")).toBe("//example.com/photo.jpg");
    expect(imageLoader({ src: "/images/road.jpg", width: 640 })).toBe(`${prefix}/_img/road-640.webp`);
  });

  it("preserves the deployed subpath in metadata URLs", async () => {
    const { sitePathUrl } = await import("./deployment");
    const url = "https://louis-b-work.github.io/superbikefactory";
    expect(sitePathUrl("/about/", url)).toBe(`${url}/about/`);
    expect(sitePathUrl("/sitemap.xml", `${url}/`)).toBe(`${url}/sitemap.xml`);
    expect(sitePathUrl("/", url)).toBe(`${url}/`);
    expect(sitePathUrl("/about/", "https://superbikefactory.co.uk")).toBe("https://superbikefactory.co.uk/about/");
  });
});
