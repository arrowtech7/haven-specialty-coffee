import type { NextConfig } from "next";

/**
 * The repository is published at https://arrowtech7.github.io/haven-specialty-coffee/,
 * so every route and asset lives under that sub-path. Exposed to the browser as
 * NEXT_PUBLIC_BASE_PATH too, because <Link>/next/image apply basePath
 * automatically but hand-built URLs (the QR code) have to add it themselves.
 */
const basePath = '/haven-specialty-coffee';

const nextConfig: NextConfig = {
  output: 'export',       // Generate static HTML/CSS/JS in /out
  trailingSlash: true,    // Required for GitHub Pages path resolution
  basePath,               // GitHub Pages serves from a subdirectory
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    unoptimized: true,    // GitHub Pages has no image optimisation server
    // Next 16 only serves qualities listed here. 75 is the default; the hero
    // cup is a transparent product render, so it gets a little extra.
    qualities: [75, 90],
  },
};

export default nextConfig;
