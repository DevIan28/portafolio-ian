import Reveal from "@/components/Reveal";
import { ExternalLink, FileDown } from "lucide-react";
import certFiles from "@/lib/certificates";

export type Cert = {
  title: string;
  issuer: string;
  year?: string;
  badgeUrl?: string;
  verifyUrl?: string;
};

export default function Certifications({ items }: { items: Cert[] }) {
  const hasFiles = certFiles.length > 0;
  const hasLinks = items?.length > 0;

  if (!hasFiles && !hasLinks) return null;

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Certificaciones</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Verificables y vigentes</p>

      {/* PDFs locales descubiertos automáticamente */}
      {hasFiles && (
        <>
          <h4 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Certificados (PDF)
          </h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certFiles.map((c, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 hover:bg-white dark:hover:bg-neutral-900 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">{c.title}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">PDF · abrir / descargar</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <FileDown size={18} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </>
      )}

      {/* Certificaciones con enlace (las que ya tenías en data.ts) */}
      {hasLinks && (
        <>
          <h4 className="mt-8 mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Certificaciones (enlace)
          </h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((c, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
                  {c.badgeUrl && (
                    <img
                      src={c.badgeUrl}
                      alt={c.title}
                      className="h-14 w-auto mb-3 object-contain"
                      loading="lazy"
                    />
                  )}
                  <h4 className="font-medium text-neutral-900 dark:text-white">{c.title}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {c.issuer} {c.year ? `· ${c.year}` : ""}
                  </p>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
                    >
                      Ver credencial <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
