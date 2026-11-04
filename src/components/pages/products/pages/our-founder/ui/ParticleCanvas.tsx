import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type ParticleMode =
  | "fire"
  | "water"
  | "earth"
  | "wind"
  | "lightning"
  | "ambient";

interface ParticleCanvasProps {
  mode: ParticleMode;
  className?: string;
  /** Let the pointer/gyroscope nudge the particle field. Off by default for the closing section, on for the Elements showcase. */
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hueJitter: number;
}

/**
 * A single, mode-driven particle engine used for every elemental visual
 * (fire / water / earth / wind / lightning) and for the ambient field in
 * the closing section. Keeping one engine — rather than five bespoke
 * animation implementations — means there is one resize handler, one
 * rAF loop, one cleanup path, and one reduced-motion / off-screen pause
 * path to maintain.
 *
 * Pure canvas 2D: no Three.js / WebGL dependency, since the project does
 * not already use one and a 2D particle field is enough to sell each
 * element convincingly at this scale.
 */
const PALETTES: Record<ParticleMode, string[]> = {
  fire: ["#fde68a", "#fb923c", "#f97316", "#ef4444"],
  water: ["#bae6fd", "#38bdf8", "#0ea5e9", "#22d3ee"],
  earth: ["#d6b98c", "#a1745a", "#78716c", "#57534e"],
  wind: ["#f8fafc", "#e2e8f0", "#cbd5e1", "#94a3b8"],
  lightning: ["#e0f2fe", "#a5f3fc", "#67e8f9", "#c4b5fd"],
  ambient: ["#fdba74", "#fb923c", "#f87171", "#fda4af"],
};

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const spawnParticle = (mode: ParticleMode, width: number, height: number): Particle => {
  const hueJitter = Math.random();

  switch (mode) {
    case "fire":
      return {
        x: randomBetween(width * 0.2, width * 0.8),
        y: height + randomBetween(0, 40),
        vx: randomBetween(-0.35, 0.35),
        vy: randomBetween(-1.6, -0.7),
        size: randomBetween(2, 5),
        life: 0,
        maxLife: randomBetween(60, 140),
        hueJitter,
      };
    case "water":
      return {
        x: randomBetween(0, width),
        y: randomBetween(height * 0.35, height * 0.75),
        vx: randomBetween(0.4, 1.1),
        vy: randomBetween(-0.15, 0.15),
        size: randomBetween(1.5, 3.5),
        life: 0,
        maxLife: randomBetween(120, 220),
        hueJitter,
      };
    case "earth":
      return {
        x: randomBetween(0, width),
        y: randomBetween(-40, 0),
        vx: randomBetween(-0.2, 0.2),
        vy: randomBetween(0.3, 0.9),
        size: randomBetween(2, 6),
        life: 0,
        maxLife: randomBetween(140, 240),
        hueJitter,
      };
    case "wind":
      return {
        x: randomBetween(-20, 0),
        y: randomBetween(0, height),
        vx: randomBetween(1.4, 2.6),
        vy: randomBetween(-0.4, 0.4),
        size: randomBetween(6, 18),
        life: 0,
        maxLife: randomBetween(70, 130),
        hueJitter,
      };
    case "lightning":
      return {
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        vx: randomBetween(-0.2, 0.2),
        vy: randomBetween(-0.2, 0.2),
        size: randomBetween(1, 2.5),
        life: 0,
        maxLife: randomBetween(40, 100),
        hueJitter,
      };
    case "ambient":
    default:
      return {
        x: randomBetween(0, width),
        y: height + randomBetween(0, 60),
        vx: randomBetween(-0.15, 0.15),
        vy: randomBetween(-0.5, -0.15),
        size: randomBetween(1.5, 3),
        life: 0,
        maxLife: randomBetween(160, 320),
        hueJitter,
      };
  }
};

