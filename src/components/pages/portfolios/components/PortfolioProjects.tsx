import { motion } from "framer-motion";
import { portfolioProjects } from "../data/PortfolioData";
import ProjectShowcase from "./ProjectShowcase";

const PortfolioProjects = () => {
  return (
    <section id="featured-projects" className="relative" pt-8 pb-8 md:pt-8 md:pb-8 lg:pt-8 lg:pb-8>
      <div className="mx-[4vw] w-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          {/* <span className="text-xs font-semibold font-inter uppercase tracking-[0.22em] text-cyan-400">
            Featured Work
          </span> */}

          {/* <h2 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl">
            Our
            <span className=" text-[#2f4ebc]"> Projects</span>
          </h2> */}
        </motion.div>

        {/* <p className=" text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
          A selection of websites and digital products designed and developed
          with a focus on usability, visual quality and responsive experiences.
        </p> */}
      </div>

      <div className="mt-2">
        {portfolioProjects.map((project) => (
          <ProjectShowcase
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioProjects;