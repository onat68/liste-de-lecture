/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: '"Neue Montreal", Arial, sans-serif',
        body: '"Lexend", "Atkinson Hyperlegible", sans-serif'
      },
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
      backgroundColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399'
      },
      textColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399'
      },
      animation: {
        'down': 'slide 800ms ease-out 1',
        'up': 'slide 800ms ease-out 1 reverse'
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '5%': {
            transform: 'translateY(-100%)'
          },
          '50%': { transform: 'translateY(8%)' },
          '75%': { transform: 'translateY(-5%)' },
          '100%': { transform: 'translateY(0%)' }
        }
      }
    },
  },
  plugins: [],
}

