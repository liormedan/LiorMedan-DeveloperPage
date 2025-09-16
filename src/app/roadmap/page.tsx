"use client";
import * as React from "react";
import SemiAnnualTimeline from "@/components/SemiAnnualTimeline";
import { roadmapData } from "@/data/roadmap";
import PageTransition from "@/components/PageTransition";
import { motion, useInView } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card"; // Re-import Card

// Component for a single month's section
function RoadmapMonth({ monthData }: { monthData: typeof roadmapData[0] }) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="py-16 relative border rounded-lg my-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="text-center mb-8">
        <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight">{monthData.title}</motion.h2>
      </div>

      <div className="relative flex flex-col items-center">
        <Accordion type="single" collapsible className="w-full max-w-4xl">
          <AccordionItem value={`item-${monthData.month}`}>
            <AccordionTrigger className="text-lg md:text-xl font-semibold text-center">{monthData.project}</AccordionTrigger>
            <AccordionContent>
              {/* Display tasks as "mind map bubbles" (Cards) */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-4xl mx-auto">
                {monthData.tasks.map((task, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <Card
                      className="p-6 h-full bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer border-0"
                      style={{ boxShadow: '0 2px 12px 0 rgba(33,150,243,0.15)' }}
                    >
                      <span className="text-center text-xl font-semibold select-none">
                        {task.title}
                      </span>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  );
}

// Main page component
export default function RoadmapPage() {
  return (
    <PageTransition>
      <div className="container-fluid py-8" dir="rtl">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">מפת דרכים לפיתוח</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            זוהי תוכנית הפיתוח שלי ל-6 החודשים הקרובים, המציגה את כל המשימות, הפרויקטים והיעדים המרכזיים בכל חודש.
          </p>
        </div>
        <SemiAnnualTimeline />
      </div>
    </PageTransition>
  );
}
