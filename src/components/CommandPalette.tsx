import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Moon, Sun, ExternalLink, FileText, Home, Briefcase, History, Mail, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";
import { useTheme } from "@/providers/theme-provider";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  icon?: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const nav = useNavigate();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const cmds = useMemo<Cmd[]>(
    () => [
      { id: "home", label: "Ir a Inicio", icon: <Home size={16} />, action: () => nav("/") },
      { id: "projects", label: "Ir a Proyectos", icon: <Briefcase size={16} />, action: () => nav("/projects") },
      { id: "exp", label: "Ir a Experiencia", icon: <History size={16} />, action: () => nav("/experience") },
      { id: "contact", label: "Ir a Contacto", icon: <Mail size={16} />, action: () => nav("/contact") },
      { id: "theme", label: theme === "dark" ? "Cambiar a claro" : "Cambiar a oscuro", icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />, action: toggle },
      { id: "cv", label: "Abrir CV", hint: profile.resumeUrl, icon: <FileText size={16} />, action: () => profile.resumeUrl && window.open(profile.resumeUrl, "_blank") },
      { id: "gh", label: "Abrir GitHub", hint: profile.socials.github, icon: <Github size={16} />, action: () => window.open(profile.socials.github, "_blank") },
      { id: "in", label: "Abrir LinkedIn", hint: profile.socials.linkedin, icon: <Linkedin size={16} />, action: () => window.open(profile.socials.linkedin, "_blank") },
      { id: "x", label: "Abrir X/Twitter", hint: profile.socials.twitter, icon: <ExternalLink size={16} />, action: () => window.open(profile.socials.twitter, "_blank") },
    ],
    [nav, theme, toggle]
  );

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return cmds;
    return cmds.filter(c => (c.label + " " + (c.hint ?? "")).toLowerCase().includes(t));
  }, [q, cmds]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isOpenKey = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k";
      if (isOpenKey) { e.preventDefault(); setOpen(o => !o); setTimeout(() => { const el = document.getElementById("cmd-input") as HTMLInputElement | null; el?.focus(); }, 0); }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); results[idx]?.action(); setOpen(false); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, idx]);

  useEffect(() => { setIdx(0); }, [q]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fixed inset-0 z-[90] grid place-items-start p-4 pt-24">
        <div className="w-full max-w-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <Search size={16} className="text-neutral-500" />
            <input
              id="cmd-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Escribe un comando o navega... (↑/↓ Enter, Esc para cerrar)"
              className="w-full bg-transparent outline-none text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
            />
            <span className="text-[10px] text-neutral-500 border border-neutral-300 dark:border-neutral-700 rounded px-1 py-0.5">Ctrl</span>
            <span className="text-[10px] text-neutral-500 border border-neutral-300 dark:border-neutral-700 rounded px-1 py-0.5">K</span>
          </div>

          <ul className="max-h-80 overflow-auto py-2">
            {results.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => { c.action(); setOpen(false); }}
                  onMouseEnter={() => setIdx(i)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${i === idx ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
                >
                  <span className="shrink-0">{c.icon}</span>
                  <span className="text-neutral-800 dark:text-neutral-100">{c.label}</span>
                  {c.hint && <span className="ml-auto text-xs text-neutral-500 truncate max-w-[40%]">{c.hint}</span>}
                </button>
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-4 py-6 text-sm text-neutral-500">Sin resultados</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
