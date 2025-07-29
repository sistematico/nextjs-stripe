import Link from "next/link";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-1 py-3 sm:py-4 text-xs sm:text-sm text-foreground/60">
          {new Date().getFullYear()} Página desenvolvida por Lucas Saliés Brum, código no
          <Link
            className="hover:underline hover:underline-offset-4"
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