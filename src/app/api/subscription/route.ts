import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user";
import { fetchSubscriptionByEmail } from "@/lib/stripe";

export async function GET() {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json({ subscription: null });
  }

  try {
    const subscription = await fetchSubscriptionByEmail(user.email);
    return NextResponse.json({ subscription });
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    return NextResponse.json({ subscription: null });
  }
}