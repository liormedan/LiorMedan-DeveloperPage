export type Project = { title: string; description: string; href: string; image?: string; tags?: string[] };

export const projects: Project[] = [
  {
    title: "שירי מדן - אתר פורטפוליו",
    description: "אתר פרסונלי לבמאית שירי מדן המציג עבודות ופרויקטים נבחרים.",
    href: "https://shirimedan25.vercel.app/",
    tags: ["Portfolio", "Next.js", "Vercel"],
  },
  {
    title: "MOODS",
    description: "Next.js + Supabase + Tailwind (RTL)",
    href: "https://example.com/moods",
    image: "/images/projects/placeholder-moods.svg",
    tags: ["Next.js", "Supabase", "Tailwind", "RTL"],
  },
  {
    title: "WaveQ",
    description: "React + WebAudio + Tokens",
    href: "https://example.com/waveq",
    image: "/images/projects/placeholder-waveq.svg",
    tags: ["React", "Audio", "WebAudio"],
  },
];

