"use client";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch('/api/checkout', { method: 'POST' });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="container mx-auto py-20">
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] w-full w-md-2xl">
        <h1>Stripe Checkout Example</h1>
        <button 
          onClick={handleCheckout}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >Checkout</button>
      </div>
    </div>
  );
}