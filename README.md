# शुभ विवाह – उदय संग ज्योती (Hindi Wedding Invitation Website)

A single-page, mobile-first, accessible Hindi wedding invitation website built with **Next.js (App Router)**, **Tailwind CSS**, and **TypeScript**.

## 🎨 Design System
- **Colors**: Maroon (`#8a1c3c`), Saffron (`#e8741a`), Gold (`#c8962b`), Teal accents, Cream background (`#fffdf7`), Rich Night Dark Mode (`#180a11` / `#26131c`).
- **Typography**: 
  - Headings: **Tiro Devanagari Hindi**
  - Body: **Mukta**
- **Ornaments**: Inline SVGs for Lord Ganesha, Mangal Kalash, Diya, Marigold garlands, Mandap frames, Shehnai & Paisley motifs.
- **Accessibility**: Full Hindi language tags (`lang="hi"`), ARIA labels, high-contrast color ratios, and `prefers-reduced-motion` support.

---

## 📋 Sections (in Order)
1. **Hero**: 
   - ।। श्री गणेशाय नमः ।।
   - Couplet: *"विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजे सब काज।।"*
   - Title: **शुभ विवाह**
   - Names: **उदय संग ज्योती**
   - Date: **रविवार 22.11.2026**
   - Live countdown to `2026-11-22 20:00 IST` (auto-hides when finished).
   - Interactive floral shower / congratulations confetti button.
2. **शुभ निमंत्रण**: Complete 8-point sacred invitation list with ornamental markers and parchment styling.
3. **मांगलिक कार्यक्रम**:
   - Timeline cards with date badges.
   - **20.11.2026 शुक्रवार**: शुभ तिलक, मुण्डन एवं प्रीतिभोज (संध्या 5 बजे से).
   - **20.11.2026 शुक्रवार**: शुभ मुण्डन संस्कार (दोपहर - **TODO exact time**).
   - **21.11.2026 शनिवार**: हल्दी कलश एवं मेहंदी.
   - **22.11.2026 रविवार**: बारात प्रस्थान एवं रात्रि में शुभ विवाह (**Highlighted**).
   - Special Note Box for Barat departure: *"बारात हमारे निवास स्थान छड़ापट्टी से संध्या 8 बजे निजी वाहन द्वारा सिकरीयाही के लिए प्रस्थान करेगी।"*
   - Add-to-Calendar (`.ics`) download & Google Calendar button for each event.
4. **शुभ मंगल परिणयोत्सव**:
   - **वर पक्ष**: आयुष्मान् राम उदय सिंह, सुपौत्र स्व० सोनाई सिंह, सुपुत्र स्व० लखिया देवी एवं श्री **(TODO father's name)** सिंह, ग्राम छड़ापट्टी। Includes Google Maps search link.
   - **वधू पक्ष**: आयुष्मती कुमारी ज्योती, सुपौत्री योगेश्वर सिंह, सुपुत्री श्रीमती राधा देवी एवं श्री दिलीप कुमार सिंह, ग्राम सिकरीयाही। Includes Google Maps search link.
5. **शुभ स्मृतियाँ (फोटो गैलरी)**:
   - **User Download**: Direct download button on every photo and in the full-screen lightbox.
   - **Admin Upload Mode**: Secure PIN login (`2026`) allowing admin to upload ceremony photos directly from their phone/computer. Photos are saved in browser **IndexedDB** and persist across sessions.
   - Category filtering (*सभी*, *मांगलिक रस्में*, *पारिवारिक*, *वर-वधू*).
6. **दर्शनाभिलाषी, आकांक्षी एवं बाल आग्रह**:
   - दर्शनाभिलाषी: किशोर कुमार सिंह (बड़ा भाई), मोहन सिंह (जीजा जी), दिपु सिंह (जीजा जी), गंगा, शीखर, कृष्णा, संजीव, राजीव, प्रेम, प्रियांशु एवं समस्त सिंह परिवार।
   - आकांक्षी: श्री शत्रुघ्न सिंह, मो० [7986958105](tel:7986958105).
   - बाल आग्रह: *"आइसक्रीम खिलाएंगे, पेप्सी भी पिलाएंगे, चाचू की शादी में सबको नचाएंगे… – प्रेम, प्रियांशु"*.
7. **CTA (Call to Action)**:
   - WhatsApp button (`wa.me/917986958105`) with prefilled Hindi message.
   - Direct Call button (`tel:7986958105`).
   - Sticky mobile bottom quick-action bar.
8. **Footer**:
   - Names: *उदय संग ज्योती*
   - Date: *22.11.2026*
   - Vedic blessing verse & Back to Top link.

---

## 🎵 Background Music
- Muted by default as required.
- Place any `music.mp3` file in the `public/` folder (`public/music.mp3`) and the toggle will play your custom wedding shehnai track.
- If no MP3 is supplied, clicking the audio toggle plays an auspicious synthesizer melody (Raag scale) via Web Audio API.

---

## 🖼️ Open Graph (Social Sharing)
- Dynamic 1200x630 Open Graph preview image generated at `/opengraph-image`.
- Title: *"शुभ विवाह – उदय संग ज्योती"*.

---

## 📌 TODO Placeholders Summary
1. **मांगलिक कार्यक्रम**:
   - `TODO exact time`: शुभ मुण्डन संस्कार के लिए सटीक समय (दोपहर `TODO exact time`).
2. **शुभ मंगल परिणयोत्सव (वर पक्ष)**:
   - `TODO father's name`: वर के पिता का नाम (`श्री (TODO father's name) सिंह`).

---

## 🚀 Running the Project
```bash
# Run ESLint
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```
