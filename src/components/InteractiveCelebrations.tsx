"use client";

import React, { useState, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Flame, Share2, Check, Copy, MessageCircle, Heart, Volume2, VolumeX } from "lucide-react";
import { useWeddingAudio } from "@/utils/useWeddingAudio";

function subscribeCelebrations(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("wedding_celebrations_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("wedding_celebrations_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function getDiyasSnapshot(): number {
  if (typeof window === "undefined") return 108;
  const stored = localStorage.getItem("wedding_diyas_lit");
  return stored ? parseInt(stored, 10) : 108;
}

function getUserLitDiyaSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("wedding_user_lit_diya") === "true";
}

const getServerDiyasSnapshot = () => 108;
const getServerUserLitSnapshot = () => false;

export const InteractiveCelebrations: React.FC = () => {
  const diyasLit = useSyncExternalStore(subscribeCelebrations, getDiyasSnapshot, getServerDiyasSnapshot);
  const hasLitDiya = useSyncExternalStore(subscribeCelebrations, getUserLitDiyaSnapshot, getServerUserLitSnapshot);
  const { isPlaying, toggle } = useWeddingAudio();

  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showRsvpModal, setShowRsvpModal] = useState<boolean>(false);

  // RSVP Form States
  const [guestName, setGuestName] = useState<string>("");
  const [guestCount, setGuestCount] = useState<string>("1");
  const [attendance, setAttendance] = useState<string>("yes_family");

  const handleLightDiya = () => {
    if (!hasLitDiya) {
      const nextCount = diyasLit + 1;
      localStorage.setItem("wedding_diyas_lit", nextCount.toString());
      localStorage.setItem("wedding_user_lit_diya", "true");
      window.dispatchEvent(new Event("wedding_celebrations_updated"));
    }

    // Auspicious golden burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ["#ffd700", "#e8741a", "#c8962b", "#ff9933"],
    });
  };

  const handleFloralShower = () => {
    // Flower petals shower
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.3 },
      colors: ["#e8741a", "#c8962b", "#8a1c3c", "#f3a9b8", "#14b8a6"],
      shapes: ["circle"],
      scalar: 1.2,
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: "शुभ विवाह – उदय संग ज्योती",
      text: "।। श्री गणेशाय नमः ।। उदय संग ज्योती के पावन विवाह उत्सव का सादर निमंत्रण।",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const attendanceText =
      attendance === "yes_family"
        ? "हाँ, हम सपरिवार अवश्य पधारेंगे।"
        : attendance === "yes"
        ? "हाँ, मैं अवश्य पधारूँगा।"
        : "शुभकामनाएं प्रेषित! किसी कारणवश उपस्थित नहीं हो पाऊँगा।";

    const message = encodeURIComponent(
      `नमस्ते! उदय और ज्योती के विवाह निमंत्रण के लिए सादर धन्यवाद।\n\nउपस्थिति विवरण:\n- अतिथि का नाम: ${guestName}\n- सदस्यों की संख्या: ${guestCount}\n- स्थिति: ${attendanceText}`
    );

    window.open(`https://wa.me/917986958105?text=${message}`, "_blank");
    setShowRsvpModal(false);
  };

  return (
    <>
      {/* Floating Interactive Quick Bar (Desktop right edge & Mobile bottom) */}
      <div className="fixed right-3 bottom-20 sm:bottom-6 z-40 flex flex-col gap-2.5 items-end">
        {/* Prominent Music Play / Stop Floating Button */}
        <button
          onClick={toggle}
          type="button"
          className={`group flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border backdrop-blur-md ${
            isPlaying
              ? "bg-maroon-800 text-gold-300 border-gold-500 shadow-gold ring-2 ring-gold-400"
              : "bg-cream-100/95 dark:bg-darkbg-850/95 text-maroon-900 dark:text-gold-200 border-gold-400/80 hover:border-gold-500"
          }`}
          title={isPlaying ? "मांगलिक संगीत रोकें / Stop Music" : "विवाह गीत बजाएं"}
          aria-label={isPlaying ? "मांगलिक संगीत रोकें" : "विवाह गीत बजाएं"}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
              <span className="text-xs font-bold text-gold-200">संगीत रोकें (Stop)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
              <span className="hidden sm:inline text-xs font-bold">विवाह गीत बजाएं</span>
            </>
          )}
        </button>

        {/* Flower shower button */}
        <button
          onClick={handleFloralShower}
          type="button"
          className="group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all border border-saffron-300 backdrop-blur-md"
          title="पुष्प वर्षा करें"
          aria-label="पुष्प वर्षा करें"
        >
          <Sparkles className="w-4 h-4 text-gold-200 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold">पुष्प वर्षा</span>
        </button>

        {/* Light Diya button */}
        <button
          onClick={handleLightDiya}
          type="button"
          className={`group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all border backdrop-blur-md ${
            hasLitDiya
              ? "bg-maroon-800 text-gold-300 border-gold-500 shadow-gold"
              : "bg-cream-100/95 dark:bg-darkbg-850/95 text-maroon-900 dark:text-gold-200 border-gold-400"
          }`}
          title="मंगल दीपक प्रज्वलित करें"
          aria-label="मंगल दीपक प्रज्वलित करें"
        >
          <Flame className={`w-4 h-4 text-saffron-500 ${hasLitDiya ? "animate-pulse" : ""}`} />
          <span className="hidden sm:inline text-xs font-bold">
            {hasLitDiya ? `दीपक प्रज्वलित (${diyasLit})` : `दीप जलाएं (${diyasLit})`}
          </span>
        </button>

        {/* RSVP button */}
        <button
          onClick={() => setShowRsvpModal(true)}
          type="button"
          className="group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all border border-teal-400"
          title="उपस्थिति दर्ज करें (RSVP)"
          aria-label="उपस्थिति दर्ज करें (RSVP)"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-bold">RSVP उपस्थिति</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          type="button"
          className="group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-cream-100/95 dark:bg-darkbg-850/95 text-maroon-900 dark:text-gold-200 shadow-xl border border-gold-400 hover:border-gold-500 hover:scale-105 active:scale-95 transition-all"
          title="निमंत्रण साझा करें"
          aria-label="निमंत्रण साझा करें"
        >
          <Share2 className="w-4 h-4 text-gold-500" />
          <span className="hidden sm:inline text-xs font-bold">शेयर करें</span>
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="relative max-w-sm w-full bg-cream-50 dark:bg-darkbg-850 border-2 border-gold-400 rounded-3xl p-6 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-maroon-900 dark:text-gold-200 mb-2">
              विवाह निमंत्रण साझा करें
            </h3>
            <p className="text-xs text-maroon-700/80 dark:text-cream-300 mb-6">
              उदय संग ज्योती के विवाह का पावन निमंत्रण अपने परिजनों व मित्रों के साथ साझा करें।
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  "।। श्री गणेशाय नमः ।।\nउदय संग ज्योती के पावन विवाह उत्सव का सादर निमंत्रण।\nदिनांक: रविवार 22.11.2026\nनिमंत्रण पत्र देखें: " +
                    (typeof window !== "undefined" ? window.location.href : "")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp पर शेयर करें</span>
              </a>

              <button
                type="button"
                onClick={copyPageLink}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-gold-200 border border-gold-400 font-bold text-sm hover:bg-gold-500/10 transition-all"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>लिंक कॉपी हो गया!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gold-500" />
                    <span>लिंक कॉपी करें (Copy Link)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {showRsvpModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowRsvpModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-cream-50 dark:bg-darkbg-850 border-2 border-gold-400 rounded-3xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold-400/30">
              <div className="flex items-center gap-2 text-maroon-800 dark:text-gold-300 font-heading font-bold text-lg">
                <Heart className="w-5 h-5 text-saffron-500" />
                <span>उपस्थिति पुष्टिकरण (RSVP)</span>
              </div>
              <button
                onClick={() => setShowRsvpModal(false)}
                className="p-1 text-maroon-700 dark:text-gold-300 hover:text-maroon-900"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-maroon-900/80 dark:text-cream-200 mb-4">
              कृपया अपनी गरिमामयी उपस्थिति की पुष्टि करें ताकि हम आपके स्वागत की उत्तम व्यवस्था कर सकें।
            </p>

            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  आपका शुभ नाम:
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="उदा० संजय सिंह"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400/50 bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  उपस्थिति का विकल्प:
                </label>
                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400/50 bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="yes_family">हाँ, सपरिवार अवश्य पधारेंगे 🌸</option>
                  <option value="yes">हाँ, मैं अवश्य पधारूँगा ✨</option>
                  <option value="wishes">शुभकामनाएं प्रेषित (उपस्थित होना संभव नहीं)</option>
                </select>
              </div>

              {attendance !== "wishes" && (
                <div>
                  <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                    आने वाले सदस्यों की संख्या:
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gold-400/50 bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="1">1 सदस्य</option>
                    <option value="2">2 सदस्य</option>
                    <option value="3-4">3 से 4 सदस्य</option>
                    <option value="5+">5 या अधिक सदस्य (सपरिवार)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp द्वारा पुष्टि भेजें</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
