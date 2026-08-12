import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only serves qualities listed here. 75 is the default; the hero
    // cup is a transparent product render, so it gets a little extra.
    qualities: [75, 90],
  },
};

export default nextConfig;
