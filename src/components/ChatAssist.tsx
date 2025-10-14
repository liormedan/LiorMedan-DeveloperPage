"use client";
import React, { useState } from "react";
import AssistRender from "@/components/AssistRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatAssist() {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [json, setJson] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    if (!input.trim() || busy) return;
    setBusy(true);
    setError(null);
    const text = input.trim();
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");
    try {
      const r = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "failed");
      setJson(j.data);
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "עדכנתי עבורך הערכה ראשונית למטה." },
      ]);
    } catch (e) {
      setError("אירעה שגיאה. נסה שוב.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl" dir="rtl">
      <div className="backdrop-blur-md bg-background/80 border rounded-2xl p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <div className="text-sm text-muted-foreground mb-3">
          <div>מה המטרה? תאר בקצרה את היעד</div>
          <div>דדליין מוערך (למשל: 6–8 שבועות / תאריך יעד)</div>
          <div>פיצ׳רים ליבה (הפרד בפסיקים או בשורות)</div>
          <div>תקציב משוער (לדוגמה: $5k–$12k)</div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="מה המטרה? דדליין? פיצ׳רים? תקציב?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
          <Button
            variant="secondary"
            onClick={() => {
              setMsgs([]);
              setJson(null);
              setError(null);
              setInput("");
            }}
            disabled={busy}
          >
            נקה
          </Button>
          <Button onClick={send} disabled={busy}>
            {busy ? "שולח..." : "שלח"}
          </Button>
        </div>
        <div className="mt-3 space-y-2 max-h-40 overflow-auto text-sm">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span className={m.role === "user" ? "bg-primary/10 px-2 py-1 rounded" : "text-muted-foreground"}>{m.content}</span>
            </div>
          ))}
          {error && <div className="text-red-600 dark:text-red-400">{error}</div>}
        </div>
      </div>

      {json && (
        <div className="mt-6">
          <AssistRender data={json} />
        </div>
      )}
    </div>
  );
}
