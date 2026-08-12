"use client";

import { ArrowUpDown, ChevronDown } from "lucide-react";
import type { SortConfig, SortKey } from "@/types/user";

interface UserSortProps {
  value: SortConfig;
  onChange: (config: SortConfig) => void;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "firstName", label: "First Name A→Z" },
  { key: "lastName", label: "Last Name A→Z" },
  { key: "company", label: "Company A→Z" },
];

export function UserSort({ value, onChange }: UserSortProps)  {
  const currentLabel =
    SORT_OPTIONS.find((o) => o.key === value.key)?.label ?? "Sort";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const [key, order] = e.target.value.split("|") as [SortKey, "asc" | "desc"];
    onChange({ key, order });
  };

  const selectValue = `${value.key}|${value.order}`;

  return (
    <div className="relative">
      <label htmlFor="user-sort" className="sr-only">
        Sort users
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"
      >
        <ArrowUpDown size={14} />
      </span>
      <select
        id="user-sort"
        value={selectValue}
        onChange={handleChange}
        className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm text-slate-700 shadow-sm transition-all focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        {SORT_OPTIONS.map((opt) => (
          <optgroup key={opt.key} label={opt.label.replace(" A→Z", "")}>
            <option value={`${opt.key}|asc`}>{opt.label}</option>
            <option value={`${opt.key}|desc`}>{opt.label.replace("A→Z", "Z→A")}</option>
          </optgroup>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-slate-400"
      >
        <ChevronDown size={14} />
      </span>
    </div>
  );
}
