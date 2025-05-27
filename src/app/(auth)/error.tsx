"use client";

import { useEffect } from "react";
import ErrorPage from "@/components/error-handling/error-page";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return <ErrorPage reset={reset} message={error.message} />;
}
