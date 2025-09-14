"use client";
import * as React from "react";
import HeroThree from "@/components/HeroThree";
import StepElements from "@/components/StepElements";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Lightbulb, Wallet, Users, MessageSquare, Workflow, Terminal } from "lucide-react";

export type StoryStep = {
  id: string;
  title?: string;
  subtitle?: string;
  overlayAlign?: "center" | "right" | "left";
  content?: React.ReactNode; // optional rich content under the text
  icon?: React.ReactNode; // optional icon to render above title
};

export default function StoryPager({ steps, engine = "three" as "three" | "spline" | "none" }: { steps: StoryStep[]; engine?: "three" | "spline" | "none" }) {
  const [idx, setIdx] = React.useState(0);
  const [transitioning, setTransitioning] = React.useState(false);
  const [travel, setTravel] = React.useState(0);
  const [target, setTarget] = React.useState<number | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [showHint, setShowHint] = React.useState(true);
  const [audioOn, setAudioOn] = React.useState(false);
  const audioRef = React.useRef<{ stop?: () => void } | null>(null);
  const [audioLevel, setAudioLevel] = React.useState(0);
  const lastTouch = React.useRef<{ y: number; t: number } | null>(null);

  const clamp = (n: number) => Math.max(0, Math.min(steps.length - 1, n));
  const go = React.useCallback((dir: 1 | -1) => {
    if (transitioning) return;
    setTransitioning(true);
    const next = clamp(idx + dir);
    setTarget(next);
    // animate tunnel pulse 0->1->0 during the transition
    let raf: number | null = null;
    const t0 = performance.now();
    const dur = 800;
    // ease for future use (kept simple linear pulse for now)
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / dur);
      setProgress(p);
      setTravel(1 - Math.abs(2 * p - 1));
      if (p < 1) raf = requestAnimationFrame(tick); else { setIdx(next); setTarget(null); setProgress(0); setTransitioning(false); }
    };
    raf = requestAnimationFrame(tick);
  }, [transitioning, steps.length, idx]);

  // Lock page scroll while pager is mounted
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const hintTimeout = setTimeout(() => setShowHint(false), 3500);
    // Intro pulse so שהאפקט בולט גם בכניסה
    let raf: number | null = null;
    const t0 = performance.now();
    const dur = 800;
    const intro = () => {
      const p = Math.min(1, (performance.now() - t0) / dur);
      setTravel(1 - p); // fade 1->0
      if (p < 1) raf = requestAnimationFrame(intro);
    };
    raf = requestAnimationFrame(intro);
    return () => { document.body.style.overflow = prev; clearTimeout(hintTimeout); };
  }, []);

  // Wheel / keys / touch
  React.useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (transitioning) return;
      if (Math.abs(e.deltaY) < 24) return;
      setShowHint(false);
      if (e.deltaY > 0 && idx < steps.length - 1) { e.preventDefault(); go(1); }
      else if (e.deltaY < 0 && idx > 0) { e.preventDefault(); go(-1); }
    };
    const onKey = (e: KeyboardEvent) => {
      if (transitioning) return;
      setShowHint(false);
      if (["ArrowDown","PageDown"," ","Enter"].includes(e.key)) { e.preventDefault(); go(1); }
      if (["ArrowUp","PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
    };
    const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; lastTouch.current = { y: t.clientY, t: e.timeStamp }; };
    const onTouchEnd = (e: TouchEvent) => {
      const lt = lastTouch.current; if (!lt) return; lastTouch.current = null;
      const dy = (e.changedTouches[0]?.clientY ?? lt.y) - lt.y;
      if (Math.abs(dy) < 30) return;
      setShowHint(false);
      if (dy < 0 && idx < steps.length - 1) go(1);
      if (dy > 0 && idx > 0) go(-1);
    };
    const opts: AddEventListenerOptions & EventListenerOptions = { passive: false } as any;
    window.addEventListener("wheel", onWheel, opts);
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, opts);
    window.addEventListener("touchend", onTouchEnd, opts);
    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("keydown", onKey as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [idx, transitioning, steps.length, go]);

  const step = steps[idx] || {};
  const nextStep = target != null ? steps[target] : null;
  // Force centered overlay to avoid vertical jumping between slides
  const align: "center" = "center";

  const stepIcon = React.useMemo(() => {
    if (step.icon) return step.icon;
    switch (step.id) {
      case "hero":
        return <Star className="h-5 w-5" />;
      case "work":
        return <Workflow className="h-5 w-5" />;
      case "principles-hero":
        return <Lightbulb className="h-5 w-5" />;
      case "process":
        return <Workflow className="h-5 w-5" />;
      case "estimate":
        return <Wallet className="h-5 w-5" />;
      case "orgs":
        return <Users className="h-5 w-5" />;
      case "contact":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return null;
    }
  }, [step.icon, step.id]);

  const nextIcon = React.useMemo(() => {
    if (!nextStep) return null;
    if ((nextStep as any).icon) return (nextStep as any).icon as React.ReactNode;
    switch (nextStep.id) {
      case "hero":
        return <Star className="h-5 w-5" />;
      case "work":
        return <Workflow className="h-5 w-5" />;
      case "principles-hero":
        return <Lightbulb className="h-5 w-5" />;
      case "process":
        return <Workflow className="h-5 w-5" />;
      case "estimate":
        return <Wallet className="h-5 w-5" />;
      case "orgs":
        return <Users className="h-5 w-5" />;
      case "contact":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return null;
    }
  }, [nextStep]);
  const stepItems: Record<string, { text: string; x: string; y: string }[]> = {
    hero: [
      { text: "Next.js", x: "18%", y: "26%" },
      { text: "Three.js", x: "72%", y: "34%" },
    ],
    about: [
      { text: "Frontend", x: "22%", y: "30%" },
      { text: "Product", x: "64%", y: "70%" },
    ],
    work: [
      { text: "Web App", x: "22%", y: "64%" },
      { text: "Dashboard", x: "70%", y: "24%" },
    ],
    process: [
      { text: "MVP", x: "64%", y: "36%" },
      { text: "Scope", x: "28%", y: "68%" },
    ],
    estimate: [
      { text: "Timeline", x: "26%", y: "28%" },
      { text: "Estimate", x: "70%", y: "66%" },
    ],
    orgs: [
      { text: "Security", x: "24%", y: "30%" },
      { text: "Scale", x: "68%", y: "70%" },
    ],
    contact: [
      { text: "WhatsApp", x: "24%", y: "28%" },
      { text: "Email", x: "70%", y: "72%" },
    ],
  };

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Background (optional) */}
      {engine === "three" && (
        <HeroThree
          step={idx}
          autoRotate
          backgroundOnly
          travelPulse={travel}
          audioLevel={audioLevel}
          transitionProgress={progress}
        />
      )}

      {/* Step elements (only when background visuals are on) */}
      {engine === "three" && (
        <StepElements items={stepItems[step.id] || []} progress={progress} />
      )}

      {/* Overlay text/content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-3xl h-[260px] sm:h-[280px] md:h-[320px]">
          {/* Current step (stacked in place) */}
          <div
            className="absolute inset-0 px-6 flex items-center justify-center text-center"
            style={{ opacity: 1 - progress, transform: `scale(${1 - progress * 0.02})` }}
          >
            <div className="inline-block w-full">
              <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 dark:border-white/10 bg-background/70 backdrop-blur-md shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-5 sm:p-6">
                {/* Accent bar */}
                <div className="mx-auto mb-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-fuchsia-500" />
                {/* Icon badge */}
                {stepIcon && (
                  <div className="mx-auto mb-2 h-8 w-8 rounded-full grid place-items-center bg-primary/10 text-primary border border-primary/30">
                    {stepIcon}
                  </div>
                )}
                {step.title ? (
                  <h1 className="text-3xl sm:text-5xl font-bold">
                    {step.id === 'hero' ? (
                      <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 shadow-sm backdrop-blur-sm ring-1 ring-primary/30">
                        {step.title}
                      </span>
                    ) : (
                      <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                        {step.title}
                      </span>
                    )}
                  </h1>
                ) : null}
                {step.subtitle ? (
                  step.id === 'hero' ? (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-white/95 shadow-sm ring-1 ring-white/20">
                        <Terminal aria-hidden className="h-4 w-4 opacity-95" />
                        {step.subtitle}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-3 text-base sm:text-lg text-muted-foreground">{step.subtitle}</p>
                  )
                ) : null}
                {step.content ? <div className="mt-4 text-left sm:text-center">{step.content}</div> : null}
              </div>
            </div>
          </div>
          {nextStep && (
            <div
              className="px-6 absolute inset-0 flex items-center justify-center text-center"
              style={{ opacity: progress, transform: `scale(${0.98 + progress * 0.02})` }}
            >
              <div className="inline-block w-full">
                <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 dark:border-white/10 bg-background/70 backdrop-blur-md shadow-xl ring-1 ring-black/5 dark:ring-white/10 p-5 sm:p-6">
                  <div className="mx-auto mb-3 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-fuchsia-500" />
                  {nextIcon && (
                    <div className="mx-auto mb-2 h-8 w-8 rounded-full grid place-items-center bg-primary/10 text-primary border border-primary/30">
                      {nextIcon}
                    </div>
                  )}
                  {nextStep.title ? (
                    <h1 className="text-3xl sm:text-5xl font-bold">
                      {nextStep.id === 'hero' ? (
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 shadow-sm backdrop-blur-sm ring-1 ring-primary/30">
                          {nextStep.title}
                        </span>
                      ) : (
                        <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                          {nextStep.title}
                        </span>
                      )}
                    </h1>
                  ) : null}
                  {nextStep.subtitle ? (
                    nextStep.id === 'hero' ? (
                      <div className="mt-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-white/95 shadow-sm ring-1 ring-white/20">
                          <Terminal aria-hidden className="h-4 w-4 opacity-95" />
                          {nextStep.subtitle}
                        </span>
                      </div>
                    ) : (
                      <p className="mt-3 text-base sm:text-lg text-muted-foreground">{nextStep.subtitle}</p>
                    )
                  ) : null}
                  {nextStep.content ? <div className="mt-4 text-left sm:text-center">{nextStep.content}</div> : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2">
        {steps.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to step ${i + 1}`}
            onClick={() => !transitioning && setIdx(i)}
            className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2.5 bg-primary/40"}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      {showHint && idx === 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-16 text-xs text-muted-foreground animate-[fade-in_300ms_ease]">
          גללו להמשך
        </div>
      )}

      {/* Floating CTA + Audio toggle */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <Link href="/quote" passHref>
          <Button size="sm">דברו איתי</Button>
        </Link>
        <Button size="sm" variant={audioOn ? "default" : "secondary"}
          onClick={async () => {
            try {
              if (audioOn) {
                audioRef.current?.stop?.();
                setAudioOn(false); setAudioLevel(0);
                return;
              }
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const src = ctx.createMediaStreamSource(stream);
              const analyser = ctx.createAnalyser();
              analyser.fftSize = 512; analyser.smoothingTimeConstant = 0.8;
              src.connect(analyser);
              const data = new Uint8Array(analyser.frequencyBinCount);
              let raf: number | null = null;
              const loop = () => {
                analyser.getByteFrequencyData(data);
                let sum = 0; for (let i = 0; i < data.length; i++) sum += data[i];
                const avg = sum / data.length; // 0..255
                const level = Math.max(0, Math.min(1, (avg - 60) / 140));
                setAudioLevel((p) => p * 0.8 + level * 0.2); // smooth
                raf = requestAnimationFrame(loop);
              };
              raf = requestAnimationFrame(loop);
              audioRef.current = {
                stop: () => { if (raf) cancelAnimationFrame(raf); stream.getTracks().forEach((t) => t.stop()); ctx.close(); }
              };
              setAudioOn(true);
            } catch (e) {
              console.warn("Audio reactive denied/unavailable", e);
            }
          }}
        >
          {audioOn ? "אודיו פעיל" : "הפעל אודיו"}
        </Button>
      </div>
    </div>
  );
}
