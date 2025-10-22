"use client";

import { useLanguage } from "@/lib/i18n/language-context";

const FOOTER_TEXT = {
  he: {
    line: "© {year} ליאור מדן. בנוי עם Next.js + Tailwind + shadcn/ui.",
  },
  en: {
    line: "© {year} Lior Medan. Built with Next.js + Tailwind + shadcn/ui.",
  },
} as const;

export default function Footer() {
  const { locale, direction } = useLanguage();
  const template = FOOTER_TEXT[locale];
  const line = template.line.replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="border-t border-border">
      <div className="container-fluid py-6 text-sm text-muted-foreground" dir={direction}>
        {line}
      </div>
    </footer>
  );
}
