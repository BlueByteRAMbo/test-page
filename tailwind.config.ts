import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#f4f3ef',
          surface: '#ffffff',
          card: 'rgba(255, 255, 255, 0.96)',
          border: 'rgba(17, 17, 17, 0.08)',
          subtle: '#ebe9e1',
        },
        ink: {
          DEFAULT: '#111111',
          muted: '#626660',
          faint: '#8e928c',
        },
        accent: {
          green: '#16a34a',
          'green-light': '#dcfce7',
          'green-dark': '#15803d',
          emerald: '#10b981',
          amber: '#d97706',
          'amber-light': '#fef3c7',
          red: '#dc2626',
          'red-light': '#fee2e2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'sheet': '0 24px 70px -15px rgba(17, 17, 17, 0.08), 0 10px 25px -10px rgba(17, 17, 17, 0.04)',
        'sheet-active': '0 35px 90px -20px rgba(17, 17, 17, 0.14), 0 15px 35px -10px rgba(22, 163, 74, 0.12)',
        'pedestal': '0 40px 100px -20px rgba(17, 17, 17, 0.18), 0 0 80px rgba(22, 163, 74, 0.15)',
        'float': '0 12px 35px -5px rgba(17, 17, 17, 0.08)',
      },
    },
  },
  plugins: [],
}
export default config
