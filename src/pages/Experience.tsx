import Section from "@/components/Section";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Certifications from "@/components/Certifications";
import { certifications } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <>
      <Section>
        <Reveal><h2 className="text-2xl font-semibold">Experiencia</h2></Reveal>
        <div className="mt-6">
          <Reveal><ExperienceTimeline /></Reveal>
        </div>
      </Section>

      <Section>
        <Reveal><Certifications items={certifications} /></Reveal>
      </Section>
    </>
  );
}
