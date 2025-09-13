"use client";
import * as React from "react";
import AssistRender from "@/components/AssistRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatAssist() {
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>([]);
  const [json, setJson] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const send = async () => {
    if (!input.trim()) return;
    setBusy(true); setError(null);
    const text = input.trim();
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");
    try {
      const r = await fetch("/api/assist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: text }) });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "failed");
      setJson(j.data);
      setMsgs((m) => [...m, { role: "assistant", content: "יצרתי איפיון ראשוני, תרשימים והערכה — גללו מטה." }]);
    } catch (e: any) {
      setError("שגיאה בקבלת מענה מהמודל.");
    } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="backdrop-blur-md bg-background/80 border rounded-2xl p-4 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <div className="flex items-center gap-2">
          <Input placeholder="תארו בקצרה מה תרצו לבנות" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
          <Button onClick={send} disabled={busy}>{busy ? "חישוב..." : "שליחה"}</Button>
        </div>
        <div className="mt-3 space-y-2 max-h-40 overflow-auto text-sm">
          {msgs.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <span className={m.role === 'user' ? 'bg-primary/10 px-2 py-1 rounded' : 'text-muted-foreground'}>{m.content}</span>
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
