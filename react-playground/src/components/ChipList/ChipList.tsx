import { useEffect, useRef, useState } from "react";
import "./ChipList.scss";

export const ChipList = ({ chips }: { chips: string[] }) => {
  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(true);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const update = () => {
      setHasLeft(el.scrollLeft > 0);
      setHasRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update as EventListener);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`chip-wrap ${hasLeft ? "show-left" : ""} ${
        hasRight ? "show-right" : ""
      }`}
    >
      <div
        className="chips"
        role="group"
        aria-label="tags"
        tabIndex={0}
        ref={rowRef}
      >
        {chips.map((c) => (
          <span className="chip" key={c}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};
