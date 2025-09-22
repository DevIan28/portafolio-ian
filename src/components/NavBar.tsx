import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const linkBase =
  "px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const linkInactive =
  "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800";
const linkActive =
  "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900";

export default function NavBar() {
  const Item = ({ to, label }: { to: string; label: string }) => (
    <NavLink to={to} className={({isActive}) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
      {label}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-950/70 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">Portafolio</Link>

        {/* Mantiene tu barra; en móvil hace scroll horizontal en vez de romper */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <Item to="/" label="Inicio" />
          <Item to="/projects" label="Proyectos" />
          <Item to="/experience" label="Experiencia" />
          <Item to="/contact" label="Contacto" />
          <div className="pl-1"><ThemeToggle /></div>
        </div>
      </nav>
    </header>
  );
}
