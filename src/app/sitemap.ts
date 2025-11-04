import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const STATIC_PATHS: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> =
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
    { path: "/roadmap", priority: 0.7, changeFrequency: "monthly" },
    { path: "/quote", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.5, changeFrequency: "monthly" },
  ];

function withLocaleQuery(path: string, locale: string) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}lang=${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_PATHS.map(({ path, priority, changeFrequency }) => {
    const url = `${BASE_URL}${path}`;
    const languages = Object.fromEntries(
      SUPPORTED_LOCALES.map((locale) => [locale, `${BASE_URL}${withLocaleQuery(path, locale)}`]),
    );

    return {
      url,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
