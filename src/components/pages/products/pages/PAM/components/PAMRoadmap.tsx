import { SectionHeading, GlassCard, StaggerGrid } from "../ui/shared";
import { dependencies, roadmap, roadmapNote } from "../data/pamContent";

const PAMRoadmap = () => {
  return (
    <section className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="From feasibility to commercial launch in six phases"
          description={`The implementation plan spans an estimated 52 weeks. ${roadmapNote}`}
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map(({ phase, weeks, title, deliverables }) => (
            <GlassCard key={phase} className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)]">
                {phase} &middot; {weeks}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                {title}
              </h3>
              <ul className="mt-4 flex flex-1 flex-col gap-2 border-t border-[var(--border-secondary)] pt-4">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-blue)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </StaggerGrid>

        <div className="mt-16">
          <h3 className="text-sm font-semibold uppercase text-[var(--text-muted)]">
            Key dependencies
          </h3>
          <ul className="mt-5 flex max-w-3xl flex-col gap-2">
            {dependencies.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-[var(--text-secondary)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-blue)]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PAMRoadmap;
