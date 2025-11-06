import { Locale } from "@/lib/i18n/config";

export type RoadmapTask = {
  title: string;
  details?: string;
};

export type RoadmapMonth = {
  month: number;
  title: string;
  project: string;
  tasks: RoadmapTask[];
};

export const roadmapByLocale: Record<Locale, RoadmapMonth[]> = {
  he: [
    {
      month: 1,
      title: "חודש 1: ספטמבר 2025 - בניית בסיס טכנולוגי יציב",
      project: "הקמת תשתית Next.js עם ממשק RTL מעוצב",
      tasks: [
        {
          title: "הגדרת פרויקט Next.js עם TypeScript",
          details: "יצירת פרויקט חדש, קביעת תקני קוד, והכנת ספריית רכיבים לשימוש חוזר בממשק.",
        },
        {
          title: "עיצוב Tailwind + shadcn/ui",
          details: "התאמת ערכת הצבעים, טיפוגרפיה ומצבי כהה/בהיר כדי להבטיח עקביות חווייתית לכל אורך האתר.",
        },
        {
          title: "פיתוח עמודי ליבה (בית, פרויקטים, מפת דרכים)",
          details: "עיצוב חוויית משתמש עמוקה עם ניווט ברור והצגת ערך מידית למבקרים.",
        },
        {
          title: "הטמעת CI/CD ל-Vercel",
          details: "חיבור מאובטח ל-Git, הטמעת בדיקות build, והפצה אוטומטית לכל commit ב-main.",
        },
      ],
    },
    {
      month: 2,
      title: "חודש 2: אוקטובר 2025 - הצגת סיפורי לקוח",
      project: "בניית ספריית Case Studies מונעת CMS",
      tasks: [
        {
          title: "הערכת Headless CMS לבחירה",
          details: "בדיקת Contentful, Sanity ואפשרויות נוספות כדי לבחור פתרון שמאזן בין פשטות וגמישות.",
        },
        {
          title: "פיתוח תבנית Case Study אינטראקטיבית",
          details: "יצירת מבנה מודולרי עם רכיבי עיצוב חוזרים, גלריות, ובלוקים לטקסטים שיווקיים.",
        },
        {
          title: "כתיבה והעלאה של שני סיפורי הצלחה",
          details: "איסוף תובנות, תיעוד התהליך, והדגשת מדדי ביצועים שמציגים ערך עסקי.",
        },
        {
          title: "הטמעת דפי נחיתה ממוקדי SEO",
          details: "עבודה ממוקדת על מילות מפתח ושיפור שיעורי המרה דרך תוכן מותאם וקריאות לפעולה.",
        },
      ],
    },
    {
      month: 3,
      title: "חודש 3: נובמבר 2025 - חוויית תלת-ממד והדגמת מוצר",
      project: "שילוב חוויות תלת-ממדיות",
      tasks: [
        {
          title: "שילוב Three.js / Spline",
          details: "בניית הדמיות מותאמות אישית עם תנועה מבוקרת וגרפיקה חלקה.",
        },
        {
          title: "אנימציות מתקדמות עם Framer Motion",
          details: "הוספת מיקרו-אינטראקציות וטרנזיציות רכות להגברת מעורבות המשתמשים.",
        },
        {
          title: "שילוב בעמודים קיימים",
          details: "סנכרון בין החוויה התלת-ממדית לניווט העיקרי והצגת ערך ברור בקליק ראשון.",
        },
      ],
    },
    {
      month: 4,
      title: "חודש 4: דצמבר 2025 - אוטומציה וחיבור למערכות",
      project: "הקמת שכבת Serverless מאובטחת",
      tasks: [
        {
          title: "פיתוח פונקציות Serverless",
          details: "הקמת API ליצירת קשר, שליחת הודעות, וטיפול בשאלות נפוצות.",
        },
        {
          title: "חיבור למסד נתונים (Firebase/Supabase)",
          details: "ניהול נתונים דינמיים עם הרשאות, אבטחה, ויכולות סנכרון בזמן אמת.",
        },
        {
          title: "בניית עמוד Guestbook",
          details: "פיתוח עמוד המאפשר למשתמשים להשאיר פידבק ולצפות בהודעות קודמות.",
        },
        {
          title: "לוגים ומוניטורינג",
          details: "אינטגרציה עם Vercel Observability לניהול אירועים ושגיאות בזמן אמת.",
        },
      ],
    },
    {
      month: 5,
      title: "חודש 5: ינואר 2026 - ביצועים ו-SEO",
      project: "שיפור חוויית המשתמש והמדדים",
      tasks: [
        {
          title: "בדיקות Lighthouse",
          details: "מדידת ביצועים, נגישות, ו-Best Practices בכל העמודים העיקריים.",
        },
        {
          title: "אופטימיזציית נכסים ותמונות",
          details: "דחיסת תמונות, טעינה עצלה, והקטנת bundle ראשי.",
        },
        {
          title: "הטמעת נתונים מובנים (JSON-LD)",
          details: "שיפור הופעה במנועי חיפוש באמצעות סכימות מותאמות.",
        },
        {
          title: "Code Splitting מתקדם",
          details: "פיצול קוד וטעינת רכיבים לפי צורך לצמצום First Load JS.",
        },
      ],
    },
    {
      month: 6,
      title: "חודש 6: פברואר 2026 - בינה מלאכותית והמשך",
      project: "עוזר אישי מבוסס AI",
      tasks: [
        {
          title: "מחקר כלים ו-LLM",
          details: "בחינת ספקים מתאימים להטמעת בוט שיחה איכותי.",
        },
        {
          title: "פיתוח תרחישי שיחה",
          details: "הגדרת זרימות ליצירת הצעות מחיר חכמות וליווי לקוחות.",
        },
        {
          title: "הטמעת האנליטיקות",
          details: "מדידת שימוש, מעקב אחרי פידבק, ושיפור האלגוריתמים.",
        },
        {
          title: "תכנון חצי שנה קדימה",
          details: "אפיון פיצ'רים עתידיים, שדרוג חוויית המשתמש והרחבת המערכת.",
        },
      ],
    },
  ],
  en: [
    {
      month: 1,
      title: "Month 1: January 2025 – Solid Technical Foundation",
      project: "Setting up a Next.js stack with a polished RTL experience",
      tasks: [
        {
          title: "Bootstrap Next.js with TypeScript",
          details: "Spin up the project, define coding standards, and prepare a reusable UI component library.",
        },
        {
          title: "Design system with Tailwind + shadcn/ui",
          details: "Configure typography, color palettes, and light/dark themes to ensure visual consistency.",
        },
        {
          title: "Build core pages (Home, Projects, Roadmap)",
          details: "Shape intuitive UX flows that communicate value immediately and support RTL out of the box.",
        },
        {
          title: "Wire up CI/CD to Vercel",
          details: "Secure Git integration, add build validations, and deploy every main commit automatically.",
        },
      ],
    },
    {
      month: 2,
      title: "Month 2: February 2025 – Customer Stories",
      project: "Creating a CMS-powered Case Study library",
      tasks: [
        {
          title: "Evaluate headless CMS options",
          details: "Compare Contentful, Sanity, and others to balance simplicity with editorial flexibility.",
        },
        {
          title: "Develop interactive case study template",
          details: "Design modular sections with reusable components, visuals, and compelling marketing copy.",
        },
        {
          title: "Write and publish two case studies",
          details: "Gather insights, document the process, and highlight performance metrics that matter.",
        },
        {
          title: "SEO-focused landing experiences",
          details: "Target the right keywords and craft calls-to-action that improve conversion rates.",
        },
      ],
    },
    {
      month: 3,
      title: "Month 3: March 2025 – 3D Experience & Product Demo",
      project: "Integrating 3D experiences",
      tasks: [
        {
          title: "Integrate Three.js / Spline",
          details: "Craft bespoke animations with smooth motion and carefully tuned lighting.",
        },
        {
          title: "Advanced motion with Framer Motion",
          details: "Add micro-interactions and transition choreography that keep users engaged.",
        },
        {
          title: "Embed within existing pages",
          details: "Synchronize navigation and ensure the 3D experience supports key storytelling moments.",
        },
      ],
    },
    {
      month: 4,
      title: "Month 4: January 2026 – Automation & Integrations",
      project: "Shipping a secure serverless layer",
      tasks: [
        {
          title: "Implement serverless functions",
          details: "Power contact forms, FAQ automation, and lightweight workflows with edge functions.",
        },
        {
          title: "Connect to a database (Firebase/Supabase)",
          details: "Manage dynamic data with real-time sync, access rules, and observability hooks.",
        },
        {
          title: "Build a public Guestbook",
          details: "Let visitors leave feedback and read community highlights with moderation tools.",
        },
        {
          title: "Logging & monitoring",
          details: "Integrate Vercel Observability to trace events and catch errors instantly.",
        },
      ],
    },
    {
      month: 5,
      title: "Month 5: February 2026 – Performance & SEO",
      project: "Improving UX and measurable outcomes",
      tasks: [
        {
          title: "Run Lighthouse audits",
          details: "Benchmark performance, accessibility, and best practices across key pages.",
        },
        {
          title: "Optimize assets and images",
          details: "Compress images, enable lazy loading, and trim the initial JavaScript bundle.",
        },
        {
          title: "Add structured data (JSON-LD)",
          details: "Boost search visibility with tailored schema definitions.",
        },
        {
          title: "Advanced code splitting",
          details: "Chunk shared components and load them on demand to reduce first-load costs.",
        },
      ],
    },
    {
      month: 6,
      title: "Month 6: March 2026 – AI and Beyond",
      project: "Delivering an AI-powered assistant",
      tasks: [
        {
          title: "Research LLM providers",
          details: "Evaluate tooling for a high-quality conversational assistant.",
        },
        {
          title: "Design conversation flows",
          details: "Script quote-generation journeys and onboarding walkthroughs.",
        },
        {
          title: "Implement analytics",
          details: "Track usage, gather feedback, and iterate on response quality.",
        },
        {
          title: "Plan the next semester",
          details: "Define future features, UX improvements, and roadmap milestones.",
        },
      ],
    },
  ],
};
