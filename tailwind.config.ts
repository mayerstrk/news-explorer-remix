import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      robotoSlab: ['"Roboto Slab"', 'serif'],
      roboto: ['Roboto', 'serif'],
      sspro: ['"Source Sans 3"', 'serif'],
    },
    extend: {
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
