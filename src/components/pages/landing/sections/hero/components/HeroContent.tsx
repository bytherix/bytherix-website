import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import SocialProof from "./SocialProof";
import { useAnimationVisibility } from "../../../../../../utils/useAnimationVisibility";

interface HeroContentProps {
  docked: boolean;
}

const ROTATING_WORDS = [
  "Web Applications",
  "AI Solutions",
  "Cybersecurity",
  "IoT Systems",
  "Robotics",
  "PCB Design",
  "Mobile Apps",
  "Smart Tools",
];

const HeroContent = ({ docked }: HeroContentProps) => {
  const rotatorRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isVisible = useAnimationVisibility(rotatorRef);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useLayoutEffect(() => {
    const rotator = rotatorRef.current;

    if (!rotator) return;

    const words = gsap.utils.toArray<HTMLElement>(
      ".hero-rotating-word",
      rotator
    );

    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, {
        opacity: 0,
        y: 16,
      });

      gsap.set(words[0], {
        opacity: 1,
        y: 0,
      });
      words[0].classList.add("is-current");

      const timeline = gsap.timeline({
        repeat: -1,
        paused: true,
      });
      timelineRef.current = timeline;

      words.forEach((word, index) => {
        const nextWord = words[(index + 1) % words.length];

        timeline
          .to({}, {
            duration: 1.65,
          })
          .to(word, {
            opacity: 0,
            y: -14,
            duration: 0.38,
            ease: "power2.inOut",
            onComplete: () => word.classList.remove("is-current"),
          })
          .set(nextWord, {
            opacity: 0,
            y: 14,
          })
          .to(nextWord, {
            opacity: 1,
            y: 0,
            duration: 0.48,
            ease: "power3.out",
            onStart: () => nextWord.classList.add("is-current"),
          });
      });
    }, rotator);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    timelineRef.current?.paused(
      !docked || !isVisible || prefersReducedMotion,
    );
  }, [docked, isVisible, prefersReducedMotion]);

  return (
    <div
      data-hero-ready={docked}
      aria-hidden={!docked}
      className="
        relative
        z-20
        w-full
        max-w-[620px]
        mx-auto
        lg:mx-0
        text-center
        lg:text-left
      "
      style={{ containerType: "inline-size" }}
    >
      {/* Heading */}
      <div className="hero-reveal hero-reveal--heading">
        <h1
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[4.25rem]
            xl:text-[4.65rem]
            font-extrabold
            leading-[0.98]
            tracking-[-0.045em]
            text-white
          "
        >
          We Build
        </h1>

        {/* Rotating Words */}
        <div
          ref={rotatorRef}
          className="
            relative
            mx-auto
            lg:mx-0
            w-full
            mt-3
            h-[3.2rem]
            sm:h-[3.7rem]
            md:h-[4.2rem]
            lg:h-[4.7rem]
            xl:h-[5rem]
            overflow-hidden
          "
        >
          {ROTATING_WORDS.map((word) => (
            <span
              key={word}
             className="hero-rotating-word absolute inset-x-0 top-0 left-14 whitespace-nowrap font-extrabold leading-none tracking-[-0.04em] bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent"
              style={{ fontSize: "clamp(1.25rem, 11cqw, 3.5rem)" }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
     <p className="hero-reveal hero-reveal--description mt-2 max-w-[540px] mx-auto lg:mx-0 px-2 sm:px-0 text-sm sm:text-base leading-[1.7] text-white/55">
        We design and engineer modern digital products,
        intelligent systems, and connected experiences —
        from web and mobile platforms to AI, IoT, robotics,
        and custom hardware.
      </p>

      {/* Social Proof */}
      <div className="hero-reveal hero-reveal--proof mt-5">
        <SocialProof />
      </div>

      {/* Reserved spacing for future content */}
      <div
        className="
          mt-7
          hidden
          lg:flex
          items-center
          gap-3
          text-[9px]
          font-medium
          uppercase
          tracking-[0.22em]
          text-white/20
        "
      />
    </div>
  );
};

export default HeroContent;
