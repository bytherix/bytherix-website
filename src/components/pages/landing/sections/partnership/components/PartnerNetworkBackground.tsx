import { useEffect, useRef } from "react";

/**
 * Tuning knobs — adjust these to change animation intensity.
 */
const PARTICLE_DENSITY = 9000; // lower = more particles (particles = area / density)
const MAX_PARTICLES = 46;
const CONNECTION_DISTANCE = 130; // px — lines only draw between particles closer than this
const PARTICLE_SPEED = 0.12; // px per frame, base drift speed

// Existing Bytherix brand accents reused here — change these two hexes
// to restyle both the heading gradient (see Partnership.tsx) and the
// particle network together.
const ACCENT_BLUE = "49, 87, 213"; // #3157d5 as an rgb triplet
const ACCENT_CYAN = "0, 174, 239"; // #00aeef as an rgb triplet

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorRgb: string;
}

const PartnerNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isDark = document.documentElement.classList.contains("dark");
    let animationFrameId = 0;

    const buildParticles = () => {
      const area = width * height;
      const count = Math.min(
        MAX_PARTICLES,
        Math.max(14, Math.round(area / PARTICLE_DENSITY)),
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        radius: Math.random() * 1.4 + 0.8,
        colorRgb: Math.random() > 0.6 ? ACCENT_CYAN : ACCENT_BLUE,
      }));
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildParticles();
    };

    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const dotOpacity = isDark ? 0.35 : 0.22;

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.colorRgb}, ${dotOpacity})`;
        ctx.fill();
      });
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const lineOpacityBase = isDark ? 0.16 : 0.09;
      const dotOpacity = isDark ? 0.55 : 0.32;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity =
              lineOpacityBase * (1 - distance / CONNECTION_DISTANCE);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${ACCENT_BLUE}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.colorRgb}, ${dotOpacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      resize();

      if (reducedMotionQuery.matches) {
        drawStaticFrame();
      } else {
        cancelAnimationFrame(animationFrameId);
        drawFrame();
      }
    };

    const handleResize = () => {
      resize();

      if (reducedMotionQuery.matches) {
        drawStaticFrame();
      }
    };

    const themeObserver = new MutationObserver((mutations) => {
      const themeChanged = mutations.some(
        (mutation) =>
          mutation.type === "attributes" &&
          mutation.attributeName === "class",
      );

      if (themeChanged) {
        isDark = document.documentElement.classList.contains("dark");

        if (reducedMotionQuery.matches) {
          drawStaticFrame();
        }
      }
    });

    const handleMotionPreferenceChange = () => {
      cancelAnimationFrame(animationFrameId);
      start();
    };

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);

    start();

    return () => {
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

export default PartnerNetworkBackground;