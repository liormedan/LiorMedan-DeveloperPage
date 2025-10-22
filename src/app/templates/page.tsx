"use client";
import * as React from "react";
import { templatesByLocale, type TemplateCategory } from "@/data/templates";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const LABELS = {
  he: {
    heading: "תבניות מוכנות להאצת פרויקטים",
    subheading:
      "בחרו תבנית כדי להניח בסיס מקצועי ולהאיץ את זמן הפיתוח. כל תבנית כוללת קוד נקי, תיעוד ומסלול הטמעה ב-Vercel.",
    all: "הכול",
    categories: {
      frontend: "ממשק פרונט-אנד",
      fullstack: "מוצר מלא",
    },
    stackSeparator: " · ",
    pricePrefix: "$",
  },
  en: {
    heading: "Production-ready templates",
    subheading:
      "Pick a template to fast-track delivery. Every kit ships with clean code, docs, and a Vercel deployment path.",
    all: "All",
    categories: {
      frontend: "Frontend",
      fullstack: "Full Stack",
    },
    stackSeparator: " · ",
    pricePrefix: "$",
  },
} as const;

export default function TemplatesPage() {
  const { locale, direction } = useLanguage();
  const labels = LABELS[locale];
  const [cat, setCat] = React.useState<TemplateCategory | null>(null);
  const templates = templatesByLocale[locale];
  const filtered = cat ? templates.filter((t) => t.category === cat) : templates;

  return (
    <div className="container-fluid py-8" dir={direction}>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-3xl font-semibold">{labels.heading}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{labels.subheading}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button
          variant={cat === null ? "default" : "ghost"}
          size="sm"
          onClick={() => setCat(null)}
        >
          {labels.all}
        </Button>
        {(Object.keys(labels.categories) as TemplateCategory[]).map((key) => (
          <Button
            key={key}
            variant={cat === key ? "default" : "ghost"}
            size="sm"
            onClick={() => setCat(key)}
          >
            {labels.categories[key]}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.slug} className="block">
            <Card className="overflow-hidden h-full">
              {t.image ? (
                <div
                  className="h-36 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.image})` }}
                  aria-hidden
                />
              ) : null}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold truncate">{t.title}</h3>
                  <Badge variant="secondary">{labels.categories[t.category]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.shortDescription}</p>
                <div className="mt-auto flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate max-w-[70%]">
                    {t.stack.join(labels.stackSeparator)}
                  </span>
                  <span className="font-medium">
                    {labels.pricePrefix}
                    {t.priceUSD}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
