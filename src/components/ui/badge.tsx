import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs",
        "bg-neutral-50 border-neutral-200 text-neutral-700",
        "dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
}
