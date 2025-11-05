"use client";

import * as React from "react";
import { Box } from "@react-three/drei";

type InternalComponentsProps = {
  showXRay: boolean;
  isPlaying: boolean;
  volume: number;
};

export function InternalComponents({ showXRay, isPlaying, volume }: InternalComponentsProps) {
  if (!showXRay) return null;

  return (
    <group position={[0, 0.5, 0]}>
      {/* Amplifier Board */}
      <Box args={[1.5, 0.5, 0.3]} position={[0, 0, 0.1]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.2}
          metalness={0.8}
          opacity={0.7}
          transparent
        />
      </Box>
      
      {/* Circuit Components - Resistors */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          args={[0.1, 0.05, 0.05]}
          position={[-0.6 + (i * 0.17), 0, 0.15]}
        >
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={isPlaying ? volume / 100 : 0}
          />
        </Box>
      ))}
      
      {/* Capacitors */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`cap-${i}`} position={[-0.4 + (i * 0.3), -0.15, 0.15]}>
          <Box args={[0.08, 0.1, 0.08]}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={0.7}
              roughness={0.3}
            />
          </Box>
          {/* Capacitor Leads */}
          <Box args={[0.02, 0.15, 0.02]} position={[-0.03, 0.05, 0]}>
            <meshStandardMaterial
              color="#6366f1"
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
          <Box args={[0.02, 0.15, 0.02]} position={[0.03, 0.05, 0]}>
            <meshStandardMaterial
              color="#6366f1"
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
        </group>
      ))}
      
      {/* Power Supply Unit */}
      <Box args={[0.3, 0.2, 0.2]} position={[0.6, -0.2, 0.1]}>
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.7}
          opacity={0.8}
          transparent
        />
      </Box>
      
      {/* Transformer */}
      <group position={[-0.6, -0.15, 0.1]}>
        <Box args={[0.2, 0.3, 0.15]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.4}
            metalness={0.6}
            opacity={0.8}
            transparent
          />
        </Box>
        {/* Transformer Core */}
        <Box args={[0.15, 0.25, 0.12]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#6366f1"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </group>
      
      {/* Audio Processing Chip */}
      <Box args={[0.15, 0.15, 0.05]} position={[0, 0.1, 0.2]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.9}
          opacity={0.9}
          transparent
        />
      </Box>
      
      {/* Wiring Connections */}
      {Array.from({ length: 6 }).map((_, i) => {
        const startX = -0.5 + (i * 0.2);
        return (
          <Box
            key={`wire-${i}`}
            args={[0.01, 0.3, 0.01]}
            position={[startX, 0.05, 0.12]}
            rotation={[0, 0, Math.PI / 6]}
          >
            <meshStandardMaterial
              color={isPlaying ? "#6366f1" : "#404040"}
              emissive={isPlaying ? "#6366f1" : "#000000"}
              emissiveIntensity={isPlaying ? 0.3 : 0}
            />
          </Box>
        );
      })}
    </group>
  );
}

