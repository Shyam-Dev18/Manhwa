"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-secondary/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-accent font-bold text-3xl tracking-tight">
              ManhwaVerse
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-text-primary transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/dmca" className="hover:text-text-primary transition-colors">
              DMCA
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-text-primary transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-text-primary transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 menu-overlay md:hidden" onClick={() => setMenuOpen(false)}>
          <nav
            className="absolute top-14 right-0 w-56 bg-bg-secondary border border-border rounded-bl-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/"
              className="block px-6 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors border-b border-border"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-6 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors border-b border-border"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="block px-6 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors border-b border-border"
              onClick={() => setMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              href="/dmca"
              className="block px-6 py-3 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              DMCA
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
