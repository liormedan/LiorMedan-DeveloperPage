"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Home, FolderOpen, Map, Mail, ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

type NavKey =
  | "home"
  | "roadmap"
  | "projects"
  | "about"
  | "contact";

type BaseLink = {
  href: string;
  key: NavKey;
  icon: typeof Home;
};

const NAV_LINKS: BaseLink[] = [
  { href: "/", key: "home", icon: Home },
  { href: "/about", key: "about", icon: UserRound },
  { href: "/roadmap", key: "roadmap", icon: Map },
  { href: "/projects", key: "projects", icon: FolderOpen },
  { href: "/contact", key: "contact", icon: Mail },
];

const NAV_LABELS: Record<NavKey, { he: string; en: string }> = {
  home: { he: "עמוד הבית", en: "Home" },
  roadmap: { he: "מפת דרכים", en: "Roadmap" },
  projects: { he: "פרויקטים", en: "Projects" },
  about: { he: "אודות", en: "About" },
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

  // Resizable sidebar state
  const MIN = 56; // compact width (w-14)
  // reduced default width to roughly half the original (was 320)
  const DEFAULT = 160;
  const MAX = 800;
  const STORAGE_KEY = "lm.sidebar.v1";

  const [width, setWidth] = React.useState<number>(DEFAULT);
  const [isResizing, setIsResizing] = React.useState(false);
  const [prevWidth, setPrevWidth] = React.useState<number | null>(null);
  const handleRef = React.useRef<HTMLDivElement | null>(null);

  // Initialize from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { width?: number };
        if (parsed?.width) setWidth(Math.max(MIN, Math.min(MAX, parsed.width)));
      }
    } catch {
      // ignore
    }
  }, []);

  // persist width
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ width }));
    } catch {
      // ignore
    }
  }, [width]);

  // expose the current sidebar width to CSS so the layout can reserve space
  // for the fixed sidebar (prevents content from being covered). Uses the
  // --sidebar-width CSS variable which is read by global styles.
  React.useEffect(() => {
    try {
      document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
    } catch {
      // ignore (SSR won't have document)
    }
  }, [width]);

  // pointer handlers
  React.useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (!isResizing) return;
      // calculate width from the anchored edge depending on direction
      const bodyRect = document.body.getBoundingClientRect();
      const newWidth = direction === "rtl" ? Math.round(bodyRect.right - e.clientX) : Math.round(e.clientX - bodyRect.left);
      setWidth(Math.max(MIN, Math.min(MAX, newWidth)));
    }

    function onPointerUp() {
      if (!isResizing) return;
      setIsResizing(false);
      document.body.style.userSelect = "";
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [isResizing, direction]);

  // keyboard quick controls (Alt+Arrow / Alt+0)
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!e.altKey) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        setWidth((cur) => {
          const delta = e.key === "ArrowRight" ? 20 : -20;
          return Math.max(MIN, Math.min(MAX, cur + delta));
        });
      } else if (e.key === "0") {
        setWidth(DEFAULT);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // toggle compact/expanded
  function toggleCompact() {
    if (width <= MIN + 8) {
      // expand to previous or default
      setWidth(prevWidth ?? DEFAULT);
      setPrevWidth(null);
    } else {
      setPrevWidth(width);
      setWidth(MIN);
    }
  }
  const anchoredLeft = direction === "ltr";

  const asideContent = (
    <aside
      className={`flex flex-col items-stretch ${anchoredLeft ? "border-r" : "border-l"} bg-background/90 backdrop-blur`}
      style={{ width: width, minWidth: MIN, maxWidth: MAX, transition: isResizing ? "none" : "width .12s" }}
    >
      <div className="flex items-center justify-between h-14 w-full border-b px-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-semibold text-sm" title={labels.brandLabel} aria-label={labels.brandLabel}>
            LM
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={width <= MIN + 8 ? "פתח תפריט" : "סגור תפריט"}
            title={width <= MIN + 8 ? "פתח תפריט" : "סגור תפריט"}
            onClick={toggleCompact}
            className="p-2 rounded hover:bg-accent/20 flex items-center justify-center"
          >
            {direction === "rtl" ? (
              width <= MIN + 8 ? (
                <ChevronLeft size={16} />
              ) : (
                <ChevronRight size={16} />
              )
            ) : width <= MIN + 8 ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 py-2 w-full overflow-auto" dir={direction}>
        <NavList mode={width <= MIN + 8 ? "compact" : width < 220 ? "expanded" : "expanded"} links={localizedLinks} direction={direction} />
      </div>

      <div className="mt-auto w-full p-2">
        <div className="flex items-center justify-center gap-1">
          <ThemeToggle />
        </div>
        <Separator className="my-2" />
      </div>
    </aside>
  );

  const handleElem = (
    <div
      ref={handleRef}
      role="separator"
      aria-orientation="vertical"
      title="גרור לשינוי רוחב"
      onPointerDown={(e) => {
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setIsResizing(true);
        document.body.style.userSelect = "none";
      }}
      className="flex items-center justify-center select-none"
      style={{ width: 10, cursor: "ew-resize" }}
    >
      <div style={{ width: 4, height: 40, background: "rgba(255,255,255,0.03)", borderRadius: 2 }} />
    </div>
  );

  return (
    <>
      {/* Desktop: resizable sidebar (only on xl and up to give tablets the compact menu) */}
      <div className={`hidden xl:flex fixed top-0 bottom-0 z-40 items-stretch ${anchoredLeft ? "left-0" : "right-0"}`} style={{ pointerEvents: "auto" }}>
        {anchoredLeft ? (
          <>
            {asideContent}
            {handleElem}
          </>
        ) : (
          <>
            {handleElem}
            {asideContent}
          </>
        )}
      </div>

      {/* Mobile / tablet sheet trigger */}
      <div className={`xl:hidden fixed top-4 z-50 ${direction === "rtl" ? "right-4" : "left-4"}`}>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="secondary">
              {labels.menu}
            </Button>
          </SheetTrigger>
          <SheetContent
            side={direction === "rtl" ? "right" : "left"}
            className="w-[min(18rem,calc(100vw-3rem))]"
            dir={direction}
          >
            <SheetTitle className="sr-only">{labels.menu}</SheetTitle>
            <div className="flex items-center justify-between mb-3">
              <Link href="/" className="font-semibold" onClick={() => {}}>
                {labels.menu}
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
            <NavList links={localizedLinks} onNavigate={() => {}} direction={direction} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
