"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Building2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { avatarFallback } from "@/lib/utils";
import type { User } from "@/types/user";

interface UserCardProps {
  user: User;
}

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  moderator: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  user: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

function getRoleBadge(role: string): string {
  return ROLE_COLORS[role.toLowerCase()] ?? ROLE_COLORS.user;
}

export function UserCard({ user }: UserCardProps)  {
  const [imgError, setImgError] = useState(false);

  const avatarSrc = imgError || !user.avatar ? avatarFallback(user.fullName) : user.avatar;

  return (
    <article
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-600"
      aria-label={`User card for ${user.fullName}`}
    >
      {/* Card header */}
      <div className="flex items-start gap-4 p-6 pb-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white ring-offset-1 dark:ring-slate-800">
          <Image
            src={avatarSrc}
            alt={`${user.fullName} avatar`}
            fill
            sizes="56px"
            className="object-cover"
            onError={() => setImgError(true)}
            unoptimized={avatarSrc.includes("dicebear")}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-slate-900 dark:text-white">
            {user.fullName}
          </h3>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            @{user.username}
          </p>
          <span
            className={cn(
              "mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
              getRoleBadge(user.role)
            )}
          >
            {user.role}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="space-y-2 px-6 pb-5 text-sm text-slate-600 dark:text-slate-400">
        {user.company && (
          <div className="flex items-start gap-2">
            <Building2 size={14} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
            <span className="truncate">{user.company}</span>
          </div>
        )}
        {user.jobTitle && (
          <div className="flex items-start gap-2">
            <span className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate text-slate-500">{user.jobTitle}</span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <Mail size={14} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
          <a
            href={`mailto:${user.email}`}
            className="truncate transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={(e) => e.stopPropagation()}
          >
            {user.email}
          </a>
        </div>
        {user.city && (
          <div className="flex items-start gap-2">
            <MapPin size={14} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
            <span className="truncate">{user.city}</span>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="mt-auto border-t border-slate-100 px-6 py-4 dark:border-slate-700/60">
        <Link
          href={`/users/${user.id}`}
          className="flex items-center justify-between text-sm font-medium text-indigo-600 transition-all hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          aria-label={`View full profile of ${user.fullName}`}
        >
          View Profile
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
