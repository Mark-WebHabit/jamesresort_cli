/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/images/resort_bg.jpeg')",
      },
      fontFamily: {
        logo: ['"Bricolage Grotesque"', "serif"],
      },
    },
  },
  plugins: [],
};
