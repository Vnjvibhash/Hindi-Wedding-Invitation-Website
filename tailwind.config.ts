import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#f9d0d8",
          300: "#f3a9b8",
          400: "#e97791",
          500: "#d9496e",
          600: "#b92b51",
          700: "#9c1f3f",
          800: "#8a1c3c", // Primary Maroon
          900: "#6e1630",
          950: "#410718",
        },
        saffron: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc171",
          400: "#ff9d38",
          500: "#e8741a", // Primary Saffron
          600: "#d95f10",
          700: "#b4440f",
          800: "#903614",
          900: "#752e14",
          950: "#3f1406",
        },
        gold: {
          50: "#fbf8ec",
          100: "#f6efce",
          200: "#eedda0",
          300: "#e4c66c",
          400: "#dcaf42",
          500: "#c8962b", // Primary Gold
          600: "#b17a22",
          700: "#8c5b1d",
          800: "#73481e",
          900: "#603d1e",
          950: "#37200d",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        cream: {
          50: "#ffffff",
          100: "#fffdf9",
          200: "#fefaf2",
          300: "#fcf4e5",
          400: "#f8ebd2",
          500: "#f3deba",
        },
        darkbg: {
          800: "#26131c",
          850: "#200e16",
          900: "#180a11",
          950: "#12060c",
        },
      },
      fontFamily: {
        heading: ["var(--font-tiro)", "serif"],
        body: ["var(--font-mukta)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 4px 20px -2px rgba(200, 150, 43, 0.25)",
        maroon: "0 4px 20px -2px rgba(138, 28, 60, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
