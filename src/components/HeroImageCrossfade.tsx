"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeroSlide {
  id: number;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  objectPos: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    src: "/images/lounge-for-two.jpg",
    alt: "Two guests sharing tea in the peaceful lounge at Nora Spa in Rayfield, Jos",
    caption: "Plate 01 · Courtyard Lounge, post-treatment tea service",
    tag: "Sanctuary Lounge",
    objectPos: "object-[center_20%]",
  },
  {
    id: 2,
    src: "/images/couples-suite.jpg",
    alt: "Two paired massage beds placed side by side in the private couples suite at Nora Spa",
    caption: "Plate 02 · The Paired Suite, side-by-side heated beds for two",
    tag: "Private Suite",
    objectPos: "object-center",
  },
  {
    id: 3,
    src: "/images/signature-massage.jpg",
    alt: "Therapist performing a restorative full body massage with warmed botanical oils",
    caption: "Plate 03 · Hand-crafted bodywork with warm botanical oils",
    tag: "Botanical Therapy",
    objectPos: "object-center",
  },
];

export default function HeroImageCrossfade() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check reduced motion safely
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const activeSlide = slides[currentIdx];

  return (
    <div
      className="p-2 sm:p-3 bg-ivory-light border border-brass/35 rounded-3xl shadow-md select-none group/hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Nora Spa room preview slideshow"
    >
      {/* Framed Image Canvas */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-brass/20 bg-[#EFECE1]">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
                className={`object-cover ${slide.objectPos} transition-transform duration-1000 ease-out`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent md:hidden" />
            </div>
          );
        })}

        {/* Minimalist Floating Counter & Active Tag (Top Right) */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
          <span className="bg-ivory/90 backdrop-blur-md text-forest text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border border-brass/25 shadow-xs">
            0{currentIdx + 1} / 0{slides.length}
          </span>
          <span className="hidden sm:inline-block bg-forest/85 backdrop-blur-md text-ivory text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-brass/30 shadow-xs">
            {activeSlide.tag}
          </span>
        </div>

        {/* Minimalist Interactive Progress Bars (Bottom Center of Image) */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-forest/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-brass/30">
            {slides.map((_, i) => {
              const isSelected = i === currentIdx;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isSelected
                      ? "w-7 bg-brass-light"
                      : "w-2.5 bg-ivory/40 hover:bg-ivory/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              );
            })}
          </div>

          <span className="text-[10px] text-ivory/80 font-mono hidden sm:inline-block bg-forest/70 backdrop-blur-xs px-2 py-0.5 rounded">
            {isPaused ? "Paused" : "Auto-playing"}
          </span>
        </div>
      </div>

      {/* Synchronized Fine Brass Caption Plate (Below Image) */}
      <div className="mt-2.5 px-3 py-1 flex items-center justify-between text-xs text-forest/75">
        <span className="font-serif italic transition-opacity duration-300">
          {activeSlide.caption}
        </span>
        <span className="font-mono text-[10px] text-brass uppercase font-semibold">
          Rayfield Enclave
        </span>
      </div>
    </div>
  );
}
