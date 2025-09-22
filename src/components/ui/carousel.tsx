import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  className?: string;
  heightClass?: string; // ej: "h-64 md:h-80"
};

export default function Carousel({ images, className, heightClass = "h-64 md:h-80" }: Props) {
  const [idx, setIdx] = useState(0);
  if (!images?.length) return null;

  function prev() { setIdx((i) => (i - 1 + images.length) % images.length); }
  function next() { setIdx((i) => (i + 1) % images.length); }

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900", className)}>
      <motion.div
        className="flex"
        animate={{ x: `-${idx * 100}%` }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x > 60) prev();
          else if (info.offset.x < -60) next();
        }}
      >
        {images.map((src, i) => (
          <div key={i} className={cn("min-w-full", heightClass)}>
            <img
              src={src}
              alt={`Imagen ${i + 1}`}
              className="h-full w-full object-cover select-none pointer-events-none"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>

      {/* Controles */}
      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/80 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/80 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a la imagen ${i + 1}`}
            onClick={() => setIdx(i)}
            className={cn(
              "h-1.5 w-4 rounded-full transition",
              i === idx ? "bg-brand-600" : "bg-neutral-300 dark:bg-neutral-700"
            )}
          />
        ))}
      </div>
    </div>
  );
}
