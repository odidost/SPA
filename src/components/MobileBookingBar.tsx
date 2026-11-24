"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { useBooking } from "./BookingContext";
import { spaData } from "@/data/spa";

export default function MobileBookingBar() {
  const { openBooking, isOpen } = useBooking();
  const pathname = usePathname();

  if (isOpen) return null;

  // Determine current treatment context if on a treatment page
  let currentSlug = "couples-massage";
  if (pathname.includes("/treatments/signature-massage")) {
    currentSlug = "signature-massage";
  } else if (pathname.includes("/treatments/botanical-facial")) {
    currentSlug = "botanical-facial";
  }

  const currentTreatment =
    spaData.treatments.find((t) => t.slug === currentSlug) ||
    spaData.treatments[0];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F7F5EC]/95 backdrop-blur-md border-t border-[#8A6735]/25 px-4 py-2.5 shadow-lg safe-bottom">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[11px] font-sans text-[#203F35]/70 uppercase tracking-wider font-medium">
            {currentTreatment.name}
          </span>
          <span className="text-xs font-semibold text-[#203F35]">
            {currentTreatment.price}
            <span className="font-normal text-[#203F35]/60 text-[10px]"> · {currentTreatment.duration}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => openBooking(currentSlug)}
          className="bg-[#203F35] hover:bg-[#203F35]/90 text-[#F7F5EC] text-xs font-semibold px-4 py-2.5 rounded-[3px] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#8A6735]" />
          <span>Ask for a time</span>
        </button>
      </div>
    </div>
  );
}
