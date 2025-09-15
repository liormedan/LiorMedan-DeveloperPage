export type RoadmapTask = {
  title: string;
};

export type RoadmapMonth = {
  month: number;
  title: string;
  project: string;
  tasks: RoadmapTask[];
};

export const roadmapData: RoadmapMonth[] = [
  {
    month: 1,
    title: "חודש 1: אוקטובר 2025 - תחילת עבודה ויסודות ליבה",
    project: "התחלת עבודה והשקת פורטפוליו ראשונית",
    tasks: [
      { title: "התחלת עבודה בפועל" },
      { title: "הקמת פרויקט Next.js עם TypeScript" },
      { title: "יצירת מערכת עיצוב עם Tailwind ו-shadcn/ui" },
      { title: "פיתוח עמודים ראשיים (בית, פרויקטים, יצירת קשר)" },
      { title: "העלאה ל-Vercel" },
    ],
  },
  {
    month: 2,
    title: "חודש 2: נובמבר 2025 - תוכן מתקדם ואינטראקטיביות",
    project: "בלוג ו-Case Studies מעמיקים",
    tasks: [
      { title: "שילוב Headless CMS עבור בלוג" },
      { title: "פיתוח עמודי בלוג דינמיים" },
      { title: "כתיבה ופרסום של 2 Case Studies" },
      { title: "הוספת אלמנטים אינטראקטיביים לדף הבית" },
    ],
  },
  {
    month: 3,
    title: "חודש 3: דצמבר 2025 - תלת-ממד וליטוש חזותי",
    project: "תצוגת תלת-ממד אימרסיבית",
    tasks: [
      { title: "יצירת עמוד Playground לניסויי תלת-ממד" },
      { title: "שילוב סצנת Three.js/Spline מורכבת" },
      { title: "ליטוש אנימציות ומעברי עמודים עם Framer Motion" },
      { title: "אופטימיזציה של נכסי תלת-ממד" },
    ],
  },
  {
    month: 4,
    title: "חודש 4: ינואר 2026 - אינטגרציית צד-שרת ושירותים",
    project: "תכונות אינטראקציה עם משתמשים",
    tasks: [
      { title: "מימוש טופס יצירת קשר עם Serverless function" },
      { title: "חיבור למסד נתונים (Firebase/Supabase)" },
      { title: "יצירת עמוד 'ספר אורחים' (Guestbook)" },
      { title: "הוספת אימות לניהול ספר האורחים" },
    ],
  },
  {
    month: 5,
    title: "חודש 5: פברואר 2026 - אופטימיזציית ביצועים ו-SEO",
    project: "שיפור ביצועי האתר",
    tasks: [
      { title: "ביצוע בדיקה מקיפה עם Lighthouse" },
      { title: "אופטימיזציה של תמונות ונכסים" },
      { title: "שיפור SEO באמצעות נתונים מובנים (JSON-LD)" },
      { title: "מימוש Code Splitting ו-Lazy Loading" },
    ],
  },
  {
    month: 6,
    title: "חודש 6: מרץ 2026 - תכונות AI ותכנון עתידי",
    project: "עוזר מבוסס AI",
    tasks: [
      { title: "שילוב צ'אטבוט AI לאינטראקציה" },
      { title: "בחינת יכולות AI ליצירת תוכן" },
      { title: "תכנון מפת הדרכים לחצי השנה הבאה" },
      { title: "איסוף משוב משתמשים וניתוח נתונים" },
    ],
  },
];
