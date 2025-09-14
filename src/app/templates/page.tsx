"use client";
import * as React from "react";
import Link from "next/link";
import { templates, type TemplateCategory } from "@/data/templates";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories: { key: TemplateCategory; label: string }[] = [
  { key: "frontend", label: "תבניות פרונט" },
  { key: "fullstack", label: "פרונט + בקאנד" },
];

export default function TemplatesPage() {
  const [cat, setCat] = React.useState<TemplateCategory | null>(null);
  const filtered = cat ? templates.filter((t) => t.category === cat) : templates;

  return (
    <div className="container-fluid py-8" dir="rtl">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold">תבניות מוכנות לקנייה</h1>
        <p className="text-muted-foreground">
          תבניות מסודרות לפי קטגוריות: פרונט בלבד או פרונט+בקאנד. ניתן לצפות בפרטים ולרכוש.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={cat === null ? "default" : "ghost"}
          size="sm"
          onClick={() => setCat(null)}
        >
          הכל
        </Button>
        {categories.map((c) => (
          <Button
            key={c.key}
            variant={cat === c.key ? "default" : "ghost"}
            size="sm"
            onClick={() => setCat(c.key)}
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Link key={t.slug} href={`/templates/${t.slug}`} className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              {t.image ? (
                <div
                  className="h-36 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.image})` }}
                />
              ) : null}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold truncate">{t.title}</h3>
                  <Badge variant="secondary">
                    {t.category === "frontend" ? "פרונט" : "פול-סטאק"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {t.shortDescription}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground truncate max-w-[70%]">
                    {t.stack.join(" · ")}
                  </div>
                  <div className="font-medium">${""}{t.priceUSD}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

