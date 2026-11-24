export interface Treatment {
  slug: string;
  name: string;
  shortName: string;
  duration: string;
  durationMinutes: number;
  guests: string;
  guestCount: number;
  price: string;
  priceFormatted: string;
  priceNumber: number;
  image: string;
  imageAlt: string;
  plateCaption: string;
  tagline: string;
  expectation: string;
  whatIsIncluded: string[];
  whoItsFor: string;
  guestMessage: string;
  receptionReply: string;
  sampleTimes: {
    id: string;
    day: string;
    time: string;
    dateFormatted: string;
  }[];
}

export interface RitualStage {
  step: string;
  numeral: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  badge: string;
}

export interface SpaConfig {
  name: string;
  tagline: string;
  eyebrow: string;
  neighbourhood: string;
  city: string;
  state: string;
  address: string;
  fullAddress: string;
  hoursSummary: string;
  hours: {
    days: string;
    hours: string;
    isClosed?: boolean;
  }[];
  hoursSummaryShort: string;
  bookingNotice: string;
  phone: string;
  whatsappPhone: string;
  chywebAuditUrl: string;
  arrivalRitual: RitualStage[];
  sanctuaryPromise: {
    title: string;
    description: string;
    icon: string;
  }[];
  sensoryOptions: {
    pressures: string[];
    aromas: string[];
  };
  treatments: Treatment[];
}

