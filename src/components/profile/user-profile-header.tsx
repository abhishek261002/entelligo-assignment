"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, User as UserIcon } from "lucide-react";
import { cn, avatarFallback } from "@/lib/utils";
import type { User } from "@/types/user";

interface UserProfileHeaderProps {
  user: User;
}

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800",
  moderator: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-800",
  user: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800",
};

export function UserProfileHeader({ user }: UserProfileHeaderProps): JSX.Element {
  const [imgError, setImgError] = useState(false);
  const avatarSrc = imgError || !user.avatar ? avatarFallback(user.fullName) : user.avatar;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Cover gradient */}
      <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" aria-hidden="true" />

      <div className="px-6 pb-6">
        {/* Avatar overlapping cover */}
        <div className="-mt-10 flex items-end justify-between">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-white dark:ring-slate-800">
            <Image
              src={avatarSrc}
              alt={`${user.fullName}'s profile picture`}
              fill
              sizes="80px"
              className="object-cover"
              onError={() => setImgError(true)}
              unoptimized={avatarSrc.includes("dicebear")}
              priority
            />
          </div>
          <span
            className={cn(
              "mb-1 rounded-full border px-3 py-1 text-xs font-semibold capitalize",
              ROLE_COLORS[user.role.toLowerCase()] ?? ROLE_COLORS.user
            )}
          >
            {user.role}
          </span>
        </div>

        {/* Name & title */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user.fullName}
          </h1>
          {user.jobTitle && (
            <p className="mt-0.5 text-sm font-medium text-slate-500 dark:text-slate-400">
              {user.jobTitle}
              {user.department ? ` · ${user.department}` : ""}
            </p>
          )}
          {user.company && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {user.company}
            </p>
          )}
        </div>

        {/* Quick contact strip */}
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
          <a
            href={`mailto:${user.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Mail size={14} aria-hidden="true" />
            {user.email}
          </a>
          {user.phone && (
            <a
              href={`tel:${user.phone}`}
              className="flex items-center gap-1.5 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Phone size={14} aria-hidden="true" />
              {user.phone}
            </a>
          )}
          {user.city && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" />
              {user.city}
              {user.country ? `, ${user.country}` : ""}
            </span>
          )}
          {user.age && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              Age {user.age}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <UserIcon size={14} aria-hidden="true" />
            @{user.username}
          </span>
        </div>
      </div>
    </div>
  );
}
