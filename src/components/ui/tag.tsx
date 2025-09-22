import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs",
        "bg-white/70 border-neutral-200 text-neutral-700 backdrop-blur",
        "dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
}
