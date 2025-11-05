"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Sphere, Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";

type RoomLayoutProps = {
  isPlaying: boolean;
  stereoPosition: [number, number, number];
  speakerLeftPos: [number, number, number];
  speakerRightPos: [number, number, number];
  showAcousticGuide: boolean;
  mode?: "stereo" | "mono" | "surround" | "5.1" | "7.1";
};

export function RoomLayout({
  isPlaying,
  stereoPosition,
  speakerLeftPos,
  speakerRightPos,
  showAcousticGuide,
  mode = "stereo",
}: RoomLayoutProps) {
  // Calculate optimal listening position (sweet spot)
  const listeningPosition = React.useMemo(() => {
    const centerX = (speakerLeftPos[0] + speakerRightPos[0]) / 2;
    const centerZ = (speakerLeftPos[2] + speakerRightPos[2]) / 2;
    const distance = Math.abs(speakerRightPos[0] - speakerLeftPos[0]) * 1.2; // 1.2x speaker distance
    return [centerX, 1.2, centerZ + distance] as [number, number, number];
  }, [speakerLeftPos, speakerRightPos]);

  // Sound wave visualization
  const waveRef = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (waveRef.current && isPlaying) {
      waveRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      {/* Optimal Listening Position Indicator */}
      {showAcousticGuide && (
        <group position={listeningPosition}>
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial
                color="#6366f1"
                emissive="#6366f1"
                emissiveIntensity={0.5}
                transparent
                opacity={0.6}
              />
            </Sphere>
            <Html position={[0, 0.3, 0]} center>
              <div className="bg-background/95 backdrop-blur-sm border border-primary rounded-lg px-3 py-2 shadow-lg">
                <p className="text-xs font-medium text-primary whitespace-nowrap">
                  Optimal Listening Position
                </p>
              </div>
            </Html>
          </Float>
        </group>
      )}

      {/* Sound Wave Visualization - Shows optimal placement */}
      {isPlaying && showAcousticGuide && (
        <group ref={waveRef} position={[stereoPosition[0], stereoPosition[1], stereoPosition[2]]}>
          {Array.from({ length: 8 }).map((_, i) => {
            const radius = 0.5 + i * 0.3;
            return (
              <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
                <meshStandardMaterial
                  color="#6366f1"
                  emissive="#6366f1"
                  emissiveIntensity={0.3 - i * 0.03}
                  transparent
                  opacity={0.2 - i * 0.02}
                  side={THREE.DoubleSide}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Acoustic Guide Lines - Triangle Formation */}
      {showAcousticGuide && (
        <>
          {/* Line from left speaker to listening position */}
          <Line
            points={[
              [speakerLeftPos[0], speakerLeftPos[1], speakerLeftPos[2]],
              [listeningPosition[0], listeningPosition[1], listeningPosition[2]],
            ]}
            color="#6366f1"
            opacity={0.3}
            transparent
            lineWidth={2}
          />
          {/* Line from right speaker to listening position */}
          <Line
            points={[
              [speakerRightPos[0], speakerRightPos[1], speakerRightPos[2]],
              [listeningPosition[0], listeningPosition[1], listeningPosition[2]],
            ]}
            color="#6366f1"
            opacity={0.3}
            transparent
            lineWidth={2}
          />
          {/* Line between speakers */}
          <Line
            points={[
              [speakerLeftPos[0], speakerLeftPos[1], speakerLeftPos[2]],
              [speakerRightPos[0], speakerRightPos[1], speakerRightPos[2]],
            ]}
            color="#8b5cf6"
            opacity={0.3}
            transparent
            lineWidth={2}
          />
        </>
      )}
    </>
  );
}

