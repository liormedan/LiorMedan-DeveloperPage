"use client";
import * as React from "react";
import type { AssistOutput } from "@/lib/assistSchema";
import DiagramFlow from "@/components/DiagramFlow";

type Props = { data: AssistOutput };

export default function AssistRender({ data }: Props) {
  const totalWeeks = data.estimate?.timeline_weeks || data.plan?.phases?.reduce((a, p) => a + (p?.weeks || 0), 0) || 8;

  return (
    <div className="space-y-10">
      {/* Scope */}
      <section>
        <h2 className="text-2xl font-bold mb-2">סקופ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <List title="יעדים" items={data.scope.goals} />
          <List title="משתמשים" items={data.scope.users} />
          <UseCases title="Use‑Cases" cases={data.scope.use_cases} />
        </div>
      </section>

      {/* Architecture */}
      <section>
        <h2 className="text-2xl font-bold mb-2">ארכיטקטורה</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <List title="מודולים" items={data.architecture.modules.map((m) => `${m.name}: ${m.responsibilities.join(", ")}`)} />
          {data.architecture.services && <List title="שירותים" items={data.architecture.services.map((s) => `${s.name}${s.type ? ` (${s.type})` : ""}`)} />}
          {data.architecture.integrations && <List title="אינטגרציות" items={data.architecture.integrations.map((i) => `${i.name}${i.purpose ? ` – ${i.purpose}` : ""}`)} />}
        </div>
      </section>

      {/* Data model */}
      <section>
        <h2 className="text-2xl font-bold mb-2">מודל נתונים</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.data.entities.map((e) => (
            <div key={e.name} className="border rounded-lg p-3">
              <div className="font-semibold">{e.name}</div>
              <ul className="mt-2 text-sm space-y-1">
                {e.fields.map((f) => (
                  <li key={f.name} className="text-muted-foreground">
                    <span className="font-mono">{f.name}</span>: {f.type}{f.required ? " *" : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* API */}
      {data.api && (
        <section>
          <h2 className="text-2xl font-bold mb-2">API</h2>
          <div className="space-y-2">
            {data.api.endpoints.map((ep, i) => (
              <div key={i} className="border rounded-lg p-3">
                <div className="font-mono text-sm"><span className="font-bold">{ep.method}</span> {ep.path}</div>
                {ep.summary && <div className="text-sm text-muted-foreground">{ep.summary}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Plan + Gantt */}
      <section>
        <h2 className="text-2xl font-bold mb-2">תוכנית עבודה</h2>
        <div className="space-y-3">
          {data.plan.phases.map((ph, i) => (
            <div key={i} className="border rounded-lg p-3">
              <div className="font-semibold">{ph.name} — {ph.weeks} שבועות</div>
              <ul className="mt-2 text-sm grid gap-1 sm:grid-cols-2">
                {ph.tasks.map((t, j) => (
                  <li key={j}>• {t.title}{typeof t.points === "number" ? ` (${t.points}pt)` : ""}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {data.diagrams?.gantt && <Gantt tasks={data.diagrams.gantt.tasks} totalWeeks={totalWeeks} />}
      </section>

      {/* Diagrams */}
      <section>
        <h2 className="text-2xl font-bold mb-2">דיאגרמות</h2>
        {data.diagrams?.flow && (
          <div className="border rounded-lg p-3">
            <DiagramFlow
              boxes={data.diagrams.flow.nodes.map((n) => ({ id: n.id, label: n.label }))}
              edges={data.diagrams.flow.edges}
            />
          </div>
        )}
        {/* ERD simplified rendering already above in data model */}
      </section>

      {/* Estimate */}
      <section>
        <h2 className="text-2xl font-bold mb-2">הערכה</h2>
        <div className="border rounded-lg p-4">
          <div>טווח מחיר (USD): <strong>{data.estimate.price_range_usd.min.toLocaleString()}–{data.estimate.price_range_usd.max.toLocaleString()}</strong></div>
          <div>זמן כולל: ~{data.estimate.timeline_weeks} שבועות</div>
          <div className="text-sm text-muted-foreground mt-2">הנחות: {data.estimate.assumptions.join(" • ")}</div>
        </div>
      </section>

      {data.clarifying_questions && data.clarifying_questions.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-2">שאלות הבהרה</h2>
          <List items={data.clarifying_questions} />
        </section>
      )}

      {data.risks && data.risks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-2">סיכונים</h2>
          <List items={data.risks} />
        </section>
      )}
    </div>
  );
}

function List({ title, items }: { title?: string; items: string[] }) {
  return (
    <div>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <ul className="text-sm space-y-1 list-disc mr-5">
        {items.map((x, i) => (<li key={i}>{x}</li>))}
      </ul>
    </div>
  );
}

function UseCases({ title, cases }: { title: string; cases: { title: string; as_a?: string; i_want?: string; so_that?: string }[] }) {
  return (
    <div>
      <div className="font-semibold mb-1">{title}</div>
      <ul className="text-sm space-y-2">
        {cases.map((c, i) => (
          <li key={i} className="border rounded p-2">
            <div className="font-medium">{c.title}</div>
            <div className="text-muted-foreground">
              {c.as_a && <span>כ־{c.as_a} • </span>}
              {c.i_want && <span>רוצה {c.i_want} • </span>}
              {c.so_that && <span>כדי {c.so_that}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gantt({ tasks, totalWeeks }: { tasks: { title: string; start_week: number; weeks: number }[]; totalWeeks: number }) {
  const max = Math.max(totalWeeks, ...tasks.map((t) => t.start_week + t.weeks));
  return (
    <div className="mt-4">
      <div className="text-sm text-muted-foreground mb-1">לו"ז (שבועות)</div>
      <div className="border rounded-lg p-3">
        <div className="relative">
          {/* Axis */}
          <div className="grid" style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}>
            {Array.from({ length: max }, (_, i) => (
              <div key={i} className="text-[10px] text-center text-muted-foreground">{i + 1}</div>
            ))}
          </div>
          {/* Bars */}
          <div className="mt-2 space-y-1">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-32 truncate" title={t.title}>{t.title}</div>
                <div className="flex-1">
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}>
                    {Array.from({ length: max }, (_, c) => {
                      const active = c + 1 > t.start_week && c + 1 <= t.start_week + t.weeks;
                      return <div key={c} className={active ? "bg-blue-500/70 h-2 rounded-sm" : "bg-border h-2 rounded-sm"} />;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

