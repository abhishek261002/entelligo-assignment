"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { cn, avatarFallback } from "@/lib/utils";
import type { User, SortConfig, SortKey } from "@/types/user";

interface UserTableProps {
  users: User[];
  sortConfig: SortConfig;
  onSort: (config: SortConfig) => void;
}

function AvatarCell({ user }: { user: User }): JSX.Element {
  const [err, setErr] = useState(false);
  const src = err || !user.avatar ? avatarFallback(user.fullName) : user.avatar;
  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
      <Image
        src={src}
        alt={`${user.fullName} avatar`}
        fill
        sizes="36px"
        className="object-cover"
        onError={() => setErr(true)}
        unoptimized={src.includes("dicebear")}
      />
    </div>
  );
}

function SortIcon({ columnKey, config }: { columnKey: SortKey; config: SortConfig }): JSX.Element {
  if (config.key !== columnKey) {
    return <ArrowUpDown size={13} className="text-slate-300 dark:text-slate-600" aria-hidden="true" />;
  }
  return config.order === "asc"
    ? <ArrowUp size={13} className="text-indigo-500" aria-hidden="true" />
    : <ArrowDown size={13} className="text-indigo-500" aria-hidden="true" />;
}

const ROLE_PILL: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  moderator: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  user: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

export function UserTable({ users, sortConfig, onSort }: UserTableProps): JSX.Element {
  const handleSort = (key: SortKey): void => {
    onSort({
      key,
      order: sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc",
    });
  };

  return (
    <section aria-label="User directory table">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
              <tr>
                {/* User */}
                <th
                  scope="col"
                  className="px-4 py-3.5 text-left"
                >
                  <button
                    type="button"
                    onClick={() => handleSort("firstName")}
                    className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    aria-label={`Sort by name ${sortConfig.key === "firstName" && sortConfig.order === "asc" ? "descending" : "ascending"}`}
                  >
                    User
                    <SortIcon columnKey="firstName" config={sortConfig} />
                  </button>
                </th>
                {/* Email */}
                <th scope="col" className="px-4 py-3.5 text-left font-medium text-slate-600 dark:text-slate-400">
                  Email
                </th>
                {/* Company */}
                <th scope="col" className="px-4 py-3.5 text-left">
                  <button
                    type="button"
                    onClick={() => handleSort("company")}
                    className="flex items-center gap-1.5 font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    aria-label={`Sort by company ${sortConfig.key === "company" && sortConfig.order === "asc" ? "descending" : "ascending"}`}
                  >
                    Company
                    <SortIcon columnKey="company" config={sortConfig} />
                  </button>
                </th>
                {/* City */}
                <th scope="col" className="hidden px-4 py-3.5 text-left font-medium text-slate-600 dark:text-slate-400 md:table-cell">
                  City
                </th>
                {/* Role */}
                <th scope="col" className="hidden px-4 py-3.5 text-left font-medium text-slate-600 dark:text-slate-400 lg:table-cell">
                  Role
                </th>
                {/* Actions */}
                <th scope="col" className="px-4 py-3.5 text-right font-medium text-slate-600 dark:text-slate-400">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  {/* User */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <AvatarCell user={user} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900 dark:text-white">
                          {user.fullName}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${user.email}`}
                      className="truncate text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                    >
                      {user.email}
                    </a>
                  </td>
                  {/* Company */}
                  <td className="px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-slate-700 dark:text-slate-300">
                        {user.company || "—"}
                      </p>
                      {user.jobTitle && (
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {user.jobTitle}
                        </p>
                      )}
                    </div>
                  </td>
                  {/* City */}
                  <td className="hidden px-4 py-3 text-slate-600 dark:text-slate-400 md:table-cell">
                    {user.city || "—"}
                  </td>
                  {/* Role */}
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        ROLE_PILL[user.role.toLowerCase()] ?? ROLE_PILL.user
                      )}
                    >
                      {user.role}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/users/${user.id}`}
                      aria-label={`View profile of ${user.fullName}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                    >
                      Profile
                      <ExternalLink size={11} aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
