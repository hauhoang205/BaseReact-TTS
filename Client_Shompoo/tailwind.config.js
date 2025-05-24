/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Quan trọng!
  ],
  theme: {
    extend: {
      theme: {}
    },
  },
  plugins: [],
}