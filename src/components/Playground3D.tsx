"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { Card3D } from "@/components/ui/Card3D";
import { Text3D } from "@/components/ui/Text3D";
import { StereoControls } from "@/components/StereoControls";

// Dynamic import of Canvas component to avoid SSR issues
const StereoRoom3D = dynamic(() => import("@/components/StereoRoom3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-xs text-muted-foreground">Loading stereo room...</p>
      </div>
    </div>
  ),
});

// Main Playground component
export default function Playground3D() {
  const [mounted, setMounted] = React.useState(false);
  const { locale } = useLanguage();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  const [mode, setMode] = React.useState<"stereo" | "mono" | "surround">("stereo");
  const [showXRay, setShowXRay] = React.useState(false);
  const [vuMeter, setVuMeter] = React.useState<number[]>(Array(20).fill(0));
  const [showAcousticGuide, setShowAcousticGuide] = React.useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = React.useState(false);
  
  // Optimal acoustic positioning - ear height (~1.2m), equal distances
  const [stereoPosition, setStereoPosition] = React.useState<[number, number, number]>([0, 0.5, -4.8]);
  const [speakerLeftPos, setSpeakerLeftPos] = React.useState<[number, number, number]>([-2.5, 1.2, -4.5]);
  const [speakerRightPos, setSpeakerRightPos] = React.useState<[number, number, number]>([2.5, 1.2, -4.5]);

  // Simulate VU Meter
  React.useEffect(() => {
    if (!isPlaying) {
      setVuMeter(Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setVuMeter(
        Array.from({ length: 20 }, () => Math.random() * (volume / 100))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, volume]);

  // Ensure component only renders on client
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || typeof window === "undefined") {
    return (
      <div className="w-full h-[600px] md:h-[700px] rounded-lg border border-border/50 bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading 3D playground...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden border border-border/50 bg-gradient-to-br from-background to-muted/20">
      {/* 3D Canvas */}
      <div className="relative w-full h-full">
        <StereoRoom3D
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
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
      </div>

      {/* Info Panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/90 to-transparent pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div
          variants={infoVariants}
          className="pointer-events-auto"
        >
          <Card3D
            intensity={0.2}
            glow
            className="bg-card/80 backdrop-blur-sm p-4"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{isPlaying ? "🎵" : "🔇"}</div>
              <div>
                <Text3D as="h3" className="text-lg font-bold" intensity={0.15}>
                  {locale === "he" 
                    ? (isPlaying ? "מערכת סטריאו פעילה" : "מערכת סטריאו")
                    : (isPlaying ? "Stereo System Active" : "Stereo System")
                  }
                </Text3D>
                <Text3D as="p" className="text-sm text-muted-foreground" intensity={0.1}>
                  {locale === "he"
                    ? "לחץ על המערכת כדי להפעיל/לכבות"
                    : "Click the system to play/pause"}
                </Text3D>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </motion.div>

      {/* Controls Panel */}
      <div className="absolute top-4 right-4 z-20 max-w-xs">
        <div className="pointer-events-auto">
          <StereoControls
            isPlaying={isPlaying}
            volume={volume}
            onVolumeChange={setVolume}
            mode={mode}
            onModeChange={setMode}
            showXRay={showXRay}
            onXRayToggle={() => setShowXRay(!showXRay)}
            vuMeter={vuMeter}
            showAcousticGuide={showAcousticGuide}
            onAcousticGuideToggle={() => setShowAcousticGuide(!showAcousticGuide)}
            showBeforeAfter={showBeforeAfter}
            onBeforeAfterToggle={() => setShowBeforeAfter(!showBeforeAfter)}
          />
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute top-4 left-4 pointer-events-none z-20">
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="pointer-events-auto px-4 py-2 rounded-md bg-card/60 backdrop-blur-sm border border-border hover:bg-card/80 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">{isPlaying ? "⏸️" : "▶️"}</span>
          <Text3D as="span" className="text-xs font-medium" intensity={0.1}>
            {locale === "he" ? (isPlaying ? "השהה" : "נגן") : (isPlaying ? "Pause" : "Play")}
          </Text3D>
        </motion.button>
      </div>
    </div>
  );
}
