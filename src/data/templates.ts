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

export const templates: Template[] = [
  {
    slug: "landing-react-tailwind",
    title: "Landing React + Tailwind",
    shortDescription: "דף נחיתה מהיר וקליל עם Tailwind ו-Next.js",
    description:
      "תבנית נקייה לדף נחיתה עם רכיבי UI, SEO בסיסי ואנימציות קטנות. מושלם לקמפיינים והכרזות.",
    category: "frontend",
    features: [
      "Next.js App Router",
      "Tailwind v4 + dark mode",
      "SEO בסיסי + sitemap",
      "קומפוננטות מוכנות (Hero, Features, CTA)",
    ],
    stack: ["Next.js", "React", "TailwindCSS", "Vercel"],
    priceUSD: 29,
    demoUrl: "/",
    image: "/next.svg",
  },
  {
    slug: "saas-starter-next-firebase",
    title: "SaaS Starter: Next + Firebase",
    shortDescription: "סטארטר פול-סטאק עם לוגין, DB, תמחור ותשלומים",
    description:
      "סטארטר מלא ל-SaaS כולל אימות Firebase, Firestore, שמירת פרופיל משתמש ותמחור עם Checkout (Stripe – בהגדרות).",
    category: "fullstack",
    features: [
      "Auth Firebase (Email/Google)",
      "Firestore + כללי אבטחה בסיסיים",
      "API Routes ב-Next",
      "מבנה תמחור + דפי Billing",
    ],
    stack: ["Next.js", "React", "Firebase", "Vercel", "Stripe"],
    priceUSD: 99,
    demoUrl: "/",
    image: "/next.svg",
  },
];

