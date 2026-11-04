import FounderHero from "./components/FounderHero";
import FounderOrigin from "./components/FounderOrigin";
import FounderWorld from "./components/FounderWorld";
import FounderCombat from "./components/FounderCombat";
import FounderElements from "./components/FounderElements";
import FounderCompanion from "./components/FounderCompanion";
import FounderEnemies from "./components/FounderEnemies";
import FounderQueen from "./components/FounderQueen";
import FounderClosing from "./components/FounderClosing";
import ChapterNav, { type Chapter } from "./ui/ChapterNav";
import "./founder.css";

const chapters: Chapter[] = [
  { id: "beginning", index: "01", label: "Beginning" },
  { id: "tragedy", index: "02", label: "Tragedy" },
  { id: "journey", index: "03", label: "Journey" },
  { id: "combat", index: "04", label: "Combat" },
  { id: "powers", index: "05", label: "Powers" },
  { id: "companion", index: "06", label: "Companion" },
  { id: "enemies", index: "07", label: "Enemies" },
  { id: "queen", index: "08", label: "Queen Boksi" },
];

const FounderAmbient = () => (
  <div className="founder-ambient" aria-hidden="true">
    <div className="founder-grid founder-grid-moving" />
    <div className="founder-orb founder-orb-orange" />
    <div className="founder-orb founder-orb-red" />
    <div className="founder-orb founder-orb-blue" />
  </div>
);

const OurFounderPage = () => {
  return (
    <main className="founder-page">
      <FounderAmbient />

      <ChapterNav chapters={chapters} />

      <FounderHero />

      <div className="founder-divider" />

      <FounderOrigin />

      <div className="founder-divider" />

      <FounderWorld />

      <div className="founder-divider" />

      <FounderCombat />

      <div className="founder-divider" />

      <FounderElements />

      <div className="founder-divider" />

      <FounderCompanion />

      <div className="founder-divider" />

      <FounderEnemies />

      <FounderQueen />

      <FounderClosing />
    </main>
  );
};

export default OurFounderPage;
