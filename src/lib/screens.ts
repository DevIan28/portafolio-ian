// Obtenemos directamente la URL final de cada imagen
const modules = import.meta.glob(
  "/src/assets/screens/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;
// ^^^^^ casteo explícito: evita los errores de tipo

// Armamos { [repo]: string[] } preservando orden por nombre de archivo
type Item = { orderKey: string; url: string };
const tmp: Record<string, Item[]> = {};

for (const path in modules) {
  // path: "/src/assets/screens/<repo>/<archivo>"
  const m = path.match(/\/assets\/screens\/([^/]+)\/(.+)$/);
  if (!m) continue;
  const repo = m[1];
  const file = m[2]; // "1.jpg", "2.png", etc.
  const url = modules[path];
  (tmp[repo] ||= []).push({ orderKey: file, url });
}

// Orden natural (1,2,10) y nos quedamos solo con las URLs
const screens: Record<string, string[]> = {};
for (const repo in tmp) {
  tmp[repo].sort((a, b) =>
    a.orderKey.localeCompare(b.orderKey, undefined, { numeric: true })
  );
  screens[repo] = tmp[repo].map((x) => x.url);
}

export default screens;
