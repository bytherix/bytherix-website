import { Check } from "lucide-react";
import { SectionHeading, GlassCard, StaggerGrid } from "../ui/shared";
import { bpMethods, bpNote } from "../data/pamContent";

const PAMBloodPressure = () => {
  return (
    <section className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Optional blood pressure: three approaches under evaluation"
          description="Non-invasive blood pressure is an optional parameter. The specification compares three candidate methods, each with different trade-offs in accuracy, hardware complexity and regulatory path."
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {bpMethods.map(({ name, principle, badge, points }) => (
            <GlassCard key={name}>
              {badge && (
                <span className="mb-4 inline-block rounded-full bg-[var(--brand-blue-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-blue)]">
                  {badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {principle}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-6 text-[var(--text-secondary)]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </StaggerGrid>

        <p className="mt-8 max-w-3xl text-sm leading-6 text-[var(--text-muted)]">
          {bpNote}
        </p>
      </div>
    </section>
  );
};

export default PAMBloodPressure;
