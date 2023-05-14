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
      borderRadius: {
        '70px': '70px',
      },
      colors: {
        primary: '#0B65C6',
        secondary: '#EEF1F6',
        tertiary: '#0e1133',

        lightBlue: '#E1F6FE',
        lightPink: '#FDEEDC',
        lightGreen: '#E1FDE2',
      },
      lineHeight: {
        12: '1.2',
        13: '1.3',
        16: '1.6',
      },
    },
    screens: {
      lg: { max: '1800px' },
      md: { max: '990px' },
      sm: { max: '600px' },
      xs: { max: '400px' },
      minmd: '1700px',
      minlg: '2100px',
    },
    fontFamily: {
      IBMPlex: ['IBM Plex Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
