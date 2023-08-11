/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        iphone8: '375px'
      },
      height: {
        iphone8: '665px'
      },
      backgroundImage: {
        custom1: 'linear-gradient(179.18deg, #1B0B27 0.7 %, #007EA7 47.43 %, #1B0B27 99.3 %)',
        mask1: 'linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(0, 0, 0, 0.87) 16.67%, #000000 51.04%, rgba(0, 0, 0, 0.87) 84.37%, rgba(0, 0, 0, 0) 100%)',
        opgr1: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 10%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0) 100%)'
      },
      borderRadius: {
        s5: '5px'
      },
    },
  },
  plugins: [],
}

