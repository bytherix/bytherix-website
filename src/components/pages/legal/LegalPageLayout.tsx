import type { ReactNode } from "react";
import Footer from "../../layout/Footer";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalPageLayoutProps {
  title: string;
  introduction: string;
  sections: LegalSection[];
  children?: ReactNode;
}

function LegalPageLayout({
  title,
  introduction,
  sections,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-[var(--bg-primary)] py-8 text-[var(--text-primary)] sm:py-10 md:py-12">
        <div className="homepage-container">
          <header className="border-b border-[var(--border-primary)] pb-8 sm:pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] sm:text-sm">
              Bytherix Technology <span aria-hidden="true">/</span> Legal
            </p>
            <h1 className="mt-4 max-w-4xl break-words text-4xl font-bold leading-tight tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
              {introduction}
            </p>
            <p className="mt-6 max-w-3xl border-l-2 border-[var(--accent-green)] pl-4 text-sm leading-6 text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text-secondary)]">
                Draft for review.
              </span>{" "}
              Confirm this content against Bytherix&apos;s actual practices,
              products, and applicable legal requirements before publication.
              Effective date: to be confirmed.
            </p>
            {children}
          </header>

          <div className="divide-y divide-[var(--border-primary)]">
            {sections.map((section, index) => (
              <section
                key={section.title}
                aria-labelledby={`legal-section-${index}`}
                className="py-8 sm:py-10"
              >
                <h2
                  id={`legal-section-${index}`}
                  className="text-xl font-semibold leading-snug tracking-tight text-[var(--text-primary)] sm:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 max-w-4xl space-y-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="list-disc space-y-2 pl-6 marker:text-[var(--accent-blue)]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LegalPageLayout;
