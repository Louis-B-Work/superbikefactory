// Pre-renders the responsive WebP variants that next/image's custom loader points at
// (see src/lib/image-variants.mjs). Runs before `dev` and `build`; unchanged images are skipped.
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { isOptimisable, variantSrc, variantWidths } from "../src/lib/image-variants.mjs";

const publicDir = path.resolve("public");
const sourceDir = path.join(publicDir, "images");
const QUALITY = 80;

async function isFresh(output, sourceMtime) {
  try {
    return (await fs.stat(output)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

let written = 0;
for (const file of await fs.readdir(sourceDir)) {
  const src = `/images/${file}`;
  if (!isOptimisable(src)) continue;
  const input = path.join(sourceDir, file);
  const { mtimeMs } = await fs.stat(input);
  for (const width of variantWidths) {
    const output = path.join(publicDir, variantSrc(src, width));
    if (await isFresh(output, mtimeMs)) continue;
    await fs.mkdir(path.dirname(output), { recursive: true });
    // Never upscale: widths beyond the original get the original size, so every srcset URL exists.
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(output);
    written++;
  }
}
console.log(written ? `optimise-images: wrote ${written} variant(s)` : "optimise-images: up to date");
