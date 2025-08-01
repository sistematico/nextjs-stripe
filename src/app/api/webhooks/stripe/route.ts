import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// interface InvoiceData {
//   id: string;
//   customer: string;
//   subscription: string;
//   amount_paid: number;
//   amount_due: number;
//   status: string;
//   period_start: number;
//   period_end: number;
// }

// interface SubscriptionData {
//   id: string;
//   status: string;
//   customer: string;
//   items: {
//     data: Array<{
//       id: string;
//       price: {
//         id: string;
//         product: string;
//       };
//     }>;
//   };
//   current_period_start: number;
//   current_period_end: number;
//   cancel_at_period_end: boolean;
// }

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  let event: Stripe.Invoice | Stripe.Subscription | Stripe.Event;

  if (!sig || !endpointSecret) return NextResponse.json({ error: 'Missing stripe signature or webhook secret' }, { status: 400 });

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      // await handleSubscriptionUpdated(event.data.object);
      console.log('Subscription updated:', event.data.object.id);
      break;
    case 'customer.subscription.deleted':
      // await handleSubscriptionDeleted(event.data.object);
      console.log('Subscription deleted:', event.data.object.id);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaid(event.data.object);
      break;
    // ... handle other events
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// async function handleSubscriptionUpdated(subscription: SubscriptionData): Promise<void> {
//   // Update the subscription status in your database
//   // You might want to update the user's access level based on the new subscription status
//   console.log('Subscription updated:', subscription.id);
// }

// async function handleSubscriptionDeleted(subscription: SubscriptionData): Promise<void> {
//   // Update the subscription status in your database
//   // You might want to revoke the user's access to premium features
//   console.log('Subscription deleted:', subscription.id);
// }

async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  // Update the user's payment status in your database
  // You might want to extend the user's access period
  console.log('Invoice paid:', invoice.id);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
