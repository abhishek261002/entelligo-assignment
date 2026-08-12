import Link from "next/link";
import { Users, Github as GitHub } from "lucide-react";
import { Container } from "./container";

export function Navbar(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-xl dark:bg-slate-900/70">
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between gap-4"
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-80 dark:text-white"
            aria-label="User Directory – home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Users size={18} aria-hidden="true" />
            </span>
            <span className="hidden text-lg font-semibold tracking-tight sm:block">
              UserDirectory
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
              Senior Frontend Assessment
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <GitHub size={18} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
