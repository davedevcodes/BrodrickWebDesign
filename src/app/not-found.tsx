import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-secondary">
        404 Error
      </span>
      <h1 className="mt-4 text-5xl font-bold sm:text-7xl">Page not found</h1>
      <p className="mt-6 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 hover:bg-text-secondary"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white"
        >
          Contact Us
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>
    </div>
  );
}
