import About from "../landing/sections/about/About";

const ProductsPage = () => {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="sr-only">Products &mdash; Bytherix Technology</h1>
      <About />
    </main>
  );
};

export default ProductsPage;