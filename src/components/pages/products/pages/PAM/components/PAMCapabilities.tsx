import { SectionHeading, GlassCard, StaggerGrid, Pill } from "../ui/shared";
import { capabilities, monitoredParameters } from "../data/pamContent";

const PAMCapabilities = () => {
  return (
    <section id="capabilities" className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Key vitals, processed on the device and shown on its own screen"
          description="ARCK 103 PAM continuously acquires physiological signals, processes them locally and displays the results on an integrated screen, without requiring an external dashboard."
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ title, description, icon: Icon }) => (
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
            Parameters it monitors
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {monitoredParameters.map(({ label, icon }) => (
              <Pill key={label} label={label} icon={icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PAMCapabilities;
