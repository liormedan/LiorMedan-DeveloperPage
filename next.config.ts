import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't block builds on ESLint errors; surface them in editor instead
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
