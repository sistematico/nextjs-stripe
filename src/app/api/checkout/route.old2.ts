"use server";

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/user";

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();
  if (!priceId) return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
  
  const origin = (await headers()).get("origin") || "http://localhost:3000";
  const user = await getCurrentUser();

  try {
    const sessionConfig: any = {
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
    };

    // Se o usuário estiver logado, preenche os dados automaticamente
    if (user) {
      sessionConfig.customer_email = user.email;
      sessionConfig.billing_address_collection = 'required';
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['BR'], // Ajuste conforme necessário
      };
      
      // Metadados para identificar o usuário
      sessionConfig.metadata = {
        user_id: user.id.toString(),
        user_email: user.email,
      };

      // Se você quiser pré-preencher mais dados, pode criar/buscar um customer
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        sessionConfig.customer = customers.data[0].id;
      } else {
        // Criar novo customer com dados do usuário
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: {
            user_id: user.id.toString(),
          },
        });
        sessionConfig.customer = customer.id;
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ 
      sessionId: session.id, 
      client_secret: session.client_secret 
    }, { status: 200 });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}