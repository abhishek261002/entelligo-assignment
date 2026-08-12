"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/types/user";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const OPTIONS: { mode: ViewMode; label: string; Icon: typeof LayoutGrid }[] = [
  { mode: "grid", label: "Grid view", Icon: LayoutGrid },
  { mode: "table", label: "Table view", Icon: List },
];

export function ViewToggle({ value, onChange }: ViewToggleProps): JSX.Element {
  return (
    <div
      role="group"
      aria-label="Toggle view mode"
      className="flex h-10 items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {OPTIONS.map(({ mode, label, Icon }) => (
        <button
          key={mode}
          type="button"
          role="radio"
          aria-checked={value === mode}
          aria-label={label}
          onClick={() => onChange(mode)}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 px-3.5 text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
            value === mode
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
          )}
        >
          <Icon size={15} aria-hidden="true" />
          <span className="hidden sm:inline">{mode === "grid" ? "Grid" : "Table"}</span>
        </button>
      ))}
    </div>
  );
}
