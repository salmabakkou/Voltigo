/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7CFF3C",
        dark: "#0A1F2C",
        darkGreen: "#0F2A1E",
        accent: "#CFFF1A",
        text: "#F5F5F5"
      }
    }
  },
  plugins: [],
};