"use client";

import * as React from "react";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Room } from "./Room";
import { StereoSystem } from "./StereoSystem";
import { Speaker } from "./Speaker";
import { Subwoofer } from "./Subwoofer";
import { InternalComponents } from "./InternalComponents";
import { RoomLayout } from "./RoomLayout";
import { Cables } from "./Cables";
import { SpeakerStand } from "./SpeakerStand";
import * as THREE from "three";

// Import THREE for sound waves

type StereoRoomSceneProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  mode: "stereo" | "mono" | "surround";
  showXRay: boolean;
  vuMeter: number[];
  stereoPosition: [number, number, number];
  speakerLeftPos: [number, number, number];
  speakerRightPos: [number, number, number];
  showAcousticGuide: boolean;
  showBeforeAfter: boolean;
};

export function StereoRoomScene({
  isPlaying,
  onTogglePlay,
  volume,
  mode,
  showXRay,
  vuMeter,
  stereoPosition,
  speakerLeftPos,
  speakerRightPos,
  showAcousticGuide,
  showBeforeAfter,
}: StereoRoomSceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
      <Environment preset="apartment" />

      <Room isPlaying={isPlaying} showBeforeAfter={showBeforeAfter} />

      {/* Acoustic Layout Guide */}
      <RoomLayout
        isPlaying={isPlaying}
        stereoPosition={stereoPosition}
        speakerLeftPos={speakerLeftPos}
        speakerRightPos={speakerRightPos}
        showAcousticGuide={showAcousticGuide}
        mode={mode}
      />

      {/* Stereo System */}
      <group
        position={stereoPosition}
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlay();
        }}
      >
        <StereoSystem isPlaying={isPlaying} volume={volume} showXRay={showXRay} />
        <InternalComponents showXRay={showXRay} isPlaying={isPlaying} volume={volume} />
      </group>

      {/* Cables - Organized and Connected */}
      <Cables
        stereoPosition={stereoPosition}
        speakerLeftPos={speakerLeftPos}
        speakerRightPos={speakerRightPos}
        mode={mode}
      />

      {/* Speakers - Dynamic based on mode */}
      <>
        <SpeakerStand position={[speakerLeftPos[0], 0.6, speakerLeftPos[2]]} height={0.6} width={0.22} depth={0.22} />
        <Speaker
          position={speakerLeftPos}
          side="left"
          isPlaying={isPlaying}
          volume={volume}
          mode={mode}
        />
        <SpeakerStand position={[speakerRightPos[0], 0.6, speakerRightPos[2]]} height={0.6} width={0.22} depth={0.22} />
        <Speaker
          position={speakerRightPos}
          side="right"
          isPlaying={isPlaying}
          volume={volume}
          mode={mode}
        />
      </>

      {/* Audio Visualization Particles - Enhanced */}
      {isPlaying && (
        <group>
          {Array.from({ length: 50 }).map((_, i) => {
            const angle = (i / 50) * Math.PI * 2;
            const radius = 2 + Math.sin(Date.now() * 0.01 + i) * 0.5;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = 1 + Math.sin(Date.now() * 0.02 + i) * 0.3;
            
            return (
              <mesh key={i} position={[x, y, z]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial
                  color="#6366f1"
                  emissive="#6366f1"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            );
          })}
        </group>
      )}


      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

