import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound(): JSX.Element {
  return (
    <main className="flex flex-1 items-center justify-center py-20">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 mx-auto dark:bg-slate-800 dark:text-slate-400">
            <SearchX size={32} aria-hidden="true" />
          </span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">404</h1>
          <h2 className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
            Page not found
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Directory
          </Link>
        </div>
      </Container>
    </main>
  );
}
