// src/components/navbar.tsx
import Link from "next/link";
import { navLinks } from "@/config";

export function Navbar() {
  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-gray-600 dark:text-gray-300 transition hover:text-gray-900 dark:hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}