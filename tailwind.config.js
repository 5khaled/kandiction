import fluid, { extract, fontSize } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },
  theme: {
    fontSize,
    extend: {
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-10vh)" },
          "100%": { transform: "translateY(110vh)" },
        },
      },
      minHeight: {
        "outlet-dvh": "calc(100dvh - 60px)",
      },
      fontFamily: {
        mplus: ["Mplus1M", "sans-serif"],
        japaneseRadicals: ["JapaneseRadicals", "sans-serif"],
      },
      screens: {
        "2xs": "25rem", // 400px -> 25rem
        xs: "31.25rem", // 500px -> 31.25rem
        sm: "40rem", // 640px -> 40rem
        md: "48rem", // 768px -> 48rem
        lg: "64rem", // 1024px -> 64rem
        xl: "80rem", // 1280px -> 80rem
        "2xl": "96rem", // 1536px -> 96rem
      },
    },
  },
  darkMode: "selector",
  plugins: [
    function ({ addVariant }) {
      addVariant("can-hover", "@media (hover: hover)");
    },
    function ({ addUtilities }) {
      addUtilities({
        ".color-scheme-light": {
          colorScheme: "light",
        },
        ".color-scheme-dark": {
          colorScheme: "dark",
        },
      });
    },
    fluid,
  ],
};