export const spaData: SpaConfig = {
  name: "Nora Spa",
  tagline: "A quiet sanctuary for restorative massage and botanical therapies in Jos.",
  eyebrow: "A day spa in Rayfield, Jos",
  neighbourhood: "Rayfield",
  city: "Jos",
  state: "Plateau State",
  address: "6 Nora Courtyard, Rayfield",
  fullAddress: "6 Nora Courtyard, Rayfield, Jos, Plateau State",
  hoursSummary: "Tue–Sat 10 am–7 pm · Sun 12–5 pm · Mon closed",
  hoursSummaryShort: "Tue–Sat 10–7 · Sun 12–5",
  hours: [
    { days: "Tuesday – Saturday", hours: "10:00 am – 7:00 pm" },
    { days: "Sunday", hours: "12:00 pm – 5:00 pm" },
    { days: "Monday", hours: "Closed for restoration", isClosed: true },
  ],
  bookingNotice: "Campaign offer available year-round. Appointments confirmed in order of receipt.",
  phone: "+234 (0) 700 6372 772",
  whatsappPhone: "+234 (0) 803 000 6372",
  chywebAuditUrl: process.env.NEXT_PUBLIC_CHYWEB_AUDIT_URL || "https://chyweb.com/spa-bookings#audit",
  arrivalRitual: [
    {
      step: "01",
      numeral: "I",
      title: "Arrival & Settle",
      description: "Step past the stone gates into our shaded garden courtyard. You are greeted with a chilled organic lemongrass compress to wash away travel dust.",
      detail: "15 minutes of unhurried settling before therapy begins",
      image: "/images/lounge-for-two.jpg",
      imageAlt: "Courtyard lounge greeting with lemongrass compress",
      badge: "Arrival · 15 min",
    },
    {
      step: "02",
      numeral: "II",
      title: "Sensory Consultation",
      description: "Your therapist quietly introduces you to our three seasonal botanical oil blends and notes your exact muscle tension points and pressure preference.",
      detail: "Customized pressure: gentle, balanced, or firm release",
      image: "/images/botanical-facial.jpg",
      imageAlt: "Sensory botanical aroma and pressure consultation",
      badge: "Consultation · 10 min",
    },
    {
      step: "03",
      numeral: "III",
      title: "The Treatment Hour",
      description: "Heated treatment beds dressed in freshly laundered 400-thread Egyptian cotton linen. Two therapists working in seamless choreography in your private room.",
      detail: "Acoustically dampened private room · zero interruptions",
      image: "/images/couples-suite.jpg",
      imageAlt: "Private suite with paired heated treatment beds",
      badge: "Therapy · 60 min",
    },
    {
      step: "04",
      numeral: "IV",
      title: "The Courtyard Pause",
      description: "Following your session, remain undisturbed in the lounge. We serve hot ginger-hibiscus tisane and cool water while your body returns gently to full wakefulness.",
      detail: "Complimentary tea service with no rush to vacate",
      image: "/images/signature-massage.jpg",
      imageAlt: "Courtyard relaxation with organic ginger tisane",
      badge: "Departure · Unhurried",
    },
  ],
  sanctuaryPromise: [
    {
      title: "Secluded Private Rooms",
      description: "Couples share one spacious suite with private changing. You will never encounter crowded waiting areas or shared cubicles.",
      icon: "ShieldCheck",
    },
    {
      title: "Acoustic Stillness",
      description: "Phones are silent upon entry. Background acoustic baffling isolates outside traffic, creating absolute calm in the heart of Rayfield.",
      icon: "Sparkles",
    },
    {
      title: "Botanical Integrity",
      description: "Zero synthetic fragrances or mineral oils. We formulate exclusively with cold-pressed sweet almond, Plateau eucalyptus, and wild botanicals.",
      icon: "HeartHandshake",
    },
  ],
  sensoryOptions: {
    pressures: [
      "Balanced Tension Release (Medium)",
      "Gentle Unwinding (Light & Flowing)",
      "Deep Restorative Work (Firm)",
    ],
    aromas: [
      "Wild Jos Eucalyptus & Mint (Refreshing & Decongesting)",
      "Highland Plateau Lavender (Calming & Sleep-inducing)",
      "Pure Cold-Pressed Sweet Almond (Delicate & Fragrance-free)",
    ],
  },
  treatments: [
    {
      slug: "couples-massage",
      name: "Couples Massage",
      shortName: "Couples",
      duration: "60 minutes",
      durationMinutes: 60,
      guests: "Two guests",
      guestCount: 2,
      price: "₦60,000 total",
      priceFormatted: "₦60,000 total for two",
      priceNumber: 60000,
      image: "/images/couples-suite.jpg",
      imageAlt: "Two dressed treatment beds side by side in the private couples suite at Nora Spa",
      plateCaption: "Plate 01 · The Paired Suite, prepared side by side for two guests",
      tagline: "An hour side by side. Two therapists, two beds and a quiet room of your own.",
      expectation: "Two therapists and two beds in one private room. Each guest can choose their preferred pressure.",
      whatIsIncluded: [
        "60 minutes of uninterrupted side-by-side full body massage",
        "Two dedicated therapists working in harmony in one private suite",
        "Individual consultation to choose your personal pressure preference",
        "Warm botanical massage oil infused with local eucalyptus and sweet almond",
        "Heated treatment beds dressed in crisp organic cotton linens",
        "Private unhurried herbal tea service in the lounge following your session"
      ],
      whoItsFor: "Couples, close friends, or celebrating pairs who want an intimate, restorative pause in Rayfield without being separated into different rooms.",
      guestMessage: "Hi Nora, I’d like to book a Couples Massage for two. Which times are available?",
      receptionReply: "It’s ₦60,000 for both of you. You’ll each have a therapist in the same private room for 60 minutes. Which day suits you?",
      sampleTimes: [
        {
          id: "cm-1",
          day: "Tomorrow (Wednesday)",
          time: "2:30 pm",
          dateFormatted: "Tomorrow at 2:30 pm (Jos time)"
        },
        {
          id: "cm-2",
          day: "Friday",
          time: "4:00 pm",
          dateFormatted: "This Friday at 4:00 pm (Jos time)"
        }
      ]
    },
    {
      slug: "signature-massage",
      name: "Signature Massage",
      shortName: "Signature",
      duration: "60 minutes",
      durationMinutes: 60,
      guests: "One guest",
      guestCount: 1,
      price: "₦32,000",
      priceFormatted: "₦32,000 · 60 minutes",
      priceNumber: 32000,
      image: "/images/signature-massage.jpg",
      imageAlt: "Therapist performing a restorative full body massage in the tranquil treatment room",
      plateCaption: "Plate 02 · Full-body rhythmic tension release with warmed botanical oils",
      tagline: "A full-body massage at your preferred pressure, with time to settle in and unwind.",
      expectation: "A full-body massage at the guest’s preferred pressure, with time to settle in and unwind.",
      whatIsIncluded: [
        "60 minutes of targeted, flowing full-body therapeutic massage",
        "Custom pressure calibrated to your body (gentle relaxation, medium tension-relief, or firm deep work)",
        "Focused attention on neck, shoulders, and lower back to dissolve physical tension",
        "Warmed botanical oils supporting circulation and muscle recovery",
        "Warm towel foot compresses and gentle scalp tension release",
        "Quiet relaxation time with our signature lemongrass infusion afterwards"
      ],
      whoItsFor: "Individuals carrying everyday strain, travel fatigue, or seeking a calm, private sanctuary to completely disconnect and reset.",
      guestMessage: "Hi Nora, I’d like to book a Signature Massage. Which times are available?",
      receptionReply: "It’s ₦32,000 for 60 minutes of full-body massage tailored to your preferred pressure. Which day works best for you?",
      sampleTimes: [
        {
          id: "sm-1",
          day: "Tomorrow (Wednesday)",
          time: "11:00 am",
          dateFormatted: "Tomorrow at 11:00 am (Jos time)"
        },
        {
          id: "sm-2",
          day: "Thursday",
          time: "3:30 pm",
          dateFormatted: "This Thursday at 3:30 pm (Jos time)"
        }
      ]
    },
    {
      slug: "botanical-facial",
      name: "Botanical Facial",
      shortName: "Botanical",
      duration: "45 minutes",
      durationMinutes: 45,
      guests: "One guest",
      guestCount: 1,
      price: "₦24,000",
      priceFormatted: "₦24,000 · 45 minutes",
      priceNumber: 24000,
      image: "/images/botanical-facial.jpg",
      imageAlt: "Therapist applying a warm steamed botanical compress to a guest during a facial",
      plateCaption: "Plate 03 · Warm cotton compress infused with mountain chamomile and rosewater",
      tagline: "A gentle cleanse, a warm cotton compress and a moisturising finish.",
      expectation: "A gentle cleanse, a warm cotton compress and a moisturising finish.",
      whatIsIncluded: [
        "45 minutes of delicate, non-invasive botanical skincare therapy",
        "Gentle double cleanse removing environmental impurities without stripping natural oils",
        "Steamed organic cotton compresses opening pores and easing facial tension",
        "Delicate plant-seed exfoliation buffing dull surface texture gently",
        "Soothing lymphatic facial and collarbone massage to reduce puffiness",
        "Deep botanical hydration mask sealed with cold-pressed protective plant lipids"
      ],
      whoItsFor: "Guests wanting clear, rested, radiant skin before an event or as regular gentle maintenance against the Jos plateau climate.",
      guestMessage: "Hi Nora, I’d like to book a Botanical Facial. Which times are available?",
      receptionReply: "It’s ₦24,000 for 45 minutes of gentle botanical cleansing, warm compress, and hydrating finish. Which day suits you?",
      sampleTimes: [
        {
          id: "bf-1",
          day: "Tomorrow (Wednesday)",
          time: "1:00 pm",
          dateFormatted: "Tomorrow at 1:00 pm (Jos time)"
        },
        {
          id: "bf-2",
          day: "Saturday",
          time: "12:30 pm",
          dateFormatted: "This Saturday at 12:30 pm (Jos time)"
        }
      ]
    }
  ]
};

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return spaData.treatments.find((t) => t.slug === slug);
}
