import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-bebas)", "sans-serif"],
      },
      colors: {
        brand: {
          black: "#0A0A0A",
          white: "#FAFAFA",
          accent: "#E8FF3D",
          gray: {
            50: "#F8F8F8",
            100: "#F0F0F0",
            200: "#E0E0E0",
            300: "#C0C0C0",
            400: "#909090",
            500: "#606060",
            600: "#404040",
            700: "#303030",
            800: "#202020",
            900: "#141414",
          },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
