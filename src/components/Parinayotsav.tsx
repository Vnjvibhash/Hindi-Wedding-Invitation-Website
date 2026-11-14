import React from "react";
import {
  OrnamentalDivider,
  CardCornerMotif,
  KalashMotif,
  DiyaMotif,
  PaisleyMotif,
} from "./Motifs";
import { MapPin, ExternalLink, Heart, AlertCircle, Home, UserCheck } from "lucide-react";

export const Parinayotsav: React.FC = () => {
  const groomMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "छड़ापट्टी बथनाहां फुलपरास मधुबनी बिहार 847227"
  )}`;

  const brideMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "सिकरीयाही खुटौना मधुबनी बिहार 847227"
  )}`;

  return (
    <section
      id="parinayotsav"
      className="py-16 sm:py-24 px-4 bg-cream-100 dark:bg-darkbg-900 transition-colors"
    >
      <div className="max-w-5xl mx-auto">
        <OrnamentalDivider title="शुभ मंगल परिणयोत्सव" icon="ganesh" className="mb-4" />

        <p className="text-center text-sm sm:text-base text-maroon-800/80 dark:text-gold-300/80 max-w-xl mx-auto mb-12 font-medium">
          वर एवं वधू पक्ष का पावन परिचय एवं निवास स्थान
        </p>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: वर पक्ष (Groom's Side) */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-cream-50/90 dark:bg-darkbg-850/90 border-2 border-gold-400/40 hover:border-gold-500 shadow-xl shadow-gold/5 flex flex-col justify-between transition-all duration-300 group">
            <CardCornerMotif position="top-left" />
            <CardCornerMotif position="top-right" />
            <CardCornerMotif position="bottom-left" />
            <CardCornerMotif position="bottom-right" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gold-400/30">
                <span className="px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-maroon-800 text-gold-300 shadow-sm tracking-wider">
                  वर पक्ष
                </span>
                <span className="text-xs font-semibold text-saffron-600 dark:text-gold-400">
                  आयुष्मान्
                </span>
              </div>

              {/* Groom's Name */}
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-maroon-900 dark:text-gold-300 mb-4 group-hover:text-maroon-800 dark:group-hover:text-gold-200 transition-colors">
                आयुष्मान् राम उदय सिंह
              </h3>

              {/* Lineage & Parents */}
              <div className="space-y-3 text-sm sm:text-base text-maroon-900 dark:text-cream-200 mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-saffron-600 dark:text-gold-400 font-bold min-w-[70px]">
                    सुपौत्र:
                  </span>
                  <span className="font-medium">स्व० सोनाई सिंह</span>
                </div>

                <div className="flex items-start gap-2 flex-wrap">
                  <span className="text-saffron-600 dark:text-gold-400 font-bold min-w-[70px]">
                    सुपुत्र:
                  </span>
                  <div className="flex-1 flex flex-wrap items-center gap-1.5 font-medium">
                    <span>स्व० लखिया देवी एवं श्री</span>
                    {/* TODO Father's Name Placeholder */}
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/60 font-mono text-xs font-bold"
                      title="Father's name placeholder"
                    >
                      <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      TODO: father&apos;s name
                    </span>
                    <span>सिंह</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-gold-400/20">
                  <Home className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-xs uppercase font-bold text-saffron-600 dark:text-gold-400 block mb-0.5">
                      निवास स्थान:
                    </span>
                    <p className="leading-relaxed font-medium">
                      ग्राम छड़ापट्टी, पो० बथनाहां, थाना फुलपरास, जिला मधुबनी, बिहार, पिन 847227
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Search Button */}
            <div className="pt-4 border-t border-gold-400/30">
              <a
                href={groomMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-maroon-800 hover:bg-maroon-700 text-gold-300 hover:text-white border border-gold-500 shadow-md hover:shadow-lg transition-all"
                aria-label="वर पक्ष का निवास स्थान Google Maps पर देखें"
              >
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>मानचित्र पर देखें (Map)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Card 2: वधू पक्ष (Bride's Side) */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-cream-50/90 dark:bg-darkbg-850/90 border-2 border-gold-400/40 hover:border-gold-500 shadow-xl shadow-gold/5 flex flex-col justify-between transition-all duration-300 group">
            <CardCornerMotif position="top-left" />
            <CardCornerMotif position="top-right" />
            <CardCornerMotif position="bottom-left" />
            <CardCornerMotif position="bottom-right" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gold-400/30">
                <span className="px-4 py-1 rounded-full text-xs sm:text-sm font-bold bg-maroon-800 text-gold-300 shadow-sm tracking-wider">
                  वधू पक्ष
                </span>
                <span className="text-xs font-semibold text-saffron-600 dark:text-gold-400">
                  आयुष्मती
                </span>
              </div>

              {/* Bride's Name */}
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-maroon-900 dark:text-gold-300 mb-4 group-hover:text-maroon-800 dark:group-hover:text-gold-200 transition-colors">
                आयुष्मती कुमारी ज्योती
              </h3>

              {/* Lineage & Parents */}
              <div className="space-y-3 text-sm sm:text-base text-maroon-900 dark:text-cream-200 mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-saffron-600 dark:text-gold-400 font-bold min-w-[70px]">
                    सुपौत्री:
                  </span>
                  <span className="font-medium">योगेश्वर सिंह</span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-saffron-600 dark:text-gold-400 font-bold min-w-[70px]">
                    सुपुत्री:
                  </span>
                  <span className="font-medium">
                    श्रीमती राधा देवी एवं श्री दिलीप कुमार सिंह
                  </span>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-gold-400/20">
                  <Home className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-xs uppercase font-bold text-saffron-600 dark:text-gold-400 block mb-0.5">
                      निवास स्थान:
                    </span>
                    <p className="leading-relaxed font-medium">
                      ग्राम सिकरीयाही, थाना खुटौना, जिला मधुबनी, बिहार, पिन 847227
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Search Button */}
            <div className="pt-4 border-t border-gold-400/30">
              <a
                href={brideMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-maroon-800 hover:bg-maroon-700 text-gold-300 hover:text-white border border-gold-500 shadow-md hover:shadow-lg transition-all"
                aria-label="वधू पक्ष का निवास स्थान Google Maps पर देखें"
              >
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>मानचित्र पर देखें (Map)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
