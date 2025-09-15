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
    shortDescription: "תבנית לדף נחיתה ב‑Next.js ו‑Tailwind — מהירה ונגישה.",
    description:
      "תבנית מודרנית לדף נחיתה עם רכיבי UI, SEO מובנה ופריסת סקשנים (Hero, Features, CTA). אידאלית למוצרים, שירותים או קמפיינים.",
    category: "frontend",
    features: [
      "Next.js App Router",
      "Tailwind v4 + מצב כהה",
      "SEO וסייטמאפ מובנים",
      "רכיבי דף נפוצים (Hero, Features, CTA)",
    ],
    stack: ["Next.js", "React", "TailwindCSS", "Vercel"],
    priceUSD: 29,
    demoUrl: "/",
    image: "/next.svg",
  },
  {
    slug: "saas-starter-next-firebase",
    title: "SaaS Starter: Next + Firebase",
    shortDescription: "סטארטר מלא ל‑SaaS עם אימות, מסד נתונים וגביית תשלומים.",
    description:
      "סטארטר שלם ל‑SaaS עם Firebase, Firestore ו‑API Routes ב‑Next. כולל אינטגרציית Checkout (Stripe) והגדרות חיוב למשתמשים.",
    category: "fullstack",
    features: [
      "אימות Firebase (Email/Google)",
      "Firestore + מודל נתונים בסיסי",
      "API Routes של Next",
      "ניהול משתמשים וחיוב (Billing)",
    ],
    stack: ["Next.js", "React", "Firebase", "Vercel", "Stripe"],
    priceUSD: 99,
    demoUrl: "/",
    image: "/next.svg",
  },
];

