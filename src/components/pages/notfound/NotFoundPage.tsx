import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-blue)]">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)]">
        The page you are looking for does not exist or has moved. Check the
        address, or use one of the links below.
      </p>

      <nav aria-label="Helpful links" className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-[var(--accent-blue)] px-5 py-2.5 text-sm font-semibold text-[#04101f] transition hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          to="/#services"
          className="rounded-full border border-[var(--border-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-blue)]"
        >
          Our services
        </Link>
        <Link
          to="/#contact"
          className="rounded-full border border-[var(--border-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-blue)]"
        >
          Contact us
        </Link>
      </nav>
    </main>
  );
};

export default NotFoundPage;
