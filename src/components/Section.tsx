import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Section({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("container mx-auto max-w-6xl px-4 py-12 md:py-16", className)}
      {...props}
    />
  );
}
