/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          light: '#FEBD69',
          dark: '#232F3E',
          blue: '#131921'  // Changed DEFAULT to blue for more semantic naming
        }
      }
    },
  },
  plugins: [],
}