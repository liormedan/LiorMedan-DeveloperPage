export type Project = { title: string; description: string; href: string; image?: string; tags?: string[] };

export const projects: Project[] = [
  {
    title: "WaveQ",
    description: "React + WebAudio + Tokens",
    href: "https://example.com/waveq",
    image: "/images/projects/placeholder-waveq.svg",
    tags: ["React", "Audio", "WebAudio"],
  },
  {
    title: "Blogi (Strapi CMS)",
    description: "דוגמה לאינטגרציה של Next.js עם Strapi CMS בענן. דף Blogi דינמי שמושך פוסטים בזמן אמת.",
    href: "/blog",
    image: "/images/projects/placeholder-moods.svg",
    tags: ["Next.js", "Strapi", "CMS", "Demo"],
  },
];

