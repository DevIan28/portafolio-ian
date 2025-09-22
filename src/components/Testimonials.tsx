import Reveal from "@/components/Reveal";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items?.length) return null;

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 md:p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Testimonios</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Lo que dicen de mi trabajo</p>

      <div className="mt-6 columns-1 md:columns-2 xl:columns-3 gap-4 space-y-4">
        {items.map((t, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <figure className="break-inside-avoid rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar ?? `https://i.pravatar.cc/100?u=${encodeURIComponent(t.name)}`}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
                />
                <div>
                  <figcaption className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {t.name}
                  </figcaption>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.role}</p>
                </div>
              </div>
              <blockquote className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                “{t.quote}”
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
