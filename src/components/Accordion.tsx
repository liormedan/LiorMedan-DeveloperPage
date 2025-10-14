"use client";
import * as React from "react";

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export default function Accordion({ items, allowMultiple = true, defaultOpen = [] }: { items: AccordionItem[]; allowMultiple?: boolean; defaultOpen?: number[] }) {
  const [open, setOpen] = React.useState<Set<number>>(new Set(defaultOpen));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else {
        if (!allowMultiple) next.clear();
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center" dir="rtl">
      {items.map((it, i) => {
        const isOpen = open.has(i);
        const panelId = `acc-panel-${i}`;
        return (
          <div key={i} className="mb-3 rounded-2xl border bg-background/80 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => toggle(i)}
              className="relative w-full flex items-center justify-center px-5 py-5"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {/* Indicator pinned to the right (RTL-friendly) */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground select-none" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
              <span className="text-3xl sm:text-4xl font-semibold text-center inline-block">
                {it.title}
              </span>
            </button>
            <div
              id={panelId}
              data-title={it.title}
              className="px-5 overflow-hidden transition-[max-height,opacity] duration-200"
              style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <div className="acc-body pb-4 text-base sm:text-lg text-muted-foreground text-center">
                {it.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
