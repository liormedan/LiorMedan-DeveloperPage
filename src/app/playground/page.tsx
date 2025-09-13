"use client";
import * as React from "react";
import ThreeStrip from "@/components/ThreeStrip";
import { Button } from "@/components/ui/button";

type AudioMode = "none" | "mic" | "demo";

export default function PlaygroundPage() {
  const [mode, setMode] = React.useState<AudioMode>("none");
  
  return (
    <div className="container-fluid py-10">
      <h1 className="text-3xl font-bold mb-2">Playground: Audio Wave</h1>
      <p className="text-sm text-muted-foreground mb-6">סנכרון גל ה‑3D עם מיקרופון או טון דמו.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={mode === "none" ? "default" : "ghost"} onClick={() => setMode("none")}>ללא אודיו</Button>
        <Button variant={mode === "demo" ? "default" : "ghost"} onClick={() => setMode("demo")}>טון דמו</Button>
        <Button variant={mode === "mic" ? "default" : "ghost"} onClick={() => setMode("mic")}>מיקרופון</Button>
      </div>

      <div className="relative overflow-hidden min-h-[360px] rounded-lg border">
        <ThreeStrip fill audioMode={mode} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10 pointer-events-none" />
      </div>

      <p className="text-xs text-muted-foreground mt-3">הרשאת מיקרופון נדרשת במצב “מיקרופון”.</p>
    </div>
  );
}
