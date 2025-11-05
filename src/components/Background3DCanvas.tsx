"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float, MeshDistortMaterial, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

type Particle = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
};

// Floating particles component
function Particles({ count = 50, intensity = 0.3 }: { count?: number; intensity?: number }) {
  const particlesRef = React.useRef<THREE.InstancedMesh>(null);
  const particles = React.useRef<Particle[]>([]);

  React.useEffect(() => {
    particles.current = Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      size: Math.random() * 0.3 + 0.1,
    }));
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current) return;

    particles.current.forEach((particle, i) => {
      particle.position.add(particle.velocity);
      
      // Wrap around
      if (Math.abs(particle.position.x) > 10) particle.position.x *= -1;
      if (Math.abs(particle.position.y) > 10) particle.position.y *= -1;
      if (Math.abs(particle.position.z) > 10) particle.position.z *= -1;

      const matrix = new THREE.Matrix4();
      matrix.setPosition(particle.position);
      matrix.makeScale(particle.size, particle.size, particle.size);
      particlesRef.current!.setMatrixAt(i, matrix);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={particlesRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={intensity}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

// Central orb component
function CentralOrb({ intensity = 0.3, speed = 1, color }: { intensity?: number; speed?: number; color?: string }) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const colorValue = color || "#6366f1";

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color={colorValue}
            distort={intensity * 0.5}
            speed={speed * 2}
            roughness={0.3}
            metalness={0.5}
            emissive={colorValue}
            emissiveIntensity={intensity * 0.3}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

// Background scene
function BackgroundScene({
  intensity = 0.3,
  speed = 1,
  color,
  particles = true,
}: {
  intensity?: number;
  speed?: number;
  color?: string;
  particles?: boolean;
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={color || "#6366f1"} />

      <CentralOrb intensity={intensity} speed={speed} color={color} />
      
      {particles && <Particles count={30} intensity={intensity} />}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={speed * 0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

// Main component
export default function Background3DCanvas({
  intensity = 0.3,
  speed = 1,
  color,
  particles = true,
}: {
  intensity?: number;
  speed?: number;
  color?: string;
  particles?: boolean;
}) {
  const [canRender, setCanRender] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCanRender(true);
        }, 50);
      });
    }
  }, []);

  if (!canRender || typeof window === "undefined") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/5 via-background to-accent/5" />
    );
  }

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className="w-full h-full"
    >
      <BackgroundScene intensity={intensity} speed={speed} color={color} particles={particles} />
    </Canvas>
  );
}

