import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextValue {
theme: "light" | "dark";
toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
const [theme, setTheme] = useState<"light" | "dark">(() => {
if (typeof window === "undefined") return "light";
return (localStorage.getItem("theme") as "light" | "dark") ||
(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
});

useEffect(() => {
const root = document.documentElement;
if (theme === "dark") root.classList.add("dark");
else root.classList.remove("dark");
localStorage.setItem("theme", theme);
}, [theme]);

return (
<ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") }}>
{children}
</ThemeContext.Provider>
);
}

export function useTheme() {
const ctx = useContext(ThemeContext);
if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
return ctx;
}