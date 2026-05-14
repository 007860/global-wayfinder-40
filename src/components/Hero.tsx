import { useState } from "react";
import { ServicePills, type ServiceKey } from "./ServicePills";
import { ServiceModal } from "./ServiceModal";
import { AISearchWidget } from "./AISearchWidget";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      {/* Decorative flight-path SVG (no animation) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        viewBox="0 0 1440 800"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="goldline" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-50 600 Q 400 200 800 400 T 1500 250" stroke="url(#goldline)" strokeWidth="1" fill="none" />
        <path d="M-50 200 Q 500 500 900 250 T 1500 500" stroke="url(#goldline)" strokeWidth="1" fill="none" />
        <path d="M100 750 Q 600 350 1100 600 T 1600 400" stroke="url(#goldline)" strokeWidth="0.8" fill="none" />
        <circle cx="400" cy="320" r="2" fill="#F59E0B" />
        <circle cx="800" cy="400" r="2" fill="#F59E0B" />
        <circle cx="1100" cy="280" r="2" fill="#F59E0B" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs sm:text-sm tracking-wider mb-8">
          <CheckCircle2 className="size-4 text-gold" />
          <span className="text-foreground/90">TRUSTED SINCE 2015</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-gold font-semibold">LAHORE BRANCH</span>
        </div>

        {/* Massive H1 */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] max-w-5xl mx-auto">
          Your Dedicated Hub for{" "}
          <span className="text-gold-gradient">International Bookings</span> &{" "}
          <span className="text-gold-gradient">Visa Appointments</span>
        </h1>

        <p className="mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Premium consultancy for Pakistani travellers — Gulf, Europe, and beyond.
          Embassy-grade expertise, white-glove service.
        </p>

        <div className="mt-10">
          <ServicePills />
        </div>

        <div className="mt-14">
          <AISearchWidget />
          <p className="text-xs text-muted-foreground mt-3">
            AI agent fetches live visa & travel intelligence — saved as a permanent blog brief.
          </p>
        </div>
      </div>
    </section>
  );
}
