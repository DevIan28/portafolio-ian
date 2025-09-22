import { useEffect, useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

type GHRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  pushed_at: string;
};

function cover(username: string, repo: string) {
  return `https://opengraph.githubassets.com/1/${username}/${repo}`;
}

export default function GithubProjects({
  username = "DevIan28",
  limit,
  hideControls = false,
}: {
  username?: string;
  limit?: number;
  hideControls?: boolean;
}) {
  const [data, setData] = useState<GHRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [hideForks, setHideForks] = useState(true);
  const [onlyWithDemo, setOnlyWithDemo] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const json: GHRepo[] = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        console.error("GitHub fetch error:", e);
        if (mounted) setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [username]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const base = data
      .filter((r) => (hideForks ? !r.fork : true))
      .filter((r) => (onlyWithDemo ? !!r.homepage : true))
      .filter((r) =>
        q.trim()
          ? (r.name + " " + (r.description ?? "") + " " + (r.language ?? ""))
              .toLowerCase()
              .includes(q.toLowerCase())
          : true
      )
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [data, hideForks, onlyWithDemo, q, limit]);

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-300">
        Cargando repositorios de GitHub…
      </div>
    );
  }

  if (!filtered.length) {
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-300">
        No hay proyectos para mostrar.
      </div>
    );
  }

  return (
    <div>
      {!hideControls && (
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre/desc/tecnología…"
            className="w-full sm:w-64 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 text-sm"
          />
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-black dark:accent-white"
              checked={hideForks}
              onChange={(e) => setHideForks(e.target.checked)}
            />
            Ocultar forks
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-black dark:accent-white"
              checked={onlyWithDemo}
              onChange={(e) => setOnlyWithDemo(e.target.checked)}
            />
            Solo con demo
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        {filtered.map((r, i) => {
          const p = {
            id: r.name,
            title: r.name,
            description: r.description ?? "Proyecto en GitHub",
            tags: [r.language ?? "GitHub"].filter(Boolean),
            repo: r.html_url,
            demo: r.homepage ?? undefined,
            images: [cover(username, r.name)],
          };
          return (
            <Reveal key={r.name} delay={i * 0.03}>
              <ProjectCard p={p as any} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
