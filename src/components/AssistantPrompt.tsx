"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Quote = {
  estimate: { priceRangeUSD: { min: number; max: number }; timelineWeeks: number };
  mvp: string[];
  assumptions: string[];
};

export default function AssistantPrompt() {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [res, setRes] = React.useState<Quote | null>(null);
  const [err, setErr] = React.useState<string | null>(null);
  const [listening, setListening] = React.useState(false);

  const onSubmit = async () => {
    setLoading(true); setErr(null); setRes(null);
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: value }) });
      const j = await r.json();
      if (!j.ok) throw new Error("failed");
      setRes(j);
    } catch (e: any) {
      setErr("שגיאה בקבלת הצעת המחיר. נסו שוב.");
    } finally { setLoading(false); }
  };

  // Web Speech API (best-effort)
  const startListening = () => {
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { setErr("דיבור לזיהוי אינו נתמך בדפדפן." ); return; }
    const rec = new SR();
    rec.lang = "he-IL";
    rec.interimResults = true;
    rec.continuous = false;
    setListening(true);
    rec.onresult = (e: any) => {
      const t = Array.from(e.results).map((r: any) => r[0].transcript).join(" ");
      setValue(t);
    };
    rec.onerror = () => { setListening(false); };
    rec.onend = () => { setListening(false); };
    rec.start();
  };

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="backdrop-blur-md bg-background/80 border rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 p-6">
        <h1 className="text-3xl sm:text-5xl font-bold">מה אתם רוצים לבנות?</h1>
        <p className="mt-3 text-muted-foreground">ספרו לי בקצרה על המוצר — אצור לכם MVP ותמחור התחלתי.</p>

      <div className="mt-6 flex gap-2 items-center">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="לדוגמה: אפליקציית מוצרים עם תשלום, לוח בקרה ו‑RTL"
          className="text-center"
        />
        <Button onClick={startListening} variant={listening ? "default" : "ghost"} title="דברו איתי">
          {listening ? "מקשיב..." : "🎤"}
        </Button>
        <Button onClick={onSubmit} disabled={loading || !value.trim()}>
          {loading ? "חישוב..." : "קבלו MVP והצעת מחיר"}
        </Button>
      </div>

      {err && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{err}</p>}

      {res && (
        <Card className="mt-6 text-right p-5">
          <h2 className="text-xl font-semibold">הצעת מחיר ראשונית</h2>
          <p className="mt-2 text-sm">טווח מחירים (USD): {res.estimate.priceRangeUSD.min.toLocaleString()}–{res.estimate.priceRangeUSD.max.toLocaleString()}</p>
          <p className="text-sm">זמן משוער: {res.estimate.timelineWeeks} שבועות</p>
          <div className="mt-4">
            <h3 className="font-medium">MVP:</h3>
            <ul className="list-disc mr-5 text-sm mt-1">
              {res.mvp.map((x, i) => (<li key={i}>{x}</li>))}
            </ul>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            {res.assumptions.join(" • ")}
          </div>
        </Card>
      )}
      </div>
    </div>
  );
}
