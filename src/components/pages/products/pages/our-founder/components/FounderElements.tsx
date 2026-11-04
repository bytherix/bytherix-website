import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Compass, Lock } from "lucide-react";

import { elements, elementsSummary } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";
import ParticleCanvas from "../ui/ParticleCanvas";
import { useMotionPermission } from "../utils/useMotionPermission";

/**
 * The powers section is built around one idea: the active element IS the
 * section, not a card among cards. Selecting a tab swaps the large visual
 * (a mode-specific ParticleCanvas), the accent color, and the copy — the
 * five tabs are the only thing that stays constant while everything else
 * transitions.
 */
const FounderElements = () => {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { state: motionState, request: requestMotion } = useMotionPermission();
  const active = elements[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="powers" className="founder-section founder-elements overflow-hidden">
      <div className="founder-container">
        <SectionHeading
          eyebrow="Elemental power system"
          title="The elemental powers of the founder"
          description={elementsSummary}
          align="center"
          tone="ember"
        />

        {/* Element tabs — always visible, always clickable, so visitors can
            preview every stage of the progression even though only Fire
            is unlocked in the story today. */}
        <div className="founder-element-tabs mt-14" role="tablist" aria-label="Elemental powers">
          {elements.map((element, index) => {
            const Icon = element.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={element.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className={`founder-element-tab ${isActive ? "founder-element-tab-active" : ""}`}
                style={isActive ? ({ "--element-accent": element.accent } as CSSProperties) : undefined}
              >
                <Icon className="h-4 w-4" />
                <span>{element.name}</span>
                {element.status === "future" && <Lock className="h-3 w-3 opacity-60" />}
              </button>
            );
          })}
        </div>

        {/* The active element's visual stage. */}
        <div
          className="founder-element-stage mt-10"
          style={{ "--element-accent": active.accent } as CSSProperties}
        >
          <ParticleCanvas mode={active.mode} interactive className="founder-element-canvas" />

          <div className="founder-element-vignette" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="founder-element-content"
            >
              <span className="founder-element-icon">
                <ActiveIcon className="h-8 w-8" />
              </span>

              <span className="founder-element-status">
                {active.status === "unlocked" ? "Unlocked" : "Coming as the story unfolds"}
              </span>

              <h3 className="founder-element-name">{active.name}</h3>
              <p className="founder-element-tagline">{active.tagline}</p>
              <p className="founder-element-meaning">{active.meaning}</p>
            </motion.div>
          </AnimatePresence>

          {/* Graceful opt-in for gyroscope interaction on supported mobile
              devices. Hidden entirely on platforms that never need a
              permission prompt (Android, desktop) or that already granted
              it, and hidden after being declined — the pointer/touch drag
              behaviour built into ParticleCanvas is the fallback either way. */}
          {motionState === "idle" && (
            <button
              type="button"
              onClick={requestMotion}
              className="founder-element-motion-toggle"
            >
              <Compass className="h-3.5 w-3.5" />
              Tilt to feel it
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FounderElements;
