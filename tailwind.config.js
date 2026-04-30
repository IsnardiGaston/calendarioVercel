/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        arena: '#eee6d3',
        'arena-dk': '#e0d5bc',
        teal: '#0d7579',
        'teal-lt': '#0d7579',
        pink: '#c93860',
        yellow: '#ffda04',
        orange: '#fa881e',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Cabinet Grotesk', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(6deg)' },
        },
        cardIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px) rotate(-2deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) rotate(0deg)',
          },
        },
        revealIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.92) translateY(16px)',
          },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        cardIn: 'cardIn 0.9s cubic-bezier(.16,1,.3,1) 0.4s both',
        revealIn: 'revealIn 0.55s ease forwards',
        modalIn: 'modalIn 0.25s cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
}
