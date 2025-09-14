// @ts-nocheck
import type { Metadata } from "next";
import StoryPager from "@/components/StoryPager";
import ChatAssist from "@/components/ChatAssist";
import Accordion from "@/components/Accordion";

// ===== SEO =====
const siteUrl = "https://example.com";
const title = "ליאור מדן — מפתח ווב";
const description = "תיק עבודות: React/Next.js, Python, מדיה ואודיו";
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
      { url: imageUrl, width: 1200, height: 630, alt: title },
    ],
    locale: "he_IL",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <StoryPager
        engine="none"
        steps={[
          {
            id: "hero",
            title: "שלום, אני ליאור — מפתח ווב",
            subtitle: "React + Next.js • Python • חוויות אינטראקטיביות ואודיו",
          },
          {
            id: "work",
            title: "מה אני בונה",
            subtitle: "אתרים מהירים ונגישים, אפליקציות ווב ופול־סטאק בענן, וכלי מדיה/אודיו",
          },
          {
            id: "principles-hero",
            title: "עקרונות עבודה",
            subtitle: "פשטות, ביצועים, נגישות, וערך עסקי ברור",
            content: (
              <Accordion
                defaultOpen={[]}
                items={[
                  {
                    title: "Less is more",
                    content: (
                      <ul dir="rtl" className="list-disc list-inside space-y-1 text-base sm:text-lg text-right">
                        <li><span className="font-semibold">UI נקי וברור</span> — בלי רעש ובלי עומס.</li>
                        <li><span className="font-semibold">פוקוס במסר ובעיקר</span> — מה המשתמש צריך עכשיו.</li>
                        <li><span className="font-semibold">חיכוך נמוך</span> — זמן טעינה קצר וזרימה טבעית.</li>
                      </ul>
                    ),
                  },
                  {
                    title: "איכות קוד וביצועים",
                    content: (
                      <ul dir="rtl" className="list-disc list-inside space-y-1 text-base sm:text-lg text-right">
                        <li><span className="font-semibold">TypeScript, בדיקות, Lint</span> — בסיס ליציבות לאורך זמן.</li>
                        <li><span className="font-semibold">מדדי ביצועים</span> — Core Web Vitals, TTFB, A11y.</li>
                        <li><span className="font-semibold">ארכיטקטורה פשוטה</span> עם אפשרות להתרחבות.</li>
                      </ul>
                    ),
                  },
                  {
                    title: "תהליך עבודה",
                    content: (
                      <div dir="rtl" className="text-right text-sm sm:text-base text-muted-foreground space-y-1">
                        <p>אפיון ממוקד ותיאום ציפיות.</p>
                        <p>MVP מהיר + Roadmap קצר וברור.</p>
                        <p>איטרציות קצרות ושקיפות מלאה לאורך הדרך.</p>
                      </div>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            id: "estimate",
            title: "הערכת מחיר וזמן",
            subtitle: "ספרו לי על הפרויקט ונרכיב הצעה מותאמת",
            content: <ChatAssist />,
          },
          {
            id: "orgs",
            title: "ארגונים ושיתופי פעולה",
            subtitle: "POC מהיר, ניהול סיכונים ותיעוד/דיווח שוטף",
          },
          {
            id: "contact",
            title: "בואו נדבר",
            subtitle: "מענה מהיר בווטסאפ או במייל. נשמח לשיחת היכרות קצרה",
          },
        ]}
      />
    </>
  );
}
