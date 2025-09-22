import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import type { Project } from "@/lib/data";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import MagneticCard from "@/components/ui/magnetic-card";
import ProjectModal from "@/components/ProjectModal";

function coverFromRepo(repoUrl?: string) {
  if (!repoUrl) return null;
  try {
    const u = new URL(repoUrl);
    // E.g. https://github.com/DevIan28/nintendo-games -> ["", "DevIan28", "nintendo-games"]
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const [owner, repo] = parts;
      return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    }
  } catch {
    /* noop */
  }
  return null;
}

function coverOf(p: Project) {
  if (p.images?.length) return p.images[0];
  const og = coverFromRepo(p.repo);
  if (og) return og;
  return `https://picsum.photos/seed/${encodeURIComponent(p.id)}-cover/1200/800`;
}

export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const cover = coverOf(p);

  return (
    <>
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
        <MagneticCard>
          <Card
            className="
              group relative overflow-hidden hover:shadow-lg transition
              h-[480px] md:h-[500px] flex flex-col w-full
              border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/85
            "
          >
            {/* Resplandor suave al hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-brand-500/0 group-hover:from-brand-500/10 group-hover:via-transparent group-hover:to-fuchsia-500/10 transition-opacity duration-300" />

            <CardContent className="p-0 flex-1 flex flex-col">
              {/* Banner con imagen (relación fija) */}
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={cover}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://picsum.photos/seed/${encodeURIComponent(p.id)}-fallback/1200/800`;
                  }}
                />
              </div>

              {/* Contenido */}
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-lg font-semibold text-neutral-900 dark:text-white leading-tight"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "2.5rem", // ~2 líneas
                    }}
                    title={p.title}
                  >
                    {p.title}
                  </h3>

                  <Button
                    variant="ghost"
                    className="gap-2"
                    aria-label="Ver más"
                    onClick={() => setOpen(true)}
                  >
                    <Maximize2 size={16} /> Ver más
                  </Button>
                </div>

                <p
                  className="mt-1 text-sm text-neutral-700 dark:text-neutral-300"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.8rem", // ~4 líneas
                  }}
                  title={p.description}
                >
                  {p.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                {/* Footer fijo abajo: botón de demo y repo dentro de la card */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">
                      <Button className="gap-2 text-sm" aria-label="Abrir demo">
                        <ExternalLink size={16} /> Visitar
                      </Button>
                    </a>
                  )}

                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      <Button variant="ghost" className="gap-2 text-sm" aria-label="Abrir repositorio">
                        <Github size={16} /> Repo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </MagneticCard>
      </motion.div>

      {/* Modal de detalles/galería */}
      <ProjectModal open={open} onClose={() => setOpen(false)} p={p} />
    </>
  );
}
