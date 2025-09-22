import Section from "@/components/Section";
import Hero from "@/components/Hero";
import { projects, skillsRadar, testimonials, skillGroups } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import SkillsRadar from "@/components/SkillsRadar";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import SkillsBoard from "@/components/SkillsBoard";

export default function Home() {
  return (
    <>
      <Section>
        <Reveal><Hero /></Reveal>
      </Section>

      <Section>
        <Reveal><h2 className="text-2xl font-semibold">Proyectos destacados</h2></Reveal>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal><SkillsRadar data={skillsRadar} /></Reveal>
      </Section>

      <Section>
        <Reveal><SkillsBoard groups={skillGroups} /></Reveal>
      </Section>

      <Section>
        <Reveal><Testimonials items={testimonials} /></Reveal>
      </Section>
    </>
  );
}
