import { useState } from "react";
import ProductHero from "./components/ShopHero";
import ProductCategoryTabs from "./components/ProductCategoryTabs";
import AllProducts from "./components/AllProducts";
import ProductEcosystem from "./components/ProductEcosystem";
import ProductCTA from "./components/ProductCTA";

export type ProductFilter = "all" | "digital" | "software";

export default function ShopPage() {
  const [filter, setFilter] = useState<ProductFilter>("all");

  return (
    <main className="min-h-screen overflow-hidden bg-white font-inter text-slate-950 dark:bg-[#020817] dark:text-white">
      <ProductHero />

      <ProductCategoryTabs
        filter={filter}
        setFilter={setFilter}
      />

      <AllProducts filter={filter} />

      <ProductEcosystem />

      <ProductCTA />
    </main>
  );
}
