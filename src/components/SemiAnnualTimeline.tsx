import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import { roadmapData } from "@/data/roadmap";
import React from "react";

export default function SemiAnnualTimeline() {
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
      <div className="flex flex-col items-center w-full px-2 md:px-0">
  <div className="w-full max-w-3xl rounded-3xl shadow-xl bg-background border border-border p-6 md:p-10 flex flex-col items-center">
          <div className="flex flex-row items-center gap-2 mb-6 mt-2 select-none">
            {roadmapData.map((_, idx) => (
              <button
                key={idx}
                aria-label={`עבור לחודש ${idx + 1}`}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center transition-all duration-200 mx-1
                  bg-background border-border shadow-md
                  ${current === idx ? 'scale-110 ring-2 ring-primary' : 'opacity-80'}
                `}
                onClick={() => goTo(idx)}
                style={{ outline: 'none' }}
              >
                <span className={`text-center w-full font-bold select-none
                  text-foreground ${current === idx ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
                `}>
                  חודש {idx + 1}
                </span>
              </button>
            ))}
            {/* חיצים הוסרו לפי בקשת המשתמש */}
          </div>
          <div className="mb-2 text-blue-200 text-sm font-semibold">
            חודש {current + 1} מתוך {monthsCount}
          </div>
          <div className={`w-full max-w-2xl transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`} key={current}>
            <div className="w-full flex flex-col items-center justify-center mb-2">
              <span className="font-bold text-2xl text-white text-center tracking-wide" style={{letterSpacing: '0.5px'}}>{item.title}</span>
            </div>
            <div className="!p-0 !bg-transparent !text-white !text-xl !font-bold flex items-center gap-2 justify-center text-center min-h-[48px]">
              <span className="w-full block text-center">{item.project}</span>
            </div>
            <div className="flex flex-col gap-4 mt-4 w-full">
              <Accordion type="single" collapsible>
                {item.tasks.map((task, i) => (
                  <AccordionItem value={`task-${i}`} key={i} className="border-0 bg-transparent">
                    <AccordionCardTrigger>
                      <Card
                        className="p-0 flex flex-col items-center border border-border rounded-xl shadow-lg bg-muted w-full text-foreground cursor-pointer hover:bg-muted/80 transition"
                        style={{ marginRight: 0, minWidth: 0 }}
                      >
                        <div className="w-full px-4 py-4 font-bold text-lg text-center tracking-tight bg-transparent">
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
