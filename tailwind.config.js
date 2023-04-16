const { color } = require("@mui/system");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,png}", "./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        showIn: "showIn 200ms ease-in-out",
        showOut: "showOut 200ms ease-in-out",
      },

      keyframes: (theme) => ({
        showIn: {
          "0%": { transform: "scale(0)" },
          "100%": {},
        },
        showOut: {
          "0%": {},
          "100%": { transform: "scale(0)" },
        },
      }),

      colors: {
        themeBgBody: "rgb(214 214 214)",

        themeLighter: "rgb(188 206 230)",
        themeLight: "rgb(116 194 242)",
        themeMedium: "rgb(27 96 153)",
        themeDark: "rgb(27 96 153)",
        themeDarker: "rgb(17 49 107)",

        themeTextLight: "rgb(250 250 250)",
        themeTextMedium: "rgb(27 96 153)",
        themeTextDark: "rgb(17 49 107)",
      },
    },
  },
  extend: {},
  plugins: [require("tailwind-scrollbar")],
};
