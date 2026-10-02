import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ProductNetworkBackground from "./ProductNetworkBackground";

export default function ShopHero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -55]);

  const opacity = useTransform(scrollYProgress, [0, 0.82], [1, 0]);

  return (
    <section
      ref={ref}
      className="sticky top-0 z-30 border-y border-slate-200/80 bg-white/85 px-4 py-2 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#020817]/85 sm:px-6 lg:px-10 xl:px-[60px]"
    >
      {/* =====================================================
          NETWORK BACKGROUND
      ===================================================== */}

      <ProductNetworkBackground />

      {/* =====================================================
          EXTRA DARK OVERLAY
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_40%,rgba(0,174,239,0.045),transparent_34%),radial-gradient(circle_at_82%_48%,rgba(49,87,213,0.06),transparent_36%)]" />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          style={{
            y,
            opacity,
          }}
          className="relative max-w-4xl"
        >
          <h1 className="font-bold tracking-[-0.035em] text-[#0E1F5A] text-[36px] leading-none dark:text-white sm:text-6xl lg:text-7xl xl:text-[72px]">
            Our
            <span className="text-[var(--color-navy)] m-4"> Shop </span>
          </h1>
          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            Explore digital products and software experiences created by
            Bytherix for modern organizations, teams, and everyday workflows.
          </p>

          {/* =================================================
              EXPLORE PRODUCTS
          ================================================= */}

          {/* <a
            href="#products"
            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-[#0084BD] dark:text-slate-300 dark:hover:text-[#00AEEF]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/[0.025] duration-300 group-hover:border-[#00AEEF]/40 group-hover:bg-[#00AEEF]/10">
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>

            Explore Products
          </a> */}
        </motion.div>

        {/* =====================================================
            RIGHT ORBITAL / RADAR SYSTEM
        ===================================================== */}

        <div className="pointer-events-none absolute right-[-170px] top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 lg:block xl:right-[-70px] 2xl:right-[-20px]">
          {/* Outer glow */}

          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00AEEF]/[0.035] blur-[70px]" />

          {/* Outer orbit */}

          <div className="absolute inset-0 rounded-full border border-[#00AEEF]/20 dark:border-[#00AEEF]/10" />

          {/* Orbit 2 */}

          <div className="absolute inset-10 rounded-full border border-[#38BDF8]/25 dark:border-[#38BDF8]/10" />

          {/* Orbit 3 */}

          <div className="absolute inset-20 rounded-full border border-slate-300/60 dark:border-white/[0.07]" />

          {/* Orbit 4 */}

          <div className="absolute inset-32 rounded-full border border-[#3157D5]/25 dark:border-[#3157D5]/15" />

          {/* Orbit 5 */}

          <div className="absolute inset-44 rounded-full border border-[#00AEEF]/20 dark:border-[#00AEEF]/10" />

          {/* Horizontal axis */}

          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/20 to-transparent" />

          {/* Vertical axis */}

          <div className="absolute bottom-0 left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-[#00AEEF]/20 to-transparent" />

          {/* Diagonal axis */}

          <div className="absolute left-1/2 top-1/2 h-[1px] w-[430px] -translate-x-1/2 -translate-y-1/2 rotate-[25deg] bg-gradient-to-r from-transparent via-[#38BDF8]/10 to-transparent" />

          {/* Center glow */}

          <motion.div
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00AEEF]/10 blur-3xl"
          />

          {/* Center node */}

          <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00AEEF] shadow-[0_0_35px_10px_rgba(0,174,239,0.22)]" />

          {/* =================================================
              ROTATING ORBIT
          ================================================= */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            {/* top */}

            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00AEEF] shadow-[0_0_18px_4px_rgba(0,174,239,0.45)]" />

            {/* right */}

            <span className="absolute right-[8%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#20C997] shadow-[0_0_18px_4px_rgba(32,201,151,0.4)]" />

            {/* bottom */}

            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#3157D5] shadow-[0_0_18px_4px_rgba(49,87,213,0.45)]" />

            {/* left */}

            <span className="absolute left-[8%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#38BDF8] shadow-[0_0_14px_3px_rgba(56,189,248,0.4)]" />
          </motion.div>

          {/* =================================================
              PULSING NODES
          ================================================= */}

          <motion.span
            animate={{
              scale: [1, 1.55, 1],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[21%] top-[27%] h-2.5 w-2.5 rounded-full bg-[#00AEEF] shadow-[0_0_18px_4px_rgba(0,174,239,0.45)]"
          />

          <motion.span
            animate={{
              scale: [1, 1.45, 1],
              opacity: [0.35, 0.95, 0.35],
            }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="absolute right-[21%] top-[28%] h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_18px_4px_rgba(56,189,248,0.45)]"
          />

          <motion.span
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 3.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="absolute bottom-[25%] left-[30%] h-2 w-2 rounded-full bg-[#3157D5] shadow-[0_0_18px_4px_rgba(49,87,213,0.45)]"
          />
        </div>
      </div>

      {/* =====================================================
          BOTTOM HERO FADE
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-28 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-[#020817] dark:via-[#020817]/70" />
    </section>
  );
}
