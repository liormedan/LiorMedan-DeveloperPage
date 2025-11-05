"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import InteractiveControls from "@/components/InteractiveControls";
import { useLanguage } from "@/lib/i18n/language-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, Zap, Box } from "lucide-react";
import { Text3D } from "@/components/ui/Text3D";
import { Card3D } from "@/components/ui/Card3D";
import { CardHeader, CardContent } from "@/components/ui/card";

// Loading component
const PlaygroundLoading = () => (
  <div className="w-full h-[600px] md:h-[700px] rounded-lg border border-border/50 bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading 3D playground...</p>
    </div>
  </div>
);

// Dynamic import with SSR disabled for Three.js components
const Playground3D = dynamic(() => import("@/components/Playground3D"), {
  ssr: false,
  loading: PlaygroundLoading,
});

const COPY = {
  he: {
    title: "Playground תלת-ממדי",
    subtitle: "גלה את תהליך העבודה שלי דרך חוויה אינטראקטיבית תלת-ממדית",
    description:
      "חוויית Playground מתקדמת שממחישה את תהליך העבודה המלא - מגילוי ועד הפצה. אינטראקציה עם השלבים השונים, תנועה חלקה ואנימציות מתקדמות.",
    features: [
      "חוויית תלת-ממד אינטראקטיבית",
      "אנימציות חלקות עם Framer Motion",
      "תצוגה ויזואלית של תהליך העבודה",
      "ניווט אינטואיטיבי וקונטרול מלא",
    ],
    cta: "חזרה לפרויקטים",
    tech: "טכנולוגיות",
    builtWith: "נבנה עם",
  },
  en: {
    title: "3D Playground",
    subtitle: "Explore my work process through an interactive 3D experience",
    description:
      "An advanced Playground experience that visualizes the complete work process - from discovery to deployment. Interact with different stages, smooth motion and advanced animations.",
    features: [
      "Interactive 3D experience",
      "Smooth animations with Framer Motion",
      "Visual representation of work process",
      "Intuitive navigation and full control",
    ],
    cta: "Back to Projects",
    tech: "Technologies",
    builtWith: "Built with",
  },
} as const;

export default function PlaygroundPage() {
  const { locale, direction } = useLanguage();
  const content = COPY[locale];
  const isRTL = direction === "rtl";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Button
                  asChild
                  variant="ghost"
                  className="gap-2"
                >
                  <Link href="/projects">
                    {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                    {content.cta}
                  </Link>
                </Button>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Text3D as="h1" className="text-4xl md:text-5xl font-bold tracking-tight" intensity={0.3} glow delay={0.3}>
                    {content.title}
                  </Text3D>
                  <Text3D as="p" className="text-lg text-muted-foreground mt-2" intensity={0.2} delay={0.4}>
                    {content.subtitle}
                  </Text3D>
                </div>
              </motion.div>
            </motion.div>

            {/* Description */}
            <Text3D
              as="p"
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
              intensity={0.15}
              delay={0.5}
            >
              {content.description}
            </Text3D>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
            >
              {content.features.map((feature, index) => (
                <Card3D
                  key={index}
                  intensity={0.15}
                  glow
                  className="p-4 bg-card/50 backdrop-blur-sm"
                  style={{
                    animationDelay: `${0.5 + index * 0.1}s`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-primary/10 mt-0.5">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <Text3D as="p" className="text-sm font-medium" intensity={0.1}>
                      {feature}
                    </Text3D>
                  </div>
                </Card3D>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Playground Section */}
      <motion.div
        className="container mx-auto px-4 pb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<PlaygroundLoading />}>
            <Playground3D />
          </Suspense>
        </div>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        className="container mx-auto px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <InteractiveControls />
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        className="container mx-auto px-4 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <Text3D as="h3" className="text-2xl font-bold mb-2" intensity={0.2} glow delay={0.8}>
              {content.tech}
            </Text3D>
            <Text3D as="p" className="text-muted-foreground" intensity={0.15} delay={0.9}>
              {content.builtWith}
            </Text3D>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Three.js",
              "React Three Fiber",
              "Framer Motion",
              "TypeScript",
              "Next.js",
            ].map((tech, index) => (
              <Card3D
                key={tech}
                intensity={0.1}
                glow
                className="px-4 py-2 rounded-full bg-muted border text-sm font-medium"
                style={{
                  animationDelay: `${0.9 + index * 0.05}s`,
                }}
              >
                <Text3D as="span" intensity={0.05}>
                  {tech}
                </Text3D>
              </Card3D>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

