"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type Direction = "rtl" | "ltr";

type LanguageContextValue = {
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const STORAGE_KEY = "portfolio-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const urlLocale = new URLSearchParams(window.location.search).get("lang");
    if (urlLocale === "he" || urlLocale === "en") {
      return urlLocale;
    }
  } catch {
    // ignore invalid URLs
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "he" || stored === "en") {
      return stored;
    }
  } catch {
    // storage disabled
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("he")) {
    return "he";
  }

  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(resolveInitialLocale());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, locale);
      } catch {
        // storage disabled
      }
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.get("lang") !== locale) {
          url.searchParams.set("lang", locale);
          window.history.replaceState(null, "", url.toString());
        }
      } catch {
        // ignore malformed URL or history restrictions
      }
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "he" ? "en" : "he"));
  }, []);

  const direction: Direction = locale === "he" ? "rtl" : "ltr";

  const value = useMemo(
    () => ({ locale, direction, setLocale, toggleLocale }),
    [locale, direction, setLocale, toggleLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
