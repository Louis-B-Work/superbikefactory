import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./src/lib/image-variants.mjs";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export has no image server, so photos are pre-rendered by scripts/optimise-images.mjs.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes,
    imageSizes,
  },
};

export default nextConfig;
