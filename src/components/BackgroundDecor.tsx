import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function BackgroundDecor() {
  // Posición normalizada del puntero (-0.5 .. 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  // Capas con diferente profundidad
  const t1x = useTransform(sx, (v) => v * 40);
  const t1y = useTransform(sy, (v) => v * 40);
  const t2x = useTransform(sx, (v) => v * 24);
  const t2y = useTransform(sy, (v) => v * 24);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid sutil que cambia con el tema */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] dark:opacity-[0.12]">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" className="text-neutral-200 dark:text-neutral-800" fill="currentColor" />
        <rect width="100%" height="100%" fill="url(#grid)" className="text-neutral-400 dark:text-neutral-700" />
      </svg>

      {/* Blobs claros (con parallax) */}
      <motion.div
        style={{ x: t1x, y: t1y }}
        className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-300 blur-3xl opacity-40 dark:hidden"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ x: t2x, y: t2y }}
        className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-amber-200 blur-3xl opacity-40 dark:hidden"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Blobs oscuros (con parallax) */}
      <motion.div
        style={{ x: t1x, y: t1y }}
        className="absolute -top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-700/40 blur-3xl hidden dark:block"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ x: t2x, y: t2y }}
        className="absolute bottom-0 -right-24 h-[26rem] w-[26rem] rounded-full bg-cyan-700/40 blur-3xl hidden dark:block"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
