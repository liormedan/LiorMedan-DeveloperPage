import { Locale } from "@/lib/i18n/config";

export type TemplateCategory = "frontend" | "fullstack";

export type Template = {
  slug: string;
  title: string;
  shortDescription: string;
  description?: string;
  category: TemplateCategory;
  features: string[];
  stack: string[];
  priceUSD: number;
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
};

export const templatesByLocale: Record<Locale, Template[]> = {
  he: [
    {
      slug: "landing-react-tailwind",
      title: "Landing React + Tailwind",
      shortDescription: "תבנית נחיתה יוקרתית עם Next.js ו-Tailwind עבור הצגת מוצר או שירות בצורה נקייה.",
      description:
        "עמוד נחיתה מגיב עם קטעי Hero, יתרונות וקריאה לפעולה. כולל רכיבי UI ניתנים להתאמה, SEO בסיסי והטמעה מהירה ב-Vercel.",
      category: "frontend",
      features: [
        "Next.js App Router",
        "Tailwind v4 + פריסת גריד מתקדמת",
        "SEO מובנה עם תגיות מטא",
        "רכיבים מוכנים: Hero, יתרונות, CTA",
      ],
      stack: ["Next.js", "React", "TailwindCSS", "Vercel"],
      priceUSD: 29,
      demoUrl: "/",
      image: "/next.svg",
    },
    {
      slug: "saas-starter-next-firebase",
      title: "SaaS Starter: Next + Firebase",
      shortDescription: "בסיס מוצר SaaS עם הזדהות משתמשים, לוח ניהול ותמיכה בתשלום דרך Stripe.",
      description:
        "ערכת פתיחה מלאה לשירות SaaS עם Firebase Auth, Firestore, API Routes ותהליכי Billing. אידאלית כנקודת זינוק לפרויקטי לקוחות.",
      category: "fullstack",
      features: [
        "הזדהות Firebase (Email/Google)",
        "Firestore + כללי אבטחה",
        "API Routes ב-Next",
        "תשתית חיוב Stripe מוכנה",
      ],
      stack: ["Next.js", "React", "Firebase", "Vercel", "Stripe"],
      priceUSD: 99,
      demoUrl: "/",
      image: "/next.svg",
    },
  ],
  en: [
    {
      slug: "landing-react-tailwind",
      title: "Landing React + Tailwind",
      shortDescription: "A premium landing page template with Next.js and Tailwind for presenting a product or service.",
      description:
        "Responsive landing page featuring Hero, benefits, and CTA sections. Includes customizable UI components, built-in SEO, and instant Vercel deployment.",
      category: "frontend",
      features: [
        "Next.js App Router",
        "Tailwind v4 + advanced grid layout",
        "SEO-ready meta tags",
        "Ready-made Hero, Benefits, CTA sections",
      ],
      stack: ["Next.js", "React", "TailwindCSS", "Vercel"],
      priceUSD: 29,
      demoUrl: "/",
      image: "/next.svg",
    },
    {
      slug: "saas-starter-next-firebase",
      title: "SaaS Starter: Next + Firebase",
      shortDescription: "Kickstart a SaaS product with user auth, admin dashboard, and Stripe billing support.",
      description:
        "Complete starter kit featuring Firebase Auth, Firestore, API Routes, and billing flows. Perfect as a launchpad for client engagements.",
      category: "fullstack",
      features: [
        "Firebase auth (Email/Google)",
        "Firestore with security rules",
        "Next.js API Routes",
        "Stripe billing scaffolding",
      ],
      stack: ["Next.js", "React", "Firebase", "Vercel", "Stripe"],
      priceUSD: 99,
      demoUrl: "/",
      image: "/next.svg",
    },
  ],
};
