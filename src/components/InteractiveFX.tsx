import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { useTheme } from "@/providers/theme-provider";

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
};

export default function InteractiveFX() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { theme } = useTheme();

  function trigger(x: number, y: number) {
    const light = ["#1f87f5", "#f59e0b", "#ef4444", "#10b981"];
    const dark = ["#22d3ee", "#a78bfa", "#f472b6", "#86efac"];
    const palette = theme === "dark" ? dark : light;

    const N = 22;
    const now = Date.now();
    const burst: Particle[] = Array.from({ length: N }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / N + Math.random() * 0.6;
      const speed = 60 + Math.random() * 120;
      return {
        id: now + i + Math.floor(Math.random() * 1000),
        x,
        y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 8,
        color: palette[i % palette.length],
      };
    });

    setParticles((p) => [...p, ...burst]);
  }

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Lanzar confeti"
        title="Lanza confeti donde hagas click"
        onClick={(e) => {
          trigger(e.clientX, e.clientY);
        }}
      >
        🎉 Confeti
      </Button>

      {/* Capa global para partículas */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.8 }}
            animate={{
              x: p.x + p.dx,
              y: p.y + p.dy,
              opacity: 0,
              scale: 1,
              rotate: 180,
            }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 12px ${p.color}55`,
            }}
            onAnimationComplete={() =>
              setParticles((prev) => prev.filter((x) => x.id !== p.id))
            }
          />
        ))}
      </div>
    </>
  );
}
