import { SettingsForm } from "@/components/auth/settings";
import { getCurrentUser } from "@/lib/user";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Acesso Negado</h1>
        <p className="mt-2 text-foreground/60">
          Você precisa estar logado para acessar esta página.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Ajustes</h1>
      <p className="mt-2 text-foreground/60">
        Gerencie suas informações pessoais e configurações da conta
      </p>
      <SettingsForm user={user} />
    </>
  );
}