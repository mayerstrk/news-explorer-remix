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
        'spin-slow': 'spin 50s cubic-bezier(0.42, 0, 0.58, 1) infinite', // Define a slow spin animation
      },
    },
  },
  plugins: [],
} satisfies Config
