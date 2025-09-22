import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      colors: {
        brand: {
          50:"#f0f7ff",100:"#e0effe",200:"#b9dbfd",300:"#84c1fb",400:"#4ca4f8",
          500:"#1f87f5",600:"#0f6ad1",700:"#0d56a8",800:"#0f4788",900:"#123c71"
        }
      }
    },
  },
  plugins: [],
} satisfies Config;