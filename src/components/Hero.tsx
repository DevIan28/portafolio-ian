import Section from "@/components/Section";
import Button from "@/components/ui/button";
import { profile } from "@/lib/data";

import avatar from "@/assets/avatar.jpg";

export default function Hero() {
  return (
    <Section className="pt-10 md:pt-16">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Texto */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {profile.name}
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            {profile.headline}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <a href="#projects">
              <Button>Ver proyectos</Button>
            </a>
            <a href="#contact">
              <Button variant="ghost">Contacto</Button>
            </a>
          </div>
        </div>

        {/* Foto */}
        <div className="shrink-0">
          <div className="relative">
            <img
              src={avatar}
              alt={profile.name}
              loading="eager"
              className="h-36 w-36 md:h-44 md:w-44 rounded-2xl object-cover
                         ring-2 ring-white/60 dark:ring-neutral-800 shadow-lg"
              onError={(e) => {
                // Fallback por si el archivo no existe
                (e.currentTarget as HTMLImageElement).src =
                  "https://i.pravatar.cc/300?img=12";
              }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/5" />
          </div>
        </div>
      </div>
    </Section>
  );
}
