"use client";

import React, { useState, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";
import { Send, Heart, Sparkles, MessageSquareHeart, Share2 } from "lucide-react";
import { OrnamentalDivider } from "./Motifs";

export interface Blessing {
  id: string;
  name: string;
  city?: string;
  message: string;
  likes: number;
  timestamp: string;
}

const PRESET_BLESSINGS = [
  "सदा सुखी रहो, जोड़ी सलामत रहे! 💐",
  "उदय और ज्योती को पावन परिणय की हार्दिक शुभकामनाएं! ✨",
  "भगवान श्री गणेश का शुभाशीर्वाद सदैव आप दोनों पर बना रहे! 🪔",
  "जीवन का हर पल खुशियों से भरा हो! 💖",
];

const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: "b-1",
    name: "समस्त सिंह परिवार",
    city: "छड़ापट्टी",
    message: "नव युगल को हमारे कुलदेवता एवं पूर्वजों का अनंत शुभाशीर्वाद। सदा प्रेम और सौहार्द बना रहे।",
    likes: 48,
    timestamp: "2026-11-20",
  },
  {
    id: "b-2",
    name: "मित्र एवं शुभचिंतक",
    city: "मधुबनी",
    message: "उदय और ज्योती को वैवाहिक जीवन के इस मंगलमय सफर की अनंत बधाई एवं शुभकामनाएं!",
    likes: 35,
    timestamp: "2026-11-21",
  },
];

function subscribeBlessings(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("wedding_blessings_updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("wedding_blessings_updated", callback);
    window.removeEventListener("storage", callback);
  };
}

const EMPTY_LIKED_IDS: string[] = [];

let cachedBlessings: Blessing[] = INITIAL_BLESSINGS;
let cachedBlessingsRaw = "";

function getBlessingsSnapshot(): Blessing[] {
  if (typeof window === "undefined") return INITIAL_BLESSINGS;
  const raw = localStorage.getItem("wedding_blessings");
  if (!raw) return INITIAL_BLESSINGS;
  if (raw !== cachedBlessingsRaw) {
    try {
      cachedBlessings = JSON.parse(raw);
      cachedBlessingsRaw = raw;
    } catch {
      return INITIAL_BLESSINGS;
    }
  }
  return cachedBlessings;
}

let cachedLikedIds: string[] = EMPTY_LIKED_IDS;
let cachedLikedIdsRaw = "";

function getLikedIdsSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_LIKED_IDS;
  const raw = localStorage.getItem("wedding_liked_blessings");
  if (!raw) return EMPTY_LIKED_IDS;
  if (raw !== cachedLikedIdsRaw) {
    try {
      cachedLikedIds = JSON.parse(raw);
      cachedLikedIdsRaw = raw;
    } catch {
      return EMPTY_LIKED_IDS;
    }
  }
  return cachedLikedIds;
}

function getServerSnapshotBlessings(): Blessing[] {
  return INITIAL_BLESSINGS;
}

function getServerSnapshotLikedIds(): string[] {
  return EMPTY_LIKED_IDS;
}

