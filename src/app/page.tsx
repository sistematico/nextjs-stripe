import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plans } from "@/components/subscription/plans";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <Plans />
        </div>
      </div>
    );
  }

  return (
    // <div className="flex-1 flex items-center justify-center p-4">
      <div className="flex flex-col gap-8 items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          Este é um exemplo simples de autenticação com Next.js sem libs externas.<br />
          Para saber mais, acesse o repositório no Github: <a href="https://github.com/sistematico/nextjs-simple-auth" className="text-blue-500 hover:underline" target="_blank">sistematico/nextjs-simple-auth</a>.
        </p>
        {user ? (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Bem-vindo, {user.name}! 👋</CardTitle>
              <CardDescription>
                Você está logado como <strong>{user.email}</strong>
                <br />
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                  Role: {user.role}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              {user.role === "admin" && (
                <Link href="/admin">Admin Panel</Link>
              )}
            </CardContent>
          </Card>
        )
      : null}
      </div>
    // </div>
  );
}