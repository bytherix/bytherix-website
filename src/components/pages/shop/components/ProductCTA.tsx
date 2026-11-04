import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCTA() {
  return (
    <section className="homepage-gutters pb-12 pt-2 sm:pb-14 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 px-6 py-14 dark:border-white/[0.08] dark:bg-white/[0.025] sm:px-10 sm:py-20 lg:py-24"
      >
        <div className="bg-[#0b1226] pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-[#00AEEF] blur-[95px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="font-inter text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
            Have a product in mind?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-snug tracking-[-0.02em] text-slate-700 sm:text-xl md:text-2xl dark:text-slate-200">
            Find the right technology for your next move.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 dark:text-slate-400">
            Tell us what you are trying to build, improve, or simplify.
            We&apos;ll help you explore the right Bytherix product or
            technology solution.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#3157D5] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2548be]"
            >
              Talk to Bytherix

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00AEEF]/40 hover:text-[#0084BD] dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-[#00AEEF]/30 dark:hover:text-[#00AEEF]"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
