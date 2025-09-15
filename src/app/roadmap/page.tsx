"use client";
import * as React from "react";
import { roadmapData } from "@/data/roadmap";
import { Card } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import { motion, useInView } from "framer-motion";

// SVG component for the connecting lines
const ConnectorLine = ({ from, to }: { from: React.RefObject<HTMLDivElement>; to: React.RefObject<HTMLDivElement> }) => {
  const [path, setPath] = React.useState("");
  const ref = React.useRef<SVGSVGElement>(null);

  React.useLayoutEffect(() => {
    const updatePath = () => {
      if (from.current && to.current && ref.current) {
        const fromRect = from.current.getBoundingClientRect();
        const toRect = to.current.getBoundingClientRect();
        const svgRect = ref.current.getBoundingClientRect();

        const startX = fromRect.left + fromRect.width / 2 - svgRect.left;
        const startY = fromRect.top + fromRect.height / 2 - svgRect.top;
        const endX = toRect.left + toRect.width / 2 - svgRect.left;
        const endY = toRect.top + toRect.height / 2 - svgRect.top;

        // Simple curved path
        setPath(`M ${startX},${startY} C ${startX},${(startY + endY) / 2} ${endX},${(startY + endY) / 2} ${endX},${endY}`);
      }
    };

    updatePath();
    const ro = new ResizeObserver(updatePath);
    if (from.current) ro.observe(from.current);
    if (to.current) ro.observe(to.current);
    window.addEventListener("resize", updatePath);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [from, to]);

  return (
    <svg ref={ref} className="absolute inset-0 w-full h-full pointer-events-none">
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

// Component for a single month's section
const RoadmapMonth = ({ monthData }: { monthData: typeof roadmapData[0] }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const projectRef = React.useRef<HTMLDivElement>(null);
  const taskRefs = React.useRef<(HTMLDivElement | null)[]>([]);
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
      className="py-16 relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="text-center mb-8">
        <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight">{monthData.title}</motion.h2>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Project Node */}
        <motion.div ref={projectRef} variants={itemVariants}>
          <Card className="p-4 md:p-6 bg-primary/10 border-primary/50 shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold text-center">{monthData.project}</h3>
          </Card>
        </motion.div>

        {/* Task Nodes */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full max-w-4xl">
          {monthData.tasks.map((task, index) => (
            <motion.div
              key={index}
              ref={(el) => (taskRefs.current[index] = el)}
              variants={itemVariants}
            >
              <Card className="p-3 h-full text-center text-sm hover:shadow-md transition-shadow">
                {task.title}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Connectors */}
        {isInView && (
          <>
            {monthData.tasks.map((_, index) => (
              <ConnectorLine key={index} from={projectRef} to={{ current: taskRefs.current[index] }} />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

// Main page component
export default function RoadmapPage() {
  return (
    <PageTransition>
      <div className="container-fluid py-8" dir="rtl">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">מפת דרכים לפיתוח</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            זוהי תוכנית הפיתוח שלי ל-6 החודשים הקרובים, המציגה את הפרויקטים והמשימות המרכזיות בכל חודש.
          </p>
        </div>

        <div className="border-t">
          {roadmapData.map((monthData) => (
            <div key={monthData.month} className="border-b">
              <RoadmapMonth monthData={monthData} />
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
