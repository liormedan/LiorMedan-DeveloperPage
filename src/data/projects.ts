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
      title: "Sanity Studio - תבנית אתר עברית",
      description:
        "סטודיו Sanity מותאם לעברית עם תבנית אתר מלאה. מערכת ניהול תוכן מתקדמת עם תמיכה מלאה ב-RTL ועיצוב מותאם לשוק הישראלי.",
      href: "https://vercel.com/liormedans-projects/sanity-studio-heb-template-website-",
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
      title: "Blogi (Strapi CMS)",
      description:
        "פורטל בלוגים שנבנה עם Next.js ו-Strapi CMS עבור ניהול תוכן גמיש. הפרויקט מדגים חיבור API מאובטח וזרימות עריכה קלות למנהלי תוכן.",
      href: "/blog",
      image: "/images/projects/placeholder-moods.svg",
      tags: ["Next.js", "Strapi", "CMS", "Demo"],
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
      title: "Sanity Studio - Hebrew Website Template",
      description:
        "Sanity Studio customized for Hebrew with complete website template. Advanced content management system with full RTL support and design tailored for the Israeli market.",
      href: "https://vercel.com/liormedans-projects/sanity-studio-heb-template-website-",
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
      title: "Blogi (Strapi CMS)",
      description:
        "A blogging portal built with Next.js and Strapi CMS for flexible content management. Demonstrates secure API integration and editor-friendly publishing flows.",
      href: "/blog",
      image: "/images/projects/placeholder-moods.svg",
      tags: ["Next.js", "Strapi", "CMS", "Demo"],
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
