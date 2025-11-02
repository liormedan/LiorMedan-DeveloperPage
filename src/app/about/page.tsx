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
    photoTitle: "תמונה",
    photoSubtitle: "כאן אפשר להעלות תמונת פרופיל. החליפו את האזור הזה בתמונה שלכם כשיהיה נכס מתאים.",
    principlesTitle: "כללים חשובים בעבודה שלי",
    principlesSubtitle: "שקיפות, תכנון ודיוק בירידה לפרטים הקטנים. כך אני מבטיח שהפרויקטים יוצאים לדרך בצורה חלקה.",
    principles: [
      {
        title: "Less is more",
        body: "אני מחפש את הפתרון הפשוט ביותר שעונה על הצורך. הסרה של עומס עיצובי ותהליכי ניהול מיותרים מקצרת את הדרך לתוצאה.",
      },
      {
        title: "טכנולוגיה חדשה טובה כשהיא פשוטה",
        body: "אני בוחר כלים חדשים רק כשהם מפשטים את המערכת ולא מסבכים אותה — כדי שהצוות יוכל לעבוד מהר ובביטחון.",
      },
      {
        title: "דרך סוקרטס",
        body: "שאלות מדויקות מביאות לתשובות מדויקות. אני משקיע בלזקק את הבריף לפני שמתחילים לבנות כדי להבטיח תוצרים חזקים ומדידים.",
      },
    ],
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
    photoTitle: "Portrait",
    photoSubtitle: "Drop in your portrait image here when it’s ready. Replace this placeholder with a real photo.",
    principlesTitle: "Guiding principles",
    principlesSubtitle: "What shapes every project I take on.",
    principles: [
      {
        title: "Less is more",
        body:
          "I focus on simple solutions that solve the need. Removing visual and process noise shortens the path to impact.",
      },
      {
        title: "New tech must stay simple",
        body:
          "I adopt tools only when they simplify the system and keep the team moving fast with confidence.",
      },
      {
        title: "The Socratic method",
        body:
          "Sharp questions unlock stronger briefs. I clarify scope before building so deliverables are measurable and lasting.",
      },
    ],
    cta: "Let’s collaborate",
    contactHref: "/contact",
  },
} as const;

export default function AboutPage() {
  const { locale, direction } = useLanguage();
  const copy = COPY[locale];

  return (
    <PageTransition>
      <div className="container-fluid py-12 space-y-10" dir={direction}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(240px,1fr)] items-start">
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="uppercase tracking-wide text-xs mb-4">
                {copy.badge}
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">{copy.heading}</h1>
              <p className="text-muted-foreground text-lg sm:text-xl">{copy.subheading}</p>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-foreground/90">
              {copy.intro.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden border-dashed border-primary/30 bg-background/60">
            <div className="aspect-[3/4] w-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_55%)] flex flex-col items-center justify-center text-center px-6">
              <Badge variant="outline" className="mb-3 text-xs uppercase tracking-wide">
                {copy.photoTitle}
              </Badge>
              <p className="text-sm text-muted-foreground leading-relaxed">{copy.photoSubtitle}</p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-primary/40 px-3 py-1 text-xs text-primary/70">
                {locale === "he" ? "גררו תמונה לכאן או עדכנו את הקובץ ב-public/images" : "Add your photo under public/images when ready"}
              </span>
            </div>
          </Card>
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)] items-start">
          <div className="space-y-6">
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

            {"principles" in copy && (
              <Card className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {"principlesTitle" in copy ? copy.principlesTitle : "Principles"}
                  </h2>
                  {"principlesSubtitle" in copy && (
                    <p className="text-sm text-muted-foreground mt-1">{copy.principlesSubtitle}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {copy.principles?.map((principle, idx) => (
                    <div key={principle.title} className={`rounded-lg border bg-card/70 p-4 ${direction === "rtl" ? "text-right" : "text-left"}`}>
                      <div className="text-primary font-semibold flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 text-xs">
                          {idx + 1}
                        </span>
                        <span>{principle.title}</span>
                      </div>
                      {principle.body && (
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {principle.body}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

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
