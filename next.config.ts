/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leafGreen: {
          50:  '#f0fff4',  // 🕊️ Mint Whisper
          100: '#ccf5d6',  // 🌿 Frosted Leaf
          150: '#b6f0c4',  // 🍃 Soft Sage
          200: '#a0ebaf',  // 🌱 Fresh Sprout
          250: '#8be79d',  // 🥒 Cucumber Tint
          300: '#76e18b',  // 🍏 Light Lime
          350: '#62dc7a',  // 💚 Minty Boost
          400: '#4dd669',  // 🫒 Vibrant Leaf
          450: '#3dd05a',  // 🌳 Spring Stem
          500: '#30c24e',  // ✅ Core Green
          550: '#28ae45',  // 🍀 Lush Clover
          600: '#219c3c',  // 🟢 Nature Core
          650: '#1b8a34',  // 🌾 Field Grass
          700: '#15792c',  // 🌲 Botanic Base
          750: '#116924',  // 🌿 Deep Garden
        },
      }
    },
  },
  plugins: [],
};