export const AashirvaadWall: React.FC = () => {
  const blessings = useSyncExternalStore(
    subscribeBlessings,
    getBlessingsSnapshot,
    getServerSnapshotBlessings
  );
  const likedIds = useSyncExternalStore(
    subscribeBlessings,
    getLikedIdsSnapshot,
    getServerSnapshotLikedIds
  );

  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const handleLike = (id: string) => {
    if (likedIds.includes(id)) return;
    const updated = blessings.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b));
    const nextLiked = [...likedIds, id];

    localStorage.setItem("wedding_blessings", JSON.stringify(updated));
    localStorage.setItem("wedding_liked_blessings", JSON.stringify(nextLiked));
    window.dispatchEvent(new Event("wedding_blessings_updated"));

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
      colors: ["#e8741a", "#c8962b", "#8a1c3c"],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newBlessing: Blessing = {
      id: `blessing-${Date.now()}`,
      name: name.trim(),
      city: city.trim() || "शुभचिंतक",
      message: message.trim(),
      likes: 1,
      timestamp: "आज",
    };

    const updated = [newBlessing, ...blessings];
    localStorage.setItem("wedding_blessings", JSON.stringify(updated));
    window.dispatchEvent(new Event("wedding_blessings_updated"));

    // Celebration burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#e8741a", "#c8962b", "#8a1c3c", "#14b8a6", "#fffdfa"],
    });

    setName("");
    setCity("");
    setMessage("");
    setIsSubmitting(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const sendToWhatsApp = (blessingText: string, sender: string) => {
    const text = encodeURIComponent(
      `नमस्ते! विवाह उत्सव के लिए मेरा शुभकामना संदेश:\n\n"${blessingText}"\n\n— ${sender}\n(उदय संग ज्योती शुभ विवाह)`
    );
    window.open(`https://wa.me/917986958105?text=${text}`, "_blank");
  };

  return (
    <section id="blessings" className="py-16 sm:py-24 px-4 bg-cream-50 dark:bg-darkbg-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <OrnamentalDivider title="शुभकामना एवं आशीर्वाद पट्टिका" icon="diya" className="mb-4" />

        <p className="text-center text-sm sm:text-base text-maroon-800/80 dark:text-gold-300/80 max-w-xl mx-auto mb-8 font-medium">
          नव युगल उदय और ज्योती के नाम अपना स्नेहिल आशीर्वाद एवं मंगलकामनाएं प्रेषित करें
        </p>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-teal-600 text-white text-center text-sm font-semibold shadow-lg flex items-center justify-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span>आपका आशीर्वाद सफलतापूर्वक पट्टिका पर अंकित हो गया है!</span>
          </div>
        )}

        {/* Blessing Form */}
        <div className="relative mb-12 p-6 sm:p-8 rounded-3xl bg-cream-100/90 dark:bg-darkbg-850/90 border-2 border-gold-400/40 shadow-xl shadow-gold/5">
          <div className="flex items-center gap-2 text-maroon-800 dark:text-gold-300 font-heading font-bold text-lg sm:text-xl mb-4">
            <MessageSquareHeart className="w-5 h-5 text-saffron-500" />
            <span>आशीर्वाद संदेश लिखें</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  आपका शुभ नाम:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा० रमेश कुमार"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400/40 bg-cream-50 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  शहर / स्थान (वैकल्पिक):
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="उदा० पटना, मधुबनी, दिल्ली"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400/40 bg-cream-50 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                आशीर्वाद / शुभकामना संदेश:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="वर-वधू के लिए अपनी मंगलकामनाएं लिखें..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gold-400/40 bg-cream-50 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
              />
            </div>

            {/* Quick preset chips */}
            <div>
              <span className="text-[11px] font-semibold text-maroon-700/80 dark:text-gold-400/80 block mb-1.5">
                त्वरित संदेश चुनें (Quick Pick):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_BLESSINGS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(preset)}
                    className="text-xs px-3 py-1 rounded-full bg-cream-50 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-200 border border-gold-400/30 hover:border-gold-500 hover:bg-gold-500/10 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-maroon-800 hover:bg-maroon-700 text-gold-300 hover:text-white font-bold text-sm shadow-md transition-all border border-gold-500"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>आशीर्वाद प्रेषित करें</span>
              </button>

              {message && name && (
                <button
                  type="button"
                  onClick={() => sendToWhatsApp(message, name)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp पर भी भेजें</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Blessings Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {blessings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-cream-100/70 dark:bg-darkbg-850/70 border border-gold-400/30 hover:border-gold-500 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-saffron-500/20 text-saffron-700 dark:text-gold-300 flex items-center justify-center text-xs font-bold font-heading">
                      {b.name.charAt(0)}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-maroon-900 dark:text-gold-200">
                        {b.name}
                      </h4>
                      {b.city && (
                        <span className="text-[10px] text-maroon-700/70 dark:text-cream-400 block">
                          {b.city}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-maroon-700/60 dark:text-gold-400/60">
                    {b.timestamp}
                  </span>
                </div>

                <p className="text-sm font-heading leading-relaxed text-maroon-900/90 dark:text-cream-200 mb-4 italic">
                  &ldquo;{b.message}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gold-400/20">
                <button
                  type="button"
                  onClick={() => handleLike(b.id)}
                  disabled={likedIds.includes(b.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    likedIds.includes(b.id)
                      ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30"
                      : "bg-cream-50 dark:bg-darkbg-900 text-maroon-800 dark:text-gold-300 border border-gold-400/30 hover:border-gold-500"
                  }`}
                  aria-label="शुभकामना पसंद करें"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedIds.includes(b.id) ? "fill-red-500 text-red-500" : "text-maroon-700 dark:text-gold-400"
                    }`}
                  />
                  <span>{b.likes} आशीर्वाद</span>
                </button>

                <button
                  type="button"
                  onClick={() => sendToWhatsApp(b.message, b.name)}
                  className="text-xs text-teal-700 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                  title="WhatsApp पर भेजें"
                >
                  <Share2 className="w-3 h-3" />
                  <span>साझा करें</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
