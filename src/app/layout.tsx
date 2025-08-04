// src/app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Auth + Stripe",
  description: "Sistema de autenticação e pagamentos com Next.js e Stripe",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${nunito.variable} min-h-screen flex flex-col antialiased overflow-x-hidden`}>
        <Header />
        <main className="flex-1 flex flex-col">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
