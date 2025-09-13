'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

function RotatingBox() {
  const meshRef = useRef<Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function ThreeHero() {
  return (
    <div className="w-full h-64">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
