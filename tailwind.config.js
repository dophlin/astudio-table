/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['NeutraText', 'sans-serif']
    },
    extend: {
      colors: {
        'as-black': '#322625',
        'as-gray': '#ebebeb',
        'as-blue': '#c0e3e5',
        'as-yellow': '#fdc936',
      }
    },
  },
  plugins: [require('tailwindcss-animated')],
}

