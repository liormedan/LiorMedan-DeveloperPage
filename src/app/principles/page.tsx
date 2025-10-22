"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";

const COPY = {
  he: {
    heading: "כללים חשובים בעבודה שלי",
    subtitle:
      "שקיפות, תכנון ודיוק בירידה לפרטים הקטנים. כך אני מבטיח שהפרויקטים יוצאים לדרך בצורה חלקה.",
    items: [
      {
        title: "Less is more",
        body:
          "אני מחפש את הפתרון הפשוט ביותר שעונה על הצורך. סילוק עומס עיצובי ותהליכי ניהול מיותרים מקצר את הדרך לתוצאה.",
      },
      {
        title: "טכנולוגיה חדשה טובה כשהיא פשוטה",
        body:
          "אני בוחר כלים חדשים רק כשהם מפשטים את המערכת ולא מסבכים אותה - כדי שהצוות יוכל לעבוד מהר ובביטחון.",
      },
      {
        title: "דרך סוקרטס",
        body:
          "שאלות מדויקות מביאות לתשובות מדויקות. אני משקיע בלזקק את הבריף לפני שמתחילים לבנות כדי להבטיח תוצרים חזקים ומדידים.",
      },
    ],
  },
  en: {
    heading: "Principles that guide my work",
    subtitle:
      "Transparency, planning, and relentless attention to detail - so every project launches smoothly.",
    items: [
      {
        title: "Less is more",
        body:
          "I look for the simplest solution that still solves the need. Removing visual noise and process overhead shortens the path to impact.",
      },
      {
        title: "New tech must stay simple",
        body:
          "I adopt new tools only when they make the system easier, not more complex - so the whole team can move fast with confidence.",
      },
      {
        title: "The Socratic method",
        body:
          "Sharp questions unlock sharp answers. I refine the brief before building to guarantee strong, measurable outcomes.",
      },
    ],
  },
} as const;

function PrinciplesPageInner() {
  const search = useSearchParams();
  const p3 = search?.get("p3")?.trim();
  const { locale, direction } = useLanguage();
  const content = COPY[locale];

  return (
    <div className="container-fluid py-10" dir={direction}>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold">{content.heading}</h1>
        <p className="mt-3 text-muted-foreground">{content.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item, index) => (
          <Card key={index} className={`p-5 ${direction === "rtl" ? "text-right" : "text-left"}`}>
            <div className="text-sm text-muted-foreground">{index + 1}</div>
            <h2 className="mt-1 text-xl font-semibold">
              {p3 && index === 2 ? `${item.title} (${p3})` : item.title}
            </h2>
            {item.body && <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function PrinciplesPage() {
  return (
    <React.Suspense fallback={null}>
      <PrinciplesPageInner />
    </React.Suspense>
  );
}
