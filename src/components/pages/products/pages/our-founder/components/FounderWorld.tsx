import { motion, useReducedMotion } from "framer-motion";
import { Lock, MapPin } from "lucide-react";

import { missionStructure, worldSummary } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";

const FounderWorld = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="journey" className="founder-section">
      <div className="founder-container">
        <SectionHeading
          eyebrow="The world"
          title="One map opens into many"
          description={worldSummary}
          tone="ember"
        />

        {/* World-map progression: a single known region, then a path that
            fades into the unknown — visualising "new regions open as the
            story unfolds" without inventing region names or a fixed count. */}
        <div className="founder-map mt-16">
          <div className="founder-map-track" aria-hidden="true" />

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="founder-map-node founder-map-node-active"
          >
            <MapPin className="h-5 w-5" />
            <span className="founder-map-node-label">Map 01</span>
          </motion.div>

          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: n * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="founder-map-node founder-map-node-locked"
            >
              <Lock className="h-4 w-4" />
            </motion.div>
          ))}

          <span className="founder-map-continues">and more, as the story unfolds</span>
        </div>

        {/* Quest log: the exact mission structure from the design doc,
            presented as a main → side → daily hierarchy. */}
        <div className="founder-questlog mt-16">
          {missionStructure.map((mission, index) => {
            const Icon = mission.icon;

            return (
              <motion.div
                key={mission.label}
                initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="founder-quest-row founder-card"
              >
                <span className="founder-icon">
                  <Icon className="h-6 w-6" />
                </span>

                <div className="founder-quest-row-body">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black tracking-[-0.05em] text-white">
                      {mission.count}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-orange-400">
                      {mission.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {mission.description}
                  </p>
                </div>

                {index < missionStructure.length - 1 && (
                  <span className="founder-quest-connector" aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FounderWorld;
