"use client";

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  query?: string;
  onClear?: () => void;
}

export function EmptyState({ query, onClear }: EmptyStateProps): JSX.Element {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center dark:border-slate-700 dark:bg-slate-800/40"
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
        <SearchX size={28} aria-hidden="true" />
      </span>

      <h2 className="mb-1.5 text-base font-semibold text-slate-800 dark:text-slate-200">
        No users found
      </h2>

      <p className="mb-6 max-w-xs text-sm text-slate-500 dark:text-slate-400">
        {query
          ? `No results for "${query}". Try a different name, email, or company.`
          : "No users match your current filters."}
      </p>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-95 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
