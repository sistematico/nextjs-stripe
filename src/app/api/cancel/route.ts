import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/user";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    // Buscar customer do Stripe pelo email
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: "Nenhuma assinatura encontrada" }, { status: 404 });
    }

    const customer = customers.data[0];
    
    // Buscar assinaturas ativas
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: "Nenhuma assinatura ativa encontrada" }, { status: 404 });
    }

    const subscription = subscriptions.data[0];

    // Cancelar assinatura no final do período atual
    const canceledSubscription = await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({ 
      success: true, 
      subscription: canceledSubscription,
      message: "Assinatura será cancelada no final do período atual"
    });
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}