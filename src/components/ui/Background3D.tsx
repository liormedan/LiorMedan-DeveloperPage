"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic import to avoid SSR issues
const Background3DCanvas = dynamic(() => import("@/components/Background3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
  ),
});

export type Background3DProps = {
  /** Intensity of the 3D effect (0-1) */
  intensity?: number;
  /** Speed of animations */
  speed?: number;
  /** Color theme */
  color?: string;
  /** Whether to show particles */
  particles?: boolean;
  /** Custom className */
  className?: string;
};

/**
 * 3D Background Component
 * A reusable 3D animated background that can be placed behind any content
 * 
 * @example
 * ```tsx
 * <Background3D intensity={0.5} particles>
 *   <YourContent />
 * </Background3D>
 * ```
 */
export default function Background3D({
  intensity = 0.3,
  speed = 1,
  color,
  particles = true,
  className = "",
  children,
}: Background3DProps & { children?: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        {mounted && (
          <Background3DCanvas
            intensity={intensity}
            speed={speed}
            color={color}
            particles={particles}
          />
        )}
      </div>

      {/* Content */}
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

