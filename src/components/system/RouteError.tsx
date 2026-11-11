import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

/**
 * Router-level error boundary (BYX-015).
 *
 * Catches render/lazy-chunk failures so a broken route shows a recoverable page
 * instead of a blank screen. Internal error details are never rendered.
 */
export default function RouteError() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-6 py-20 text-[var(--text-primary)]">
      <div className="w-full max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)]">
          Bytherix Technology
        </p>

        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          {isNotFound ? "Page not found" : "Something went wrong"}
        </h1>

        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          {isNotFound
            ? "The page you requested is no longer available."
            : "This part of the site could not be loaded. Reloading the page usually fixes it."}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent-blue)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Reload page
          </button>

          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold transition-colors hover:border-white/30"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
