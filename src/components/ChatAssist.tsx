"use client";
import React, { useState } from "react";
import AssistRender from "@/components/AssistRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n/language-context";
import type { AssistOutput } from "@/lib/assistSchema";

type Msg = { role: "user" | "assistant"; content: string };

const COPY = {
  he: {
    instructions: [
      "מה המטרה? תאר בקצרה את היעד",
      "דדליין מוערך (למשל: 6-8 שבועות / תאריך יעד)",
      "פיצ'רים ליבה (הפרד בפסיקים או בשורות)",
      "תקציב משוער (לדוגמה: $5k-$12k)",
    ],
    placeholder: "מה המטרה? דדליין? פיצ'רים? תקציב?",
    assistantReply: "עדכנתי עבורך הערכה ראשונית למטה.",
    clear: "נקה",
    sendIdle: "שלח",
    sendBusy: "שולח...",
    error: "אירעה שגיאה. נסו שוב.",
  },
  en: {
    instructions: [
      "What is the goal? Summarize the outcome",
      "Estimated deadline (e.g. 6-8 weeks / target date)",
      "Core features (comma or line separated)",
      "Budget range (for example: $5k-$12k)",
    ],
    placeholder: "Goal, timeline, core features, budget...",
    assistantReply: "I've prepared an initial estimate below.",
    clear: "Clear",
    sendIdle: "Send",
    sendBusy: "Sending...",
    error: "Something went wrong. Please try again.",
  },
} as const;

export default function ChatAssist() {
  const { locale, direction } = useLanguage();
  const copy = COPY[locale];
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [json, setJson] = useState<AssistOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  type AssistResponse =
    | { ok: true; data: AssistOutput; locale: string }
    | { ok: false; error?: string | null; locale?: string };

  const send = async () => {
    if (!input.trim() || busy) return;
    setBusy(true);
    setError(null);
    const text = input.trim();
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");
    try {
      const response = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, locale }),
      });
      const payload = (await response.json()) as AssistResponse;
      if (!payload.ok) throw new Error(payload.error || "failed");
      setJson(payload.data);
      setMsgs((m) => [...m, { role: "assistant", content: copy.assistantReply }]);
    } catch {
      setError(copy.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl" dir={direction}>
      <div className="backdrop-blur-md bg-background/80 border rounded-2xl p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <div className="text-sm text-muted-foreground mb-3 space-y-1">
          {copy.instructions.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
            direction === "rtl" ? "sm:flex-row-reverse" : ""
          }`}
        >
          <Input
            placeholder={copy.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            dir={direction}
            className="w-full"
          />
          <div
            className={`flex flex-col sm:flex-row gap-2 ${
              direction === "rtl" ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setMsgs([]);
                setJson(null);
                setError(null);
                setInput("");
              }}
              disabled={busy}
              className="w-full sm:w-auto"
            >
              {copy.clear}
            </Button>
            <Button onClick={send} disabled={busy} className="w-full sm:w-auto">
              {busy ? copy.sendBusy : copy.sendIdle}
            </Button>
          </div>
        </div>
        <div className="mt-3 space-y-2 max-h-40 overflow-auto text-sm">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span
                className={
                  m.role === "user"
                    ? "bg-primary/10 px-2 py-1 rounded inline-block"
                    : "text-muted-foreground inline-block"
                }
              >
                {m.content}
              </span>
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
