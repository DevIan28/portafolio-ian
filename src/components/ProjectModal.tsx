import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import Carousel from "@/components/ui/carousel";
import { X, ExternalLink, Github } from "lucide-react";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import type { Project } from "@/lib/data";

type Props = {
  open: boolean;
  onClose: () => void;
  p: Project;
};

export default function ProjectModal({ open, onClose, p }: Props) {
  useLockBodyScroll(open);
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            key="dialog"
            className="fixed inset-0 z-[60] grid place-items-center p-4"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl overflow-hidden">
              {/* Carrusel (si hay imágenes) o banner degradado */}
              {p.images?.length ? (
                <Carousel images={p.images} heightClass="h-64 md:h-80" />
              ) : (
                <div className="h-32 w-full bg-gradient-to-br from-brand-300/35 via-amber-200/25 to-fuchsia-300/25 dark:from-fuchsia-700/30 dark:via-cyan-700/20 dark:to-brand-700/25" />
              )}

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-neutral-700 dark:text-neutral-300">{p.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    aria-label="Cerrar"
                    onClick={onClose}
                    className="rounded-full p-2"
                  >
                    <X size={18} />
                  </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      <Button variant="ghost" className="gap-2">
                        <Github size={16} /> Repo
                      </Button>
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">
                      <Button className="gap-2">
                        <ExternalLink size={16} /> Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
