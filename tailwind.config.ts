import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#6D7AAE',
          yellow: '#DCDD91',
          lightBlue: '#BEC7D4',
          dark: '#111111',
          navy: '#2C3A7D',
          bg: '#E8ECF2',
        },
      },
    },
  },
  plugins: [],
}

export default config
