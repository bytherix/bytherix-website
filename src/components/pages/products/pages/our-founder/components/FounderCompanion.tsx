import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import { companionSummary } from "../data/founderContent";
import { companionImage } from "../data/founderImages";
import SectionHeading from "../ui/SectionHeading";

const FounderCompanion = () => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven tilt: cheap, dependency-free "3D" feel without a WebGL
  // model. useSpring smooths the raw pointer delta so the tilt settles
  // rather than snapping.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 14,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 14,
  });

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section id="companion" className="founder-section">
      <div className="founder-container grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="founder-companion-stage" style={{ perspective: 1000 }}>
          <motion.div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={
              reduceMotion
                ? undefined
                : { rotateX, rotateY, transformStyle: "preserve-3d" }
            }
            className="founder-companion-card"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -14, 0] }
              }
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="founder-companion-image-wrap"
              style={{ transform: "translateZ(40px)" }}
            >
              <img
                src={companionImage.src}
                alt={companionImage.alt}
                className="founder-companion-image"
                loading="lazy"
              />
              <div className="founder-companion-glow" aria-hidden="true" />
            </motion.div>

            <div className="founder-companion-ring" aria-hidden="true" />
            <div className="founder-companion-ring founder-companion-ring-dashed" aria-hidden="true" />
          </motion.div>
        </div>

        <div>
          <SectionHeading eyebrow="Companion" title="He's not completely alone" tone="cyan" />

          <motion.blockquote
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="founder-companion-quote mt-7 max-w-2xl border-l-2 border-cyan-400/30 pl-5 text-base leading-8 text-slate-300 sm:text-lg"
          >
            {companionSummary}
          </motion.blockquote>

          {/* <div className="mt-8 flex items-center gap-3 text-l font-semibold uppercase tracking-[0.18em] text-cyan-300/90">
            <span className="h-px w-16 bg-cyan-400/60" />
            Guidance &middot; Combat &middot; Truth
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FounderCompanion;
