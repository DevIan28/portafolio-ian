import { cn } from "@/lib/utils";

type Props = { name: string; className?: string };

// Mapeo rápido de icono y color por tecnología
const MAP: Record<string, { icon: string; bg?: string; color?: string }> = {
  typescript: { icon: "TS", bg: "#3178c6" },
  javascript: { icon: "JS", bg: "#f7df1e", color: "#111" },
  react: { icon: "⚛️" },
  vite: { icon: "V", bg: "#646cff" },
  tailwindcss: { icon: "Tw", bg: "#06b6d4" },
  "framer motion": { icon: "FM", bg: "#e91e63" },

  "node.js": { icon: "Node", bg: "#3c873a" },
  node: { icon: "Node", bg: "#3c873a" },
  express: { icon: "Ex", bg: "#000000" },
  "asp.net core": { icon: ".NET", bg: "#512bd4" },
  "spring boot": { icon: "SB", bg: "#6db33f" },
  java: { icon: "☕" },
  "c#": { icon: "C#", bg: "#239120" },

  mysql: { icon: "🐬" },
  postgresql: { icon: "🐘" },
  mongodb: { icon: "🍃" },

  aws: { icon: "☁️" },
  docker: { icon: "🐳" },

  "github actions": { icon: "⚙️" },
  "ci/cd": { icon: "CI", bg: "#0ea5e9" },
  "docker compose": { icon: "🐳" },

  playwright: { icon: "🎭" },
  cypress: { icon: "Cy", bg: "#3E464A" },
  "jest/rtl": { icon: "JT", bg: "#C21325" },
};

export default function TechTag({ name, className }: Props) {
  const key = name.toLowerCase();
  const cfg = MAP[key] ?? {};
  const isEmoji = cfg.icon && /[\p{Emoji}\uFE0F]/u.test(cfg.icon);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
        "bg-white/70 border-neutral-200 text-neutral-700 backdrop-blur",
        "dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-neutral-300",
        className
      )}
      title={name}
    >
      <span
        className={cn(
          "inline-grid place-items-center h-4 w-4 rounded-full text-[9px] font-bold",
          isEmoji && "bg-transparent text-base h-4 w-4"
        )}
        style={{
          background: isEmoji ? "transparent" : cfg.bg ?? "#94a3b8",
          color: isEmoji ? "inherit" : cfg.color ?? "#fff",
        }}
      >
        {cfg.icon ?? name[0].toUpperCase()}
      </span>
      {name}
    </span>
  );
}
