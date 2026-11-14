"use client";

import React from "react";
import {
  OrnamentalDivider,
  CardCornerMotif,
  MusicalMotif,
  DiyaMotif,
  MarigoldMotif,
} from "./Motifs";
import { Calendar, Clock, MapPin, BellRing, Sparkles, AlertCircle } from "lucide-react";
import { downloadICS, getGoogleCalendarLink, WeddingEvent } from "@/utils/calendar";

export const ManglikKaryakram: React.FC = () => {
  const events = [
    {
      id: "tilak-mundan-bhoj",
      dateBadge: "20.11.2026 शुक्रवार",
      title: "शुभ तिलक, मुण्डन एवं प्रीतिभोज",
      time: "संध्या 5 बजे से",
      hasTodo: false,
      todoText: "",
      details: "समस्त सगे-संबंधियों व स्नेहीजनों के साथ शुभ तिलक एवं प्रीतिभोज।",
      highlight: false,
      eventData: {
        id: "tilak-mundan-bhoj",
        title: "शुभ तिलक, मुण्डन एवं प्रीतिभोज",
        description: "उदय संग ज्योती - शुभ तिलक, मुण्डन एवं प्रीतिभोज (संध्या 5 बजे से)",
        location: "ग्राम छड़ापट्टी, पो० बथनाहां, फुलपरास, मधुबनी, बिहार",
        startDate: "2026-11-20T17:00:00+05:30",
        endDate: "2026-11-20T22:00:00+05:30",
      } as WeddingEvent,
    },
    {
      id: "mundan-sanskar",
      dateBadge: "20.11.2026 शुक्रवार",
      title: "शुभ मुण्डन संस्कार",
      time: "दोपहर",
      hasTodo: true,
      todoText: "TODO exact time",
      details:
        "कुमार प्रेम बाबू एवं कुमार प्रियांशु बाबू, सुपुत्र श्री किशोर कुमार सिंह एवं श्रीमती संगीता देवी",
      highlight: false,
      eventData: {
        id: "mundan-sanskar",
        title: "शुभ मुण्डन संस्कार (प्रेम बाबू व प्रियांशु बाबू)",
        description:
          "कुमार प्रेम बाबू एवं कुमार प्रियांशु बाबू (सुपुत्र श्री किशोर कुमार सिंह एवं श्रीमती संगीता देवी) का शुभ मुण्डन संस्कार। समय: दोपहर (TODO exact time)",
        location: "ग्राम छड़ापट्टी, पो० बथनाहां, फुलपरास, मधुबनी, बिहार",
        startDate: "2026-11-20T12:00:00+05:30",
        endDate: "2026-11-20T15:00:00+05:30",
      } as WeddingEvent,
    },
    {
      id: "haldi-kalash-mehndi",
      dateBadge: "21.11.2026 शनिवार",
      title: "हल्दी कलश एवं मेहंदी",
      time: "मांगलिक वेला",
      hasTodo: false,
      todoText: "",
      details: "मांगलिक गीतों के साथ हल्दी कलश व सुहाग मेहंदी का पावन अनुष्ठान।",
      highlight: false,
      eventData: {
        id: "haldi-kalash-mehndi",
        title: "हल्दी कलश एवं मेहंदी",
        description: "उदय संग ज्योती - हल्दी कलश एवं मेहंदी रस्म",
        location: "ग्राम छड़ापट्टी, पो० बथनाहां, फुलपरास, मधुबनी, बिहार",
        startDate: "2026-11-21T10:00:00+05:30",
        endDate: "2026-11-21T16:00:00+05:30",
      } as WeddingEvent,
    },
    {
      id: "shubh-vivah-barat",
      dateBadge: "22.11.2026 रविवार",
      title: "बारात प्रस्थान एवं रात्रि में शुभ विवाह",
      time: "रात्रि लग्न",
      hasTodo: false,
      todoText: "",
      details:
        "शुभ लग्न मुहूर्त में वैवाहिक परिणय संस्कार। (बारात हमारे निवास स्थान छड़ापट्टी से संध्या 8 बजे निजी वाहन द्वारा सिकरीयाही के लिए प्रस्थान करेगी)",
      highlight: true,
      eventData: {
        id: "shubh-vivah-barat",
        title: "बारात प्रस्थान एवं रात्रि में शुभ विवाह",
        description:
          "उदय संग ज्योती - बारात प्रस्थान संध्या 8 बजे एवं रात्रि में शुभ विवाह। निवास स्थान छड़ापट्टी से सिकरीयाही।",
        location: "विवाह स्थल: ग्राम सिकरीयाही, थाना खुटौना, जिला मधुबनी, बिहार",
        startDate: "2026-11-22T20:00:00+05:30",
        endDate: "2026-11-23T04:00:00+05:30",
      } as WeddingEvent,
    },
  ];

  return (
    <section
      id="karyakram"
      className="py-16 sm:py-24 px-4 bg-cream-200/50 dark:bg-darkbg-950 transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <OrnamentalDivider title="मांगलिक कार्यक्रम" icon="diya" className="mb-4" />

        <p className="text-center text-sm sm:text-base text-maroon-800/80 dark:text-gold-300/80 max-w-xl mx-auto mb-12 font-medium">
          शुभ मुहूर्त एवं पावन रीति-रिवाजों की समय-सारणी
        </p>

        {/* Timeline Cards */}
        <div className="relative border-l-2 border-gold-400/50 ml-3 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {events.map((item) => (
            <div
              key={item.id}
              className={`relative group rounded-3xl p-5 sm:p-7 border transition-all duration-300 ${
                item.highlight
                  ? "bg-gradient-to-br from-cream-50 via-saffron-500/5 to-gold-500/10 dark:from-darkbg-850 dark:via-maroon-950/40 dark:to-darkbg-800 border-2 border-gold-500 shadow-xl shadow-gold/20 ring-1 ring-gold-400/50"
                  : "bg-cream-50/90 dark:bg-darkbg-850/80 border-gold-400/30 hover:border-gold-500/70 shadow-md hover:shadow-lg"
              }`}
            >
              {/* Timeline Marker Point */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-6 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-gold-500 ${
                  item.highlight
                    ? "bg-maroon-800 text-gold-300 animate-pulse"
                    : "bg-cream-100 dark:bg-darkbg-900 text-saffron-500"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.highlight ? "bg-gold-400" : "bg-saffron-500"
                  }`}
                />
              </div>

              {item.highlight && <CardCornerMotif position="top-right" />}

              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm ${
                    item.highlight
                      ? "bg-maroon-800 text-gold-300 border border-gold-400"
                      : "bg-gold-500/15 dark:bg-gold-500/20 text-maroon-900 dark:text-gold-200 border border-gold-400/40"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-saffron-500" />
                  {item.dateBadge}
                </span>

                {item.highlight && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-saffron-500 text-white shadow-sm animate-pulse-slow">
                    <Sparkles className="w-3 h-3" />
                    मुख्य वैवाहिक अनुष्ठान
                  </span>
                )}
              </div>

              {/* Event Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-maroon-900 dark:text-gold-300 mb-2">
                {item.title}
              </h3>

              {/* Event Time & TODO Badge */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-maroon-800 dark:text-cream-200 mb-3 font-medium">
                <div className="flex items-center gap-1.5 text-saffron-700 dark:text-saffron-400 font-semibold">
                  <Clock className="w-4 h-4 text-saffron-500" />
                  <span>{item.time}</span>
                </div>

                {item.hasTodo && (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/50 text-xs font-bold font-mono tracking-wide"
                    title="Exact time to be updated"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    TODO: {item.todoText} (समय निश्चित होना शेष है)
                  </span>
                )}
              </div>

              {/* Description / Names */}
              <p className="text-sm sm:text-base text-maroon-900/80 dark:text-cream-300 leading-relaxed mb-4">
                {item.details}
              </p>

              {/* Action Buttons: Add to Calendar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gold-400/20">
                <button
                  onClick={() => downloadICS(item.eventData)}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gold-500/10 hover:bg-gold-500/20 text-maroon-900 dark:text-gold-200 border border-gold-400/40 hover:border-gold-500 transition-all shadow-sm"
                  aria-label={`${item.title} को कैलेंडर (.ics) में जोड़ें`}
                >
                  <BellRing className="w-3.5 h-3.5 text-saffron-500" />
                  <span>कैलेंडर में जोड़ें (.ics)</span>
                </button>

                <a
                  href={getGoogleCalendarLink(item.eventData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cream-100 dark:bg-darkbg-900 hover:bg-gold-500/10 text-maroon-800 dark:text-cream-200 border border-gold-400/30 transition-all"
                  aria-label={`Google Calendar में ${item.title} जोड़ें`}
                >
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note Box */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-saffron-500/15 via-gold-500/15 to-maroon-800/15 border-2 border-saffron-500/40 dark:border-gold-500/40 shadow-lg text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2 text-saffron-700 dark:text-saffron-400 font-bold text-sm sm:text-base">
            <MusicalMotif className="w-5 h-5" />
            <span>विशेष बारात सूचना</span>
            <MusicalMotif className="w-5 h-5 -scale-x-100" />
          </div>
          <p className="font-heading text-base sm:text-lg font-semibold text-maroon-900 dark:text-gold-200 leading-relaxed">
            &ldquo;बारात हमारे निवास स्थान छड़ापट्टी से संध्या 8 बजे निजी वाहन द्वारा सिकरीयाही के लिए प्रस्थान करेगी।&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
