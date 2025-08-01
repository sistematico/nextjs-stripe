"use client";

import { useState, useEffect } from "react";
import { PaymentButton } from "@/components/subscription/payment-button";

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
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    fetch("/api/planos")
      .then(res => res.json())
      .then(data => setPlans(data));
  }, []);

  // const handleSubscribe = async (priceId: string): Promise<void> => {
  //   const stripe = await stripePromise;
  //   const { sessionId }: { sessionId: string } = await fetch("/api/checkout", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ priceId }),
  //   }).then(res => res.json());

  //   if (!stripe) {
  //     console.error("Stripe.js has not loaded.");
  //     return;
  //   }

  //   const result = await stripe.redirectToCheckout({ sessionId });
  //   if (result.error) {
  //     console.error("Error redirecting to checkout:", result.error.message);
  //     console.error(result.error);
  //   }
  // };

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full w-md-2xl">
        <h1>Choose a Subscription Plan</h1>
        {!plans || plans.length === 0 ? (
          <p>Loading plans...</p>
        ) : (
          plans.map(plan => (
            <div key={plan.id} onClick={() => setPlan(plan)} className="cursor-pointer p-4 border rounded-lg mb-4">
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <p>Price: ${plan.price / 100} / {plan.interval}</p>
            </div>
          ))
        )}
        {plan && (
          <PaymentButton priceId={plan?.price_id} />
        )}
      </div>
    </div>
  );
}