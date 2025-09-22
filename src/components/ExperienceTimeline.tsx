import { experience } from "@/lib/data";
import { Calendar } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Línea central solo en pantallas md+ */}
      <div className="hidden md:block absolute left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />
      <ul className="space-y-6">
        {experience.map((item, i) => (
          <li key={i} className="relative md:pl-12">
            <div className="hidden md:block absolute left-3 top-2 h-3 w-3 rounded-full bg-neutral-900 dark:bg-white ring-4 ring-white dark:ring-neutral-950" />
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/85 dark:bg-neutral-900/85 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">{item.role}</h3>
                <span className="text-neutral-500">·</span>
                <p className="text-neutral-700 dark:text-neutral-300">{item.company}</p>
              </div>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                <Calendar size={14} /> {item.period}
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                {item.bullets.map((b: string, j: number) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
