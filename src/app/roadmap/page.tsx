"use client";
import * as React from "react";
import { roadmapByLocale } from "@/data/roadmap";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Circle,
  Calendar,
  Target,
  Code,
  Palette,
  Rocket,
  Database,
  Settings,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

const LABELS = {
  he: {
    monthLabel: "חודש",
    completed: "בוצע",
    current: "עכשיו",
    headerTitle: "מפת דרכים ספטמבר 2025 עד פברואר 2026",
    headerSubtitle:
      "מסע של שישה חודשים שמציג את התכנון, ההטמעה והמסירה — כך נראה תהליך בנייה מקצועי ומדויק.",
    instructions: "אפשר לנווט בחצים במקלדת או בלחיצה על הנקודות.",
    prev: "הקודם",
    next: "הבא",
  },
  en: {
    monthLabel: "Month",
    completed: "Done",
    current: "Now",
    headerTitle: "Six-Month Roadmap",
    headerSubtitle:
      "A six-month journey covering strategy, implementation, and delivery — the way I run professional builds.",
    instructions: "Navigate with keyboard arrows or tap the progress dots.",
    prev: "Previous",
    next: "Next",
  },
} as const;

type IconMatch = {
  test: (text: string) => boolean;
  icon: typeof Code;
};

const ICON_MATCHERS: IconMatch[] = [
  { test: (text) => /next\.js|typescript/i.test(text), icon: Code },
  { test: (text) => /tailwind|design|ui/i.test(text), icon: Palette },
  { test: (text) => /vercel|deploy|ci\/cd/i.test(text), icon: Rocket },
  { test: (text) => /database|cms|supabase|firebase/i.test(text), icon: Database },
  { test: (text) => /performance|optimization|code splitting|monitor/i.test(text), icon: Settings },
  { test: (text) => /ai|assistant|llm|bot/i.test(text), icon: Bot },
];

function resolveIcon(title: string) {
  const match = ICON_MATCHERS.find(({ test }) => test(title));
  if (!match) return Circle;
  return match.icon;
}

function useRoadmapNavigation(length: number) {
  const [currentMonth, setCurrentMonth] = React.useState(0);

  const nextMonth = React.useCallback(() => {
    setCurrentMonth((prev) => (prev + 1) % length);
  }, [length]);

  const prevMonth = React.useCallback(() => {
    setCurrentMonth((prev) => (prev - 1 + length) % length);
  }, [length]);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextMonth();
      }
      if (event.key === "ArrowLeft") {
        prevMonth();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextMonth, prevMonth]);

  return { currentMonth, setCurrentMonth, nextMonth, prevMonth };
}

function SingleMonthView({
  monthData,
  index,
  labels,
  direction,
}: {
  monthData: (typeof roadmapByLocale.he)[number];
  index: number;
  labels: typeof LABELS.he | typeof LABELS.en;
  direction: "rtl" | "ltr";
}) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isCompleted = index < 2;
  const isCurrent = index === 2;

  return (
    <motion.div
      ref={sectionRef}
      className="flex justify-center items-center mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      dir={direction}
    >
      <div className="w-full max-w-4xl">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Badge variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}>
                {labels.monthLabel} {monthData.month}
              </Badge>
              {isCompleted && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {labels.completed}
                </Badge>
              )}
              {isCurrent && (
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {labels.current}
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl leading-tight">{monthData.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4" />
              {monthData.project}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthData.tasks.map((task, taskIndex) => {
                const Icon = isCompleted ? CheckCircle : resolveIcon(task.title);
                return (
                  <motion.div
                    key={taskIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: taskIndex * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 p-4 rounded-lg transition-colors"
                  >
                    <div className="mt-1">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-base leading-tight">{task.title}</h4>
                      {task.details && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{task.details}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

export default function RoadmapPage() {
  const { locale, direction } = useLanguage();
  const labels = LABELS[locale];
  const months = roadmapByLocale[locale];
  const { currentMonth, setCurrentMonth, nextMonth, prevMonth } = useRoadmapNavigation(months.length);

  return (
    <PageTransition>
      <div className="container-fluid py-8" dir={direction}>
        <div className="mb-12 space-y-4 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {labels.headerTitle}
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {labels.headerSubtitle}
          </motion.p>
        </div>

        <motion.div
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={prevMonth}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={labels.prev}
          >
            {direction === "rtl" ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </motion.button>

          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-6 py-3">
            <div className="flex gap-1">
              {months.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentMonth ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrentMonth(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`${labels.monthLabel} ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.button
            onClick={nextMonth}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={labels.next}
          >
            {direction === "rtl" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute top-96 right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-96 left-20 w-36 h-36 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-30" />
          </div>

          <motion.div
            key={`${locale}-${currentMonth}`}
            initial={{ opacity: 0, x: direction === "rtl" ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "rtl" ? -100 : 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" as const }}
          >
            <SingleMonthView
              monthData={months[currentMonth]}
              index={currentMonth}
              labels={labels}
              direction={direction}
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">{labels.instructions}</p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
