import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoItem {
  label: string;
  value: ReactNode;
  hidden?: boolean;
}

interface UserInfoCardProps {
  title: string;
  icon: ReactNode;
  items: InfoItem[];
  className?: string;
}

export function UserInfoCard({
  title,
  icon,
  items,
  className,
}: UserInfoCardProps)  {
  const visibleItems = items.filter((item) => !item.hidden && item.value);

  if (visibleItems.length === 0) return <></>;

  return (
    <section
      aria-labelledby={`info-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4 dark:border-slate-700/60">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" aria-hidden="true">
          {icon}
        </span>
        <h2
          id={`info-card-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-sm font-semibold text-slate-800 dark:text-slate-200"
        >
          {title}
        </h2>
      </div>

      {/* Content */}
      <dl className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2 dark:bg-slate-700/40">
        {visibleItems.map((item) => (
          <div
            key={item.label}
            className="bg-white px-5 py-3.5 dark:bg-slate-800"
          >
            <dt className="mb-0.5 text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {item.label}
            </dt>
            <dd className="text-sm font-medium text-slate-800 dark:text-slate-200 break-words">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
