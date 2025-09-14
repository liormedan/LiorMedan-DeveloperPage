"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Project = {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
};

export default function ProjectCard({ title, description, href, image, tags }: Project) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const targetRef = React.useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

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

  return (
    <Link href={href} target="_blank" className="block focus:outline-none">
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

        {image ? (
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
