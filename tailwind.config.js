const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'slide-up': 'slideUp 1s ease',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '50%': { transform: 'translateY(0px)', opacity: 1 },
        },
      },
      colors: {
        primary: '#383B7A',
        secondary: '#FFDDCD',
        notion: {
          default: '#E0E0DD',
          gray: '#E8CFC1',
          brown: '#DECEC5',
          orange: '#D2E8E3',
          yellow: '#FBEFD2',
          green: '#E2D8F8',
          blue: '#C6DAED',
          purple: '#D7CDEC',
          pink: '#EDC6DB',
          red: '#F4C6CA',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '-z-1': {
          zIndex: -1,
        },
      };

      addUtilities(newUtilities, ['responsive']);
    }),
  ],
};
