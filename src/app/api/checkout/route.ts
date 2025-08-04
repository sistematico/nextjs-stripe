"use server";

import { headers } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/user";

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();
    
    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }
    
    const origin = (await headers()).get("origin") || "http://localhost:3000";
    const user = await getCurrentUser();

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
      billing_address_collection: 'required',
    };

    // Se o usuário estiver logado, usar apenas customer_email
    if (user) {
      sessionConfig.customer_email = user.email;
      
      // Adicionar metadados para rastreamento
      sessionConfig.metadata = {
        user_id: user.id.toString(),
        user_email: user.email,
        user_name: user.name,
      };

      // Configurar coleta de endereço de envio
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['BR'],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    if (!session.client_secret) {
      console.error('Session criada mas sem client_secret:', session);
      return NextResponse.json({ error: "Erro ao criar sessão de pagamento" }, { status: 500 });
    }

    return NextResponse.json({ 
      sessionId: session.id, 
      client_secret: session.client_secret 
    }, { status: 200 });

  } catch (error) {
    console.error('Erro detalhado ao criar sessão de checkout:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }, { status: 500 });
  }
}