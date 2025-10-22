"use client";
import * as React from "react";
import type { AssistOutput } from "@/lib/assistSchema";
import DiagramFlow from "@/components/DiagramFlow";
import { useLanguage } from "@/lib/i18n/language-context";

type Props = { data: AssistOutput };

type Copy = {
  headings: {
    scope: string;
    architecture: string;
    dataModel: string;
    plan: string;
    diagrams: string;
    estimate: string;
    questions: string;
    risks: string;
  };
  scope: {
    goals: string;
    users: string;
    useCases: string;
    asA: string;
    iWant: string;
    soThat: string;
  };
  architecture: {
    modules: string;
    services: string;
    integrations: string;
  };
  plan: {
    weeksSuffix: string;
    bulletPrefix: string;
    ganttLabel: string;
  };
  estimate: {
    price: string;
    timeline: string;
    assumptionsLabel: string;
    separator: string;
  };
  weeksLabel: string;
};

const COPY: Record<"he" | "en", Copy> = {
  he: {
    headings: {
      scope: "מסגרת עבודה",
      architecture: "ארכיטקטורה",
      dataModel: "מודל נתונים",
      plan: "תכנית ביצוע",
      diagrams: "דיאגרמות",
      estimate: "הערכה",
      questions: "שאלות הבהרה",
      risks: "סיכונים",
    },
    scope: {
      goals: "מטרות",
      users: "משתמשים",
      useCases: "Use Cases",
      asA: "כ-",
      iWant: "אני רוצה",
      soThat: "כדי",
    },
    architecture: {
      modules: "מודולים",
      services: "שירותים",
      integrations: "אינטגרציות",
    },
    plan: {
      weeksSuffix: "שבועות",
      bulletPrefix: "-",
      ganttLabel: "ציר שבועות",
    },
    estimate: {
      price: "טווח מחיר (USD)",
      timeline: "משך מוערך",
      assumptionsLabel: "הנחות",
      separator: " - ",
    },
    weeksLabel: "שבועות",
  },
  en: {
    headings: {
      scope: "Scope",
      architecture: "Architecture",
      dataModel: "Data model",
      plan: "Delivery plan",
      diagrams: "Diagrams",
      estimate: "Estimate",
      questions: "Clarifying questions",
      risks: "Risks",
    },
    scope: {
      goals: "Goals",
      users: "Users",
      useCases: "Use cases",
      asA: "As a",
      iWant: "I want",
      soThat: "so that",
    },
    architecture: {
      modules: "Modules",
      services: "Services",
      integrations: "Integrations",
    },
    plan: {
      weeksSuffix: "weeks",
      bulletPrefix: "-",
      ganttLabel: "Timeline (weeks)",
    },
    estimate: {
      price: "Price range (USD)",
      timeline: "Timeline",
      assumptionsLabel: "Assumptions",
      separator: " - ",
    },
    weeksLabel: "weeks",
  },
};

