import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        background: '#01060F',
        card: '#2C2C2C',
        input: '#3A3A3A',
      },
      fontFamily: {
        helvetica: ['Helvetica', 'sans-serif'],
      },
      fontSize: {
        base: ['12px', { lineHeight: '100%', letterSpacing: '0.03em' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config