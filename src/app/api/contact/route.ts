import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, ContactFormData } from "@/lib/contact";

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

async function sendEmail(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_EMAIL || "liormedan1@gmail.com";

  // Escape HTML to prevent XSS
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

  const emailContent = {
    from: fromEmail,
    to: [toEmail],
    replyTo: data.email,
    subject: `New Contact Form Message from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          New Contact Form Message
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>From:</strong> ${safeName}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #3b82f6; white-space: pre-wrap;">
            ${safeMessage}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This message was sent from the contact form on your developer page.</p>
          <p>Reply directly to this email to respond to ${safeName}.</p>
        </div>
      </div>
    `,
    text: `New Contact Form Message\n\nFrom: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  };

  const result = await resend.emails.send(emailContent);
  
  if (result.error) {
    throw new Error(`Failed to send email: ${result.error.message}`);
  }

  return result.data;
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
