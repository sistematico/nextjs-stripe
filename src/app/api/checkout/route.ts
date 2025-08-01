import Stripe from "stripe";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-07-30.basil" });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Your Product Name',
//             },
//             unit_amount: 1000, // Price in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${req.headers.origin}/success`,
//       cancel_url: `${req.headers.origin}/cancel`,
//     });

//     res.status(200).json({ id: session.id });
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }

export async function POST(request: NextRequest) {
  // const body = await request.json();
  // const { name } = body;
  // const newUser = { id: Date.now(), name };
 
  // return new Response(JSON.stringify(newUser), {
  //   status: 201,
  //   headers: { 'Content-Type': 'application/json' }
  // });

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
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }