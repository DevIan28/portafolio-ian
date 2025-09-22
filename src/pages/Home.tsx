import Section from "@/components/Section";
import Hero from "@/components/Hero";
import { skillsRadar, testimonials, skillGroups } from "@/lib/data";
import SkillsRadar from "@/components/SkillsRadar";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import SkillsBoard from "@/components/SkillsBoard";
import GithubProjects from "@/components/GithubProjects";
import Button from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section>
        <Reveal>
          <Hero />
        </Reveal>
      </Section>

      {/* Últimos 3 proyectos desde GitHub */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white">
                Últimos proyectos
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Vista rápida de lo más reciente. En la página de Proyectos están todos.
              </p>
            </div>
          </Reveal>

          <Link to="/projects">
            <Button className="hidden sm:inline-flex">Ver todos</Button>
          </Link>
        </div>

        <div className="mt-5">
          <GithubProjects username="DevIan28" limit={3} hideControls />
        </div>

        {/* Botones a demos publicadas */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://devian28.github.io/Nintendo_Games_Catalog/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" className="gap-2">
              <ExternalLink size={16} /> Nintendo&nbsp;Games
            </Button>
          </a>

          <a
            href="https://devian28.github.io/delicias-web/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" className="gap-2">
              <ExternalLink size={16} /> Delicias&nbsp;Web
            </Button>
          </a>

          <Link to="/projects">
            <Button className="gap-2">Ver todos los proyectos</Button>
          </Link>
        </div>
      </Section>

      {/* Radar de skills */}
      <Section>
        <Reveal>
          <SkillsRadar data={skillsRadar} />
        </Reveal>
      </Section>

      {/* Tablero de skills */}
      <Section>
        <Reveal>
          <SkillsBoard groups={skillGroups} />
        </Reveal>
      </Section>

      {/* Testimonios */}
      <Section>
        <Reveal>
          <Testimonials items={testimonials} />
        </Reveal>
      </Section>
    </>
  );
}
