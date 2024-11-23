
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '10p': '10%',
        '15p':'15%',
        '20p': '20%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '59p':'59%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '100p': '100%',
      },
      height: {
        '8p':'8%',
        '85p':'85%',
        '10p': '10%',
        '20p': '20%',
        '15p':'15%',
        '30p': '30%',
        '40p': '40%',
        '50p': '50%',
        '59p':'59%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
        '90p': '90%',
        '92p':'92%',
        '100p': '100%',
      },
      screens: {
        sm: { min: '300px', max: '600px' },
    },
    colors: {
      lightCream: '#F3F3E0',
      deepBlue: '#133E87',
      skyBlue: '#608BC1',
      paleBlue: '#CBDCEB',
    },
  },
  plugins: [],
}
}
