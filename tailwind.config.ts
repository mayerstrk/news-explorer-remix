import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      robotoSlab: ['"Roboto Slab"', 'serif'],
      roboto: ['Roboto', 'serif'],
      sspro: ['"Source Sans 3"', 'serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
