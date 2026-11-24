"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Calendar,
} from "lucide-react";
import { useBooking } from "@/components/BookingContext";
import { spaData } from "@/data/spa";

const heroSlides = [
  {
    id: 1,
    src: "/images/lounge-for-two.jpg",
    alt: "The lounge at Nera",
    caption: "The lounge at Nera",
  },
  {
    id: 2,
    src: "/images/couples-suite.jpg",
    alt: "The paired suite at Nera",
    caption: "The paired suite at Nera",
  },
  {
    id: 3,
    src: "/images/signature-massage.jpg",
    alt: "Restorative botanical therapies",
    caption: "Restorative botanical therapies",
  },
];

export default function HomePage() {
  const { openBooking } = useBooking();
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const heroTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (prefersReducedMotion || isHeroPaused) {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
      return;
    }

    heroTimerRef.current = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    };
  }, [isHeroPaused]);

  const activeSlide = heroSlides[currentHeroSlide];

  return (
    <div className="w-full">
      {/* ===================================================================
          1. SPLIT HERO (Chapter I)
          Left: Offer copy aligned with container + feature pills
          Right: Lounge photograph with smooth 3-image crossfade
          =================================================================== */}
      <section className="hero-container" aria-label="Hero">
        {/* Left copy column */}
        <div className="hero-copy">
          <div className="hero-copy-inner">
            {/* Eyebrow with hairline */}
            <div className="hero-eyebrow">
              <span>A DAY SPA IN RAYFIELD, JOS</span>
              <span className="hero-eyebrow-line" aria-hidden="true" />
            </div>

            {/* H1 Headline */}
            <h1 className="hero-heading">
              Room for{" "}
              <span className="hero-desktop-break">
                <br />
              </span>
              <span className="hero-heading-italic">two.</span>
            </h1>

            {/* Intro paragraph */}
            <p className="hero-intro">
              An hour side by side. Two therapists, two beds and a quiet room of
              your own.
            </p>

            {/* Offer row */}
            <div className="hero-offer">
              <span className="hero-offer-price">₦60,000 total for two</span>
              <span className="hero-offer-line" aria-hidden="true" />
              <span className="hero-offer-duration">60 minutes</span>
            </div>

            {/* CTA row */}
            <div className="hero-cta">
              <button
                type="button"
                onClick={() => openBooking("couples-massage")}
                className="hero-btn-primary"
              >
                Ask for a time
              </button>
              <Link href="/treatments" className="hero-secondary-link">
                Explore treatments
              </Link>
            </div>

            {/* Quiet feature pills */}
            <div className="pt-4 mt-6 border-t border-[#D5D6C8] grid grid-cols-2 gap-3 text-xs text-[#526458] font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A6735] flex-shrink-0" />
                <span>Side-by-side private suite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A6735] flex-shrink-0" />
                <span>Two licensed therapists</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right photograph column with smooth 3-image crossfade */}
        <div
          className="hero-image-wrap group/hero"
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
        >
          {heroSlides.map((slide, idx) => {
            const isActive = idx === currentHeroSlide;
            return (
              <img
                key={slide.id}
                src={slide.src}
                alt={slide.alt}
                className={`hero-image absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              />
            );
          })}
          <div className="hero-image-gradient z-20" aria-hidden="true" />
          <div className="hero-image-caption z-30">
            <span>{activeSlide.caption}</span>
            <span className="hero-image-rule" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. CHAPTER II: THE GUEST SEQUENCE (The 4-Stage Arrival Ritual)
          4 luxury glowing boxes with image preview, numeral, detail & animation
          =================================================================== */}
      <section
        className="guest-sequence-section"
        aria-label="The Guest Sequence"
      >
        <div className="shared-container">
          <div className="guest-sequence-container">
            {/* Header */}
            <div className="guest-sequence-header">
              <div className="hero-eyebrow mb-2">
                <span>CHAPTER II · THE GUEST SEQUENCE</span>
                <span className="hero-eyebrow-line" aria-hidden="true" />
              </div>
              <h2 className="section-h2 !mt-1">
                The Four-Stage Arrival Ritual.
              </h2>
              <p className="hero-intro !max-w-xl mt-3">
                We structure every visit so you never feel hurried. From the
                moment you step into our courtyard to your final cup of tea,
                time slows to a quiet, restorative cadence.
              </p>
            </div>

            {/* 4 Ritual Stage Boxes */}
            <div className="guest-sequence-grid">
              {spaData.arrivalRitual.map((stage) => (
                <div key={stage.step} className="guest-sequence-card">
                  {/* Image header with badge */}
                  <div className="guest-sequence-image-wrap">
                    <img
                      src={stage.image}
                      alt={stage.imageAlt}
                      className="guest-sequence-image"
                    />
                    <div className="guest-sequence-image-overlay" />
                    <span className="guest-sequence-badge">{stage.badge}</span>
                  </div>

                  {/* Content */}
                  <div className="guest-sequence-content">
                    <div className="guest-sequence-top">
                      <span className="guest-sequence-numeral">
                        {stage.numeral}.
                      </span>
                      <span className="guest-sequence-step">
                        Stage {stage.step}
                      </span>
                    </div>

                    <h3 className="guest-sequence-title">{stage.title}</h3>

                    <p className="guest-sequence-desc">{stage.description}</p>
                  </div>

                  {/* Detail footer */}
                  <div className="guest-sequence-detail">{stage.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. CHAPTER III: TREATMENTS
          Intro with H2 left, copy right bottom-aligned
          Three equal-width treatment cards
          =================================================================== */}
      <section className="treatments-section" aria-label="Treatments">
        <div className="shared-container">
          {/* Treatment introduction row */}
          <div className="treatments-intro">
            <div>
              <div className="hero-eyebrow mb-1">
                <span>CHAPTER III · TREATMENTS</span>
                <span className="hero-eyebrow-line" aria-hidden="true" />
              </div>
              <h2 className="section-h2 !mt-1">Three quiet rituals.</h2>
            </div>
            <p className="treatments-intro-copy">
              Each appointment includes private time in the lounge before and
              after your session. We reserve two hours between treatments.
            </p>
          </div>

          {/* Three equal columns */}
          <div className="treatments-grid">
            {/* Card 1: Couples Suite Massage */}
            <article className="treatment-card">
              <Link
                href="/treatments/couples-massage"
                className="block overflow-hidden"
              >
                <img
                  src="/images/couples-suite.jpg"
                  alt="Couples Suite Massage"
                  className="treatment-card-photo"
                />
              </Link>
              <div className="treatment-card-header">
                <h3 className="treatment-card-title">
                  <Link href="/treatments/couples-massage">
                    Couples Suite Massage
                  </Link>
                </h3>
                <span className="treatment-card-price">₦60,000</span>
              </div>
              <p className="treatment-card-meta">60 minutes · Side by side</p>
              <p className="treatment-card-desc">
                Two therapists, two tables and a quiet room of your own.
                Unhurried tea service in the courtyard lounge afterwards.
              </p>
              <button
                type="button"
                onClick={() => openBooking("couples-massage")}
                className="treatment-card-btn"
              >
                Ask for a time
              </button>
            </article>

            {/* Card 2: Signature Body Massage */}
            <article className="treatment-card">
              <Link
                href="/treatments/signature-massage"
                className="block overflow-hidden"
              >
                <img
                  src="/images/signature-massage.jpg"
                  alt="Signature Body Massage"
                  className="treatment-card-photo"
                />
              </Link>
              <div className="treatment-card-header">
                <h3 className="treatment-card-title">
                  <Link href="/treatments/signature-massage">
                    Signature Body Massage
                  </Link>
                </h3>
                <span className="treatment-card-price">₦35,000</span>
              </div>
              <p className="treatment-card-meta">60 minutes · Solo suite</p>
              <p className="treatment-card-desc">
                Long, restorative strokes with warm botanical oils. Focuses on
                releasing deep tension in the neck, shoulders and lower back.
              </p>
              <button
                type="button"
                onClick={() => openBooking("signature-massage")}
                className="treatment-card-btn"
              >
                Ask for a time
              </button>
            </article>

            {/* Card 3: Botanical Facial */}
            <article className="treatment-card">
              <Link
                href="/treatments/botanical-facial"
                className="block overflow-hidden"
              >
                <img
                  src="/images/botanical-facial.jpg"
                  alt="Botanical Facial"
                  className="treatment-card-photo"
                />
              </Link>
              <div className="treatment-card-header">
                <h3 className="treatment-card-title">
                  <Link href="/treatments/botanical-facial">Botanical Facial</Link>
                </h3>
                <span className="treatment-card-price">₦30,000</span>
              </div>
              <p className="treatment-card-meta">60 minutes · Solo suite</p>
              <p className="treatment-card-desc">
                Gentle botanical cleansing, warm herbal steam, facial massage and
                local cold-pressed oils chosen for your skin.
              </p>
              <button
                type="button"
                onClick={() => openBooking("botanical-facial")}
                className="treatment-card-btn"
              >
                Ask for a time
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* ===================================================================
          4. CHAPTER IV: THE SPACE SECTION ("Two beds, side by side.")
          Architectural plate, couples suite framing, and narrative
          =================================================================== */}
      <section className="the-space-section" aria-label="The Space">
        <div className="shared-container">
          <div className="the-space-grid">
            {/* Left: Framed plate photo */}
            <div className="the-space-frame">
              <div className="the-space-photo-wrap">
                <img
                  src="/images/couples-suite.jpg"
                  alt="Two paired massage beds placed side by side in the private couples suite"
                  className="the-space-photo"
                />
              </div>
              <div className="the-space-caption">
                <span>Plate 02 · Paired treatment beds in the private suite</span>
                <span className="font-mono text-[11px] text-[#8A6735] uppercase font-semibold">
                  Rayfield, Jos
                </span>
              </div>
            </div>

            {/* Right: Narrative & Links */}
            <div className="the-space-copy">
              <div className="hero-eyebrow">
                <span>CHAPTER IV · THE SPACE</span>
                <span className="hero-eyebrow-line" aria-hidden="true" />
              </div>
              <h2 className="section-h2 !mt-1">
                Two beds, side by side.
              </h2>
              <p className="hero-intro !max-w-xl text-[#203F35]/85">
                When you arrive at 6 Nora Courtyard, the pace slows immediately.
                You step past our quiet garden courtyard into a secluded suite
                where two massage beds sit prepared alongside each other.
              </p>
              <p className="font-sans text-sm text-[#526458] leading-relaxed">
                Both therapists greet you together, confirm your individual
                pressure preferences, and provide warm organic cotton towels
                before you settle in for your quiet hour side by side.
              </p>
              <div className="the-space-actions">
                <Link
                  href="/treatments/couples-massage"
                  className="hero-btn-primary gap-2"
                >
                  <span>Read Couples Suite details</span>
                  <ArrowRight className="w-4 h-4 text-[#8A6735]" />
                </Link>
                <Link href="/the-space" className="hero-secondary-link">
                  Explore all rooms & lounge
                </Link>
              </div>
            </div>
          </div>

          {/* Sanctuary Standards Promise (3 Pillars) */}
          <div className="sanctuary-promise-wrap">
            <div className="sanctuary-promise-header">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8A6735]">
                The Sanctuary Standards
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F7F5EC] mt-2 font-normal">
                The Quiet Sanctuary Promise.
              </h3>
              <p className="text-sm sm:text-base text-[#F7F5EC]/80 font-sans leading-relaxed mt-2">
                We limit appointments strictly so that every guest experiences
                true tranquility without crowds, noise, or compromise.
              </p>
            </div>

            <div className="sanctuary-promise-grid">
              {spaData.sanctuaryPromise.map((item, idx) => (
                <div key={idx} className="sanctuary-promise-card">
                  <div className="sanctuary-promise-icon">
                    {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 1 && <Sparkles className="w-5 h-5" />}
                    {idx === 2 && <HeartHandshake className="w-5 h-5" />}
                  </div>
                  <h4 className="sanctuary-promise-title">{item.title}</h4>
                  <p className="sanctuary-promise-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. VISIT (Chapter V)
          Full-width forest green with ivory type
          Left: Address, hours & courtyard parking
          Right: Reception Desk card with pricing table & arrival link
          =================================================================== */}
      <section className="visit-section" aria-label="Visit us">
        <div className="shared-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left column: Address & Hours */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="visit-eyebrow">SANCTUARY IN RAYFIELD, JOS</span>
                <h2 className="visit-h2">A quiet house in Rayfield.</h2>
                <p className="visit-note">
                  Designed for unhurried arrivals. Free private parking in the
                  courtyard with reception on the ground floor.
                </p>
              </div>

              {/* Address card */}
              <div className="bg-[#203F35]/70 rounded-2xl p-6 border border-[#8A6735]/30 space-y-4 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8A6735] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-lg text-[#F7F5EC] font-normal">
                      Address
                    </h3>
                    <p className="text-sm text-[#F7F5EC]/85">{spaData.fullAddress}</p>
                    <p className="text-xs text-[#F7F5EC]/60 mt-0.5">
                      Discreet parking inside the private courtyard.
                    </p>
                  </div>
                </div>

                <div className="h-px bg-[#8A6735]/25" />

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#8A6735] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm text-[#F7F5EC]/85 w-full">
                    <h3 className="font-serif text-lg text-[#F7F5EC] font-normal">
                      Opening Hours in Jos
                    </h3>
                    <div className="flex justify-between text-xs sm:text-sm py-1 border-b border-[#F7F5EC]/10">
                      <span>Tuesday – Saturday</span>
                      <span className="font-medium text-[#F7F5EC]">10:00 am – 7:00 pm</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm py-1 border-b border-[#F7F5EC]/10">
                      <span>Sunday</span>
                      <span className="font-medium text-[#F7F5EC]">12:00 pm – 5:00 pm</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm py-1">
                      <span className="text-[#F7F5EC]/60">Monday</span>
                      <span className="text-[#F7F5EC]/60 italic">Closed for restoration</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign note */}
              <div className="text-xs text-[#F7F5EC]/70 flex items-center gap-2 font-sans">
                <Sparkles className="w-4 h-4 text-[#8A6735]" />
                <span>The campaign offer is available year-round.</span>
              </div>
            </div>

            {/* Right column: Reception Desk card with pricing overview */}
            <div className="lg:col-span-6 bg-[#F7F5EC] text-[#203F35] rounded-3xl p-8 sm:p-10 border border-[#8A6735]/40 shadow-xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8A6735] font-semibold">
                  Reception Desk
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#203F35] font-normal">
                  Reserve your quiet hour.
                </h3>
                <p className="text-sm text-[#526458] leading-relaxed font-sans">
                  Appointments are reserved in advance so therapists can properly
                  prepare the treatment room and linen for your arrival.
                </p>
              </div>

              {/* Pricing overview box */}
              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#8A6735]/25 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-[#203F35] font-medium">
                  <span>Couples Massage for two</span>
                  <span className="text-[#8A6735] font-bold">₦60,000 total</span>
                </div>
                <div className="flex justify-between text-[#203F35] font-medium">
                  <span>Signature Massage (solo)</span>
                  <span className="text-[#8A6735] font-bold">₦35,000</span>
                </div>
                <div className="flex justify-between text-[#203F35] font-medium">
                  <span>Botanical Facial (solo)</span>
                  <span className="text-[#8A6735] font-bold">₦30,000</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => openBooking("couples-massage")}
                  className="w-full bg-[#203F35] hover:bg-[#203F35]/90 text-[#F7F5EC] font-semibold text-sm py-3.5 px-6 rounded-[3px] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Ask for a time</span>
                  <ArrowRight className="w-4 h-4 text-[#8A6735]" />
                </button>
                <Link
                  href="/visit"
                  className="block text-center text-xs text-[#526458] hover:text-[#203F35] underline decoration-[#8A6735]/50 underline-offset-4 font-sans"
                >
                  View full directions and Jos arrival guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          6. BOOKING STRIP
          Ivory background, left text block max 39rem, right button
          =================================================================== */}
      <section className="booking-strip-section" aria-label="Booking enquiry">
        <div className="shared-container">
          <div className="booking-strip-inner">
            <div className="booking-strip-copy">
              <h2 className="booking-strip-h2">Reserve your afternoon.</h2>
              <p className="booking-strip-desc">
                We hold only three appointments each afternoon to preserve the
                quiet of the lounge. Request a time on WhatsApp and reception
                will confirm your slot within the hour.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openBooking("couples-massage")}
              className="booking-strip-btn"
            >
              Ask for a time
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
