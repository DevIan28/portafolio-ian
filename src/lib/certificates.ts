// Detecta PDFs en src/assets/certificates/** y arma una lista { title, url }
const modules = import.meta.glob(
  "/src/assets/certificates/**/*.pdf",
  { eager: true, import: "default" }
) as Record<string, string>;

export type CertFile = { title: string; url: string };

function humanize(filename: string) {
  // "tecnico-sena-2022.pdf" -> "Tecnico Sena 2022"
  const base = filename.replace(/\.pdf$/i, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const files: CertFile[] = Object.entries(modules).map(([path, url]) => {
  const raw = path.split("/").pop() || "certificado.pdf";
  return { title: humanize(raw), url };
});

// Orden alfabético/natural
files.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));

export default files;
