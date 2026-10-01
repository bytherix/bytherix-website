import { SectionHeading, GlassCard, StaggerGrid, Pill } from "../ui/shared";
import { alertDelivery, alertExamples } from "../data/pamContent";

const PAMAlerts = () => {
  return (
    <section className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Configurable alerts with clear, non-diagnostic guidance"
          description="Each vital has configurable high and low thresholds. When a reading crosses one, the device flashes a status LED, sounds the buzzer and overlays a message on screen. All advice is advisory, marked as non-diagnostic and configurable in software."
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {alertExamples.map(({ parameter, title, message, note }) => (
            <GlassCard key={title} className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)]">
                {parameter}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                {message}
              </p>
              <p className="mt-4 border-t border-[var(--border-secondary)] pt-4 text-sm text-[var(--text-muted)]">
                {note}
              </p>
            </GlassCard>
          ))}
        </StaggerGrid>

        <div className="mt-16">
          <h3 className="text-sm font-semibold uppercase text-[var(--text-muted)]">
            How alerts are delivered
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {alertDelivery.map(({ label, icon }) => (
              <Pill key={label} label={label} icon={icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PAMAlerts;
