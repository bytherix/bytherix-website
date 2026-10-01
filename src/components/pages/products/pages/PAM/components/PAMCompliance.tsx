import { SectionHeading, GlassCard, StaggerGrid, Pill } from "../ui/shared";
import { complianceAreas, intendedUseNote, standards } from "../data/pamContent";

const PAMCompliance = () => {
  return (
    <section className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Designed for medical safety standards, validation and regulatory compliance"
          description="Safety, accuracy and calibration are central to the specification. ARCK 103 PAM is planned to go through functional, electrical, environmental, usability and software validation before it is submitted for regulatory review."
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {complianceAreas.map(({ title, description, icon: Icon }) => (
            <GlassCard key={title}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-blue-soft)] text-[var(--accent-blue)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {description}
              </p>
            </GlassCard>
          ))}
        </StaggerGrid>

        <div className="mt-16">
          <h3 className="text-sm font-semibold uppercase text-[var(--text-muted)]">
            Standards the design is built around
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {standards.map((label) => (
              <Pill key={label} label={label} />
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-6 text-[var(--text-muted)]">
            {intendedUseNote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PAMCompliance;
