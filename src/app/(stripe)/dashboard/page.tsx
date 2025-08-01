import { getCurrentUser } from "@/lib/user";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
import { Card } from "@/components/ui/card";

export default async function Dashboard() {
  const user = await getCurrentUser();
  let subscriptions = null;
  if (user) subscriptions = await fetchSubscriptionByEmail(user.email);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      {subscriptions ? (
        <>

            <Card>
              <div className="p-4">
                <h2 className="text-lg font-bold">{subscriptions.items.data[0].plan.nickname}</h2>
                <table>
                  <tbody>
                    <tr>
                      <td className="text-sm text-gray-600">Preço:</td>
                      <td className="text-sm font-bold">R$ {subscriptions.items.data[0].plan.amount ? (subscriptions.items.data[0].plan.amount / 100).toFixed(2) : 0}</td>
                    </tr>
                    <tr>
                      <td className="text-sm text-gray-600">Recursos:</td>
                      <td className="text-sm font-bold">Acesso a todos os recursos básicos</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600">{subscriptions.description}</p>
              </div>
            </Card>
        {/* <p className="text-lg">Welcome to your dashboard! {JSON.stringify(subscriptions)}</p> */}
        <p className="text-lg">{JSON.stringify(subscriptions.items.data[0].price.unit_amount, null, 2)}</p>
        </>
      ) : (
        <p className="text-lg">You are not subscribed to any plans.</p>
      )}
    </div>
  );
}