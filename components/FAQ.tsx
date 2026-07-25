"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border/60">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-serif text-base sm:text-lg">{item.q}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
