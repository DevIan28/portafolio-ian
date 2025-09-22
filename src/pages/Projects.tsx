import Section from "@/components/Section";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import GithubProjects from "@/components/GithubProjects";

export default function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Proyectos
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Selección de trabajos y repositorios. Puedes filtrar los de GitHub por nombre o demo.
        </p>
      </Reveal>

      {/* Destacados manuales (si quieres mantenerlos) */}
      {projects.length > 0 && (
        <>
          <h3 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Destacados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </>
      )}

      {/* Todos los repos de GitHub (automático) */}
      <h3 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Repositorios de GitHub (DevIan28)
      </h3>
      <GithubProjects username="DevIan28" />
    </Section>
  );
}
