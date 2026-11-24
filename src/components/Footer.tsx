"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { spaData } from "@/data/spa";
import { useBooking } from "./BookingContext";

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="w-full bg-[#203F35] text-[#F7F5EC] border-t border-[#8A6735]/30">
      <div className="shared-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90"
              aria-label="Nera Spa Homepage"
            >
              <img
                src="/images/nera-wordmark.svg"
                alt="Nera Spa"
                className="w-[7.2rem] h-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-serif italic text-base sm:text-lg text-[#F7F5EC]/90 max-w-sm">
              {spaData.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#F7F5EC]/65 max-w-sm leading-relaxed font-sans">
              Designed with the serene rhythm of an independent boutique hotel.
              Each treatment is paired with quiet time in our courtyard lounge.
            </p>
          </div>

          {/* Quick Guest Navigation (Col 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-wider text-[#8A6735] font-semibold">
              The Spa
            </h4>
            <ul className="space-y-2 text-sm text-[#F7F5EC]/80 font-sans">
              <li>
                <Link
                  href="/treatments"
                  className="hover:text-[#F7F5EC] transition-colors"
                >
                  Treatment Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/couples-massage"
                  className="hover:text-[#F7F5EC] transition-colors"
                >
                  Couples Suite Massage
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/signature-massage"
                  className="hover:text-[#F7F5EC] transition-colors"
                >
                  Signature Body Massage
                </Link>
              </li>
              <li>
                <Link
                  href="/treatments/botanical-facial"
                  className="hover:text-[#F7F5EC] transition-colors"
                >
                  Botanical Facial
                </Link>
              </li>
              <li>
                <Link
                  href="/the-space"
                  className="hover:text-[#F7F5EC] transition-colors"
                >
                  The Lounge & Suite
                </Link>
              </li>
              <li>
                <Link
                  href="/visit"
                  className="hover:text-[#F7F5EC] transition-colors"
                >
                  Location & Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit & Reception Column (Col 9-12) */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <h4 className="font-sans text-xs uppercase tracking-wider text-[#8A6735] font-semibold">
              Sanctuary in Rayfield
            </h4>
            <div className="space-y-2.5 text-[#F7F5EC]/80 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8A6735] mt-0.5 flex-shrink-0" />
                <span>{spaData.fullAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8A6735] mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p>Tuesday – Saturday: 10:00 am – 7:00 pm</p>
                  <p>Sunday: 12:00 pm – 5:00 pm</p>
                  <p className="text-[#F7F5EC]/50 italic">Monday: Closed for restoration</p>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => openBooking("couples-massage")}
                className="inline-flex items-center gap-2 bg-[#F7F5EC] text-[#203F35] text-xs font-semibold px-4 py-2.5 rounded-[3px] hover:bg-[#FAF8F3] transition-colors shadow-xs"
              >
                <span>Ask for a time</span>
                <span className="text-[#8A6735]">· ₦60,000 for two</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Fictional Disclosure & Chyweb Link */}
        <div className="mt-12 pt-6 border-t border-[#F7F5EC]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5EC]/65 font-sans">
          <p>
            A fictional spa website by{" "}
            <a
              href="https://chyweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7F5EC] hover:text-[#8A6735] transition-colors underline underline-offset-2"
            >
              Chyweb
            </a>
            . Built for demonstration.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={spaData.chywebAuditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F7F5EC]/80 hover:text-[#8A6735] text-xs transition-colors"
            >
              <span>I want this for my spa</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8A6735]" />
            </a>
            <span className="text-[#F7F5EC]/40">·</span>
            <span>Rayfield, Jos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
