/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: 'hsl(158, 36%, 37%)',
          700: 'hsl(158, 42%, 18%)',
        },
        cream: 'hsl(30, 38%, 92%)',
        grey: 'hsl(228, 12%, 48%)',
        black: 'hsl(212, 21%, 14%)',
        white: 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      },
      letterSpacing: {
        'widest': '0.4em', // For PERFUME text
      }
    },
  },
  plugins: [],
}
