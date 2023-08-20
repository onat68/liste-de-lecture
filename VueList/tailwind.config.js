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
      aspectRatio: {
        poster: '3/2'
      },
      width: {
        iphone8: '375px'
      },
      height: {
        iphone8: '665px'
      },
      backgroundImage: {
        custom1: 'linear-gradient(179.18deg, #1B0B27 0.7 %, #007EA7 47.43 %, #1B0B27 99.3 %)',
        mask1: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 75%,  rgba(0, 0, 0, 1) 100%)',
        mask2: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 75%,  rgba(0, 0, 0, 1) 100%)',
        opgr1: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 10%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0) 100%)',
        srRes: 'linear-gradient(134deg, #001E6C 0%, #FFF 100%);'
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
      borderColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399'
      },
      outlineColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399'
      },
      fill: {
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
        'down': 'slide 300ms ease-out 1 reverse forwards',
        'up': 'slide 300ms ease-out 1 normal forwards'
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateY(0px)',
          },
          '100%': { transform: 'translateY(-2px)' }
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ]
}

