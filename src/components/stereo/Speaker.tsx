"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Box, Sphere, Float, Text } from "@react-three/drei";
import * as THREE from "three";

type SpeakerProps = {
  position: [number, number, number];
  side: "left" | "right" | "center" | "rear-left" | "rear-right" | "side-left" | "side-right";
  isPlaying: boolean;
  volume: number;
  mode: "stereo" | "mono" | "surround";
  rotation?: [number, number, number];
};

export function Speaker({ position, side, isPlaying, volume, mode, rotation = [0, 0, 0] }: SpeakerProps) {
  const speakerRef = React.useRef<THREE.Group>(null);
  const tweeterRef = React.useRef<THREE.Group>(null);
  const wooferRef = React.useRef<THREE.Group>(null);
  const isActive = isPlaying;

  useFrame((state) => {
    // Removed floating animation - speakers stay static by default
    // if (speakerRef.current) {
    //   speakerRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + side.length) * 0.05;
    // }
    
    if (speakerRef.current && isActive) {
      // Subtle pulse only when playing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      speakerRef.current.scale.setScalar(scale);
    }

    // Animate speaker cones based on volume
    const volumeMultiplier = volume / 100;
    if (tweeterRef.current && isActive) {
      tweeterRef.current.position.z = 0.45 + Math.sin(state.clock.elapsedTime * 4) * 0.02 * volumeMultiplier;
      tweeterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.01 * volumeMultiplier;
    }
    if (wooferRef.current && isActive) {
      wooferRef.current.position.z = 0.45 + Math.sin(state.clock.elapsedTime * 2) * 0.03 * volumeMultiplier;
      wooferRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.02 * volumeMultiplier;
    }
  });

  return (
    <group ref={speakerRef} position={position} rotation={rotation}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Speaker Cabinet - B&W Style - Main Body with Wood/Black Finish */}
        <Box args={[0.8, 1.2, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.6}
            metalness={0.1}
          />
        </Box>

        {/* Cabinet Frame - Clean B&W Design */}
        <Box args={[0.82, 1.22, 0.82]} position={[0, 0, -0.01]}>
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={0.5}
            metalness={0.2}
          />
        </Box>
        
        {/* Top Edge - B&W Style */}
        <Box args={[0.8, 0.02, 0.8]} position={[0, 0.61, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.4}
            metalness={0.3}
          />
        </Box>
        
        {/* Bottom Edge - B&W Style */}
        <Box args={[0.8, 0.02, 0.8]} position={[0, -0.61, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.4}
            metalness={0.3}
          />
        </Box>

        {/* B&W Style - Clean corners, no protectors */}

        {/* B&W Style Removable Grille Frame - Clean Design */}
        <Box args={[0.75, 0.95, 0.025]} position={[0, 0, 0.41]}>
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.3}
            roughness={0.6}
          />
        </Box>

        {/* B&W Grille - Fine Mesh Pattern */}
        <group position={[0, 0, 0.42]}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box
              key={`h-${i}`}
              args={[0.73, 0.002, 0.008]}
              position={[0, -0.365 + (i * 0.037), 0]}
            >
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.4}
                roughness={0.5}
                opacity={0.7}
                transparent
              />
            </Box>
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <Box
              key={`v-${i}`}
              args={[0.002, 0.73, 0.008]}
              position={[-0.365 + (i * 0.037), 0, 0]}
            >
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.4}
                roughness={0.5}
                opacity={0.7}
                transparent
              />
            </Box>
          ))}
        </group>

        {/* B&W Style Titanium Dome Tweeter - 25mm - Smaller, Prominent */}
        <group position={[0, 0.25, 0.45]} ref={tweeterRef}>
          {/* Tweeter Dome - Titanium Color */}
          <mesh>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial
              color={isActive ? "#c0c0c0" : "#808080"}
              metalness={0.95}
              roughness={0.1}
              emissive={isActive ? "#ffffff" : "#000000"}
              emissiveIntensity={isActive ? 0.2 * (volume / 100) : 0}
            />
          </mesh>
          {/* Tweeter Surround */}
          <mesh position={[0, 0, 0.12]}>
            <torusGeometry args={[0.12, 0.008, 16, 32]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
          {/* Tweeter Housing */}
          <mesh position={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
            <meshStandardMaterial
              color="#0f0f0f"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <Box
                key={i}
                args={[0.003, 0.006, 0.008]}
                position={[
                  Math.cos(angle) * 0.05,
                  Math.sin(angle) * 0.05,
                  0.045,
                ]}
                rotation={[0, 0, angle]}
              >
                <meshStandardMaterial
                  color="#6366f1"
                  metalness={0.9}
                  roughness={0.1}
                />
              </Box>
            );
          })}
        </group>

        {/* B&W Continuum Woofer - 165mm (606) / 130mm (607) - Clean Design */}
        <group position={[0, -0.3, 0.45]} ref={wooferRef}>
          {/* Continuum Cone - B&W Signature Material */}
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 0.06, 32]} />
            <MeshDistortMaterial
              color={isActive ? "#2a2a2a" : "#1a1a1a"}
              distort={isActive ? 0.2 * (volume / 100) : 0.05}
              speed={isActive ? 1.2 : 0.3}
              roughness={0.7}
              metalness={0.2}
              emissive={isActive ? "#404040" : "#000000"}
              emissiveIntensity={isActive ? 0.15 * (volume / 100) : 0}
            />
          </mesh>
          {/* Suspension Ring - B&W Style */}
          <mesh position={[0, 0, 0.03]}>
            <torusGeometry args={[0.25, 0.012, 16, 32]} />
            <meshStandardMaterial
              color="#0f0f0f"
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
          {/* Woofer Center Cap - B&W Design */}
          <mesh position={[0, 0, 0.04]}>
            <cylinderGeometry args={[0.08, 0.08, 0.015, 32]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.6}
              roughness={0.4}
            />
          </mesh>
        </group>

        {/* B&W 606/607 - Two-way design, no separate mid-range */}

        {/* Power/Status LED */}
        <group position={[0.3, 0.5, 0.42]}>
          <Box args={[0.06, 0.06, 0.02]} position={[0, 0, -0.01]}>
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
          <Sphere args={[0.03, 16, 16]}>
            <meshStandardMaterial
              color={isActive ? "#00ff88" : "#333333"}
              emissive={isActive ? "#00ff88" : "#000000"}
              emissiveIntensity={isActive ? 1 : 0}
            />
          </Sphere>
        </group>

        {/* B&W Style Logo Badge - Minimalist */}
        <Box args={[0.25, 0.06, 0.01]} position={[0, 0.55, 0.42]}>
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        {/* B&W Logo Text - Small and Elegant */}
        <Text
          position={[0, 0.55, 0.425]}
          fontSize={0.025}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {side === "rear-left" ? "RL" : 
           side === "rear-right" ? "RR" :
           side === "side-left" ? "SL" :
           side === "side-right" ? "SR" :
           side === "center" ? "C" :
           side.toUpperCase()}
        </Text>
        {/* B&W Badge Edge */}
        <Box args={[0.25, 0.01, 0.01]} position={[0, 0.52, 0.425]}>
          <meshStandardMaterial
            color="#6366f1"
            metalness={0.8}
            roughness={0.2}
            emissive="#6366f1"
            emissiveIntensity={0.1}
          />
        </Box>

        {/* Input Connectors (Back) */}
        <group position={[0, -0.5, -0.41]}>
          {[-0.15, 0.15].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <Box args={[0.08, 0.04, 0.02]}>
                <meshStandardMaterial
                  color="#0a0a0a"
                  metalness={0.8}
                  roughness={0.2}
                />
              </Box>
              <Box args={[0.03, 0.02, 0.01]} position={[0, 0, 0.015]}>
                <meshStandardMaterial
                  color="#6366f1"
                  metalness={0.9}
                  roughness={0.1}
                />
              </Box>
              {[-0.02, 0.02].map((sx, si) => (
                <mesh key={si} position={[sx, 0, 0.01]}>
                  <cylinderGeometry args={[0.01, 0.01, 0.005, 16]} />
                  <meshStandardMaterial
                    color="#333333"
                    metalness={0.9}
                    roughness={0.1}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Speaker Feet - Removed when on stand */}

        {/* Cabinet Screws */}
        {[
          [-0.35, 0.5, 0.41],
          [0.35, 0.5, 0.41],
          [-0.35, -0.5, 0.41],
          [0.35, -0.5, 0.41],
        ].map(([x, y, z], i) => (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.01, 16]} />
              <meshStandardMaterial
                color="#333333"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh position={[0, 0, 0.005]}>
              <cylinderGeometry args={[0.02, 0.015, 0.003, 16]} />
              <meshStandardMaterial
                color="#1a1a1a"
                metalness={0.95}
                roughness={0.05}
              />
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
}

