"use client";

import * as React from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

type Tooltip3DProps = {
  position: [number, number, number];
  text: string;
  visible: boolean;
  locale?: "he" | "en";
};

/**
 * 3D Tooltip Component
 * Shows tooltips in 3D space
 */
export function Tooltip3D({ position, text, visible, locale = "en" }: Tooltip3DProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  return (
    <Html
      position={position}
      center
      style={{
        pointerEvents: "none",
        userSelect: "none",
      }}
      transform
      occlude
      distanceFactor={10}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg"
            style={{
              transform: `translateZ(20px)`,
              direction: locale === "he" ? "rtl" : "ltr",
            }}
          >
            <p className="text-xs font-medium text-foreground whitespace-nowrap">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
}

