"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import * as React from "react";

const LABELS = {
  he: {
    aria: "החלף שפה לאנגלית",
  },
  en: {
    aria: "Switch language to Hebrew",
  },
} as const;

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();
  const { aria } = LABELS[locale];
  const isHebrew = locale === "he";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={aria}
      className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-input hover:bg-input/80"
      role="switch"
      aria-checked={isHebrew}
    >
      <span className="sr-only">{aria}</span>
      {/* Toggle thumb */}
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-md ring-0 transition-transform duration-200 ease-in-out ${
          isHebrew ? "translate-x-7" : "translate-x-1"
        }`}
      />
      {/* Labels */}
      <span
        className={`absolute left-1.5 text-[9px] font-semibold transition-opacity duration-200 ${
          isHebrew ? "opacity-30" : "opacity-70"
        }`}
      >
        EN
      </span>
      <span
        className={`absolute right-1.5 text-[9px] font-semibold transition-opacity duration-200 ${
          isHebrew ? "opacity-70" : "opacity-30"
        }`}
      >
        ע
      </span>
    </button>
  );
}
