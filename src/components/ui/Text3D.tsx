"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Text3DProps = {
  children: React.ReactNode;
  className?: string;
  /** 3D effect intensity (0-1) */
  intensity?: number;
  /** Enable glow effect */
  glow?: boolean;
  /** Glow color */
  glowColor?: string;
  /** Animation delay */
  delay?: number;
  /** As which HTML element to render */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
};

/**
 * 3D Text Component
 * Text with 3D tilt effect on hover
 * 
 * @example
 * ```tsx
 * <Text3D as="h1" intensity={0.3} glow>
 *   Hello World
 * </Text3D>
 * ```
 */
export function Text3D({
  children,
  className,
  intensity = 0.2,
  glow = false,
  glowColor,
  delay = 0,
  as: Component = "div",
  ...props
}: Text3DProps & React.ComponentProps<typeof Component>) {
  const ref = React.useRef<HTMLElement>(null);
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

  const handleMouseMove = (e: React.MouseEvent) => {
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
        textShadow: `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`,
      }
    : glow
    ? {
        textShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="inline-block"
    >
      <motion.div
        style={{
          transform: "translateZ(20px)",
          ...glowStyle,
        }}
        className="relative z-10"
      >
        <Component
          ref={ref}
          className={cn("transition-all duration-300 cursor-default", className)}
          {...(props as any)}
        >
          {children}
        </Component>
      </motion.div>
    </motion.div>
  );
}

