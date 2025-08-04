"use client";

import { useState } from "react";

export function CancelSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        alert('Assinatura cancelada com sucesso! Você continuará tendo acesso até o final do período atual.');
        window.location.reload();
      } else {
        alert(data.error || 'Erro ao cancelar assinatura');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cancelar assinatura');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Confirmar cancelamento
          </h4>
          <p className="text-sm text-yellow-700 mb-4">
            Sua assinatura será cancelada ao final do período atual. Você continuará tendo acesso até lá.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Cancelando...' : 'Confirmar cancelamento'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Manter assinatura
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Cancelar Assinatura
    </button>
  );
}