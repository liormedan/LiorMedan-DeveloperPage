"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Result = {
  goal: string;
  deadline: string;
  features: string;
  budget: string;
  estimate: { weeks: number; range: string };
  mvpOutline: string[];
};

export default function BriefBuilder() {
  const [goal, setGoal] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [features, setFeatures] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [res, setRes] = React.useState<Result | null>(null);

  const build = () => {
    // naive heuristics for demo
    const featCount = features.split(/,|\n/).filter((s) => s.trim().length > 0).length || 1;
    const baseWeeks = Math.min(12, Math.max(2, featCount * 1.5));
    const range = budget && /\d/.test(budget) ? budget : "$3k–$10k";
    const outline = [
      "איסוף דרישות + אפיון MVP",
      "UI זריז + רכיבי בסיס",
      "פיצ׳רי ליבה + אינטגרציות",
      "בדיקות, ביצועים והשקה",
    ];
    setRes({ goal, deadline, features, budget, estimate: { weeks: Math.round(baseWeeks), range }, mvpOutline: outline });
  };

  const shareText = res
    ? `בריף קצר:\nמטרה: ${res.goal}\nדדליין: ${res.deadline}\nפיצ׳רים: ${res.features}\nתקציב: ${res.budget}\nהערכה: ${res.estimate.weeks} שבועות, ${res.estimate.range}`
    : "";

  return (
    <Card className="p-4 text-right">
      <div className="grid gap-3">
        <label className="text-sm">מה המטרה?</label>
        <Textarea dir="rtl" placeholder="תאר בקצרה את היעד" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <label className="text-sm">דדליין מוערך</label>
        <Input dir="rtl" placeholder="למשל: 6–8 שבועות / תאריך יעד" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <label className="text-sm">פיצ׳רים ליבה</label>
        <Textarea dir="rtl" placeholder="הפרד בפסיקים או בשורות" value={features} onChange={(e) => setFeatures(e.target.value)} />
        <label className="text-sm">תקציב משוער</label>
        <Input dir="rtl" placeholder="לדוגמה: $5k–$12k" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="secondary" onClick={() => { setGoal(""); setDeadline(""); setFeatures(""); setBudget(""); setRes(null); }}>נקה</Button>
          <Button onClick={build}>בנה הערכה</Button>
        </div>
      </div>

      {res && (
        <div className="mt-4 space-y-2">
          <h3 className="font-medium">הערכת התחלה</h3>
          <p className="text-sm text-muted-foreground">זמן: {res.estimate.weeks} שבועות · טווח: {res.estimate.range}</p>
          <div className="text-sm">
            <div className="font-medium">MVP:</div>
            <ul className="list-disc mr-5 mt-1">
              {res.mvpOutline.map((x, i) => (<li key={i}>{x}</li>))}
            </ul>
          </div>
          <div className="flex gap-2 mt-2">
            <a className="text-sm underline" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer">שלח ב‑WhatsApp</a>
            <a className="text-sm underline" href={`mailto:?subject=${encodeURIComponent("בריף קצר")} &body=${encodeURIComponent(shareText)}`}>שלח במייל</a>
          </div>
        </div>
      )}
    </Card>
  );
}

