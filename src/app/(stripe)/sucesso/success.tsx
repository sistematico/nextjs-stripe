// src/app/(checkout)/sucesso/success-content.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessContent() {
  const [status, setStatus] = useState("loading");
  const [customerEmail, setCustomerEmail] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus();
    } else {
      setStatus("no-session");
    }
  }, [sessionId]);

  async function fetchSessionStatus() {
    try {
      const response = await fetch("/api/check-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const { session, error } = await response.json();

      if (error) {
        setStatus("failed");
        console.error(error);
        return;
      }

      setStatus(session.status);
      setCustomerEmail(session.customer_email);
    } catch (error) {
      console.error("Error fetching session:", error);
      setStatus("failed");
    }
  }

  if (status === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (status === "no-session") {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Sessão não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Não foi possível encontrar informações sobre sua compra.
          </p>
          <Link
            href="/planos"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Voltar aos planos
          </Link>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
            Erro ao processar pagamento
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ocorreu um erro ao processar sua assinatura. Por favor, tente novamente.
          </p>
          <Link
            href="/planos"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Tentar novamente
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Assinatura realizada com sucesso!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Obrigado por sua assinatura.
        </p>
        
        {customerEmail && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Um email de confirmação foi enviado para <strong>{customerEmail}</strong>
          </p>
        )}
        
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Ir para o Dashboard
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}