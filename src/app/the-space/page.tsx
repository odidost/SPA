"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { useBooking } from "@/components/BookingContext";
import { spaData } from "@/data/spa";

export default function TheSpacePage() {
  const { openBooking } = useBooking();

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-16 sm:space-y-24">
      {/* 1. Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-brass"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brass">
              The Space
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest tracking-tight">
            Designed for privacy, stillness and restoration.
          </h1>
          <p className="font-sans text-base sm:text-lg text-forest/80 leading-relaxed">
            Step behind the stone walls of Nora Courtyard in Rayfield. Every room is finished in muted natural materials, soft acoustic baffling, and natural daylight.
          </p>
        </div>
      </section>

      {/* 2. The Couples Suite: Show how the two beds sit side by side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F3] border border-brass/35 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          <div className="relative h-[340px] sm:h-[480px] lg:h-[600px] w-full rounded-2xl overflow-hidden border border-brass/30 shadow-md">
            <Image
              src="/images/couples-suite.jpg"
              alt="Two paired massage beds placed side by side in the private couples suite at Nora Spa"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-ivory/95 backdrop-blur-xs p-3.5 rounded-xl border border-brass/25 text-xs text-forest max-w-md shadow-xs">
              <span className="font-serif italic font-semibold text-sm block mb-1">
                The Couples Suite · Side-by-Side Arrangement
              </span>
              Two full-sized heated beds, independent climate controls, and private ensuite changing.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-forest">
                Two beds, coordinated in quiet harmony.
              </h2>
              <p className="text-sm sm:text-base text-forest/85 leading-relaxed font-sans">
                Our suite is configured specifically so two guests never have to compromise. Rather than being separated into distant treatment cubicles, your beds sit side by side in a generously proportioned room with ample space for two therapists to work simultaneously.
              </p>
              <p className="text-sm text-forest/75 leading-relaxed font-sans">
                Crisp cotton sheets, warm eucalyptus compresses, and customized pressure ensure you and your companion unwind at your own pace while sharing the same serene atmosphere.
              </p>
            </div>

            <div className="lg:col-span-5 bg-ivory p-6 rounded-2xl border border-brass/25 space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono text-brass font-semibold">
                  Featured Experience
                </span>
                <h3 className="font-serif text-xl text-forest font-semibold">
                  Couples Suite Massage
                </h3>
                <p className="text-xs text-forest/70">
                  60 minutes · two guests · ₦60,000 total
                </p>
              </div>

              <div className="space-y-2 text-xs text-forest/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                  <span>Two dedicated therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brass flex-shrink-0" />
                  <span>Private tea service in the lounge included</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/treatments/couples-massage"
                  className="w-full bg-forest hover:bg-forest-light text-ivory text-xs font-semibold py-3 px-4 rounded-full text-center transition-colors shadow-xs"
                >
                  View Couples Massage details
                </Link>
                <button
                  onClick={() => openBooking("couples-massage")}
                  className="w-full bg-[#EFECE1] hover:bg-forest hover:text-ivory text-forest text-xs font-medium py-2.5 px-4 rounded-full text-center transition-colors border border-brass/20"
                >
                  Ask for a time
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Courtyard Lounge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-brass">
                Arrival & Departure
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest">
                The Courtyard Lounge.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-forest/85 leading-relaxed font-sans">
              There is no rushing at Nora. Before your treatment begins, you are welcomed with a chilled or warm botanical towel. After your therapy concludes, we invite you to sit undisturbed in the lounge with fresh organic herbal infusions.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-forest/80 font-sans">
              <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-brass/20">
                <strong className="text-forest block mb-0.5 font-serif text-base">
                  Unhurried Transitions
                </strong>
                We space bookings generously so you never encounter crowded waiting areas or hurried staff.
              </div>
              <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-brass/20">
                <strong className="text-forest block mb-0.5 font-serif text-base">
                  Botanical Tea Selection
                </strong>
                Fresh local lemongrass, hibiscus flower, and ginger brewed daily for our guests.
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-brass underline decoration-brass/40 underline-offset-4"
              >
                <span>Find our location in Rayfield, Jos</span>
                <ArrowRight className="w-4 h-4 text-brass" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-[340px] sm:h-[460px] rounded-2xl overflow-hidden border border-brass/35 shadow-md">
              <Image
                src="/images/lounge-for-two.jpg"
                alt="Guests enjoying tea in the calm lounge at Nora Spa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-3 right-4 bg-ivory px-3.5 py-1.5 rounded-lg border border-brass/25 text-xs text-forest font-serif italic shadow-xs">
              Courtyard lounge tea service
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
