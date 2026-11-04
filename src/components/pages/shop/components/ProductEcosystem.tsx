import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { Variants } from "motion/react";
import { Layers3, MonitorCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import bytherixLogo from "../../../../assets/BYTHERIXlogo.png";
import { digitalProducts, softwareProducts } from "../data/product.data";
import type { ProductItem } from "../data/product.data";

const accentColor: Record<ProductItem["accent"], string> = {
  blue: "#00AEEF",
  green: "#20C997",
  red: "#FF3B30",
};

interface Category {
  id: "software" | "digital";
  label: string;
  icon: LucideIcon;
  color: string;
  products: ProductItem[];
}

const categories: Category[] = [
  {
    id: "software",
    label: "Software",
    icon: MonitorCog,
    color: "#00AEEF",
    products: softwareProducts,
  },
  {
    id: "digital",
    label: "Digital Products",
    icon: Layers3,
    color: "#3157D5",
    products: digitalProducts,
  },
];

const countLabel = (count: number) =>
  `${count} ${count === 1 ? "product" : "products"}`;

const W = 1000;
const H = 560;

type NodeKind = "hub" | "category" | "product";

interface GraphNode {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  parent?: string;
  color: string;
  label: string;
  meta: string;
  icon?: LucideIcon;
}

interface GraphEdge {
  from: string;
  to: string;
  color: string;
  depth: number;
}

const categorySlots = {
  software: { x: 270, y: 235, dir: -1 },
  digital: { x: 730, y: 325, dir: 1 },
} as const;

function buildGraph() {
  const nodes: GraphNode[] = [
    {
      id: "hub",
      kind: "hub",
      x: 500,
      y: 280,
      color: "#16b7f2",
      label: "Bytherix Product App",
      meta: "",
    },
  ];
  const edges: GraphEdge[] = [];

  categories.forEach((category) => {
    const slot = categorySlots[category.id];
    const count = category.products.length;

    nodes.push({
      id: category.id,
      kind: "category",
      x: slot.x,
      y: slot.y,
      parent: "hub",
      color: category.color,
      label: category.label,
      meta: countLabel(count),
      icon: category.icon,
    });
    edges.push({ from: "hub", to: category.id, color: category.color, depth: 0 });

    category.products.forEach((product, index) => {
      const rawY =
        count === 1 ? slot.y - 120 : slot.y + (index - (count - 1) / 2) * 250;

      nodes.push({
        id: product.id,
        kind: "product",
        x: slot.x + slot.dir * 150,
        y: Math.min(H - 60, Math.max(60, rawY)),
        parent: category.id,
        color: accentColor[product.accent],
        label: product.name,
        meta: product.label,
      });
      edges.push({
        from: category.id,
        to: product.id,
        color: accentColor[product.accent],
        depth: 1,
      });
    });
  });

  return { nodes, edges };
}

const graph = buildGraph();
const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));

function relatedTo(id: string) {
  const related = new Set<string>([id]);

  let current = nodeById.get(id);
  while (current?.parent) {
    related.add(current.parent);
    current = nodeById.get(current.parent);
  }

  const walk = (parentId: string) => {
    graph.nodes
      .filter((node) => node.parent === parentId)
      .forEach((child) => {
        related.add(child.id);
        walk(child.id);
      });
  };
  walk(id);

  return related;
}

function curve(from: GraphNode, to: GraphNode) {
  const midX = from.x + (to.x - from.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

const position = (node: GraphNode) => ({
  left: `${(node.x / W) * 100}%`,
  top: `${(node.y / H) * 100}%`,
});

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function HubBody({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative h-28 w-28">
      <motion.span
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.07, 1], opacity: [0.8, 0.3, 0.8] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-5 rounded-[46px] border border-[#00AEEF]/30"
      />
      <motion.span
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.6, 0.15, 0.6] }
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.1,
        }}
        className="absolute -inset-10 rounded-[62px] border border-[#00AEEF]/20"
      />

      <div className="relative flex h-full w-full items-center justify-center rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-300/40 dark:border-white/10 dark:shadow-black/40">
        <img
          src={bytherixLogo}
          alt="Bytherix"
          draggable={false}
          className="h-14 w-14 object-contain"
        />
      </div>

      <p className="absolute left-1/2 top-full mt-12 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-slate-950 dark:text-white">
        Bytherix Product App
      </p>
    </div>
  );
}

