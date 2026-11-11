import { motion } from "framer-motion";
import BlogBackground from "../blogs/BlogBackground";
import BlogGrid from "./ui/BlogGrid";

interface BlogsPageProps {
  /**
   * When rendered inside another page (e.g. About), avoid a nested <main>
   * and keep a single <h1> for the document outline.
   */
  embedded?: boolean;
}

export default function Blog({ embedded = false }: BlogsPageProps) {
  const Wrapper = embedded ? "section" : "main";
  const Heading = embedded ? "h2" : "h1";

  return (
    <Wrapper className="relative min-h-0 w-full overflow-hidden bg-white font-['Inter',sans-serif] text-slate-900 dark:bg-[#020817] dark:text-white md:min-h-screen">
      <BlogBackground />

      <section className="homepage-gutters relative z-10 -mt-px pb-4 pt-0">
        <div className="w-full min-w-0">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative z-50 mb-7 max-w-[1250px] pt-7 sm:mb-12 sm:pt-0 lg:mb-14">
            <Heading className="font-bold tracking-[-0.035em] text-[#0E1F5A] text-[46px] leading-none dark:text-white sm:text-6xl lg:text-7xl xl:text-[82px]">
              Blog Posts
            </Heading>

            <p className="mt-3 max-w-[1100px] text-[15px] leading-6 text-slate-600 dark:text-slate-300 sm:mt-4 sm:text-lg sm:leading-8 lg:text-xl xl:text-[24px]">
              We integrate technology, design, and strategy to build digital solutions that scale your business.
            </p>
          </motion.div>

          <div className="relative z-10 min-w-0">
            <BlogGrid />
          </div>
        </div>
      </section>
    </Wrapper>
  );
}