import Section from "@/components/Section";
import GithubProjects from "@/components/GithubProjects";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Proyectos
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Lista automática de mis repositorios en GitHub (DevIan28).
        </p>
      </Reveal>

      <GithubProjects username="DevIan28" />
    </Section>
  );
}
