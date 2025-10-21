/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lux-dark": "#111111",
        "lux-light": "#f6f2ed",
        "lux-gold": "#d4a373"
      }
    }
  },
  plugins: []
};
