import React from "react";
import { GaneshMotif, DiyaMotif, MarigoldGarland } from "./Motifs";
import { Heart, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="pt-12 pb-24 sm:pb-12 bg-cream-200 dark:bg-darkbg-950 border-t border-gold-400/30 text-center relative overflow-hidden transition-colors">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Festive Marigold Garland */}
        <MarigoldGarland className="mb-6 opacity-75" />

        {/* Ganesh Motif */}
        <GaneshMotif className="w-10 h-10 text-saffron-500 mb-3" />

        {/* Couple Names */}
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-maroon-800 dark:text-gold-300 mb-1 tracking-wide">
          उदय संग ज्योती
        </h3>

        {/* Date */}
        <p className="text-sm sm:text-base font-semibold text-saffron-600 dark:text-gold-400 mb-4">
          शुभ विवाह • रविवार 22.11.2026
        </p>

        {/* Blessing verse */}
        <div className="font-heading italic text-xs sm:text-sm text-maroon-800/90 dark:text-gold-200/90 max-w-lg mb-8 leading-relaxed space-y-1">
          <p>&ldquo;मंगलं भगवान् विष्णुर्मंगलं गरुडध्वजः। मंगलं पुण्डरीकाक्षो मंगलाय तनोतु हरिः॥&rdquo;</p>
          <p>&ldquo;सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥&rdquo;</p>
        </div>

        <div className="w-full max-w-xs h-px bg-gold-400/30 mb-6" />

        {/* Back to top button */}
        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-maroon-800 dark:text-gold-300 hover:text-saffron-600 dark:hover:text-gold-100 transition-colors"
          aria-label="पृष्ठ के शीर्ष पर वापस जाएं"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>शीर्ष पर वापस जाएं</span>
        </a>

        <p className="text-[11px] text-maroon-700/60 dark:text-gold-400/50 mt-4">
          स्नेहिल आमंत्रण • समस्त सिंह परिवार
        </p>
      </div>
    </footer>
  );
};
