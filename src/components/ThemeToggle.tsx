import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
const { theme, toggle } = useTheme();
return (
<button
onClick={toggle}
aria-label="Cambiar tema"
className="rounded-full border border-neutral-200 dark:border-neutral-800 p-2 hover:scale-105 transition"
>
{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
</button>
);
}