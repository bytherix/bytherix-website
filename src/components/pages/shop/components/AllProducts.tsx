import { AnimatePresence, motion } from "motion/react";

import { digitalProducts, softwareProducts } from "../data/product.data";

import ProductCard from "../ui/ProductCard";
import FeaturedProduct from "../ui/FeaturedProduct";

import type { ProductFilter } from "../ShopPage";

interface AllProductsProps {
  filter: ProductFilter;
}

export default function AllProducts({ filter }: AllProductsProps) {
  const showFeatured = filter === "all";
  const showDigital = filter === "all" || filter === "digital";
  const showSoftware = filter === "all" || filter === "software";

  return (
    <section
      id="products"
      className="scroll-mt-20 px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-[60px]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Introduction */}
        <div className="max-w-3xl">
          <p className="text-2xl font-semibold tracking-wide text-[#0084BD] dark:text-[#00AEEF]">
            Explore Products
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 dark:text-slate-400">
            Discover focused digital products and connected software experiences
            from Bytherix, designed to simplify workflows, improve operations,
            and create better digital experiences.
          </p>
        </div>

        {/* Featured Product — All Products Only */}
        <AnimatePresence mode="popLayout">
          {showFeatured && (
            <motion.div
              key="featured-product"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8 sm:mt-10"
            >
              <FeaturedProduct />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Digital Products */}
        <AnimatePresence mode="popLayout">
          {showDigital && (
            <motion.div
              key="digital-products"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: filter === "digital" ? 0.05 : 0,
              }}
              className={filter === "all" ? "mt-10 sm:mt-12" : "mt-8 sm:mt-10"}
            >
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#FF3B30] dark:text-[#FF3B30]">
                    Digital Products
                  </h3>
                </div>

                <p className="mt-2  text-l  leading-6 text-slate-500 dark:text-slate-400">
                  Purpose-built digital products designed around specific
                  workflows, industries, and everyday needs.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
                {digitalProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Software */}
        <AnimatePresence mode="popLayout">
          {showSoftware && (
            <motion.div
              key="software-products"
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: filter === "software" ? 0.05 : 0,
              }}
              className={filter === "all" ? "mt-10 sm:mt-12" : "mt-8 sm:mt-10"}
            >
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#FF3B30] dark:text-[#FF3B30]">
                    Software
                  </h3>
                </div>

                <p className="mt-2  text-l leading-6 text-slate-500 dark:text-slate-400">
                  Connected software experiences built to bring people,
                  processes, and operations together.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
                {softwareProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    featuredLayout
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
