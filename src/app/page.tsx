import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-nunito-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
      </main>
    </div>
  );
}