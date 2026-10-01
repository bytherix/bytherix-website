import PAMHero from "./components/PAMHero";
import PAMHeartbeat from "./components/PAMHeartbeat";
import PAMNeeds from "./components/PAMNeeds";
import PAMCapabilities from "./components/PAMCapabilities";
import PAMArchitecture from "./components/PAMArchitecture";
import PAMModules from "./components/PAMModules";
import PAMBloodPressure from "./components/PAMBloodPressure";
import PAMAlerts from "./components/PAMAlerts";
import PAMCompliance from "./components/PAMCompliance";
import PAMRoadmap from "./components/PAMRoadmap";
import PAMCTA from "./components/PAMCTA";


/**
 * ARCK 103 PAM (Advanced Real-Time Patient Assistance & Monitoring System)
 * product page.
 *
 * Structured exactly like the One For All page: a linear product story where
 * each section owns its layout and pulls its copy from `data/pamContent.ts`,
 * which is sourced from the Bytherix "ARCK 103 PAM" specification (v1.0).
 * The source is a proof-of-concept specification, so nothing on this page
 * states the device is a finished, certified or cleared product.
 */
const PAMPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <PAMHero />
      <PAMHeartbeat />
      <PAMNeeds />
      <PAMCapabilities />
      <PAMArchitecture />
      <PAMModules />
      <PAMBloodPressure />
      <PAMAlerts />
      <PAMCompliance />
      <PAMRoadmap />
      <PAMCTA />
    </main>
  );
};

export default PAMPage;
