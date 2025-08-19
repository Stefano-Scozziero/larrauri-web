import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1a2c3f',
          red: '#e62d3f',
          neutral: '#f5f5e9',
          black: '#000000'
        }
      },
      fontFamily: {
        serif: ['ui-serif', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)'
      }
    }
  },
  plugins: []
} satisfies Config
