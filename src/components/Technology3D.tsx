"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Box, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/data/skills";

type Technology3DProps = {
  skill: typeof skills[0];
  position: [number, number, number];
  isActive: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
};

// Technology badge component
function TechnologyBadge({ skill, position, isActive, onHover, onClick }: Technology3DProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + skill.name.length) * 0.1;
      if (hovered || isActive) {
        meshRef.current.rotation.y += 0.01;
      }
    }
  });

  const scale = isActive ? 1.2 : hovered ? 1.1 : 1;
  const color = isActive ? "#6366f1" : hovered ? "#8b5cf6" : "#64748b";

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(true);
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setHovered(false);
            onHover(false);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          scale={scale}
        >
          <Box args={[1.2, 0.4, 0.1]}>
            <MeshDistortMaterial
              color={color}
              distort={hovered || isActive ? 0.2 : 0.05}
              speed={1.5}
              roughness={0.3}
              metalness={0.5}
              emissive={color}
              emissiveIntensity={hovered || isActive ? 0.3 : 0.1}
            />
          </Box>
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.0}
        >
          {skill.name}
        </Text>
      </Float>
    </group>
  );
}

export default TechnologyBadge;

