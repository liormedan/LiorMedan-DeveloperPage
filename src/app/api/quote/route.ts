import { NextRequest } from "next/server";

type QuoteReq = { query: string };

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<QuoteReq>;
  const q = (body.query || "").toString().slice(0, 2000);

  // Basic heuristic estimator (stub for a future LLM call)
  let base = 2500; // USD
  let weeks = 2;

  const add = (amt: number, w: number) => { base += amt; weeks += w; };
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

  const mvp: string[] = [
    "Auth בסיסי (Email/OAuth) + ניהול פרופיל",
    "מסד נתונים סכמטי ראשוני + דגמי נתונים",
    "עמוד/ים מרכזיים לזרימת הערך הראשית",
    "UI נקי ב‑RTL + מובייל רספונסיבי",
    "תיעוד קצר להטמעה/הרחבה והעלאה ל‑Vercel",
  ];

  if (has("realtime")) mvp.push("ערוץ רילטיים (WS) לאירועים מרכזיים");
  if (has("payment")) mvp.push("חיבור Stripe לתשלום בסיסי");
  if (has("ai")) mvp.push("API לוגיקה עם מודל AI (plug) + Prompt guards");
  if (has("three") || has("webgl")) mvp.push("וויזואליזציה תלת ממדית בסיסית עם Three.js");

  return Response.json({
    ok: true,
    estimate: {
      priceRangeUSD: { min, max },
      timelineWeeks: Math.max(weeks, 2),
    },
    mvp,
    assumptions: [
      "הערכת מחיר גסה — כפופה לאיפיון קצר",
      "פיצ'רים מתקדמים/אינטגרציות עשויים לשנות הטווח",
      "תמחור כולל QA בסיסי והעלאה ל‑Vercel",
    ],
  });
}

