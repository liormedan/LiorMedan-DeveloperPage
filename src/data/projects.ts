import { Locale } from "@/lib/i18n/config";

export type Project = {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
};

export const projectsByLocale: Record<Locale, Project[]> = {
  he: [
    {
      title: "Playground תלת-ממדי - חוויית עבודה אינטראקטיבית",
      description:
        "חוויית Playground מתקדמת שממחישה את תהליך העבודה המלא - מגילוי ועד הפצה. אינטראקציה עם השלבים השונים, תנועה חלקה ואנימציות מתקדמות עם Three.js ו-Framer Motion.",
      href: "/playground",
      image: "/images/projects/placeholder-playground.svg",
      tags: ["Three.js", "React Three Fiber", "Framer Motion", "Interactive", "3D"],
    },
    {
      title: "Sanity Studio - תבנית אתר עברית",
      description:
        "סטודיו Sanity מותאם לעברית עם תבנית אתר מלאה. מערכת ניהול תוכן מתקדמת עם תמיכה מלאה ב-RTL ועיצוב מותאם לשוק הישראלי.",
      href: "https://sanity-studio-heb-template-website.vercel.app/",
      image: "/images/projects/placeholder-sanity.svg",
      tags: ["Sanity", "CMS", "Hebrew", "Template", "Production"],
    },
    {
      title: "Lior Landing Page CMS",
      description:
        "דף נחיתה דינמי עם מערכת ניהול תוכן מתקדמת. הפרויקט מדגים יכולות CMS מלאות עם עיצוב מודרני וחוויית משתמש מותאמת.",
      href: "https://liorlandingpagecms.vercel.app/",
      image: "/images/projects/placeholder-cms.svg",
      tags: ["Next.js", "CMS", "Landing Page", "Production"],
    },

    {
      title: "אתר תדמית ללקוחה פרטית",
      description:
        "פיתוח אתר המבוסס על Next.js עם עיצוב מותאם אישית ויכולות נגישות מתקדמות, כולל תאימות מלאה ל-RTL וחיבור לטפסי לידס.",
      href: "https://shirimedan25.vercel.app/",
      image: "/images/projects/placeholder-shiri.svg",
      tags: ["Next.js", "React", "Tailwind CSS", "Production"],
    },
  ],
  en: [
    {
      title: "3D Playground - Interactive Work Experience",
      description:
        "An advanced Playground experience that visualizes the complete work process - from discovery to deployment. Interact with different stages, smooth motion and advanced animations with Three.js and Framer Motion.",
      href: "/playground",
      image: "/images/projects/placeholder-playground.svg",
      tags: ["Three.js", "React Three Fiber", "Framer Motion", "Interactive", "3D"],
    },
    {
      title: "Sanity Studio - Hebrew Website Template",
      description:
        "Sanity Studio customized for Hebrew with complete website template. Advanced content management system with full RTL support and design tailored for the Israeli market.",
      href: "https://sanity-studio-heb-template-website.vercel.app/",
      image: "/images/projects/placeholder-sanity.svg",
      tags: ["Sanity", "CMS", "Hebrew", "Template", "Production"],
    },
    {
      title: "Lior Landing Page CMS",
      description:
        "Dynamic landing page with advanced content management system. Showcases full CMS capabilities with modern design and tailored user experience.",
      href: "https://liorlandingpagecms.vercel.app/",
      image: "/images/projects/placeholder-cms.svg",
      tags: ["Next.js", "CMS", "Landing Page", "Production"],
    },

    {
      title: "Personal Brand Website",
      description:
        "A bespoke marketing site powered by Next.js with a custom design, full RTL support, advanced accessibility, and integrated lead capture forms.",
      href: "https://shirimedan25.vercel.app/",
      image: "/images/projects/placeholder-shiri.svg",
      tags: ["Next.js", "React", "Tailwind CSS", "Production"],
    },
  ],
};
