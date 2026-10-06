// Responsive image variants for the static export. Next's image optimiser needs a server, so
// `scripts/optimise-images.mjs` pre-renders every photo in public/images at each width below,
// and the custom loader (image-loader.ts) points next/image's srcset at those files.
// Plain .mjs so next.config.ts, the build script and the browser loader all share one source.

/** Full-width breakpoints (Next's `deviceSizes`), from small phones up to large high-DPI screens. */
export const deviceSizes = [640, 828, 1080, 1280, 1600, 1920, 2400];

/** Extra widths for images shown smaller than the screen (Next's `imageSizes`). */
export const imageSizes = [384];

export const variantWidths = [...imageSizes, ...deviceSizes];

/** Public folder the generated variants are written to and served from. */
export const variantDir = "_img";

/** Only photos are re-encoded; logos and other assets are served as they are. */
export function isOptimisable(src) {
  return /^\/images\/[^/]+\.jpe?g$/i.test(src);
}

/** Public URL of the WebP variant of `src` at `width`. */
export function variantSrc(src, width) {
  const name = src.slice("/images/".length).replace(/\.jpe?g$/i, "");
  return `/${variantDir}/${name}-${width}.webp`;
}
