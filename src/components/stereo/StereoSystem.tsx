"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Box, Sphere, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";

type StereoSystemProps = {
  isPlaying: boolean;
  volume: number;
  showXRay: boolean;
};

export function StereoSystem({ isPlaying, volume, showXRay }: StereoSystemProps) {
  const systemRef = React.useRef<THREE.Group>(null);
  const [trackInfo, setTrackInfo] = React.useState({ time: "02:34", track: "Track 01" });

  useFrame((state) => {
    // Removed auto-rotation - system stays static by default
    // if (systemRef.current && isPlaying) {
    //   systemRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    // }
    
    // Update track time
    if (isPlaying) {
      const minutes = Math.floor(state.clock.elapsedTime / 60) % 60;
      const seconds = Math.floor(state.clock.elapsedTime) % 60;
      setTrackInfo({
        time: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
        track: "Track 01",
      });
    }
  });

  return (
    <group ref={systemRef} position={[0, 0.5, 0]}>
      {/* Main Unit Cabinet - Enhanced */}
      <Html position={[0, 1, 0]} center transform occlude>
        <div
          className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg pointer-events-none"
          style={{
            transform: "translateZ(20px)",
            opacity: showXRay ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <p className="text-xs font-medium text-foreground whitespace-nowrap">
            Stereo Amplifier System
          </p>
        </div>
      </Html>
      <Box args={[2, 0.8, 0.6]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1a1a1a"
          distort={0}
          roughness={0.3}
          metalness={0.8}
          emissive="#6366f1"
          emissiveIntensity={isPlaying ? 0.3 * (volume / 100) : 0.1}
        />
      </Box>

      {/* Top Panel with Detailed Vents */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.05, 0.55]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {Array.from({ length: 15 }).map((_, i) => (
        <Box
          key={i}
          args={[1.5 / 15, 0.02, 0.5]}
          position={[-0.75 + (i + 0.5) * (1.5 / 15), 0.4, 0]}
        >
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.3}
            metalness={0.7}
          />
        </Box>
      ))}

      {/* Front Panel with Bezel */}
      <Box args={[1.9, 0.7, 0.01]} position={[0, 0, 0.31]}>
        <meshStandardMaterial
          color="#0f0f0f"
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {/* Bezel Detail - Chrome Finish */}
      <Box args={[1.95, 0.75, 0.015]} position={[0, 0, 0.305]}>
        <meshStandardMaterial
          color="#333333"
          roughness={0.1}
          metalness={0.95}
        />
      </Box>
      
      {/* LCD Display Screen with Frame */}
      <Box args={[1.1, 0.35, 0.02]} position={[0, 0.15, 0.32]}>
        <meshStandardMaterial
          color={isPlaying ? "#001122" : "#000011"}
          emissive={isPlaying ? "#00aaff" : "#000000"}
          emissiveIntensity={isPlaying ? 0.6 : 0}
        />
      </Box>

      {/* Display Frame Inner */}
      <Box args={[1.05, 0.3, 0.021]} position={[0, 0.15, 0.325]}>
        <meshStandardMaterial
          color="#000000"
          roughness={0.1}
          metalness={0.9}
        />
      </Box>

      {/* Display Text - HTML Overlay */}
      {isPlaying && (
        <Html position={[0, 0.15, 0.33]} center transform occlude>
          <div style={{
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#00aaff",
            textShadow: "0 0 10px #00aaff",
            background: "rgba(0, 17, 34, 0.8)",
            padding: "4px 8px",
            borderRadius: "2px",
            whiteSpace: "nowrap",
          }}>
            {trackInfo.track} | {trackInfo.time}
          </div>
        </Html>
      )}

      {/* Display Indicators */}
      <group position={[0, 0.15, 0.33]}>
        {["BASS", "TREBLE"].map((label, i) => (
          <Text
            key={label}
            position={[-0.4 + i * 0.8, -0.1, 0]}
            fontSize={0.03}
            color="#00aaff"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        ))}
      </group>

      {/* Volume Knob (Left) - Detailed */}
      <group position={[-0.7, -0.15, 0.32]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 32]} />
          <meshStandardMaterial
            color="#6366f1"
            metalness={0.9}
            roughness={0.1}
            emissive="#6366f1"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Box args={[0.02, 0.05, 0.01]} position={[0.07, 0.02, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Box>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 0.07;
          return (
            <Box
              key={i}
              args={[0.01, 0.03, 0.01]}
              position={[Math.cos(angle) * radius, 0.02, Math.sin(angle) * radius]}
              rotation={[0, 0, angle]}
            >
              <meshStandardMaterial
                color="#2a2a2a"
                metalness={0.7}
                roughness={0.3}
              />
            </Box>
          );
        })}
      </group>

      {/* Power/Tone Knob (Right) - Detailed */}
      <group position={[0.7, -0.15, 0.32]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.03, 32]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.9}
            roughness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Box args={[0.02, 0.05, 0.01]} position={[0.07, 0.02, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Box>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 0.07;
          return (
            <Box
              key={i}
              args={[0.01, 0.03, 0.01]}
              position={[Math.cos(angle) * radius, 0.02, Math.sin(angle) * radius]}
              rotation={[0, 0, angle]}
            >
              <meshStandardMaterial
                color="#2a2a2a"
                metalness={0.7}
                roughness={0.3}
              />
            </Box>
          );
        })}
      </group>

      {/* Control Buttons - Enhanced with Labels */}
      {[
        { x: -0.4, label: "BASS", color: "#10b981", icon: "🔊" },
        { x: -0.2, label: "TREB", color: "#3b82f6", icon: "🎵" },
        { x: 0.2, label: "BAL", color: "#f59e0b", icon: "⚖️" },
        { x: 0.4, label: "MODE", color: "#ef4444", icon: "🔄" },
      ].map((btn, i) => (
        <group key={i} position={[btn.x, -0.3, 0.32]}>
          <Box args={[0.15, 0.08, 0.02]}>
            <meshStandardMaterial
              color={btn.color}
              metalness={0.7}
              roughness={0.3}
              emissive={btn.color}
              emissiveIntensity={isPlaying ? 0.3 : 0.1}
            />
          </Box>
          <Text
            position={[0, 0, 0.015]}
            fontSize={0.025}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {btn.label}
          </Text>
        </group>
      ))}

      {/* Power Indicator LED with Housing */}
      <group position={[-0.85, 0.3, 0.32]}>
        <Box args={[0.05, 0.05, 0.02]} position={[0, 0, -0.01]}>
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        <Sphere args={[0.02, 16, 16]}>
          <meshStandardMaterial
            color={isPlaying ? "#00ff88" : "#333333"}
            emissive={isPlaying ? "#00ff88" : "#000000"}
            emissiveIntensity={isPlaying ? 2 : 0}
          />
        </Sphere>
      </group>

      {/* Frequency Visualization Bars - Enhanced */}
      {isPlaying && (
        <group position={[0, 0.6, 0]}>
          {Array.from({ length: 20 }).map((_, i) => {
            const time = Date.now() * 0.01;
            const height = 0.1 + Math.sin(time + i * 0.5) * 0.15 + Math.cos(time * 2 + i) * 0.1;
            const color = new THREE.Color().setHSL((i / 20) * 0.3 + 0.5, 1, 0.5);
            return (
              <group key={i} position={[(i - 10) * 0.08, 0, 0]}>
                <Box
                  args={[0.04, height, 0.04]}
                  position={[0, height / 2, 0]}
                >
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                  />
                </Box>
                <Box args={[0.06, 0.02, 0.06]} position={[0, 0, 0]}>
                  <meshStandardMaterial
                    color="#2a2a2a"
                    metalness={0.5}
                    roughness={0.4}
                  />
                </Box>
                <Box args={[0.05, 0.01, 0.05]} position={[0, height, 0]}>
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                  />
                </Box>
              </group>
            );
          })}
        </group>
      )}

      {/* Side Panels with Screws */}
      <Box args={[0.02, 0.7, 0.55]} position={[-1.01, 0, 0]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.2}
          metalness={0.9}
        />
      </Box>
      <Box args={[0.02, 0.7, 0.55]} position={[1.01, 0, 0]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.2}
          metalness={0.9}
        />
      </Box>

      {/* Screws on Side Panels */}
      {[[-1.01, 1.01]].flatMap(x => 
        [-0.3, 0, 0.3].map(y => (
          <group key={`${x}-${y}`} position={[x, y, 0.28]}>
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
        ))
      )}

      {/* Feet with Rubber Pads */}
      {[-0.8, 0.8].map((x, i) => (
        <group key={i} position={[x, -0.42, 0]}>
          <Box args={[0.1, 0.05, 0.1]}>
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.5}
              metalness={0.3}
            />
          </Box>
          <Box args={[0.08, 0.01, 0.08]} position={[0, -0.03, 0]}>
            <meshStandardMaterial
              color="#0a0a0a"
              roughness={0.9}
              metalness={0}
            />
          </Box>
        </group>
      ))}

      {/* Input/Output Ports - Detailed */}
      <group position={[0, -0.3, -0.31]}>
        {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <Box args={[0.06, 0.04, 0.02]}>
              <meshStandardMaterial
                color="#0a0a0a"
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
            <Box args={[0.02, 0.02, 0.01]} position={[0, 0, 0.015]}>
              <meshStandardMaterial
                color="#6366f1"
                metalness={0.9}
                roughness={0.1}
                emissive="#6366f1"
                emissiveIntensity={0.1}
              />
            </Box>
            <Text
              position={[0, -0.04, 0]}
              fontSize={0.02}
              color="#666666"
              anchorX="center"
              anchorY="top"
            >
              {i < 3 ? "IN" : "OUT"}
            </Text>
          </group>
        ))}
      </group>

      {/* CD/DVD Slot - Detailed */}
      <group position={[0, 0.35, 0.32]}>
        <Box args={[0.3, 0.05, 0.02]}>
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
        <Box args={[0.28, 0.03, 0.021]} position={[0, 0, 0.01]}>
          <meshStandardMaterial
            color="#000000"
            roughness={1}
            metalness={0}
          />
        </Box>
        <Box args={[0.04, 0.02, 0.01]} position={[0.14, 0, 0.015]}>
          <meshStandardMaterial
            color="#6366f1"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      </group>

      {/* Cable Connections - Back Panel */}
      <group position={[0, 0, -0.31]}>
        {/* USB Ports */}
        <group position={[-0.5, 0.2, 0]}>
          <Box args={[0.08, 0.04, 0.02]}>
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          <Html position={[0, -0.06, 0]} center transform occlude>
            <div className="bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 shadow-lg pointer-events-none">
              <p className="text-[8px] font-medium text-foreground whitespace-nowrap">USB</p>
            </div>
          </Html>
        </group>

        {/* HDMI Port */}
        <group position={[-0.3, 0.2, 0]}>
          <Box args={[0.12, 0.04, 0.02]}>
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
          <Html position={[0, -0.06, 0]} center transform occlude>
            <div className="bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 shadow-lg pointer-events-none">
              <p className="text-[8px] font-medium text-foreground whitespace-nowrap">HDMI</p>
            </div>
          </Html>
        </group>

        {/* Bluetooth Indicator */}
        <group position={[0.3, 0.2, 0]}>
          <Sphere args={[0.02, 16, 16]}>
            <meshStandardMaterial
              color={isPlaying ? "#6366f1" : "#333333"}
              emissive={isPlaying ? "#6366f1" : "#000000"}
              emissiveIntensity={isPlaying ? 1 : 0}
            />
          </Sphere>
          <Html position={[0, -0.06, 0]} center transform occlude>
            <div className="bg-background/95 backdrop-blur-sm border border-border rounded px-2 py-1 shadow-lg pointer-events-none">
              <p className="text-[8px] font-medium text-foreground whitespace-nowrap">BT</p>
            </div>
          </Html>
        </group>

        {/* Audio Cables - Visual representation */}
        {[-0.15, 0.15].map((x, i) => (
          <group key={i} position={[x, -0.2, 0]}>
            {/* Cable Port */}
            <Box args={[0.06, 0.04, 0.02]}>
              <meshStandardMaterial
                color="#0a0a0a"
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
            {/* Cable */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.8}
                metalness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

