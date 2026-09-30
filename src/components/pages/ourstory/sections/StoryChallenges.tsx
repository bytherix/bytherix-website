"use client";

const CHALLENGES = ["Times when projects failed", "Moments when money was tight", "Days when plans changed", "Uncertainty and doubt", "Questioning themselves"];

const StoryChallenges = () => {

  return (
    <section className="relative overflow-hidden px-3 py-3 sm:px-10 sm:py-7 lg:px-8 ">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--surface-secondary)] to-[var(--bg-primary)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-48 w-48 rounded-full bg-[var(--accent-blue)]/5 blur-3xl sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-48 w-48 rounded-full bg-[var(--accent-red)]/5 blur-3xl sm:h-64 sm:w-64" />

      <div className="relative z-7 mx-auto max-w-8xl">
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-start">
            <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">The hard days</h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-3xl font-bold leading-tight text-[var(--accent-red)] sm:text-4xl lg:text-5xl">Things went wrong.</h3>
              <p className="max-w-7xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">Projects failed. Money was tight. Plans changed. Everything seemed harder than expected.</p>
            </div>

            <div className="grid grid-cols-1 gap-3 border-y border-[var(--border-primary)] py-6 sm:grid-cols-2 sm:gap-4 sm:py-8">
              {CHALLENGES.map((challenge) => (
                <div key={challenge} className="rounded-lg bg-[var(--surface-primary)] p-4 border border-[var(--border-primary)] text-center text-base text-[var(--text-secondary)] sm:text-lg">
                  {challenge}
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-1 sm:space-y-5">
              {/* <p className="text-lg font-semibold text-[var(--accent-green)] sm:text-xl">But we were never alone.</p> */}
              <div className="relative rounded-2xl border-2 border-[var(--accent-green)] bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)] px-5 py-6 sm:px-6 sm:py-8">
                <p className="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">Whenever things became difficult, we looked at each other's faces... and laughed.</p>
                <p className="mt-3 text-[var(--text-secondary)] sm:mt-4"> That became our strength. We learned technology. We learned business. We learned from mistakes. We were not alone in the journey.</p>
              </div>
              {/* <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                That became our strength. We learned technology. We learned business. We learned from mistakes. We were not alone in the journey.
              </p> */}

            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default StoryChallenges;