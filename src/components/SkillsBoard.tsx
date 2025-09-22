import { Code2, Layout, Server, Database, Cloud, FlaskConical, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import TechTag from "@/components/ui/tech-tag";

export type SkillGroup = { title: string; items: string[]; icon?: ReactNode };

const ICONS: Record<string, ReactNode> = {
  Lenguajes: <Code2 size={16} />,
  Frontend: <Layout size={16} />,
  Backend: <Server size={16} />,
  "Bases de Datos": <Database size={16} />,
  Cloud: <Cloud size={16} />,
  DevOps: <Wrench size={16} />,
  QA: <FlaskConical size={16} />,
};

export default function SkillsBoard({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Tecnologías</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Stack ordenado por categorías</p>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/60 p-4"
          >
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
              <span className="inline-grid place-items-center h-8 w-8 rounded-full bg-neutral-200/70 dark:bg-neutral-800">
                {ICONS[g.title] ?? g.icon}
              </span>
              <h4 className="font-medium">{g.title}</h4>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <TechTag key={t} name={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
