"use client";

import * as React from "react";
import { Box } from "@react-three/drei";
import * as THREE from "three";

type SpeakerStandProps = {
  position: [number, number, number];
  height?: number;
  width?: number;
  depth?: number;
};

export function SpeakerStand({ position, height = 0.6, width = 0.25, depth = 0.25 }: SpeakerStandProps) {
  return (
    <group position={position}>
      {/* Main Stand Column - B&W Style */}
      <mesh position={[0, -height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0f0f0f"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>
      
      {/* Top Plate - Speaker Mounting Plate */}
      <Box args={[width + 0.05, 0.04, depth + 0.05]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.4}
          metalness={0.4}
        />
      </Box>
      
      {/* Top Plate Detail - B&W Style */}
      <Box args={[width + 0.08, 0.02, depth + 0.08]} position={[0, 0.03, 0]}>
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.3}
          metalness={0.5}
        />
      </Box>
      
      {/* Bottom Base - Wider for Stability */}
      <Box args={[width + 0.1, 0.08, depth + 0.1]} position={[0, -height, 0]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.6}
          metalness={0.2}
        />
      </Box>
      
      {/* Base Feet - Spikes/Pads */}
      {[
        [-width / 2 - 0.05, -height, -depth / 2 - 0.05],
        [width / 2 + 0.05, -height, -depth / 2 - 0.05],
        [-width / 2 - 0.05, -height, depth / 2 + 0.05],
        [width / 2 + 0.05, -height, depth / 2 + 0.05],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          {/* Spike */}
          <mesh position={[0, -0.02, 0]}>
            <coneGeometry args={[0.015, 0.04, 8]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Rubber Pad */}
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 8]} />
            <meshStandardMaterial
              color="#000000"
              roughness={0.95}
              metalness={0}
            />
          </mesh>
        </group>
      ))}
      
      {/* Cable Management - Optional hole in stand */}
      <mesh position={[0, -height / 2, depth / 2 + 0.01]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

