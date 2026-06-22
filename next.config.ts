import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Prevent lockfile detection ambiguity
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true,
  },
});

export default pwaConfig(nextConfig);
