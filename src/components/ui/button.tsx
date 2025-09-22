import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  className,
  variant = "primary",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60";
  const variants = {
    primary:
      "bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 disabled:pointer-events-none shadow-sm",
    secondary:
      "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
  } as const;

  return <button className={cn(base, variants[variant], className)} {...props} />;
}
