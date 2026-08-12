import { Container } from "@/components/layout/container";

export default function UserDetailLoading() {
  return (
    <main className="flex-1 py-8">
      <Container>
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Back button skeleton */}
        <div className="mb-6 h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

        {/* Header skeleton */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="h-32 animate-pulse bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600" />
          <div className="px-6 pb-6">
            <div className="-mt-10 h-20 w-20 animate-pulse rounded-2xl bg-slate-300 ring-4 ring-white dark:bg-slate-600 dark:ring-slate-800" />
            <div className="mt-4 space-y-2">
              <div className="h-7 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* Info cards skeleton */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-700/60">
                <div className="h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="space-y-px">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="px-5 py-3.5">
                    <div className="mb-1.5 h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
