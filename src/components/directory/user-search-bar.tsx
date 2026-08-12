"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function UserSearchBar({
  value,
  onChange,
  className,
}: UserSearchBarProps): JSX.Element {
  return (
    <div className={cn("relative flex-1", className)}>
      <label htmlFor="user-search" className="sr-only">
        Search users by name, email, or company
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400"
      >
        <Search size={16} />
      </span>
      <input
        id="user-search"
        type="search"
        role="searchbox"
        autoComplete="off"
        spellCheck={false}
        placeholder="Search by name, email, or company…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-2.5 flex items-center rounded-md text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:hover:text-slate-200"
        >
          <X size={15} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