function NodeBody({
  node,
  dimmed,
  active,
}: {
  node: GraphNode;
  dimmed: boolean;
  active: boolean;
}) {
  const style = {
    borderColor: active ? node.color : undefined,
    opacity: dimmed ? 0.45 : 1,
  };

  if (node.kind === "category" && node.icon) {
    const Icon = node.icon;

    return (
      <div
        className="flex w-[208px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-[border-color,opacity] duration-300 dark:border-white/10 dark:bg-[#071126]"
        style={style}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${node.color}1F` }}
        >
          <Icon className="h-[18px] w-[18px]" style={{ color: node.color }} />
        </span>

        <span className="min-w-0">
          <span className="block whitespace-nowrap text-sm font-semibold text-slate-950 dark:text-white">
            {node.label}
          </span>
          <span className="block text-xs text-slate-500 dark:text-slate-400">
            {node.meta}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-[168px] overflow-hidden rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-3 shadow-sm transition-[border-color,opacity] duration-300 dark:border-white/10 dark:bg-[#071126]"
      style={style}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: node.color }}
      />
      <p className="text-[13px] font-medium leading-snug text-slate-900 dark:text-slate-100">
        {node.label}
      </p>
      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
        {node.meta}
      </p>
    </div>
  );
}

function EcosystemNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string | null>(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.6 });

  const frontX = useTransform(smoothX, (value) => value * 10);
  const frontY = useTransform(smoothY, (value) => value * 8);
  const backX = useTransform(smoothX, (value) => value * -22);
  const backY = useTransform(smoothY, (value) => value * -16);

  const related = activeId ? relatedTo(activeId) : null;
  const state = inView ? "show" : "hidden";

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    setActiveId(null);
  };

  const nodeDelay = (node: GraphNode, index: number) =>
    node.kind === "hub" ? 0.1 : node.kind === "category" ? 0.75 : 1.5 + index * 0.1;

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto mt-10 aspect-[1000/560] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-white/[0.07] dark:bg-white/[0.015]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.08),transparent_42%)]" />

      <motion.div
        style={reduceMotion ? undefined : { x: backX, y: backY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" fill="none">
          <ellipse
            cx="500"
            cy="280"
            rx="430"
            ry="240"
            strokeWidth="1"
            strokeDasharray="2 9"
            className="eco-orbit stroke-slate-300 dark:stroke-white/[0.09]"
          />
          <ellipse
            cx="500"
            cy="280"
            rx="255"
            ry="140"
            strokeWidth="1"
            className="stroke-slate-200 dark:stroke-white/[0.05]"
          />
        </svg>
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { x: frontX, y: frontY }}
        className="absolute inset-0"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {graph.edges.map((edge, index) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;

            const path = curve(from, to);
            const lit = !related || (related.has(edge.from) && related.has(edge.to));
            const highlighted = related !== null && lit;

            return (
              <g
                key={edge.to}
                className="transition-opacity duration-300"
                style={{ opacity: lit ? 1 : 0.25 }}
              >
                <motion.path
                  d={path}
                  stroke={edge.color}
                  strokeWidth={highlighted ? 1.75 : 1.25}
                  strokeOpacity={highlighted ? 0.95 : 0.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{
                    duration: 0.85,
                    delay: edge.depth === 0 ? 0.35 : 1.15,
                    ease: "easeInOut",
                  }}
                />

                {!reduceMotion && (
                  <path
                    d={path}
                    pathLength={100}
                    stroke={edge.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    className="eco-signal"
                    style={{ animationDelay: `${2.6 + index * 0.85}s` }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {graph.nodes.map((node, index) => {
          const isHub = node.kind === "hub";
          const dimmed = related !== null && !related.has(node.id);

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={position(node)}
              onPointerEnter={() => setActiveId(node.id)}
              onPointerLeave={() => setActiveId(null)}
            >
              <motion.div
                variants={nodeVariants}
                custom={nodeDelay(node, index)}
                initial="hidden"
                animate={state}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, isHub ? -3 : -5, 0] }}
                  transition={{
                    duration: 6 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  whileHover={{ scale: isHub ? 1.03 : 1.05 }}
                >
                  {isHub ? (
                    <HubBody reduceMotion={reduceMotion} />
                  ) : (
                    <NodeBody
                      node={node}
                      dimmed={dimmed}
                      active={activeId === node.id}
                    />
                  )}
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

const railColor = "bg-slate-300 dark:bg-slate-700";

function EcosystemTree() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const state = inView ? "show" : "hidden";

  return (
    <div ref={ref} className="mx-auto mt-10 max-w-2xl">
      <motion.div
        variants={nodeVariants}
        custom={0}
        initial="hidden"
        animate={state}
        className="flex items-center gap-4"
      >
        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-slate-200 bg-white shadow-lg shadow-slate-300/40 dark:border-white/10 dark:shadow-black/40">
          <img
            src={bytherixLogo}
            alt="Bytherix"
            draggable={false}
            className="h-9 w-9 object-contain"
          />
        </div>

        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-950 dark:text-white">
            Bytherix Product App
          </p>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Software and digital products in one place
          </p>
        </div>
      </motion.div>

      <div className="mt-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const first = index === 0;
          const last = index === categories.length - 1;
          const delay = 0.35 + index * 0.25;

          const railPosition = `${first ? "-top-2" : "top-0"} ${
            last ? (first ? "h-[42px]" : "h-[34px]") : "bottom-0"
          }`;

          return (
            <div key={category.id} className="relative pb-4 pl-14 last:pb-0">
              <motion.span
                initial={{ scaleY: 0 }}
                animate={{ scaleY: inView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: delay - 0.2, ease: "easeOut" }}
                className={`absolute left-8 w-px origin-top ${railColor} ${railPosition}`}
              />
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 0.4, delay, ease: "easeOut" }}
                className={`absolute left-8 top-[34px] h-px w-6 origin-left ${railColor}`}
              />

              <motion.div
                variants={nodeVariants}
                custom={delay + 0.15}
                initial="hidden"
                animate={state}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#071126]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${category.color}1F` }}
                  >
                    <Icon
                      className="h-[18px] w-[18px]"
                      style={{ color: category.color }}
                    />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">
                      {category.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {countLabel(category.products.length)}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {category.products.map((product) => (
                    <li
                      key={product.id}
                      className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-3 dark:border-white/[0.07] dark:bg-white/[0.03]"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-[3px]"
                        style={{ backgroundColor: accentColor[product.accent] }}
                      />
                      <p className="text-[13px] font-medium leading-snug text-slate-900 dark:text-slate-100">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {product.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductEcosystem() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="homepage-gutters pb-10 pt-2 sm:pb-12 sm:pt-3 lg:pb-14 lg:pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          {/* <p className="text-sm font-semibold text-[#0C8F6A] dark:text-[#20C997]">
            Product Ecosystem
          </p> */}

          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em]  sm:text-4xl lg:text-5xl text-[#0C8F6A] dark:text-[#20C997]">
            Everything connects.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
            A growing ecosystem of digital products and software experiences
            connected through one technology vision.
          </p>
        </div>

        {isDesktop ? <EcosystemNetwork /> : <EcosystemTree />}
      </div>

      <style>
        {`
          @keyframes eco-signal {
            0% { stroke-dashoffset: 12; opacity: 0; }
            6% { opacity: 0.9; }
            48% { stroke-dashoffset: -88; opacity: 0.9; }
            54% { stroke-dashoffset: -88; opacity: 0; }
            100% { stroke-dashoffset: -88; opacity: 0; }
          }

          @keyframes eco-orbit {
            to { stroke-dashoffset: -110; }
          }

          .eco-signal {
            stroke-dasharray: 12 88;
            opacity: 0;
            animation: eco-signal 7s linear infinite;
          }

          .eco-orbit {
            animation: eco-orbit 40s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .eco-signal { display: none; }
            .eco-orbit { animation: none; }
          }
        `}
      </style>
    </section>
  );
}
