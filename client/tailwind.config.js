/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          text: '#E1FCFF',
          bg1: '#DADFE0',
          bg2: '#5D6566',
          bg3: '#3C4243',
          accent: '#088493',
        },
      },
    },
  },
  plugins: [],
};
