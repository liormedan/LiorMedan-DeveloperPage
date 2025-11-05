"use client";

import * as React from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type CablesProps = {
  stereoPosition: [number, number, number];
  speakerLeftPos: [number, number, number];
  speakerRightPos: [number, number, number];
  mode: "stereo" | "mono" | "surround" | "5.1" | "7.1";
};

export function Cables({ stereoPosition, speakerLeftPos, speakerRightPos, mode }: CablesProps) {
  // Hide cables for cleaner look - they can be shown optionally
  return null;
  
  // Optional: Show only power cable neatly along the wall
  // return (
  //   <>
  //     {/* Power cable - neatly along the wall */}
  //     <Line
  //       points={[
  //         [stereoPosition[0], stereoPosition[1] - 0.2, stereoPosition[2]],
  //         [stereoPosition[0], stereoPosition[1] - 0.2, -4.9],
  //         [0, stereoPosition[1] - 0.2, -4.9],
  //       ]}
  //       color="#0a0a0a"
  //       lineWidth={2}
  //       dashed={false}
  //     />
  //   </>
  // );
}

