export type CaseItem = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  tech?: string[];
};

export const cases: CaseItem[] = [
  {
    slug: "moods",
    title: "MOODS – מעקב מצבי רוח",
    subtitle: "Next.js + Supabase + RTL",
    summary: "אפליקציה מהירה עם תמיכה מלאה ב‑RTL, אוטנטיקציה, ותרשימי נתונים.",
    tech: ["Next.js", "Supabase", "Tailwind", "RTL"],
  },
  {
    slug: "waveq",
    title: "WaveQ – נגן מוזיקה וובי",
    subtitle: "React + WebAudio",
    summary: "נגן אינטרנטי עם סנכרון ויזואליזציית סאונד בזמן אמת.",
    tech: ["React", "WebAudio", "Three.js"],
  },
];

