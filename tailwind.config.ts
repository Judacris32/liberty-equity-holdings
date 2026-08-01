import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode surfaces
        midnight: "#07090e",
        slate: {
          surface: "#0d111c",
        },
        // Light mode surfaces
        platinum: "#f4f5f7",
        // Accents
        accent: {
          platinum: "#e2e8f0",
          gold: "#f5f5f7",
        },
        // Trend colors
        bull: "#00ff88",
        bear: "#ff3b30",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 24px 0 rgba(0, 255, 136, 0.15)",
        "glow-bear": "0 0 24px 0 rgba(255, 59, 48, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
