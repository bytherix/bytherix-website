import { useEffect, type AnimationEvent } from "react";

import bytherixWordmark from "../../assets/bytherix-intro-wordmark.png";
import "./BrandIntro.css";

interface BrandIntroProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

function BrandIntro({ onRevealStart, onComplete }: BrandIntroProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) onComplete();
    };

    reducedMotion.addEventListener("change", handleMotionPreference);
    const failsafe = window.setTimeout(onComplete, 4400);
    return () => {
      reducedMotion.removeEventListener("change", handleMotionPreference);
      window.clearTimeout(failsafe);
    };
  }, [onComplete]);

  const handleAnimationStart = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "brand-intro-exit") onRevealStart();
  };

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "brand-intro-exit") onComplete();
  };

  return (
    <div
      className="brand-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Bytherix Technology brand introduction"
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="brand-intro__identity">
        <img
          className="brand-intro__logo"
          src={bytherixWordmark}
          alt="Bytherix"
          decoding="async"
          fetchPriority="high"
        />

        <div className="brand-intro__subtitle">TECHNOLOGY</div>
        <span className="brand-intro__underline" aria-hidden="true" />
      </div>
    </div>
  );
}

export default BrandIntro;
