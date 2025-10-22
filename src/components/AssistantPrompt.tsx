"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";

const COPY = {
  he: {
    title: "מה אתם רוצים לבנות?",
    subtitle: "ספרו לי בקצרה על המוצר - אצור לכם MVP ותמחור התחלתי.",
    placeholder: "לדוגמה: אפליקציית תורים עם תשלום, לוח בקרה ו-RTL",
    listenIdle: "🎤",
    listenActive: "מקשיב...",
    submitIdle: "קבלו MVP והצעת מחיר",
    submitLoading: "מחשב...",
    speechUnsupported: "זיהוי דיבור לא נתמך בדפדפן הזה.",
    requestError: "שגיאה בקבלת הצעת המחיר. נסו שוב.",
    quoteTitle: "הצעת מחיר ראשונית",
    priceLabel: "טווח מחירים (USD)",
    timelineLabel: "משך מוערך",
    weeksSuffix: "שבועות",
  },
  en: {
    title: "What are you building?",
    subtitle: "Describe the product briefly - I'll outline an MVP and price range.",
    placeholder: "Example: booking app with payments, dashboard, and RTL support",
    listenIdle: "🎤",
    listenActive: "Listening...",
    submitIdle: "Get MVP + estimate",
    submitLoading: "Calculating...",
    speechUnsupported: "Speech recognition is not supported in this browser.",
    requestError: "Could not fetch the estimate. Please try again.",
    quoteTitle: "Initial Estimate",
    priceLabel: "Price range (USD)",
    timelineLabel: "Estimated timeline",
    weeksSuffix: "weeks",
  },
} as const;

type Quote = {
  estimate: { priceRangeUSD: { min: number; max: number }; timelineWeeks: number };
  mvp: string[];
  assumptions: string[];
};

export default function AssistantPrompt() {
  const { locale, direction } = useLanguage();
  const copy = COPY[locale];
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [res, setRes] = React.useState<Quote | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [listening, setListening] = React.useState(false);

  const onSubmit = async () => {
    setLoading(true);
    setErr(null);
    setRes(null);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: value, locale }),
      });
      const json = await response.json();
      if (!json.ok) throw new Error("failed");
      setRes(json);
    } catch (e) {
      setErr(copy.requestError);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const Recognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!Recognition) {
      setErr(copy.speechUnsupported);
      return;
    }
    const rec = new Recognition();
    rec.lang = locale === "he" ? "he-IL" : "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    setListening(true);
    rec.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(" ");
      setValue(transcript);
    };
    rec.onerror = () => {
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
    };
    rec.start();
  };

  return (
    <div className="mx-auto max-w-3xl text-center" dir={direction}>
      <div className="backdrop-blur-md bg-background/80 border rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 p-6">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{copy.title}</h1>
        <p className="mt-3 text-muted-foreground">{copy.subtitle}</p>

        <div
          className={`mt-6 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center ${direction === "rtl" ? "sm:flex-row-reverse" : ""}`}
        >
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={copy.placeholder}
            className="text-center"
            dir={direction}
          />
          <div className={`flex gap-2 ${direction === "rtl" ? "sm:flex-row-reverse" : ""}`}>
            <Button onClick={startListening} variant={listening ? "default" : "ghost"} title={copy.listenIdle}>
              {listening ? copy.listenActive : copy.listenIdle}
            </Button>
            <Button onClick={onSubmit} disabled={loading || !value.trim()}>
              {loading ? copy.submitLoading : copy.submitIdle}
            </Button>
          </div>
        </div>

        {err && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{err}</p>}

        {res && (
          <Card className={`mt-6 p-5 ${direction === "rtl" ? "text-right" : "text-left"}`}>
            <h2 className="text-xl font-semibold">{copy.quoteTitle}</h2>
            <p className="mt-2 text-sm">
              {copy.priceLabel}: {res.estimate.priceRangeUSD.min.toLocaleString()}-{res.estimate.priceRangeUSD.max.toLocaleString()}
            </p>
            <p className="text-sm">
              {copy.timelineLabel}: {res.estimate.timelineWeeks} {copy.weeksSuffix}
            </p>
            <div className="mt-4">
              <h3 className="font-medium">MVP</h3>
              <ul className={`${direction === "rtl" ? "mr-5" : "ml-5"} list-disc text-sm mt-1 space-y-1`}>
                {res.mvp.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3 text-xs text-muted-foreground space-y-1">
              {res.assumptions.map((assumption, index) => (
                <div key={index}>{assumption}</div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
