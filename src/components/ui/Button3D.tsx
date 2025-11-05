"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import type { ComponentProps } from "react";

type Button3DProps = ComponentProps<typeof Button> & {
  /** 3D effect intensity (0-1) */
  intensity?: number;
  /** Enable glow effect */
  glow?: boolean;
  /** Custom shadow color */
  shadowColor?: string;
};

/**
 * 3D Button Component
 * A button with 3D tilt effect on hover and click
 * 
 * @example
 * ```tsx
 * <Button3D intensity={0.3} glow>
 *   Click Me
 * </Button3D>
 * ```
 */
export function Button3D({
  children,
  className,
  intensity = 0.2,
  glow = false,
  shadowColor,
  ...props
}: Button3DProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity * 15, -intensity * 15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity * 15, intensity * 15]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const shadowStyle = shadowColor
    ? {
        boxShadow: `0 10px 40px -10px ${shadowColor}40, 0 0 0 1px ${shadowColor}20 inset`,
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
      className="inline-block"
    >
      <Button
        ref={ref}
        className={cn(
          "relative transition-all duration-300",
          glow && "shadow-lg shadow-primary/50",
          className
        )}
        style={shadowStyle}
        {...props}
      >
        <motion.span
          style={{
            transform: "translateZ(20px)",
          }}
          className="relative z-10"
        >
          {children}
        </motion.span>
        
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 transition-opacity"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </Button>
    </motion.div>
  );
}

