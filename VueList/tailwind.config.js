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
        mask1: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.1) 75%,  rgba(0, 0, 0, 0) 100%)',
        mask2: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 75%,  rgba(0, 0, 0, 1) 100%)',
        opgr1: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 10%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0) 100%)',
        srRes: 'linear-gradient(134deg, #001E6C 0%, #FFF 100%);',
        rainbow: 'linear-gradient(135deg, rgba(255,113,0,1) 0%, rgba(255,194,0,1) 20%, rgba(194,224,0,1) 40%, rgba(0,115,153,1) 60%, rgba(151,71,255,1) 80%, rgba(157,0,38,1) 100%)',
      },
      borderRadius: {
        s5: '5px'
      },
      backgroundColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399',
        brOrng: '#ff8811',
        rainbow: 'linear-gradient(135deg, rgba(255,113,0,1) 0%, rgba(255,194,0,1) 20%, rgba(194,224,0,1) 40%, rgba(0,115,153,1) 60%, rgba(151,71,255,1) 80%, rgba(157,0,38,1) 100%)',
      },
      borderColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399',
        brOrng: '#ff8811',
        rainbow: 'linear-gradient(135deg, rgba(255,113,0,1) 0%, rgba(255,194,0,1) 20%, rgba(194,224,0,1) 40%, rgba(0,115,153,1) 60%, rgba(151,71,255,1) 80%, rgba(157,0,38,1) 100%)',

      },
      outlineColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399',
        brOrng: '#ff8811',
      },
      fill: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399',
        brOrng: '#ff8811',
        rainbow: 'linear-gradient(135deg, rgba(255,113,0,1) 0%, rgba(255,194,0,1) 20%, rgba(194,224,0,1) 40%, rgba(0,115,153,1) 60%, rgba(151,71,255,1) 80%, rgba(157,0,38,1) 100%)',
      },
      textColor: {
        brGr: '#C2E000',
        offBlck: '#0E1116',
        mdPrpl: '#9747FF',
        drkRd: '#9D0026',
        mdBl: '#007399',
        brOrng: '#ff8811',
      },
      animation: {
        'softPulse': 'pulse3D 3s 1 normal forwards',
        'down': 'slide 300ms ease-out 1 reverse forwards',
        'up': 'slide 300ms ease-out 1 normal forwards'
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateY(0px)',
          },
          '100%': { transform: 'translateY(-2px)' }
        },
        pulse3D: {
          '0%': {
            position: 'relative',
            transform: 'perspective(100px) translateZ(0px) rotateX(0deg)'
          },
          '100%': {
            position: 'relative',
            transform: 'perspective(100px) translateZ(0px) rotateX(-1deg)',
          },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ]
}

