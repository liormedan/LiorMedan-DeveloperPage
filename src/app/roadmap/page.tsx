"use client";
import * as React from "react";
import { roadmapData } from "@/data/roadmap";
import PageTransition from "@/components/PageTransition";
import { motion, useInView, type Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Calendar, Target, Zap, Code, Palette, Rocket, Database, Settings, Bot, ChevronLeft, ChevronRight } from "lucide-react";

// Visual elements for each month
const getMonthVisual = (monthIndex: number, isInView: boolean) => {
  const visuals = [
    // חודש 1 - יסודות
    <motion.div 
      key="month1"
      className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border-2 border-dashed border-blue-200 dark:border-blue-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
      >
        🏗️
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-blue-700 dark:text-blue-300">בניית יסודות</div>
        <div className="text-sm text-blue-600 dark:text-blue-400">Next.js + TypeScript</div>
      </div>
    </motion.div>,
    
    // חודש 2 - תוכן
    <motion.div 
      key="month2"
      className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border-2 border-dashed border-purple-200 dark:border-purple-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        whileHover={{ scale: [1, 1.2, 1], transition: { duration: 0.4 } }}
      >
        📝
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-purple-700 dark:text-purple-300">יצירת תוכן</div>
        <div className="text-sm text-purple-600 dark:text-purple-400">בלוג + Case Studies</div>
      </div>
    </motion.div>,
    
    // חודש 3 - תלת ממד
    <motion.div 
      key="month3"
      className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-2 border-dashed border-green-200 dark:border-green-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
      animate={isInView ? { scale: 1, opacity: 1, rotateY: 0 } : { scale: 0.8, opacity: 0, rotateY: -180 }}
      transition={{ duration: 1, delay: 0.3 }}
      whileHover={{ y: -5, rotateY: 5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        whileHover={{ rotateZ: 360, transition: { duration: 0.6 } }}
      >
        🎮
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-green-700 dark:text-green-300">עולם תלת-ממדי</div>
        <div className="text-sm text-green-600 dark:text-green-400">Three.js + Spline</div>
      </div>
    </motion.div>,
    
    // חודש 4 - שרת
    <motion.div 
      key="month4"
      className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl border-2 border-dashed border-orange-200 dark:border-orange-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        whileHover={{ x: [0, -5, 5, 0], transition: { duration: 0.5 } }}
      >
        🔗
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-orange-700 dark:text-orange-300">חיבור לשרת</div>
        <div className="text-sm text-orange-600 dark:text-orange-400">Firebase + API</div>
      </div>
    </motion.div>,
    
    // חודש 5 - ביצועים
    <motion.div 
      key="month5"
      className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-xl border-2 border-dashed border-teal-200 dark:border-teal-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        whileHover={{ scale: [1, 1.3, 1], rotate: [0, 180, 360], transition: { duration: 0.6 } }}
      >
        ⚡
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-teal-700 dark:text-teal-300">אופטימיזציה</div>
        <div className="text-sm text-teal-600 dark:text-teal-400">ביצועים + SEO</div>
      </div>
    </motion.div>,
    
    // חודש 6 - AI
    <motion.div 
      key="month6"
      className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-violet-50 to-fuchsia-100 dark:from-violet-950/30 dark:to-fuchsia-950/30 rounded-xl border-2 border-dashed border-violet-200 dark:border-violet-800 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.8, opacity: 0, rotate: -10 }}
      transition={{ duration: 1, delay: 0.3 }}
      whileHover={{ y: -5, rotate: 5 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        whileHover={{ 
          scale: [1, 1.1, 1], 
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        🤖
      </motion.div>
      <div className="text-center">
        <div className="font-bold text-violet-700 dark:text-violet-300">בינה מלאכותית</div>
        <div className="text-sm text-violet-600 dark:text-violet-400">AI Chatbot</div>
      </div>
    </motion.div>
  ];
  
  return visuals[monthIndex] || null;
};

// Component for single month view
function SingleMonthView({ monthData, index }: { monthData: typeof roadmapData[0], index: number }) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isCompleted = index < 2;
  const isCurrent = index === 2;

  return (
    <motion.div
      ref={sectionRef}
      className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Visual element - always on right */}
      <div className="w-full lg:w-1/2 flex justify-center">
        {getMonthVisual(index, isInView)}
      </div>

      {/* Content card - always on left */}
      <div className="w-full lg:w-1/2">
        <Card className={`transition-all duration-300 hover:shadow-lg ${
          isCompleted ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20' :
          isCurrent ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 shadow-md' :
          'hover:border-primary/50'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Badge variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}>
                חודש {monthData.month}
              </Badge>
              {isCompleted && <Badge variant="outline" className="text-green-600 border-green-200">הושלם</Badge>}
              {isCurrent && <Badge variant="outline" className="text-blue-600 border-blue-200">נוכחי</Badge>}
            </div>
            <CardTitle className="text-xl leading-tight">{monthData.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4" />
              {monthData.project}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthData.tasks.map((task, taskIndex) => (
                <motion.div
                  key={taskIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: taskIndex * 0.1, duration: 0.4 }}
                  className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${
                    isCompleted ? 'bg-green-50 dark:bg-green-950/30' :
                    isCurrent ? 'bg-blue-50 dark:bg-blue-950/30' :
                    'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className={`w-5 h-5 ${isCurrent ? 'text-blue-500' : 'text-muted-foreground'}`}>
                        {task.title.includes('Next.js') || task.title.includes('TypeScript') ? <Code className="w-5 h-5" /> :
                         task.title.includes('עיצוב') || task.title.includes('Tailwind') ? <Palette className="w-5 h-5" /> :
                         task.title.includes('Vercel') || task.title.includes('העלאה') ? <Rocket className="w-5 h-5" /> :
                         task.title.includes('מסד נתונים') || task.title.includes('Firebase') ? <Database className="w-5 h-5" /> :
                         task.title.includes('אופטימיזציה') || task.title.includes('ביצועים') ? <Settings className="w-5 h-5" /> :
                         task.title.includes('AI') || task.title.includes('צ\'אטבוט') ? <Bot className="w-5 h-5" /> :
                         <Circle className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-base leading-tight">{task.title}</h4>
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto text-green-600 border-green-200">
                          ✓
                        </Badge>
                      )}
                      {isCurrent && taskIndex === 0 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto text-blue-600 border-blue-200 animate-pulse">
                          בעבודה
                        </Badge>
                      )}
                    </div>
                    {task.details && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{task.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

// Component for a single roadmap item (legacy - keeping for reference)
function RoadmapItem({ monthData, index }: { monthData: typeof roadmapData[0], index: number }) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isCompleted = index < 2; // First 2 months are "completed" for demo
  const isCurrent = index === 2; // Third month is "current"

  const containerVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } satisfies Variants;

  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  } satisfies Variants;

  return (
    <motion.div
      ref={sectionRef}
      className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Timeline connector */}
      <div className="absolute right-1/2 transform translate-x-1/2 w-px h-full bg-border -z-10" />
      
      {/* Timeline dot */}
      <div className={`absolute right-1/2 transform translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 ${
        isCompleted ? 'bg-green-500 border-green-200' : 
        isCurrent ? 'bg-blue-500 border-blue-200 animate-pulse' : 
        'bg-muted border-border'
      }`}>
        {isCompleted && <CheckCircle className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
        {isCurrent && <Zap className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
      </div>

      {/* Visual element */}
      <div className={`w-5/12 ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
        {getMonthVisual(index, isInView)}
      </div>

      {/* Content card */}
      <div className={`w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
        <Card className={`transition-all duration-300 hover:shadow-lg ${
          isCompleted ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20' :
          isCurrent ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 shadow-md' :
          'hover:border-primary/50'
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Badge variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}>
                חודש {monthData.month}
              </Badge>
              {isCompleted && <Badge variant="outline" className="text-green-600 border-green-200">הושלם</Badge>}
              {isCurrent && <Badge variant="outline" className="text-blue-600 border-blue-200">נוכחי</Badge>}
            </div>
            <CardTitle className="text-lg leading-tight">{monthData.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {monthData.project}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthData.tasks.map((task, taskIndex) => (
                <motion.div
                  key={taskIndex}
                  variants={taskVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: taskIndex * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    isCompleted ? 'bg-green-50 dark:bg-green-950/30' :
                    isCurrent ? 'bg-blue-50 dark:bg-blue-950/30' :
                    'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className={`w-4 h-4 ${isCurrent ? 'text-blue-500' : 'text-muted-foreground'}`}>
                        {/* Different icons based on task type */}
                        {task.title.includes('Next.js') || task.title.includes('TypeScript') ? <Code className="w-4 h-4" /> :
                         task.title.includes('עיצוב') || task.title.includes('Tailwind') ? <Palette className="w-4 h-4" /> :
                         task.title.includes('Vercel') || task.title.includes('העלאה') ? <Rocket className="w-4 h-4" /> :
                         task.title.includes('מסד נתונים') || task.title.includes('Firebase') ? <Database className="w-4 h-4" /> :
                         task.title.includes('אופטימיזציה') || task.title.includes('ביצועים') ? <Settings className="w-4 h-4" /> :
                         task.title.includes('AI') || task.title.includes('צ\'אטבוט') ? <Bot className="w-4 h-4" /> :
                         <Circle className="w-4 h-4" />}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto text-green-600 border-green-200">
                          ✓
                        </Badge>
                      )}
                      {isCurrent && taskIndex === 0 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto text-blue-600 border-blue-200 animate-pulse">
                          בעבודה
                        </Badge>
                      )}
                    </div>
                    {task.details && (
                      <p className="text-xs text-muted-foreground leading-relaxed">{task.details}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

// Main page component
export default function RoadmapPage() {
  const [currentMonth, setCurrentMonth] = React.useState(0);
  
  const nextMonth = () => {
    setCurrentMonth((prev) => (prev + 1) % roadmapData.length);
  };
  
  const prevMonth = () => {
    setCurrentMonth((prev) => (prev - 1 + roadmapData.length) % roadmapData.length);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        nextMonth();
      } else if (e.key === 'ArrowRight') {
        prevMonth();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <PageTransition>
      <div className="container-fluid py-8" dir="rtl">
        <div className="mb-12 space-y-4 text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            מפת דרכים לפיתוח
          </motion.h1>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            תוכנית הפיתוח שלי ל-6 החודשים הקרובים - מסע מרתק של למידה, יצירה וחדשנות
          </motion.p>
        </div>

        {/* Navigation and Progress indicator */}
        <motion.div 
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Previous button */}
          <motion.button
            onClick={prevMonth}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Progress dots */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-6 py-3">
            <div className="flex gap-1">
              {roadmapData.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentMonth ? 'bg-blue-500 scale-125' :
                    index < 2 ? 'bg-green-500' : 
                    'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentMonth(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* Next button */}
          <motion.button
            onClick={nextMonth}
            className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Single month display */}
        <div className="relative max-w-7xl mx-auto">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute top-96 right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-96 left-20 w-36 h-36 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-30" />
          </div>
          
          {/* Display current month */}
          <motion.div
            key={currentMonth}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" as const }}
          >
            <SingleMonthView monthData={roadmapData[currentMonth]} index={currentMonth} />
          </motion.div>
        </div>

        {/* Navigation instructions */}
        <motion.div 
          className="text-center mt-8 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            השתמש בחצים ← → או לחץ על הכפתורים לניווט בין החודשים
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 pt-8 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-muted-foreground">
            © 2025 ליאור מדן • נבנה עם ❤️ באמצעות Next.js, Tailwind CSS ו-shadcn/ui
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
