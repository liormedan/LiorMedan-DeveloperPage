"use client";

import { useState } from "react";
import { validateContact, ContactFormData } from "@/lib/contact";

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateContact(form);
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
      setErrors(data.errors ?? ["Failed to send message"]);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Contact</h1>
      {sent && <p className="mb-4 text-green-600">Message sent successfully!</p>}
      {errors.length > 0 && (
        <ul className="mb-4 text-red-600 list-disc list-inside">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          className="border p-2"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />
        <button className="bg-blue-600 text-white p-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
