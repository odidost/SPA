"use client";

import React from "react";

interface BrandWordmarkProps {
  className?: string;
  variant?: "dark" | "light";
}

export default function BrandWordmark({
  className = "",
  variant = "dark",
}: BrandWordmarkProps) {
  const isLight = variant === "light";

  return (
    <div className={`flex items-baseline gap-2 select-none ${className}`}>
      <span
        className={`font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-tight leading-none ${
          isLight ? "text-ivory" : "text-forest"
        }`}
      >
        Nora
      </span>
      <span
        className={`w-1 h-1 rounded-full ${
          isLight ? "bg-brass-light" : "bg-brass"
        }`}
        aria-hidden="true"
      />
      <span
        className={`font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase ${
          isLight ? "text-ivory/80" : "text-forest/85"
        }`}
      >
        Spa
      </span>
    </div>
  );
}
