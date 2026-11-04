import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

export interface Chapter {
  id: string;
  index: string;
  label: string;
}

interface ChapterNavProps {
  chapters: Chapter[];
}

/**
 * A slim, premium chapter rail that tracks the visitor's position through
 * the Founder story. It never becomes a literal game HUD — just a thin
 * progress line, a numbered chapter list, and a subtle active indicator.
 */
const ChapterNav = ({ chapters }: ChapterNavProps) => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [chapters]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <nav className="founder-nav" aria-label="Founder story chapters">
      <motion.div
        className="founder-nav-progress"
        style={reduceMotion ? undefined : { scaleX: scrollYProgress }}
      />

      <button
        type="button"
        className="founder-nav-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="founder-nav-list"
      >
        <span className="founder-nav-toggle-dot" />
        {chapters.find((c) => c.id === activeId)?.label ?? "Founder"}
      </button>

      <ul
        id="founder-nav-list"
        className={`founder-nav-list ${open ? "founder-nav-list-open" : ""}`}
      >
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeId;

          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => goTo(chapter.id)}
                className={`founder-nav-item ${isActive ? "founder-nav-item-active" : ""}`}
              >
                <span className="founder-nav-item-index">{chapter.index}</span>
                <span className="founder-nav-item-label">{chapter.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ChapterNav;
