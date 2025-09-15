"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroThree from "@/components/HeroThree";
import PageTransition from "@/components/PageTransition";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden">
        <HeroThree backgroundOnly autoRotate />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            שלום! אני ליאור
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            אני מפתח web מתמחה ב-React ו-Python. אני מזמין אתכם לראות את העבודות שלי וללמוד על דרך העבודה שלי.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/projects">צפו בפרויקטים</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
