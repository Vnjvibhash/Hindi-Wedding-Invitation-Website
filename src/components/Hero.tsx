"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";
import {
  GaneshMotif,
  DiyaMotif,
  PaisleyMotif,
  MarigoldGarland,
} from "./Motifs";
import { Sparkles, Calendar, Heart } from "lucide-react";

function subscribeDummy() {
  return () => {};
}
const getClientTrue = () => true;
const getServerFalse = () => false;

export const Hero: React.FC = () => {
  // Target: 2026-11-22 20:00 IST
  const targetDateStr = "2026-11-22T20:00:00+05:30";

  const isClient = useSyncExternalStore(
    subscribeDummy,
    getClientTrue,
    getServerFalse
  );

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isFinished: false,
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  const triggerFloralShower = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e8741a", "#c8962b", "#8a1c3c", "#f3deba", "#0d9488"],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 overflow-hidden text-center flex flex-col items-center justify-center min-h-[90vh] bg-gradient-to-b from-cream-200 via-cream-100 to-cream-200 dark:from-darkbg-950 dark:via-darkbg-900 dark:to-darkbg-950"
    >
      {/* Decorative SVG Background Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 overflow-hidden flex items-center justify-between">
        <PaisleyMotif className="w-64 h-96 -ml-20 text-maroon-800" />
        <PaisleyMotif className="w-64 h-96 -mr-20 text-maroon-800" flip />
      </div>

      {/* Top Garland */}
      <MarigoldGarland className="mb-6 opacity-90" />

      {/* Main Container Card */}
      <div className="relative z-10 max-w-3xl w-full mx-auto p-6 sm:p-10 rounded-3xl border-2 border-gold-400/40 bg-cream-100/90 dark:bg-darkbg-850/80 backdrop-blur-md shadow-2xl shadow-gold/10">
        {/* Floating Diya Accents on Corners */}
        <div className="absolute -top-5 left-4 sm:left-8">
          <DiyaMotif className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>
        <div className="absolute -top-5 right-4 sm:right-8">
          <DiyaMotif className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>

        {/* 1. गणेश वंदना */}
        <div className="flex flex-col items-center mb-6">
          <div className="p-3.5 rounded-full bg-gradient-to-tr from-saffron-500/20 via-gold-500/20 to-maroon-800/20 border border-gold-400/50 mb-3 shadow-inner">
            <GaneshMotif className="w-16 h-16 sm:w-20 sm:h-20 text-maroon-800 dark:text-gold-400 drop-shadow" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-maroon-800 dark:text-gold-300 tracking-wider">
            ।। श्री गणेशाय नमः ।।
          </h2>
        </div>

        {/* Couplet (दोहा) */}
        <div className="max-w-xl mx-auto mb-6 px-4 py-3 rounded-2xl bg-gold-500/10 dark:bg-gold-500/5 border border-gold-400/30">
          <p className="font-heading text-base sm:text-lg leading-relaxed text-maroon-900 dark:text-gold-200 italic font-medium">
            &ldquo;विघ्न हरण मंगल करण, श्री गणपति महाराज।<br className="hidden sm:inline" />
            प्रथम निमंत्रण आपको, पूरण कीजे सब काज।।&rdquo;
          </p>
        </div>

        {/* Title: शुभ विवाह */}
        <div className="mb-4">
          <span className="inline-block px-5 py-1.5 rounded-full bg-maroon-800 text-gold-300 text-sm sm:text-base font-semibold tracking-widest shadow-md">
            शुभ विवाह
          </span>
        </div>

        {/* Royal Bride & Groom Twin Portrait Showcase */}
        <div className="my-6 flex items-center justify-center gap-3 sm:gap-8">
          {/* Groom Portrait */}
          <div className="flex flex-col items-center group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-gold-500 via-saffron-500 to-maroon-800 shadow-xl shadow-gold/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-cream-100 dark:border-darkbg-900 bg-maroon-950">
                <img
                  src="/images/groom.jpg"
                  alt="वर: आयुष्मान् राम उदय सिंह"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-maroon-800 text-gold-300 border border-gold-400 shadow">
                  वर
                </span>
              </div>
            </div>
            <span className="mt-2.5 font-heading font-bold text-sm sm:text-base text-maroon-900 dark:text-gold-200">
              उदय
            </span>
          </div>

          {/* Sacred Mangal Knot / Heart Emblem */}
          <div className="flex flex-col items-center px-1">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gold-500/15 dark:bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shadow-inner animate-pulse-slow">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-saffron-500 fill-saffron-500" />
            </div>
            <span className="text-[11px] sm:text-xs font-heading font-bold text-saffron-600 dark:text-gold-400 mt-1">
              संग
            </span>
          </div>

          {/* Bride Portrait */}
          <div className="flex flex-col items-center group">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-gold-500 via-saffron-500 to-maroon-800 shadow-xl shadow-gold/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-cream-100 dark:border-darkbg-900 bg-maroon-950">
                <img
                  src="/images/bride.jpg"
                  alt="वधू: आयुष्मती कुमारी ज्योती"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-1.5 inset-x-0 flex justify-center">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-maroon-800 text-gold-300 border border-gold-400 shadow">
                  वधू
                </span>
              </div>
            </div>
            <span className="mt-2.5 font-heading font-bold text-sm sm:text-base text-maroon-900 dark:text-gold-200">
              ज्योती
            </span>
          </div>
        </div>

        {/* Names: उदय संग ज्योती */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading text-maroon-800 dark:text-gold-400 tracking-wide mb-4 drop-shadow-sm">
          उदय <span className="text-saffron-500 text-2xl sm:text-4xl font-light">संग</span> ज्योती
        </h1>

        {/* Date: रविवार 22.11.2026 */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold-500/50 bg-cream-200/80 dark:bg-darkbg-800/90 text-maroon-900 dark:text-gold-200 font-semibold text-lg sm:text-xl shadow-sm mb-8">
          <Calendar className="w-5 h-5 text-saffron-500" />
          <span>रविवार 22.11.2026</span>
        </div>

        {/* Floral shower button */}
        <div className="mb-8">
          <button
            onClick={triggerFloralShower}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-saffron-500/15 hover:bg-saffron-500/25 text-saffron-700 dark:text-gold-300 border border-saffron-500/30 transition-all hover:scale-105"
            aria-label="पुष्प वर्षा करें"
          >
            <Sparkles className="w-4 h-4 text-saffron-500" />
            <span>शुभकामनाओं की पुष्प वर्षा करें</span>
          </button>
        </div>

        {/* Live Countdown to 2026-11-22 20:00 IST (Hide when finished) */}
        {isClient && !timeLeft.isFinished && (
          <div className="mt-2 pt-6 border-t border-gold-400/30">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-maroon-700 dark:text-gold-400 mb-3">
              शुभ लग्न वेला की प्रतीक्षा (उलटी गिनती)
            </p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              {/* Days */}
              <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-900 border border-gold-400/40 shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-maroon-800 dark:text-gold-300">
                  {timeLeft.days}
                </span>
                <span className="text-[11px] sm:text-xs text-maroon-700/80 dark:text-cream-300 font-medium">
                  दिन
                </span>
              </div>
              {/* Hours */}
              <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-900 border border-gold-400/40 shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-maroon-800 dark:text-gold-300">
                  {timeLeft.hours}
                </span>
                <span className="text-[11px] sm:text-xs text-maroon-700/80 dark:text-cream-300 font-medium">
                  घंटे
                </span>
              </div>
              {/* Minutes */}
              <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-900 border border-gold-400/40 shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-maroon-800 dark:text-gold-300">
                  {timeLeft.minutes}
                </span>
                <span className="text-[11px] sm:text-xs text-maroon-700/80 dark:text-cream-300 font-medium">
                  मिनट
                </span>
              </div>
              {/* Seconds */}
              <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-cream-50 dark:bg-darkbg-900 border border-gold-400/40 shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-saffron-600 dark:text-saffron-400">
                  {timeLeft.seconds}
                </span>
                <span className="text-[11px] sm:text-xs text-maroon-700/80 dark:text-cream-300 font-medium">
                  सेकंड
                </span>
              </div>
            </div>
            <p className="text-[11px] text-maroon-700/70 dark:text-gold-400/70 mt-2">
              लग्न मुहूर्त: 22 नवम्बर 2026, रात्रि 8:00 बजे
            </p>
          </div>
        )}
      </div>

      {/* Scroll down indicator */}
      <a
        href="#nimantran"
        className="mt-8 flex flex-col items-center text-maroon-700 dark:text-gold-400 hover:text-saffron-600 transition-colors animate-bounce"
        aria-label="शुभ निमंत्रण अनुभाग पर जाएं"
      >
        <span className="text-xs font-semibold tracking-wider mb-1">शुभ निमंत्रण</span>
        <div className="w-5 h-8 rounded-full border-2 border-gold-400 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-saffron-500 animate-pulse" />
        </div>
      </a>
    </section>
  );
};
