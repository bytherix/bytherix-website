
const ArrowUpRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 17L17 7M8 7h9v9"
    />
  </svg>
);

const SocialProof = () => {
  return (
    <div className="mt-7 w-full max-w-xl">

      <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 lg:text-left">
        Kathmandu, Nepal
      </p>

      {/* ============================================================
          CTA AREA
          ============================================================ */}

      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4 lg:justify-start">

        {/* Primary */}
        <a
          href="#services"
          className="
            group
            inline-flex
            w-full
            h-11
            items-center
            justify-center
            gap-2.5
            rounded-full
            bg-white
            px-5
            text-sm
            font-semibold
            text-[#080b12]
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-white/90
            hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]
            active:translate-y-0
            sm:w-auto
          "
        >
          <span>Explore Services</span>
          <ArrowUpRight />
        </a>

        {/* Secondary */}
        <a
          href="#about"
          className="
            group
            inline-flex
            w-full
            h-11
            items-center
            justify-center
            gap-2.5
            rounded-full
            bg-blue-900
            px-5
            text-sm
            font-semibold
            text-[#080b12]
            shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-white/90
            hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]
            active:translate-y-0
            sm:w-auto
          "
        >
          <span
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[color-mix(in_srgb,var(--color-blue)_30%,transparent)]
              bg-[color-mix(in_srgb,var(--color-blue)_12%,transparent)]
              text-blue-200
              shadow-[0_0_24px_rgba(0,37,141,0.2)]
              transition-all
              duration-300
              group-hover:border-[color-mix(in_srgb,var(--color-blue)_50%,transparent)]
              group-hover:bg-[color-mix(in_srgb,var(--color-blue)_20%,transparent)]
              group-hover:shadow-[0_0_28px_rgba(0,37,141,0.35)]
            "
          >
            <ArrowUpRight />
          </span>

          <span className="text-left">
            <span className="block text-[13px] font-medium text-white/80 transition-colors group-hover:text-white">
              How we work
            </span>

            <span className="block text-[10px] text-white/35">
              See our approach
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};

export default SocialProof;
