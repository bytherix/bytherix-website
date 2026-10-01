/**
 * Full-width ECG heartbeat strip, placed directly after <PAMHero />.
 *
 * Loop (3.2s, linear), measured from the reference video:
 * draw left to right (1.2s), hold (0.6s), erase left to right (1.0s), empty (0.4s).
 * Three identical beats; the trace is inset from both edges like the reference.
 * Pure SVG + CSS, so no new dependencies. Decorative only (aria-hidden).
 */
const TRACE_PATH =
  "M0 63H156L180 37L200 89L222 63H284L306 49L326 63" +
  "H622L646 37L666 89L688 63H750L772 49L792 63" +
  "H1088L1112 37L1132 89L1154 63H1216L1238 49L1258 63H1398";

const PAMHeartbeat = () => {
  return (
    <section aria-hidden="true" className="relative">
      <style>{`
        @keyframes pam-heartbeat-trace {
          0%      { stroke-dashoffset: 100; }
          37.5%   { stroke-dashoffset: 0; }
          56.25%  { stroke-dashoffset: 0; }
          87.5%   { stroke-dashoffset: -100; }
          100%    { stroke-dashoffset: -100; }
        }
        .pam-heartbeat-trace {
          stroke-dasharray: 100 100;
          stroke-dashoffset: 100;
          animation: pam-heartbeat-trace 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pam-heartbeat-trace { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="relative h-[126px] w-full overflow-hidden border-y border-[var(--border-primary)] bg-[var(--surface-primary)]">
        <svg
          viewBox="0 0 1398 126"
          preserveAspectRatio="none"
          className="absolute inset-y-0 left-[4%] h-full w-[92%] sm:left-[12.55%] sm:w-[74.9%]"
        >
          <path
            d={TRACE_PATH}
            pathLength={100}
            fill="none"
            stroke="var(--accent-blue)"
            strokeOpacity={0.8}
            strokeWidth={2}
            className="pam-heartbeat-trace"
          />
        </svg>
      </div>
    </section>
  );
};

export default PAMHeartbeat;