import { Card } from "@/components/ui/card";

export function PlanCard() {
  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-bold">Plano Básico</h2>
        <table>
          <tbody>
            <tr>
              <td className="text-sm text-gray-600">Preço:</td>
              <td className="text-sm font-bold">R$ 29,90/mês</td>
            </tr>
            <tr>
              <td className="text-sm text-gray-600">Recursos:</td>
              <td className="text-sm font-bold">Acesso a todos os recursos básicos</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm text-gray-600">Descrição do plano básico.</p>
      </div>
    </Card>
  );
}