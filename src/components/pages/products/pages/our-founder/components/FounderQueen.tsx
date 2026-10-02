import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";


import { antagonist } from "../data/founderContent";
import { queenWitchesImage } from "../data/founderImages";
import EmberField from "../ui/EmberField";

/**
 * The Queen Boksi is the center of the story's conflict, so she gets a
 * slow, dedicated reveal rather than sitting in the enemy grid: the
 * environment darkens, a background image resolves alongside the
 * silhouette, then the text arrives.
 */
const FounderQueen = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section id="queen" ref={sectionRef} className="founder-queen relative overflow-hidden">
      {/* Background layer — replace `queenWitchesImage` in
          data/founderImages.ts with the real art; the blend, overlay and
          text-readability scrim below stay the same. */}
      <div className="founder-queen-media" aria-hidden="true">
        <motion.img
          src={queenWitchesImage.src}
          alt=""
          className="founder-queen-media-image"
          style={
            reduceMotion
              ? undefined
              : { opacity: bgOpacity, scale: bgScale }
          }
          loading="lazy"
        />
        <div className="founder-queen-media-scrim" />
      </div>

      <motion.div
        className="founder-queen-veil"
        style={reduceMotion ? undefined : { opacity: veilOpacity }}
        aria-hidden="true"
      />

      <EmberField tone="void" count={16} />

      <div className="founder-container relative flex flex-col items-center px-6 py-28 text-center sm:px-8 lg:px-16">
        <motion.span
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="founder-eyebrow founder-eyebrow-void mt-10"
        >
          {/* <span className="founder-eyebrow-dash" /> */}
          {/* <h3 className="text-sm">The center of everything </h3> */}
        </motion.span>

        <motion.h2
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="founder-queen-title mt-5 text-5xl font-black tracking-tight sm:text-7xl"
        >
          {antagonist.name}
        </motion.h2>

        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg"
        >
          {antagonist.description}
        </motion.p>
      </div>
    </section>
  );
};

export default FounderQueen;
