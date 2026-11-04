import { useMemo } from "react";

import Particles from "@tsparticles/react";

import type { ISourceOptions } from "@tsparticles/engine";

const networkPoints = [
  { left: "25%", top: "18%", size: "5px", delay: "0s" },
  { left: "39%", top: "28%", size: "4px", delay: "0.8s" },
  { left: "51%", top: "17%", size: "6px", delay: "1.4s" },
  { left: "62%", top: "32%", size: "4px", delay: "0.3s" },
  { left: "72%", top: "20%", size: "5px", delay: "1.1s" },
  { left: "79%", top: "42%", size: "6px", delay: "0.6s" },
  { left: "67%", top: "53%", size: "4px", delay: "1.8s" },
  { left: "55%", top: "64%", size: "5px", delay: "0.5s" },
  { left: "43%", top: "55%", size: "4px", delay: "1.3s" },
  { left: "31%", top: "70%", size: "5px", delay: "0.2s" },
  { left: "76%", top: "75%", size: "4px", delay: "1.6s" },
];

export default function ProductNetworkBackground() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: {
        enable: false,
      },

      background: {
        color: "transparent",
      },

      fpsLimit: 60,

      detectRetina: true,

      pauseOnBlur: true,

      pauseOnOutsideViewport: true,

      particles: {
        number: {
          value: 62,
          density: {
            enable: true,
            area: 850,
          },
        },

        color: {
          value: [
            "#00AEEF",
            "#20C997",
            "#3157D5",
            "#38BDF8",
            "#67E8F9",
          ],
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: {
            min: 0.25,
            max: 0.78,
          },

          animation: {
            enable: true,
            speed: 0.45,
            minimumValue: 0.15,
            sync: false,
          },
        },

        size: {
          value: {
            min: 1,
            max: 2.8,
          },

          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.7,
            sync: false,
          },
        },

        links: {
          enable: true,
          distance: 155,
          color: "#159FDB",
          opacity: 0.24,
          width: 1,
        },

        move: {
          enable: true,
          speed: 0.48,
          direction: "none",
          random: true,
          straight: false,

          outModes: {
            default: "bounce",
          },
        },

        shadow: {
          enable: true,
          color: "#00AEEF",
          blur: 7,

          offset: {
            x: 0,
            y: 0,
          },
        },
      },

      interactivity: {
        detectsOn: "window",

        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },

          onClick: {
            enable: false,
          },

          resize: {
            enable: true,
          },
        },

        modes: {
          grab: {
            distance: 185,

            links: {
              opacity: 0.72,
              color: "#38BDF8",
            },
          },
        },
      },

      responsive: [
        {
          maxWidth: 1024,

          options: {
            particles: {
              number: {
                value: 46,
              },

              links: {
                distance: 130,
                opacity: 0.19,
              },

              move: {
                speed: 0.42,
              },
            },
          },
        },

        {
          maxWidth: 640,

          options: {
            particles: {
              number: {
                value: 27,
              },

              links: {
                distance: 105,
                opacity: 0.14,
              },

              move: {
                speed: 0.35,
              },
            },

            interactivity: {
              events: {
                onHover: {
                  enable: false,
                },
              },
            },
          },
        },
      ],
    }),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* =====================================================
          TS PARTICLES NETWORK
      ===================================================== */}

      <Particles
        id="product-network-background"
        options={options}
        className="absolute inset-0 h-full w-full opacity-70 dark:opacity-100"
      />

      {/* =====================================================
          MAIN TECH GRID
      ===================================================== */}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(57, 142, 190, 0.095) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(57, 142, 190, 0.095) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "54px 54px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        }}
      />

      {/* =====================================================
          SMALL INNER GRID
      ===================================================== */}

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 174, 239, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 174, 239, 0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* =====================================================
          LEFT ATMOSPHERIC GLOW
      ===================================================== */}

      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#00AEEF]/[0.055] blur-[120px]" />

      {/* =====================================================
          CENTRAL BLUE ATMOSPHERE
      ===================================================== */}

      <div className="absolute left-[48%] top-[35%] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#3157D5]/[0.035] blur-[120px]" />

      {/* =====================================================
          RIGHT ATMOSPHERIC GLOW
      ===================================================== */}

      <div className="absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full bg-[#00AEEF]/[0.055] blur-[140px]" />

      {/* =====================================================
          DECORATIVE NETWORK LINES
      ===================================================== */}

      <svg
        className="absolute inset-0 h-full w-full opacity-45"
        viewBox="0 0 1440 620"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="networkLineBlue"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#00AEEF"
              stopOpacity="0"
            />

            <stop
              offset="45%"
              stopColor="#00AEEF"
              stopOpacity="0.55"
            />

            <stop
              offset="100%"
              stopColor="#3157D5"
              stopOpacity="0"
            />
          </linearGradient>

          <linearGradient
            id="networkLineCyan"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#38BDF8"
              stopOpacity="0"
            />

            <stop
              offset="50%"
              stopColor="#38BDF8"
              stopOpacity="0.45"
            />

            <stop
              offset="100%"
              stopColor="#20C997"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path
          d="M320 0 L450 205 L640 145 L780 275 L930 115 L1110 175 L1320 70"
          fill="none"
          stroke="url(#networkLineBlue)"
          strokeWidth="1.2"
        />

        <path
          d="M390 620 L520 410 L680 480 L790 315 L980 395 L1140 285 L1440 345"
          fill="none"
          stroke="url(#networkLineCyan)"
          strokeWidth="1.1"
        />

        <path
          d="M560 0 L645 145 L780 275 L680 480 L520 410"
          fill="none"
          stroke="#00AEEF"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <path
          d="M780 275 L930 115 L1140 285 L980 395 L780 275"
          fill="none"
          stroke="#38BDF8"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <path
          d="M930 115 L1010 0"
          fill="none"
          stroke="#00AEEF"
          strokeOpacity="0.2"
          strokeWidth="1"
        />

        <path
          d="M1140 285 L1270 470 L1440 345"
          fill="none"
          stroke="#3157D5"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
      </svg>

      {/* =====================================================
          FIXED DECORATIVE NODES
      ===================================================== */}

      {networkPoints.map((point, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-[#38BDF8] shadow-[0_0_14px_3px_rgba(56,189,248,0.45)]"
          style={{
            left: point.left,
            top: point.top,
            width: point.size,
            height: point.size,
            animation: `network-node-pulse 3.2s ease-in-out ${point.delay} infinite`,
          }}
        />
      ))}

      {/* =====================================================
          EXTRA SPARKLES
      ===================================================== */}

      <span className="absolute left-[34%] top-[23%] h-1 w-1 rounded-full bg-[#38BDF8] shadow-[0_0_10px_3px_rgba(56,189,248,0.35)] dark:bg-white dark:shadow-[0_0_10px_3px_rgba(255,255,255,0.45)]" />

      <span className="absolute left-[57%] top-[43%] h-1.5 w-1.5 rounded-full bg-[#00AEEF] shadow-[0_0_15px_4px_rgba(0,174,239,0.65)]" />

      <span className="absolute left-[71%] top-[18%] h-1 w-1 rounded-full bg-[#67E8F9] shadow-[0_0_12px_3px_rgba(103,232,249,0.6)]" />

      <span className="absolute left-[74%] top-[67%] h-1.5 w-1.5 rounded-full bg-[#20C997] shadow-[0_0_14px_4px_rgba(32,201,151,0.5)]" />

      {/* =====================================================
          FADE AT BOTTOM
      ===================================================== */}

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/55 to-transparent dark:from-[#020817] dark:via-[#020817]/55" />

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes network-node-pulse {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(0.85);
            }

            50% {
              opacity: 1;
              transform: scale(1.25);
            }
          }
        `}
      </style>
    </div>
  );
}

