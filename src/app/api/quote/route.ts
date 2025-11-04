import { NextRequest } from "next/server";
import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from "@/lib/i18n/config";

type QuoteReq = { query: string; locale?: string };

type Copy = {
  baseMvp: string[];
  realtime: string;
  payment: string;
  ai: string;
  three: string;
  assumptions: string[];
};

const COPY: Record<Locale, Copy> = {
  he: {
    baseMvp: [
      "אימות משתמשים עם Email/OAuth ותהליך הצטרפות מאובטח",
      "דשבורד ניהול עם מדדים וחתך לפי תפקיד",
      "טפסי איסוף נתונים עם ולידציה בצד הלקוח והשרת",
      "ממשק RTL מלא עם עיצוב רספונסיבי",
      "תהליך דיפלוי אוטומטי ל-Vercel עם מעקב אחרי שגיאות",
    ],
    realtime: "ערוץ תקשורת בזמן אמת (WebSocket) לעדכונים חיים",
    payment: "חיבור Stripe לניהול חיובים והפקת חשבוניות",
    ai: "חיבור API לשירות AI כולל שמירת מצבים ושמירה על פרטיות",
    three: "סצנת Three.js אינטראקטיבית עם ביצועים מותאמים",
    assumptions: [
      "היקף MVP ממוקד ושאינו כולל פיתוח נייטיב",
      "שיתוף פעולה הדוק עם בעל המוצר לקבלת החלטות בזמן",
      "תהליך QA ותיקוף לפני כל דיפלוי משמעותי",
    ],
  },
  en: {
    baseMvp: [
      "User auth with Email/OAuth and a secure onboarding flow",
      "Operations dashboard with role-based metrics",
      "Data collection forms with client/server validation",
      "Fully responsive UI with RTL support",
      "Automated Vercel deploy pipeline with error tracking",
    ],
    realtime: "Real-time channel (WebSocket) for live updates",
    payment: "Stripe integration for billing and invoicing",
    ai: "AI service integration with session persistence and privacy guards",
    three: "Interactive Three.js scene with tuned performance",
    assumptions: [
      "MVP scope stays focused without native app work",
      "Close collaboration with the product owner for fast decisions",
      "QA and verification cycle before each major deploy",
    ],
  },
};

function resolveLocale(input?: string): Locale {
  if (!input) return DEFAULT_LOCALE;
  const normalized = input.toLowerCase();
  const match = SUPPORTED_LOCALES.find((loc) => loc === normalized);
  return match ?? DEFAULT_LOCALE;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<QuoteReq>;
  const locale = resolveLocale(body.locale);
  const copy = COPY[locale];
  const q = (body.query || "").toString().slice(0, 2000);

  let base = 2500; // USD
  let weeks = 2;

  const add = (amt: number, w: number) => {
    base += amt;
    weeks += w;
  };
  const has = (s: string) => q.toLowerCase().includes(s);

  if (has("mobile") || has("android") || has("ios")) add(3000, 4);
  if (has("realtime") || has("websocket") || has("live")) add(1500, 2);
  if (has("payment") || has("billing") || has("stripe")) add(1800, 2);
  if (has("ai") || has("ml") || has("openai") || has("llm")) add(2500, 3);
  if (has("dashboard") || has("admin")) add(1200, 1);
  if (has("multilang") || has("rtl") || has("hebrew")) add(800, 1);
  if (has("seo") || has("sitemap")) add(400, 0);
  if (has("native") || has("three") || has("webgl")) add(1500, 2);

  const min = Math.round(base * 0.9);
  const max = Math.round(base * 1.2);

  const mvp = [...copy.baseMvp];

  if (has("realtime")) mvp.push(copy.realtime);
  if (has("payment")) mvp.push(copy.payment);
  if (has("ai")) mvp.push(copy.ai);
  if (has("three") || has("webgl")) mvp.push(copy.three);

  return Response.json({
    ok: true,
    estimate: {
      priceRangeUSD: { min, max },
      timelineWeeks: Math.max(weeks, 2),
    },
    mvp,
    assumptions: copy.assumptions,
    locale,
  });
}
