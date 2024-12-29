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

