"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function PrinciplesPage() {
  const search = useSearchParams();
  const p3 = search?.get("p3")?.trim();

  const items: { title: string; body: string }[] = [
    {
      title: "Less is more",
      body:
        "עיצוב פשוט, ממוקד למטרה — בעולם מלא עיצובים רעשניים, פשטות וניקיון מושכים את הרצינות.",
    },
    {
      title: "טכנולוגיה חדשה טובה כשהיא פשוטה לשימוש",
      body:
        "אני בוחר כלים חדשים רק כשהם מפשטים את המערכת ולא מסבכים אותה — כדי שהצוות יוכל לעבוד מהר ובביטחון.",
    },
    {
      title: "דרך סוקרטס",
      body:
        "לא ידעתי לתכנת לפני הגעת הבינה המלאכותית. כשהבנתי ששאילת השאלות היא המפתח, הצלחתי ליצור דברים שלא יכולתי לפני כן — זו דרך העבודה עם כלי הבינה: לשאול היטב, לזקק כוונה, ולהפיק תוצאות והמצאות שלא היו אפשריות קודם.",
    },
  ];

  return (
    <div className="container-fluid py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold">כללים חשובים בעבודה שלי</h1>
        <p className="mt-3 text-muted-foreground">
          מינימליזם, פשטות תפעולית, והתמקדות בערך למשתמש ולצוות הפיתוח.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Card key={i} className="p-5 text-right">
            <div className="text-sm text-muted-foreground">{i + 1}</div>
            <h2 className="mt-1 text-xl font-semibold">{it.title}</h2>
            {it.body && <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>}
          </Card>
        ))}
      </div>
    </div>
  );
}
