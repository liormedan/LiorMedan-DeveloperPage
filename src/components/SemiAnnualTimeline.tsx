import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { roadmapByLocale } from "@/data/roadmap";
import { useLanguage } from "@/lib/i18n/language-context";
import React from "react";

export default function SemiAnnualTimeline() {
  const { locale } = useLanguage();
  const roadmapData = roadmapByLocale[locale];
  const [current, setCurrent] = React.useState(0);
  const [fade, setFade] = React.useState(false);
  const item = roadmapData[current];
  const monthsCount = roadmapData.length;

  // מעבר עם fade קצר
  const goTo = (idx: number) => {
    if (idx === current) return;
    setFade(true);
    setTimeout(() => {
      setCurrent(idx);
      setFade(false);
    }, 180);
  };

  return (
    <div style={{ direction: "rtl", textAlign: "right" }}>
      <div className="flex flex-col items-center w-full px-1 md:px-0">
        <div className="w-full max-w-md rounded-2xl shadow bg-background border border-border p-2 md:p-4 flex flex-col items-center">
          <div className="flex flex-row items-center gap-2 mb-4 mt-1 select-none">
            {roadmapData.map((_, idx) => (
              <button
                key={idx}
                aria-label={`עבור לחודש ${idx + 1}`}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200 mx-0.5
                  bg-background border-border shadow
                  ${current === idx ? 'scale-105 ring-2 ring-primary' : 'opacity-80'}
                `}
                onClick={() => goTo(idx)}
                style={{ outline: 'none' }}
              >
                <span className={`text-center w-full font-bold select-none
                  text-foreground ${current === idx ? 'text-base md:text-lg' : 'text-sm md:text-base'}
                `}>
                  חודש {idx + 1}
                </span>
              </button>
            ))}
          </div>
          <div className="mb-1 text-blue-200 text-xs font-semibold">
            חודש {current + 1} מתוך {monthsCount}
          </div>
          <div className={`w-full max-w-sm transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`} key={current}>
            <div className="w-full flex flex-col items-center justify-center mb-1">
              <span className="font-bold text-lg text-white text-center tracking-wide" style={{letterSpacing: '0.5px'}}>{item.title}</span>
            </div>
            <div className="!p-0 !bg-transparent !text-white !text-base !font-bold flex items-center gap-1 justify-center text-center min-h-[32px]">
              <span className="w-full block text-center">{item.project}</span>
            </div>
            <div className="flex flex-col gap-2 mt-2 w-full max-h-[55vh] overflow-y-auto pr-1">
              <Accordion type="single" collapsible>
                {item.tasks.map((task, i) => (
                  <AccordionItem value={`task-${i}`} key={i} className="border-0 bg-transparent">
                    <AccordionCardTrigger>
                      <Card
                        className="p-2 flex flex-col items-center border border-border rounded-lg shadow bg-muted w-full text-foreground cursor-pointer hover:bg-muted/80 transition"
                        style={{ marginRight: 0, minWidth: 0 }}
                      >
                        <div className="w-full px-2 py-2 font-bold text-base text-center tracking-tight bg-transparent">
                          {task.title}
                        </div>
                      </Card>
                    </AccordionCardTrigger>
                    <AccordionContent className="w-full px-4 pb-4">
                      {task.details ? (
                        <div className="text-sm text-muted-foreground text-center leading-relaxed">
                          {task.details}
                        </div>
                      ) : null}
                    </AccordionContent>
                    {i < item.tasks.length - 1 && (
                      <hr className="w-2/3 border-blue-300 my-3 opacity-60 mx-auto" />
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div style={{textAlign:'center', marginTop:32, color:'#2563eb', fontWeight:600, fontSize:16}}>
            © 2025 ליאור מדן. נבנה עם Next.js + Tailwind + shadcn/ui.
          </div>
        </div>
      </div>
    </div>
  );
}

// Trigger component that makes the whole card clickable for Accordion
function AccordionCardTrigger({ children }: { children: React.ReactNode }) {
  // @ts-ignore - Radix Accordion expects a button, but we want div for full area
  return (
    <div role="button" tabIndex={0} className="w-full outline-none" data-accordion-trigger="true">
      {children}
    </div>
  );
}
