
import { useCallback, useEffect, useRef } from "react";
import {
    motion,
    useAnimationControls,
    useInView,
} from "framer-motion";

import {
    TECHNOLOGIES,
    MARQUEE_ROW_1,
    MARQUEE_ROW_2,
    MARQUEE_ROW_3,
} from "./data/techstack.data";

import type { Technology } from "./data/techstack.data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TechBadgeProps {
    tech: Technology;
}

interface MarqueeRowProps {
    technologies: Technology[];
    direction?: "left" | "right";
    duration?: number;
    className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const resolveBadges = (ids: string[]): Technology[] => {
    return ids
        .map((id) => TECHNOLOGIES.find((tech) => tech.id === id))
        .filter((tech): tech is Technology => Boolean(tech));
};

// ---------------------------------------------------------------------------
// Tech Badge
// ---------------------------------------------------------------------------

const TechBadge = ({ tech }: TechBadgeProps) => {
    const isWhiteIcon = tech.color.toLowerCase() === "#ffffff";

    return (
        <div
            className="group flex shrink-0 items-center gap-3 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-primary)] px-5 py-3 transition-all duration-300 hover:border-[var(--text-secondary)] hover:shadow-md"
            title={tech.name}
        >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                {tech.icon ? (
                    <img
                        src={tech.icon}
                        alt={`${tech.name} logo`}
                        width={28}
                        height={28}
                        className={`h-7 w-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 ${
                            isWhiteIcon ? "invert dark:invert-0" : ""
                        }`}
                        draggable={false}
                    />
                ) : (
                    <span
                        className="text-lg font-bold"
                        style={{ color: tech.color }}
                    >
                        {tech.name.charAt(0)}
                    </span>
                )}
            </div>

            <span className="whitespace-nowrap text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                {tech.name}
            </span>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Marquee Row
// ---------------------------------------------------------------------------

const MarqueeRow = ({
    technologies,
    direction = "left",
    duration = 20,
    className = "",
}: MarqueeRowProps) => {
    const controls = useAnimationControls();

    const startPosition = direction === "left" ? "0%" : "-50%";
    const endPosition = direction === "left" ? "-50%" : "0%";

    const startAnimation = useCallback(() => {
        controls.start({
            x: endPosition,
            transition: {
                duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            },
        });
    }, [controls, duration, endPosition]);

    useEffect(() => {
        controls.set({ x: startPosition });
        startAnimation();

        return () => {
            controls.stop();
        };
    }, [controls, startPosition, startAnimation]);

    const duplicatedTechnologies = [
        ...technologies,
        ...technologies,
    ];

    return (
        <div
            className={`relative flex w-full overflow-hidden ${className}`}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={startAnimation}
        >
            <motion.div
                className="flex w-max shrink-0 items-center gap-4 pr-4"
                animate={controls}
                style={{ willChange: "transform" }}
            >
                {duplicatedTechnologies.map((tech, index) => (
                    <TechBadge
                        key={`${tech.id}-${index}`}
                        tech={tech}
                    />
                ))}
            </motion.div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Main Tech Marquee
// ---------------------------------------------------------------------------

export const TechMarquee = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.15,
    });

    const row1 = resolveBadges(MARQUEE_ROW_1);
    const row2 = resolveBadges(MARQUEE_ROW_2);
    const row3 = resolveBadges(MARQUEE_ROW_3);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[var(--bg-primary)] py-20 md:py-28"
        >
            {/* Section Heading */}
            <div className="mx-auto mb-14 max-w-7xl px-6 text-center md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 25 }
                    }
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                >
                    <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl">
                        Powered by Modern{" "}
                        <span className="text-[#7090FF]">
                            Technologies
                        </span>
                    </h2>
                </motion.div>
            </div>

            {/* Marquee Rows */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                    isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 30 }
                }
                transition={{
                    duration: 0.8,
                    delay: 0.15,
                }}
                className="flex flex-col gap-5"
            >
                <MarqueeRow
                    technologies={row1}
                    direction="left"
                    duration={18}
                />

                <MarqueeRow
                    technologies={row2}
                    direction="right"
                    duration={20}
                />

                <MarqueeRow
                    technologies={row3}
                    direction="left"
                    duration={22}
                />
            </motion.div>

            {/* Left Gradient */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--bg-primary)] to-transparent md:w-32" />

            {/* Right Gradient */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--bg-primary)] to-transparent md:w-32" />
        </section>
    );
};

export default TechMarquee;
