import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeading } from "../ui/shared";
import { architectureLayers, securityPrinciples } from "../data/pamContent";

const PAMArchitecture = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative px-6 py-8 lg:py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="A self-contained device: sensors, processing and display in one unit"
          description="ARCK 103 PAM is built on an ESP32 microcontroller that reads every sensor, runs the signal processing and drives the touchscreen, with a rechargeable battery and local storage on board."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Layered stack visualization */}
          <ol className="flex flex-col gap-3">
            {architectureLayers.map((layer, index) => (
              <motion.li
                key={layer.name}
                initial={reducedMotion ? undefined : { opacity: 0, x: -24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="relative flex items-start gap-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)]/70 p-5 pl-6 backdrop-blur-xl"
                style={{
                  marginLeft: `${index * 12}px`,
                  marginRight: `${(architectureLayers.length - 1 - index) * 12}px`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[var(--accent-blue)]"
                  style={{ opacity: 0.35 + index * 0.13 }}
                />
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue-soft)] text-xs font-bold text-[var(--accent-blue)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    {layer.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                    {layer.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Security principles panel */}
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-fit rounded-[var(--radius-2xl)] border border-[var(--border-primary)] bg-[var(--surface-primary)]/70 p-7 backdrop-blur-xl"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-blue-soft)] text-[var(--accent-blue)]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
              Firmware and data protection by design
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Only minimal personal data is stored, but firmware integrity and
              communication security are specified from the start. In
              production, secure boot and flash encryption are enabled, and
              any BLE or Wi-Fi link is encrypted.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {securityPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent-blue)]"
                  />
                  {principle}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PAMArchitecture;
