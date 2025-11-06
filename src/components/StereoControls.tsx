"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card3D } from "@/components/ui/Card3D";
import { Text3D } from "@/components/ui/Text3D";
import { useLanguage } from "@/lib/i18n/language-context";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type StereoControlsProps = {
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (volume: number) => void;
  mode: "stereo" | "mono" | "surround";
  onModeChange: (mode: "stereo" | "mono" | "surround") => void;
  showXRay: boolean;
  onXRayToggle: () => void;
  vuMeter: number[];
  showAcousticGuide: boolean;
  onAcousticGuideToggle: () => void;
  showBeforeAfter: boolean;
  onBeforeAfterToggle: () => void;
};

export function StereoControls({
  isPlaying,
  volume,
  onVolumeChange,
  mode,
  onModeChange,
  showXRay,
  onXRayToggle,
  vuMeter,
  showAcousticGuide,
  onAcousticGuideToggle,
  showBeforeAfter,
  onBeforeAfterToggle,
}: StereoControlsProps) {
  const { locale } = useLanguage();

  const COPY = {
    he: {
      volume: "עוצמה",
      mode: "מצב",
      xray: "תצוגת פנים",
      stereo: "סטריאו",
      mono: "מונו",
      surround: "סראונד",
      acoustic: "מדריך אקוסטי",
      beforeAfter: "לפני/אחרי",
    },
    en: {
      volume: "Volume",
      mode: "Mode",
      xray: "X-Ray View",
      stereo: "Stereo",
      mono: "Mono",
      surround: "Surround",
      acoustic: "Acoustic Guide",
      beforeAfter: "Before/After",
    },
  } as const;

  const content = COPY[locale];
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card3D intensity={0.15} glow className="bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Toggle Button - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-card/60 transition-colors pointer-events-auto cursor-pointer"
      >
        <Text3D as="span" className="text-sm font-medium" intensity={0.1}>
          {locale === "he" ? "בקרות" : "Controls"}
        </Text3D>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {locale === "he" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </motion.div>
      </button>

      {/* Controls Content - Collapsible */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              {/* Volume Control */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <Text3D as="label" className="text-sm font-medium" intensity={0.1}>
                    {content.volume}
                  </Text3D>
                  <Text3D as="span" className="text-sm text-muted-foreground" intensity={0.1}>
                    {Math.round(volume)}%
                  </Text3D>
                </div>
                <Slider
                  value={[volume]}
                  onValueChange={([value]) => onVolumeChange(value)}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Mode Selection */}
              <div className="mb-6">
                <Text3D as="label" className="text-sm font-medium mb-3 block" intensity={0.1}>
                  {content.mode}
                </Text3D>
                <div className="flex gap-2 flex-wrap">
                  {(["stereo", "mono", "surround"] as const).map((m) => (
                    <Button
                      key={m}
                      variant={mode === m ? "default" : "outline"}
                      size="sm"
                      onClick={() => onModeChange(m)}
                      className="flex-1"
                    >
                      {content[m]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* X-Ray Toggle */}
              <div className="mb-4">
                <Button
                  variant={showXRay ? "default" : "outline"}
                  onClick={onXRayToggle}
                  className="w-full"
                  size="sm"
                >
                  {showXRay ? "🔍" : "👁️"} {content.xray}
                </Button>
              </div>

              {/* Acoustic Guide Toggle */}
              <div className="mb-4">
                <Button
                  variant={showAcousticGuide ? "default" : "outline"}
                  onClick={onAcousticGuideToggle}
                  className="w-full"
                  size="sm"
                >
                  {showAcousticGuide ? "🎯" : "📍"} {content.acoustic}
                </Button>
              </div>

              {/* Before/After Toggle */}
              <div className="mb-6">
                <Button
                  variant={showBeforeAfter ? "default" : "outline"}
                  onClick={onBeforeAfterToggle}
                  className="w-full"
                  size="sm"
                >
                  {showBeforeAfter ? "✨" : "🏠"} {content.beforeAfter}
                </Button>
              </div>

              {/* VU Meter Visualization */}
              <div className="mb-4">
                <Text3D as="label" className="text-sm font-medium mb-3 block" intensity={0.1}>
                  VU Meter
                </Text3D>
                <div className="flex gap-1 justify-center h-32 items-end bg-black/20 rounded p-2">
                  {vuMeter.map((value, i) => {
                    const height = Math.max(value * 100, 5); // Minimum height
                    const color = height > 80 ? "bg-red-500" : height > 50 ? "bg-yellow-500" : "bg-green-500";
                    return (
                      <motion.div
                        key={i}
                        className={`${color} rounded-t-sm`}
                        style={{
                          width: "6px",
                          height: `${height}%`,
                          minHeight: "4px",
                        }}
                        animate={{
                          height: `${height}%`,
                        }}
                        transition={{
                          duration: 0.1,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card3D>
  );
}

