import Reveal from "@/components/Reveal";

export type Cert = {
  title: string;
  issuer: string;
  year?: string;
  badgeUrl?: string;
  verifyUrl?: string;
};

export default function Certifications({ items }: { items: Cert[] }) {
  if (!items?.length) return null;

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Certificaciones</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Verificables y vigentes</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c, i) => (
          <Reveal key={i} delay={i * 0.05}>
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
                  className="mt-3 inline-flex text-sm text-brand-700 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  Ver credencial →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
