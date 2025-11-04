import { NextResponse } from "next/server";
import { validateContact, ContactFormData } from "@/lib/contact";

async function sendEmail(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set; email not sent.");
    return;
  }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "noreply@example.com",
      to: process.env.CONTACT_EMAIL ?? "example@example.com",
      subject: `New contact from ${data.name}`,
      text: `${data.name} <${data.email}> says:\n\n${data.message}`,
    }),
  });
}

export async function POST(req: Request) {
  const body = (await req.json()) as ContactFormData;
  const errors = validateContact(body);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    await sendEmail(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
