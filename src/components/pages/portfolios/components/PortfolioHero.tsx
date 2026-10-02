import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const PortfolioHero = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-8 md:pt-8 md:pb-8 lg:pt-8 lg:pb-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative z-10 mx-[4vw] w-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          {/* <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-4 flex items-center gap-3 text-xs font-inter font-semibold uppercase tracking-[0.22em] text-cyan-400"
          >
           
            Selected Work
          </motion.div> */}

          <h1 className="text-5xl font-bold text-[var(--text-primary)] font-inter leading-[1.02] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            Digital experiences
           <span className="block text-[#2f4ebc]">
              built to stand out.
            </span>
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
            Explore a selection of websites and digital experiences crafted by
            Bytherix Technology — combining modern interfaces, responsive
            experiences and purposeful design.
          </p>

          <div className="mt-7 flex items-center gap-5">
            <a
              href="#featured-projects"
              className="group inline-flex items-center gap-3 rounded-full bg-[#2f4ebc] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(47,78,188,0.3)]"
            >
              Explore Projects

              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>

            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioHero;