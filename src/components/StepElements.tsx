"use client";
import * as React from "react";

type Item = { text: string; x: string; y: string };

export default function StepElements({ items, progress = 0 }: { items: Item[]; progress?: number }) {
  // Items appear near the end of transition (0.66 -> 1.0)
  const vis = Math.max(0, Math.min(1, (progress - 0.66) / 0.34));
  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((it, i) => (
        <div key={i} className="absolute" style={{ left: it.x, top: it.y }}>
          <span
            className="rounded-full border px-2 py-1 text-xs bg-background/70 backdrop-blur shadow"
            style={{
              opacity: vis,
              transform: `translateY(${(1 - vis) * 16}px)`,
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            {it.text}
          </span>
        </div>
      ))}
    </div>
  );
}
