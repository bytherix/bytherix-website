"use client";

const StoryHero = () => {
  
  return (
    <section className="relative flex w-full item-start overflow-hidden px-3 py-3 sm:px-7 sm:py-3 lg:px-10 lg:py-5">
      <div className="pointer-events-none absolute -right-24 top-10 h-56 w-56 rounded-full bg-[var(--accent-green)]/10 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--accent-blue)]/5 blur-3xl sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]" />

      <div className="relative z-10 mx-auto w-full max-w-8xl">
        <div className="space-y-6 sm:space-y-8">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">From a simple conversation</span>
            <span className="block">at a tea stall...</span>
            <span className="block bg-gradient-to-r from-[var(--accent-green)] via-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">
              to a dream of building something global.
            </span>
          </h1>

          {/* <p
            className="max-w-full text-sm leading-7 text-[var(--text-secondary)] sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            Three years ago, a group of friends sat together at a tea stall with
            nothing but ideas, ambition, and each other. Today, they are
            building Bytherix Technology, a company that started from zero to
            create opportunities for talented people everywhere.
          </p> */}

          {/* <div className="pt-4 sm:pt-8">
            <span className="inline-flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] sm:text-xs">
              <span>Scroll to discover</span>
              <span className="text-base sm:text-lg">↓</span>
            </span>
          </div> */}
        </div>

        {/* <div className="mt-10 flex justify-center sm:mt-16">
          <div className="relative h-36 w-36 sm:h-52 sm:w-52 lg:h-64 lg:w-64">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-green)]/30 bg-gradient-to-br from-[var(--accent-green)]/10 to-[var(--accent-blue)]/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-[var(--accent-green)] shadow-[0_0_12px_rgba(23,182,167,0.8)]" />
            </div>
            <div className="absolute inset-0 rounded-full border border-[var(--accent-green)]/20" />
            <div className="absolute inset-2 rounded-full border border-[var(--accent-blue)]/15" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default StoryHero;