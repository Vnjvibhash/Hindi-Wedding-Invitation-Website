"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Sun, Moon, Menu, X, Volume2, VolumeX } from "lucide-react";
import { GaneshMotif } from "./Motifs";
import { useWeddingAudio } from "@/utils/useWeddingAudio";

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    mq.removeEventListener("change", callback);
  };
}

function getThemeSnapshot() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const getServerThemeSnapshot = () => false;

export const Navbar: React.FC = () => {
  const isDark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const { isPlaying, toggle } = useWeddingAudio();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const nextTheme = !isDark ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("storage"));
  };

  const navLinks = [
    { label: "गृह", href: "#hero" },
    { label: "शुभ निमंत्रण", href: "#nimantran" },
    { label: "कार्यक्रम", href: "#karyakram" },
    { label: "परिणयोत्सव", href: "#parinayotsav" },
    { label: "फोटो गैलरी", href: "#gallery" },
    { label: "शुभकामनाएं", href: "#blessings" },
    { label: "दर्शनाभिलाषी", href: "#darshan" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-100/95 dark:bg-darkbg-900/95 shadow-md border-b border-gold-400/20 backdrop-blur-md py-2"
          : "bg-cream-100/80 dark:bg-darkbg-900/80 backdrop-blur-sm py-3"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group text-maroon-800 dark:text-gold-300 transition-colors"
          aria-label="मुख्य पृष्ठ पर जाएं"
        >
          <GaneshMotif className="w-8 h-8 text-saffron-500 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base sm:text-lg leading-tight tracking-wide">
              उदय संग ज्योती
            </span>
            <span className="text-[10px] text-maroon-700/80 dark:text-gold-400 font-medium">
              शुभ विवाह • 22.11.2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="मुख्य नेविगेशन">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-maroon-900 dark:text-cream-200 hover:text-saffron-600 dark:hover:text-gold-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side controls: Music, Dark mode & Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Music Play / Stop Control Button */}
          <button
            onClick={toggle}
            type="button"
            className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-semibold shadow-sm ${
              isPlaying
                ? "bg-maroon-800 text-gold-300 border-gold-500 shadow-gold ring-2 ring-gold-400/50"
                : "bg-cream-50 dark:bg-darkbg-850 text-maroon-900 dark:text-gold-200 border-gold-400/40 hover:border-gold-500 hover:bg-gold-500/10"
            }`}
            aria-label={isPlaying ? "मांगलिक संगीत बंद करें" : "विवाह संगीत बजाएं"}
            title={isPlaying ? "संगीत रोकें / Stop Music" : "विवाह संगीत बजाएं / Play Vivah Music"}
          >
            {isPlaying ? (
              <>
                <div className="flex items-center gap-0.5 h-3 px-0.5">
                  <span className="w-0.5 h-2.5 bg-gold-400 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-saffron-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-gold-400 animate-pulse delay-150" />
                </div>
                <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                <span className="font-bold text-[11px] sm:text-xs text-gold-300">रोकें (Stop)</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-maroon-700 dark:text-gold-400" />
                <span className="text-[11px] sm:text-xs">विवाह गीत</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            type="button"
            className="p-2 rounded-full border border-gold-400/30 bg-cream-50 dark:bg-darkbg-850 text-maroon-800 dark:text-gold-300 hover:border-gold-500 transition-all shadow-sm"
            aria-label={isDark ? "लाइट मोड सक्रिय करें" : "डार्क मोड सक्रिय करें"}
            title={isDark ? "लाइट मोड" : "डार्क मोड"}
          >
            {isDark ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-maroon-700" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-full border border-gold-400/30 bg-cream-50 dark:bg-darkbg-850 text-maroon-800 dark:text-gold-300 hover:border-gold-500 transition-all"
            aria-label={isMobileMenuOpen ? "मेनू बंद करें" : "मेनू खोलें"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-cream-100/98 dark:bg-darkbg-900/98 border-b border-gold-500/30 shadow-xl backdrop-blur-lg px-6 py-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3" aria-label="मोबाइल नेविगेशन">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium py-2 px-3 rounded-lg text-maroon-900 dark:text-cream-200 hover:bg-gold-500/10 hover:text-saffron-600 dark:hover:text-gold-300 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
