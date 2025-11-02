"use client";

import { useState } from "react";
import Link from "next/link";
import { validateContact, ContactFormData } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n/language-context";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const COPY = {
  he: {
    heading: "צור קשר",
    subheading: "אשמח להבין במה נוכל לעבוד יחד. מלאו את הפרטים והחזירו לי בתיבה למטה – אני חוזר תוך 24 שעות.",
    success: "ההודעה נשלחה בהצלחה!",
    guarantee: "אין ספאם, אין העברה הלאה. הכל נשאר בינינו.",
    responseTime: "זמן תגובה מקסימלי: 24 שעות (בימים א׳-ה׳)",
    contactPoints: [
      { label: "אימייל", value: "liormedan1@gmail.com", href: "mailto:liormedan1@gmail.com" },
      { label: "טלפון", value: "+972-54-738-2675", href: "tel:+972547382675" },
      { label: "אזור זמן", value: "UTC+2 / UTC+3 (Israel)" },
    ],
    fields: {
      name: "שם מלא",
      email: "אימייל",
      message: "איך אפשר לעזור?",
    },
    helperText: "כמה מילים על הפרויקט, הבעיה שתרצו לפתור, או היעד הקרוב שלכם.",
    button: "שלחו הודעה",
    socialTitle: "ערוצים נוספים",
    socialItems: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/liormedan", external: true },
      { label: "GitHub", href: "https://github.com/liormedan", external: true },
    ],
    errors: {
      "Name is required": "חובה להזין שם",
      "Valid email is required": "חובה להזין אימייל תקין",
      "Message is required": "חובה לכתוב הודעה",
      "Failed to send message": "שליחת ההודעה נכשלה",
    },
  },
  en: {
    heading: "Let’s build something together",
    subheading: "Tell me about your idea, your product, or the challenge you’re trying to solve. I typically reply within 24 hours on weekdays.",
    success: "Message sent successfully!",
    guarantee: "No spam, no forwards. Everything stays between us.",
    responseTime: "Response window: within 24 hours (Sun–Thu)",
    contactPoints: [
      { label: "Email", value: "liormedan1@gmail.com", href: "mailto:liormedan1@gmail.com" },
      { label: "Phone", value: "+972-54-738-2675", href: "tel:+972547382675" },
      { label: "Timezone", value: "UTC+2 / UTC+3 (Israel)" },
    ],
    fields: {
      name: "Full name",
      email: "Email",
      message: "How can I help?",
    },
    helperText: "Share a few lines about the problem, the scope, or the deliverable you’re aiming for.",
    button: "Send message",
    socialTitle: "Connect elsewhere",
    socialItems: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/liormedan", external: true },
      { label: "GitHub", href: "https://github.com/liormedan", external: true },
    ],
    errors: {
      "Name is required": "Name is required",
      "Valid email is required": "Valid email is required",
      "Message is required": "Message is required",
      "Failed to send message": "Failed to send message",
    },
  },
} as const;

function translateErrors(errors: string[], locale: keyof typeof COPY) {
  const map = COPY[locale].errors;
  return errors.map((err) => map[err as keyof typeof map] ?? err);
}

export default function ContactPage() {
  const { locale, direction } = useLanguage();
  const copy = COPY[locale];
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = translateErrors(validateContact(form), locale);
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        const backendErrors = Array.isArray(data.errors) ? data.errors : ["Failed to send message"];
        setErrors(translateErrors(backendErrors, locale));
      }
    } catch {
      setErrors(translateErrors(["Failed to send message"], locale));
    } finally {
      setPending(false);
    }
  }

  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="container-fluid relative py-14" dir={direction}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <Card className="p-8 bg-background/80 backdrop-blur-sm border-primary/20">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Badge variant="outline" className="uppercase tracking-wide text-xs">
                    {copy.heading}
                  </Badge>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {locale === "he" ? "בואו נדבר" : "Let’s talk"}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{copy.subheading}</p>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
                  <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <p className="font-medium text-primary/90">{copy.responseTime}</p>
                    <p className="mt-2 text-xs sm:text-sm opacity-80">{copy.guarantee}</p>
                  </div>
                  <div className="grid gap-3">
                    {copy.contactPoints.map((point) => (
                      <div key={point.label} className="flex flex-col">
                        <span className="text-xs uppercase tracking-wide text-muted-foreground/80">{point.label}</span>
                        {"href" in point ? (
                          <Link href={point.href} className="text-base font-medium text-foreground hover:text-primary transition-colors">
                            {point.value}
                          </Link>
                        ) : (
                          <span className="text-base font-medium text-foreground">{point.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-sm uppercase tracking-wide text-muted-foreground/80 mb-2">{copy.socialTitle}</h2>
                  <div className="flex flex-wrap gap-2">
                    {copy.socialItems.map((item) => (
                      <Button
                        key={item.label}
                        asChild
                        variant="secondary"
                        size="sm"
                        className="rounded-full"
                      >
                        <Link href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-background/90 backdrop-blur-sm border-primary/10 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{locale === "he" ? "טופס פנייה" : "Project inquiry"}</h2>
                  <p className="text-sm text-muted-foreground">{copy.helperText}</p>
                </div>

                {sent && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm" dir={direction}>
                    {copy.success}
                  </div>
                )}

                {errors.length > 0 && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" dir={direction}>
                    <ul className="space-y-1">
                      {errors.map((err) => (
                        <li key={err}>• {err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground" htmlFor="name">
                    {copy.fields.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={copy.fields.name}
                    value={form.name}
                    onChange={handleChange}
                    dir={direction}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground" htmlFor="email">
                    {copy.fields.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={copy.fields.email}
                    value={form.email}
                    onChange={handleChange}
                    dir={direction}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground" htmlFor="message">
                    {copy.fields.message}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={copy.fields.message}
                    value={form.message}
                    onChange={handleChange}
                    dir={direction}
                    className="min-h-[160px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={pending}>
                  {pending ? (locale === "he" ? "שולח..." : "Sending...") : copy.button}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
