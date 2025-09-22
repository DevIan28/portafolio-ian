import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import type { Project } from "@/lib/data";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import MagneticCard from "@/components/ui/magnetic-card";
import ProjectModal from "@/components/ProjectModal";

type Variant = "normal" | "wide";

function coverFromRepo(repoUrl?: string) {
  if (!repoUrl) return null;
  try {
    const u = new URL(repoUrl);
    const parts = u.pathname.split("/").filter(Boolean); // ["DevIan28","repo"]
    if (parts.length >= 2) {
      const [owner, repo] = parts;
      return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    }
  } catch {}
  return null;
}

function coverOf(p: Project) {
  if (p.images?.length) return p.images[0];
  const og = coverFromRepo(p.repo);
  if (og) return og;
  return `https://picsum.photos/seed/${encodeURIComponent(p.id)}-cover/1200/800`;
}

// GH Pages solo para ciertos repos tuyos
function pagesUrlIfAny(repoUrl?: string) {
  if (!repoUrl) return null;
  try {
    const u = new URL(repoUrl);
    const owner = u.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
    const repo = u.pathname.split("/").filter(Boolean)[1];
    const allow = new Set(["delicias-web", "Nintendo_Games_Catalog", "portafolio-ian"].map(s => s.toLowerCase()));
    if (owner === "devian28" && repo && allow.has(repo.toLowerCase())) {
      return `https://devian28.github.io/${repo}/`;
    }
  } catch {}
  return null;
}

export default function ProjectCard({ p, variant = "normal" }: { p: Project; variant?: Variant }) {
  const [open, setOpen] = useState(false);
  const cover = coverOf(p);
  const pagesUrl = pagesUrlIfAny(p.repo);

  // Altura controlada: en "wide" (Home) bajamos la altura para que no se vean largas
  const heightCls =
    variant === "wide"
      ? "h-[400px] md:h-[420px]"
      : "h-[460px] md:h-[500px]";

  return (
    <>
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
        <MagneticCard>
          <Card
            className={`group relative overflow-hidden hover:shadow-lg transition
                        ${heightCls} flex flex-col w-full
                        border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/85`}
          >
            {/* Resplandor suave al hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-brand-500/0 group-hover:from-brand-500/10 group-hover:via-transparent group-hover:to-fuchsia-500/10 transition-opacity duration-300" />

            <CardContent className="p-0 flex-1 flex flex-col">
              {/* Media con relación fija (igual altura visual) */}
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

              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-lg font-semibold text-neutral-900 dark:text-white leading-tight"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "2.5rem",
                    }}
                    title={p.title}
                  >
                    {p.title}
                  </h3>

                  <Button variant="ghost" className="gap-2" aria-label="Ver más" onClick={() => setOpen(true)}>
                    <Maximize2 size={16} /> Ver más
                  </Button>
                </div>

                <p
                  className="mt-1 text-sm text-neutral-700 dark:text-neutral-300"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.9rem", // ~3 líneas
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

                {/* Footer abajo: Demo / Pages / Repo */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer">
                      <Button className="gap-2 text-sm">
                        <ExternalLink size={16} /> Visitar
                      </Button>
                    </a>
                  )}

                  {pagesUrl && (
                    <a href={pagesUrl} target="_blank" rel="noreferrer">
                      <Button variant="secondary" className="gap-2 text-sm">
                        <ExternalLink size={16} /> Pages
                      </Button>
                    </a>
                  )}

                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      <Button variant="ghost" className="gap-2 text-sm">
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

      <ProjectModal open={open} onClose={() => setOpen(false)} p={p} />
    </>
  );
}
