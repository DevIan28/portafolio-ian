import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setPct(total > 0 ? (scrollTop / total) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brand-500 via-fuchsia-500 to-cyan-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
