"use client";

import type { ImageLoaderProps } from "next/image";
import { isOptimisable, variantSrc } from "./image-variants.mjs";
import { publicPath } from "./deployment";

/** next/image loader for the static export: serves the pre-rendered WebP variant for each srcset width. */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  return publicPath(isOptimisable(src) ? variantSrc(src, width) : src);
}
