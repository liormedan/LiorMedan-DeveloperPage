import * as React from "react";

type Box = { id: string; label: string };
type Edge = { from: string; to: string };

type Props = {
  boxes?: Box[];
  edges?: Edge[];
};

// Simple SVG diagram: boxes connected by arrows, RTL-friendly layout.
export default function DiagramFlow({
  boxes = [
    { id: "client", label: "Client" },
    { id: "next", label: "Next.js" },
    { id: "api", label: "API" },
    { id: "db", label: "DB" },
  ],
  edges = [
    { from: "client", to: "next" },
    { from: "next", to: "api" },
    { from: "api", to: "db" },
  ],
}: Props) {
  const spacing = 180;
  const startX = 40;
  const y = 50;
  const positions = new Map<string, number>();
  boxes.forEach((b, i) => positions.set(b.id, startX + i * spacing));

  return (
    <svg viewBox={`0 0 ${startX + spacing * (boxes.length - 1) + 160} 140`} className="w-full h-auto">
      {/* Edges */}
      {edges.map((e) => {
        const x1 = positions.get(e.from) ?? 0;
        const x2 = positions.get(e.to) ?? 0;
        return (
          <g key={`${e.from}-${e.to}`}>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
                <path d="M0,0 L10,3 L0,6 Z" fill="currentColor" />
              </marker>
            </defs>
            <line
              x1={x1 + 80}
              y1={y + 25}
              x2={x2}
              y2={y + 25}
              stroke="currentColor"
              className="text-blue-500/70 dark:text-blue-400/60"
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
          </g>
        );
      })}

      {/* Boxes */}
      {boxes.map((b) => (
        <g key={b.id} transform={`translate(${positions.get(b.id)}, ${y})`}>
          <rect width={80} height={50} rx={8} className="fill-blue-50/50 dark:fill-blue-950/20 stroke-blue-400/50" strokeWidth={1} />
          <text x={40} y={30} textAnchor="middle" className="fill-blue-700 dark:fill-blue-200 text-sm">
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

