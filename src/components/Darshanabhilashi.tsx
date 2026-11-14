import React from "react";
import { OrnamentalDivider, CardCornerMotif, DiyaMotif, PaisleyMotif } from "./Motifs";
import { Phone, Users, HeartHandshake, Sparkles, Smile } from "lucide-react";

export const Darshanabhilashi: React.FC = () => {
  return (
    <section
      id="darshan"
      className="py-16 sm:py-24 px-4 bg-cream-200/50 dark:bg-darkbg-950 transition-colors"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <OrnamentalDivider title="दर्शनाभिलाषी एवं आकांक्षी" icon="diya" className="mb-4" />

        {/* Main Darshanabhilashi & Akankshi Card */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-cream-50/90 dark:bg-darkbg-850/90 border-2 border-gold-400/40 shadow-xl shadow-gold/5">
          <CardCornerMotif position="top-left" />
          <CardCornerMotif position="top-right" />
          <CardCornerMotif position="bottom-left" />
          <CardCornerMotif position="bottom-right" />

          {/* 1. दर्शनाभिलाषी */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-saffron-500" />
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-maroon-800 dark:text-gold-300">
                दर्शनाभिलाषी:
              </h3>
            </div>
            <p className="text-base sm:text-lg font-heading leading-relaxed text-maroon-900 dark:text-cream-200 font-medium pl-2 sm:pl-7">
              किशोर कुमार सिंह (बड़ा भाई), मोहन सिंह (जीजा जी), दिपु सिंह (जीजा जी),
              गंगा, शीखर, कृष्णा, संजीव, राजीव, प्रेम, प्रियांशु एवं समस्त सिंह परिवार।
            </p>
          </div>

          <div className="w-full h-px bg-gold-400/30 my-6" />

          {/* 2. आकांक्षी */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <HeartHandshake className="w-5 h-5 text-teal-600" />
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-maroon-800 dark:text-gold-300">
                आकांक्षी:
              </h3>
            </div>
            <div className="pl-2 sm:pl-7 flex flex-wrap items-center gap-3">
              <span className="text-base sm:text-lg font-heading font-semibold text-maroon-900 dark:text-cream-200">
                श्री शत्रुघ्न सिंह,
              </span>
              <a
                href="tel:7986958105"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 text-maroon-900 dark:text-gold-300 border border-gold-400/40 hover:border-gold-500 transition-all font-semibold text-sm sm:text-base group shadow-sm"
                aria-label="श्री शत्रुघ्न सिंह को कॉल करें: 7986958105"
              >
                <Phone className="w-4 h-4 text-saffron-600 dark:text-gold-400 group-hover:scale-110 transition-transform" />
                <span>मो० 7986958105</span>
              </a>
            </div>
          </div>

          {/* 3. बाल आग्रह (Playful Festive Badge) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-saffron-500/15 via-gold-500/15 to-maroon-800/10 border-2 border-saffron-500/40 dark:border-gold-500/40 shadow-inner">
            <div className="flex items-center gap-2 text-saffron-700 dark:text-saffron-400 font-bold text-sm sm:text-base mb-2">
              <Smile className="w-5 h-5" />
              <span>बाल आग्रह:</span>
              <Sparkles className="w-4 h-4 text-gold-500" />
            </div>
            <p className="font-heading text-base sm:text-xl font-semibold text-maroon-900 dark:text-gold-200 leading-relaxed italic">
              &ldquo;आइसक्रीम खिलाएंगे, पेप्सी भी पिलाएंगे, चाचू की शादी में सबको नचाएंगे… – प्रेम, प्रियांशु&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