export default function AssistRender({ data }: Props) {
  const { locale, direction } = useLanguage();
  const copy = COPY[locale];
  const totalWeeks =
    data.estimate?.timeline_weeks || data.plan?.phases?.reduce((acc, phase) => acc + (phase?.weeks || 0), 0) || 8;

  return (
    <div className="space-y-10" dir={direction}>
      <Section title={copy.headings.scope}>
        <div className="grid gap-4 sm:grid-cols-3">
          <List title={copy.scope.goals} items={data.scope.goals} direction={direction} />
          <List title={copy.scope.users} items={data.scope.users} direction={direction} />
          <UseCases
            title={copy.scope.useCases}
            cases={data.scope.use_cases}
            labels={{ asA: copy.scope.asA, iWant: copy.scope.iWant, soThat: copy.scope.soThat }}
            direction={direction}
          />
        </div>
      </Section>

      <Section title={copy.headings.architecture}>
        <div className="grid gap-4 sm:grid-cols-3">
          <List
            title={copy.architecture.modules}
            items={data.architecture.modules.map((m) => `${m.name}: ${m.responsibilities.join(", ")}`)}
            direction={direction}
          />
          {data.architecture.services && (
            <List
              title={copy.architecture.services}
              items={data.architecture.services.map((service) => `${service.name}${service.type ? ` (${service.type})` : ""}`)}
              direction={direction}
            />
          )}
          {data.architecture.integrations && (
            <List
              title={copy.architecture.integrations}
              items={data.architecture.integrations.map((integration) => `${integration.name}${integration.purpose ? ` - ${integration.purpose}` : ""}`)}
              direction={direction}
            />
          )}
        </div>
      </Section>

      <Section title={copy.headings.dataModel}>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.data.entities.map((entity) => (
            <div key={entity.name} className="border rounded-lg p-3">
              <div className="font-semibold">{entity.name}</div>
              <ul className={`mt-2 text-sm space-y-1 ${direction === "rtl" ? "mr-2" : "ml-2"}`}>
                {entity.fields.map((field) => (
                  <li key={field.name} className="text-muted-foreground">
                    <span className="font-mono">{field.name}</span>: {field.type}
                    {field.required ? " *" : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {data.api && (
        <Section title="API">
          <div className="space-y-2">
            {data.api.endpoints.map((endpoint, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="font-mono text-sm">
                  <span className="font-bold">{endpoint.method}</span> {endpoint.path}
                </div>
                {endpoint.summary && <div className="text-sm text-muted-foreground">{endpoint.summary}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title={copy.headings.plan}>
        <div className="space-y-3">
          {data.plan.phases.map((phase, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="font-semibold">
                {phase.name} - {phase.weeks} {copy.plan.weeksSuffix}
              </div>
              <ul className="mt-2 text-sm grid gap-1 sm:grid-cols-2">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    {copy.plan.bulletPrefix} {task.title}
                    {typeof task.points === "number" ? ` (${task.points}pt)` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {data.diagrams?.gantt && (
          <Gantt tasks={data.diagrams.gantt.tasks} totalWeeks={totalWeeks} label={copy.plan.ganttLabel} direction={direction} />
        )}
      </Section>

      <Section title={copy.headings.diagrams}>
        {data.diagrams?.flow && (
          <div className="border rounded-lg p-3">
            <DiagramFlow
              boxes={data.diagrams.flow.nodes.map((node) => ({ id: node.id, label: node.label }))}
              edges={data.diagrams.flow.edges}
            />
          </div>
        )}
      </Section>

      <Section title={copy.headings.estimate}>
        <div className="border rounded-lg p-4 space-y-1">
          <div>
            {copy.estimate.price}: <strong>{data.estimate.price_range_usd.min.toLocaleString()}-{data.estimate.price_range_usd.max.toLocaleString()}</strong>
          </div>
          <div>
            {copy.estimate.timeline}: ~{data.estimate.timeline_weeks} {copy.weeksLabel}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {copy.estimate.assumptionsLabel}: {data.estimate.assumptions.join(copy.estimate.separator)}
          </div>
        </div>
      </Section>

      {data.clarifying_questions && data.clarifying_questions.length > 0 && (
        <Section title={copy.headings.questions}>
          <List items={data.clarifying_questions} direction={direction} />
        </Section>
      )}

      {data.risks && data.risks.length > 0 && (
        <Section title={copy.headings.risks}>
          <List items={data.risks} direction={direction} />
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {children}
    </section>
  );
}

function List({ title, items, direction }: { title?: string; items: string[]; direction: "rtl" | "ltr" }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <div>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <ul className={`text-sm space-y-1 list-disc ${direction === "rtl" ? "mr-5" : "ml-5"}`}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function UseCases({
  title,
  cases,
  labels,
  direction,
}: {
  title: string;
  cases: { title: string; as_a?: string; i_want?: string; so_that?: string }[];
  labels: { asA: string; iWant: string; soThat: string };
  direction: "rtl" | "ltr";
}) {
  if (!cases || cases.length === 0) {
    return null;
  }
  return (
    <div>
      <div className="font-semibold mb-1">{title}</div>
      <ul className="text-sm space-y-2">
        {cases.map((c, i) => (
          <li key={i} className="border rounded p-2">
            <div className="font-medium">{c.title}</div>
            <div className="text-muted-foreground">
              {c.as_a && <span>{labels.asA} {c.as_a} </span>}
              {c.i_want && <span>{labels.iWant} {c.i_want} </span>}
              {c.so_that && <span>{labels.soThat} {c.so_that}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gantt({
  tasks,
  totalWeeks,
  label,
  direction,
}: {
  tasks: { title: string; start_week: number; weeks: number }[];
  totalWeeks: number;
  label: string;
  direction: "rtl" | "ltr";
}) {
  if (!tasks || tasks.length === 0) {
    return null;
  }
  const max = Math.max(totalWeeks, ...tasks.map((task) => task.start_week + task.weeks));
  return (
    <div className="mt-4">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className="border rounded-lg p-3">
        <div className="relative space-y-2">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}>
            {Array.from({ length: max }, (_, index) => (
              <div key={index} className="text-[10px] text-center text-muted-foreground">
                {index + 1}
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-32 truncate" title={task.title}>
                  {task.title}
                </div>
                <div className="flex-1">
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${max}, minmax(0, 1fr))` }}>
                    {Array.from({ length: max }, (_, column) => {
                      const active = column + 1 > task.start_week && column + 1 <= task.start_week + task.weeks;
                      return (
                        <div
                          key={column}
                          className={active ? "bg-blue-500/70 h-2 rounded-sm" : "bg-border h-2 rounded-sm"}
                        />
                      );
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
