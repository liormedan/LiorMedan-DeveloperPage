import { notFound } from "next/navigation";
import DiagramFlow from "@/components/DiagramFlow";
import { cases } from "@/data/cases";

export default function CasePage({ params }: { params: { slug: string } }) {
  const data = cases.find((c) => c.slug === params.slug);
  if (!data) return notFound();

  return (
    <div className="container-fluid py-10">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      {data.subtitle && <p className="text-muted-foreground mt-1">{data.subtitle}</p>}

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">הבעיה</h2>
        <p className="text-sm">תיאור קצר של אתגר/מטרה מוצרית וטכנית, הקשר עסקי, אילוצים.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">הפתרון</h2>
        <p className="text-sm">החלטות ארכיטקטורה, בחירות טכנולוגיות ונימוקים, תרשים זרימה.</p>
        <div className="mt-4"><DiagramFlow /></div>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">תהליך</h2>
        <ul className="list-disc mr-6 text-sm space-y-1">
          <li>איפיון ו‑KPIs</li>
          <li>אב טיפוס מהיר</li>
          <li>קיט UI ומדיניות תנועה</li>
          <li>הקשחת ביצועים ונגישות</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">תוצאה</h2>
        <p className="text-sm">מדדים (Lighthouse, TTFB, שיפורי DX), תובנות וסיכום.</p>
      </section>
    </div>
  );
}

