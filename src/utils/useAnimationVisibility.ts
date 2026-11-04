import { useEffect, useState, type RefObject } from "react";

export function useAnimationVisibility<T extends Element>(
  ref: RefObject<T | null>,
): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    let isIntersecting = false;
    const updateVisibility = () => {
      setIsActive(isIntersecting && document.visibilityState === "visible");
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      updateVisibility();
    });

    observer.observe(element);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [ref]);

  return isActive;
}
