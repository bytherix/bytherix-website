import { motion } from "motion/react";
import { Grid2X2, Layers3, MonitorCog } from "lucide-react";
import type { ProductFilter } from "../ShopPage";

interface ProductCategoryTabsProps {
  filter: ProductFilter;
  setFilter: (filter: ProductFilter) => void;
}

const categories = [
  {
    id: "all" as const,
    label: "All Products",
    icon: Grid2X2,
  },
  {
    id: "digital" as const,
    label: "Digital Products",
    icon: Layers3,
  },
  {
    id: "software" as const,
    label: "Software",
    icon: MonitorCog,
  },
];

export default function ProductCategoryTabs({
  filter,
  setFilter,
}: ProductCategoryTabsProps) {
  return (
    <section className="homepage-gutters sticky top-0 z-30 border-y border-slate-200/80 bg-white/85 py-2 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#020817]/85">
      <div className="mx-auto flex max-w-7xl overflow-x-auto">
        {categories.map((category) => {
          const active = filter === category.id;
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              className="relative flex shrink-0 items-center gap-2.5 px-4 py-3.5 text-sm font-semibold transition-colors duration-300 sm:px-6"
            >
              {active && (
                <motion.span
                  layoutId="product-active-tab"
                  className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#00AEEF] shadow-[0_0_12px_rgba(0,174,239,0.55)]"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}

              <Icon
                className={`h-4 w-4 ${
                  active
                    ? "text-[#00AEEF]"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              />

              <span
                className={
                  active
                    ? "text-slate-950 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }
              >
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
