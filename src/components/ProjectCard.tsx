import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import type { Project } from "@/lib/data";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import MagneticCard from "@/components/ui/magnetic-card";
import ProjectModal from "@/components/ProjectModal";

export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
        <MagneticCard>
          <Card className="group relative overflow-hidden hover:shadow-lg transition">
            {/* Resplandor suave al hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/0 to-brand-500/0 group-hover:from-brand-500/10 group-hover:via-transparent group-hover:to-fuchsia-500/10 transition-opacity duration-300" />

            <CardContent className="p-0">
              {/* Banner decorativo */}
              <div className="h-28 w-full bg-gradient-to-br from-brand-300/35 via-amber-200/25 to-fuchsia-300/25 dark:from-fuchsia-700/30 dark:via-cyan-700/20 dark:to-brand-700/25" />

              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{p.title}</h3>
                  <Button variant="ghost" className="gap-2" aria-label="Ver más" onClick={() => setOpen(true)}>
                    <Maximize2 size={16} /> Ver más
                  </Button>
                </div>

                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{p.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
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
            </CardContent>
          </Card>
        </MagneticCard>
      </motion.div>

      <ProjectModal open={open} onClose={() => setOpen(false)} p={p} />
    </>
  );
}
