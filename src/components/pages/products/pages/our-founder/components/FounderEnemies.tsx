import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import { enemies } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";

const FounderEnemies = () => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = enemies[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="enemies" className="founder-section">
      <div className="founder-container">
        <SectionHeading eyebrow="Threats" title="Enemies that shape the world" />

        {/* Encounter selector: choosing a threat changes the response panel,
            so the visitor reads it as an encounter rather than a card grid. */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {enemies.map((enemy, index) => {
            const Icon = enemy.icon;
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={enemy.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className={`founder-encounter-tile founder-card ${
                  isActive ? "founder-encounter-tile-active" : ""
                }`}
                aria-pressed={isActive}
              >
                <span className="founder-icon h-11 w-11 rounded-xl">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 block text-sm font-bold text-white">
                  {enemy.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="founder-encounter-panel founder-card mt-6 p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={reduceMotion ? undefined : { opacity: 0, x: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 sm:flex-row sm:items-start"
            >
              <span className="founder-icon h-14 w-14 flex-shrink-0">
                <ActiveIcon className="h-7 w-7" />
              </span>

              <div>
                <h3 className="text-2xl font-bold text-white">{active.name}</h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FounderEnemies;
