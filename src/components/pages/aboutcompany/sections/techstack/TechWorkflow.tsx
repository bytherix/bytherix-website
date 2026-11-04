
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

import {
    WORKFLOW_STEPS,
    type WorkflowStep,
} from "./data/techstack.data";

// ---------------------------------------------------------------------------
// Step colors
// ---------------------------------------------------------------------------

const STEP_COLORS = [
    "#17B6A7",
    "#00AEEF",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
];

const getStepColor = (index: number) =>
    STEP_COLORS[index % STEP_COLORS.length];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeSlideLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

const fadeSlideRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: EASE },
    },
};

const fadeSlideUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: EASE, delay },
    }),
};

const lineGrow: Variants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 0.9, ease: EASE },
    },
};

const lineGrowX: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: EASE },
    },
};

// ---------------------------------------------------------------------------
// Step card — mobile vertical layout
// ---------------------------------------------------------------------------

interface StepCardMobileProps {
    step: WorkflowStep;
    index: number;
    isLast: boolean;
}

const StepCardMobile = ({
    step,
    index,
    isLast,
}: StepCardMobileProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {
        once: true,
        margin: "-80px",
    });

    const color = getStepColor(index);

    return (
        <div ref={ref} className="relative flex gap-5">
            {/* Left rail */}
            <div className="flex flex-col items-center">
                {/* Dot */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                        inView
                            ? { scale: 1, opacity: 1 }
                            : { scale: 0, opacity: 0 }
                    }
                    transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.1,
                    }}
                    className="relative mt-1 h-5 w-5 shrink-0 rounded-full border-2"
                    style={{
                        borderColor: color,
                        backgroundColor: "var(--bg-primary)",
                    }}
                >
                    <span
                        className="absolute inset-[3px] rounded-full"
                        style={{
                            backgroundColor: color,
                            opacity: inView ? 1 : 0,
                            transition: "opacity 0.4s",
                        }}
                    />
                </motion.div>

                {/* Connector line */}
                {!isLast && (
                    <motion.div
                        variants={lineGrow}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="mt-1 w-px flex-1"
                        style={{
                            backgroundColor: color,
                            opacity: 0.3,
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <motion.div
                variants={fadeSlideUp}
                custom={0.05 + index * 0.07}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`mb-10 min-w-0 flex-1 rounded-2xl border bg-[var(--surface-primary)] p-5 transition-shadow duration-300 ${
                    isLast ? "mb-2" : "mb-10"
                }`}
                style={{
                    borderColor: `${color}22`,
                }}
            >
                {/* Step number */}
                <span
                    className="font-inter text-5xl font-black leading-none"
                    style={{
                        color,
                        opacity: 0.18,
                    }}
                >
                    {step.number}
                </span>

                <h3 className="mt-1 text-lg font-bold leading-tight text-[var(--text-primary)]">
                    {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                </p>
            </motion.div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Step card — desktop zigzag layout
// ---------------------------------------------------------------------------

interface StepCardDesktopProps {
    step: WorkflowStep;
    index: number;
    isLast: boolean;
}

const StepCardDesktop = ({
    step,
    index,
    isLast,
}: StepCardDesktopProps) => {
    const isLeft = index % 2 === 0;

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {
        once: true,
        margin: "-100px",
    });

    const color = getStepColor(index);

    return (
        <div
            ref={ref}
            className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-x-8"
        >
            {/* Left column */}
            <div className={isLeft ? "block" : "invisible"}>
                <motion.div
                    variants={fadeSlideLeft}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="rounded-2xl border bg-[var(--surface-primary)] p-6 shadow-lg"
                    style={{
                        borderColor: `${color}28`,
                    }}
                >
                    <StepContent step={step} index={index} />
                </motion.div>
            </div>

            {/* Centre spine */}
            <div className="flex flex-col items-center">
                {/* Dot */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                        inView
                            ? { scale: 1, opacity: 1 }
                            : { scale: 0, opacity: 0 }
                    }
                    transition={{
                        duration: 0.5,
                        ease: EASE,
                    }}
                    className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2"
                    style={{
                        borderColor: color,
                        backgroundColor: "var(--bg-primary)",
                        boxShadow: `0 0 20px ${color}44`,
                    }}
                >
                    <span
                        className="h-3 w-3 rounded-full"
                        style={{
                            backgroundColor: color,
                        }}
                    />
                </motion.div>

                {/* Connector line */}
                {!isLast && (
                    <motion.div
                        variants={lineGrow}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="w-px"
                        style={{
                            height: "6rem",
                            background: `linear-gradient(to bottom, ${color}55, transparent)`,
                        }}
                    />
                )}
            </div>

            {/* Right column */}
            <div className={!isLeft ? "block" : "invisible"}>
                <motion.div
                    variants={fadeSlideRight}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="rounded-2xl border bg-[var(--surface-primary)] p-6 shadow-lg"
                    style={{
                        borderColor: `${color}28`,
                    }}
                >
                    <StepContent step={step} index={index} />
                </motion.div>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Shared step content
// ---------------------------------------------------------------------------

interface StepContentProps {
    step: WorkflowStep;
    index: number;
}

const StepContent = ({
    step,
    index,
}: StepContentProps) => {
    const color = getStepColor(index);

    return (
        <>
            <span
                className="font-inter text-6xl font-black leading-none"
                style={{
                    color,
                    opacity: 0.15,
                }}
            >
                {step.number}
            </span>

            <h3 className="mt-1 text-xl font-bold leading-tight text-[var(--text-primary)]">
                {step.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {step.description}
            </p>
        </>
    );
};

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------

const SectionHeader = () => {
    const ref = useRef<HTMLDivElement>(null);

    const inView = useInView(ref, {
        once: true,
        margin: "-80px",
    });

    return (
        <div
            ref={ref}
            className="mb-14 text-center md:mb-20"
        >
            <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={
                    inView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 18 }
                }
                transition={{
                    duration: 0.65,
                    ease: EASE,
                    delay: 0.08,
                }}
                className="font-inter mt-3 text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl"
            >
                How we build, from idea to launch.
            </motion.h2>

            {/* Animated underline */}
            <div className="mx-auto mt-5 h-px max-w-xs overflow-hidden rounded-full bg-[var(--border-primary)]">
                <motion.div
                    variants={lineGrowX}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="h-full w-full"
                    style={{
                        background:
                            "linear-gradient(to right, #17b6a7, #00AEEF)",
                    }}
                />
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const TechWorkflow = () => {
    return (
        <section className="homepage-gutters relative py-16 md:py-20 lg:py-24">
            {/* Ambient background glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[40rem] -translate-x-1/2 -translate-y-1/4 rounded-full blur-[140px]"
                style={{
                    background:
                        "radial-gradient(circle, #00AEEF0d 0%, transparent 70%)",
                }}
            />

            <div className="homepage-container">
                <SectionHeader />

                {/* Mobile layout */}
                <div className="lg:hidden">
                    {WORKFLOW_STEPS.map((step, index) => (
                        <StepCardMobile
                            key={step.id}
                            step={step}
                            index={index}
                            isLast={index === WORKFLOW_STEPS.length - 1}
                        />
                    ))}
                </div>

                {/* Desktop zigzag layout */}
                <div className="relative hidden lg:block">
                    {/* Continuous centre spine */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-0 w-px -translate-x-1/2"
                        style={{
                            height: "100%",
                            backgroundColor: "var(--border-primary)",
                        }}
                    />

                    <div className="space-y-0">
                        {WORKFLOW_STEPS.map((step, index) => (
                            <StepCardDesktop
                                key={step.id}
                                step={step}
                                index={index}
                                isLast={index === WORKFLOW_STEPS.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechWorkflow;
