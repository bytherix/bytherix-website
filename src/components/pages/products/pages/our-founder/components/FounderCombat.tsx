import { motion, useReducedMotion } from "framer-motion";

import { combatPhilosophy, weapons } from "../data/founderContent";
import { katanaImage, kukriImage, type FounderImage } from "../data/founderImages";
import SectionHeading from "../ui/SectionHeading";

// Weapon art is kept in data/founderImages.ts (see FounderImage there) and
// matched to a weapon by name here, so replacing the placeholder art is a
// one-line change in a single file, and this component never hardcodes a
// URL itself.
const weaponImages: Record<string, FounderImage> = {
  Khukuri: kukriImage,
  Katana: katanaImage,
};

const FounderCombat = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="combat" className="founder-section">
      <div className="founder-container">
        <SectionHeading
          eyebrow="Combat"
          title="Traditional Combat"
          description={combatPhilosophy}
          tone="ember"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {weapons.map((weapon, index) => {
            const Icon = weapon.icon;
            const image = weaponImages[weapon.name];

            return (
              <motion.div
                key={weapon.name}
                initial={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: 30 }
                }
                whileInView={
                  reduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="founder-weapon-card group"
              >
                {/* Image layer — dominates the card, cropped and masked
                    rather than dropped in as a plain <img>. */}
                {image && (
                  <div className="founder-weapon-card-media" aria-hidden="true">
                    <motion.img
                      src={image.src}
                      alt=""
                      className="founder-weapon-card-image"
                      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      loading="lazy"
                    />
                    <div className="founder-weapon-card-scrim" />
                  </div>
                )}

                {/* Icon badge — pinned to the top-left corner, above the
                    image layer. */}
                <motion.span
                  className="founder-weapon-card-icon"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { rotate: 12, scale: 1.1 }
                  }
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </motion.span>

                <div className="founder-weapon-card-body">
                  <h3 className="text-3xl font-bold text-white">{weapon.name}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
                    {weapon.description}
                  </p>
                  {/* <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300/90">
                    <span className="h-px w-10 bg-orange-400/50" />
                    Traditional combat
                  </div> */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FounderCombat;
