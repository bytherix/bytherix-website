import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { ProductItem } from "../data/product.data";

interface ProductCardProps {
  product: ProductItem;
  index: number;
  featuredLayout?: boolean;
}

const accentStyles = {
  blue: {
    text: "text-[#0084BD] dark:text-[#00AEEF]",
    chip: "border-[#00AEEF]/30 bg-[#00AEEF]/10 text-[#0084BD] dark:text-[#00AEEF]",
    border: "hover:border-[#00AEEF]/40",
  },
  green: {
    text: "text-[#0C8F6A] dark:text-[#20C997]",
    chip: "border-[#20C997]/30 bg-[#20C997]/10 text-[#0C8F6A] dark:text-[#20C997]",
    border: "hover:border-[#20C997]/40",
  },
  red: {
    text: "text-[#D92D20] dark:text-[#FF3B30]",
    chip: "border-[#FF3B30]/30 bg-[#FF3B30]/10 text-[#D92D20] dark:text-[#FF3B30]",
    border: "hover:border-[#FF3B30]/40",
  },
};

export default function ProductCard({
  product,
  index,
  featuredLayout = false,
}: ProductCardProps) {
  const accent = accentStyles[product.accent];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
      }}
      whileHover={{ y: -4 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm shadow-slate-200/50 transition-[border-color,box-shadow,transform] duration-300 hover:shadow-lg hover:shadow-slate-300/30 dark:border-white/[0.08] dark:bg-white/[0.025] dark:shadow-none dark:hover:shadow-black/20 ${accent.border}`}
    >
      {/* Product Image */}
      <div
        className={`relative w-full overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 dark:border-white/[0.07] dark:from-white/[0.035] dark:to-white/[0.015] ${
          featuredLayout
            ? "h-[240px] sm:h-[260px]"
            : "h-[200px] sm:h-[220px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.5,
            delay: 0.08 + index * 0.05,
          }}
          className="absolute inset-0"
        >
          <img
            src={product.image}
            alt={`${product.name} preview`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:p-4"
          />
        </motion.div>
      </div>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.025em] text-slate-950 dark:text-white">
            {product.name}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm leading-5.5 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none ${accent.chip}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="mt-auto pt-5">
          <Link
            to={product.href}
            className={`inline-flex w-fit items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${accent.text}`}
          >
            <span>{product.action}</span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}