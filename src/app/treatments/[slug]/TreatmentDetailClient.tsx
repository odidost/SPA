"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Users,
  Check,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { Treatment, spaData } from "@/data/spa";
import { useBooking } from "@/components/BookingContext";

export default function TreatmentDetailClient({
  treatment,
}: {
  treatment: Treatment;
}) {
  const { openBooking } = useBooking();

  return (
    <div className="py-6 sm:py-10 lg:py-14 space-y-12 sm:space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-forest/70 font-medium">
          <Link href="/" className="hover:text-forest">
            Home
          </Link>
          <span>/</span>
          <Link href="/treatments" className="hover:text-forest">
            Treatments
          </Link>
          <span>/</span>
          <span className="text-forest font-semibold">{treatment.name}</span>
        </nav>

        {/* Main Grid: Relevant Photograph beside Booking Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Photograph Column (7 cols) with Gallery Matte Frame */}
          <div className="lg:col-span-7 space-y-3">
            <div className="p-2 sm:p-3 bg-ivory-light border border-brass/35 rounded-3xl shadow-md">
              <div className="relative h-[340px] sm:h-[480px] lg:h-[540px] w-full rounded-2xl overflow-hidden border border-brass/20">
                <Image
                  src={treatment.image}
                  alt={treatment.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-forest border border-brass/25 shadow-xs">
                  {treatment.guests} · {treatment.duration}
                </div>
              </div>
              <div className="mt-2.5 px-3 py-1 flex items-center justify-between text-xs text-forest/75 font-serif italic">
                <span>{treatment.plateCaption}</span>
                <span className="font-mono text-[10px] text-brass uppercase font-semibold">
                  Rayfield Sanctuary
                </span>
              </div>
            </div>
          </div>

          {/* Booking Summary Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F2] border-2 border-brass/35 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2 border-b border-brass/20 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-brass font-mono">
                  Booking Summary
                </span>
                <span className="text-[11px] bg-brass/15 text-brass-dark px-2 py-0.5 rounded font-mono font-medium">
                  Year-Round
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-forest font-normal">
                {treatment.name}
              </h1>
              <p className="font-serif italic text-sm sm:text-base text-forest/80">
                “{treatment.tagline}”
              </p>
            </div>

            {/* Treatment Specifications Grid */}
            <div className="bg-ivory rounded-2xl p-4 border border-brass/20 space-y-3 text-sm">
              <div className="flex items-center justify-between py-1 border-b border-forest/10">
                <span className="text-forest/70 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brass" /> Duration
                </span>
                <span className="font-semibold text-forest font-mono">
                  {treatment.duration}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-forest/10">
                <span className="text-forest/70 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brass" /> Guest Count
                </span>
                <span className="font-semibold text-forest">
                  {treatment.guests}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-forest/10">
                <span className="text-forest/70">Total Price</span>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-forest">
                    {treatment.price}
                  </span>
                  {treatment.guestCount === 2 && (
                    <span className="block text-[11px] text-brass font-medium">
                      Total covers both guests
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between py-1 text-xs text-forest/70">
                <span>Location</span>
                <span className="font-medium text-forest">6 Nora Courtyard, Rayfield</span>
              </div>
            </div>

            {/* Primary Action Button: "Ask for a time" preserving this treatment */}
            <div className="space-y-3 pt-1">
              <button
                onClick={() => openBooking(treatment.slug)}
                className="w-full bg-forest hover:bg-forest-light text-ivory text-sm sm:text-base font-semibold py-3.5 px-6 rounded-full transition-all duration-200 border border-forest shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <span>Ask for a time</span>
                <span className="text-brass">· {treatment.price}</span>
              </button>

              <p className="text-center text-xs text-forest/65">
                Pre-fills a sample WhatsApp enquiry with our Rayfield reception team.
              </p>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-brass/20 space-y-2 text-xs text-forest/75">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brass flex-shrink-0" />
                <span>Zero pre-payment required to inquire</span>
              </div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brass flex-shrink-0" />
                <span>Custom pressure and botanical oils agreed in private</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Explanation: What is included in plain English */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6 sm:pt-10 border-t border-brass/25">
          {/* Who this treatment suits */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-brass">
                Suitability
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-forest">
                Who this treatment is designed for.
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-forest/85 leading-relaxed">
              {treatment.whoItsFor}
            </p>

            <div className="p-4 bg-[#EFECE1] rounded-2xl border border-brass/20 text-xs text-forest/80 space-y-2">
              <p className="font-semibold text-forest">Sensory Customization:</p>
              <p className="leading-relaxed">
                Before your session, you select your pressure preference (gentle, balanced, or firm tension release) and your preferred local botanical infusion.
              </p>
            </div>

            <div className="p-4 bg-ivory rounded-2xl border border-brass/25 text-xs text-forest/80 space-y-1">
              <p className="font-semibold text-forest">Campaign availability:</p>
              <p>This treatment is part of Nora’s year-round resident menu in Jos.</p>
            </div>
          </div>

          {/* What is included in plain English */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-brass">
                Treatment Protocol
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-forest">
                What is included in plain English.
              </h2>
            </div>

            <p className="text-sm text-forest/80 leading-relaxed font-sans">
              We believe in complete transparency. Every step is tailored to ensure you leave feeling fully renewed:
            </p>

            <div className="space-y-3 pt-2">
              {treatment.whatIsIncluded.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-[#FAF8F3] rounded-xl border border-brass/20 hover:border-brass/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-forest text-ivory text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-forest/90 leading-relaxed font-sans">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => openBooking(treatment.slug)}
                className="bg-forest hover:bg-forest-light text-ivory text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-xs"
              >
                Ask for an available time slot
              </button>
            </div>
          </div>
        </div>

        {/* Explore Other Treatments Bar */}
        <div className="pt-10 border-t border-brass/25">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="font-serif text-xl text-forest">
              Explore our other therapies
            </h3>
            <div className="flex flex-wrap gap-2">
              {spaData.treatments
                .filter((t) => t.slug !== treatment.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/treatments/${other.slug}`}
                    className="text-xs font-medium bg-[#EFECE1] hover:bg-forest hover:text-ivory text-forest px-4 py-2 rounded-full border border-brass/20 transition-all"
                  >
                    {other.name} ({other.price})
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
