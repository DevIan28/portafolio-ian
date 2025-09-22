import { useRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  strength?: number;       
  radius?: number;         
};

export default function MagneticCard({
  className,
  strength = 14,
  radius = 180,
  children,
  ...rest
}: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = innerRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      el.style.transform = `translate3d(0,0,0)`;
      return;
    }
    const ratio = (1 - dist / radius) * (strength / Math.max(dist, 1));
    const tx = dx * ratio;
    const ty = dy * ratio;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }

  function onLeave() {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = `translate3d(0,0,0)`;
  }

  return (
    <div
      className={cn("relative group", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <div ref={innerRef} className="will-change-transform transition-transform duration-150">
        {children}
      </div>
    </div>
  );
}
