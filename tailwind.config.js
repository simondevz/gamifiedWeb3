/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xs": "320px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#0019FF",
        transparent: "transparent",
        pale_blue: "#7482FF",
        ash: "#D9D9D9",
        deep_blue: "#080DBA",
        white_ish: "#F6F6F6",
        ash_2: "#686868",
        sky_blue: "#D4F7FF",
        tw: "#ea3820", // triple word color, double letter etc
        dl: "#afcbef",
        tl: "#0a8fdf",
        dw: "#e5b5b3",
        tile_color: "#A1662F",
        purple: "#481484",
        light_purple: "#b6a1ce",
        dark_text_bg: "#191919",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jomo: ["Jomolhari", "sans-serif"],
        racing: ["RacingSansOne", "sans-serif"],
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
