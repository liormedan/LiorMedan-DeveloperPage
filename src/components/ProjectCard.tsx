"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Code2,
  Languages,
  LayoutDashboard,
  Layers,
  Rocket,
  Server,
  Sparkles,
  Wind,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Project = {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
};

type VisualTheme = {
  gradient: string;
  icon: LucideIcon;
  label?: string;
};

const TAG_THEMES: Record<string, VisualTheme> = {
  "sanity": {
    gradient: "from-[#FF6A88] via-[#FF8BA7] to-[#FFD174]",
    icon: Layers,
    label: "Sanity Studio",
  },
  "next.js": {
    gradient: "from-[#111827] via-[#030712] to-[#0F172A]",
    icon: Code2,
    label: "Next.js",
  },
  "cms": {
    gradient: "from-[#0EA5E9] via-[#6366F1] to-[#8B5CF6]",
    icon: LayoutDashboard,
    label: "CMS",
  },
  "landing page": {
    gradient: "from-[#EC4899] via-[#8B5CF6] to-[#6366F1]",
    icon: Sparkles,
    label: "Landing Experience",
  },
  "hebrew": {
    gradient: "from-[#6366F1] via-[#06B6D4] to-[#38BDF8]",
    icon: Languages,
    label: "RTL Ready",
  },
  "template": {
    gradient: "from-[#F97316] via-[#F59E0B] to-[#FACC15]",
    icon: Layers,
    label: "Template",
  },
  "production": {
    gradient: "from-[#22C55E] via-[#0EA5E9] to-[#6366F1]",
    icon: Rocket,
    label: "Production Ready",
  },
  "react": {
    gradient: "from-[#38BDF8] via-[#0EA5E9] to-[#2563EB]",
    icon: Atom,
    label: "React",
  },
  "tailwind css": {
    gradient: "from-[#14B8A6] via-[#0EA5E9] to-[#6366F1]",
    icon: Wind,
    label: "Tailwind CSS",
  },
  "supabase": {
    gradient: "from-[#22C55E] via-[#16A34A] to-[#0F766E]",
    icon: Server,
    label: "Supabase",
  },
};

const PREFERRED_TAG_ORDER = [
  "next.js",
  "sanity",
  "cms",
  "landing page",
  "react",
  "tailwind css",
  "supabase",
  "template",
  "hebrew",
  "production",
] as const;

const DEFAULT_THEME: VisualTheme = {
  gradient: "from-[#334155] via-[#1E293B] to-[#0F172A]",
  icon: Sparkles,
  label: "Project",
};

function resolveTheme(tags?: string[]): Required<VisualTheme> {
  const normalized = tags?.map((tag) => tag.toLowerCase()) ?? [];
  const matchedKey = PREFERRED_TAG_ORDER.find((key) => normalized.includes(key));
  const base = matchedKey ? TAG_THEMES[matchedKey] : undefined;
  const label =
    base?.label ?? (tags && tags.length > 0 ? tags[0] : DEFAULT_THEME.label ?? "Project");
  const icon = base?.icon ?? DEFAULT_THEME.icon;
  const gradient = base?.gradient ?? DEFAULT_THEME.gradient;
  return { label, icon, gradient };
}

export default function ProjectCard({ title, description, href, image, tags }: Project) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const targetRef = React.useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const showGeneratedVisual = !image || image.includes("placeholder");
  const theme = React.useMemo(() => resolveTheme(tags), [tags]);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    // tilt range
    targetRef.current.ry = (x - 0.5) * 6; // rotateY
    targetRef.current.rx = -(y - 0.5) * 6; // rotateX
    tick();
  };
  const onLeave = () => {
    targetRef.current = { rx: 0, ry: 0 }; tick();
  };
  const tick = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current; if (!el) return;
      el.style.setProperty("--rx", `${targetRef.current.rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${targetRef.current.ry.toFixed(2)}deg`);
    });
  };

  const isExternal = href.startsWith("http");
  
  return (
    <Link href={href} target={isExternal ? "_blank" : undefined} className="block focus:outline-none">
      <Card
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative overflow-hidden border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 will-change-transform [transform-style:preserve-3d] [transform:rotateX(var(--rx,0))_rotateY(var(--ry,0))] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {/* Hover gradient highlight */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-transparent" />
        </div>
        {/* Shine sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-[20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translateX(-140%) rotate(20deg)", transition: "transform 700ms ease-out, opacity 200ms ease" }}
        />
        <style jsx>{`
          .group:hover > div[aria-hidden].absolute.inset-y-0 { transform: translateX(160%) rotate(20deg); }
        `}</style>

        {showGeneratedVisual ? (
          <div className="relative h-40 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
            <div className="absolute inset-0 opacity-60 mix-blend-screen">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.16),transparent_65%)]" />
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.15)_0deg,transparent_140deg,rgba(255,255,255,0.1)_320deg)]" />
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-sky-600 dark:text-white">
              <theme.icon className="h-11 w-11 drop-shadow-lg" />
              <span className="mt-3 text-[0.7rem] uppercase tracking-[0.5em] text-sky-500 dark:text-white/80">
                {theme.label}
              </span>
              {tags && tags.length > 1 ? (
                <div className="mt-3 flex flex-wrap justify-center gap-2 text-[0.6rem] font-medium uppercase text-sky-500 dark:text-white/70">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sky-500/30 px-2 py-0.5 dark:border-white/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : image ? (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={82}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        ) : null}

        <div className="p-4">
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          {tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary" className="transition-transform group-hover:translate-y-[-1px]">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
