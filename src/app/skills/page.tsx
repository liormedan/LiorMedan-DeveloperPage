"use client";
import Link from "next/link";
import { skills, SkillCategory } from "@/data/skills";
import { Card } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import HeroThree from "@/components/HeroThree";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

const categories: SkillCategory[] = [
  "Core",
  "React & Next.js",
  "UI & Styling",
  "3D & Graphics",
  "Backend & Database",
  "Tooling & DevOps",
];

const COPY = {
  he: {
    heading: "Stack טכנולוגי",
    subheading:
      "אוסף הכלים שמלווה אותי בבניית אפליקציות מודרניות — מהבסיס ועד לתלת-ממד ול-DevOps.",
  },
  en: {
    heading: "Tech stack & skills",
    subheading:
      "The toolkit I rely on to build modern products — from core web fundamentals to 3D and DevOps.",
  },
} as const;

export default function SkillsPage() {
  const { locale, direction } = useLanguage();
  const labels = COPY[locale];

  return (
    <PageTransition>
      <div className="relative" dir={direction}>
        <div className="absolute inset-0 opacity-50">
          <HeroThree backgroundOnly autoRotate />
        </div>
        <div className="relative container-fluid py-8">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight capitalize">{labels.heading}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">{labels.subheading}</p>
          </div>

          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-xl font-semibold mb-4 text-center">{category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <Link key={skill.name} href={skill.url} target="_blank" rel="noopener noreferrer">
                        <Card className="p-4 h-full flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow hover:bg-accent/50">
                          <p className="font-semibold text-sm">{skill.name}</p>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground mt-1" />
                        </Card>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
