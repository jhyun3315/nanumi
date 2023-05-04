/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      },

      colors: {
        gray: {
          100: '#E0E6E9',
          500: '#ABBBC2',
          700: '#393C49',
          800: '#1F1D2B',
          900: '#252836',
        },
      },
    },
  },
  plugins: [],
};
