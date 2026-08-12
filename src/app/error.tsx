"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/common/error-state";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps): JSX.Element {
  useEffect(() => {
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center py-20">
      <Container className="max-w-lg">
        <ErrorState message={error.message} onRetry={reset} />
      </Container>
    </main>
  );
}
