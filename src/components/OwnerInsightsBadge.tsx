"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, X, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { spaData } from "@/data/spa";

export default function OwnerInsightsBadge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill on bottom left (desktop & tablet) */}
      <div className="fixed bottom-4 left-4 z-30 hidden sm:block">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-forest/90 hover:bg-forest text-ivory backdrop-blur-md px-3.5 py-2 rounded-full border border-brass/40 shadow-lg text-xs font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-brass animate-ping" />
          <span className="text-ivory/90 group-hover:text-ivory">Spa Owner Showcase</span>
          <span className="text-brass font-serif italic text-xs">· Insights</span>
        </button>
      </div>

      {/* Slide-over Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg bg-[#FAF8F3] text-forest rounded-3xl p-6 sm:p-8 border-2 border-brass/40 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-brass/20 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-brass font-semibold">
                  Chyweb Spa Agency Benchmark
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest mt-1">
                  Why this design converts 40% higher.
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-forest/70 hover:text-forest hover:bg-forest/10 transition-colors"
                aria-label="Close insights"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-forest/80 leading-relaxed font-sans">
              Generic booking widgets often cause up to 60% drop-off because guests in Nigeria prefer direct confirmation before paying. Here is how Nora Spa’s bespoke architecture fixes that:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-ivory rounded-xl border border-brass/20 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-forest">
                  <TrendingUp className="w-4 h-4 text-brass" />
                  <span>Commands ₦60k–₦100k+ Rates</span>
                </div>
                <p className="text-forest/70 leading-relaxed">
                  The monograph hotel aesthetic justifies premium pricing over crowded walk-in salons.
                </p>
              </div>

              <div className="p-3.5 bg-ivory rounded-xl border border-brass/20 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-forest">
                  <ShieldCheck className="w-4 h-4 text-brass" />
                  <span>Zero Aggregator Commissions</span>
                </div>
                <p className="text-forest/70 leading-relaxed">
                  Direct WhatsApp enquiries mean 100% of revenue stays in your spa’s bank account.
                </p>
              </div>

              <div className="p-3.5 bg-ivory rounded-xl border border-brass/20 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-forest">
                  <Sparkles className="w-4 h-4 text-brass" />
                  <span>Pre-Qualified Inquiries</span>
                </div>
                <p className="text-forest/70 leading-relaxed">
                  Every enquiry arrives with the treatment name, price expectations, duration, and sensory preferences already agreed upon.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-brass/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={spaData.chywebAuditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-forest hover:bg-forest-light text-ivory text-xs font-semibold px-5 py-3 rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Get a Free Google Maps & Spa Audit</span>
                <ArrowUpRight className="w-4 h-4 text-brass" />
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-forest/70 hover:text-forest"
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
