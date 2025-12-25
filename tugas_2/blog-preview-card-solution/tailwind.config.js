/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: 'hsl(47, 88%, 63%)',
        white: 'hsl(0, 0%, 100%)',
        grey: {
          500: 'hsl(0, 0%, 42%)',
          950: 'hsl(0, 0%, 7%)',
        }
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
      },
      boxShadow: {
        'card': '8px 8px 0px 0px hsl(0, 0%, 7%)',
        'card-hover': '16px 16px 0px 0px hsl(0, 0%, 7%)', // exaggerated for checking, likely just same or offset
      }
    },
  },
  plugins: [],
}
