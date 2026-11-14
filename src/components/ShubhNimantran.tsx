import React from "react";
import { OrnamentalDivider, KalashMotif, CardCornerMotif, DiyaMotif, PaisleyMotif } from "./Motifs";

export const ShubhNimantran: React.FC = () => {
  const nimantranPoints = [
    { label: "वन्दनीय हैं", text: "श्री गणेश जी" },
    { label: "अनुकम्पा है", text: "आदिशक्ति माँ विन्ध्यवासिनी की" },
    { label: "अवसर है", text: "पावन परिणय उत्सव का" },
    { label: "आशीष है", text: "बुजुर्गों एवं वरिष्ठों का" },
    { label: "गूंजन है", text: "मांगलिक गीत संगीत एवं वाद्य यंत्रों का" },
    { label: "प्रतिफल है", text: "आपकी शुभ मंगल कामनाओं का" },
    { label: "साक्षी हैं", text: "धरती, अम्बर, अग्नि, वरुण, जल और आप" },
    { label: "प्रतीक्षा है", text: "नव युगल को आपके स्नेहिल आशीर्वाद की।" },
  ];

  return (
    <section
      id="nimantran"
      className="py-16 sm:py-24 px-4 bg-cream-100 dark:bg-darkbg-900 transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <OrnamentalDivider title="शुभ निमंत्रण" icon="kalash" className="mb-4" />

        <p className="text-center text-sm sm:text-base text-maroon-800/80 dark:text-gold-300/80 max-w-xl mx-auto mb-10 font-medium">
          परम पिता परमात्मा की असीम अनुकम्पा एवं पूज्य पूर्वजों के शुभाशीर्वाद से
        </p>

        {/* Parchment Styled Card */}
        <div className="relative p-6 sm:p-10 rounded-3xl border-2 border-gold-400/40 bg-cream-50/90 dark:bg-darkbg-850/90 shadow-xl shadow-gold/5">
          <CardCornerMotif position="top-left" />
          <CardCornerMotif position="top-right" />
          <CardCornerMotif position="bottom-left" />
          <CardCornerMotif position="bottom-right" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {nimantranPoints.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-cream-100/70 dark:bg-darkbg-900/60 border border-gold-400/30 hover:border-gold-500 hover:shadow-md transition-all duration-300"
              >
                {/* Sacred Icon Bullet */}
                <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-saffron-500/10 dark:bg-gold-500/10 flex items-center justify-center border border-saffron-500/30 group-hover:bg-saffron-500 group-hover:text-cream-50 transition-colors">
                  <span className="text-xs font-bold text-saffron-600 dark:text-gold-400 group-hover:text-white">
                    {idx + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <span className="inline-block text-xs uppercase tracking-wider font-bold text-saffron-600 dark:text-saffron-400 mb-0.5">
                    {item.label} –
                  </span>
                  <p className="text-base sm:text-lg font-heading font-semibold text-maroon-900 dark:text-cream-100 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Bottom Note */}
          <div className="mt-8 pt-6 border-t border-gold-400/30 flex items-center justify-center gap-2 text-center text-xs sm:text-sm text-maroon-700/80 dark:text-gold-300/70 italic">
            <DiyaMotif className="w-5 h-5 text-saffron-500" />
            <span>आपकी गरिमामयी उपस्थिति हमारे इस मांगलिक उत्सव की शोभा बढ़ाएगी।</span>
            <DiyaMotif className="w-5 h-5 text-saffron-500" />
          </div>
        </div>
      </div>
    </section>
  );
};
