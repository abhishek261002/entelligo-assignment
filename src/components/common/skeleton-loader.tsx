import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string })  {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-700", className)}
    />
  );
}

/** Skeleton for a single grid card */
export function CardSkeleton()  {
  return (
    <div
      aria-busy="true"
      aria-label="Loading user card"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Avatar + name row */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      {/* Body lines */}
      <div className="mt-5 space-y-2.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}

/** Skeleton grid — `count` cards */
export function GridSkeleton({ count = 12 }: { count?: number })  {
  return (
    <div
      role="status"
      aria-label="Loading users"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading users…</span>
    </div>
  );
}

/** Skeleton for a single table row */
export function TableRowSkeleton()  {
  return (
    <tr aria-hidden="true">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-3.5 w-36" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-3.5 w-32" />
      </td>
      <td className="hidden px-4 py-3 md:table-cell">
        <Skeleton className="h-3.5 w-28" />
      </td>
      <td className="hidden px-4 py-3 lg:table-cell">
        <Skeleton className="h-3.5 w-20" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-8 w-20 rounded-lg" />
      </td>
    </tr>
  );
}

/** Full table skeleton */
export function TableSkeleton({ rows = 10 }: { rows?: number })  {
  return (
    <div
      role="status"
      aria-label="Loading users table"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
    >
      <table className="w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
          <tr>
            {["User", "Email", "Company", "City", "Role", ""].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
      <span className="sr-only">Loading users…</span>
    </div>
  );
}
