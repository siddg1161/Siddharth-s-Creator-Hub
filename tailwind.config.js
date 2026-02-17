/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         cream: {
         DEFAULT: '#F4EEE4',
         dark: '#E7DDCB',
        },

       marigold: {
        DEFAULT: '#D9822B',
       light: '#F2A94A',
       },

        teal: {
       DEFAULT: '#155E63',
        light: '#1E6B6B',
        },

        terracotta: {
          DEFAULT: '#C05A3A',
          light: '#D97050',
        },
        charcoal: '#1A1A1A',
        smoke: '#4A4A4A',
        mist: '#8A8A8A',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'card': '0 6px 24px rgba(21,94,99,.12), 0 2px 6px rgba(0,0,0,.05)',
        'card-hover': '0 20px 60px rgba(30,107,107,.22), 0 6px 20px rgba(0,0,0,.10)',
        'btn': '0 8px 24px rgba(232,151,58,.45)',
        'btn-sent': '0 8px 24px rgba(42,157,110,.45)',
      },
      borderRadius: {
        'card': '24px',
        'pill': '100px',
      },
      animation: {
        'glow': 'glow 2.4s ease-in-out infinite',
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
        'card-in': 'cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(232,151,58,.55), 0 0 40px rgba(232,151,58,.25)' },
          '50%': { boxShadow: '0 0 24px rgba(232,151,58,.75), 0 0 60px rgba(232,151,58,.40)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.7)' },
        },
        cardIn: {
          from: { opacity: '0', transform: 'translateY(24px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
