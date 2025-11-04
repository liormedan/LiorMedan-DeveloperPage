"use client";
import * as React from "react";
import ProjectCard from "@/components/ProjectCard";
import { projectsByLocale } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const LABELS = {
  he: {
    all: "הכול",
    heading: "פרויקטים נבחרים",
    subheading: "מדגימים תהליכי עבודה נקיים, דגש על ביצועים וחוויית משתמש ב-RTL ובאנגלית.",
  },
  en: {
    all: "All",
    heading: "Featured Projects",
    subheading: "Showcasing clean delivery, performance focus, and great UX in both Hebrew and English.",
  },
} as const;

export default function ProjectsPage() {
  const { locale, direction } = useLanguage();
  const labels = LABELS[locale];
  const projects = projectsByLocale[locale];
  const [tag, setTag] = React.useState<string | null>(null);
  const filtered = tag ? projects.filter((p) => p.tags?.includes(tag)) : projects;
  const allTags = React.useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags ?? []))).sort(),
    [projects],
  );

  return (
    <div className="container-fluid py-8" dir={direction}>
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{labels.heading}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{labels.subheading}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button
          variant={tag === null ? "default" : "ghost"}
          size="sm"
          onClick={() => setTag(null)}
        >
          {labels.all}
        </Button>
        {allTags.map((t) => (
          <Button
            key={t}
            variant={tag === t ? "default" : "ghost"}
            size="sm"
            onClick={() => setTag(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <div
            key={p.title}
            className="opacity-0 translate-y-2 animate-[fade-in_300ms_ease-out_forwards]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <ProjectCard {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}
