"use client";

import * as React from "react";
import { Box, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

type RoomProps = {
  isPlaying: boolean;
  showBeforeAfter?: boolean;
};

export function Room({ isPlaying, showBeforeAfter = false }: RoomProps) {
  return (
    <>
      {/* Floor with Parquet Texture */}
      <Box args={[10, 0.1, 10]} position={[0, -0.1, 0]}>
        <meshStandardMaterial
          color={showBeforeAfter ? "#1a1a1a" : "#2a2a2a"}
          roughness={0.8}
          metalness={0.1}
        />
      </Box>
      
      {/* Floor Pattern - Detailed Parquet */}
      {!showBeforeAfter && Array.from({ length: 5 }).flatMap((_, i) =>
        Array.from({ length: 5 }).map((_, j) => (
          <Box
            key={`${i}-${j}`}
            args={[1.8, 0.01, 1.8]}
            position={[-4 + i * 2, -0.05, -4 + j * 2]}
          >
            <meshStandardMaterial
              color={(i + j) % 2 === 0 ? "#2a2a2a" : "#252525"}
              roughness={0.9}
              metalness={0}
            />
          </Box>
        ))
      )}

      {/* Rug under Stereo System */}
      {!showBeforeAfter && (
        <>
          <Box args={[3, 0.02, 2.5]} position={[0, -0.04, 0]}>
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.9}
              metalness={0}
            />
          </Box>
          {/* Rug Pattern */}
          <Box args={[2.8, 0.021, 2.3]} position={[0, -0.039, 0]}>
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.8}
              metalness={0}
            />
          </Box>
        </>
      )}

      {/* Back Wall with Details - No Ceiling - Concrete/Wood Texture */}
      <Box args={[10, 3, 0.2]} position={[0, 1.5, -5]}>
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.95}
          metalness={0.05}
        />
      </Box>
      
      {/* Wall Texture Pattern - Concrete/Stone Effect */}
      {Array.from({ length: 10 }).flatMap((_, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <Box
            key={`wall-${i}-${j}`}
            args={[0.95, 0.95, 0.21]}
            position={[-4.5 + i * 1, 0.5 + j * 1, -4.9]}
          >
            <meshStandardMaterial
              color={((i + j) % 2 === 0) ? "#2a2a2a" : "#252525"}
              roughness={0.9}
              metalness={0.05}
            />
          </Box>
        ))
      )}
      
      {/* Wall Trim - Top (No Ceiling Connection) */}
      <Box args={[10, 0.1, 0.21]} position={[0, 2.95, -5]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.7}
          metalness={0.3}
        />
      </Box>
      
      {/* Wall Trim - Bottom */}
      <Box args={[10, 0.1, 0.21]} position={[0, 0.05, -5]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.7}
          metalness={0.3}
        />
      </Box>

      {/* Shelving Unit for Stereo System */}
      <group position={[0, 0.3, -4.8]}>
        {/* Main Shelf */}
        <Box args={[2.5, 0.1, 0.6]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        {/* Shelf Supports */}
        {[-1.1, 1.1].map((x, i) => (
          <Box key={i} args={[0.1, 0.3, 0.6]} position={[x, -0.15, 0]}>
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.5}
              metalness={0.3}
            />
          </Box>
        ))}
        {/* Decorative Elements */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <Box key={i} args={[0.3, 0.05, 0.3]} position={[x, 0.1, 0]}>
            <meshStandardMaterial
              color="#6366f1"
              emissive="#6366f1"
              emissiveIntensity={isPlaying ? 0.2 : 0.05}
            />
          </Box>
        ))}
      </group>

      {/* Picture Frames on Wall - Music Theme - Adjusted for Lowered Ceiling */}
      {!showBeforeAfter && (
        <group position={[-3, 2, -4.9]}>
          {/* Frame */}
          <Box args={[0.8, 0.6, 0.05]}>
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.3}
              metalness={0.5}
            />
          </Box>
          {/* Picture - Vinyl Record */}
          <Box args={[0.75, 0.55, 0.02]} position={[0, 0, 0.02]}>
            <meshStandardMaterial
              color="#0a0a0a"
              roughness={0.8}
              metalness={0}
            />
          </Box>
          {/* Record Details */}
          <mesh position={[0, 0, 0.03]}>
            <torusGeometry args={[0.2, 0.01, 16, 32]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.5}
              metalness={0.5}
            />
          </mesh>
          <mesh position={[0, 0, 0.031]}>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 32]} />
            <meshStandardMaterial
              color="#6366f1"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Glass Reflection */}
          <Box args={[0.76, 0.56, 0.01]} position={[0, 0, 0.035]}>
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.9}
              opacity={0.1}
              transparent
            />
          </Box>
        </group>
      )}

      {/* Another Picture Frame - Musical Notes - Adjusted for Lowered Ceiling */}
      {!showBeforeAfter && (
        <group position={[3, 2, -4.9]}>
          <Box args={[0.8, 0.6, 0.05]}>
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.3}
              metalness={0.5}
            />
          </Box>
          <Box args={[0.75, 0.55, 0.02]} position={[0, 0, 0.02]}>
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.8}
              metalness={0}
            />
          </Box>
          {/* Musical Note Symbol */}
          <group position={[0, 0, 0.03]}>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.05, 0.15, 0.01]} />
              <meshStandardMaterial
                color="#6366f1"
                emissive="#6366f1"
                emissiveIntensity={0.3}
              />
            </mesh>
            <mesh position={[0.05, 0.15, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color="#6366f1"
                emissive="#6366f1"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
          <Box args={[0.76, 0.56, 0.01]} position={[0, 0, 0.035]}>
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.9}
              opacity={0.1}
              transparent
            />
          </Box>
        </group>
      )}

      {/* Window - Large Window on Side Wall */}
      <group position={[-4.9, 2, 0]}>
        {/* Window Frame */}
        <Box args={[0.1, 3, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.3}
          />
        </Box>
        {/* Window Glass */}
        <Box args={[0.05, 2.8, 1.8]} position={[0.03, 0, 0]}>
          <meshStandardMaterial
            color="#aaccff"
            roughness={0.1}
            metalness={0.9}
            opacity={0.3}
            transparent
            emissive="#aaccff"
            emissiveIntensity={isPlaying ? 0.2 : 0.1}
          />
        </Box>
        {/* Window Sill */}
        <Box args={[0.2, 0.1, 2.2]} position={[0.05, -1.5, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        {/* Plants on Window Sill */}
        {[-0.8, 0, 0.8].map((z, i) => (
          <group key={i} position={[0.1, -1.4, z]}>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
              <meshStandardMaterial
                color="#8b4513"
                roughness={0.8}
                metalness={0}
              />
            </mesh>
            <Sphere args={[0.12, 16, 16]} position={[0, 0.15, 0]}>
              <meshStandardMaterial
                color="#10b981"
                roughness={0.7}
                metalness={0}
              />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Ceiling Removed - Open Space */}
      
      {/* Main Ceiling Light - Hanging from Above (No Ceiling) */}
      <group position={[0, 2.85, 0]}>
        {/* Light Cord/Chain */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
        {/* Light Fixture */}
        <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isPlaying ? "#ffffaa" : "#666666"}
            emissive={isPlaying ? "#ffffaa" : "#000000"}
            emissiveIntensity={isPlaying ? 0.5 : 0}
          />
        </Sphere>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Light Beam */}
        {isPlaying && (
          <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.5, 1.5, 32]} />
            <meshStandardMaterial
              color="#ffffaa"
              emissive="#ffffaa"
              emissiveIntensity={0.2}
              opacity={0.3}
              transparent
            />
          </mesh>
        )}
      </group>

      {/* Side Tables with Modern Design */}
      {!showBeforeAfter && (
      <>
      <group position={[-4, 0.2, -2]}>
        {/* Table Top - Glass Effect */}
        <Box args={[0.6, 0.05, 0.6]} position={[0, 0.25, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        <Box args={[0.55, 0.02, 0.55]} position={[0, 0.27, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.9}
            opacity={0.1}
            transparent
          />
        </Box>
        {/* Table Legs - Modern Tapered */}
        {[
          [-0.25, 0, -0.25],
          [0.25, 0, -0.25],
          [-0.25, 0, 0.25],
          [0.25, 0, 0.25],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <cylinderGeometry args={[0.03, 0.05, 0.5, 16]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
        ))}
        {/* Decorative Item - Crystal Sphere */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
          <Sphere args={[0.1, 16, 16]} position={[0, 0.35, 0]}>
            <meshStandardMaterial
              color="#6366f1"
              roughness={0.1}
              metalness={0.9}
              emissive="#6366f1"
              emissiveIntensity={0.2}
              opacity={0.8}
              transparent
            />
          </Sphere>
        </Float>
      </group>

      <group position={[4, 0.2, -2]}>
        <Box args={[0.6, 0.05, 0.6]} position={[0, 0.25, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        <Box args={[0.55, 0.02, 0.55]} position={[0, 0.27, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.9}
            opacity={0.1}
            transparent
          />
        </Box>
        {[
          [-0.25, 0, -0.25],
          [0.25, 0, -0.25],
          [-0.25, 0, 0.25],
          [0.25, 0, 0.25],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <cylinderGeometry args={[0.03, 0.05, 0.5, 16]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
        ))}
        {/* Plant on Table */}
        <group position={[0, 0.35, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
            <meshStandardMaterial
              color="#8b4513"
              roughness={0.8}
              metalness={0}
            />
          </mesh>
          <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.2}>
            <Sphere args={[0.15, 16, 16]} position={[0, 0.25, 0]}>
              <meshStandardMaterial
                color="#10b981"
                roughness={0.7}
                metalness={0}
              />
            </Sphere>
          </Float>
        </group>
      </group>
      </>
      )}

      {/* Premium Sofa/Seating Area - Facing the Stereo System */}
      {!showBeforeAfter && (
      <group position={[0, 0.3, 2.5]} rotation={[0, Math.PI, 0]}>
        {/* Sofa Base Frame - Main Structure */}
        <Box args={[2.6, 0.65, 1.05]} position={[0, -0.02, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.8}
            metalness={0.2}
          />
        </Box>
        {/* Sofa Base Cushion Layer */}
        <Box args={[2.5, 0.15, 1]} position={[0, 0.1, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.9}
            metalness={0}
          />
        </Box>
        
        {/* Individual Seat Cushions - Detailed */}
        {[-0.8, 0, 0.8].map((x, i) => (
          <group key={i}>
            {/* Seat Cushion Base */}
            <Box args={[0.7, 0.2, 0.95]} position={[x, 0.2, 0]}>
              <meshStandardMaterial
                color={i === 1 ? "#3a3a3a" : "#353535"}
                roughness={0.95}
                metalness={0}
              />
            </Box>
            {/* Cushion Top - Soft Surface */}
            <Box args={[0.68, 0.08, 0.93]} position={[x, 0.34, 0.02]}>
              <meshStandardMaterial
                color={i === 1 ? "#4a4a4a" : "#404040"}
                roughness={0.98}
                metalness={0}
              />
            </Box>
            {/* Cushion Stitching - Decorative Lines */}
            <Box args={[0.66, 0.01, 0.01]} position={[x, 0.28, 0.45]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.5}
                metalness={0}
              />
            </Box>
            <Box args={[0.66, 0.01, 0.01]} position={[x, 0.28, -0.45]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.5}
                metalness={0}
              />
            </Box>
            {/* Cushion Side Details */}
            <Box args={[0.01, 0.2, 0.95]} position={[x + 0.34, 0.2, 0]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.7}
                metalness={0}
              />
            </Box>
            <Box args={[0.01, 0.2, 0.95]} position={[x - 0.34, 0.2, 0]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.7}
                metalness={0}
              />
            </Box>
          </group>
        ))}
        
        {/* Sofa Back - Detailed with Armrests */}
        <Box args={[2.5, 0.85, 0.12]} position={[0, 0.45, -0.47]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.85}
            metalness={0}
          />
        </Box>
        {/* Back Cushion - Soft Layer */}
        <Box args={[2.4, 0.75, 0.1]} position={[0, 0.45, -0.44]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.9}
            metalness={0}
          />
        </Box>
        {/* Back Cushion Top Detail */}
        <Box args={[2.35, 0.08, 0.09]} position={[0, 0.8, -0.44]}>
          <meshStandardMaterial
            color="#3a3a3a"
            roughness={0.95}
            metalness={0}
          />
        </Box>
        
        {/* Armrests - Left and Right */}
        {[-1.25, 1.25].map((x, side) => (
          <group key={side}>
            {/* Armrest Base */}
            <Box args={[0.15, 0.5, 0.9]} position={[x, 0.35, 0]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.8}
                metalness={0.1}
              />
            </Box>
            {/* Armrest Top - Soft Padding */}
            <Box args={[0.14, 0.08, 0.88]} position={[x, 0.58, 0.02]}>
              <meshStandardMaterial
                color="#2a2a2a"
                roughness={0.9}
                metalness={0}
              />
            </Box>
            {/* Armrest Front Panel */}
            <Box args={[0.15, 0.5, 0.05]} position={[x, 0.35, 0.47]}>
              <meshStandardMaterial
                color="#0a0a0a"
                roughness={0.7}
                metalness={0.2}
              />
            </Box>
            {/* Armrest Corner Detail */}
            <mesh position={[x, 0.58, 0.47]}>
              <boxGeometry args={[0.14, 0.08, 0.05]} />
              <meshStandardMaterial
                color="#6366f1"
                roughness={0.3}
                metalness={0.7}
                emissive="#6366f1"
                emissiveIntensity={isPlaying ? 0.1 : 0}
              />
            </mesh>
          </group>
        ))}
        
        {/* Sofa Legs - Modern Design with Details */}
        {[
          [-1.15, -0.3, -0.45],
          [1.15, -0.3, -0.45],
          [-1.15, -0.3, 0.45],
          [1.15, -0.3, 0.45],
        ].map(([x, y, z], i) => (
          <group key={i} position={[x, y, z]}>
            {/* Leg Base */}
            <mesh>
              <cylinderGeometry args={[0.05, 0.05, 0.32, 16]} />
              <meshStandardMaterial
                color="#0a0a0a"
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
            {/* Leg Cap - Top */}
            <mesh position={[0, 0.16, 0]}>
              <cylinderGeometry args={[0.06, 0.05, 0.02, 16]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>
            {/* Leg Foot - Rubber Pad */}
            <mesh position={[0, -0.16, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.03, 16]} />
              <meshStandardMaterial
                color="#000000"
                roughness={0.95}
                metalness={0}
              />
            </mesh>
            {/* Leg Foot Spike */}
            <mesh position={[0, -0.18, 0]}>
              <coneGeometry args={[0.02, 0.05, 8]} />
              <meshStandardMaterial
                color="#333333"
                roughness={0.5}
                metalness={0.8}
              />
            </mesh>
          </group>
        ))}
        
        {/* Decorative Pillows - Back Cushions */}
        {[-0.6, 0.6].map((x, i) => (
          <group key={i} position={[x, 0.55, -0.3]}>
            <Box args={[0.4, 0.25, 0.08]}>
              <meshStandardMaterial
                color={i === 0 ? "#6366f1" : "#8b5cf6"}
                roughness={0.9}
                metalness={0}
                emissive={i === 0 ? "#6366f1" : "#8b5cf6"}
                emissiveIntensity={isPlaying ? 0.05 : 0}
              />
            </Box>
            {/* Pillow Stitching */}
            <Box args={[0.38, 0.02, 0.01]} position={[0, 0.1, 0.04]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.5}
                metalness={0}
              />
            </Box>
            <Box args={[0.38, 0.02, 0.01]} position={[0, -0.1, 0.04]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.5}
                metalness={0}
              />
            </Box>
          </group>
        ))}
        
        {/* Sofa Frame Details - Metal Accents */}
        <Box args={[2.48, 0.03, 0.03]} position={[0, 0.05, -0.48]}>
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.2}
            metalness={0.9}
            emissive="#6366f1"
            emissiveIntensity={isPlaying ? 0.15 : 0.05}
          />
        </Box>
      </group>
      )}

      {/* Premium Coffee Table - Detailed Design - Centered on Rug */}
      {!showBeforeAfter && (
      <group position={[0, 0.15, 0]} rotation={[0, Math.PI, 0]}>
        {/* Table Frame - Metal Base */}
        <Box args={[1.22, 0.08, 0.62]} position={[0, 0.18, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.4}
            metalness={0.7}
          />
        </Box>
        {/* Table Top - Wood/MDF Surface */}
        <Box args={[1.2, 0.06, 0.6]} position={[0, 0.21, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        {/* Table Top Pattern - Wood Grain Effect */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Box
            key={i}
            args={[1.18, 0.01, 0.01]}
            position={[-0.59 + (i * 0.295), 0.24, -0.29 + (i % 2) * 0.58]}
          >
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.7}
              metalness={0.1}
            />
          </Box>
        ))}
        {/* Glass Top - Tempered Glass */}
        <Box args={[1.15, 0.025, 0.55]} position={[0, 0.25, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.05}
            metalness={0.95}
            opacity={0.15}
            transparent
          />
        </Box>
        {/* Glass Reflection Edge */}
        <Box args={[1.16, 0.01, 0.01]} position={[0, 0.255, 0.28]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.9}
            opacity={0.3}
            transparent
          />
        </Box>
        <Box args={[1.16, 0.01, 0.01]} position={[0, 0.255, -0.28]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.9}
            opacity={0.3}
            transparent
          />
        </Box>
        
        {/* Table Base - Modern Design */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 0.38, 16]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
        {/* Base Top Ring */}
        <mesh position={[0, 0.19, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.3}
            metalness={0.8}
            emissive="#6366f1"
            emissiveIntensity={isPlaying ? 0.1 : 0.02}
          />
        </mesh>
        {/* Base Bottom Ring */}
        <mesh position={[0, -0.19, 0]}>
          <torusGeometry args={[0.18, 0.025, 16, 32]} />
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        {/* Base Feet */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const x = Math.cos(angle) * 0.15;
          const z = Math.sin(angle) * 0.15;
          return (
            <group key={i} position={[x, -0.19, z]}>
              <mesh rotation={[0, angle, 0]}>
                <boxGeometry args={[0.05, 0.05, 0.08]} />
                <meshStandardMaterial
                  color="#0a0a0a"
                  roughness={0.5}
                  metalness={0.7}
                />
              </mesh>
              {/* Rubber Pad */}
              <mesh position={[0, -0.025, 0]}>
                <boxGeometry args={[0.06, 0.01, 0.09]} />
                <meshStandardMaterial
                  color="#000000"
                  roughness={0.95}
                  metalness={0}
                />
              </mesh>
            </group>
          );
        })}
        
        {/* Decorative Items on Table - Enhanced */}
        {/* Magazines/Books Stack */}
        <group position={[-0.4, 0.26, 0]}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              args={[0.12, 0.02, 0.18]}
              position={[0, i * 0.025, 0]}
              rotation={[0, Math.PI / 8, 0]}
            >
              <meshStandardMaterial
                color={["#6366f1", "#8b5cf6", "#10b981"][i]}
                roughness={0.7}
                metalness={0.1}
              />
            </Box>
          ))}
        </group>
        
        {/* Decorative Sphere */}
        <group position={[-0.3, 0.26, 0]}>
          <Sphere args={[0.09, 16, 16]}>
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={isPlaying ? 0.3 : 0.1}
              roughness={0.3}
              metalness={0.7}
            />
          </Sphere>
          {/* Sphere Stand */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.5}
              metalness={0.6}
            />
          </mesh>
        </group>
        
        {/* Remote Control */}
        <group position={[0.3, 0.26, 0]}>
          <Box args={[0.18, 0.02, 0.06]}>
            <meshStandardMaterial
              color="#0a0a0a"
              roughness={0.2}
              metalness={0.9}
            />
          </Box>
          {/* Remote Screen */}
          <Box args={[0.14, 0.015, 0.04]} position={[0, 0.015, 0]}>
            <meshStandardMaterial
              color={isPlaying ? "#00aaff" : "#333333"}
              emissive={isPlaying ? "#00aaff" : "#000000"}
              emissiveIntensity={isPlaying ? 0.5 : 0}
            />
          </Box>
          {/* Remote Buttons */}
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              args={[0.03, 0.01, 0.01]}
              position={[-0.05 + i * 0.05, 0.015, 0.025]}
            >
              <meshStandardMaterial
                color="#6366f1"
                roughness={0.3}
                metalness={0.8}
              />
            </Box>
          ))}
        </group>
        
        {/* Plant in Vase */}
        <group position={[0.4, 0.26, 0]}>
          {/* Vase */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 0.08, 16]} />
            <meshStandardMaterial
              color="#6366f1"
              roughness={0.3}
              metalness={0.7}
              emissive="#6366f1"
              emissiveIntensity={0.1}
            />
          </mesh>
          {/* Plant Stem */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
            <meshStandardMaterial
              color="#10b981"
              roughness={0.8}
              metalness={0}
            />
          </mesh>
          {/* Plant Leaves */}
          {[0, 1, 2].map((i) => {
            const angle = (i / 3) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 0.03, 0.1, Math.sin(angle) * 0.03]}
                rotation={[0, angle, 0.3]}
              >
                <boxGeometry args={[0.04, 0.06, 0.02]} />
                <meshStandardMaterial
                  color="#10b981"
                  roughness={0.7}
                  metalness={0}
                />
              </mesh>
            );
          })}
        </group>
      </group>
      )}

      {/* Premium Bookshelf - Detailed Design */}
      {!showBeforeAfter && (
      <group position={[4.5, 1.5, -2]}>
        {/* Shelf Structure - Side Panels */}
        <Box args={[0.16, 2.6, 0.82]} position={[-0.32, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.7}
            metalness={0.3}
          />
        </Box>
        <Box args={[0.16, 2.6, 0.82]} position={[0.32, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.7}
            metalness={0.3}
          />
        </Box>
        {/* Back Panel */}
        <Box args={[0.64, 2.6, 0.02]} position={[0, 0, -0.4]}>
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.8}
            metalness={0.2}
          />
        </Box>
        {/* Top Panel */}
        <Box args={[0.64, 0.05, 0.82]} position={[0, 1.275, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        {/* Bottom Panel */}
        <Box args={[0.64, 0.05, 0.82]} position={[0, -1.275, 0]}>
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.6}
            metalness={0.2}
          />
        </Box>
        
        {/* Shelves - Detailed with Supports */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <group key={i}>
            {/* Shelf Board */}
            <Box args={[0.6, 0.06, 0.8]} position={[0, y, 0]}>
              <meshStandardMaterial
                color="#2a2a2a"
                roughness={0.65}
                metalness={0.2}
              />
            </Box>
            {/* Shelf Front Edge */}
            <Box args={[0.6, 0.06, 0.02]} position={[0, y, 0.41]}>
              <meshStandardMaterial
                color="#6366f1"
                roughness={0.3}
                metalness={0.8}
                emissive="#6366f1"
                emissiveIntensity={isPlaying ? 0.1 : 0.02}
              />
            </Box>
            {/* Shelf Supports */}
            {[-0.28, 0.28].map((x, j) => (
              <group key={j} position={[x, y, 0.35]}>
                <Box args={[0.02, 0.04, 0.1]}>
                  <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.5}
                    metalness={0.5}
                  />
                </Box>
              </group>
            ))}
          </group>
        ))}
        
        {/* Books - Detailed with Spines */}
        {[-0.8, 0, 0.8].flatMap((y, shelfIndex) =>
          Array.from({ length: 5 }).map((_, bookIndex) => {
            const bookColors = [
              "#6366f1", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"
            ];
            const bookWidth = 0.09;
            const bookHeight = 0.32;
            const bookDepth = 0.16;
            const startX = -0.22;
            const spacing = 0.11;
            
            return (
              <group
                key={`${shelfIndex}-${bookIndex}`}
                position={[
                  startX + (bookIndex * spacing),
                  y + 0.16,
                  0.32,
                ]}
              >
                {/* Book Body */}
                <Box args={[bookWidth, bookHeight, bookDepth]}>
                  <meshStandardMaterial
                    color={bookColors[bookIndex]}
                    roughness={0.7}
                    metalness={0.1}
                  />
                </Box>
                {/* Book Spine - Title Area */}
                <Box args={[bookWidth, bookHeight, 0.02]} position={[0, 0, -0.08]}>
                  <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.8}
                    metalness={0}
                  />
                </Box>
                {/* Book Pages Edge */}
                <Box args={[bookWidth, bookHeight, 0.01]} position={[0, 0, 0.08]}>
                  <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.9}
                    metalness={0}
                  />
                </Box>
                {/* Book Top Edge */}
                <Box args={[bookWidth, 0.01, bookDepth]} position={[0, 0.16, 0]}>
                  <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.9}
                    metalness={0}
                  />
                </Box>
              </group>
            );
          })
        )}
        
        {/* Decorative Items on Top Shelf */}
        <group position={[0, 1.1, 0.2]}>
          {/* Small Plant */}
          <mesh position={[-0.2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} />
            <meshStandardMaterial
              color="#8b4513"
              roughness={0.8}
              metalness={0}
            />
          </mesh>
          <Sphere args={[0.08, 8, 8]} position={[-0.2, 0.05, 0]}>
            <meshStandardMaterial
              color="#10b981"
              roughness={0.7}
              metalness={0}
            />
          </Sphere>
          
          {/* Decorative Frame */}
          <Box args={[0.15, 0.2, 0.02]} position={[0.2, 0, 0]}>
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.4}
              metalness={0.5}
            />
          </Box>
          <Box args={[0.13, 0.18, 0.01]} position={[0.2, 0, 0.01]}>
            <meshStandardMaterial
              color="#6366f1"
              roughness={0.3}
              metalness={0.7}
              emissive="#6366f1"
              emissiveIntensity={isPlaying ? 0.2 : 0.05}
            />
          </Box>
        </group>
        
        {/* Shelf Lighting - LED Strip */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <Box
            key={`light-${i}`}
            args={[0.58, 0.01, 0.01]}
            position={[0, y, 0.42]}
          >
            <meshStandardMaterial
              color="#6366f1"
              emissive="#6366f1"
              emissiveIntensity={isPlaying ? 0.3 : 0.05}
              roughness={0.1}
              metalness={0.9}
            />
          </Box>
        ))}
      </group>
      )}

      {/* Premium Large Plant - Detailed Design */}
      {!showBeforeAfter && (
      <group position={[-4.5, 0.8, 0]}>
        {/* Pot - Terracotta Style */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.27, 0.32, 16]} />
          <meshStandardMaterial
            color="#8b4513"
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
        {/* Pot Rim */}
        <mesh position={[0, 0.16, 0]}>
          <torusGeometry args={[0.22, 0.02, 16, 32]} />
          <meshStandardMaterial
            color="#6b3410"
            roughness={0.8}
            metalness={0.15}
          />
        </mesh>
        {/* Pot Base */}
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
          <meshStandardMaterial
            color="#6b3410"
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
        {/* Pot Drainage Holes */}
        {[0, 1, 2].map((i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.15, -0.14, Math.sin(angle) * 0.15]}
            >
              <cylinderGeometry args={[0.01, 0.01, 0.02, 8]} />
              <meshStandardMaterial
                color="#0a0a0a"
                roughness={0.9}
                metalness={0}
              />
            </mesh>
          );
        })}
        
        {/* Soil */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial
            color="#3a2a1a"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
        
        {/* Main Stem */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.4, 8]} />
          <meshStandardMaterial
            color="#8b4513"
            roughness={0.8}
            metalness={0}
          />
        </mesh>
        
        {/* Plant Leaves - Detailed with Veins */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 0.35;
          const height = 0.5 + Math.sin(i) * 0.15;
          const leafSize = 0.12 + (i % 3) * 0.015;
          
          return (
            <Float key={i} speed={0.2 + i * 0.05} rotationIntensity={0.15} floatIntensity={0.08}>
              <group
                position={[
                  Math.cos(angle) * radius * 0.7,
                  height,
                  Math.sin(angle) * radius * 0.7,
                ]}
                rotation={[Math.cos(angle) * 0.4, angle, Math.sin(angle) * 0.2]}
              >
                {/* Leaf Main */}
                <mesh>
                  <boxGeometry args={[leafSize, leafSize * 1.5, 0.03]} />
                  <meshStandardMaterial
                    color="#10b981"
                    roughness={0.75}
                    metalness={0}
                  />
                </mesh>
                {/* Leaf Veins */}
                <mesh position={[0, 0.05, 0.015]}>
                  <boxGeometry args={[leafSize * 0.8, 0.01, 0.01]} />
                  <meshStandardMaterial
                    color="#0a7c3a"
                    roughness={0.7}
                    metalness={0}
                  />
                </mesh>
                <mesh position={[0, -0.05, 0.015]}>
                  <boxGeometry args={[leafSize * 0.6, 0.01, 0.01]} />
                  <meshStandardMaterial
                    color="#0a7c3a"
                    roughness={0.7}
                    metalness={0}
                  />
                </mesh>
                {/* Leaf Stem */}
                <mesh position={[0, -leafSize * 0.75, 0]}>
                  <cylinderGeometry args={[0.005, 0.005, 0.05, 8]} />
                  <meshStandardMaterial
                    color="#10b981"
                    roughness={0.8}
                    metalness={0}
                  />
                </mesh>
              </group>
            </Float>
          );
        })}
        
        {/* Moss on Pot */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.21,
                0.05 + Math.sin(i) * 0.05,
                Math.sin(angle) * 0.21,
              ]}
            >
              <boxGeometry args={[0.03, 0.02, 0.03]} />
              <meshStandardMaterial
                color="#2d5016"
                roughness={0.9}
                metalness={0}
              />
            </mesh>
          );
        })}
      </group>
      )}

      {/* Corner Lamp - Modern Design */}
      {!showBeforeAfter && (
        <>
          <group position={[-4.5, 1.5, -4.5]}>
            {/* Lamp Base */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
              <meshStandardMaterial
                color="#2a2a2a"
                roughness={0.5}
                metalness={0.5}
              />
            </mesh>
            {/* Lamp Shade */}
            <mesh position={[0, 0.7, 0]}>
              <coneGeometry args={[0.2, 0.3, 16]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.8}
                metalness={0.2}
                opacity={0.7}
                transparent
              />
            </mesh>
            {/* Light */}
            <Sphere args={[0.15, 16, 16]} position={[0, 0.6, 0]}>
              <meshStandardMaterial
                color={isPlaying ? "#ffffaa" : "#666666"}
                emissive={isPlaying ? "#ffffaa" : "#000000"}
                emissiveIntensity={isPlaying ? 0.3 : 0}
                opacity={0.8}
                transparent
              />
            </Sphere>
          </group>

          <group position={[4.5, 1.5, -4.5]}>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.6, 16]} />
              <meshStandardMaterial
                color="#2a2a2a"
                roughness={0.5}
                metalness={0.5}
              />
            </mesh>
            <mesh position={[0, 0.7, 0]}>
              <coneGeometry args={[0.2, 0.3, 16]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.8}
                metalness={0.2}
                opacity={0.7}
                transparent
              />
            </mesh>
            <Sphere args={[0.15, 16, 16]} position={[0, 0.6, 0]}>
              <meshStandardMaterial
                color={isPlaying ? "#ffffaa" : "#666666"}
                emissive={isPlaying ? "#ffffaa" : "#000000"}
                emissiveIntensity={isPlaying ? 0.3 : 0}
                opacity={0.8}
                transparent
              />
            </Sphere>
          </group>
        </>
      )}

      {/* Ambient Lighting - Enhanced - Adjusted for Lowered Ceiling */}
      <ambientLight intensity={isPlaying ? 0.5 : 0.4} />
      
      {/* Main Spotlight on Stereo - Adjusted for Lowered Ceiling */}
      <spotLight
        position={[0, 2.5, 2]}
        angle={0.4}
        penumbra={1}
        intensity={isPlaying ? 1.5 : 0.8}
        color="#ffffaa"
        target-position={[0, 0.5, -4.8]}
      />
      
      {/* Window Light */}
      <spotLight
        position={[-4.5, 2, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.8}
        color="#aaccff"
      />
      
      {/* Accent Lights - Adjusted for Lowered Ceiling */}
      <pointLight position={[0, 2, 2]} intensity={isPlaying ? 1.2 : 0.8} color="#6366f1" />
      <pointLight position={[-3, 1.5, 2]} intensity={isPlaying ? 0.8 : 0.5} color="#8b5cf6" />
      <pointLight position={[3, 1.5, 2]} intensity={isPlaying ? 0.8 : 0.5} color="#8b5cf6" />
      <pointLight position={[-4.5, 1.5, -4.5]} intensity={isPlaying ? 0.5 : 0.3} color="#ffffaa" />
      <pointLight position={[4.5, 1.5, -4.5]} intensity={isPlaying ? 0.5 : 0.3} color="#ffffaa" />
    </>
  );
}
