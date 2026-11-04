import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { originStory } from "../data/founderContent";
import SectionHeading from "../ui/SectionHeading";
import EmberField from "../ui/EmberField";

const FounderOrigin = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.35"],
  });

  // The world quietly gets darker as the tragedy unfolds.
  const darkness = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <section
      id="tragedy"
      ref={sectionRef}
      className="founder-section founder-tragedy relative overflow-hidden"
    >
      <motion.div
        className="founder-tragedy-veil"
        style={reduceMotion ? undefined : { opacity: darkness }}
        aria-hidden="true"
      />
      <EmberField tone="ember" count={10} />

      <div className="founder-container relative">
        <SectionHeading
          eyebrow="Chapter one"
          title="One family. One night. One purpose."
          tone="ember"
        />

        <motion.ol
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
          className="founder-timeline mt-14 flex flex-col gap-6"
        >
          {originStory.map((beat, index) => (
            <motion.li
              key={beat.title}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`founder-card founder-tragedy-card flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-8 ${
                index === originStory.length - 1 ? "founder-tragedy-card-final" : ""
              }`}
            >
              <span className="founder-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="pt-1">
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#fb923c]">
                  {beat.title}
                </h3>

                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
                  {beat.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default FounderOrigin;
