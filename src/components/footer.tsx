// src/components/footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span>{new Date().getFullYear()} Página desenvolvida por Lucas Saliés Brum,</span>
          <span>código no</span>
          <Link
            className="text-indigo-600 dark:text-indigo-400 hover:underline hover:underline-offset-4"
            href="https://github.com/sistematico/nextjs-simple-auth"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}