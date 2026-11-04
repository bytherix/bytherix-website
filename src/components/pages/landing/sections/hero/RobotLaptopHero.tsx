import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import robotLaptopGif from "../../../../../assets/robot_blink_full.gif";
import { useAnimationVisibility } from "../../../../../utils/useAnimationVisibility";

const MAX_TILT_DEG = 5;
const MAX_LIFT_PX = 6;

interface RobotLaptopHeroProps {
  docked: boolean;
}

const RobotLaptopHero = ({ docked }: RobotLaptopHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useAnimationVisibility(containerRef);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, {
    stiffness: 100,
    damping: 18,
    mass: 0.8,
  });

  const springY = useSpring(pointerY, {
    stiffness: 100,
    damping: 18,
    mass: 0.8,
  });

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [MAX_TILT_DEG, -MAX_TILT_DEG]
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-MAX_TILT_DEG, MAX_TILT_DEG]
  );

  const liftX = useTransform(
    springX,
    [-0.5, 0.5],
    [-MAX_LIFT_PX, MAX_LIFT_PX]
  );

  const liftY = useTransform(
    springY,
    [-0.5, 0.5],
    [-MAX_LIFT_PX, MAX_LIFT_PX]
  );

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (prefersReducedMotion) return;

    const rect =
      containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x =
      (event.clientX - rect.left) /
      rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
      rect.height -
      0.5;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="
        relative
        flex
        w-full
        items-center
        justify-center
      "
      style={{
        perspective: 1200,
      }}
    >
      <div
        className={`hero-tech-orbit${isVisible && !prefersReducedMotion ? " is-active" : ""}`}
        aria-hidden="true"
      >
        <span className="hero-tech-orbit__ring hero-tech-orbit__ring--outer" />
        <span className="hero-tech-orbit__ring hero-tech-orbit__ring--middle" />
        <span className="hero-tech-orbit__ring hero-tech-orbit__ring--inner" />
      </div>

      <motion.div
        className="
          relative
          w-full
          max-w-[760px]
        "
        initial={docked ? false : { opacity: 0, scale: 0.97, y: 16 }}
        animate={docked ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.85,
          delay: prefersReducedMotion ? 0 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          rotateX,
          rotateY,
          x: liftX,
          y: liftY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`hero-robot-float${isVisible && !prefersReducedMotion ? " is-active" : ""}`}
        >
          <img
            src={robotLaptopGif}
            alt="Bytherix robot presenting a laptop"
            fetchPriority="high"
            decoding="async"
            className="
              block
              w-full
              h-auto
              select-none
              pointer-events-none
              object-contain
            "
            draggable={false}
          />
          <div
            className="
              absolute
              left-1/2
              bottom-[2%]
              -translate-x-1/2
              h-3
              w-[58%]
              rounded-[50%]
              bg-black/20
            "
          />
        </div>
      </motion.div>
    </div>
  );
};

export default RobotLaptopHero;
