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
  webpack: (config, { isServer }) => {
    // Fix for React Three Fiber and Next.js 15
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Ensure React Three Fiber components are properly handled
  transpilePackages: ["@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
