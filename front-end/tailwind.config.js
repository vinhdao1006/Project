/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        'bimec-green': '#5f8d4d',
        'bimec-heavy-green': '#285430',
        'bimec-red': '#E2315C',
        'bimec-gray': '#C9C9C9',
        'bimec-light-green': '#F4FFF3',
        'bimec-black': '#181C32',
        'home-button': '#295430',
      },
      fontFamily:
      {
        yeseva: ['"Yeseva One"'],
        sans: ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

