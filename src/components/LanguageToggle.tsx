"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const LABELS = {
  he: {
    current: "עברית",
    next: "English",
    aria: "החלף שפה לאנגלית",
  },
  en: {
    current: "English",
    next: "עברית",
    aria: "Switch language to Hebrew",
  },
} as const;

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();
  const { current, next, aria } = LABELS[locale];

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 px-2"
      onClick={toggleLocale}
      aria-label={aria}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-medium">{current}</span>
      <span aria-hidden="true" className="text-muted-foreground">/</span>
      <span className="text-xs text-muted-foreground">{next}</span>
    </Button>
  );
}
