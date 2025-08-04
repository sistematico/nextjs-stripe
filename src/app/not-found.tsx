import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Erro 404</h1>
      <p className="text-lg">Página não encontrada.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
}