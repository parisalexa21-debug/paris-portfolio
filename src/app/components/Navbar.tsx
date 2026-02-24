"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "AI Assistant", id: "assistant" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {onHome ? (
          <button
            onClick={() => scrollTo("home")}
            className="font-semibold tracking-tight"
          >
            Paris Peña
          </button>
        ) : (
          <Link href="/" className="font-semibold tracking-tight">
            Paris Peña
          </Link>
        )}

        <nav className="hidden sm:flex gap-5 text-sm">
          {links.map((l) =>
            onHome ? (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-gray-600 hover:text-gray-900"
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.id}
                href={`/#${l.id}`}
                className="text-gray-600 hover:text-gray-900"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile simple shortcut */}
        <Link
          className="sm:hidden text-sm text-gray-600 hover:text-gray-900"
          href="/#contact"
        >
          Contact →
        </Link>
      </div>
    </header>
  );
}