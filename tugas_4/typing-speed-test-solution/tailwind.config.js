/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neutral: {
                    900: 'hsl(0, 0%, 7%)',
                    800: 'hsl(0, 0%, 15%)',
                    500: 'hsl(240, 3%, 46%)',
                    400: 'hsl(240, 1%, 59%)',
                    0: 'hsl(0, 0%, 100%)',
                },
                blue: {
                    600: 'hsl(214, 100%, 55%)',
                    400: 'hsl(210, 100%, 65%)',
                },
                red: {
                    500: 'hsl(354, 63%, 57%)',
                },
                green: {
                    500: 'hsl(140, 63%, 57%)',
                },
                yellow: {
                    400: 'hsl(49, 85%, 70%)',
                }
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                }
            }
        },
    },
    plugins: [],
}
