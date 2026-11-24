"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, Calendar, ArrowRight, ShieldAlert, Sparkles, Navigation } from "lucide-react";
import { useBooking } from "@/components/BookingContext";
import { spaData } from "@/data/spa";

export default function VisitPage() {
  const { openBooking } = useBooking();

  return (
    <div className="py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-brass"></span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brass">
              Location & Hours
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest tracking-tight">
            Visiting Nora Courtyard in Rayfield.
          </h1>
          <p className="font-sans text-base sm:text-lg text-forest/80 leading-relaxed">
            Nora is situated in a quiet residential enclave of Rayfield, Jos. We welcome guests by advance reservation to ensure absolute privacy and stillness.
          </p>
        </div>
      </section>

      {/* Main Grid: Details Card & Illustrative Sanctuary Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Opening Hours & Visiting Guidelines */}
          <div className="lg:col-span-6 space-y-8">
            {/* Opening Hours Box */}
            <div className="bg-[#FAF8F3] border border-brass/35 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-brass/20 pb-4">
                <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center">
                  <Clock className="w-5 h-5 text-brass" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-forest">Opening Hours</h2>
                  <p className="text-xs text-forest/70">Local time in Jos, Plateau State (GMT+1)</p>
                </div>
              </div>

              <div className="space-y-3 font-sans text-sm">
                <div className="flex justify-between items-center py-2 border-b border-brass/15">
                  <span className="font-medium text-forest">Tuesday – Saturday</span>
                  <span className="font-semibold text-forest">10:00 am – 7:00 pm</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brass/15">
                  <span className="font-medium text-forest">Sunday</span>
                  <span className="font-semibold text-forest">12:00 pm – 5:00 pm</span>
                </div>
                <div className="flex justify-between items-center py-2 text-forest/60">
                  <span>Monday</span>
                  <span className="italic font-medium">Closed for rest & maintenance</span>
                </div>
              </div>

              <div className="bg-ivory p-4 rounded-xl border border-brass/25 text-xs text-forest/80 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-forest">
                  <Sparkles className="w-3.5 h-3.5 text-brass" />
                  <span>Year-Round Campaign Availability</span>
                </div>
                <p>
                  The treatment menu and couples pricing are offered year-round. Weekend slots are typically reserved 2–3 days in advance.
                </p>
              </div>
            </div>

            {/* Address & Reception Box */}
            <div className="bg-[#FAF8F3] border border-brass/35 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-brass/20 pb-4">
                <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brass" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-forest">Sanctuary Address</h2>
                  <p className="text-xs text-forest/70">Rayfield, Jos, Plateau State, Nigeria</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-forest/85">
                <p className="font-serif text-xl font-medium text-forest">
                  {spaData.fullAddress}
                </p>
                <p className="text-xs text-forest/70 leading-relaxed font-sans">
                  Located along a tranquil tree-lined street in Rayfield. Private vehicle parking is available inside our gated courtyard for all scheduled guests.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openBooking("couples-massage")}
                  className="w-full bg-forest hover:bg-forest-light text-ivory text-sm font-semibold py-3.5 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Ask for a time · WhatsApp Preview</span>
                  <ArrowRight className="w-4 h-4 text-brass" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Illustrative Sanctuary Location & Guest Arrival Etiquette */}
          <div className="lg:col-span-6 space-y-8">
            {/* Illustrative Location Card */}
            <div className="bg-forest text-ivory rounded-3xl p-6 sm:p-8 border border-brass/30 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-brass/25 pb-4">
                <span className="text-xs uppercase tracking-wider font-mono text-brass font-semibold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-brass" />
                  Rayfield Enclave · Illustrative Map
                </span>
                <span className="text-[11px] bg-forest-light px-2 py-0.5 rounded text-ivory/80 font-mono">
                  Jos, Nigeria
                </span>
              </div>

              {/* Styled Illustrative Map Canvas */}
              <div className="bg-[#1B352C] rounded-2xl p-6 sm:p-8 border border-brass/20 relative overflow-hidden text-center space-y-6">
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-ivory text-forest mx-auto flex items-center justify-center shadow-lg border-2 border-brass">
                    <MapPin className="w-6 h-6 text-brass" />
                  </div>
                  <h3 className="font-serif text-2xl text-ivory font-normal">
                    Nora Courtyard
                  </h3>
                  <p className="text-xs text-ivory/80 max-w-xs mx-auto">
                    6 Nora Courtyard, Rayfield
                    <br />
                    Plateau State, Nigeria
                  </p>
                </div>

                <div className="relative z-10 p-3 bg-forest/80 backdrop-blur-xs rounded-xl border border-brass/20 text-[11px] text-ivory/70 max-w-sm mx-auto">
                  Illustrative representation of our boutique day spa location in Rayfield. Real navigation is reserved for confirmed appointments.
                </div>
              </div>

              {/* Arrival Details */}
              <div className="space-y-3 text-xs sm:text-sm text-ivory/80">
                <h4 className="font-serif text-lg text-ivory">Guest Arrival Notes</h4>
                <ul className="space-y-2 text-xs text-ivory/70 list-disc list-inside">
                  <li>Please arrive 10 minutes prior to your reserved time to unwind and select your aromatherapy oils.</li>
                  <li>Complimentary cold or warm herbal compress provided upon arrival.</li>
                  <li>Unhurried check-out in our lounge after your treatment.</li>
                </ul>
              </div>
            </div>

            {/* Quick Pricing Recall */}
            <div className="bg-[#FAF8F3] border border-brass/35 rounded-2xl p-6 text-xs space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-brass font-semibold">
                Available Treatments
              </span>
              <div className="divide-y divide-forest/10 pt-1">
                <div className="py-2 flex justify-between items-center">
                  <span className="font-medium text-forest">Couples Massage (60 min · 2 guests)</span>
                  <span className="font-semibold text-brass">₦60,000 total</span>
                </div>
                <div className="py-2 flex justify-between items-center">
                  <span className="font-medium text-forest">Signature Massage (60 min · 1 guest)</span>
                  <span className="font-semibold text-brass">₦32,000</span>
                </div>
                <div className="py-2 flex justify-between items-center">
                  <span className="font-medium text-forest">Botanical Facial (45 min · 1 guest)</span>
                  <span className="font-semibold text-brass">₦24,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
