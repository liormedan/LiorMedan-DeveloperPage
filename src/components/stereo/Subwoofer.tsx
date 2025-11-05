"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Box, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

type SubwooferProps = {
  position: [number, number, number];
  isPlaying: boolean;
  volume: number;
};

export function Subwoofer({ position, isPlaying, volume }: SubwooferProps) {
  const subwooferRef = React.useRef<THREE.Group>(null);
  const driverRef = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (subwooferRef.current && isPlaying) {
      // Subtle pulse only when playing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      subwooferRef.current.scale.setScalar(scale);
    }

    // Animate subwoofer driver based on volume
    const volumeMultiplier = volume / 100;
    if (driverRef.current && isPlaying) {
      driverRef.current.position.z = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.04 * volumeMultiplier;
    }
  });

  return (
    <group ref={subwooferRef} position={position}>
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Subwoofer Cabinet - Larger and Boxier */}
        <Box args={[0.6, 0.6, 0.6]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#1a1a1a"
            distort={0.02}
            roughness={0.5}
            metalness={0.3}
          />
        </Box>

        {/* Cabinet Frame */}
        <Box args={[0.62, 0.62, 0.62]} position={[0, 0, -0.01]}>
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.4}
            metalness={0.5}
          />
        </Box>

        {/* Front Panel */}
        <Box args={[0.58, 0.58, 0.02]} position={[0, 0, 0.31]}>
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.3}
            metalness={0.6}
          />
        </Box>

        {/* Large Subwoofer Driver - Detailed */}
        <group position={[0, 0, 0.32]} ref={driverRef}>
          {/* Driver Cone */}
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
            <MeshDistortMaterial
              color={isPlaying ? "#8b5cf6" : "#404040"}
              distort={isPlaying ? 0.3 * (volume / 100) : 0.1}
              speed={isPlaying ? 1 : 0.3}
              roughness={0.4}
              metalness={0.3}
              emissive={isPlaying ? "#8b5cf6" : "#000000"}
              emissiveIntensity={isPlaying ? 0.4 * (volume / 100) : 0}
            />
          </mesh>
          {/* Suspension Ring */}
          <mesh position={[0, 0, 0.05]}>
            <torusGeometry args={[0.25, 0.02, 16, 32]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
          {/* Driver Center Cap */}
          <mesh position={[0, 0, 0.06]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 32]} />
            <meshStandardMaterial
              color={isPlaying ? "#a855f7" : "#505050"}
              metalness={0.5}
              roughness={0.3}
              emissive={isPlaying ? "#a855f7" : "#000000"}
              emissiveIntensity={isPlaying ? 0.3 * (volume / 100) : 0}
            />
          </mesh>
          {/* Voice Coil */}
          <mesh position={[0, 0, 0.07]}>
            <cylinderGeometry args={[0.05, 0.05, 0.015, 32]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Port/Vent - Tuned Port */}
        <Box args={[0.08, 0.2, 0.15]} position={[0.2, 0, 0.25]}>
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.6}
            metalness={0.4}
          />
        </Box>

        {/* Subwoofer Feet */}
        {[
          [-0.25, -0.3, 0.2],
          [0.25, -0.3, 0.2],
          [-0.25, -0.3, -0.2],
          [0.25, -0.3, -0.2],
        ].map((pos, i) => (
          <group key={i} position={pos}>
            <Box args={[0.06, 0.08, 0.06]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.5}
                metalness={0.3}
              />
            </Box>
            <Sphere args={[0.025, 8, 8]} position={[0, -0.04, 0]}>
              <meshStandardMaterial
                color="#000000"
                roughness={0.9}
                metalness={0}
              />
            </Sphere>
          </group>
        ))}

        {/* Subwoofer Label */}
        <Box args={[0.3, 0.06, 0.01]} position={[0, 0.35, 0.32]}>
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      </Float>
    </group>
  );
}

