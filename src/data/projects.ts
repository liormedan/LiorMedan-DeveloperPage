export type Project = { title: string; description: string; href: string; image?: string; tags?: string[] };

export const projects: Project[] = [
  {
    title: "Blogi (Strapi CMS)",
    description: "דוגמה לאינטגרציה של Next.js עם Strapi CMS בענן. דף Blogi דינמי שמושך פוסטים בזמן אמת.",
    href: "/blog",
    image: "/images/projects/placeholder-moods.svg",
    tags: ["Next.js", "Strapi", "CMS", "Demo"],
  },
  {
    title: "האתר של שירי מדן",
    description: "אתר תדמית רספונסיבי שבנוי ב-Next.js עבור האמנית שירי מדן, כולל גלריות ותוכן מרובה שפות.",
    href: "https://shirimedan25.vercel.app/",
    image: "/images/projects/placeholder-shiri.svg",
    tags: ["Next.js", "React", "Tailwind CSS", "Production"],
  },
];
