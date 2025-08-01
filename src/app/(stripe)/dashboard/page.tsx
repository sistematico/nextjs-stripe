import { getCurrentUser } from "@/lib/user";
import { fetchSubscriptionByEmail } from "@/lib/stripe";

export default async function Dashboard() {
  const user = await getCurrentUser();
  let subscriptions = null;
  if (user) subscriptions = await fetchSubscriptionByEmail(user.email);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      {subscriptions ? (
        <p className="text-lg">Welcome to your dashboard! {JSON.stringify(subscriptions)}</p>
      ) : (
        <p className="text-lg">You are not subscribed to any plans.</p>
      )}
    </div>
  );
}