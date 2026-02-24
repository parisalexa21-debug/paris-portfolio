import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import FloatingChat from "@/app/components/FloatingChat";

export const metadata = {
  title: "Paris Peña | Portfolio",
  description: "Portfolio website with AI assistant",
};

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="nav-link">
      {label}
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header
          className="sticky top-0 z-50 border-b backdrop-blur
            bg-white/80 border-black/10
            dark:bg-[#050b14]/80 dark:border-white/10"
        >
          <nav className="container py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Paris Peña
            </Link>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden sm:flex items-center gap-4 sm:gap-6">
                <NavItem href="/about" label="About" />
                <NavItem href="/projects" label="Projects" />
                <NavItem href="/ai" label="AI Assistant" />
                <NavItem href="/contact" label="Contact" />
              </div>

              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className="container">{children}</main>

        <footer className="container py-10 footer-text">
          © {new Date().getFullYear()} Paris Peña — Built with Next.js + Tailwind + AI
        </footer>

        {/* Floating chat bubble on every page */}
        <FloatingChat />
      </body>
    </html>
  );
}
