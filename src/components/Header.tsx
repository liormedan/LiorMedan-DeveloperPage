"use client";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "בית" },
  { href: "/projects", label: "פרויקטים" },
  { href: "/skills", label: "כישורים" },
];

export default function Header() {
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement | null>(null);
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const linkRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [underline, setUnderline] = React.useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const prevMagnetRef = React.useRef<HTMLAnchorElement | null>(null);
  const rafMagnet = React.useRef<number | null>(null);
  const pendingTransform = React.useRef<{ el: HTMLAnchorElement; x: number; y: number } | null>(null);

  // Scroll effects: header state + progress bar
  React.useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 8);
      const doc = document.documentElement;
      const max = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.max(0, Math.min(1, y / max));
      setProgress(Math.round(pct * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!prefersReduced) {
      // Also update on resize for progress correctness (rarely needed)
      window.addEventListener("resize", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Active underline slider
  const recalcUnderline = React.useCallback(() => {
    const nav = navRef.current;
    const el = linkRefs.current[pathname] ?? null;
    if (!nav || !el) {
      setUnderline({ left: 0, width: 0 });
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const left = box.left - navBox.left;
    const width = box.width;
    setUnderline({ left, width });
  }, [pathname]);

  React.useEffect(() => {
    recalcUnderline();
    const ro = new ResizeObserver(recalcUnderline);
    const nav = navRef.current;
    if (nav) ro.observe(nav);
    window.addEventListener("resize", recalcUnderline);
    return () => {
      window.removeEventListener("resize", recalcUnderline);
      ro.disconnect();
    };
  }, [recalcUnderline]);

  // Magnetic hover: translate hovered link 1–2px toward cursor
  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const applyTransform = () => {
      rafMagnet.current = null;
      const payload = pendingTransform.current;
      if (!payload) return;
      const { el, x, y } = payload;
      el.style.transform = `translate(${x}px, ${y}px)`;
      pendingTransform.current = null;
    };

    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('a[data-nav-link="true"]') as HTMLAnchorElement | null;
      const all = Object.values(linkRefs.current).filter(Boolean) as HTMLAnchorElement[];
      if (!target) {
        // reset previous
        if (prevMagnetRef.current) prevMagnetRef.current.style.transform = "";
        prevMagnetRef.current = null;
        return;
      }
      if (prevMagnetRef.current && prevMagnetRef.current !== target) {
        prevMagnetRef.current.style.transform = "";
      }
      prevMagnetRef.current = target;

      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      const x = dx * 2; // up to 2px
      const y = dy * 1; // up to 1px

      pendingTransform.current = { el: target, x, y };
      if (rafMagnet.current == null) rafMagnet.current = requestAnimationFrame(applyTransform);
    };

    const onLeave = () => {
      if (prevMagnetRef.current) prevMagnetRef.current.style.transform = "";
      prevMagnetRef.current = null;
    };

    nav.addEventListener("mousemove", onMove, { passive: true });
    nav.addEventListener("mouseleave", onLeave);
    return () => {
      nav.removeEventListener("mousemove", onMove as any);
      nav.removeEventListener("mouseleave", onLeave);
      if (prevMagnetRef.current) prevMagnetRef.current.style.transform = "";
      if (rafMagnet.current) cancelAnimationFrame(rafMagnet.current);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled ? "true" : undefined}
      className="sticky top-0 z-50 backdrop-blur border-b transition-all duration-200"
      style={{
        backgroundColor: scrolled ? "color-mix(in oklab, var(--color-background) 90%, transparent)" : "color-mix(in oklab, var(--color-background) 70%, transparent)",
      }}
    >
      {/* Top progress bar */}
      <div className="absolute left-0 top-0 h-0.5 bg-primary/70" style={{ width: `${progress}%` }} />
      <div className="container-fluid flex items-center justify-between h-14 relative">
        <Link href="/" className="font-semibold">ליאור // Portfolio</Link>
        <NavigationMenu>
          <div className="hidden sm:flex relative" ref={navRef}>
          <NavigationMenuList className="flex">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink asChild className="px-3 py-2 text-sm hover:underline">
                    <Link
                      href={l.href}
                      ref={(node) => { linkRefs.current[l.href] = node; }}
                      className="transition-colors relative"
                      data-nav-link="true"
                      data-active={isActive ? "true" : undefined}
                    >
                      {l.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
          {/* Active underline slider */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 h-[2px] bg-primary transition-[transform,width] duration-200"
            style={{ width: `${underline.width}px`, transform: `translateX(${underline.left}px)` }}
          />
          </div>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm"><Link href="/contact">דברו איתי</Link></Button>
        </div>
      </div>
      {/* Hairline gradient divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
}
