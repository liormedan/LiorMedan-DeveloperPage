import type { Metadata } from "next";
import StoryPager from "@/components/StoryPager";
import BriefBuilder from "@/components/BriefBuilder";
import Accordion from "@/components/Accordion";

// ===== SEO =====
const siteUrl = "https://example.com"; // ← עדכן לדומיין שלך
const title = "Lior Medan - Developer";
const description = "Personal developer page";
const imageUrl = `${siteUrl}/next.svg`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: title,
  url: siteUrl,
};
// ===== /SEO =====

export default function Home() {
  return (
    <>
      {/* JSON-LD כ־script רגיל כדי להישאר קומפוננטת שרת */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <StoryPager
        engine="none"
        steps={[
          {
            id: "hero",
            title: "שלום, אני ליאור",
            subtitle: "מפתח ווב שמחבר קוד, 3D, אודיו ו-AI",
          },
          {
            id: "principles-hero",
            title: "",
            subtitle: "",
            content: (
              <Accordion
                defaultOpen={[]}
                items={[
                  {
                    title: "Less is more",
                    content: (
                      <ul
                        dir="rtl"
                        className="list-disc list-inside space-y-1 text-base sm:text-lg text-center"
                      >
                        <li>
                          <span className="font-semibold">
                            עיצוב פשוט, ממוקד למטרה
                          </span>
                        </li>
                        <li>
                          <span className="font-semibold">פשטות וניקיון</span>{" "}
                          מושכים את הרצינות.
                        </li>
                        <li>
                          <span className="font-semibold">עודף מלל</span> מעמיס
                          על המשתמשים.
                        </li>
                      </ul>
                    ),
                  },
                  {
                    title: "טכנולוגיה חכמה-פשוטה לתפעול",
                    content: (
                      <ul
                        dir="rtl"
                        className="list-disc list-inside space-y-1 text-base sm:text-lg text-center"
                      >
                        <li>
                          <span className="font-semibold">
                            חכמה מאחורי הקלעים
                          </span>{" "}
                          — פשוטה בחזית.
                        </li>
                        <li>
                          <span className="font-semibold">
                            אינטואיטיבית למשתמש
                          </span>{" "}
                          — מובנת בלי מדריך.
                        </li>
                        <li>
                          <span className="font-semibold">מקצרת דרך</span> —
                          פחות צעדים, יותר תוצאה.
                        </li>
                      </ul>
                    ),
                  },
                  {
                    title: "בדרך סוקרטס – פתרונות נולדים משאלות",
                    content: (
                      <div
                        dir="rtl"
                        className="text-center text-sm sm:text-base text-muted-foreground space-y-1"
                      >
                        <p>לא ידעתי לתכנת לפני הגעת הבינה המלאכותית.</p>
                        <p>
                          כשהבנתי ש<strong>שאילת השאלות</strong> היא המפתח,
                          הצלחתי ליצור דברים שלא יכולתי לפני כן. זו דרך
                          העבודה עם כלי הבינה: לשאול היטב, לזקק כוונה, ולהפיק
                          תוצאות והמצאות שלא היו אפשריות קודם.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            id: "work",
            title: "עבודות נבחרות",
            subtitle: "מוצרים, דשבורדים, ומיקרו-אינטראקציות שמבליטות ערך",
          },
          {
            id: "process",
            title: "מסע קצר ומדויק",
            subtitle:
              "אפיון MVP זריז, קומפוננטות נקיות, אינטגרציות בטוחות ושיפור מתמשך",
          },
          {
            id: "estimate",
            title: "כמה זה יעלה לי?",
            subtitle: "הערכה גסה לפי רכיבים — לקבל כיוון מהיר",
            content: <BriefBuilder />,
          },
          {
            id: "orgs",
            title: "גם ל-Startup וגם לאנטרפרייז",
            subtitle: "אבטחה, נגישות, עמידות וסקייל — בלי לוותר על קצב",
          },
          {
            id: "contact",
            title: "בואו נדבר",
            subtitle: "וואטסאפ/שיחה — נסגור יעדים ונצא לדרך",
          },
        ]}
      />
    </>
  );
}
