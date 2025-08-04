"use client";

import { useState, useEffect } from "react";
import { PaymentModal } from "@/components/subscription/payment-modal";
import { CancelSubscriptionButton } from "@/components/subscription/cancel";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  price_id: string;
}

interface UserSubscription {
  id: string;
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  items: {
    data: Array<{
      price: {
        id: string;
        unit_amount: number;
        recurring: {
          interval: string;
        };
      };
    }>;
  };
}

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/plans").then(res => res.json()),
      fetch("/api/subscription").then(res => res.json()) // Vamos criar essa API
    ])
      .then(([plans, subscription]) => {
        plans.reverse();
        setPlans(plans);
        setUserSubscription(subscription.subscription || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPlan(null), 300);
  };

  const getCurrentPlanPrice = () => {
    if (!userSubscription) return null;
    return userSubscription.items.data[0]?.price.unit_amount;
  };

  const getButtonText = (plan: Plan) => {
    const currentPlanPrice = getCurrentPlanPrice();
    
    if (!userSubscription) {
      return "Assinar Agora";
    }

    if (userSubscription.items.data[0]?.price.id === plan.price_id) {
      return userSubscription.cancel_at_period_end ? "Reativar" : "Plano Atual";
    }

    if (currentPlanPrice && plan.price > currentPlanPrice) {
      return "Upgrade";
    }

    if (currentPlanPrice && plan.price < currentPlanPrice) {
      return "Downgrade";
    }

    return "Trocar Plano";
  };

  const getButtonStyle = (plan: Plan) => {
    const currentPlanPrice = getCurrentPlanPrice();
    const isCurrentPlan = userSubscription?.items.data[0]?.price.id === plan.price_id;
    const isCanceled = userSubscription?.cancel_at_period_end;

    if (isCurrentPlan && !isCanceled) {
      return "w-full bg-gray-400 text-white rounded-lg px-6 py-3 font-medium cursor-not-allowed";
    }

    if (isCurrentPlan && isCanceled) {
      return "w-full bg-green-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-green-700 transition-colors duration-200";
    }

    if (currentPlanPrice && plan.price > currentPlanPrice) {
      return "w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition-colors duration-200";
    }

    if (currentPlanPrice && plan.price < currentPlanPrice) {
      return "w-full bg-orange-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-orange-700 transition-colors duration-200";
    }

    return "w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-indigo-700 transition-colors duration-200";
  };

  const isButtonDisabled = (plan: Plan) => {
    const isCurrentPlan = userSubscription?.items.data[0]?.price.id === plan.price_id;
    const isCanceled = userSubscription?.cancel_at_period_end;
    return isCurrentPlan && !isCanceled;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando planos...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Escolha seu Plano</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Selecione o plano que melhor atende às suas necessidades
            </p>
            {userSubscription && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg inline-block">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {userSubscription.cancel_at_period_end 
                    ? "Sua assinatura será cancelada em " + new Date(userSubscription.current_period_end * 1000).toLocaleDateString('pt-BR')
                    : "Você tem uma assinatura ativa"
                  }
                </p>
              </div>
            )}
          </div>
          
          {plans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Nenhum plano disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map(plan => {
                const isCurrentPlan = userSubscription?.items.data[0]?.price.id === plan.price_id;
                const isCanceled = userSubscription?.cancel_at_period_end;
                
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white text-black rounded-2xl border p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                      isCurrentPlan ? 'border-indigo-500 border-2' : 'border-gray-200'
                    }`}
                  >
                    {isCurrentPlan && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {isCanceled ? "Cancelando" : "Plano Atual"}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h2>
                        <p>{plan.description || "Plano de assinatura"}</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-gray-900">R$</span>
                          <span className="text-5xl font-bold ml-1 text-gray-900">{(plan.price / 100).toFixed(0)}</span>
                          <span className="text-gray-600 ml-2">/{plan.interval === 'month' ? 'mês' : 'ano'}</span>
                        </div>
                      </div>
                      
                      <div className="mt-auto space-y-3">
                        <button
                          onClick={() => handleSelectPlan(plan)}
                          disabled={isButtonDisabled(plan)}
                          className={getButtonStyle(plan)}
                        >
                          {getButtonText(plan)}
                        </button>
                        
                        {isCurrentPlan && !isCanceled && (
                          <CancelSubscriptionButton />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {selectedPlan && (
            <PaymentModal
              plan={selectedPlan}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}