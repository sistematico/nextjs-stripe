import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
//   apiVersion: "2025-07-30.basil",
//   typescript: true,
//   maxNetworkRetries: 3,
//   telemetry: true,
// });
