import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Prevent lockfile detection ambiguity
  outputFileTracingRoot: "/Users/l3ymvnovich./Documents/Samira",
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  publicExcludes: [
    "!**/*.mp4",
    "!**/*.MP4",
    "!**/*.mov",
    "!**/*.MOV",
    "!videos/**/*",
    "!bibliotheque/**/*.mp4",
    "!bibliotheque/**/*.MP4"
  ],
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:mp4|MP4|webm|mov|ogg)$/i,
        handler: "NetworkOnly",
      },
    ],
  },
});

export default pwaConfig(nextConfig);
