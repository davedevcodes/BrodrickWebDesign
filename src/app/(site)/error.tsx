"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
        Something went wrong
      </span>
      <h1 className="mt-4 text-4xl font-bold sm:text-6xl">
        An unexpected error occurred
      </h1>
      <p className="mt-6 max-w-md text-text-secondary">
        Please try again, or head back to the homepage. If the problem
        persists, contact us and we&apos;ll take a look.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-text-secondary"
        >
          <FontAwesomeIcon icon={faArrowRotateRight} className="text-xs" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
