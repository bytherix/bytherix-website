import { lazy, Suspense } from "react";
import Hero from "./sections/hero/Hero";

const Partnership = lazy(() => import("./sections/partnership/Partnership"));
const About = lazy(() => import("./sections/about/About"));
const Services = lazy(() => import("./sections/ourservices/Services"));
const Courses = lazy(() => import("./sections/courses/Courses"));
const Testimonials = lazy(() => import("./sections/testimonials/Testimonials"));
const ContactHero = lazy(() => import("./sections/contact/layout/ContactHero"));
const ContactSection = lazy(() => import("./sections/contact/ContactSection"));
const Footer = lazy(() => import("../../layout/Footer"));

function SectionLoader() {
  return <div className="w-full min-h-[200px] bg-[#050814]" />;
}

interface HomeProps {
  docked: boolean;
}

function Home({ docked }: HomeProps) {
  return (
    <>
      <Hero docked={docked} />

      <Suspense fallback={<SectionLoader />}>
        <section id="partnership" className="scroll-mt-24">
          <Partnership />
        </section>

        <section id="about" className="scroll-mt-24">
          <About />
        </section>

        <section id="services" className="scroll-mt-24">
          <Services />
        </section>

        <section id="courses" className="scroll-mt-24">
          <Courses />
        </section>

        <section id="testimonials" className="scroll-mt-24">
          <Testimonials />
        </section>

        <section id="contact" className="scroll-mt-24">
          <ContactHero />
          <ContactSection />
        </section>

        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
