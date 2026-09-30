"use client";

import { Globe, BookOpen, Calendar } from 'lucide-react';

const STATS = [
  { icon: Calendar, label: "Years of Journey" },
  { icon: BookOpen, label: "To Learn" },
  { icon: Globe, label: "Global Dream" },
];

const StoryToday = () => {
  return (
    <section className="relative bg-[var(--bg-secondary)] px-3 py-8 lg:py-8 sm:px-10 sm:py-24 lg:px-8 ">
      <div className="mx-auto max-w-8xl">
        <div className="space-y-5">
          <div className="flex items-center">
            <h2 className="text-xl font-bold sm:text-2xl md:text-2xl lg:text-3xl">Bytherix today</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl items-center font-bold leading-tight bg-gradient-to-r from-[var(--accent-green)] via-[var(--accent-blue)] to-[var(--accent-green)] bg-clip-text text-transparent">
              Still learning.
              <span className="block">Still growing.</span>
              <span className="block">Still building.</span>
            </h3>
            <p className="max-w-8xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Bytherix Technology is still far from where they want to be. But the original belief has never changed. The company grew from a simple idea at a tea stall into something bigger. But the vision remains rooted in what they believed from day one.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {STATS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-4 text-center sm:p-8">
                <div className="mb-1.5 text-[var(--accent-green)] items-center sm:mb-2">
                  <Icon size={23} className="sm:w-10 sm:h-10 text-[var(--accent-green)]" />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] sm:text-sm">{label}</div>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-[var(--accent-green)] bg-[var(--surface-secondary)] px-5 py-6 sm:px-8 sm:py-3">
            <p className="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">We didn't start with a huge office, millions of dollars, or a perfect business plan.</p>
            <p className="mt-3 text-base text-[var(--text-secondary)] sm:mt-4 sm:text-lg">What we had was crazy ideas, good friends, the courage to start, and the willingness to keep going when everything goes wrong.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default StoryToday;