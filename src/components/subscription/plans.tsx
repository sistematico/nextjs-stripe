"use client";

import { useState, useEffect } from "react";
import { PaymentModal } from "@/components/subscription/payment-modal";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  price_id: string;
}

export function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/planos")
      .then(res => res.json())
      .then(data => {
        setPlans(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar planos:", err);
        setLoading(false);
      });
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Pequeno delay para limpar o plano selecionado após a animação
    setTimeout(() => setSelectedPlan(null), 300);
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
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Nenhum plano disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map(plan => (
                <div 
                  key={plan.id} 
                  className="relative bg-white text-black rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
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

                    <div className="mt-auto">
                      <button
                        onClick={() => handleSelectPlan(plan)}
                        className="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Assinar Agora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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