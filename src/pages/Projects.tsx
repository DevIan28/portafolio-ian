import Section from "@/components/Section";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <Section>
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">Proyectos</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Selección de trabajos y experimentos.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-autofit gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}><ProjectCard p={p} /></Reveal>
        ))}
      </div>
    </Section>
  );
}
