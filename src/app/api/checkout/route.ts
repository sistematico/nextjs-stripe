import Stripe from "stripe";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-07-30.basil" });

export async function POST(request: NextRequest) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Your Product Name',
          },
          unit_amount: 1000, // Price in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${request.headers.get('origin')}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.headers.get("origin")}/cancelamento`,
  });

  return new Response(JSON.stringify({ id: session.id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}