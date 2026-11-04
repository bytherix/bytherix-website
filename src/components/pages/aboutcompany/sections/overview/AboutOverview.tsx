"use client";

import AboutOverviewStats from "./data/AboutOverviewStats";
import BYTHERIXlogo from "../../../../../assets/BYTHERIXlogo.png";

interface AboutOverviewProps {
  readonly backgroundImage?: string;
}

const AboutOverview = ({ backgroundImage }: AboutOverviewProps) => {
  return (
    <section id="about-overview" aria-labelledby="about-overview-title" className="relative isolate min-h-screen overflow-hidden bg-white pt-[44px] pb-[32px] sm:pt-[48px] sm:pb-[36px] lg:pt-[44px] lg:pb-[32px] dark:bg-slate-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {backgroundImage && (
          <img src={backgroundImage} alt="" draggable={false} className="absolute left-1/2 top-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-10 sm:max-w-6xl lg:max-w-7xl dark:opacity-[0.12]" />
        )}

        <img src={BYTHERIXlogo} alt="" draggable={false} className="absolute left-1/2 top-1/2 w-[100%] -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-[0.18] sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[75%] dark:opacity-[0.22]" />

        <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/25" />
      </div>

      <div className="homepage-container relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <h2 id="about-overview-title" className="font-inter text-4xl font-extrabold uppercase leading-[1.5] tracking-[-0.045em] text-[#14276B] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="dark:text-white/90">Your</span>{" "}
            <span className="dark:text-[#3157D5]">Imagination</span>
            <br />
            <span className="dark:text-white/90">Our Job</span>
          </h2>
        </div>

        <div className="mt-10 sm:mt-10 lg:mt-10">
          <AboutOverviewStats />
        </div>

        <div className="mx-auto mt-8 max-w-5xl lg:mt-10">
          <p className="font-inter text-sm text-justify leading-[1.7] bg-gradient-to-r from-[#2F2F2F] via-[#795548] to-[#B48618] bg-clip-text text-transparent sm:text-base lg:text-lg dark:from-[#D6D6D6] dark:via-[#E8D7A8] dark:to-[#E8D7A8]">
            Based in Kathmandu, Bytherix Technology is a full-service web design and development agency dedicated to shaping high-impact digital experiences since 2023. We partner with businesses, institutions, and organizations both across Nepal and internationally, delivering bespoke web solutions tailored precisely to their strategic goals. Combining creative vision with reliable engineering, our team bridges local expertise with global standards to build powerful, future-ready digital products that drive growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;