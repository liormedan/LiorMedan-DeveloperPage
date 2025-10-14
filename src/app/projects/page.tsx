"use client";
import * as React from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags ?? []))).sort();

export default function ProjectsPage() {
  const [tag, setTag] = React.useState<string | null>(null);
  const filtered = tag ? projects.filter((p) => p.tags?.includes(tag)) : projects;

  return (
    <div className="container-fluid py-8" dir="rtl">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={tag === null ? "default" : "ghost"}
          size="sm"
          onClick={() => setTag(null)}
        >
          הכל
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

