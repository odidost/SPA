"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users, Sparkles, Check } from "lucide-react";
import { useBooking } from "@/components/BookingContext";
import { spaData } from "@/data/spa";

export default function TreatmentsPage() {
  const { openBooking } = useBooking();

  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-brass"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brass">
              The Treatment Menu
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest tracking-tight">
            Restorative therapies for body and face.
          </h1>
          <p className="font-sans text-base sm:text-lg text-forest/80 leading-relaxed">
            All appointments are conducted with unhurried care in private rooms in Rayfield, Jos. Prices are fully inclusive of organic botanical extracts, linen, and tea service in the lounge.
          </p>
        </div>

        {/* Treatments List */}
        <div className="space-y-12 lg:space-y-16">
          {spaData.treatments.map((treatment, idx) => (
            <div
              key={treatment.slug}
              className="border border-brass/35 bg-[#FAF8F3] rounded-3xl overflow-hidden shadow-xs hover:border-brass transition-all duration-300"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Photo Column */}
                <div className={`lg:col-span-6 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full ${idx % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                  <Image
                    src={treatment.image}
                    alt={treatment.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-forest border border-brass/25">
                    {treatment.guests} · {treatment.duration}
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${idx % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-mono text-brass font-semibold">
                        Service 0{idx + 1}
                      </span>
                      <span className="text-xs text-forest/60">
                        Rayfield, Jos
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl text-forest font-normal">
                      {treatment.name}
                    </h2>

                    <p className="font-serif italic text-base sm:text-lg text-brass-dark">
                      “{treatment.tagline}”
                    </p>

                    <p className="text-sm text-forest/85 leading-relaxed font-sans">
                      {treatment.expectation}
                    </p>

                    {/* Features checklist preview */}
                    <ul className="space-y-2 pt-2 text-xs sm:text-sm text-forest/75 font-sans">
                      {treatment.whatIsIncluded.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-6 border-t border-brass/20 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs text-forest/60 block">Price</span>
                        <span className="font-serif text-2xl sm:text-3xl font-semibold text-forest">
                          {treatment.price}
                        </span>
                      </div>
                      <span className="text-xs text-forest/70 font-medium">
                        {treatment.duration} · {treatment.guests}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        onClick={() => openBooking(treatment.slug)}
                        className="bg-forest hover:bg-forest-light text-ivory text-xs sm:text-sm font-semibold px-6 py-3 rounded-full text-center transition-colors shadow-xs"
                      >
                        Ask for a time
                      </button>

                      <Link
                        href={`/treatments/${treatment.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium text-forest hover:text-brass py-2 text-center underline decoration-brass/40 underline-offset-4"
                      >
                        <span>View complete details & ingredients</span>
                        <ArrowRight className="w-3.5 h-3.5 text-brass" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Appointments */}
        <div className="bg-[#EFECE1] border border-brass/25 rounded-2xl p-6 sm:p-8 text-center max-w-2xl mx-auto space-y-2">
          <h3 className="font-serif text-xl text-forest">Need assistance deciding?</h3>
          <p className="text-xs sm:text-sm text-forest/80 leading-relaxed">
            Our reception team in Rayfield can advise on therapist availability, custom pressure preferences, or booking two single treatments consecutively.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openBooking()}
              className="text-xs font-semibold text-brass hover:text-brass-dark underline underline-offset-4"
            >
              Ask reception a question via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
