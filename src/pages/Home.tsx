import Section from "@/components/Section";
import Hero from "@/components/Hero";
import { skillsRadar, testimonials, skillGroups } from "@/lib/data";
import SkillsRadar from "@/components/SkillsRadar";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import SkillsBoard from "@/components/SkillsBoard";
import GithubProjects from "@/components/GithubProjects";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section>
        <Reveal>
          <Hero />
        </Reveal>
      </Section>

      {/* Últimos 3 proyectos desde GitHub – cards anchas (2 columnas) */}
      <Section>
        <Reveal>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white">
              Últimos proyectos
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Vista rápida de lo más reciente.
            </p>
          </div>
        </Reveal>

        <div className="mt-5">
          <GithubProjects
            username="DevIan28"
            limit={3}
            hideControls
            gridClassName="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
            cardVariant="wide"
          />
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
