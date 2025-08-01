// src/components/header.tsx
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/user";
import { Navbar } from "@/components/navbar";
import { UserMenu } from "@/components/ui/user-menu";
import { MobileMenu } from "@/components/mobile-menu";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/next.svg"
                alt="Next.js Logo"
                width={100}
                height={20}
                className="dark:invert"
                priority
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Navbar />
            <UserMenu user={user} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}