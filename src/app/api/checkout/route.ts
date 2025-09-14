import { NextResponse } from "next/server";

// Placeholder endpoint for checkout. In production, install `stripe` and
// implement server-side session creation using STRIPE_SECRET_KEY.

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const sku = searchParams.get("sku");
  return NextResponse.json(
    {
      ok: false,
      message:
        `Checkout not configured yet. SKU: ${sku ?? "unknown"}. Add Stripe and environment keys to enable payments.`,
    },
    { status: 501 }
  );
}

export const dynamic = "force-dynamic";

