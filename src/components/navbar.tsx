"use client";

import Link from "next/link";
import { logOut } from "@/actions/auth";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Como o componente agora é client-side, precisamos passar o usuário como prop
interface NavbarProps {
  user: {
    id: number;
    email: string;
    role: string;
    name?: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logOut();
  };

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">
        <li>
          <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
        </li>
        <li>
          <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
        </li>
        <li>
          <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
        </li>
        <li>
          <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
        </li>
        <li>
          <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
        </li>
        <li>
          <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
        </li>
      </ul>
    </nav>
  );
}