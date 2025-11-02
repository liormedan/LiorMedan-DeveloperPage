"use client";

import React from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n/language-context";

export default function TopLeftControls() {
  const { direction } = useLanguage();
  const inlineAnchorClass = direction === "rtl" ? "left-4" : "right-4";

  return (
    <div
      className={`fixed z-50 flex items-center gap-3 bg-transparent ${inlineAnchorClass}`}
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
    >
      <LanguageToggle />
      <div className="hidden sm:block text-xs text-muted-foreground">© {new Date().getFullYear()}</div>
    </div>
  );
}
