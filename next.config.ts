import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Several lockfiles exist above this directory, so Turbopack has to be
  // told where the workspace actually starts or it guesses the home dir.
  turbopack: {
    root: __dirname,
  },
  images: {
    // the portraits are pre-processed to their final crop and grade,
    // so only the width variants the layout actually asks for are useful
    deviceSizes: [640, 828, 1080, 1200, 1920],
    formats: ["image/webp"],
  },
};

export default nextConfig;
