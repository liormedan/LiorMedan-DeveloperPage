"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card3D } from "@/components/ui/Card3D";
import { Text3D } from "@/components/ui/Text3D";
import { useLanguage } from "@/lib/i18n/language-context";
import { Mouse, Keyboard, Hand, Info, RotateCcw, type LucideIcon } from "lucide-react";

type Instruction = {
  icon: LucideIcon;
  text: string;
  key: string;
};

const INSTRUCTIONS: Record<"he" | "en", Instruction[]> = {
  he: [
    { icon: Mouse, text: "עברו עם העכבר על השלבים כדי לראות אנימציות", key: "hover" },
    { icon: Keyboard, text: "לחצו על השלבים כדי לבחור ולהציג פרטים", key: "click" },
    { icon: Hand, text: "גררו כדי לסובב את הסצנה התלת-ממדית", key: "drag" },
    { icon: RotateCcw, text: "גלגל העכבר לזום פנימה והחוצה", key: "zoom" },
  ],
  en: [
    { icon: Mouse, text: "Hover over stages to see animations", key: "hover" },
    { icon: Keyboard, text: "Click on stages to select and view details", key: "click" },
    { icon: Hand, text: "Drag to rotate the 3D scene", key: "drag" },
    { icon: RotateCcw, text: "Mouse wheel to zoom in and out", key: "zoom" },
  ],
};

const COPY = {
  he: {
    title: "אינטראקציות",
    subtitle: "כיצד לשלוט בחוויה",
    tips: "טיפים",
    tip1: "השלבים מחוברים בקווי אנרגיה - שלב פעיל מודגש בבהירות",
    tip2: "המרכז הוא נקודת החיבור בין כל השלבים",
  },
  en: {
    title: "Interactions",
    subtitle: "How to control the experience",
    tips: "Tips",
    tip1: "Stages are connected by energy lines - active stage is highlighted",
    tip2: "The center is the connection point between all stages",
  },
} as const;

export default function InteractiveControls() {
  const { locale } = useLanguage();
  const content = COPY[locale];
  const instructions = INSTRUCTIONS[locale];
  const [showTips, setShowTips] = React.useState(false);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <Text3D as="h2" className="text-3xl font-bold mb-2" intensity={0.25} glow>
          {content.title}
        </Text3D>
        <Text3D as="p" className="text-muted-foreground" intensity={0.15}>
          {content.subtitle}
        </Text3D>
      </motion.div>

      {/* Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructions.map((instruction, index) => {
          const Icon = instruction.icon;
          return (
            <Card3D
              key={instruction.key}
              intensity={0.15}
              glow
              className="p-4"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <Text3D as="p" className="text-sm flex-1 leading-relaxed" intensity={0.1}>
                  {instruction.text}
                </Text3D>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Button
          variant="outline"
          onClick={() => setShowTips(!showTips)}
          className="w-full md:w-auto"
        >
          <Info className="h-4 w-4 mr-2" />
          {content.tips}
        </Button>

        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <Card3D intensity={0.15} glow className="p-4 bg-muted/50">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <Text3D as="span" intensity={0.1}>
                      {content.tip1}
                    </Text3D>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <Text3D as="span" intensity={0.1}>
                      {content.tip2}
                    </Text3D>
                  </li>
                </ul>
              </Card3D>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

