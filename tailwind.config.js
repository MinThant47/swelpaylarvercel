/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f79726",
          900: "#FF7c00",
        },
        secondary: "#808080",
        green: "#52cf67",
        purple: "#ae00a7",
        card: "#262626",
      },
      fontFamily: {
        clashBold: ["ClashDisplay-Bold", "sans-serif"],
        clashSemibold: ["ClashDisplay-Semibold", "sans-serif"],
        clashMedium: ["ClashDisplay-Medium", "sans-serif"],
        clashRegular: ["ClashDisplay-Regular", "sans-serif"],
        clashLight: ["ClashDisplay-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};
