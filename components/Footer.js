import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          {/* Brand */}
          <div>
            <h3 className="text-accent font-bold text-lg mb-2">ManhwaVerse</h3>
            <p className="text-text-muted leading-relaxed">
              Read The Max-Level Player&apos;s 100th Regression and other manhwa in high quality.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1.5 text-text-muted">
              <li>
                <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-text-primary transition-colors">About</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-text-primary transition-colors">DMCA</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold mb-2">Contact</h4>
            <p className="text-text-muted">
              Email:{" "}
              <a
                href={`mailto:${process.env.CONTACT_EMAIL || "contact@manhwaverse.com"}`}
                className="text-accent hover:text-accent-hover transition-colors"
              >
                {process.env.CONTACT_EMAIL || "contact@manhwaverse.com"}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-center text-text-muted text-xs">
          <p>© {year} ManhwaVerse. All rights reserved. All content belongs to their respective owners.</p>
          <p className="mt-1">
            Built by{" "}
            <a
              href="https://github.com/Shyam-Dev18"
              className="text-accent hover:text-accent-hover transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shyam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
