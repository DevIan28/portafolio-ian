import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { profile } from "@/lib/data";
import InteractiveFX from "@/components/InteractiveFX";

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.img
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        src="public/src/assets/avatar.jpg"
        alt={profile.name}
        className="w-40 h-40 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800"
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {profile.name}
        </h1>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          {profile.headline}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={profile.socials.github} target="_blank" rel="noreferrer">
            <Button>GitHub</Button>
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <Button variant="secondary">Descargar CV</Button>
          </a>
          {/* Botón con efecto interactivo */}
          <InteractiveFX />
        </div>
      </motion.div>
    </div>
  );
}
