import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import type { SVGProps } from "react";

export type RadarDatum = { area: string; level: number };

// Recharts espera props tipo SVG para `tick`, no CSSProperties.
const tickProps: SVGProps<SVGTextElement> = { fill: "currentColor", fontSize: 12 };

export default function SkillsRadar({ data }: { data: RadarDatum[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Stack actual</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Mapa de dominio (0–100)</p>

      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="area" tick={tickProps} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={tickProps} />
            <Radar dataKey="level" stroke="#1f87f5" fill="#1f87f5" fillOpacity={0.3} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
