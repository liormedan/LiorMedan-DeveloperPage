import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Don't block builds on ESLint errors; surface them in editor instead
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
