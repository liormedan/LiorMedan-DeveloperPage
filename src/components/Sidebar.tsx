"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, FolderOpen, Layers, Map, FileText, MessagesSquare, Mail, Boxes } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

type NavKey =
  | "home"
  | "roadmap"
  | "projects"
  | "skills"
  | "templates"
  | "quote"
  | "principles"
  | "contact";

type BaseLink = {
  href: string;
  key: NavKey;
  icon: typeof Home;
};

const NAV_LINKS: BaseLink[] = [
  { href: "/", key: "home", icon: Home },
  { href: "/roadmap", key: "roadmap", icon: Map },
  { href: "/projects", key: "projects", icon: FolderOpen },
  { href: "/skills", key: "skills", icon: Layers },
  { href: "/templates", key: "templates", icon: Boxes },
  { href: "/quote", key: "quote", icon: MessagesSquare },
  { href: "/principles", key: "principles", icon: FileText },
  { href: "/contact", key: "contact", icon: Mail },
];

const NAV_LABELS: Record<NavKey, { he: string; en: string }> = {
  home: { he: "עמוד הבית", en: "Home" },
  roadmap: { he: "מפת דרכים", en: "Roadmap" },
  projects: { he: "פרויקטים", en: "Projects" },
  skills: { he: "כישורים", en: "Skills" },
  templates: { he: "תבניות", en: "Templates" },
  quote: { he: "הצעת מחיר", en: "Request Quote" },
  principles: { he: "עקרונות", en: "Principles" },
  contact: { he: "צור קשר", en: "Contact" },
};

const META_TEXT = {
  he: {
    brandLabel: "עמוד הבית",
    menu: "תפריט",
  },
  en: {
    brandLabel: "Home",
    menu: "Menu",
  },
} as const;

type LocalizedLink = BaseLink & { label: string };

type NavMode = "compact" | "expanded" | "responsive";

function NavList({
  links,
  direction,
  onNavigate,
  mode = "responsive",
}: {
  links: LocalizedLink[];
  direction: "rtl" | "ltr";
  onNavigate?: () => void;
  mode?: NavMode;
}) {
  const pathname = usePathname();
  return (
    <nav className="mt-4 space-y-1" dir={direction}>
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="block group/nav relative"
            title={label}
            aria-label={label}
          >
            {mode === "compact" ? (
              <div
                data-active={active ? "true" : undefined}
                className="mx-2 my-1 flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent/40 data-[active=true]:bg-accent/60"
              >
                <Icon size={18} className="opacity-90" />
                <div className="absolute right-full mr-2 hidden group/nav:hover:block">
                  <div className="whitespace-nowrap rounded-md bg-popover text-popover-foreground shadow px-2 py-1 text-xs border">
                    {label}
                  </div>
                </div>
              </div>
            ) : mode === "expanded" ? (
              <div
                data-active={active ? "true" : undefined}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/40 data-[active=true]:bg-accent/60"
              >
                <Icon size={18} className="opacity-80" />
                <span>{label}</span>
              </div>
            ) : (
              <div
                data-active={active ? "true" : undefined}
                className="mx-1 my-1 flex items-center rounded-md p-2 transition-colors hover:bg-accent/40 data-[active=true]:bg-accent/60"
              >
                <Icon size={18} className="opacity-90" />
                <span className="ml-2 text-sm whitespace-nowrap opacity-0 translate-x-2 transition-all duration-150 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 hidden group-hover/sidebar:inline">
                  {label}
                </span>
                <div className="absolute right-full mr-2 group-hover/sidebar:hidden hidden group/nav:hover:block">
                  <div className="whitespace-nowrap rounded-md bg-popover text-popover-foreground shadow px-2 py-1 text-xs border">
                    {label}
                  </div>
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const { locale, direction } = useLanguage();
  const labels = META_TEXT[locale];

  const localizedLinks = React.useMemo<LocalizedLink[]>(
    () =>
      NAV_LINKS.map((link) => ({
        ...link,
        label: NAV_LABELS[link.key][locale],
      })),
    [locale],
  );

  return (
    <>
      <aside className="hidden lg:flex fixed top-0 bottom-0 right-0 z-40 w-14 flex-col items-stretch border-l bg-background/90 backdrop-blur">
        <div className="flex items-center justify-center h-14 w-full border-b">
          <Link href="/" className="font-semibold text-sm" title={labels.brandLabel} aria-label={labels.brandLabel}>
            LM
          </Link>
        </div>
        <div className="flex-1 py-2 w-full">
          <NavList mode="compact" links={localizedLinks} direction={direction} />
        </div>
        <div className="mt-auto w-full p-2">
          <div className="flex items-center justify-center gap-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <Separator className="my-2" />
          <div className="text-center">
            <span className="text-[10px] text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="secondary">
              {labels.menu}
            </Button>
          </SheetTrigger>
          <SheetContent side={direction === "rtl" ? "right" : "left"} className="w-72" dir={direction}>
            <div className="flex items-center justify-between mb-3">
              <Link href="/" className="font-semibold" onClick={() => {}}>
                {labels.menu}
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
            <NavList links={localizedLinks} onNavigate={() => {}} direction={direction} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
