import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "#0F3D2E",
          gold: "#D4AF37",
          cream: "#F8F4E9",
          dark: "#111827",
          accent: "#E8C77A",
          ember: "#8A3B12",
          leaf: "#47714F"
        }
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 24px 80px rgba(15, 61, 46, 0.16)",
        gold: "0 16px 48px rgba(212, 175, 55, 0.24)"
      },
      backgroundImage: {
        "tea-radial": "radial-gradient(circle at 25% 20%, rgba(212, 175, 55, 0.16), transparent 32%), linear-gradient(135deg, #0F3D2E 0%, #13241F 58%, #111827 100%)"
      }
    }
  },
  plugins: []
};

export default config;
