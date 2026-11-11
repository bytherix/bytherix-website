import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import TeamCard from "./ui/TeamCard";
import { teamMembers } from "./data/team";
import { useAnimationVisibility } from "../../../utils/useAnimationVisibility";

const networkNodes = [
  { x: "7%", y: "18%", size: 4, delay: 0 },
  { x: "18%", y: "38%", size: 3, delay: 0.8 },
  { x: "30%", y: "14%", size: 3, delay: 1.4 },
  { x: "43%", y: "27%", size: 4, delay: 0.4 },
  { x: "55%", y: "12%", size: 3, delay: 1.8 },
  { x: "68%", y: "31%", size: 4, delay: 0.9 },
  { x: "82%", y: "17%", size: 3, delay: 1.2 },
  { x: "93%", y: "39%", size: 4, delay: 0.3 },
  { x: "11%", y: "68%", size: 3, delay: 1.6 },
  { x: "25%", y: "83%", size: 4, delay: 0.7 },
  { x: "42%", y: "70%", size: 3, delay: 1.1 },
  { x: "57%", y: "87%", size: 4, delay: 0.2 },
  { x: "73%", y: "69%", size: 3, delay: 1.5 },
  { x: "88%", y: "82%", size: 4, delay: 0.6 },
];

const networkLines = [
  { x1: "7%", y1: "18%", x2: "18%", y2: "38%", duration: 3.8, delay: 0 },
  { x1: "18%", y1: "38%", x2: "30%", y2: "14%", duration: 4.5, delay: 0.7 },
  { x1: "30%", y1: "14%", x2: "43%", y2: "27%", duration: 4.1, delay: 1.2 },
  { x1: "43%", y1: "27%", x2: "55%", y2: "12%", duration: 4.8, delay: 0.4 },
  { x1: "55%", y1: "12%", x2: "68%", y2: "31%", duration: 4.2, delay: 1.4 },
  { x1: "68%", y1: "31%", x2: "82%", y2: "17%", duration: 4.6, delay: 0.8 },
  { x1: "82%", y1: "17%", x2: "93%", y2: "39%", duration: 4, delay: 1.6 },
  { x1: "11%", y1: "68%", x2: "25%", y2: "83%", duration: 4.4, delay: 0.5 },
  { x1: "25%", y1: "83%", x2: "42%", y2: "70%", duration: 4.7, delay: 1.1 },
  { x1: "42%", y1: "70%", x2: "57%", y2: "87%", duration: 4.3, delay: 0.3 },
  { x1: "57%", y1: "87%", x2: "73%", y2: "69%", duration: 4.9, delay: 1.5 },
  { x1: "73%", y1: "69%", x2: "88%", y2: "82%", duration: 4.1, delay: 0.9 },
  { x1: "18%", y1: "38%", x2: "43%", y2: "27%", duration: 5.2, delay: 1.8 },
  { x1: "43%", y1: "27%", x2: "68%", y2: "31%", duration: 5, delay: 0.2 },
  { x1: "68%", y1: "31%", x2: "93%", y2: "39%", duration: 5.4, delay: 1.3 },
  { x1: "25%", y1: "83%", x2: "42%", y2: "70%", duration: 4.8, delay: 0.6 },
  { x1: "42%", y1: "70%", x2: "73%", y2: "69%", duration: 5.3, delay: 1.7 },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isAnimationVisible = useAnimationVisibility(sectionRef);
  const prefersReducedMotion = useReducedMotion();
  const animateBackground = isAnimationVisible && !prefersReducedMotion;

  const totalMembers = teamMembers.length;

  const goToNext = () => {
    if (totalMembers <= 1) return;
    setActiveIndex((current) => (current + 1) % totalMembers);
  };

  const goToPrevious = () => {
    if (totalMembers <= 1) return;
    setActiveIndex((current) => (current - 1 + totalMembers) % totalMembers);
  };

  useEffect(() => {
    if (isPaused || !isAnimationVisible || prefersReducedMotion || totalMembers <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalMembers);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isAnimationVisible, isPaused, prefersReducedMotion, totalMembers]);

  const visibleMembers = useMemo(() => {
    if (!totalMembers) return [];

    const previousIndex = (activeIndex - 1 + totalMembers) % totalMembers;
    const nextIndex = (activeIndex + 1) % totalMembers;

    return [
      { member: teamMembers[previousIndex], position: "left" as const },
      { member: teamMembers[activeIndex], position: "center" as const },
      { member: teamMembers[nextIndex], position: "right" as const },
    ];
  }, [activeIndex, totalMembers]);

  if (!totalMembers) return null;

  return (
    <section ref={sectionRef} id="team" className="relative isolate overflow-hidden bg-[var(--bg-primary)] pt-14 pb-4 sm:pt-16 sm:pb-5 lg:pt-20 lg:pb-6">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="teamNetworkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3157D5" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#00AEEF" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#20C997" stopOpacity="0.07" />
            </linearGradient>

            <filter id="teamNetworkGlow">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <radialGradient id="teamCenterFade">
              <stop offset="0%" stopColor="var(--bg-primary)" stopOpacity="0" />
              <stop offset="75%" stopColor="var(--bg-primary)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--bg-primary)" stopOpacity="0.95" />
            </radialGradient>
          </defs>

          {networkLines.map((line, index) => (
            <motion.line
              key={`line-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#teamNetworkGradient)"
              strokeWidth="1"
              initial={{ opacity: 0.15 }}
              animate={
                animateBackground
                  ? { opacity: [0.12, 0.55, 0.12] }
                  : { opacity: 0.15 }
              }
              transition={
                animateBackground
                  ? { duration: line.duration, delay: line.delay, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0 }
              }
            />
          ))}

          {networkLines.slice(0, 10).map((line, index) => (
            <motion.line
              key={`glow-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#00AEEF"
              strokeWidth="2"
              strokeDasharray="3 80"
              filter="url(#teamNetworkGlow)"
              animate={
                animateBackground
                  ? { strokeDashoffset: [0, -100] }
                  : { strokeDashoffset: 0 }
              }
              transition={
                animateBackground
                  ? { duration: 5 + index * 0.25, repeat: Infinity, ease: "linear", delay: line.delay }
                  : { duration: 0 }
              }
            />
          ))}

          {networkNodes.map((node, index) => (
            <motion.circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={index % 3 === 0 ? "#3157D5" : index % 3 === 1 ? "#00AEEF" : "#20C997"}
              initial={{ opacity: 0.25 }}
              animate={
                animateBackground
                  ? { opacity: [0.2, 0.9, 0.2], scale: [1, 1.5, 1] }
                  : { opacity: 0.25, scale: 1 }
              }
              transition={
                animateBackground
                  ? { duration: 2.5, delay: node.delay, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0 }
              }
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </svg>

        <motion.div
          animate={
            animateBackground
              ? { x: ["-10%", "110%"], y: ["20%", "70%", "30%"] }
              : { x: "-10%", y: "20%" }
          }
          transition={
            animateBackground
              ? { duration: 14, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
          className="absolute h-48 w-48 rounded-full bg-[#3157D5]/10 blur-[90px] dark:bg-[#3157D5]/20"
        />

        <motion.div
          animate={
            animateBackground
              ? { x: ["100%", "0%", "80%"], y: ["70%", "25%", "80%"] }
              : { x: "100%", y: "70%" }
          }
          transition={
            animateBackground
              ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
          className="absolute h-52 w-52 rounded-full bg-[#00AEEF]/10 blur-[90px] dark:bg-[#00AEEF]/20"
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,var(--bg-primary)_88%)]" />
      </div>

      <div className="homepage-container relative z-10">
        <div className="mb-6 flex w-full flex-col items-center px-2 text-center sm:mb-7 lg:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 max-w-full font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.045em] text-[var(--text-primary)] sm:text-5xl lg:text-[3.5rem]"
          >
            Meet the people
            <br />
            <span className="text-[#3157D5] dark:text-[#7090FF]">behind Bytherix.</span>
          </motion.h2>
        </div>

        <div className="relative mx-auto w-full max-w-[1350px]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <button type="button" onClick={goToPrevious} aria-label="Previous team member" className="absolute left-0 top-[205px] z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#DCE3F2] bg-white/90 text-[#132A57] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#3157D5] hover:bg-[#3157D5] hover:text-white active:scale-95 dark:border-white/15 dark:bg-[#202A3E]/90 dark:text-white dark:hover:border-[#7090FF] dark:hover:bg-[#3157D5] sm:left-1 sm:top-[235px] sm:h-11 sm:w-11 lg:left-2 lg:top-[255px] lg:h-12 lg:w-12 xl:left-4">
            <ChevronLeft size={19} strokeWidth={1.8} />
          </button>

          <button type="button" onClick={goToNext} aria-label="Next team member" className="absolute right-0 top-[205px] z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#DCE3F2] bg-white/90 text-[#132A57] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#3157D5] hover:bg-[#3157D5] hover:text-white active:scale-95 dark:border-white/15 dark:bg-[#202A3E]/90 dark:text-white dark:hover:border-[#7090FF] dark:hover:bg-[#3157D5] sm:right-1 sm:top-[235px] sm:h-11 sm:w-11 lg:right-2 lg:top-[255px] lg:h-12 lg:w-12 xl:right-4">
            <ChevronRight size={19} strokeWidth={1.8} />
          </button>

          <div className="relative mx-auto overflow-hidden px-6 pt-2 sm:px-9 sm:pt-3 lg:px-11 lg:pt-4 xl:px-12">
            <motion.div layout className="flex min-h-[420px] items-start justify-center gap-2 sm:min-h-[455px] sm:gap-3 lg:min-h-[480px] lg:gap-4 xl:min-h-[500px]">
              {visibleMembers.map(({ member, position }) => (
                <TeamCard key={`${member.id}-${position}`} member={member} position={position} active={position === "center"} />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-1 sm:mt-2">
          {teamMembers.map((member, index) => (
            <button key={member.id} type="button" aria-label={`Show ${member.name}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => setActiveIndex(index)} className="group flex h-6 min-w-6 items-center justify-center px-1 focus-visible:outline-none">
              <span className={`block h-1.5 rounded-full transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-[#3157D5]/40 dark:group-focus-visible:ring-[#7090FF]/50 ${index === activeIndex ? "w-7 bg-[#132A57] dark:bg-[#7090FF]" : "w-1.5 bg-[#B9C3D5] group-hover:bg-[#3157D5]/60 dark:bg-white/25 dark:group-hover:bg-[#7090FF]/70"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}