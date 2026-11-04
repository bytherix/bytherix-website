import { useReducedMotion } from "framer-motion";

interface EmberFieldProps {
  count?: number;
  tone?: "ember" | "cyan" | "void";
}

/**
 * A small set of drifting embers used to mark emotional shifts in the
 * story (the tragedy, the Queen Boksi reveal). Pure CSS animation, no
 * particle library, disabled entirely under prefers-reduced-motion.
 */
const EmberField = ({ count = 14, tone = "ember" }: EmberFieldProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className={`founder-embers founder-embers-${tone}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="founder-ember"
          style={{
            left: `${(i * 137) % 100}%`,
            animationDelay: `${(i % 7) * 0.9}s`,
            animationDuration: `${7 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
};

export default EmberField;
