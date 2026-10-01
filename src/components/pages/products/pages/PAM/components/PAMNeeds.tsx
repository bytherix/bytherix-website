import { SectionHeading, GlassCard, StaggerGrid } from "../ui/shared";
import { userNeeds } from "../data/pamContent";

const PAMNeeds = () => {
  return (
    <section className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Built around real monitoring needs"
          description="Every measurement in ARCK 103 PAM starts from a user story: who is monitoring, and what they need to see. Patients, caregivers and clinicians get their key vital signs in one place, in real time."
        />

        <StaggerGrid className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {userNeeds.map(({ audience, story, icon: Icon }) => (
            <GlassCard key={story}>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-blue-soft)] text-[var(--accent-blue)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                {audience}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                {story}
              </p>
            </GlassCard>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
};

export default PAMNeeds;
