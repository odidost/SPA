"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Treatment, spaData } from "@/data/spa";

interface BookingContextType {
  isOpen: boolean;
  selectedTreatment: Treatment;
  openBooking: (treatmentSlug?: string) => void;
  closeBooking: () => void;
  selectTreatment: (treatment: Treatment) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(
    spaData.treatments[0] // Defaults to Couples Massage
  );

  const openBooking = (treatmentSlug?: string) => {
    if (treatmentSlug) {
      const found = spaData.treatments.find((t) => t.slug === treatmentSlug);
      if (found) {
        setSelectedTreatment(found);
      }
    }
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const selectTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        selectedTreatment,
        openBooking,
        closeBooking,
        selectTreatment,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
