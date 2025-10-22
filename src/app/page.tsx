"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import { useLanguage } from "@/lib/i18n/language-context";

const COPY = {
  he: {
    title: "היי! אני ליאור מדן",
    subtitle:
      "אני בונה חוויות web מודרניות עם React ו-Python. אשמח לעזור לכם להוציא לפועל את הפרויקט הבא שלכם בעזרת תכנון מדויק, תהליך שקוף ותוצרים שמייצרים אימפקט.",
    cta: "ראו פרויקטים",
  },
  en: {
    title: "Hi, I’m Lior Medan",
    subtitle:
      "I craft modern web experiences with React and Python. Let’s bring your next project to life with clear planning, transparent delivery, and products that make an impact.",
    cta: "View Projects",
  },
} as const;

export default function HomePage() {
  const { locale, direction } = useLanguage();
  const content = COPY[locale];

  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden" dir={direction}>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_55%)]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            {content.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {content.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/projects">{content.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
