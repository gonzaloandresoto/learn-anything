/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      'primary-black': '#191919',
      'primary-teal': '#65918B',
      'secondary-teal': '#BDE3DE',
      'primary-tan': '#8E8A74',
      'secondary-tan': '#E7E1D2',
      'tertiary-tan': '#F0F0EA',
    },
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        secondary: ['Mukta', 'sans-serif'],
        tertiary: ['"Nanum Myeongjo"', 'serif'],
      },
    },
  },
  plugins: [],
};
