import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',       // Generate static HTML/CSS/JS in /out
  trailingSlash: true,    // Required for GitHub Pages path resolution
  basePath: '/haven-specialty-coffee', // GitHub Pages serves from a subdirectory
  images: {
    unoptimized: true,    // GitHub Pages has no image optimisation server
    // Next 16 only serves qualities listed here. 75 is the default; the hero
    // cup is a transparent product render, so it gets a little extra.
    qualities: [75, 90],
  },
};

export default nextConfig;
