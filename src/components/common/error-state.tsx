"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps)  {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center dark:border-red-900/40 dark:bg-red-950/20"
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
        <AlertTriangle size={28} aria-hidden="true" />
      </span>

      <h2 className="mb-2 text-lg font-semibold text-red-900 dark:text-red-300">
        Failed to load users
      </h2>

      <p className="mb-6 max-w-md text-sm text-red-700 dark:text-red-400">
        {message ?? "Something went wrong while fetching the user directory. Please check your connection and try again."}
      </p>

      {message && message !== "Failed to load users" && (
        <code className="mb-6 block max-w-sm rounded-lg border border-red-200 bg-white px-4 py-2 font-mono text-xs text-red-600 dark:border-red-800 dark:bg-red-950/60 dark:text-red-400">
          {message}
        </code>
      )}

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 active:scale-95"
        >
          <RefreshCw size={15} aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
}
