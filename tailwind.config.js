/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#181611',
        paper: {
          DEFAULT: '#FAF4E8',
          deep: '#F1E7D2',
        },
        sun: '#FFC940',
        coral: '#E8502E',
        brand: {
          dark: '#070E1B',
          green: '#00C278',
          accent: '#8B5CF6',
          mid: '#0D1929',
          light: '#F0F9FF',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brut-sm': '2px 2px 0 0 #181611',
        brut: '4px 4px 0 0 #181611',
        'brut-lg': '8px 8px 0 0 #181611',
        'brut-xl': '12px 12px 0 0 #181611',
        'brut-green': '6px 6px 0 0 #00C278',
        'brut-sun': '6px 6px 0 0 #FFC940',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'bubble-in': 'bubbleIn 0.4s ease-out forwards',
        typing: 'typing 1s steps(3) infinite',
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bubbleIn: {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        typing: {
          '0%, 100%': { content: "'●'" },
          '33%': { content: "'● ●'" },
          '66%': { content: "'● ● ●'" },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
