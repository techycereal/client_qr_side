/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arsenal: ['"Arsenal SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}