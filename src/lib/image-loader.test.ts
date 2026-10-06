import { describe, expect, it } from "vitest";
import imageLoader from "./image-loader";

describe("imageLoader", () => {
  it("maps photos to their pre-rendered WebP variant at the requested width", () => {
    expect(imageLoader({ src: "/images/hero-home.jpg", width: 1280 })).toBe("/_img/hero-home-1280.webp");
    expect(imageLoader({ src: "/images/road.JPEG", width: 640 })).toBe("/_img/road-640.webp");
  });

  it("leaves everything else untouched", () => {
    expect(imageLoader({ src: "/logo.png", width: 384 })).toBe("/logo.png");
    expect(imageLoader({ src: "/images/sub/photo.jpg", width: 640 })).toBe("/images/sub/photo.jpg");
  });
});