const ParticleCanvas = ({ mode, className, interactive = false }: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const pointer = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 768 ? 1.25 : 1.75,
    );
    let particles: Particle[] = [];
    let bolt: { points: [number, number][]; life: number } | null = null;
    let rafId = 0;
    let visible = false;
    let pageVisible = document.visibilityState === "visible";
    let lastTime = performance.now();

    const targetCount = () => {
      const area = width * height;
      // Cap density so large sections stay cheap; mobile widths naturally get fewer.
      const base = Math.min(90, Math.max(24, Math.round(area / 9000)));
      return mode === "lightning" ? Math.round(base * 0.4) : base;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(
        window.devicePixelRatio || 1,
        window.innerWidth < 768 ? 1.25 : 1.75,
      );
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    particles = Array.from({ length: targetCount() }, () => spawnParticle(mode, width, height));

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: (event.clientX - rect.left) / Math.max(rect.width, 1),
        y: (event.clientY - rect.top) / Math.max(rect.height, 1),
      };
    };

    let orientationHandler: ((e: DeviceOrientationEvent) => void) | null = null;
    if (interactive && typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      orientationHandler = (event: DeviceOrientationEvent) => {
        if (event.gamma == null || event.beta == null) return;
        // Map device tilt (-45..45deg) onto the same 0..1 pointer space.
        pointer.current = {
          x: Math.min(1, Math.max(0, 0.5 + event.gamma / 90)),
          y: Math.min(1, Math.max(0, 0.5 + (event.beta - 45) / 90)),
        };
      };
      window.addEventListener("deviceorientation", orientationHandler);
    }

    if (interactive) {
      canvas.addEventListener("pointermove", handlePointer);
    }

    const drawBolt = () => {
      if (!bolt) return;
      const palette = PALETTES.lightning;
      ctx.save();
      ctx.strokeStyle = palette[2];
      ctx.shadowColor = palette[0];
      ctx.shadowBlur = 18;
      ctx.lineWidth = 2;
      ctx.globalAlpha = Math.max(0, bolt.life / 10);
      ctx.beginPath();
      bolt.points.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();
      bolt.life -= 1;
      if (bolt.life <= 0) bolt = null;
    };

    const maybeSpawnBolt = () => {
      if (mode !== "lightning") return;
      if (bolt) return;
      if (Math.random() > 0.985) {
        const points: [number, number][] = [];
        const startX = randomBetween(width * 0.2, width * 0.8);
        let x = startX;
        let y = 0;
        points.push([x, y]);
        const segments = 6;
        for (let i = 1; i <= segments; i += 1) {
          x += randomBetween(-30, 30);
          y = (height / segments) * i;
          points.push([x, y]);
        }
        bolt = { points, life: 10 };
      }
    };

    const step = (time: number) => {
      rafId = 0;
      if (!visible || !pageVisible) return;

      const dt = Math.min(2, (time - lastTime) / 16.67);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const palette = PALETTES[mode];
      const tiltX = interactive ? (pointer.current.x - 0.5) * 0.6 : 0;
      const tiltY = interactive ? (pointer.current.y - 0.5) * 0.4 : 0;

      particles.forEach((p, index) => {
        p.life += dt;

        if (mode === "wind") {
          p.y += Math.sin(p.life * 0.08 + index) * 0.4 * dt;
        }
        if (mode === "water") {
          p.y += Math.sin(p.life * 0.05 + p.x * 0.02) * 0.3 * dt;
        }
        if (mode === "fire") {
          p.x += Math.sin(p.life * 0.1 + index) * 0.25 * dt;
        }

        p.x += (p.vx + tiltX) * dt;
        p.y += (p.vy + tiltY) * dt;

        const progress = p.life / p.maxLife;
        const fade = progress < 0.15 ? progress / 0.15 : 1 - Math.max(0, (progress - 0.6) / 0.4);
        const alpha = Math.max(0, Math.min(1, fade));

        const color = palette[Math.floor(p.hueJitter * palette.length) % palette.length];

        ctx.save();
        ctx.globalAlpha = mode === "lightning" ? alpha * 0.7 : alpha * 0.85;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = mode === "earth" ? 0 : 8;

        if (mode === "wind") {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size * 0.25, Math.atan2(p.vy, p.vx), 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        const offscreen =
          p.life >= p.maxLife || p.x < -60 || p.x > width + 60 || p.y < -60 || p.y > height + 60;

        if (offscreen) {
          particles[index] = spawnParticle(mode, width, height);
        }
      });

      maybeSpawnBolt();
      drawBolt();
      scheduleFrame();
    };

    const scheduleFrame = () => {
      if (!reduceMotion && visible && pageVisible && rafId === 0) {
        rafId = requestAnimationFrame(step);
      }
    };

    const updateVisibility = (isVisible: boolean) => {
      visible = isVisible;
      if (visible && pageVisible) {
        scheduleFrame();
      } else {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        updateVisibility(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      // Static, low-cost single frame instead of a running animation loop.
      ctx.clearRect(0, 0, width, height);
      const palette = PALETTES[mode];
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.4,
      );
      gradient.addColorStop(0, `${palette[1]}33`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else {
      scheduleFrame();
    }

    const handlePageVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      updateVisibility(visible);
    };

    document.addEventListener("visibilitychange", handlePageVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handlePageVisibility);
      if (interactive) canvas.removeEventListener("pointermove", handlePointer);
      if (orientationHandler) {
        window.removeEventListener("deviceorientation", orientationHandler);
      }
    };
  }, [mode, interactive, reduceMotion]);

  return <canvas ref={canvasRef} className={`founder-particle-canvas ${className ?? ""}`} aria-hidden="true" />;
};

export default ParticleCanvas;
