import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const features = [
  {
    icon: Layers3,
    label: "Unified Management",
  },
  {
    icon: Users,
    label: "Connected Operations",
  },
  {
    icon: ShieldCheck,
    label: "Structured Workflows",
  },
];

export default function FeaturedProduct() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-0.8, 0.8]);

  return (
    <section ref={ref} className="relative">
      <div className="mb-5 flex items-center gap-3">

        <p className="text-2xl font-bold tracking-wide text-[#FF3B30] dark:text-[#FF3B30]">
          Featured Product
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-[#071126]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(0,174,239,0.12),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(32,201,151,0.07),transparent_25%)]" />

        <div className="relative grid lg:grid-cols-[0.82fr_1.18fr]">
          {/* Content */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
            <div>
              <span className="inline-flex rounded-full border border-[#00AEEF]/20 bg-[#00AEEF]/10 px-3 py-1.5 text-xs font-semibold text-[#00AEEF] sm:text-sm">
                Software
              </span>

              <h3 className="mt-5 max-w-lg text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                One system.
                <br />
                <span className="text-slate-400 dark:text-slate-500">
                  Many possibilities.
                </span>
              </h3>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 dark:text-slate-400">
                One For All is a connected management ecosystem built to
                simplify people, operations, workflows, and information.
              </p>

              <div className="mt-6 space-y-3">
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00AEEF]/10">
                      <Icon className="h-3.5 w-3.5 text-[#00AEEF]" />
                    </span>

                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products/one-for-all"
                className="group inline-flex items-center gap-2 rounded-full bg-[#3157D5] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2548be]"
              >
                Explore One For All

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/products/one-for-all"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00AEEF]/40 hover:text-[#00AEEF] dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-[#00AEEF]/30"
              >
                Request Demo
              </Link>
            </div>
          </div>

          {/* Interactive Preview */}
          <div className="relative min-h-[330px] overflow-hidden p-4 sm:min-h-[400px] sm:p-6 lg:min-h-[480px] lg:p-8">
            <motion.div
              style={{
                y: imageY,
                rotate,
              }}
              className="absolute inset-4 sm:inset-6 lg:inset-8"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30 dark:border-white/[0.08] dark:bg-[#09152b] dark:shadow-black/30">
                {/* Browser Header */}
                <div className="flex h-10 items-center gap-2 border-b border-slate-200 px-4 dark:border-white/[0.07]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF3B30]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#20C997]/70" />

                  <div className="ml-3 h-2 w-20 rounded-full bg-slate-200 dark:bg-white/10" />
                </div>

                {/* Dashboard */}
                <div className="grid grid-cols-[54px_1fr] p-3 sm:grid-cols-[72px_1fr] sm:p-4">
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className={`h-7 rounded-lg ${
                          item === 1
                            ? "bg-[#00AEEF]/10"
                            : "bg-slate-100 dark:bg-white/[0.025]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="pl-3 sm:pl-4">
                    <div className="grid gap-2 sm:grid-cols-3">
                      {[
                        ["Users", "2.4K"],
                        ["Activity", "84%"],
                        ["Projects", "128"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-white/[0.06] dark:bg-white/[0.025]"
                        >
                          <p className="text-[11px] font-medium text-slate-500">
                            {label}
                          </p>

                          <p className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 h-36 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/[0.06] dark:bg-white/[0.02] sm:h-44">
                      <div className="flex h-full items-end gap-1.5">
                        {[35, 50, 42, 70, 58, 82, 66, 92, 74, 100].map(
                          (height, index) => (
                            <motion.div
                              key={index}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${height}%` }}
                              viewport={{ once: true }}
                              transition={{
                                delay: index * 0.04,
                                duration: 0.5,
                              }}
                              className="flex-1 rounded-t bg-gradient-to-t from-[#00AEEF]/20 to-[#00AEEF]/70"
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#20C997]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      System active
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-slate-600 backdrop-blur-md dark:border-white/10 dark:bg-[#071126]/90 dark:text-slate-400">
                  Interactive Preview
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
