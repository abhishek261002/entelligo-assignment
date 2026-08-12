import { Container } from "@/components/layout/container";
import { GridSkeleton } from "@/components/common/skeleton-loader";

export default function RootLoading() {
  return (
    <main className="flex-1 py-8">
      <Container>
        {/* Fake header skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <GridSkeleton count={12} />
      </Container>
    </main>
  );
}
