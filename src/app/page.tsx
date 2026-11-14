import React from "react";
import { Navbar } from "@/components/Navbar";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Hero } from "@/components/Hero";
import { ShubhNimantran } from "@/components/ShubhNimantran";
import { ManglikKaryakram } from "@/components/ManglikKaryakram";
import { Parinayotsav } from "@/components/Parinayotsav";
import { Gallery } from "@/components/Gallery";
import { AashirvaadWall } from "@/components/AashirvaadWall";
import { Darshanabhilashi } from "@/components/Darshanabhilashi";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InteractiveCelebrations } from "@/components/InteractiveCelebrations";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-gold-500 selection:text-maroon-950">
      {/* Top Fixed Controls */}
      <Navbar />
      <AudioPlayer />

      {/* Floating Celebrations (Diya Lighting, Petal Shower, Share & RSVP) */}
      <InteractiveCelebrations />

      {/* Main Sections in Ordered Sequence */}
      <main className="flex-1 w-full">
        {/* 1. Hero */}
        <Hero />

        {/* 2. शुभ निमंत्रण list */}
        <ShubhNimantran />

        {/* 3. मांगलिक कार्यक्रम */}
        <ManglikKaryakram />

        {/* 4. शुभ मंगल परिणयोत्सव */}
        <Parinayotsav />

        {/* Photo Gallery (User Download & Admin Upload) */}
        <Gallery />

        {/* Interactive Aashirvaad & Blessing Wall */}
        <AashirvaadWall />

        {/* 5. दर्शनाभिलाषी, आकांक्षी एवं बाल आग्रह */}
        <Darshanabhilashi />

        {/* 6. CTA (WhatsApp & Call) */}
        <CTASection />
      </main>

      {/* 7. Footer with names and date */}
      <Footer />
    </div>
  );
}
