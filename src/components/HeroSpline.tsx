"use client";
import * as React from "react";
import Spline from "@splinetool/react-spline";
import { paletteFromBase, applyPaletteToCSS, type RGB } from "@/lib/palette";
import { usePalette } from "@/components/PaletteProvider";

type LabelMapping = {
  // Spline object name -> desired text content
  [objectName: string]: string;
};

// Default labels (can be customized later or extended)
const defaultLabels: LabelMapping = {
  // Update these object names to match your scene's Text objects
  // Example: in Spline, name your 3D Text objects: Label1, Label2, ...
  Label1: "Next.js",
  Label2: "React",
  Label3: "TypeScript",
  Label4: "Tailwind CSS",
  Label5: "Vercel",
  Label6: "Prisma",
  Label7: "Supabase",
  Label8: "Stripe",
  Label9: "Auth.js",
  Label10: "tRPC",
};

export default function HeroSpline({ labels = defaultLabels, debug = true, centralObjectName = "CenterBall", step, scene = "/hero.splinecode", cameraName, autoRotate, lockBlueTheme = false }: { labels?: LabelMapping; debug?: boolean; centralObjectName?: string; step?: number; scene?: string; cameraName?: string; autoRotate?: boolean; lockBlueTheme?: boolean }) {
  const { setPalette } = usePalette();
  const splineRef = React.useRef<any>(null);
  const rafRef = React.useRef<number | null>(null);

  const setThemeFromRGB = React.useCallback((r255: number, g255: number, b255: number) => {
    const clamp = (x: number, lo = 0, hi = 255) => Math.max(lo, Math.min(hi, x));
    const r = clamp(Math.round(r255));
    const g = clamp(Math.round(g255));
    const b = clamp(Math.round(b255));
    const p = paletteFromBase({ r, g, b } as RGB);
    applyPaletteToCSS(p);
    setPalette(p);
    if (debug) console.log("[HeroSpline] Applied theme from color", { r, g, b, p });
  }, [debug, setPalette]);

  const onLoad = React.useCallback(async (spline: any) => {
    splineRef.current = spline;
    try {
      for (const [objName, text] of Object.entries(labels)) {
        const obj = spline.findObjectByName?.(objName);
        if (!obj) continue;
        // Text objects support the 'text' property
        try {
          await spline.setProperty?.(obj.id, "text", text);
        } catch {}
      }

      if (debug) {
        try {
          const printed = new Set<string>();
          const out: string[] = [];

          const push = (label: string) => {
            if (printed.has(label)) return;
            printed.add(label);
            out.push(label);
          };

          // Strategy 1: Known/public helpers
          try {
            const known = [
              "Label1","Label2","Label3","Label4","Label5",
              "Label6","Label7","Label8","Label9","Label10",
            ];
            for (const k of known) {
              const o = spline.findObjectByName?.(k);
              if (o) push(`${k} -> ${o.id}`);
            }
          } catch {}

          // Strategy 2: Iterate possible collections
          const candidates: any[] = [];
          try { if (Array.isArray((spline as any).objects)) candidates.push(...(spline as any).objects); } catch {}
          try { if (Array.isArray((spline as any)._objects)) candidates.push(...(spline as any)._objects); } catch {}
          try { if ((spline as any).scene?.children) candidates.push(...(spline as any).scene.children); } catch {}
          try { if ((spline as any).scene?.nodes) candidates.push(...(spline as any).scene.nodes); } catch {}

          for (const n of candidates) {
            try {
              const name = (n && (n.name || n.title)) ?? undefined;
              const id = n?.id ?? n?.uuid ?? "";
              if (name) push(`${name} -> ${id}`);
            } catch {}
          }

          // Fallback: surface top-level keys to inspect structure
          const keys = Object.keys(spline || {});

          // Print once per load
          // Open DevTools console to view this tree
          console.groupCollapsed("[HeroSpline] Scene object names (best-effort)");
          out.forEach((l) => console.log(l));
          console.log("[HeroSpline] Spline keys:", keys);
          console.groupEnd();
        } catch {}
      }

      // If locked, apply a fixed blue theme and skip dynamic sampling
      if (lockBlueTheme) {
        const blue = paletteFromBase({ r: 64, g: 99, b: 255 });
        applyPaletteToCSS(blue);
        setPalette(blue);
        if (debug) console.log("[HeroSpline] lockBlueTheme active -> applied fixed blue palette", blue);
      } else {
        // Try to read central object color and apply to CSS theme
        const candidates = [centralObjectName, "MainBall", "Center", "Sphere", "Ball_Center", "RootSphere"];
        let centerObj: any = null;
        for (const name of candidates) {
          try {
            const o = spline.findObjectByName?.(name);
            if (o) { centerObj = o; break; }
          } catch {}
        }
        if (centerObj && debug) console.log("[HeroSpline] Found central object:", centerObj?.name || centralObjectName, centerObj?.id);

        const tryApply = (obj: any) => {
          if (!obj) return false;
          const val =
            obj?.material?.color ||
            obj?.material?.baseColor ||
            obj?.material?.albedoColor ||
            obj?.color ||
            obj?.fill?.color ||
            obj?.tint ||
            null;
          if (!val) return false;
          const r = typeof val.r === "number" ? val.r : (Array.isArray(val) ? val[0] : undefined);
          const g = typeof val.g === "number" ? val.g : (Array.isArray(val) ? val[1] : undefined);
          const b = typeof val.b === "number" ? val.b : (Array.isArray(val) ? val[2] : undefined);
          if (typeof r === "number" && typeof g === "number" && typeof b === "number") {
            // Most engines store 0..1 floats
            const scale = (r <= 1 && g <= 1 && b <= 1) ? 255 : 1;
            setThemeFromRGB(r * scale, g * scale, b * scale);
            return true;
          }
          return false;
        };

        if (!tryApply(centerObj)) {
          if (debug) console.warn("[HeroSpline] Couldn't resolve central color; keeping default theme");
        }
      }
    } catch (e) {
      // best-effort; ignore failures
      // You can open devtools in the browser to see console logs
      console.warn("HeroSpline label injection failed", e);
    }
  }, [labels, debug, centralObjectName, setThemeFromRGB, lockBlueTheme, setPalette]);

  // Respond to step/props changes with best-effort tweaks in the scene
  React.useEffect(() => {
    const spline = splineRef.current;
    if (!spline || step == null) return;
    try {
      // Example tweaks: adjust scale/emissive of the center ball, or switch camera
      const center = spline.findObjectByName?.(centralObjectName);
      if (center) {
        const base = 1.0;
        const scale = base + Math.min(0.25, (Number(step) || 0) * 0.05);
        try { spline.setProperty?.(center.id, "scale", { x: scale, y: scale, z: scale }); } catch {}
        try { spline.setProperty?.(center.id, "emissiveIntensity", 0.2 + (Number(step) || 0) * 0.1); } catch {}
      }
      // Attempt camera switch (explicit prop wins; fallback to Cam{index})
      const camName = cameraName || `Cam${Number(step)}`;
      try { if (spline.setCamera && camName) spline.setCamera(camName); } catch {}
      if (debug) console.log("[HeroSpline] Step updated", step);
    } catch (e) {
      if (debug) console.warn("[HeroSpline] Step update failed", e);
    }
  }, [step, centralObjectName, debug, cameraName]);

  // Optional slow rotation for the center object (background motion)
  React.useEffect(() => {
    const spline = splineRef.current;
    if (!spline || !autoRotate) return;
    let t0: number | null = null;
    const speed = 0.25; // radians per second (slow)
    const loop = (ts: number) => {
      if (t0 == null) t0 = ts;
      const dt = (ts - t0) / 1000;
      t0 = ts;
      try {
        const obj = spline.findObjectByName?.(centralObjectName);
        if (obj) {
          const rot = obj.rotation || { x: 0, y: 0, z: 0 };
          const next = { x: rot.x, y: (rot.y || 0) + speed * dt, z: rot.z };
          try { spline.setProperty?.(obj.id, "rotation", next); } catch {}
        }
      } catch {}
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; };
  }, [autoRotate, centralObjectName]);

  return (
    <div className="absolute inset-0">
      {/* key forces re-mount on scene change for clean load */}
      <Spline key={scene} scene={scene} onLoad={onLoad} />
    </div>
  );
}
