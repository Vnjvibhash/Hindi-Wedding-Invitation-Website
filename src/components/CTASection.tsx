import React from "react";
import { Phone, MessageCircle, Heart, Sparkles } from "lucide-react";
import { DiyaMotif, PaisleyMotif } from "./Motifs";

export const CTASection: React.FC = () => {
  const whatsappMessage = encodeURIComponent(
    "नमस्ते, उदय और ज्योती के शुभ विवाह की बहुत-बहुत बधाई एवं मंगलकामनाएं!"
  );
  const whatsappUrl = `https://wa.me/917986958105?text=${whatsappMessage}`;
  const callUrl = "tel:7986958105";

  return (
    <>
      {/* In-page CTA Section */}
      <section className="py-16 px-4 bg-cream-100 dark:bg-darkbg-900 border-t border-gold-400/20 text-center">
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 text-cream-50 border-2 border-gold-500 shadow-2xl relative overflow-hidden">
          {/* Subtle motifs background */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-15 pointer-events-none">
            <PaisleyMotif className="w-48 h-48 text-gold-400" />
          </div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 opacity-15 pointer-events-none">
            <PaisleyMotif className="w-48 h-48 text-gold-400" flip />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs sm:text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>शुभकामनाएं एवं संपर्क</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-gold-300 mb-3 tracking-wide">
              वर-वधू को अपना स्नेहिल आशीर्वाद दें
            </h2>

            <p className="text-sm sm:text-base text-cream-200/90 max-w-lg mb-8 leading-relaxed font-light">
              विवाह संबंधी किसी भी जानकारी अथवा वर-वधू को बधाई संदेश भेजने के लिए सीधे WhatsApp या कॉल के माध्यम से संपर्क करें।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-teal-900/40 transition-all hover:scale-105 border border-teal-400/40"
                aria-label="WhatsApp पर बधाई संदेश भेजें"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp पर बधाई दें</span>
              </a>

              {/* Call Button */}
              <a
                href={callUrl}
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gold-500 hover:bg-gold-400 text-maroon-950 font-bold text-sm sm:text-base shadow-lg shadow-gold-900/40 transition-all hover:scale-105 border border-gold-300"
                aria-label="कॉल करें: 7986958105"
              >
                <Phone className="w-5 h-5 text-maroon-900" />
                <span>कॉल करें</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Quick Action Bar for Mobile Viewers */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-cream-100/95 dark:bg-darkbg-900/95 border-t border-gold-400/30 backdrop-blur-md shadow-2xl sm:hidden">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-600 text-white text-xs font-bold shadow transition-transform active:scale-95"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp संदेश</span>
          </a>

          <a
            href={callUrl}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-maroon-800 text-gold-300 text-xs font-bold shadow border border-gold-500 transition-transform active:scale-95"
            aria-label="कॉल करें"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>कॉल: 7986958105</span>
          </a>
        </div>
      </div>
    </>
  );
};
