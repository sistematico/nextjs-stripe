"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  price_id: string;
}

export default function Subscriptions() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    // Fetch subscription plans from your API
    fetch("/api/planos")
      .then(res => res.json())
      .then(data => setPlans(data));
  }, []);


  const handleSubscribe = async (priceId: string): Promise<void> => {
    const stripe = await stripePromise;
    const { sessionId }: { sessionId: string } = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    }).then(res => res.json());

    if (!stripe) {
      console.error("Stripe.js has not loaded.");
      return;
    }

    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <div>
      <h1>Choose a Subscription Plan</h1>
      {!plans || plans.length === 0 ? (
        <p>Loading plans...</p>
      ) : (
        plans.map(plan => (
          <div key={plan.id}>
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
            <p>Price: ${plan.price / 100} / {plan.interval}</p>
            <button onClick={() => handleSubscribe(plan.price_id)}>Subscribe</button>
          </div>
        ))
      )}
    </div>
  );
}