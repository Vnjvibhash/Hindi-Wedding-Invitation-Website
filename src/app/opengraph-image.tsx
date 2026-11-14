import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "शुभ विवाह – उदय संग ज्योती";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #410718 0%, #8a1c3c 50%, #26131c 100%)",
          color: "#fffdfa",
          padding: "40px",
          border: "16px solid #c8962b",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            color: "#e8741a",
            fontWeight: "bold",
            marginBottom: "16px",
            letterSpacing: "4px",
          }}
        >
          ।। श्री गणेशाय नमः ।।
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#c8962b",
            fontWeight: "600",
            padding: "8px 24px",
            background: "rgba(200, 150, 43, 0.15)",
            borderRadius: "50px",
            border: "2px solid #c8962b",
            marginBottom: "24px",
          }}
        >
          शुभ विवाह
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "76px",
            fontWeight: "bold",
            color: "#ffeaa7",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          उदय संग ज्योती
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "32px",
            color: "#ffc171",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          रविवार 22.11.2026
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#f5eedc",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          विघ्न हरण मंगल करण, श्री गणपति महाराज। प्रथम निमंत्रण आपको, पूरण कीजे सब काज।।
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
