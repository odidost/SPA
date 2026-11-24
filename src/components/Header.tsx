"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Clock, MapPin } from "lucide-react";
import { useBooking } from "./BookingContext";
import { spaData } from "@/data/spa";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();

  // If on a specific treatment page, preserve that treatment when clicking header booking CTA
  let currentSlug = "couples-massage";
  if (pathname.includes("/treatments/signature-massage")) {
    currentSlug = "signature-massage";
  } else if (pathname.includes("/treatments/botanical-facial")) {
    currentSlug = "botanical-facial";
  }

  const navLinks = [
    { label: "Treatments", href: "/treatments" },
    { label: "The Space", href: "/the-space" },
    { label: "Visit", href: "/visit" },
  ];

  return (
    <header className="site-header">
      <div className="shared-container">
        <div className="site-header-inner">
          {/* Wordmark: 7.6rem wide (5.9rem at <=700px) */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label="Nera Spa Homepage"
          >
            <img
              src="/images/nera-wordmark.svg"
              alt="Nera Spa"
              className="header-wordmark"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden md:flex items-center" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-[#203F35] ${
                    isActive ? "font-semibold text-[#203F35]" : "text-[#203F35]/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => openBooking(currentSlug)}
              className="header-btn-outline"
            >
              Ask for a time
            </button>
          </nav>

          {/* Mobile Right Controls: Outlined CTA + Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={() => openBooking(currentSlug)}
              className="header-btn-outline !py-1.5 !px-3 text-xs"
            >
              Ask for a time
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#203F35] hover:bg-[#203F35]/5 rounded-[3px] transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5EC] border-b border-[#D5D6C8] shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="shared-container py-4 space-y-4">
            <nav className="flex flex-col space-y-1 font-sans">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-[3px] text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#203F35]/10 text-[#203F35] font-semibold border-l-2 border-[#8A6735]"
                        : "text-[#203F35]/80 hover:bg-[#203F35]/5 hover:text-[#203F35]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#8A6735]/20 space-y-2 text-xs text-[#203F35]/75 px-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8A6735]" />
                <span>
                  {spaData.address}, {spaData.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8A6735]" />
                <span>{spaData.hoursSummary}</span>
              </div>
            </div>

            <div className="pt-2 px-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking(currentSlug);
                }}
                className="w-full bg-[#203F35] text-[#F7F5EC] text-sm font-medium py-3 rounded-[3px] text-center shadow-xs hover:bg-[#203F35]/90 transition-colors"
              >
                Ask for a time · WhatsApp Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
