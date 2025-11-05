"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { StereoRoomScene } from "./stereo/StereoRoomScene";

type StereoRoom3DProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  mode: "stereo" | "mono" | "surround" | "5.1" | "7.1";
  showXRay: boolean;
  vuMeter: number[];
  stereoPosition: [number, number, number];
  speakerLeftPos: [number, number, number];
  speakerRightPos: [number, number, number];
  showAcousticGuide: boolean;
  showBeforeAfter: boolean;
};

export default function StereoRoom3D({
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
}: StereoRoom3DProps) {
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
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-xs text-muted-foreground">Initializing stereo room...</p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      className="cursor-grab active:cursor-grabbing"
    >
      <StereoRoomScene
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        volume={volume}
        mode={mode}
        showXRay={showXRay}
        vuMeter={vuMeter}
        stereoPosition={stereoPosition}
        speakerLeftPos={speakerLeftPos}
        speakerRightPos={speakerRightPos}
        showAcousticGuide={showAcousticGuide}
        showBeforeAfter={showBeforeAfter}
      />
    </Canvas>
  );
}
