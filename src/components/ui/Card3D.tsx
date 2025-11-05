"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Card3DProps = ComponentProps<typeof Card> & {
  /** 3D effect intensity (0-1) */
  intensity?: number;
  /** Enable glow effect on hover */
  glow?: boolean;
  /** Custom glow color */
  glowColor?: string;
};

/**
 * 3D Card Component
 * A card with 3D tilt effect on hover
 * 
 * @example
 * ```tsx
 * <Card3D intensity={0.15} glow>
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content</CardContent>
 * </Card3D>
 * ```
 */
export function Card3D({
  children,
  className,
  intensity = 0.15,
  glow = false,
  glowColor,
  ...props
}: Card3DProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity * 10, -intensity * 10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity * 10, intensity * 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowStyle = glow && glowColor
    ? {
        boxShadow: `0 20px 60px -15px ${glowColor}30`,
      }
    : {};

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block w-full"
    >
      <Card
        ref={ref}
        className={cn(
          "relative transition-all duration-300",
          glow && "border-primary/20",
          className
        )}
        style={glowStyle}
        {...props}
      >
        <motion.div
          style={{
            transform: "translateZ(20px)",
          }}
          className="relative z-10"
        >
          {children}
        </motion.div>

        {glow && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 transition-opacity"
            whileHover={{ opacity: 1 }}
          />
        )}
      </Card>
    </motion.div>
  );
}

