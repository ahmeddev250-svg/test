import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < Math.round(count) ? "fill-star text-star" : "fill-border text-border")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
