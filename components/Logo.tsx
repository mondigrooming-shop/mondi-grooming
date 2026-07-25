"use client";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" role="img" aria-label="Mondi Grooming">
      <rect width="32" height="32" rx="6" fill="currentColor" />
      <path d="M8 23V11L16 19L24 11V23" stroke="hsl(38 50% 58%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="25.5" r="1.4" fill="hsl(38 50% 58%)" />
    </svg>
  );
}

export function Logo({ className = "", showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8 text-foreground" />
      {showWordmark && (
        <span className="font-serif text-lg tracking-tight leading-none">
          Mondi<span className="text-bronze-gradient"> Grooming</span>
        </span>
      )}
    </span>
  );
}
