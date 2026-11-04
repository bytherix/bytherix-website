import AboutOverview from './sections/overview/AboutOverview';
import TechWorkflow from './sections/techstack/TechWorkflow';
import TechMarquee from './sections/techstack/TechMarquee';
import OurTeam from '../team/Team';
import AllInOne from './sections/allinone/AllInOne';
import BlogsPage from '../../pages/blogs/BlogsPage';
import SDLCSection from "./sections/SDLCSection/SDLCSection";
import Footer from '../../layout/Footer';

export default function AboutCompanyPage() {
  return (
    <main>
      <AboutOverview />
      <OurTeam />
      <TechMarquee />
      <AllInOne /> 
      <TechWorkflow />
      <SDLCSection />
      <BlogsPage />
      <Footer />
    </main>
  );
}