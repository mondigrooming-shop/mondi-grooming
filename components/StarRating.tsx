"use client";

import { Star } from "lucide-react";

export function StarRating({ rating, size = 16, count }: { rating: number; size?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
