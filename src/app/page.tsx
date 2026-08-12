"use client";

import { Container } from "@/components/layout/container";
import { UserSearchBar } from "@/components/directory/user-search-bar";
import { ViewToggle } from "@/components/directory/view-toggle";
import { UserSort } from "@/components/directory/user-sort";
import { UserGrid } from "@/components/directory/user-grid";
import { UserTable } from "@/components/directory/user-table";
import { GridSkeleton, TableSkeleton } from "@/components/common/skeleton-loader";
import { ErrorState } from "@/components/common/error-state";
import { EmptyState } from "@/components/common/empty-state";
import { useUserDirectory } from "@/hooks/use-user-directory";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage()  {
  const {
    paginatedUsers,
    totalCount,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortConfig,
    setSortConfig,
    viewMode,
    setViewMode,
    page,
    totalPages,
    setPage,
    refetch,
    clearSearch,
  } = useUserDirectory();

  return (
    <main className="flex-1 py-8">
      <Container>
        {/* ── Page header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Users size={14} aria-hidden="true" />
            <span>Directory</span>
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            User Directory
          </h1>
          <p className="mt-1.5 text-slate-500 dark:text-slate-400">
            Browse, search, and filter all users in the system.
          </p>
        </div>

        {/* ── Control toolbar ── */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <UserSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            className="min-w-0 flex-1 basis-64"
          />
          <UserSort value={sortConfig} onChange={setSortConfig} />
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>

        {/* ── Stats bar ── */}
        {!isLoading && !error && (
          <div className="mb-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>
              {totalCount === 0
                ? "No users found"
                : `Showing ${Math.min((page - 1) * 12 + 1, totalCount)}–${Math.min(page * 12, totalCount)} of ${totalCount} users`}
            </span>
            {searchQuery && (
              <span className="text-indigo-600 dark:text-indigo-400">
                Filtered by &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>
        )}

        {/* ── Content ── */}
        {isLoading ? (
          viewMode === "grid" ? (
            <GridSkeleton count={12} />
          ) : (
            <TableSkeleton rows={10} />
          )
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : paginatedUsers.length === 0 ? (
          <EmptyState query={searchQuery} onClear={clearSearch} />
        ) : viewMode === "grid" ? (
          <UserGrid users={paginatedUsers} />
        ) : (
          <UserTable
            users={paginatedUsers}
            sortConfig={sortConfig}
            onSort={setSortConfig}
          />
        )}

        {/* ── Pagination ── */}
        {!isLoading && !error && totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-8 flex items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - page) <= 1
                )
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                    acc.push("…");
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "…" ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="flex h-9 w-7 items-center justify-center text-sm text-slate-400"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p as number)}
                      aria-label={`Page ${p}`}
                      aria-current={page === p ? "page" : undefined}
                      className={
                        page === p
                          ? "flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm"
                          : "flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
                      }
                    >
                      {p}
                    </button>
                  )
                )}
            </div>

            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        )}
      </Container>
    </main>
  );
}
