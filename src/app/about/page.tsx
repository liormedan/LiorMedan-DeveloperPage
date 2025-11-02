"use client";

import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

const COPY = {
  he: {
    badge: "אודות",
    heading: "עליי",
    subheading: "היי, אני ליאור מדן — מפתח פולסטאק פרילנסר.",
    intro: [
      "אני אוהב לקחת רעיונות ולבנות מהם מוצרים דיגיטליים אמיתיים: כאלה שעובדים טוב, נראים מצוין, ונותנים ערך מהר.",
      "אני עובד בעיקר עם React, Node.js ו-Supabase, ומשלב בין חשיבה מערכתית לעשייה פרקטית. אני אוהב להבין את התמונה הגדולה, לזהות תלויות ו-edge cases עוד לפני שמתחילים לכתוב קוד, וליצור שפה משותפת בין כל הצדדים — מהמוצר ועד הפיתוח.",
      "אני מאמין ששקיפות, סדר ונגישות טכנית הם לא בונוס — הם הבסיס לעבודה טובה. בסוף, מה שמניע אותי זה לראות רעיון הופך למשהו אמיתי, חי, שנוגע באנשים. פחות דיבורים — יותר עשייה, תוצאות ובהירות.",
    ],
    qualitiesTitle: "איך אני עובד",
    qualities: [
      "תהליך שקוף וקבוע מראש: חלוקת Backlog לאבני דרך קצרות, שיתוף סטטוס שוטף ותיעוד שנשאר עם הצוות.",
      "פתרון בעיות בצורה פרקטית: במקום לרדוף אחרי כל טכנולוגיה חדשה, אני בוחר בכלים שנותנים ערך מידי ומחזיקים לאורך זמן.",
      "תקשורת אנושית וברורה: מיישר קו בין מנהלי מוצר, מעצבים ומפתחים כדי שכולנו נדבר באותה שפה.",
    ],
    stackTitle: "Stack מועדף",
    stackSubtitle: "הכלים שמאפשרים לי לבנות מהר בלי להתפשר על איכות.",
    stackItems: ["Next.js / React 19", "TypeScript", "Vercel", "Tailwind CSS 4", "shadcn/ui", "Three.js & R3F", "Node.js / Supabase"],
    cta: "בואו נדבר",
    contactHref: "/contact",
  },
  en: {
    badge: "About",
    heading: "Lior Medan",
    subheading:
      "Freelance product engineer helping teams design, build, and launch reliable web experiences end to end.",
    intro: [
      "For 10+ years I’ve partnered with product teams, founders, and agencies to turn requirements into measurable outcomes. Every engagement starts with a plan, a cadence, and clarity on what success looks like.",
      "I prioritise transparency and velocity: short milestones, visible progress, and a tech stack that can adapt as the roadmap evolves.",
    ],
    qualitiesTitle: "How I add value",
    qualities: [
      "Systems mindset that surfaces dependencies and edge cases before we commit to scope.",
      "Bridging disciplines — I’m as comfortable reviewing KPIs with founders as I am pairing on hard bugs with engineering.",
      "Documentation and QA baked into delivery so the work stays maintainable long after handoff.",
    ],
    stackTitle: "Preferred stack",
    stackSubtitle: "Tools that balance quick delivery with long-term maintainability.",
    stackItems: ["Next.js / React 19", "TypeScript", "Vercel", "Tailwind CSS 4", "shadcn/ui", "Three.js & R3F", "Node.js API routes"],
    cta: "Let’s collaborate",
    contactHref: "/contact",
  },
} as const;

export default function AboutPage() {
  const { locale, direction } = useLanguage();
  const copy = COPY[locale];

  return (
    <PageTransition>
      <div className="container-fluid py-12 space-y-8" dir={direction}>
        <div className="max-w-3xl">
          <Badge variant="secondary" className="uppercase tracking-wide text-xs mb-4">
            {copy.badge}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">{copy.heading}</h1>
          <p className="text-muted-foreground text-lg sm:text-xl mb-6">{copy.subheading}</p>

          <div className="space-y-4 text-base leading-relaxed text-foreground/90">
            {copy.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)] items-start">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">{copy.qualitiesTitle}</h2>
            <ul className={`space-y-3 ${direction === "rtl" ? "text-right" : "text-left"}`}>
              {copy.qualities.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  <span aria-hidden className="mt-1 text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{copy.stackTitle}</h3>
              <p className="text-xs text-muted-foreground mt-1">{copy.stackSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {copy.stackItems.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        </section>

        <div>
          <Button asChild size="lg">
            <Link href={copy.contactHref}>{copy.cta}</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
