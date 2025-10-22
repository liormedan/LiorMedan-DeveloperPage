"use client";

import { useState } from "react";
import { validateContact, ContactFormData } from "@/lib/contact";
import { useLanguage } from "@/lib/i18n/language-context";

const COPY = {
  he: {
    heading: "צור קשר",
    success: "ההודעה נשלחה בהצלחה!",
    fields: {
      name: "שם",
      email: "אימייל",
      message: "הודעה",
    },
    button: "שלח",
    errors: {
      "Name is required": "חובה להזין שם",
      "Valid email is required": "חובה להזין אימייל תקין",
      "Message is required": "חובה לכתוב הודעה",
      "Failed to send message": "שליחת ההודעה נכשלה",
    },
  },
  en: {
    heading: "Contact",
    success: "Message sent successfully!",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    button: "Send",
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
  }

  return (
    <div className="max-w-md mx-auto p-4" dir={direction}>
      <h1 className="text-2xl mb-4 font-semibold">{copy.heading}</h1>
      {sent && <p className="mb-4 text-green-600">{copy.success}</p>}
      {errors.length > 0 && (
        <ul className={`mb-4 text-red-600 list-disc list-inside ${direction === "rtl" ? "text-right" : "text-left"}`}>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          type="text"
          name="name"
          placeholder={copy.fields.name}
          value={form.name}
          onChange={handleChange}
          dir={direction}
        />
        <input
          className="border p-2 rounded"
          type="email"
          name="email"
          placeholder={copy.fields.email}
          value={form.email}
          onChange={handleChange}
          dir={direction}
        />
        <textarea
          className="border p-2 rounded min-h-[140px]"
          name="message"
          placeholder={copy.fields.message}
          value={form.message}
          onChange={handleChange}
          dir={direction}
        />
        <button className="bg-blue-600 text-white p-2 rounded" type="submit">
          {copy.button}
        </button>
      </form>
    </div>
  );
}
