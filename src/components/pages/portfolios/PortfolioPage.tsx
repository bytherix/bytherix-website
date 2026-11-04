// import PortfolioHero from "./components/PortfolioHero";
import PortfolioProjects from "./components/PortfolioProjects";
import PortfolioCTA from "./components/PortfolioCTA";

const PortfolioPage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* <PortfolioHero /> */}
      <PortfolioProjects />
      <PortfolioCTA />
    </main>
  );
};

export default PortfolioPage;