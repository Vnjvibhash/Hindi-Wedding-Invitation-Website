import type { Metadata } from "next";
import { Tiro_Devanagari_Hindi, Mukta } from "next/font/google";
import "./globals.css";

const tiroHindi = Tiro_Devanagari_Hindi({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro",
  display: "swap",
});

const mukta = Mukta({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "शुभ विवाह – उदय संग ज्योती",
  description:
    "विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजे सब काज।। रविवार 22.11.2026",
  metadataBase: new URL("https://uday-sang-jyoti-wedding.vercel.app"),
  openGraph: {
    title: "शुभ विवाह – उदय संग ज्योती",
    description:
      "विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजे सब काज।। रविवार 22.11.2026",
    url: "https://uday-sang-jyoti-wedding.vercel.app",
    siteName: "उदय संग ज्योती विवाह निमंत्रण",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "शुभ विवाह – उदय संग ज्योती",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "शुभ विवाह – उदय संग ज्योती",
    description:
      "विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजे सब काज।। रविवार 22.11.2026",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${tiroHindi.variable} ${mukta.variable} scroll-smooth`}>
      <body className="font-body bg-cream-100 text-maroon-950 dark:bg-darkbg-900 dark:text-cream-100 antialiased selection:bg-gold-500 selection:text-maroon-950 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
