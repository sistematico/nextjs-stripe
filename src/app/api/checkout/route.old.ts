"use server";

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();
  if (!priceId) return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
  const origin = (await headers()).get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      ui_mode: "embedded",
      return_url: `${origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ sessionId: session.id, client_secret: session.client_secret }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}