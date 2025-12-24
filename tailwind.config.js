/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'desktop': '1400px', // Naša nova granica za meni
      },
      colors: {
        ocean: "#0B2C5F",        // Tamna mornarska sa slike
        "ocean-light": "#F2F8FC", // Svetlo plava pozadina sajta
        aqua: "#4FD1C5",         // Tirkizni akcenat
        deep: "#05162E",         // Još tamnija za footer i Why Us
      },
      boxShadow: {
        card: "0 10px 40px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};