// src/app/(checkout)/sucesso/page.tsx
import { Suspense } from "react";
import SuccessContent from "./success";

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSuccess />}>
      <SuccessContent />
    </Suspense>
  );
}

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