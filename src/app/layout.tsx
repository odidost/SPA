import type { Metadata } from "next";
import { STIX_Two_Text, Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import MobileBookingBar from "@/components/MobileBookingBar";
import OwnerInsightsBadge from "@/components/OwnerInsightsBadge";

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-nera-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nera Spa · Rayfield, Jos · Boutique Day Spa",
  description:
    "An hour side by side. Two therapists, two beds and a quiet room of your own. Fictional boutique day spa in Rayfield, Jos, Plateau State, Nigeria.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stixTwoText.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F5EC] text-[#203F35] font-sans antialiased selection:bg-[#8A6735]/20 selection:text-[#203F35]">
        <BookingProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <BookingModal />
          <MobileBookingBar />
          <OwnerInsightsBadge />
        </BookingProvider>
      </body>
    </html>
  );
}
