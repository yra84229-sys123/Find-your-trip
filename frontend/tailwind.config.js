/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
