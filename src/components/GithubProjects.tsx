import { useEffect, useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import screens from "@/lib/screens";

type GHRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  pushed_at: string;
  has_pages: boolean; // 👈 usamos esto
};

function ogCover(username: string, repo: string) {
  return `https://opengraph.githubassets.com/1/${username}/${repo}`;
}

export default function GithubProjects({
  username = "DevIan28",
  limit,
  hideControls = false,
  gridClassName,
  cardVariant = "normal",
}: {
  username?: string;
  limit?: number;
  hideControls?: boolean;
  gridClassName?: string;
  cardVariant?: "normal" | "wide";
}) {
  const [data, setData] = useState<GHRepo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

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
      .filter((r) =>
        q.trim()
          ? (r.name + " " + (r.description ?? "") + " " + (r.language ?? ""))
              .toLowerCase()
              .includes(q.toLowerCase())
          : true
      )
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [data, q, limit]);

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

  const gridCls =
    gridClassName ??
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch";

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
        </div>
      )}

      <div className={gridCls}>
        {filtered.map((r, i) => {
          const repoName = r.name;

          // Portadas/carrusel: primero tus capturas locales, si no OG del repo
          const imgs =
            screens[repoName] && screens[repoName].length > 0
              ? screens[repoName]
              : [ogCover(username, repoName)];

          // Si el repo tiene Pages, forzamos esa URL como demo preferida
          const pagesUrl = r.has_pages
            ? `https://${username.toLowerCase()}.github.io/${repoName}/`
            : undefined;

          const demoUrl = pagesUrl ?? (r.homepage ? r.homepage : undefined);

          const p = {
            id: repoName,
            title: repoName,
            description: r.description ?? "Proyecto en GitHub",
            tags: [r.language ?? "GitHub"].filter(Boolean),
            repo: r.html_url,
            demo: demoUrl,            // 👈 DEMO preferirá GH Pages si existe
            images: imgs,
            pages: pagesUrl,          // 👈 Enviamos pages explícito para el botón
          };

          return (
            <Reveal key={repoName} delay={i * 0.03}>
              <ProjectCard p={p as any} variant={cardVariant} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
