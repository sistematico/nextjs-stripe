// src/app/(checkout)/sucesso/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoadingSuccess() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Processando pagamento...</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  const [status, setStatus] = useState("loading");
  const [customerEmail, setCustomerEmail] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetchSessionStatus();
    }
  }, [sessionId]);

  async function fetchSessionStatus() {
    const response = await fetch("/api/check-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  }

  if (status === "loading") return (<div>Loading...</div>);
  if (status === "failed") return (<div>Failed to process subscription. Please try again.</div>);

  return (
    <Suspense fallback={<LoadingSuccess />}>
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full w-md-2xl">
          <h1>Subscription Successful!</h1>
          <p>Thank you for your subscription. A confirmation email has been sent to {customerEmail}.</p>
        </div>
      </div>
    </Suspense>
  );
}