
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PartnerNetworkBackground from "./components/PartnerNetworkBackground";
import { PARTNERS } from "./constants/Partnershipdata";

gsap.registerPlugin(ScrollTrigger);

const Partnership = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean);

      gsap.set(items, { opacity: 0, y: 20 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white px-5 py-8 dark:bg-[#020817] sm:px-8 sm:py-10 lg:px-[60px]"
    >
      <PartnerNetworkBackground />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3157d5]/10 blur-3xl dark:bg-[#00aeef]/10" />
      </div>

      <div className="homepage-container relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          Our{" "}
          <span className="bg-gradient-to-r from-[#3157d5] to-[#00aeef] bg-clip-text text-transparent dark:drop-shadow-[0_0_20px_rgba(0,174,239,0.35)]">
            Partners
          </span>
        </h2>

        {/* <p className="mx-auto mt-3 text-xl leading-6 text-slate-600/80 dark:text-slate-300/70 sm:text-base font-semibold">
          Building stronger connections through collaboration and innovation.
        </p> */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:mt-10 sm:gap-x-14 sm:gap-y-7">
          {PARTNERS.map((partner, index) => (
            <div
              key={partner.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="flex h-14 w-40 items-center justify-center sm:h-18 sm:w-52"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnership;

