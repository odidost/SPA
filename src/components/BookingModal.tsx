"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Check,
  Clock,
  Users,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Share2,
  CalendarPlus,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { useBooking } from "./BookingContext";
import { spaData, Treatment } from "@/data/spa";

export default function BookingModal() {
  const { isOpen, closeBooking, selectedTreatment, selectTreatment } = useBooking();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedPressure, setSelectedPressure] = useState<string>(
    spaData.sensoryOptions.pressures[0]
  );
  const [selectedAroma, setSelectedAroma] = useState<string>(
    spaData.sensoryOptions.aromas[0]
  );
  const [copiedShare, setCopiedShare] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset when treatment changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSlot(null);
      setIsConfirmed(false);
      setCopiedShare(false);
    }
  }, [isOpen, selectedTreatment.slug]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeBooking();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeBooking]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectSlot = (slot: { id: string; dateFormatted: string }) => {
    setSelectedSlot(slot.dateFormatted);
    setIsConfirmed(true);
  };

  const handleResetDemo = () => {
    setSelectedSlot(null);
    setIsConfirmed(false);
    setCopiedShare(false);
  };

  const chosenSlotObj = selectedTreatment.sampleTimes.find(
    (s) => s.dateFormatted === selectedSlot
  );

  const cleanPressureName = selectedPressure.split(" (")[0];
  const cleanAromaName = selectedAroma.split(" (")[0];

  const personalizedGuestMsg = `${selectedTreatment.guestMessage.replace(
    ". Which times",
    ` (${cleanPressureName.toLowerCase()} with ${cleanAromaName.toLowerCase()}). Which times`
  )}`;

  const handleShareCompanion = () => {
    const shareText = `I have reserved our ${selectedTreatment.name} at Nora Spa in Rayfield for ${selectedSlot || "our session"}. Address: 6 Nora Courtyard, Rayfield. Looking forward to our quiet hour together!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-forest/80 backdrop-blur-sm transition-opacity"
    >
      {/* Background backdrop click */}
      <div
        className="absolute inset-0"
        onClick={closeBooking}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#EFECE6] text-forest rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-brass/35 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* WhatsApp-Style Header */}
        <div className="bg-forest text-ivory px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-brass/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-ivory flex items-center justify-center p-1.5 shadow-sm overflow-hidden flex-shrink-0">
              <Image
                src="/images/nora-mark.png"
                alt="Nora Spa Mark"
                width={36}
                height={36}
                className="object-contain"
              />
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-forest rounded-full"
                title="Concierge is online"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="booking-dialog-title"
                  className="font-sans font-medium text-base text-ivory tracking-wide leading-tight"
                >
                  Nora Spa Reception
                </h2>
                <span className="text-[10px] bg-brass/30 text-ivory px-1.5 py-0.5 rounded font-mono uppercase tracking-wider">
                  Jos Concierge
                </span>
              </div>
              <p className="text-xs text-ivory/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Typically replies within 15 minutes · Rayfield
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={closeBooking}
              className="p-1.5 rounded-full hover:bg-forest-light text-ivory/80 hover:text-ivory transition-colors"
              aria-label="Close booking window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Demo Mode Notice Banner */}
        <div className="bg-[#E4DEC8]/80 text-forest px-4 py-2 text-xs flex items-center justify-between border-b border-brass/20">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-brass" />
            <span>Interactive Demo · No personal data required</span>
          </div>
          <span className="text-[11px] text-forest/70 font-mono">6 Nora Courtyard</span>
        </div>

        {/* Treatment switcher tabs with generous, balanced vertical padding */}
        <div className="px-3 sm:px-4 py-3 sm:py-3.5 bg-[#E8E4DA] border-b border-brass/20">
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {spaData.treatments.map((t) => {
              const isActive = t.slug === selectedTreatment.slug;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => {
                    selectTreatment(t);
                    setSelectedSlot(null);
                    setIsConfirmed(false);
                  }}
                  className={`flex flex-col items-center justify-center text-center py-3 px-2 sm:py-3.5 sm:px-3 rounded-xl border transition-all duration-200 select-none ${
                    isActive
                      ? "bg-forest text-ivory border-forest shadow-md ring-1 ring-brass/40"
                      : "bg-ivory/80 text-forest border-brass/25 hover:border-brass/60 hover:bg-ivory"
                  }`}
                >
                  <span className="font-serif text-xs sm:text-[13px] font-medium leading-tight text-center">
                    {t.name}
                  </span>
                  <span
                    className={`text-[11px] font-mono mt-1 ${
                      isActive ? "text-brass-light font-semibold" : "text-brass-dark font-medium"
                    }`}
                  >
                    ({t.price})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F4F1EA] text-sm">
          {/* Day divider timestamp */}
          <div className="flex justify-center">
            <span className="bg-[#E5E0D5] text-forest/70 text-[11px] px-2.5 py-0.5 rounded-md shadow-xs font-mono">
              Today · Rayfield, Jos (GMT+1)
            </span>
          </div>

          {/* Sensory Preferences Accordion / Selector (Before Confirming) */}
          {!isConfirmed && (
            <div className="bg-[#FAF8F3] border border-brass/30 rounded-xl p-3 space-y-2 text-xs shadow-xs">
              <div className="flex items-center justify-between border-b border-brass/15 pb-1.5">
                <span className="font-semibold text-forest flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-brass" />
                  Sensory Preferences (Pre-calibrated for Reception)
                </span>
                <span className="text-[10px] text-brass uppercase font-mono font-medium">
                  Customized
                </span>
              </div>

              <div className="space-y-1.5 pt-0.5">
                <label className="block text-[11px] text-forest/70 font-medium">
                  Pressure preference:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {spaData.sensoryOptions.pressures.map((p) => {
                    const isSel = selectedPressure === p;
                    const shortP = p.split(" (")[0];
                    return (
                      <button
                        key={p}
                        onClick={() => setSelectedPressure(p)}
                        className={`text-[11px] py-1 px-2 rounded-lg border text-left font-medium transition-all ${
                          isSel
                            ? "bg-forest text-ivory border-forest"
                            : "bg-ivory text-forest/80 border-brass/20 hover:border-brass"
                        }`}
                      >
                        {shortP}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="block text-[11px] text-forest/70 font-medium">
                  Botanical aroma oil:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {spaData.sensoryOptions.aromas.map((a) => {
                    const isSel = selectedAroma === a;
                    const shortA = a.split(" (")[0];
                    return (
                      <button
                        key={a}
                        onClick={() => setSelectedAroma(a)}
                        className={`text-[11px] py-1 px-2 rounded-lg border text-left font-medium transition-all ${
                          isSel
                            ? "bg-forest text-ivory border-forest"
                            : "bg-ivory text-forest/80 border-brass/20 hover:border-brass"
                        }`}
                      >
                        {shortA}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Message 1: Outgoing from Spa Guest */}
          <div className="flex justify-end">
            <div className="bg-[#D9EADB] text-forest rounded-2xl rounded-tr-xs px-3.5 py-2.5 max-w-[88%] shadow-sm border border-emerald-900/10">
              <p className="leading-relaxed">
                {isConfirmed ? personalizedGuestMsg : selectedTreatment.guestMessage}
              </p>
              <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-forest/60">
                <span>14:40</span>
                <span className="text-emerald-700">✓✓</span>
              </div>
            </div>
          </div>

          {/* Message 2: Incoming from Reception */}
          <div className="flex justify-start">
            <div className="bg-ivory text-forest rounded-2xl rounded-tl-xs px-4 py-3 max-w-[94%] shadow-sm border border-brass/20 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs text-brass font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nora Spa Reception</span>
              </div>

              <p className="leading-relaxed font-sans text-forest/90">
                {selectedTreatment.receptionReply}
              </p>

              {/* Treatment summary card inside chat */}
              <div className="bg-[#FAF8F2] border border-brass/25 rounded-lg p-2.5 text-xs space-y-1">
                <div className="flex justify-between items-baseline font-serif text-sm font-semibold text-forest">
                  <span>{selectedTreatment.name}</span>
                  <span className="font-sans font-medium text-brass">
                    {selectedTreatment.priceFormatted}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-forest/70 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-brass" />
                    {selectedTreatment.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-brass" />
                    {selectedTreatment.guests}
                  </span>
                </div>
              </div>

              {!isConfirmed && (
                <div className="pt-1">
                  <p className="text-xs font-medium text-forest mb-2">
                    Select an available time slot in Jos:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedTreatment.sampleTimes.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleSelectSlot(slot)}
                        className="group flex items-center justify-between p-2.5 bg-ivory hover:bg-[#EFECE1] border border-brass/35 hover:border-forest rounded-lg text-left transition-all shadow-xs"
                      >
                        <div>
                          <div className="font-medium text-xs text-forest group-hover:text-forest">
                            {slot.day}
                          </div>
                          <div className="text-xs text-brass font-semibold font-mono">
                            {slot.time}
                          </div>
                        </div>
                        <span className="text-[11px] bg-forest/10 group-hover:bg-forest group-hover:text-ivory px-2 py-1 rounded transition-colors text-forest font-medium flex items-center gap-1">
                          Select <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end text-[10px] text-forest/50 mt-1">
                <span>14:41</span>
              </div>
            </div>
          </div>

          {/* If user picked a slot, show guest reply & reception demo confirmation */}
          {isConfirmed && selectedSlot && (
            <>
              {/* Message 3: Outgoing guest selection */}
              <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="bg-[#D9EADB] text-forest rounded-2xl rounded-tr-xs px-3.5 py-2.5 max-w-[85%] shadow-sm border border-emerald-900/10">
                  <p className="leading-relaxed">
                    Please book <span className="font-semibold">{selectedSlot}</span> for me.
                  </p>
                  <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-forest/60">
                    <span>14:42</span>
                    <span className="text-emerald-700">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Message 4: Reception Confirmation (DEMO BOOKING) */}
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-3 duration-300">
                <div className="bg-ivory text-forest rounded-2xl rounded-tl-xs p-4 sm:p-5 max-w-[96%] shadow-md border-2 border-brass/40 space-y-3.5">
                  {/* Badge */}
                  <div className="flex items-center justify-between border-b border-brass/20 pb-2">
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Check className="w-3 h-3 text-emerald-700" />
                      Demo Booking Confirmed
                    </span>
                    <span className="text-[10px] font-mono text-forest/60">REF #NORA-DEMO</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest">
                      {selectedTreatment.name}
                    </h3>
                    <p className="text-xs text-brass font-medium mt-0.5">
                      {selectedTreatment.priceFormatted}
                    </p>
                  </div>

                  {/* Summary Details */}
                  <div className="bg-[#FAF8F3] rounded-xl p-3.5 border border-brass/20 text-xs space-y-2">
                    <div className="flex justify-between py-0.5 border-b border-forest/10">
                      <span className="text-forest/70">Date & Time</span>
                      <span className="font-semibold text-forest text-right">
                        {chosenSlotObj ? `${chosenSlotObj.day} · ${chosenSlotObj.time}` : selectedSlot}
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-forest/10">
                      <span className="text-forest/70">Duration</span>
                      <span className="font-medium text-forest">{selectedTreatment.duration}</span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-forest/10">
                      <span className="text-forest/70">Guests</span>
                      <span className="font-medium text-forest">{selectedTreatment.guests}</span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-forest/10">
                      <span className="text-forest/70">Sensory Tuning</span>
                      <span className="font-medium text-forest text-right">
                        {cleanPressureName} · {cleanAromaName}
                      </span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-forest/10">
                      <span className="text-forest/70">Total Due at Reception</span>
                      <span className="font-bold text-forest text-sm">{selectedTreatment.price}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-forest/70">Sanctuary</span>
                      <span className="font-medium text-forest text-right">
                        6 Nora Courtyard, Rayfield
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-forest/80 italic leading-relaxed">
                    “We look forward to welcoming you to Nora in Rayfield. Your therapists and private room will be prepared ahead of your arrival.”
                  </p>

                  {/* Share & Calendar Actions */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleShareCompanion}
                      className="inline-flex items-center gap-1.5 text-xs bg-forest text-ivory px-3.5 py-2 rounded-lg font-medium hover:bg-forest-light transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-brass" />
                      <span>{copiedShare ? "Invitation Copied!" : "Share with Companion"}</span>
                    </button>
                    <button
                      onClick={handleResetDemo}
                      className="text-xs text-forest/80 hover:text-forest underline py-2 px-1"
                    >
                      Try another time or treatment
                    </button>
                  </div>

                  {/* Discreet Chyweb Offer / Audit Link */}
                  <div className="mt-3 pt-3 border-t border-brass/25 bg-[#F3EFE6] -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3.5 sm:p-4 rounded-b-2xl">
                    <p className="text-[11px] text-forest/75 mb-1.5">
                      Are you a spa owner exploring how your guests could book this easily?
                    </p>
                    <a
                      href={spaData.chywebAuditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-brass transition-colors underline decoration-brass underline-offset-4"
                    >
                      <span>I want this for my spa</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brass" />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-ivory px-4 py-2.5 border-t border-brass/20 flex items-center justify-between text-xs text-forest/70">
          <span>Plateau State, Nigeria</span>
          <button
            onClick={closeBooking}
            className="text-xs font-medium text-forest hover:text-brass"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
