"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    stage: "01",
    label: "Ideas",
    note: "Late-night conversations turned into a shared dream.",
  },
  {
    stage: "02",
    label: "Starting",
    note: "We took the leap with nothing but conviction.",
  },
  {
    stage: "03",
    label: "Learning",
    note: "Every new skill became a building block.",
  },
  {
    stage: "04",
    label: "Failing",
    note: "We stumbled, again and again, and kept going.",
  },
  {
    stage: "05",
    label: "Building",
    note: "Ideas turned into real, working products.",
  },
  {
    stage: "06",
    label: "Fixing",
    note: "We refined what we broke until it worked.",
  },
  {
    stage: "07",
    label: "Hackathons",
    note: "We tested ourselves against the clock and the world.",
  },
  {
    stage: "08",
    label: "Growing",
    note: "One small win led to the next, and the next.",
  },
  {
    stage: "09",
    label: "Bytherix",
    note: "The tea stall dream finally had a name.",
  },
];

const StoryJourney = () => {
  return (
    <section className="relative bg-[var(--bg-primary)] px-4 py-8 sm:px-8 sm:py-12 lg:px-8 lg:py-7">
      <div className="mx-auto max-w-8xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-8 sm:space-y-10 lg:space-y-4"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                The journey
              </h2>
            </div>

            <p className="max-w-2xl text-sm text-[var(--text-secondary)] sm:text-base">
              From the first ideas at the tea stall to becoming Bytherix
              Technology.
            </p>
          </div>

          <div className="relative hidden lg:flex lg:items-end lg:gap-4 lg:pt-10">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--border-primary)]" />

            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.stage}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: "easeOut",
                }}
                style={{ transform: `translateY(-${idx * 10}px)` }}
                className="group flex flex-1 flex-col items-center"
              >
                <div className="flex h-[7.5rem] w-full max-w-[9.5rem] flex-col items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3 text-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--accent-green)]/60 group-hover:shadow-lg">
                  <h3 className="text-sm font-bold">{m.label}</h3>

                  <p className="mt-2 text-[11px] leading-snug text-[var(--text-secondary)]">
                    {m.note}
                  </p>
                </div>

                <div className="mt-2 h-3 w-px bg-[var(--border-primary)]" />

                <div className="h-2.5 w-2.5 rounded-full border-2 border-[var(--accent-green)] bg-[var(--bg-primary)] transition-colors duration-300 group-hover:bg-[var(--accent-green)]" />
              </motion.div>
            ))}
          </div>

          <div className="space-y-3 lg:hidden sm:space-y-4">
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.stage}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.05,
                }}
                style={{ marginLeft: `${idx * 5}px` }}
                className="group flex items-stretch gap-3 sm:gap-4"
              >
                <div className="flex flex-col items-center pt-1">
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[var(--accent-green)] bg-[var(--bg-primary)] transition-colors duration-300 group-hover:bg-[var(--accent-green)]" />

                  {idx !== MILESTONES.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-[var(--border-primary)]" />
                  )}
                </div>

                <div className="flex h-[6.5rem] min-w-0 flex-1 flex-col justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3 shadow-sm transition-all duration-300 group-hover:border-[var(--accent-green)]/60 group-hover:shadow-lg sm:h-[7rem] sm:p-4">
                  <h3 className="text-sm font-bold sm:text-base">
                    {m.label}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                    {m.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="border-t border-[var(--border-primary)] pt-6 sm:pt-10 lg:pt-12"
          >
            <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              We failed. We started again. We built projects. We broke things.
              We fixed them. We entered hackathons. We worked late. We argued
              about ideas. We laughed about stupid mistakes. And slowly, that
              small idea from a tea stall became something bigger.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


export default StoryJourney;

