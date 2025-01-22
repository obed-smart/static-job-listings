/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // ### Primary

        DesaturatedDarkCyan: "hsl(180, 29%, 50%)",

        // ### Neutral
        LightGrayishBackground: "hsl(180, 52%, 96%)",
        LightGrayishCyanFilter: "hsl(180, 31%, 95%)",
        DarkGrayishCyan: "hsl(180, 8%, 52%)",
        VeryDarkGrayishCyan: "hsl(180, 14%, 20%)",
      },
    },
  },
  plugins: [],
};
