/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0d6efd',
          dark: '#0b5ed7',
        },
        secondary: '#00A699',
        accent: '#0b5ed7',
      }
    },
  },
  plugins: [],
}
