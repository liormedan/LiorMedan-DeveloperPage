"use client";
import * as React from "react";
import HeroSpline from "@/components/HeroSpline";
import HeroThree from "@/components/HeroThree";

type Step = {
  id: string;
  title: string;
  subtitle?: string;
  scene?: string;            // optional alternate Spline scene per step
  cameraName?: string;       // optional camera name to activate for this step
  centralObjectName?: string;// optional override for center object name
  labels?: Record<string, string>; // optional text overrides for Spline text objects
  filters?: {
    hue?: number;            // degrees
    saturate?: number;       // 0..n
    brightness?: number;     // 0..n
    blurPx?: number;         // pixels
    vignette?: number;       // 0..1 strength
    gradientOverlay?: string;// optional CSS gradient string
  };
  autoRotate?: boolean;      // rotate center object slowly for this step
  hideOverlayText?: boolean; // don't render the title/subtitle overlay
  overlayAlign?: "center" | "right" | "left"; // position of overlay text
  backgroundOnly?: boolean;  // for three.js engine: render background only
};

export default function ScrollyHero({ steps, engine = "three" as "three" | "spline" }: { steps: Step[]; engine?: "three" | "spline" }) {
  const [active, setActive] = React.useState(0);

  // Observe sections with data-step to update active index
  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-step]")).sort((a, b) => {
      const ai = Number(a.dataset.step);
      const bi = Number(b.dataset.step);
      return ai - bi;
    });
    if (!sections.length) return;

    const opts: IntersectionObserverInit = { root: null, rootMargin: "0px", threshold: 0.6 };
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
      if (visible[0]?.target) {
        const idx = Number((visible[0].target as HTMLElement).dataset.step || 0);
        if (!Number.isNaN(idx)) setActive(idx);
      }
    }, opts);

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const current = steps[Math.max(0, Math.min(steps.length - 1, active))];
  const f = current?.filters || {};
  const hue = f.hue ?? 0;
  const sat = f.saturate ?? 1;
  const bri = f.brightness ?? 1;
  const blur = f.blurPx ?? 0;
  const vignette = Math.max(0, Math.min(1, f.vignette ?? 0));
  const align = current?.overlayAlign || "center";

  return (
    <div className="relative">
      {/* Sticky hero canvas area */}
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Background engine */}
        {engine === "three" ? (
          <HeroThree step={active} autoRotate={current?.autoRotate} backgroundOnly={current?.backgroundOnly ?? true} />
        ) : (
          <HeroSpline
            step={active}
            scene={current?.scene}
            cameraName={current?.cameraName}
            centralObjectName={current?.centralObjectName}
            labels={current?.labels}
            autoRotate={current?.autoRotate}
            lockBlueTheme
          />
        )}
        {/* Color grading / blur overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            filter: `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bri}) blur(${blur}px)`,
          }}
        />
        {/* Soft vignette */}
        {vignette > 0 && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,${0.4 * vignette}) 100%)`,
              mixBlendMode: "multiply",
            }}
          />
        )}
        {/* Optional gradient tint overlay */}
        {f.gradientOverlay && (
          <div className="pointer-events-none absolute inset-0" style={{ background: f.gradientOverlay, opacity: 0.35 }} />
        )}
        {/* Overlay text that changes per step */}
        {!current?.hideOverlayText && (
          <div
            className={
              align === "right"
                ? "pointer-events-none absolute inset-y-0 right-0 w-full flex items-center justify-end pr-6"
                : align === "left"
                ? "pointer-events-none absolute inset-y-0 left-0 w-full flex items-center justify-start pl-6"
                : "pointer-events-none absolute inset-0 flex items-center justify-center"
            }
          >
            <div
              className={
                align === "right"
                  ? "pointer-events-auto text-right px-4 py-3 max-w-sm"
                  : align === "left"
                  ? "pointer-events-auto text-left px-4 py-3 max-w-sm"
                  : "pointer-events-auto text-center px-6 max-w-3xl"
              }
            >
              <h1 className="text-3xl sm:text-5xl font-bold">{current?.title}</h1>
              {current?.subtitle ? (
                <p className="mt-3 text-base sm:text-lg text-muted-foreground">{current.subtitle}</p>
              ) : null}
            </div>
          </div>
        )}
        {/* Readability overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/30 dark:from-background/40 dark:via-background/25 dark:to-background/40" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,rgba(2,6,23,0.55),transparent_60%)] dark:[background:radial-gradient(ellipse_at_center,rgba(2,6,23,0.65),transparent_62%)]" />
      </div>

      {/* Sentinel sections to drive steps by scroll */}
      <div id="scrolly-steps">
        {steps.map((s, i) => (
          <section
            key={s.id}
            data-step={i}
            className="min-h-dvh flex items-center justify-center px-6"
            aria-label={s.title}
          >
            <div className="sr-only">{s.title}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
